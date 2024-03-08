import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Text, View, Button } from 'react-native';
import { LoginScreen, RegisterScreen, ResetPasswordScreen } from './src/screens';
import Dashboard from './src/screens/Dashboard';
import ConfigurationTimeScreen from './src/screens/ConfigurationTime';
import ValveSettingsScreen from './src/screens/ValveSettings';
import ValveSettingsListScreen from './src/screens/ValveSettingList';
import SequenceSettingsListScreen from './src/screens/SequenceSettingList';
import IrrigationSequenceScreen from './src/screens/IrrigationSequence';
import FilterSequenceListScreen from './src/screens/FilterSequenceList';
import FilterSequenceScreen from './src/screens/FilterSequence';
import CyclicSequenceScreen from './src/screens/CyclicSequence';
import MainpageScreen from './src/screens/MainpageScreen';
import SequenceSetting from './src/screens/SequenceSettings';
import { createStackNavigator } from '@react-navigation/stack';
import MaxFilterValveSettingsScreen from './src/screens/MaxFilterValveSettings';
import { AuthContext } from './src/context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import your desired icon library
import CyclicSequenceSettingsListScreen from './src/screens/CyclicSequenceLIst';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const ConfigurationStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Dashboard" component={Dashboard} options={{
      headerShown: false
    }} />
    <Drawer.Screen name="MaxFilterValveSettingsScreen" component={MaxFilterValveSettingsScreen} options={{
      headerShown: false
    }} />
    <Drawer.Screen name="ConfigurationTimeScreen" component={ConfigurationTimeScreen} options={{
      headerShown: false
    }} />
    <Drawer.Screen name="ValveSettingsScreen" component={ValveSettingsScreen} options={{
      headerShown: false
    }} />
    <Drawer.Screen name="ValveSettingsListScreen" component={ValveSettingsListScreen} options={{
      headerShown: false
    }} />
  </Stack.Navigator>
);


const ScheduleStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="SequenceSetting" component={SequenceSetting} options={{
      headerShown: false
    }} />
    <Drawer.Screen name="SequenceSettingList" component={SequenceSettingsListScreen} options={{
      headerShown: false
    }} />
    <Drawer.Screen name="IrrigationSequenceScreen" component={IrrigationSequenceScreen} options={{
      headerShown: false
    }} />
    <Drawer.Screen name="FilterSequenceList" component={FilterSequenceListScreen} options={{
      headerShown: false
    }} />
    <Drawer.Screen name="FilterSequenceScreen" component={FilterSequenceScreen} options={{
      headerShown: false
    }} />
    <Drawer.Screen name="CyclicSequenceScreen" component={CyclicSequenceScreen} options={{
      headerShown: false
    }} />
     <Drawer.Screen name="CyclicSequenceList" component={CyclicSequenceSettingsListScreen} options={{
      headerShown: false
    }} />
  </Stack.Navigator>
);

// Custom Drawer Content Component
function CustomDrawerContent(props) {
  const { navigation } = props;
const authContext = React.useContext(AuthContext);

  const handleLogout = () => {

    // Handle logout logic here
    authContext.logout();
    navigation.navigate('Login');
  };

  return (
<DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, backgroundColor: '#a3e5c4' }}>
  {/* App Name */}
  <View style={{ alignItems: 'center', marginVertical: 20 }}>
    <Text style={{ fontSize: 20, fontWeight: 'bold', color:'green' }}>IRRICARE XYΦ</Text>
    {/* Horizontal Divider */}
    <View style={{ backgroundColor: 'black', height: 1, width: '80%', marginVertical: 10 }} />
  </View>

  {/* Drawer Items */}
  <View>
    <DrawerItem
      label="Dashboard"
      icon={() => <Icon name="dashboard-customize" size={25} color="green" />}
      onPress={() => navigation.navigate('MainpageScreen')}
    />
    <DrawerItem
      label="Configuration Settings"
      icon={() => <Icon name="settings" size={25} color="green" />}
      onPress={() => navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      })}
    />
    <DrawerItem
      label="Sequence Settings"
      icon={() => <Icon name="settings-input-component" size={25} color="green" />}
      onPress={() => navigation.reset({
        index: 0,
        routes: [{ name: 'SequenceSettings' }],
      })}
    />
    {/* Add more DrawerItems as needed */}
    <DrawerItem
      label="Logout"
      icon={() => <Icon name="logout" size={25} color="green" />}
      onPress={handleLogout}
    />
  </View>

  {/* App Version */}
  <View style={{ alignItems: 'center', marginTop: 20 }}>
    <Text>App Version: 1.7</Text>
  </View>
</DrawerContentScrollView>

  );
}

function App() {

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />} // Custom Drawer Content Component
        drawerStyle={{
          backgroundColor: 'green',
          width: 250,
        }}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#276221',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
        initialRouteName="Login"
      >
        <Drawer.Screen
          name="Login"
          options={{
            drawerLabel: 'Login',
            title: 'Login',
            headerShown: false
          }}
          component={LoginScreen}
        />
        <Drawer.Screen
          name="MainpageScreen"
          options={{
            drawerLabel: 'Dashboard',
            title: 'Dashboard',
          }}
          component={MainpageScreen}
        />
        <Drawer.Screen
          name="Dashboard"
          options={{
            drawerLabel: 'Configuration Setting',
            title: 'Configuration Setting',
          }}
          component={ConfigurationStack}
        />
        <Drawer.Screen
          name="SequenceSettings"
          options={{
            drawerLabel: 'Sequence settings',
            title: 'Sequence settings',
          }}
          component={ScheduleStack}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
