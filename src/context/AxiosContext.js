import React, { createContext, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import * as Keychain from 'react-native-keychain';
import { API_BASE_URL } from '../config';

const AxiosContext = createContext();
const { Provider } = AxiosContext;

const AxiosProvider = ({ children }) => {
    const authContext = useContext(AuthContext);

    const authAxios = axios.create({
        baseURL: API_BASE_URL,
    });

    const publicAxios = axios.create({
        baseURL: API_BASE_URL,
    });

    publicAxios.interceptors.request.use(
        config => {
            // if (!config.headers.Authorization) {
            //     config.headers.Authorization = `Bearer ${authContext.getAccessToken()}`;
            // }

            return config;
        },
        error => {
            return Promise.reject(error);
        },
    );

    authAxios.interceptors.request.use(
        config => {
            if (!config.headers.Authorization) {
                config.headers.Authorization = `Bearer ${authContext.getAccessToken()}`;
            }

            return config;
        },
        error => {
            return Promise.reject(error);
        },
    );

    const refreshAuthLogic = failedRequest => {
        const data = {
            refreshToken: authContext.authState.refreshToken,
        };

        const options = {
            method: 'POST',
            data,
            url: API_BASE_URL + '/refreshToken',
        };

        return axios(options)
            .then(async tokenRefreshResponse => {
                failedRequest.response.config.headers.Authorization =
                    'Bearer ' + tokenRefreshResponse.data.authToken;

                authContext.setAuthState({
                    ...authContext.authState,
                    authToken: tokenRefreshResponse.data.authToken,
                });

                await Keychain.setGenericPassword(
                    'token',
                    JSON.stringify({
                        authToken: tokenRefreshResponse.data.authToken,
                        refreshToken: authContext.authState.refreshToken,
                    }),
                );

                return Promise.resolve();
            })
            .catch(e => {
                authContext.setAuthState({
                    authToken: null,
                    refreshToken: null,
                });
            });
    };

    createAuthRefreshInterceptor(authAxios, refreshAuthLogic, {});

    return (
        <Provider
            value={{
                authAxios,
                publicAxios,
            }}>
            {children}
        </Provider>
    );
};

export { AxiosContext, AxiosProvider };