//AuthContext.js
import React, { createContext, useState } from 'react';
import * as Keychain from 'react-native-keychain';

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    authToken: null,
    refreshToken: null,
    authenticated: null,
  });

  // useEffect(() => {
  //   // Check if the user is already authenticated on app start
  //   const checkAuth = async () => {
  //     const storedUser = await AsyncStorage.getItem('user');
  //     if (storedUser) {
  //       setUser(JSON.parse(storedUser));
  //     }
  //   };

  //   checkAuth();
  // }, []);

  const logout = async () => {
    const logout = async () => {
      // Remove user information from AsyncStorage
      await AsyncStorage.removeItem('user');
      setUser(null);
    };

    await Keychain.resetGenericPassword();
    setAuthState({
      authToken: null,
      refreshToken: null,
      authenticated: false,
    });
  };

  const getAccessToken = () => {
    return authState.authToken;
  };

  return (
    <Provider
      value={{
        authState,
        getAccessToken,
        setAuthState,
        logout,
      }}>
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };