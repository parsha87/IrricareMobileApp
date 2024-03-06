import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from 'react-native'
import { Provider as PaperProvider, Card, DefaultTheme, ActivityIndicator } from 'react-native-paper';
import { Text } from 'react-native-paper'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { AxiosContext } from '../context/AxiosContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { convertTwoDigitYearToFourDigit, createDateFromTimeString } from '../Models/model'
import { useNavigation } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect

//reactnavigation.org - datepicker
//https://github.com/react-native-datetimepicker/datetimepicker#usage
const ConfigurationTimeScreen = ({ route }) => {
    const navigation = useNavigation();

    const { authAxios } = useContext(AxiosContext);
    // const { selectedControllerId, selectedControllerName } = route.params;
    const [controller, setSelectedController] = useState({
        selectedControllerId: 0,
        selectedControllerName: ''
    })

    const [controllerTimeObj, setControllerTimeObj] = useState({
        Id: 0,
        CurrentDateServer: '',
        CurrentDayServer: 0,
        CurrentMonthServer: 0,
        CurrentYearServer: 0,
        CuttentTimeServerHh: 0,
        CurrentTimeServerMin: 0,
        DayStartTimeHh: 0,
        DayStartTimeMin: 0,
        DayEndTimeHh: 0,
        DayEndTimeMin: 0,
        UserId: "",
        ControllerId: 0,
        ControllerNo: "",
        UsermobileImeino: ""
    }
    )
    const [isAdd, setIsAdd] = useState(true);

    //Server Current date
    const [date, setDate] = useState(new Date());
    //Server Current Time
    const [currentTime, setCurrentTime] = useState(new Date());
    //Day Start Time
    const [dayStartTime, setDayStarttime] = useState(new Date());
    //Day End Time
    const [dayEndTime, setDayEndtime] = useState(new Date());

    //Show Date picker
    const [show, setShow] = useState(false);
    //Show Time Picker
    const [showTime, setShowTime] = useState(false);
    //Show Day Start time picker
    const [showDayStartTime, setShowDayStartTime] = useState(false);
    //Show Day end Time Picker
    const [showDayEndTime, setShowDayEndTime] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const handleBack = () => {
        navigation.navigate('Dashboard')
    };
    const handleSubmit = async () => {
        setIsLoading(true);

        const value = await AsyncStorage.getItem('user');
        let jsonVal = JSON.parse(value);
        controllerTimeObj.UserId = jsonVal.userId;

        const fullYear = date.getFullYear();
        // Convert full year to two-digit year (YY)
        const twoDigitYear = String(fullYear).slice(2, 4);
        controllerTimeObj.CurrentDayServer = date.getDay()
        controllerTimeObj.CurrentMonthServer = date.getMonth()
        controllerTimeObj.CurrentYearServer = +twoDigitYear;
        controllerTimeObj.CuttentTimeServerHh = currentTime.getHours() == NaN ? 0 : currentTime.getHours();
        controllerTimeObj.CurrentTimeServerMin = currentTime.getMinutes() == NaN ? 0 : currentTime.getMinutes();
        controllerTimeObj.DayStartTimeHh = dayStartTime.getHours() == NaN ? 0 : dayStartTime.getHours();
        controllerTimeObj.DayStartTimeMin = dayStartTime.getMinutes() == NaN ? 0 : dayStartTime.getMinutes();
        controllerTimeObj.DayEndTimeHh = dayEndTime.getHours() == NaN ? 0 : dayEndTime.getHours();
        controllerTimeObj.DayEndTimeMin = dayEndTime.getMinutes() == NaN ? 0 : dayEndTime.getMinutes();
        controllerTimeObj.ControllerId = controller.selectedControllerId;
        controllerTimeObj.ControllerNo = controller.selectedControllerName;
        console.log(controllerTimeObj)
        if (isAdd) {
            //Add
            try {
                console.log("adding")
                const response = await authAxios.post('/ControllerTimeSetting', controllerTimeObj);
                console.log('Response:', response.data);
                setIsAdd(false)
                //set controller object
                setControllerTimeObj(response.data)
                alert("Data Saved Successfully.")
                setIsLoading(false);
                navigation.navigate('Dashboard')
            } catch (error) {
                console.error('Error:', error);
                setIsLoading(false);

                // Handle the error here
            }

        }
        else {
            //Update
            try {
                console.log("Updating")
                console.log("UserId" + controllerTimeObj.UserId)

                const response = await authAxios.put('/ControllerTimeSetting/' + controllerTimeObj.Id, controllerTimeObj);
                console.log('Response:', response.data);
                alert('Updated Successfully!');
                setIsLoading(false);
                alert("Data Saved Successfully.")
                navigation.navigate('Dashboard')

            } catch (error) {
                console.error('Error:', error);
                setIsLoading(false);

                // Handle the error here
            }


        }
    };

    const onChange = (event, selectedDate) => {
        console.warn(selectedDate)
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios'); // For iOS, we need to manually hide the picker
        setDate(selectedDate);
    };

    const onChangeTime = (event, selectedTime) => {
        const currentTime = selectedTime || currentTime;
        setShowTime(Platform.OS === 'ios'); // For iOS, we need to manually hide the picker
        setCurrentTime(currentTime);
    };

    const onChangeDayStartTime = (event, selectedTime) => {
        const dayStartTime = selectedTime || dayStartTime;
        setShowDayStartTime(Platform.OS === 'ios'); // For iOS, we need to manually hide the picker
        setDayStarttime(dayStartTime);
    };

    const onChangeDayEndTime = (event, selectedTime) => {
        const dayEndTime = selectedTime || dayEndTime;
        setShowDayEndTime(Platform.OS === 'ios'); // For iOS, we need to manually hide the picker
        setDayEndtime(dayEndTime);
    };

    const showPicker = () => {
        setShow(true);
    };

    const showTimePicker = () => {
        setShowTime(true);
    };

    const showDayStartTimePicker = () => {
        setShowDayStartTime(true);
    };

    const showDayEndimePicker = () => {
        setShowDayEndTime(true);
    };


    useFocusEffect(
        React.useCallback(() => {
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
                    //alert(controller.selectedControllerName)
                    const response = await authAxios.get('ControllerTimeSetting/ControllerTimeSettingByControllerId/' + id);
                    // Update the state with the received data
                    let data = response.data[0]
                    if (data != null) {
                        setIsAdd(false)
                        //alert(controllerTimeObj.UserId)
                        //set controller object
                        setControllerTimeObj(data)
                        console.log("UserId" + controllerTimeObj.UserId)
                        let currentYear = convertTwoDigitYearToFourDigit(data.CurrentYearServer);
                        let serverDate = new Date(currentYear, data.CurrentMonthServer, data.CurrentDayServer);
                        setDate(serverDate);
                        let timeServer = new Date(currentYear, data.CurrentMonthServer, data.CurrentDayServer, data.CuttentTimeServerHh, data.CurrentTimeServerMin);
                        setCurrentTime(timeServer)
                        let timeDayStart = new Date(currentYear, data.CurrentMonthServer, data.CurrentDayServer, data.DayStartTimeHh, data.DayStartTimeMin);
                        setDayStarttime(timeDayStart)
                        let timeDayEnd = new Date(currentYear, data.CurrentMonthServer, data.CurrentDayServer, data.DayEndTimeHh, data.DayEndTimeMin);
                        setDayEndtime(timeDayEnd)
                        setIsLoading(false);
                    }
                    else {
                        //Add
                    }

                    //setApiData(data);
                } catch (error) {
                    setIsLoading(false);
                    console.error('Error fetching data:', error);
                }
            };
            // getIMEI();
            retrieveSelectedController();
        }, [authAxios]) // Make sure to include any dependencies of the effect
    );

    return (

        <SafeAreaView style={{ flex: 1 }}>
            {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
                <Text style={{ fontSize: 18, color: 'green', fontWeight: 'bold', textAlign: 'center' }}>Configuration Time Setting</Text>
            </View> */}
            <Text style={styles.title}>Configuration Time Setting</Text>
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

               

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <View style={styles.formGroup}>
                            <TouchableOpacity onPress={showPicker}>
                                <TextInput
                                    label="Current Date"
                                    returnKeyType="done"
                                    editable={false}
                                    value={moment(date).format('MMMM D, YYYY')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {show && (
                    <DateTimePicker
                        label="Select Date"
                        value={date}
                        mode="date"
                        display="calendar"
                        onChange={onChange}
                        style={{ marginTop: 16 }}
                    />
                )}

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 2 }}>
                        <View style={styles.formGroup}>
                            <TouchableOpacity onPress={showTimePicker}>
                                <TextInput
                                    label="Server Time"
                                    returnKeyType="done"
                                    editable={false}
                                    value={moment(currentTime).format('HH:mm')}
                                />
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
                {showTime && (
                    <DateTimePicker
                        testID="dateTimePickerTime"
                        value={currentTime}
                        mode="time" // Options: 'date', 'time', 'datetime'
                        is24Hour={true}
                        display="default"
                        onChange={onChangeTime}
                    />
                )}

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 2 }}>
                        <View style={styles.formGroup}>
                            <TouchableOpacity onPress={showDayStartTimePicker}>
                                <TextInput
                                    label="Day Start Time"
                                    returnKeyType="done"
                                    editable={false}
                                    value={moment(dayStartTime).format('HH:mm')}
                                />
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
                {showDayStartTime && (
                    <DateTimePicker
                        testID="dateTimePickerTime"
                        value={dayStartTime}
                        mode="time" // Options: 'date', 'time', 'datetime'
                        is24Hour={true}
                        display="default"
                        onChange={onChangeDayStartTime}
                    />
                )}


                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 2 }}>
                        <View style={styles.formGroup}>
                            <TouchableOpacity onPress={showDayEndimePicker}>
                                <TextInput
                                    label="Day End Time"
                                    returnKeyType="done"
                                    editable={false}
                                    value={moment(dayEndTime).format('HH:mm')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {showDayEndTime && (
                    <DateTimePicker
                        testID="dateTimePickerTime"
                        value={dayEndTime}
                        mode="time" // Options: 'date', 'time', 'datetime'
                        is24Hour={true}
                        display="default"
                        onChange={onChangeDayEndTime}
                    />
                )}
                <Button
                    mode="outlined"
                    onPress={handleSubmit}
                >
                    Save
                </Button>
            </View>

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
})
export default ConfigurationTimeScreen;