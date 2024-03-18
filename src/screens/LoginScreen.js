import React, { useState, useContext, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, View, SafeAreaView, Alert, ImageBackground, Image } from 'react-native'
import { ActivityIndicator, Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { AuthContext } from '../context/AuthContext';
import * as Keychain from 'react-native-keychain';
import { AxiosContext } from '../context/AxiosContext';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome6';

export default function LoginScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [userName, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const authContext = useContext(AuthContext);
  const { publicAxios } = useContext(AxiosContext);
  const baseUrl = "http://121.242.3.79:9402/api/";

  useEffect(() => {
    checkIfLoggedIn();
  }, []);


  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };


  const checkIfLoggedIn = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      navigation.navigate('MainpageScreen');
    }
  };
  const onLogin = async () => {
    setIsLoading(true);
    const emailError = emailValidator(userName.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...userName, error: emailError })
      setPassword({ ...password, error: passwordError })
      setIsLoading(false);
      return
    }
    let useName = userName.value
    let pass = password.value
    try {

      let payload = {
        UserName: userName.value,
        Password: password.value
      }

      const response = await publicAxios.post('/Auth', payload);
      // Save data
      const { authToken, refreshToken } = response.data;
      let authTokenStr = response.data.authToken;
      console.log(authTokenStr);
      try {
        //console.log("saving" + JSON.stringify(response.data))
        await AsyncStorage.setItem('user', JSON.stringify(response.data));
        await AsyncStorage.setItem('token', authTokenStr);
        console.log("Success saved")
      } catch (error) {
        console.log("SetItem error ", error)
        return null;
      }

      authContext.setAuthState({
        authTokenStr,
        authTokenStr,
        authenticated: true,
      });

      await Keychain.setGenericPassword(
        'token',
        JSON.stringify({
          authTokenStr,
          authTokenStr, //refreshtoken
        }),
      );
      if (authTokenStr != "") {
        navigation.navigate('MainpageScreen');
      }
      else {
        Alert.alert('Login Failed',"Please try again");
      }
      setIsLoading(false);
    } catch (error) {
      Alert.alert('Login Failed. Try Again',"Username or password incorrect.");
      setIsLoading(false);
    }

  };


  return (
    <SafeAreaView style={styles.container}>
      {/* <ImageBackground source={require("../assets/bg2.jpg")} resizeMode="cover" style={styles.backgroundImage}> */}

      <Background>
        {/* <BackButton goBack={navigation.goBack} /> */}
        <Image
          source={require('../assets/JainLogo.png')}
          style={styles.image}
        />
        <Header>Welcome.</Header> 
        <TextInput
            label="Email"
            returnKeyType="next"
            value={userName.value}
            onChangeText={(text) => setEmail({ value: text, error: '' })}
            error={!!userName.error}
            errorText={userName.error}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
   <TextInput
            label="Password"
            returnKeyType="done"
            value={password.value}
            onChangeText={(text) => setPassword({ value: text, error: '' })}
            error={!!password.error}
            errorText={password.error}

            secureTextEntry={!showPassword}
          />
        <View style={{width:100}}>
          <TouchableOpacity onPress={toggleShowPassword} style={{ position: 'absolute', top:- 50, right: -80 }}>
            <Icon name={showPassword ? 'eye' : 'eye-slash'} size={25} color="#007500" />
          </TouchableOpacity>
        </View>

        <View style={styles.forgotPassword}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ResetPasswordScreen')}
          >
            <Text style={styles.forgot}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
        <Button mode="outlined" onPress={onLogin}>
          Login
        </Button>
        <View style={styles.row}>
          <Text>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
            <Text style={styles.link}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </Background>
      {/* </ImageBackground> */}
      {/* Show the spinner if isLoading is true */}
      {isLoading && (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size="large" color="green" />
        </View>
      )}
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  dropdownStyle: {
    marginTop: 15
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  spinnerContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  image: {
    resizeMode: 'cover', // or 'contain', 'stretch', 'center'
  },
})
