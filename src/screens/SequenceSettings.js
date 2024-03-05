import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { Text } from 'react-native-paper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SequenceSetting({ route }) {
  const navigation = useNavigation();
  const [controller, setSelectedController] = useState({
    selectedControllerId: 0,
    selectedControllerName: ''
  })

  const handleSequenceSettingNavigation = () => {
    navigation.navigate('SequenceSettingList');
  };
  const handleFilterSettingNavigation = () => {
    navigation.navigate('FilterSequenceList');
  };

  useFocusEffect(
    React.useCallback(() => {
      // Retrieve selected controller from AsyncStorage
      const retrieveSelectedController = async () => {
        try {
          const value = await AsyncStorage.getItem('selectedController');
          if (value !== null) {

            let jsonVal = JSON.parse(value);
            let controller = {
              selectedControllerId: jsonVal.value,
              selectedControllerName: jsonVal.label
            }
            setSelectedController(controller);
          }
          else {
            alert("Select controlle r no form dashboard")
          }
        } catch (error) {
          console.error('Error retrieving selected controller:', error);
          alert("Select controller no form dashboard")
        }
      };

      retrieveSelectedController();
    }, []) // Make sure to include any dependencies of the effect
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>      

        <Text style={styles.title}>Sequence Configuration</Text>
        <Text style={styles.controllerName}>Controller No: {controller.selectedControllerName}</Text>

        <View style={styles.gridContainer}>
          <View style={[styles.gridItem, { flex: 3 }]}>
            <TouchableOpacity style={styles.touchable} onPress={handleSequenceSettingNavigation}>
              <Image
                source={require("../assets/irrigationseq.png")}
                style={styles.image} />
              <View style={styles.view}>
                <Text style={styles.text}>Irrigation Sequence </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={[styles.gridItem, { flex: 3 }]}>
            <TouchableOpacity style={styles.touchable} onPress={handleFilterSettingNavigation}>
              <Image
                source={require("../assets/irrigation-system.png")}
                style={styles.image} />
              <View style={styles.view}>
                <Text style={styles.text}> Filter Sequence</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={[styles.gridItem, { flex: 3 }]}>
            <TouchableOpacity style={styles.touchable} onPress={handleFilterSettingNavigation}>
              <Image
                source={require("../assets/plant.png")}
                style={styles.image} />
              <View style={styles.view}>
                <Text style={styles.text}> Cyclic Sequence</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={[styles.gridItem, { flex: 3 }]}>
            <TouchableOpacity style={styles.touchable} onPress={handleFilterSettingNavigation}>
              <Image
                source={require("../assets/irrigation.png")}
                style={styles.image} />
              <View style={styles.view}>
                <Text style={styles.text}> Valve Cyclic</Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* Additional grid items */}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10, 
    paddingHorizontal: 20,
    backgroundColor: '#d3f9e8', // Light green background

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: 'green'

  }, controllerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'green'
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    margin: 6,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  view: {
    position: 'absolute',
    backgroundColor: 'transparent',
    paddingTop: 100,
  },
  image: {

  },
  touchable: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
  },
});
