import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
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
import { nameValidator } from '../helpers/nameValidator'
import { ScrollView } from 'react-native-gesture-handler'
import DropDownPicker from 'react-native-dropdown-picker';




export default function RegisterScreen({ navigation }) {
  const [FirstName, setFirstName] = useState({ value: '', error: '' })
  const [lastName, setlastName] = useState({ value: '', error: '' })
  const [mobileNo, setmobileNo] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [address, setAddress] = useState({ value: '', error: '' })
  const [timezone, setTimezone] = useState({ value: '', error: '' })
  const [controllerNo, setControllerNo] = useState([])
  const [subUseremail, setsubUseremail] = useState({ value: '', error: '' })
  const [subUserMobileNo, setsubUserMobileNo] = useState({ value: '', error: '' })
  
  //dropdown
  const [language, setLanguage] = useState("")
  const [openlanguage, setlanguageOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Spain', value: 'spain' },
    { label: 'Madrid', value: 'madrid' },
    { label: 'Barcelona', value: 'barcelona' },
    { label: 'Italy', value: 'italy' },
    { label: 'Rome', value: 'rome'},
    { label: 'Finland', value: 'finland' }
  ]);


  const [country, setCountry] = useState("")
  const [opencountry, setopencountry] = useState(false);
  const [countryitems, setcountryItems] = useState([
    { label: 'Spain', value: 'spain' },
    { label: 'Madrid', value: 'madrid' },
    { label: 'Barcelona', value: 'barcelona' },
    { label: 'Italy', value: 'italy' },
    { label: 'Rome', value: 'rome'},
    { label: 'Finland', value: 'finland' }
  ]);

  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    })
  }
  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <ScrollView>
      <View style={{ flexDirection: 'row', backgroundColor: '#3498db', padding: 16 }}>
        <TouchableOpacity onPress={handleBack}>
          <Text style={{ color: '#fff', fontSize: 18, marginRight: 16 }}>{'< Back'}</Text>
        </TouchableOpacity>
        {/* <BackButton goBack={navigation.goBack} /> */}
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Create Account</Text>
      </View>
      <View style={{ padding: 16 }}>


        <TextInput
          label="FirstName"
          returnKeyType="next"
          value={FirstName.value}
          onChangeText={(text) => setFirstName({ value: text, error: '' })}
          error={!!FirstName.error}
          errorText={FirstName.error}
        />

        <TextInput
          label="last Name"
          returnKeyType="next"
          value={lastName.value}
          onChangeText={(text) => setlastName({ value: text, error: '' })}
          error={!!lastName.error}
          errorText={lastName.error}
        />
        <TextInput
          label="mobile No"
          returnKeyType="next"
          value={mobileNo.value}
          onChangeText={(text) => setmobileNo({ value: text, error: '' })}
          error={!!mobileNo.error}
          errorText={mobileNo.error}
        />
        <TextInput
          label="Email"
          returnKeyType="next"
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, error: '' })}
          error={!!email.error}
          errorText={email.error}
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
        <TextInput
          label="address"
          returnKeyType="done"
          value={address.value}
          onChangeText={(text) => setAddress({ value: text, error: '' })}
          error={!!address.error}
          errorText={address.error}

        />
         <DropDownPicker
          open={opencountry}
          value={country}
          items={countryitems}
          setOpen={setopencountry}
          setValue={setCountry}
          setItems={setcountryItems}
        />

        <TextInput
          label="timezone"
          returnKeyType="done"
          value={timezone.value}
          onChangeText={(text) => setTimezone({ value: text, error: '' })}
          error={!!timezone.error}
          errorText={timezone.error}
        />
        <DropDownPicker
          open={openlanguage}
          value={language}
          items={items}
          setOpen={setlanguageOpen}
          setValue={setLanguage}
          setItems={setItems}
        />
       

        <TextInput
          label="controllerNo"
          returnKeyType="done"
          value={controllerNo.value}
          onChangeText={(text) => setControllerNo({ value: text, error: '' })}
          error={!!controllerNo.error}
          errorText={controllerNo.error}

        />
        <TextInput
          label="subUseremail"
          returnKeyType="done"
          value={subUseremail.value}
          onChangeText={(text) => setsubUseremail({ value: text, error: '' })}
          error={!!subUseremail.error}
          errorText={subUseremail.error}

        />
        <TextInput
          label="subUserMobileNo"
          returnKeyType="done"
          value={subUserMobileNo.value}
          onChangeText={(text) => setsubUserMobileNo({ value: text, error: '' })}
          error={!!subUserMobileNo.error}
          errorText={subUserMobileNo.error}

        />

        <Button
          mode="contained"
          onPress={onSignUpPressed}
          style={{ marginTop: 24 }}
        >
          Sign Up
        </Button>
        <View style={styles.row}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
