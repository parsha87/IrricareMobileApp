import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Button from '../components/Button'
import Background from '../components/Background'
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker'
import { AxiosContext } from '../context/AxiosContext';
import { getItem } from '../Models/model'
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function SequenceSetting({ route }) {
  const { authAxios } = useContext(AxiosContext);

  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState();
  const [selectedController, setSelectedController] = useState();
  const [open, setOpen] = useState(false);
  const [itemsController, setItemsController] = useState([]);
  
  useEffect(() => {
    fetchMyAPI()
  }, []);

  const changeSelectOptionHandler = async (value) => {
    console.log(value)
    setSelectedController(value)
    await AsyncStorage.setItem('selectedController', JSON.stringify(value));

  };

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



  const handleBack = () => {
    navigation.navigate('Dashboard');
  };


  const handleSequenceSettingNavigation = () => {
    navigation.navigate('SequenceSettingList', {
      selectedControllerId: selectedController.value,
      selectedControllerName: selectedController.label
    })
  };


  const handleFilterSettingNavigation = () => {
    navigation.navigate('FilterSequenceList', {
      selectedControllerId: selectedController.value,
      selectedControllerName: selectedController.label
    })
  };
  return (

    <View>
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
      {/* <View style={{ flexDirection: 'row', backgroundColor: '#3498db', padding: 16 }}>
        <TouchableOpacity onPress={handleBack}>
          <Text style={{ color: '#fff', fontSize: 18, marginRight: 16 }}>{'< Back'}</Text>
        </TouchableOpacity>
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Sequence Settings</Text>
      </View> */}
      <View style={styles.container}>
        <Button
          mode="outlined"
          onPress={handleSequenceSettingNavigation}
        >
          Irrigation Sequence
        </Button>

        <Button
          mode="outlined"
          onPress={handleFilterSettingNavigation}
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