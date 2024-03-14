import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, TouchableOpacity, SafeAreaView, Alert, ScrollView, ActivityIndicator, FlatList } from 'react-native'
import { Provider as PaperProvider, Card, DefaultTheme } from 'react-native-paper';
import { AxiosContext } from '../context/AxiosContext';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Text } from "react-native-paper";
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome6';
import DateTimePicker from '@react-native-community/datetimepicker';


const ValveSettingsScreen = ({ route }) => {
    const navigation = useNavigation();
    const { authAxios } = useContext(AxiosContext);
    const { dataModel, isAddData } = route.params;
    const [isAdd, setIsAdd] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [controller, setSelectedController] = useState({
        selectedControllerId: 0,
        selectedControllerName: ''
    })
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    //Server Current Time
    const [duration, setDuration] = useState(new Date());
    //Day Start Time
    const [fbTIme, setFbTime] = useState(new Date());
    //Day End Time
    const [foTime, setFoTime] = useState(new Date());

    //Show Time Picker
    const [showDurationTime, setShowDuration] = useState(false);
    //Show Day Start time picker
    const [showFbTime, setShowFbTime] = useState(false);
    //Show Day end Time Picker
    const [showDFoTime, setShowFoTime] = useState(false);

    const [formData, setFormData] = useState({
        Id: 0,
        MainValveNo: 0,
        TagName: '',
        DurationHh: 0,
        DurationMm: 0,
        DurationSs: 0,
        PumpNo: 0,
        FbTimeHh: 0,
        FbTimeMin: 0,
        FoTimeHh: 0,
        FoTimeMin: 0,
        CoValveSetting: '',
        CoValveNo1: 0,
        CoValveNo2: 0,
        CoValveNo3: 0,
        UserId: '',
        CropName: '',
        CropType: '',
        CropSowingDate: '',
        ValveArea: 0,
        UsermobileImeino: '',
        ControllerId: 0,
        ControllerNo: '',
    })

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
                    setIsAdd(isAddData);

                    if (isAddData == false) {
                        let currentYear = new Date().getFullYear();
                        let CurrentMonthServer = new Date().getMonth();
                        let CurrentDayServer = new Date().getDay();
                        let duration = new Date(currentYear, CurrentMonthServer, CurrentDayServer, dataModel.DurationHh, dataModel.DurationMm);
                        setDuration(duration)
                        let fotime = new Date(currentYear, CurrentMonthServer, CurrentDayServer, dataModel.FoTimeHh, dataModel.FoTimeMin);
                        setFoTime(fotime)
                        let ftime = new Date(currentYear, CurrentMonthServer, CurrentDayServer, dataModel.FbTimeHh, dataModel.FbTimeMin);
                        setFbTime(ftime)
                        setDate(new Date(currentYear, CurrentMonthServer, CurrentDayServer))
                    }


                    setFormData(dataModel);
                    setIsLoading(false);

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


    const handleBack = () => {
        navigation.navigate('ValveSettingsListScreen')
        // navigation.navigate('Dashboard')
    };

    const handleSubmit = async () => {
        if (formData.MainValveNo ==0 ) {
            alert("Valve no should not be 0")
            return
        }


        if (formData.PumpNo < 1 || formData.PumpNo > 2) {
            alert("PumpNo should be 1 & 2 only")
            return
        }


        setIsLoading(true);
        const value = await AsyncStorage.getItem('user');
        let jsonVal = JSON.parse(value);
        formData.UserId = jsonVal.userId;
        formData.DurationHh = duration.getHours() == NaN ? 0 : duration.getHours();
        formData.DurationMm = duration.getMinutes() == NaN ? 0 : duration.getMinutes();
        formData.DurationSs = duration.getSeconds() == NaN ? 0 : duration.getSeconds();
        formData.FbTimeHh = fbTIme.getHours() == NaN ? 0 : fbTIme.getHours();
        formData.FbTimeMin = fbTIme.getMinutes() == NaN ? 0 : fbTIme.getMinutes();
        formData.FoTimeHh = foTime.getHours() == NaN ? 0 : foTime.getHours();
        formData.FoTimeMin = foTime.getMinutes() == NaN ? 0 : foTime.getMinutes();
        formData.ControllerId = controller.selectedControllerId;
        formData.ControllerNo = controller.selectedControllerName;
        formData.CropSowingDate = date
        formData.UsermobileImeino = ""

        console.log(formData)
        if (isAdd) {
            //Add
            try {
                console.log("adding")
                const response = await authAxios.post('/ValveSetting', formData);
                if (response.data.result) {
                    console.log('Response:', response.data);
                    setIsAdd(false)
                    //set controller object
                    //setFormData(response.data)
                    setIsLoading(false);
                    alert("Data Saved Successfully.")
                    navigation.navigate('ValveSettingsListScreen')
                }
                else {
                    alert(response.data.message)
                    setIsLoading(false);
                }

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
                console.log("UserId" + formData.UserId)

                const response = await authAxios.put('/ValveSetting/' + formData.Id, formData);
                console.log('Response:', response);
                console.warn("Success edit");
                setIsLoading(false);
                alert("Data Saved Successfully.")
                navigation.navigate('ValveSettingsListScreen')
            } catch (error) {
                console.error('Error:', error);
                setIsLoading(false);
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

    const onChangeDate = (event, selectedDate) => {
        console.warn(selectedDate)
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios'); // For iOS, we need to manually hide the picker
        setDate(selectedDate);
    };

    const onChangeTime = (event, selectedTime) => {
        const duration = selectedTime || duration;
        setShowDuration(Platform.OS === 'ios'); // For iOS, we need to manually hide the picker
        setDuration(duration);
    };

    const onChangeFO = (event, selectedTime) => {
        const foTime = selectedTime || foTime;
        setShowFoTime(Platform.OS === 'ios'); // For iOS, we need to manually hide the picker
        setFoTime(foTime);
    };

    const onChangeFb = (event, selectedTime) => {
        const fbTime = selectedTime || fbTime;
        setShowFbTime(Platform.OS === 'ios'); // For iOS, we need to manually hide the picker
        setFbTime(fbTime);
    };

    const showDurartionTimePicker = () => {
        setShowDuration(true);
    };

    const showFoTimePicker = () => {
        setShowFoTime(true);
    };

    const showFbimePicker = () => {
        setShowFbTime(true);
    };

    const showPicker = () => {
        setShow(true);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <Icon onPress={handleBack} name="chevron-left" size={30} color="green" />
                <Text style={styles.title}>Valve Setting</Text>
                <Text style={styles.controllerName}>Controller No:{controller.selectedControllerName}</Text>

                <View style={styles.container}>
                    <View>
                        <TextInput
                            label="MainValveNo"
                            returnKeyType="done"
                            keyboardType="numeric"
                            maxLength={3}
                            value={formData.MainValveNo.toString()}
                            onChangeText={(value) => handleTextInputChange('MainValveNo', value)}

                        />
                        <TextInput
                            label="TagName"
                            returnKeyType="done"
                            value={formData.TagName}
                            onChangeText={(value) => handleTextInputChange('TagName', value)}
                        />



                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 2 }}>
                                <View style={styles.formGroup}>

                                    <TouchableOpacity onPress={showDurartionTimePicker}>
                                        <TextInput
                                            label="Duration"
                                            returnKeyType="done"
                                            editable={false}
                                            value={moment(duration).format('HH:mm')}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {/* <View>
                                        <Icon style={{ marginTop: 47, padding: 4 }} name="clock" size={25} color="#007500" onPress={showDurartionTimePicker} />
                                    </View> */}
                        </View>
                        {showDurationTime && (
                            <DateTimePicker
                                testID="dateTimePickerTime"
                                value={duration}
                                mode="time" // Options: 'date', 'time', 'datetime'
                                is24Hour={true}
                                display="default"
                                onChange={onChangeTime}
                            />
                        )}

                        <TextInput
                            label=" PumpNo"
                            returnKeyType="done"
                            keyboardType="numeric"
                            maxLength={3}
                            value={formData.PumpNo.toString()}
                            onChangeText={(value) => handleTextInputChange('PumpNo', value)}
                        />

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 2 }}>
                                <View style={styles.formGroup}>

                                    <TouchableOpacity onPress={showFbimePicker}>
                                        <TextInput
                                            label="FB Time"
                                            returnKeyType="done"
                                            editable={false}
                                            value={moment(fbTIme).format('HH:mm')}
                                        /></TouchableOpacity>

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

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 2 }}>
                                <View style={styles.formGroup}>

                                    <TouchableOpacity onPress={showFoTimePicker}>
                                        <TextInput
                                            label="FO Time"
                                            returnKeyType="done"
                                            editable={false}
                                            value={moment(foTime).format('HH:mm')}
                                        /></TouchableOpacity>

                                </View>
                            </View>
                        </View>
                        {showDFoTime && (
                            <DateTimePicker
                                testID="dateTimePickerTime"
                                value={foTime}
                                mode="time" // Options: 'date', 'time', 'datetime'
                                is24Hour={true}
                                display="default"
                                onChange={onChangeFO}
                            />
                        )}

                        <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Co-Valve Setting
                        </Text>
                        <TextInput
                            label="CoValveNo1"
                            returnKeyType="done"
                            keyboardType="numeric"
                            maxLength={3}
                            value={formData.CoValveNo1.toString()}
                            onChangeText={(value) => handleTextInputChange('CoValveNo1', value)}
                        />
                        <TextInput
                            label="CoValveNo2"
                            returnKeyType="done"
                            keyboardType="numeric"
                            maxLength={3}
                            value={formData.CoValveNo2.toString()}
                            onChangeText={(value) => handleTextInputChange('CoValveNo2', value)}
                        />

                        <TextInput
                            label="CoValveNo3"
                            returnKeyType="done"
                            keyboardType="numeric"
                            maxLength={3}
                            value={formData.CoValveNo3.toString()}
                            onChangeText={(value) => handleTextInputChange('CoValveNo3', value)}
                        />

                        <TextInput
                            label="CropName"
                            returnKeyType="done"
                            value={formData.CropName}
                            onChangeText={(value) => handleTextInputChange('CropName', value)}
                        />
                        <TextInput
                            label="CropType"
                            returnKeyType="done"
                            value={formData.CropType}
                            onChangeText={(value) => handleTextInputChange('CropType', value)}
                        />
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <View style={styles.formGroup}>
                                    <Text style={styles.label}>Crop Sowing Date:
                                    </Text>
                                    <TouchableOpacity onPress={showPicker}>
                                        <TextInput
                                            label="Crop Sowing Date"
                                            returnKeyType="done"
                                            editable={false}
                                            value={moment(date).format('MMMM D, YYYY')}
                                        /></TouchableOpacity>

                                </View>
                            </View>
                            {/* <View >
                                        <Icon style={{ marginTop: 47, padding: 4 }} name="calendar-days" size={25} color="#007500" onPress={showPicker} />
                                    </View> */}
                        </View>
                        {show && (
                            <DateTimePicker
                                label="Select Date"
                                value={date}
                                mode="date"
                                display="calendar"
                                onChange={onChangeDate}
                                style={{ marginTop: 16 }}
                            />
                        )}
                        <TextInput
                            label="ValveArea"
                            returnKeyType="done"
                            keyboardType="numeric"
                            value={formData.ValveArea}
                            onChangeText={(value) => handleTextInputChange('ValveArea', value)}
                        />
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
export default ValveSettingsScreen;