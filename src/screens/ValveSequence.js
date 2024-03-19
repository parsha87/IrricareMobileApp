import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, TouchableOpacity, SafeAreaView, Alert, ScrollView, FlatList } from 'react-native'
import { Provider as PaperProvider, Card, DefaultTheme, Checkbox, Modal, Text, Portal, Provider, ListItem, ActivityIndicator, IconButton } from 'react-native-paper';

import { AxiosContext } from '../context/AxiosContext';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import your desired icon library
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { Table, Row } from 'react-native-table-component';

const ValveSequenceScreen = ({ route }) => {
    const navigation = useNavigation();
    const { authAxios } = useContext(AxiosContext);
    const { selectedControllerId, selectedControllerName, dataModel, isAddData } = route.params;
    const [isAdd, setIsAdd] = useState(true);
    const [checked, setChecked] = useState(false);
    //Time 1
    const [timeSlot1, setTimeSlot1] = useState(new Date());
    //Time 2
    const [timeSlot2, setTimeSlot2] = useState(new Date());
    //Time 3
    const [timeSlot3, setTimeSlot3] = useState(new Date());
    //Time 3
    const [timeSlot4, setTimeSlot4] = useState(new Date());
    //Valve Duration
    const [valveList, setValveList] = useState([]);
    const [valveDuration, setValveDuration] = useState(new Date());
    const [valveInterval, setValveInterval] = useState(new Date());

    const [valveNo, setValveNo] = useState('');
    const [isFert, setIsFert] = useState(false);
    const [fertilizerName, setFertilizerName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentUser, setcurrentUser] = useState("");


    const [showTimeSlot1, setShowTimeSlot1] = useState(false);
    const [showTimeSlot2, setShowTimeSlot2] = useState(false);
    const [showTimeSlot3, setShowTimeSlot3] = useState(false);
    const [showTimeSlot4, setShowTimeSlot4] = useState(false);

    const [visible, setVisible] = useState(false);

    const hideModal = () => setVisible(false);

    const [items, setItems] = useState([
        { label: 'Monday', value: '1' },
        { label: 'Tuesday', value: '2' },
        { label: 'Wednesday', value: '3' },
        { label: 'Thrusday', value: '4' },
        { label: 'Friday', value: '5' },
        { label: 'Saturday', value: '6' },
        { label: 'Sunday', value: '7' },
    ]);

    const showModal = () => setVisible(true);


    const onKeyUpValve = () => {
        console.log(formValveData)
        if (formValveData.ValveNos.trim() !== '') {
            let valveInfo = valveList.filter(x => x.MainValveNo == formValveData.ValveNos)
            let valDur = valveInfo.DurationHh + ":" + valveInfo.DurationMm;
            setValveDuration(valDur)
        }

        setVisible(false)
    };


    const addValveDetails = () => {
        console.log(formValveData)
        let valveInfo = valveList.filter(x => x.MainValveNo == +formValveData.ValveNos)[0]
        if (valveInfo == undefined) {
            alert("Valve not present. Enter different valve no");
            return;
        }
        if (valveArray.some(x => x.ValveNos == formValveData.ValveNos)) {
            alert("Valve no alreay exists in added list");
        }
        else {
            if (formValveData.ValveNos.trim() !== '') {
                // let valveInfo = valveList.filter(x => x.MainValveNo == formValveData.ValveNos)

                const newItem = {
                    ValveNos: formValveData.ValveNos,
                    IsFert: checked,
                    ValveDurationReadonly: valveDuration,
                    FertilizerName: formValveData.FertilizerName,
                    ValveInterval: valveInterval,
                };
                setValveArray([...valveArray, newItem]);
                setIsFert(false);
                setValveDuration("")
                setValveInterval("")
                setChecked(false)
                setValveData

                const newItemReset = {
                    ValveNos: 0,
                    IsFert: false,
                    ValveDurationReadonly: '',
                    FertilizerName: '',
                    ValveInterval: ''

                };
                setValveData(newItemReset);
                console.log("_____________________________________________")
                console.log(valveArray)
            }

        }

        //setVisible(false)
    };

    const onChangeTimeSlot1 = (event, selectedTime) => {
        const timeSlot1 = selectedTime || timeSlot1;
        setShowTimeSlot1(Platform.OS === 'ios'); // For iOS, we need to manually hide the picker
        setTimeSlot1(timeSlot1);
    };

    const onChangeTimeSlot2 = (event, selectedTime) => {
        const timeSlot2 = selectedTime || timeSlot2;
        setShowTimeSlot2(Platform.OS === 'ios'); // For iOS, we need to manually hide the picker
        setTimeSlot2(timeSlot2);
    };

    const onChangeTimeSlot3 = (event, selectedTime) => {
        const timeSlot3 = selectedTime || timeSlot3;
        setShowTimeSlot3(Platform.OS === 'ios'); // For iOS, we need to manually hide the picker
        setTimeSlot3(timeSlot3);
    };

    const onChangeTimeSlot4 = (event, selectedTime) => {
        const timeSlot4 = selectedTime || timeSlot4;
        setShowTimeSlot4(Platform.OS === 'ios'); // For iOS, we need to manually hide the picker
        setTimeSlot4(timeSlot4);
    };

    const showTimeSlot1Picker = () => {
        setShowTimeSlot1(true);
    };

    const showTimeSlot2Picker = () => {
        setShowTimeSlot2(true);
    };

    const showTimeSlot3Picker = () => {
        setShowTimeSlot3(true);
    };

    const showTimeSlot4Picker = () => {
        setShowTimeSlot4(true);
    };

    const [valveArray, setValveArray] = useState([]);


    const [formData, setFormData] = useState({
        Id: 0,
        SequenceNo: 0,
        PumbNo: 0,
        TimeSlot1Hh: 0,
        TimeSlot1Min: 0,
        TimeSlot2Hh: 0,
        TimeSlot2Min: 0,
        TimeSlot3Hh: 0,
        TimeSlot3Min: 0,
        TimeSlot4Hh: 0,
        TimeSlot4Min: 0,
        WeekdaysString: "",
        ValveNos: "",
        ValveDurationReadonly: "",
        IsFert: false,
        UserId: "",
        ControllerNo: "",
        ControllerId: 0,
        UsermobileImeino: "",
        FertilizerName: ""
    }
    )

    const [formValveData, setValveData] = useState({
        ValveNos: "",
        ValveDurationReadonly: "",
        IsFert: false,
        FertilizerName: "",
        ValveInterval: ""
    }
    )

    const [selectedDays, setSelectedDays] = useState([]);

    const toggleDay = (day) => {
        console.log(day)
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter(item => item !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    };

    const handleBack = () => {
        navigation.navigate('ValveSequenceList')
    };

    const fetchValveData = async () => {
        try {
            setIsLoading(true)
            const response = await authAxios.get('ValveSetting/ValveSettingByControllerId/' + selectedControllerId);
            // Update the state with the received data
            let data = response.data
            setValveList(data)

            if (data != null) {

            }
            else {
                //Add
            }
            setIsLoading(false)
            //setApiData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false)
        }
    };


    const onDeleteItem = (itemToDelete) => {
        // Filter out the item to delete from the array
        const updatedArray = valveArray.filter(item => item !== itemToDelete);
        // Update state with the new array
        setValveArray(updatedArray);
    };
    useFocusEffect(
        React.useCallback(async () => {
            const value = await AsyncStorage.getItem('user');
            let jsonVal = JSON.parse(value);
            setcurrentUser(jsonVal.firstName)
            setIsLoading(true);
            fetchValveData()
            setIsLoading(true)
            setIsAdd(isAddData);
            setFormData(dataModel);
            //If edit
            if (isAddData == false) {
                let currentYear = new Date().getFullYear();
                let CurrentMonthServer = new Date().getMonth();
                let CurrentDayServer = new Date().getDay();
                let timeSlot1 = new Date(currentYear, CurrentMonthServer, CurrentDayServer, dataModel.TimeSlot1Hh, dataModel.TimeSlot1Min);
                setTimeSlot1(timeSlot1)
                let timeSlot2 = new Date(currentYear, CurrentMonthServer, CurrentDayServer, dataModel.TimeSlot2Hh, dataModel.TimeSlot2Min);
                setTimeSlot2(timeSlot2)
                let timeSlot3 = new Date(currentYear, CurrentMonthServer, CurrentDayServer, dataModel.TimeSlot3Hh, dataModel.TimeSlot3Min);
                setTimeSlot3(timeSlot3)
                let timeSlot4 = new Date(currentYear, CurrentMonthServer, CurrentDayServer, dataModel.TimeSlot4Hh, dataModel.TimeSlot4Min);
                setTimeSlot4(timeSlot4)
                const arrayOfWeeksItems = dataModel.WeekdaysString.split(',');
                console.log(arrayOfWeeksItems)
                setSelectedDays(arrayOfWeeksItems)
                if (dataModel.ValveNos != "") {
                    const jsonObject = JSON.parse(dataModel.ValveNos);
                    console.log("_____________________________________________________")
                    console.log("_____________________________________________________")
                    console.log(dataModel.ValveNos)
                    setValveArray(jsonObject)
                }
            }

            setIsLoading(false)
        }, [authAxios]) // Make sure to include any dependencies of the effect
    );



    const handleTextInputChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value,
        });
    };


    const handleTextInputChangeValve = (field, value) => {
        setValveData({
            ...formValveData,
            [field]: value,
        });

        if (field == 'ValveNos') {
            console.log(valveList)
            if (value.trim() !== '') {
                let valveInfo = valveList.filter(x => x.MainValveNo == value)[0]
                console.log("--------------------")
                console.log(valveInfo)
                if (valveInfo == undefined) {
                    alert("Valve not present. Enter different valve no");
                    return;
                }
                if (valveInfo != undefined) {
                    let valDur = valveInfo.DurationHh + ":" + valveInfo.DurationMm;
                    let valInterval = valveInfo.IntervalHh + ":" + valveInfo.IntervalMm;
                    console.log("_________________k________________" + valInterval)
                    setValveDuration(valDur)
                    setValveInterval(valInterval)
                    formValveData.ValveDurationReadonly = valDur;
                    formValveData.ValveInterval = valInterval
                }
                else {
                    let valDur = "";
                    let valInterval = "";
                    setValveDuration(valDur)
                    setValveInterval(valInterval)
                    formValveData.ValveDurationReadonly = valDur;
                    formValveData.ValveInterval = valInterval
                }

                // setValveData({
                //     ...formValveData,
                //     ["ValveDurationReadonly"]: valDur,
                // });
            }
        }

    };
    const handleSubmit = async () => {
        if (formData.SequenceNo == 0) {
            alert("SequenceNo should not be 0")
            return
        }
        if (+formData.SequenceNo != 10) {
            alert("SequenceNo should be equal to 10");
            return
        }
        setIsLoading(true);
        const value = await AsyncStorage.getItem('user');
        let jsonVal = JSON.parse(value);
        formData.UserId = jsonVal.userId;
        formData.WeekdaysString = selectedDays.join(',');
        formData.ValveNos = JSON.stringify(valveArray);
        formData.TimeSlot1Hh = timeSlot1.getHours() == NaN ? 0 : timeSlot1.getHours();
        formData.TimeSlot1Min = timeSlot1.getMinutes() == NaN ? 0 : timeSlot1.getMinutes();
        formData.TimeSlot2Hh = timeSlot2.getHours() == NaN ? 0 : timeSlot2.getHours();
        formData.TimeSlot2Min = timeSlot2.getMinutes() == NaN ? 0 : timeSlot2.getMinutes();
        formData.TimeSlot3Hh = timeSlot3.getHours() == NaN ? 0 : timeSlot3.getHours();
        formData.TimeSlot3Min = timeSlot3.getMinutes() == NaN ? 0 : timeSlot3.getMinutes();
        formData.TimeSlot4Hh = timeSlot4.getHours() == NaN ? 0 : timeSlot4.getHours();
        formData.TimeSlot4Min = timeSlot4.getMinutes() == NaN ? 0 : timeSlot4.getMinutes();
        formData.ControllerId = selectedControllerId;
        formData.ControllerNo = selectedControllerName;
        console.log("________________________________________")
        console.log(formData)

        if (isAdd) {
            //Add
            try {
                console.log("adding")
                const response = await authAxios.post('/SequenceSetting', formData);
                if (response.data.result) {
                    console.log('Response:', response.data);
                    setIsAdd(false)
                    //set controller object
                    //setFormData(response.data)
                    setIsLoading(false);
                    alert("Data Saved Successfully.")
                    navigation.navigate('ValveSequenceList', {
                        selectedControllerId: selectedControllerId,
                        selectedControllerName: selectedControllerName
                    })
                }
                else {
                    alert(response.data.message)
                    setIsLoading(false);
                }
                // console.log('Response:', response.data);
                // //set controller object
                // setFormData(response.data)
                // alert("Success Add");
                // setIsLoading(false);


            } catch (error) {
                alert('Error:', error);
                setIsLoading(false);
                // Handle the error here
            }

        }
        else {
            //Update
            try {
                console.log("Updating")
                console.log("UserId" + formData.UserId)

                const response = await authAxios.put('/SequenceSetting/' + formData.Id, formData);
                console.log('Response:', response.data);
                alert("Success edit");
                setIsLoading(false);
                alert("Data Saved Successfully.")
                navigation.navigate('ValveSequenceList', {
                    selectedControllerId: selectedControllerId,
                    selectedControllerName: selectedControllerName
                })
            } catch (error) {
                alert('Error:', error);
                setIsLoading(false);
                // Handle the error here
            }


        }
        // navigation.reset({
        //     index: 0,
        //     routes: [{ name: 'SequenceSettings' }],
        // })
    };

    const renderItem = ({ item, onDelete }) => (
        <View style={styles.container}>
            <View style={styles.detailsContainer}>
                <View>
                    <Text style={styles.valveNos}>ValveNos: {item.ValveNos}</Text>
                    <Text>Valve Duration: {item.ValveDurationReadonly}</Text>
                    <Text>Fertilizer Name: {item.FertilizerName}</Text>
                    <Text>Is Fert: {item.IsFert ? 'Yes' : 'No'}</Text>
                </View>
                <TouchableOpacity onPress={() => onDelete(item)} style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}>X</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
            <Text style={styles.titleName}>Hi, {currentUser}</Text>
                <Icon onPress={handleBack} name="chevron-left" size={30} color="green" />
                <Provider>
                    <View>
                        <Text style={styles.title}>Valve Sequence</Text>
                        <Text style={styles.controllerName}>Controller No: {selectedControllerName}</Text>
                        <View style={styles.container}>
                            <TextInput
                                label="SequenceNo"
                                returnKeyType="done"
                                keyboardType="numeric"
                                value={formData.SequenceNo.toString()}
                                onChangeText={(value) => handleTextInputChange('SequenceNo', value)}

                            />
                            <TextInput
                                label="PumpNo"
                                returnKeyType="done"
                                keyboardType="numeric"
                                value={formData.PumbNo.toString()}
                                onChangeText={(value) => handleTextInputChange('PumbNo', value)}

                            />

                            <TouchableOpacity onPress={showTimeSlot1Picker}>
                                <TextInput
                                    label="Start Time"
                                    returnKeyType="done"
                                    editable={false}
                                    value={moment(timeSlot1).format('HH:mm')}
                                />
                            </TouchableOpacity>
                            {showTimeSlot1 && (
                                <DateTimePicker
                                    testID="dateTimePickerTime"
                                    value={timeSlot1}
                                    mode="time" // Options: 'date', 'time', 'datetime'
                                    is24Hour={true}
                                    display="default"
                                    onChange={onChangeTimeSlot1}
                                />
                            )}


                            <TouchableOpacity onPress={showTimeSlot2Picker}>

                                <TextInput
                                    label="End Time"
                                    returnKeyType="done"
                                    editable={false}
                                    value={moment(timeSlot2).format('HH:mm')}
                                />
                            </TouchableOpacity>
                            {showTimeSlot2 && (
                                <DateTimePicker
                                    testID="dateTimePickerTime"
                                    value={timeSlot2}
                                    mode="time" // Options: 'date', 'time', 'datetime'
                                    is24Hour={true}
                                    display="default"
                                    onChange={onChangeTimeSlot2}
                                />
                            )}

                            <View style={styles.containerWeekDays}>
                                <Text style={styles.label}>Week Days
                                </Text>
                                <ScrollView
                                    horizontal
                                    contentContainerStyle={styles.weekdaysContainer}
                                    showsHorizontalScrollIndicator={false}
                                >
                                    {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={[
                                                styles.dayButton,
                                                selectedDays.includes(day) && styles.selectedDayButton
                                            ]}
                                            onPress={() => toggleDay(day)}
                                        >
                                            <Text style={styles.dayButtonText}>{day.slice(0, 3)}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                            <Button
                                mode="outlined"
                                onPress={showModal}

                            >
                                Add Valves
                            </Button>
                            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                                <Portal>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContent}>
                                            <View style={styles.modalHeader}>
                                                <View><Text style={styles.controllerName}>Add Valves</Text></View>
                                                <Icon onPress={hideModal} name="close" size={30} color="red" />
                                            </View>
                                            <View style={styles.formContainer}>
                                                <View style={styles.column}>
                                                    <TextInput
                                                        label="ValveNos"
                                                        returnKeyType="done"
                                                        keyboardType="numeric"
                                                        value={formValveData.ValveNos}
                                                        onChangeText={(value) => handleTextInputChangeValve('ValveNos', value)}
                                                    />

                                                </View>
                                                <View style={styles.column}>
                                                    <TextInput
                                                        label="Duration"
                                                        returnKeyType="done"
                                                        value={valveDuration}
                                                    />


                                                </View>
                                                <View style={styles.column}>
                                                    <TextInput
                                                        label="Interval"
                                                        returnKeyType="done"
                                                        value={valveInterval}
                                                    />


                                                </View>

                                            </View>
                                            {/* <View style={styles.formContainer}>
                                                <View style={styles.column}>
                                                    <TouchableOpacity onPress={showTimeSlot3Picker}>

                                                        <TextInput
                                                            label="Interval"
                                                            returnKeyType="done"
                                                            editable={false}
                                                            value={moment(timeSlot3).format('HH:mm')}
                                                        />
                                                    </TouchableOpacity>

                                                    {showTimeSlot3 && (
                                                        <DateTimePicker
                                                            testID="dateTimePickerTime"
                                                            value={timeSlot3}
                                                            mode="time" // Options: 'date', 'time', 'datetime'
                                                            is24Hour={true}
                                                            display="default"
                                                            onChange={onChangeTimeSlot3}
                                                        />
                                                    )}
                                                </View>
                                            </View> */}
                                            <Button
                                                mode="outlined"
                                                onPress={addValveDetails}
                                            >
                                                Add Valve Details
                                            </Button>
                                            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                                                <Row data={['Valve Nos', 'Valve Duration', 'Interval', 'Action']} style={styles.head} textStyle={{ color: 'black', textAlign: 'center' }} />
                                                {
                                                    valveArray.map((item, index) => (
                                                        <Row
                                                            key={index}
                                                            data={[
                                                                <View style={styles.iconContainer}>
                                                                    <Text>{item.ValveNos}</Text>
                                                                </View>,
                                                                <View style={styles.iconContainer}>
                                                                    <Text>{item.ValveDurationReadonly}</Text>
                                                                </View>,
                                                                <View style={styles.iconContainer}>
                                                                    <Text>{item.ValveInterval}</Text>
                                                                </View>,

                                                                <View style={styles.iconContainer}>
                                                                    <Icon onPress={() => onDeleteItem(item)} name="delete" size={30} color="red" />
                                                                </View>

                                                            ]}
                                                            textStyle={{ color: 'black' }}
                                                        />
                                                    ))
                                                }
                                            </Table>

                                        </Modal>

                                    </View>
                                </Portal>
                            </ScrollView>
                            <Button
                                mode="outlined"
                                onPress={handleSubmit}>
                                Save
                            </Button>

                        </View>
                    </View>
                </Provider>

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
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    head: {
        textAlign: 'center',
        backgroundColor: 'lightgrey', // Add background color if needed
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        marginHorizontal: 20, // Adjust this value to add padding from the sides of the screen
        borderRadius: 5,
    }, label: {
        fontSize: 18,
        marginBottom: 10,
    },
    weekdaysContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    dayButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'black',
    },
    selectedDayButton: {
        backgroundColor: 'lightblue',
    },
    dayButtonText: {
        fontSize: 16,
    }, containerWeekDays: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }, fabContainer: {
        position: 'absolute',
        bottom: 16,
        right: 16,
    },
    fab: {
        color: 'white',
        backgroundColor: 'green', // Adjust the color as needed
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

    }, 
    titleName: {
        fontSize: 15,
        marginBottom: 5,
        textAlign: 'right',
        color: 'green',
        backgroundColor:'lightyellow',
        padding:5

    },
    controllerName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: 'green'
    }, valveNos: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    valveDuration: {
        fontSize: 16,
        color: '#666',
        marginBottom: 4,
    },
    fertilizerName: {
        fontSize: 16,
        marginBottom: 4,
    },
    isFert: {
        fontSize: 16,
        color: '#00aa00', // Green color for 'Yes'
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 8,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    formContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    column: {
        flex: 1,
        marginLeft: 10, // Adjust as needed for spacing between columns
    },

    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    scrollViewContent: {
        flexGrow: 1,

    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
    },
    label: {
        marginTop: 10,
    },
    tableContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', // Align the icon vertically
        paddingHorizontal: 10, // Add horizontal padding for space
    },
    titleName: {
        fontSize: 15,
        marginBottom: 5,
        textAlign: 'right',
        color: 'green',
        backgroundColor:'lightyellow',
        padding:5

    },

});
export default ValveSequenceScreen;