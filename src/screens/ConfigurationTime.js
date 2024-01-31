import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import { Text } from 'react-native-paper'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { AxiosContext } from '../context/AxiosContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

//reactnavigation.org - datepicker
//https://github.com/react-native-datetimepicker/datetimepicker#usage
const ConfigurationTimeScreen = ({ navigation }) => {
    const { authAxios } = useContext(AxiosContext);

    const HHList = [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
        { label: '6', value: '6' },
        { label: '7', value: '7' },
        { label: '8', value: '8' },
        { label: '9', value: '9' },
        { label: '10', value: '10' },
        { label: '11', value: '11' },
        { label: '12', value: '12' },
        { label: '13', value: '13' },
        { label: '14', value: '14' },
        { label: '15', value: '15' },
        { label: '16', value: '16' },
        { label: '17', value: '17' },
        { label: '18', value: '18' },
        { label: '19', value: '19' },
        { label: '20', value: '20' },
        { label: '21', value: '21' },
        { label: '22', value: '22' },
        { label: '23', value: '23' },
        { label: '24', value: '24' }
    ]

    const MMList = [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
        { label: '6', value: '6' },
        { label: '7', value: '7' },
        { label: '8', value: '8' },
        { label: '9', value: '9' },
        { label: '10', value: '10' },
        { label: '11', value: '11' },
        { label: '12', value: '12' },
        { label: '13', value: '13' },
        { label: '14', value: '14' },
        { label: '15', value: '15' },
        { label: '16', value: '16' },
        { label: '17', value: '17' },
        { label: '18', value: '18' },
        { label: '19', value: '19' },
        { label: '20', value: '20' },
        { label: '21', value: '21' },
        { label: '22', value: '22' },
        { label: '23', value: '23' },
        { label: '24', value: '24' },
        { label: '25', value: '25' },
        { label: '26', value: '26' },
        { label: '27', value: '27' },
        { label: '28', value: '28' },
        { label: '29', value: '29' },
        { label: '30', value: '30' },
        { label: '31', value: '31' },
        { label: '32', value: '32' },
        { label: '33', value: '33' },
        { label: '34', value: '34' },
        { label: '35', value: '35' },
        { label: '36', value: '36' },
        { label: '37', value: '37' },
        { label: '38', value: '38' },
        { label: '39', value: '39' },
        { label: '40', value: '40' },
        { label: '41', value: '41' },
        { label: '42', value: '42' },
        { label: '43', value: '43' },
        { label: '44', value: '44' },
        { label: '45', value: '45' },
        { label: '46', value: '46' },
        { label: '47', value: '47' },
        { label: '48', value: '48' },
        { label: '49', value: '49' },
        { label: '50', value: '50' },
        { label: '51', value: '51' },
        { label: '52', value: '52' },
        { label: '53', value: '53' },
        { label: '54', value: '54' },
        { label: '55', value: '55' },
        { label: '56', value: '56' },
        { label: '57', value: '57' },
        { label: '58', value: '58' },
        { label: '59', value: '59' },
        { label: '60', value: '60' },

    ]
    const [controllerTimeObj, setControllerTimeObj] = useState({
        id: 0,
        currentDateServer: 0,
        currentDayServer: 0,
        currentMonthServer: 0,
        currentYearServer: 0,
        cuttentTimeServerHh: 0,
        dayStartTimeHh: 0,
        dayEndTimeHh: 0,
        userId: "",
        controllerId: 0,
        controllerNo: "",
        currentTimeServerMin: 0,
        dayStartTimeMin: 0,
        dayEndTimeMin: 0,
        usermobileImeino: ""
    }
    )

    const [date, setDate] = useState(new Date());
    const [currentTime, setCurrentTime] = useState(new Date());

    const [show, setShow] = useState(false);
    const [showTime, setShowTime] = useState(false);


    const [currentDay, setcurrentDay] = useState({ value: '', error: '' })
    const [dayStart, setdayStart] = useState({ value: '', error: '' })
    const [dayEnd, setdayEnd] = useState({ value: '', error: '' })
    const [dayStartHH, setdayStartHH] = useState("")
    const [opendaystartHH, setopendaystartHH] = useState(false);
    const [itemsHH, setItemsHH] = useState(HHList);
    const [dayStartMM, setdayStartMM] = useState("")
    const [opendaystartMM, setopendaystartMM] = useState(false);
    const [ItemsMM, setItemsMM] = useState(MMList);
    //dropdrown dayEndHH
    const [dayEndHH, setdayEndHH] = useState("")
    const [openEndHH, setopenEndHH] = useState(false);
    const [itemsendHH, setitemsendHH] = useState(HHList);
    //
    const [dayEndMM, setdayEndMM] = useState("")
    const [opendayEndMM, setopendayEndMM] = useState(false);
    const [itemsEndMM, setItemsEndMM] = useState(MMList);

    const handleBack = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Dashboard' }],
        })
    };
    const handleSubmit = () => {
        // Handle form submission logic here
        console.log('Form submitted with value:', inputValue);
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios'); // For iOS, we need to manually hide the picker
        setDate(currentDate);
    };

    const onChangeTime = (event, selectedTime) => {
        const currentTime = selectedTime || currentTime;
        setShowTime(Platform.OS === 'ios'); // For iOS, we need to manually hide the picker
        setCurrentTime(currentTime);
    };

    const showPicker = () => {
        setShow(true);
    };


    const showTimePicker = () => {
        setShowTime(true);
    };


    useEffect(async () => {
        const value = await AsyncStorage.getItem('selectedController');
        let jsonVal = JSON.parse(value);
        const id = jsonVal.value
        const response = await authAxios.get('ControllerTimeSetting/ControllerTimeSettingByControllerId/' + id);
        console.log(response.data);
        Alert.alert('got time');
    }, []);


    return (

        <SafeAreaView>

            <View style={{ flexDirection: 'row', backgroundColor: '#3498db', padding: 16 }}>
                <TouchableOpacity onPress={handleBack}>
                    <Text style={{ color: '#fff', fontSize: 18, marginRight: 16 }}>{'< Back'}</Text>
                </TouchableOpacity>
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Configuration Time Setting</Text>
            </View>

            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Server Date:
                            </Text>
                            <TextInput
                                label="current Day"
                                returnKeyType="done"
                                value={date}
                                onChangeText={(text) => setDate(text)}
                            />
                        </View>
                    </View>
                    <View >
                        <Icon style={{ marginTop: 47, padding: 4 }} name="calendar-days" size={25} color="#007500" onPress={showPicker} />
                    </View>
                </View>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode="datetime" // Options: 'date', 'time', 'datetime'
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
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
                                value={currentTime}
                                onChangeText={(text) => onChangeTime(text)}
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
            </View>
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
})
export default ConfigurationTimeScreen;