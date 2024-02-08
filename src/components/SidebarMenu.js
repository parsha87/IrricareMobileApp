// SidebarMenu.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';

const SidebarMenu = ({ navigation }) => {
  const navigateToScreen = (route) => () => {
    navigation.navigate(route);
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView>
        <TouchableOpacity onPress={navigateToScreen('Home')}>
          <Text style={styles.menuItem}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToScreen('About')}>
          <Text style={styles.menuItem}>About</Text>
        </TouchableOpacity>
        {/* Add more menu items as needed */}
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  menuItem: {
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default SidebarMenu;