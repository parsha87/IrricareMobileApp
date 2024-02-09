import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Button from '../components/Button'
import Background from '../components/Background'
import { useNavigation } from '@react-navigation/native';


export default function SequenceSetting({ route }) {
  const navigation = useNavigation();
  const { selectedControllerId, selectedControllerName } = route.params;


  const handleBack = () => {
    navigation.navigate('Dashboard');
  };
  

  const handleSequenceSettingNavigation = () => {
    navigation.navigate('SequenceSettingList', {
      selectedControllerId: selectedControllerId,
      selectedControllerName: selectedControllerName
    })
  };
  return (

    <View>
      <View style={{ flexDirection: 'row', backgroundColor: '#3498db', padding: 16 }}>
        <TouchableOpacity onPress={handleBack}>
          <Text style={{ color: '#fff', fontSize: 18, marginRight: 16 }}>{'< Back'}</Text>
        </TouchableOpacity>
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Sequence Settings</Text>
      </View>
      <View style={styles.container}>
        <Button
          mode="outlined"
          onPress={handleSequenceSettingNavigation}
        >
          Irrigation Sequence
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