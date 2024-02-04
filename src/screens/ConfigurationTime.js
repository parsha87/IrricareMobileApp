import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from 'react-native'
import { Provider as PaperProvider, Card, DefaultTheme } from 'react-native-paper';
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

//reactnavigation.org - datepicker
//https://github.com/react-native-datetimepicker/datetimepicker#usage
const ConfigurationTimeScreen = ({ route }) => {
    const navigation = useNavigation();

    const { authAxios } = useContext(AxiosContext);
    const { selectedControllerId, selectedControllerName } = route.params;

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

    const handleBack = () => {
        navigation.navigate('Dashboard')
    };
    const handleSubmit = async () => {
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
        controllerTimeObj.ControllerId = selectedControllerId;
        controllerTimeObj.ControllerNo = selectedControllerName;
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
            } catch (error) {
                console.error('Error:', error);
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
            } catch (error) {
                console.error('Error:', error);
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


    useEffect(() => {

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

        const fetchData = async () => {
            try {
                const response = await authAxios.get('ControllerTimeSetting/ControllerTimeSettingByControllerId/' + selectedControllerId);
                // Update the state with the received data
                let data = response.data[0]
                if (data != null) {
                    setIsAdd(false)
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


    return (

        <SafeAreaView>
            <View style={{ flexDirection: 'row', backgroundColor: '#3498db', padding: 16 }}>
                <TouchableOpacity onPress={handleBack}>
                    <Text style={{ color: '#fff', fontSize: 18, marginRight: 16 }}>{'< Back'}</Text>
                </TouchableOpacity>
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Configuration Time Setting</Text>
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

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <View style={styles.formGroup}>
                                    <Text style={styles.label}>Server Date:
                                    </Text>
                                    <TextInput
                                        label="Current Date"
                                        returnKeyType="done"
                                        editable={false}
                                        value={moment(date).format('MMMM D, YYYY')}
                                    />
                                </View>
                            </View>
                            <View >
                                <Icon style={{ marginTop: 47, padding: 4 }} name="calendar-days" size={25} color="#007500" onPress={showPicker} />
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
                                    <Text style={styles.label}>Server Time:
                                    </Text>
                                    <TextInput
                                        label="Current Time"
                                        returnKeyType="done"
                                        editable={false}
                                        value={moment(currentTime).format('HH:mm')}
                                    />
                                </View>
                            </View>
                            <View>
                                <Icon style={{ marginTop: 47, padding: 4 }} name="clock" size={25} color="#007500" onPress={showTimePicker} />
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
                                    <Text style={styles.label}>Day Start Time:
                                    </Text>
                                    <TextInput
                                        label="Day Start Time"
                                        returnKeyType="done"
                                        editable={false}
                                        value={moment(dayStartTime).format('HH:mm')}
                                    />
                                </View>
                            </View>
                            <View>
                                <Icon style={{ marginTop: 47, padding: 4 }} name="clock" size={25} color="#007500" onPress={showDayStartTimePicker} />
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
                                    <Text style={styles.label}>Day End Time:
                                    </Text>
                                    <TextInput
                                        label="Day End Time"
                                        returnKeyType="done"
                                        editable={false}
                                        value={moment(dayEndTime).format('HH:mm')}
                                    />
                                </View>
                            </View>
                            <View>
                                <Icon style={{ marginTop: 47, padding: 4 }} name="clock" size={25} color="#007500" onPress={showDayEndimePicker} />
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
                </Card.Content>
            </Card>

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
export default ConfigurationTimeScreen;