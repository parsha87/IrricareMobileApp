import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Button from '../components/Button'
import Background from '../components/Background'

export default function SequenceSetting({ navigation }) {
    return (
      <Background>
           <Button
          mode="outlined"
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'Dashboard' }],
            })
          }
        >
          Back
        </Button>
      
        <Button
          mode="outlined"
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'IrrigationSequenceScreen' }],
            })
          }
        >
          IrrigationSequence
        </Button>
  
        <Button
          mode="outlined"
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'FilterSequenceScreen' }],
            })
          }
        >
          FilterSequence
        </Button>
        <Button
          mode="outlined"
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'CyclicSequenceScreen' }],
            })
          }
        >
          CyclicSequence
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