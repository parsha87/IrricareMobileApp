import React, { useState, useEffect, useContext } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { StyleSheet } from 'react-native'
import { View, Text, TouchableOpacity, Image, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import { AxiosContext } from '../context/AxiosContext';
import { getItem } from '../Models/model'
import { AuthContext } from '../context/AuthContext';

import AsyncStorage from '@react-native-async-storage/async-storage';


const Dashboard = ({ navigation }) => {
  const { authAxios } = useContext(AxiosContext);
  const authContext = useContext(AuthContext);
  const items = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];
  const [selectedValue, setSelectedValue] = useState();
  const [selectedController, setSelectedController] = useState();

  const [open, setOpen] = useState(false);
  const [itemsController, setItemsController] = useState([]);


  useEffect(() => {
    fetchMyAPI()
  }, []);



  const fetchMyAPI = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      let jsonVal = JSON.parse(value);
      const response = await authAxios.get('ControllerUser/' + jsonVal.userId);
      console.log(response.data);
      let items = response.data.map(s => ({ label: s.ControllerNo, value: s.ControllerId }))
      setItemsController(items);
    } catch (error) {
      console.log(error);
    }
  };

  const changeSelectOptionHandler = async (value) => {
    console.log(value)
    setSelectedController(value)
    await AsyncStorage.setItem('selectedController', JSON.stringify(value));

  };

  const handleBack = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainpageScreen' }],
    })
  };

  const handleControllerTimeNavigation = () => {
    console.log(selectedController)
    navigation.navigate('ConfigurationTimeScreen', {
      selectedControllerId: selectedController.value,
      selectedControllerName: selectedController.label
    })
  };
  const handleMaxValveNavigation = () => {
    console.log(selectedController)
    navigation.navigate('MaxFilterValveSettingsScreen', {
      selectedControllerId: selectedController.value,
      selectedControllerName: selectedController.label
    })
  };
  const handleValveSettingNavigation = () => {
    console.log(selectedController)
    navigation.navigate('ValveSettingsListScreen', {
      selectedControllerId: selectedController.value,
      selectedControllerName: selectedController.label
    })
  };

  const handleSequenceListNavigation = () => {
    console.log(selectedController)
    navigation.navigate('SequenceSettings', {
      selectedControllerId: selectedController.value,
      selectedControllerName: selectedController.label
    })
  };
  return (
    <ImageBackground source={require("../assets/bg2.jpg")} resizeMode="cover" style={styles.backgroundImage}>

      <View>

        {/* <View style={{ flexDirection: 'row', backgroundColor: '#276221', padding: 16 }}>

          <View style={{ flex: 1 }}>

            <TouchableOpacity onPress={handleBack}>
              <Image
                source={require("../assets/left-arrow.png")}
              />
            </TouchableOpacity>

          </View>
          <View style={{ flex: 5 }}><Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>Dashboard</Text></View>
          <View style={{ flex: 1 }}>

            <TouchableOpacity onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: 'LoginScreen' }],
              })
            }>
              <Image
                source={require("../assets/power-button.png")}
              />
            </TouchableOpacity>
          </View>




        </View> */}
        <View>
          <Text style={{ marginLeft: 8 }}>Select Controller</Text>

          <DropDownPicker
            open={open}
            value={selectedValue}
            items={itemsController}
            setOpen={setOpen}
            setValue={setSelectedValue}
            setItems={setItemsController}
            containerStyle={{ padding: 8 }}
            style={{ backgroundColor: '#fafafa' }}
            dropDownContainerStyle={{ marginLeft: 8 }}
            listItemLabelStyle={{ marginLeft: 10 }}
            itemStyle={{
              justifyContent: 'flex-start', marginLeft: 8
            }}
            onSelectItem={changeSelectOptionHandler}
          />


        </View>
        <View style={[styles.container, { flexDirection: 'row', }]}>
          <View style={{ flex: 3, margin: 6, padding: 6 }}>
            <TouchableOpacity style={styles.touchable} onPress={handleControllerTimeNavigation}>
              <Image
                source={require("../assets/controller.png")}
                style={styles.image} />
              <View style={styles.view}>
                <Text style={styles.text}>Controller time setting </Text>
              </View>

            </TouchableOpacity>
          </View>
          <View style={{ flex: 3, margin: 6, padding: 6 }}>
            <TouchableOpacity style={styles.touchable} onPress={handleMaxValveNavigation}>
              <Image
                source={require("../assets/data.png")}
                style={styles.image} />
              <View style={styles.view}>
                <Text style={styles.text}> Max Filter & Max Valve Settings</Text>
              </View>

            </TouchableOpacity>

          </View>
          <View style={{ flex: 3, margin: 6, padding: 6 }}>
            <TouchableOpacity style={styles.touchable} onPress={handleValveSettingNavigation}>
              <Image
                source={require("../assets/water-pipe.png")}
                style={styles.image} />
              <View style={styles.view}>
                <Text style={styles.text}>Valve Setting</Text>
              </View>

            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.container, { flexDirection: 'row', paddingTop: 20 }]}>
      
          {/* <View style={{ flex: 2, margin: 6, padding: 6 }}>

            <TouchableOpacity style={styles.touchable} onPress={handleSequenceListNavigation
            }>
              <Image
                source={require("../assets/productivity.png")}
                style={styles.image} />
              <View style={styles.view}>
                <Text style={styles.text}>Sequence Settings</Text>
              </View>

            </TouchableOpacity>

          </View> */}

        </View>


        <View style={styles.container}>

          {/* <Button
          mode="contained"
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'StartScreen' }],
            })
          }
        >
          Logout
        </Button> */}

        </View>
      </View>
    </ImageBackground>

  )

}
export default Dashboard;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  container: {
    padding: 5,
    width: '100%',
  },
  view: {
    position: 'absolute',
    backgroundColor: 'transparent',
    paddingTop: 100
  },
  image: {

  },
  touchable: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: 'black',
    fontSize: 13,
    textAlign: 'center'
  },

});