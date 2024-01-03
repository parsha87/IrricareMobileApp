import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { StyleSheet } from 'react-native'
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
export default function Dashboard({ navigation }) {
  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <View>
      <View style={{ flexDirection: 'row', backgroundColor: '#3498db', padding: 16 }}>
        <TouchableOpacity onPress={handleBack}>
          <Text style={{ color: '#fff', fontSize: 18, marginRight: 16 }}>{'< Back'}</Text>
        </TouchableOpacity>
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Dashboard</Text>
      </View>

      <View style={styles.container}>

        <Button
          mode="outlined"
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'StartScreen' }],
            })
          }
        >
          Logout
        </Button>
        <Button
          mode="outlined"
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'ConfigurationTimeScreen' }],
            })
          }
        >
          Configuration Time Screen
        </Button>

        <Button
          mode="outlined"
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'ConfigurationSettings' }],
            })
          }
        >
          Configuration settings
        </Button>
        <Button
          mode="outlined"
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'ValveSettingsScreen' }],
            })
          }
        >
          Valve setting
        </Button>

        <Button
          mode="outlined"
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'SequenceSettings' }],
            })
          }
        >
          SequenceSettingsScreen
        </Button>
      </View>
    </View>
  )

}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '100%',
  },
});