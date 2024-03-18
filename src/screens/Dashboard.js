import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { View, Text, TouchableOpacity, Image } from 'react-native';

const Dashboard = ({ navigation }) => {

  const [controller, setSelectedController] = useState({
    selectedControllerId: 0,
    selectedControllerName: ''
  })

  const handleControllerTimeNavigation = () => {
    navigation.navigate('ConfigurationTimeScreen')
    // navigation.navigate('ConfigurationTimeScreen', {
    //   selectedControllerId: selectedController.value,
    //   selectedControllerName: selectedController.label
    // })
  };
  const handleMaxValveNavigation = () => {
    navigation.navigate('MaxFilterValveSettingsScreen')
  };
  const handleValveSettingNavigation = () => {
    navigation.navigate('ValveSettingsListScreen')
  };
  const handleRainSensorNavigation = () => {
    navigation.navigate('RainSensorSettingsListScreen')
  };
  const handleWaterMeterNavigation = () => {
    navigation.navigate('WaterMeterSettingsListScreen')
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
            alert("Select controller no form dashboard")
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
      
        <Text style={styles.title}>Controller Configuration</Text>
        <Text style={styles.controllerName}>Controller No:{controller.selectedControllerName}</Text>
        <View style={styles.gridContainer}>
          <View style={[styles.gridItem, { flex: 4 }]}>
            <TouchableOpacity style={styles.touchable} onPress={handleControllerTimeNavigation}>
              <Image
                source={require("../assets/controller.png")}
                style={styles.image} />
              <View style={styles.view}>
                <Text style={styles.text}>Controller Time </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={[styles.gridItem, { flex: 4 }]}>
            <TouchableOpacity style={styles.touchable} onPress={handleMaxValveNavigation}>
              <Image
                source={require("../assets/data.png")}
                style={styles.image} />
              <View style={styles.view}>
                <Text style={styles.text}> Max Filter & Max Valve</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={[styles.gridItem, { flex: 4 }]}>
            <TouchableOpacity style={styles.touchable} onPress={handleValveSettingNavigation}>
              <Image
                source={require("../assets/valve.png")}
                style={styles.image} />
              <View style={styles.view}>
                <Text style={styles.text}> Valve Setting</Text>
              </View>
            </TouchableOpacity>
          </View>
          
        </View>
        <View style={styles.gridContainerrow2}>
         {/*  <View style={[styles.gridItem, { flex: 4 }]}>
            <TouchableOpacity style={styles.touchable} onPress={handleRainSensorNavigation}>
              <Image
                source={require("../assets/rain.png")}
                style={styles.image} />
              <View style={styles.view}>
                <Text style={styles.text}> Rain Sensor Setting</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={[styles.gridItem, { flex: 4 }]}>
            <TouchableOpacity style={styles.touchable} onPress={handleWaterMeterNavigation}>
              <Image
                source={require("../assets/water-meter.png")}
                style={styles.image} />
              <View style={styles.view}>
                <Text style={styles.text}>Water Meter Sensor Setting</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={[styles.gridItem, { flex: 4 }]}>
          <TouchableOpacity style={styles.touchable} onPress={handleWaterMeterNavigation}>
              <Image
                source={require("../assets/water-meter.png")}
                style={styles.image} />
              <View style={styles.view}>
                <Text style={styles.text}>Water Meter Sensor Setting</Text>
              </View>
            </TouchableOpacity>
          </View> */}
          

        </View>
      </View>
    </SafeAreaView>



  )

}
export default Dashboard;

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
  gridContainerrow2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop:30
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