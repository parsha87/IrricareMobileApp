import React, { useEffect, useContext, useState, useCallback } from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as Keychain from 'react-native-keychain';
import { theme } from './src/core/theme'
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
  Dashboard1,

} from './src/screens'

import ConfigurationSettingsScreen from './src/screens/ConfirgurationSettings'
import ConfigurationTimeScreen from './src/screens/ConfigurationTime'
import ValveSettingsScreen from './src/screens/ValveSettings'
import SequenceSettingsScreen from './src/screens/SequenceSettings'
import IrrigationSequenceScreen from './src/screens/IrrigationSequence'
import CyclicSequenceScreen from './src/screens/CyclicSequence'
import FilterSequenceScreen from './src/screens/FilterSequence'
import MainpageScreen from './src/screens/Mainpage'
import { AuthProvider } from './src/context/AuthContext';
import { AuthContext } from './src/context/AuthContext';
import { AxiosProvider } from './src/context/AxiosContext';
import ValveSettingsListScreen from './src/screens/ValveSettingList';
import SequenceSettingsListScreen from './src/screens/SequenceSettingList';
const Stack = createStackNavigator()

const App = () => {
  const authContext = useContext(AuthContext);
  const [status, setStatus] = useState('loading');
  const loadJWT = useCallback(async () => {
    try {
      const value = await Keychain.getGenericPassword();
      const jwt = JSON.parse(value.password);

      authContext.setAuthState({
        accessToken: jwt.accessToken || null,
        refreshToken: jwt.refreshToken || null,
        authenticated: jwt.accessToken !== null,
      });
      setStatus('success');
    } catch (error) {
      setStatus('error');
      console.log(`Keychain Error: ${error.message}`);
      authContext.setAuthState({
        accessToken: null,
        refreshToken: null,
        authenticated: false,
      });
    }
  }, []);

  useEffect(() => {
    loadJWT();
  }, [loadJWT]);


  if (authContext?.authState?.authenticated === false) {
    return <LoginScreen />;
  }
  else {
    return (

      // <AuthProvider>
      //   <AxiosProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="LoginScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          {/* <Stack.Screen name="StartScreen" component={StartScreen} /> */}
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Dashboard"
            component={Dashboard}
            options={{
              title: 'Dashboard',
              headerStyle: {
                backgroundColor: '#3498db', // Set your desired background color
              },
              headerTintColor: '#fff', // Set your desired text color
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerShown: false
            }}
          />
          <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />


          <Stack.Screen name="ConfigurationSettings" component={ConfigurationSettingsScreen}
            options={{
              title: 'Configuration Settings Screen ',
              headerStyle: {
                backgroundColor: '#3498db', // Set your desired background color
              },
              headerTintColor: '#fff', // Set your desired text color
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerShown: false
            }} />
          <Stack.Screen name="ConfigurationTimeScreen" component={ConfigurationTimeScreen}
            options={{
              title: 'Configuration Settings Screen',
              headerStyle: {
                backgroundColor: '#3498db', // Set your desired background color
              },
              headerTintColor: '#fff', // Set your desired text color
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerShown: false
            }}
          />
          <Stack.Screen name="ValveSettingsScreen" component={ValveSettingsScreen}
            options={{
              title: 'Valve Settings Screen',
              headerStyle: {
                backgroundColor: '#3498db', // Set your desired background color
              },
              headerTintColor: '#fff', // Set your desired text color
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerShown: false
            }} />

          <Stack.Screen name="ValveSettingsListScreen" component={ValveSettingsListScreen}
            options={{
              title: 'Valve List',
              headerStyle: {
                backgroundColor: '#3498db', // Set your desired background color
              },
              headerTintColor: '#fff', // Set your desired text color
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerShown: false
            }} />

          <Stack.Screen name="SequenceSettings" component={SequenceSettingsScreen}
            options={{
              title: 'Sequence Settings',
              headerStyle: {
                backgroundColor: '#3498db', // Set your desired background color
              },
              headerTintColor: '#fff', // Set your desired text color
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerShown: false
            }}
          />

          <Stack.Screen name="SequenceSettingList" component={SequenceSettingsListScreen}
            options={{
              title: 'Sequence List',
              headerStyle: {
                backgroundColor: '#3498db', // Set your desired background color
              },
              headerTintColor: '#fff', // Set your desired text color
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerShown: false
            }} />

          <Stack.Screen name="IrrigationSequenceScreen" component={IrrigationSequenceScreen}
            options={{
              title: 'Irrigation Sequence Screen',
              headerStyle: {
                backgroundColor: '#3498db', // Set your desired background color
              },
              headerTintColor: '#fff', // Set your desired text color
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerShown: false
            }}
          />

          <Stack.Screen name="FilterSequenceScreen" component={FilterSequenceScreen}
            options={{
              title: 'Filter Sequence Screen',
              headerStyle: {
                backgroundColor: '#3498db', // Set your desired background color
              },
              headerTintColor: '#fff', // Set your desired text color
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerShown: false
            }}
          />
          <Stack.Screen name="CyclicSequenceScreen" component={CyclicSequenceScreen}
            options={{
              title: 'Cyclic Sequence Screen',
              headerStyle: {
                backgroundColor: '#3498db', // Set your desired background color
              },
              headerTintColor: '#fff', // Set your desired text color
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerShown: false
            }}
          />
          <Stack.Screen name="MainpageScreen" component={MainpageScreen}
            options={{
              title: 'Cyclic Sequence Screen',
              headerStyle: {
                backgroundColor: '#3498db', // Set your desired background color
              },
              headerTintColor: '#fff', // Set your desired text color
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerShown: false
            }}
          />

        </Stack.Navigator>
      </NavigationContainer>
      //   </AxiosProvider>
      // </AuthProvider>
    )
  }

}
export default App;
