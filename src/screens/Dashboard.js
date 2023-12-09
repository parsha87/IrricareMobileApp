import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { View, StyleSheet } from 'react-native'

export default function Dashboard({ navigation }) {
  return (
    <Background>
      <Header>Let’s start</Header>
      <Paragraph>
        Your amazing app starts here. Open you favorite code editor and start
        editing this project.
      </Paragraph>
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

    </Background>
  )

}
const styles = StyleSheet.create({
  container: {
    flex: 3,
    padding: 20,
    height: 50,
  },
});