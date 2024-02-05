import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, TouchableOpacity, SafeAreaView, Alert, ScrollView } from 'react-native'
import { Provider as PaperProvider, Card, DefaultTheme } from 'react-native-paper';
import { AxiosContext } from '../context/AxiosContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native-paper'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
// import { Toastify } from 'react-native-toastify';

const ConfigurationSettingsScreen = ({ route }) => {
    const navigation = useNavigation();
    const { authAxios } = useContext(AxiosContext);
    const { selectedControllerId, selectedControllerName } = route.params;
    const [isAdd, setIsAdd] = useState(true);
    const [inputValue, setInputValue] = useState('sds');

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
    useEffect(() => {
        // Define a function to fetch data from the API
        const fetchData = async () => {
            try {
                const response = await authAxios.get('MaxFiltervalveSetting/MaxFiltervalveByControllerId/' + selectedControllerId);
                // Update the state with the received data
                let data = response.data[0]
                console.log(data)
                if (data != null) {
                    setIsAdd(false)
                    //set controller object
                    setFormData(data)
                    console.log("UserId" + formData.UserId)
                }
                else {
                    //Add
                }

                //setApiData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        // getIMEI();
        fetchData();
    }, []);

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
        const value = await AsyncStorage.getItem('user');
        let jsonVal = JSON.parse(value);
        formData.UserId = jsonVal.userId;
        // Perform actions with formData, for example, submit to server
        formData.ControllerId = selectedControllerId;
        formData.ControllerNo = selectedControllerName;

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
                // Toastify({
                //     text: 'Setting Saved Sucessfully',
                //     duration: 3000, // milliseconds
                // });
            } catch (error) {
                console.error('Error:', error);
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
                // Toastify({
                //     text: 'Setting Saved Sucessfully',
                //     duration: 3000, // milliseconds
                // });
            } catch (error) {
                console.error('Error:', error);
                // Toastify({
                //     text: 'Error Saving setting',
                //     duration: 3000, // milliseconds
                // });
            }


        }
    };

    return (

        <ScrollView>
            <SafeAreaView>

                <View style={{ flexDirection: 'row', backgroundColor: '#3498db', padding: 16 }}>
                    <TouchableOpacity onPress={handleBack}>
                        <Text style={{ color: '#fff', fontSize: 18, marginRight: 16 }}>{'< Back'}</Text>
                    </TouchableOpacity>
                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Max Filter Max Valve Setting</Text>
                </View>


                <Card>
                    <Card.Content style={{ padding: 5, margin: 5 }}>
                        <View style={styles.container}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                    <View style={styles.formGroup}>
                                        <Text style={styles.label}>Controller No: {selectedControllerName}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Max Filter:
                                </Text>
                                <TextInput style={{ color: 'black', backgroundColor: 'white' }}
                                    label="Max Filter"
                                    returnKeyType="done"
                                    keyboardType="numeric"
                                    value={formData.MaxFilter.toString()}
                                    onChangeText={(value) => handleTextInputChange('MaxFilter', value)}
                                />
                                <Text style={styles.label}>Total Filter Valve Pump 1:
                                </Text>
                                <TextInput
                                    label="Total Filter Valve Pump1"
                                    returnKeyType="done"
                                    keyboardType="numeric"
                                    value={formData.TotalFilterValvePump1.toString()}
                                    onChangeText={(value) => handleTextInputChange('TotalFilterValvePump1', value)}
                                />
                                <Text style={styles.label}>Total Filter Valve Pump 1:
                                </Text>
                                <TextInput
                                    label="Filter Valve With Pump1"
                                    returnKeyType="done"
                                    keyboardType="numeric"
                                    value={formData.FilterValveWithPump1.toString()}
                                    onChangeText={(value) => handleTextInputChange('FilterValveWithPump1', value)}


                                />
                                <TextInput
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


                                />
                                <TextInput
                                    label="MaxValve"
                                    returnKeyType="done"
                                    keyboardType="numeric"
                                    value={formData.MaxValve.toString()}
                                    onChangeText={(value) => handleTextInputChange('MaxValve', value)}

                                />
                                <TextInput
                                    label="Irrigation Valve"
                                    returnKeyType="done"
                                    keyboardType="numeric"
                                    value={formData.IrrigateValve.toString()}
                                    onChangeText={(value) => handleTextInputChange('IrrigateValve', value)}


                                />
                                <Button
                                    mode="outlined"
                                    onPress={handleSubmit}
                                >
                                    Sumbit
                                </Button>


                            </View>
                        </View>
                    </Card.Content>
                </Card>

            </SafeAreaView>
        </ScrollView>


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
        fontSize: 14,
        marginBottom: 0,
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
})
export default ConfigurationSettingsScreen;