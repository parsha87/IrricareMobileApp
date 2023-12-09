import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
} from './src/screens'
import ConfigurationSettingsScreen from './src/screens/ConfirgurationSettings'
import ConfigurationTimeScreen from './src/screens/ConfigurationTime'
import ValveSettingsScreen from './src/screens/ValveSettings'
import SequenceSettingsScreen from './src/screens/SequenceSettings'
import IrrigationSequenceScreen from './src/screens/IrrigationSequence'
import CyclicSequenceScreen from './src/screens/CyclicSequence'
import FilterSequenceScreen from './src/screens/FilterSequence'

const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Dashboard"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />


          <Stack.Screen name="ConfigurationSettings" component={ConfigurationSettingsScreen} />
          <Stack.Screen name="ConfigurationTimeScreen" component={ConfigurationTimeScreen} />
          <Stack.Screen name="ValveSettingsScreen" component={ValveSettingsScreen} />

          <Stack.Screen name="SequenceSettings" component={SequenceSettingsScreen} />
          <Stack.Screen name="IrrigationSequenceScreen" component={IrrigationSequenceScreen} />
          
          <Stack.Screen name="FilterSequenceScreen" component={FilterSequenceScreen} />
          <Stack.Screen name="CyclicSequenceScreen" component={CyclicSequenceScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}