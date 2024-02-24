import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Import your screens here
import { LoginScreen } from '../screens';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="LoginScreen">
      <Drawer.Screen name="LoginScreen" component={LoginScreen} />
      {/* Add more screens here */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
