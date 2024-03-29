import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, TouchableOpacity, SafeAreaView, Alert, ScrollView } from 'react-native'
import { Provider as PaperProvider, Card, DefaultTheme, ActivityIndicator } from 'react-native-paper';
import { AxiosContext } from '../context/AxiosContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Text } from 'react-native-paper'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import Toast from 'react-native-toast-message';
// import { Toastify } from 'react-native-toastify';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import your desired icon library
const MaxFilterValveSettingsScreen = ({ route }) => {
    const navigation = useNavigation();
    const { authAxios } = useContext(AxiosContext);
    // const { selectedControllerId, selectedControllerName } = route.params;
    const [controller, setSelectedController] = useState({
        selectedControllerId: 0,
        selectedControllerName: ''
    })
    const [isLoading, setIsLoading] = useState(false);

    const [isAdd, setIsAdd] = useState(true);
    const [inputValue, setInputValue] = useState('sds');
    const [currentUser, setcurrentUser] = useState("");
    const [formData, setFormData] = useState({
        Id: 0,
        MaxFilter: 0,
        TotalFilterValvePump1: 0,
        FilterValveWithPump1: 0,
        TotalFilterValvePump2: 0,
        FilterValveWithPump2: 0,
        MaxValve: 0,
        IrrigateValve: 0,
        UserId: '',
        ControllerNo: '',
        ControllerId: 0,
        UsermobileImeino: ''
    })


    useFocusEffect(
        React.useCallback(async () => {
            const value = await AsyncStorage.getItem('user');
            let jsonVal = JSON.parse(value);
            setcurrentUser(jsonVal.firstName)

            setIsLoading(true);
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
                        fetchData(jsonVal.value); 
                        setIsLoading(false);
                    }
                    else {
                        alert("Select controller no form dashboard")
                        setIsLoading(false);
                    }
                } catch (error) {
                    console.error('Error retrieving selected controller:', error);
                    alert("Select controller no form dashboard")
                    setIsLoading(false);
                }
            };


            // const value = await AsyncStorage.getItem('selectedController');
            // let jsonVal = JSON.parse(value);
            // const id = jsonVal.value
            // Define a function to fetch data from the API
            const getIMEI = async () => {
                try {
                    const imeiNumber = await DeviceInfo.getImei();
                    console.log('IMEI Number:', imeiNumber);
                    controllerTimeObj.UsermobileImeino = imeiNumber
                } catch (error) {
                    console.error('Error getting IMEI:', error);
                }
            };

            const fetchData = async (id) => {
                try {
                    const response = await authAxios.get('MaxFiltervalveSetting/MaxFiltervalveByControllerId/' + id);
                    // Update the state with the received data
                    let data = response.data[0]
                    console.log(data)
                    if (data != null) {
                        setIsAdd(false)
                        //set controller object
                        setFormData(data)
                        console.log("UserId" + formData.UserId)
                        setIsLoading(false);
                    }
                    else {
                        //Add
                    }

                    //setApiData(data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setIsLoading(false);
                }
            };
            // getIMEI();
            retrieveSelectedController();
        }, [authAxios]) // Make sure to include any dependencies of the effect
    );

    const handleBack = () => {
        navigation.navigate('Dashboard')
    };

    const handleTextInputChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value,
        });
    };

    const handleSubmit = async () => {
        if (+formData.MaxFilter < (+formData.TotalFilterValvePump1 + +formData.TotalFilterValvePump2)) {
            alert("Addition of Nos of Filters on pump 1 and pump 2 should be less than of Max Filter enter value")
            return;
        }
        setIsLoading(true);
        const value = await AsyncStorage.getItem('user');
        let jsonVal = JSON.parse(value);
        formData.UserId = jsonVal.userId;
        // Perform actions with formData, for example, submit to server
        formData.ControllerId = controller.selectedControllerId;
        formData.ControllerNo = controller.selectedControllerName;

        if (isAdd) {
            //Add
            try {
                console.log("adding")
                const response = await authAxios.post('/MaxFiltervalveSetting', formData);
                console.log('Response:', response.data);
                setIsAdd(false)
                //set setFormData
                setFormData(response.data)
                Toast.show('Setting Saved Sucessfully', Toast.SHORT);
                alert("Data Saved Successfully.")
                setIsLoading(false);
                navigation.navigate('Dashboard')
            } catch (error) {
                console.error('Error:', error);
                setIsLoading(false);

                // Toastify({
                //     text: 'Error Saving setting',
                //     duration: 3000, // milliseconds
                // });
            }

        }
        else {
            //Update
            try {
                console.log("Updating")
                console.log("UserId" + formData.UserId)

                const response = await authAxios.put('/MaxFiltervalveSetting/' + formData.Id, formData);
                console.log('Response:', response.data);
                setIsLoading(false);
                alert("Data Saved Successfully.")
                navigation.navigate('Dashboard')
            } catch (error) {
                console.error('Error:', error);
                setIsLoading(false);

                // Toastify({
                //     text: 'Error Saving setting',
                //     duration: 3000, // milliseconds
                // });
            }


        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
                    <Text style={{ fontSize: 18, color: 'green', fontWeight: 'bold', textAlign: 'center' }}>Max Filter & Max Valve setting</Text>
                </View> */}
                      <Text style={styles.titleName}>Hi, {currentUser}</Text>

                            <Icon onPress={handleBack} name="chevron-left" size={30} color="green" />
                
                <Text style={styles.title}>Max Filter & Max Valve setting</Text>
                <Text style={styles.controllerName}>Controller No: {controller.selectedControllerName}</Text>
                <View style={styles.container}>
                    {/* <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Controller No: {controller.selectedControllerName}
                                </Text>
                            </View>
                        </View>
                    </View> */}
                    <View style={styles.formGroup}>
                        {/* <Text style={styles.label}>Max Filter:
                        </Text> */}
                        <TextInput
                            label="Max Filter"
                            returnKeyType="done"
                            keyboardType="numeric"
                            value={formData.MaxFilter.toString()}
                            maxLength={2}
                            onChangeText={(value) => handleTextInputChange('MaxFilter', value)}
                        />
                        {/* <Text style={styles.label}>Total Filter Valve Pump 1:
                        </Text> */}
                        <TextInput
                            label="Nos of Filters on Pump 1"
                            returnKeyType="done"
                            keyboardType="numeric"
                            maxLength={2}
                            value={formData.TotalFilterValvePump1.toString()}
                            onChangeText={(value) => handleTextInputChange('TotalFilterValvePump1', value)}
                        />
                        {/* <Text style={styles.label}>Total Filter Valve Pump 1:
                        </Text> */}
                        <TextInput
                            label="Nos of Filters on Pump 2"
                            returnKeyType="done"
                            keyboardType="numeric"
                            maxLength={2}
                            value={formData.TotalFilterValvePump2.toString()}
                            onChangeText={(value) => handleTextInputChange('TotalFilterValvePump2', value)}


                        />
                        {/* <TextInput
                            label="Total Filter Valve Pump 2"
                            returnKeyType="done"
                            value={formData.TotalFilterValvePump2.toString()}
                            onChangeText={(value) => handleTextInputChange('TotalFilterValvePump2', value)}


                        />
                        <TextInput
                            label="FilterValveWithPump2"
                            returnKeyType="done"
                            keyboardType="numeric"
                            value={formData.FilterValveWithPump2.toString()}
                            onChangeText={(value) => handleTextInputChange('FilterValveWithPump2', value)}
                            /> */}
                        <TextInput
                            label="MaxValve"
                            returnKeyType="done"
                            keyboardType="numeric"
                            maxLength={2}
                            value={formData.MaxValve.toString()}
                            onChangeText={(value) => handleTextInputChange('MaxValve', value)}

                        />
                        {/* <TextInput
                            label="Irrigation Valve"
                            returnKeyType="done"
                            keyboardType="numeric"
                            value={formData.IrrigateValve.toString()}
                            onChangeText={(value) => handleTextInputChange('IrrigateValve', value)}
                        /> */}
                        <Button
                            mode="outlined"
                            onPress={handleSubmit}
                        >
                            Sumbit
                        </Button>


                    </View>
                </View>
            </ScrollView>
            {/* Show the spinner if isLoading is true */}
            {isLoading && (
                <View style={styles.spinnerContainer}>
                    <ActivityIndicator size="large" color="green" />
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    // container: {

    //     padding: 20,
    //     width: '100%',
    // },
    container: {
        //flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    formGroup: {
        marginBottom: 1,
    },
    label: {
        fontSize: 16,
        marginBottom: 2,
        fontWeight: 'bold',
    },
    input: {
        padding: 2,
    },
    dateTimePicker: {
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor: '#C5C5C5',
        borderWidth: 1,
        marginVertical: 10,
        height: 43,
    },
    selectedDateLabel: {
        marginTop: 8,
        fontSize: 16,
        fontWeight: 'bold',
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
    titleName: {
        fontSize: 15,
        marginBottom: 5,
        textAlign: 'right',
        color: 'green',
        backgroundColor:'lightyellow',
        padding:5

    },
})
export default MaxFilterValveSettingsScreen;