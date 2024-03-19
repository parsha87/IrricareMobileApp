import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
import { AxiosContext } from '../context/AxiosContext';

const MainpageScreen = ({ navigation }) => {
  const { authAxios } = useContext(AxiosContext);
  const [open, setOpen] = useState(false);
  const [itemsController, setItemsController] = useState([]);
  const [selectedValue, setSelectedValue] = useState();
  const [currentUser, setcurrentUser] = useState("");
  useFocusEffect(
    React.useCallback(async () => {

      const value = await AsyncStorage.getItem('user');
      let jsonVal = JSON.parse(value);
      setcurrentUser(jsonVal.firstName)
      const fetchControllers = async () => {
        try {
          const value = await AsyncStorage.getItem('user');
          const jsonVal = JSON.parse(value);
          const response = await authAxios.get('ControllerUser/' + jsonVal.userId);
          const items = response.data.map(s => ({ label: s.ControllerNo, value: s.ControllerId }));
          setItemsController(items);
        } catch (error) {
          console.error('Error fetching controllers:', error);
        }
      };
      fetchControllers();
    }, [authAxios]) // Make sure to include any dependencies of the effect
  );

  const changeSelectOptionHandler = async (value) => {
    setSelectedValue(value);
    await AsyncStorage.setItem('selectedController', JSON.stringify(value));
  };

  return (

    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
      <Text style={styles.titleName}>Hi, {currentUser}</Text>
        <Text style={styles.title}>Dashboard</Text>
        <View style={styles.gridContainer}>
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
            itemStyle={{ justifyContent: 'flex-start', marginLeft: 8 }}
            onSelectItem={changeSelectOptionHandler}
          />
        </View>
      </View>
    </SafeAreaView>

  );
};

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
  titleName: {
    fontSize: 15,
    marginBottom: 5,
    textAlign: 'right',
    color: 'green',
    padding:5

},
});

export default MainpageScreen;
