import React, { useState, useContext } from 'react'
import { TouchableOpacity, StyleSheet, View, SafeAreaView, Alert, ImageBackground } from 'react-native'
import { Text } from 'react-native-paper'
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

export default function LoginScreen({ navigation }) {
  const [userName, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const authContext = useContext(AuthContext);
  const { publicAxios } = useContext(AxiosContext);
  const baseUrl = "http://121.242.3.79:9402/api/";


  const onLoginPressed = () => {
    const emailError = emailValidator(userName.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainpageScreen' }],
    })
  }

  const onLogin = async () => {
    const emailError = emailValidator(userName.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...userName, error: emailError })
      setPassword({ ...password, error: passwordError })
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

      const { authToken, refreshToken } = response.data;
      let authTokenStr = response.data.authToken;
      //await AsyncStorage.setItem('user', JSON.stringify(response.data));


      authContext.setAuthState({
        authTokenStr,
        authTokenStr,
        authenticated: true,
      });

      // await Keychain.setGenericPassword(
      //   'token',
      //   JSON.stringify({
      //     authTokenStr,
      //     authTokenStr, //refreshtoken
      //   }),
      // );
      if (authTokenStr != "") {
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainpageScreen' }],
        })
      }
      else {
        Alert.alert('Login Failed');
      }
    } catch (error) {
      Alert.alert('Login Failed', error);
    }

  };


  return (
    <SafeAreaView style={styles.container}>
      {/* <ImageBackground source={require("../assets/bg2.jpg")} resizeMode="cover" style={styles.backgroundImage}> */}

        <Background>
          {/* <BackButton goBack={navigation.goBack} /> */}
          <Logo />
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
            secureTextEntry
          />
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
            <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
              <Text style={styles.link}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </Background>
      {/* </ImageBackground> */}
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
})
