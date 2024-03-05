import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, TouchableOpacity, SafeAreaView, Alert, ScrollView } from 'react-native'
import { Provider as PaperProvider, Card, DefaultTheme, ActivityIndicator } from 'react-native-paper';
import { Text } from 'react-native-paper'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { AxiosContext } from '../context/AxiosContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import moment from 'moment';
const FilterSequenceScreen = ({ route }) => {
    const navigation = useNavigation();

    const { authAxios } = useContext(AxiosContext);
    const { selectedControllerId, selectedControllerName, dataModel, isAddData } = route.params;
    const [isLoading, setIsLoading] = useState(false);

    const [formMaxFilterData, setMaxFilterFormData] = useState({
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

    const [formData, setFormData] = useState({
        Id: number = 0,
        MaxFilterValve: number = 0,
        PumpNo: number = 0,
        FlushTimeMin: number = 0,
        FlushTimeSec: number = 0,
        IntervalHh: number = 0,
        IntervalMin: number = 0,
        IntervalSec: number = 0,
        UserId: string = "",
        ControllerNo: "",
        ControllerId: number = 0,
        UsermobileImeino: "",
    }
    )
    const [isAdd, setIsAdd] = useState(true);

    //Day Start Time
    const [fbTIme, setFbTime] = useState(new Date());

    //Show Day Start time picker
    const [showFbTime, setShowFbTime] = useState(false);



    useFocusEffect(
        React.useCallback(() => {
            setIsLoading(true);
            setIsAdd(isAddData);
            setFormData(dataModel);
            //If edit
            if (isAddData == false) {
                let currentYear = new Date().getFullYear();
                let CurrentMonthServer = new Date().getMonth();
                let CurrentDayServer = new Date().getDay();
                let timInterval = new Date(currentYear, CurrentMonthServer, CurrentDayServer, dataModel.IntervalHh, dataModel.IntervalMin, dataModel.IntervalSec);
                setFbTime(timInterval)
            }
            else {
                fetchData(selectedControllerId);
            }


            setIsLoading(false)
        }, [authAxios]) // Make sure to include any dependencies of the effect
    );

    const fetchData = async (id) => {
        try {
            const response = await authAxios.get('MaxFiltervalveSetting/MaxFiltervalveByControllerId/' + id);
            // Update the state with the received data
            let data = response.data[0]
            console.log(data)
            if (data != null) {

                setMaxFilterFormData(data)
                setFormData({
                    ...formData,
                    ['MaxFilterValve']: data.MaxFilter,
                });


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
    const handleBack = () => {
        navigation.navigate('Dashboard')
    };

    const handleSubmit = async () => {
        const value = await AsyncStorage.getItem('user');
        let jsonVal = JSON.parse(value);
        formData.UserId = jsonVal.userId;
        formData.IntervalHh = fbTIme.getHours() == NaN ? 0 : fbTIme.getHours();
        formData.IntervalMin = fbTIme.getMinutes() == NaN ? 0 : fbTIme.getMinutes();
        formData.IntervalSec = fbTIme.getSeconds() == NaN ? 0 : fbTIme.getSeconds();
        formData.ControllerId = selectedControllerId;
        formData.ControllerNo = selectedControllerName;
        if (isAdd) {
            //Add
            try {
                console.log("adding")
                const response = await authAxios.post('/FilterSequenceSetting', formData);
                console.log('Response:', response.data);
                setIsAdd(false)
                //set controller object
                setFormData(response.data)
                alert("Data Saved Successfully.")
                navigation.navigate('FilterSequenceList')
            } catch (error) {
                console.error('Error:', error);
                // Handle the error here
            }

        }
        else {
            //Update
            try {
                console.log("Updating")
                const response = await authAxios.put('/FilterSequenceSetting/' + formData.Id, formData);
                console.log('Response:', response.data);
                alert("Data Saved Successfully.");
                navigation.navigate('FilterSequenceList')

            } catch (error) {
                console.error('Error:', error);
                // Handle the error here
            }


        }
    };

    const handleTextInputChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value,
        });
    };
    const onChangeFb = (event, selectedTime) => {
        const fbTime = selectedTime || fbTime;
        setShowFbTime(Platform.OS === 'ios'); // For iOS, we need to manually hide the picker
        setFbTime(fbTime);
    };
    const showFbimePicker = () => {
        setShowFbTime(true);
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <Text style={styles.title}>Filter Sequences</Text>
                <Text style={styles.controllerName}>Controller No: {selectedControllerName}</Text>

                <View>
                    <View style={styles.container}>
                        <TextInput style={{ color: 'black', backgroundColor: 'white' }}
                            label="Max Filter Valve"
                            returnKeyType="done"
                            keyboardType="numeric"
                            editable={false}
                            value={formData.MaxFilterValve.toString()}
                            onChangeText={(value) => handleTextInputChange('MaxFilterValve', value)}
                        />
                        <TextInput style={{ color: 'black', backgroundColor: 'white' }}
                            label="Pump No"
                            returnKeyType="done"
                            keyboardType="numeric"
                            value={formData.PumpNo.toString()}
                            onChangeText={(value) => handleTextInputChange('PumpNo', value)}
                        />
                        <TextInput style={{ color: 'black', backgroundColor: 'white' }}
                            label="Flush TIme (Min)"
                            returnKeyType="done"
                            keyboardType="numeric"
                            value={formData.FlushTimeMin.toString()}
                            onChangeText={(value) => handleTextInputChange('FlushTimeMin', value)}
                        />
                        <TextInput style={{ color: 'black', backgroundColor: 'white' }}
                            label="Flush TIme (Sec)"
                            returnKeyType="done"
                            keyboardType="numeric"
                            value={formData.FlushTimeSec.toString()}
                            onChangeText={(value) => handleTextInputChange('FlushTimeSec', value)}
                        />
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 2 }}>
                                <View style={styles.formGroup}>
                                    <TouchableOpacity onPress={showFbimePicker}>
                                        <TextInput
                                            label="Interval"
                                            returnKeyType="done"
                                            editable={false}
                                            value={moment(fbTIme).format('HH:mm')}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        {showFbTime && (
                            <DateTimePicker
                                testID="dateTimePickerTime"
                                value={fbTIme}
                                mode="time" // Options: 'date', 'time', 'datetime'
                                is24Hour={true}
                                display="default"
                                onChange={onChangeFb}
                            />
                        )}


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
    container: {
        padding: 20,
        width: '100%',
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
    }, title: {
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
});
export default FilterSequenceScreen;