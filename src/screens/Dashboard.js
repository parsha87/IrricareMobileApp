import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { StyleSheet } from 'react-native'
import { View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
export default function Dashboard({ navigation }) {
  const handleBack = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainpageScreen' }],
    })
  };
  return (
    <ImageBackground source={require("../assets/bg2.jpg")} resizeMode="cover" style={styles.backgroundImage}>
      <View>
        <View style={{ flexDirection: 'row', backgroundColor: '#276221', padding: 16 }}>

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




        </View>
        <View style={[styles.container, { flexDirection: 'row', }]}>
          <View style={{ flex: 2, margin: 6, padding: 6 }}>
            <TouchableOpacity style={styles.touchable} onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: 'ConfigurationTimeScreen' }],
              })
            }>
              <Image
                source={require("../assets/controller.png")}
                style={styles.image} />
              <View style={styles.view}>
                <Text style={styles.text}>Controller time setting </Text>
              </View>

            </TouchableOpacity>
          </View>
          <View style={{ flex: 2, margin: 6, padding: 6 }}>

            <TouchableOpacity style={styles.touchable} onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: 'ConfigurationSettings' }],
              })
            }>
              <Image
                source={require("../assets/data.png")}
                style={styles.image} />
              <View style={styles.view}>
                <Text style={styles.text}> Max Filter & Max Valve Settings</Text>
              </View>

            </TouchableOpacity>

          </View>

        </View>

        <View style={[styles.container, { flexDirection: 'row', paddingTop: 20 }]}>
          <View style={{ flex: 2, margin: 6, padding: 6 }}>
            <TouchableOpacity style={styles.touchable} onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: 'ValveSettingsScreen' }],
              })
            }>
              <Image
                source={require("../assets/water-pipe.png")}
                style={styles.image} />
              <View style={styles.view}>
                <Text style={styles.text}>Valve Setting</Text>
              </View>

            </TouchableOpacity>
          </View>
          <View style={{ flex: 2, margin: 6, padding: 6 }}>

            <TouchableOpacity style={styles.touchable} onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: 'SequenceSettings' }],
              })
            }>
              <Image
                source={require("../assets/productivity.png")}
                style={styles.image} />
              <View style={styles.view}>
                <Text style={styles.text}>Sequence Settings</Text>
              </View>

            </TouchableOpacity>

          </View>

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
    fontSize: 18,
    textAlign: 'center'
  }
});