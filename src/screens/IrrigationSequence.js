import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, TouchableOpacity, SafeAreaView, Alert, ScrollView, FlatList } from 'react-native'
import { Provider as PaperProvider, Card, DefaultTheme, Checkbox, Modal, Text, Portal, Provider, ListItem, ActivityIndicator, IconButton } from 'react-native-paper';

import { AxiosContext } from '../context/AxiosContext';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome6';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { Table, Row } from 'react-native-table-component';

const IrrigationSequenceScreen = ({ route }) => {
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
    const [valveNo, setValveNo] = useState('');
    const [isFert, setIsFert] = useState(false);
    const [fertilizerName, setFertilizerName] = useState('');
    const [isLoading, setIsLoading] = useState(false);



    const [showTimeSlot1, setShowTimeSlot1] = useState(false);
    const [showTimeSlot2, setShowTimeSlot2] = useState(false);
    const [showTimeSlot3, setShowTimeSlot3] = useState(false);
    const [showTimeSlot4, setShowTimeSlot4] = useState(false);

    const [visible, setVisible] = useState(false);

    const hideModal = () => setVisible(false);

    const [items, setItems] = useState([
        { label: 'Sunday', value: '1' },
        { label: 'Monday', value: '2' },
        { label: 'Tuesday', value: '3' },
        { label: 'Wednesday', value: '4' },
        { label: 'Thrusday', value: '5' },
        { label: 'Friday', value: '6' },
        { label: 'Saturday', value: '7' },
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
                    FertilizerName: formValveData.FertilizerName
                };
                setValveArray([...valveArray, newItem]);
                setIsFert(false);
                setValveDuration("")
                setChecked(false)
                setValveData

                const newItemReset = {
                    ValveNos: 0,
                    IsFert: false,
                    ValveDurationReadonly: '',
                    FertilizerName: ''
                };
                setValveData(newItemReset);
                console.log("_____________________________________________")
                console.log(valveArray)
            }

        }

        setVisible(false)
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
        FertilizerName: ""
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
        navigation.navigate('Dashboard')
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
        React.useCallback(() => {
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
                if (valveInfo != undefined) {
                    let valDur = valveInfo.DurationHh + ":" + valveInfo.DurationMm;
                    setValveDuration(valDur)
                    formValveData.ValveDurationReadonly = valDur;
                }
                else {
                    let valDur = "";
                    setValveDuration(valDur)
                    formValveData.ValveDurationReadonly = valDur;
                }

                // setValveData({
                //     ...formValveData,
                //     ["ValveDurationReadonly"]: valDur,
                // });
            }
        }

    };
    const handleSubmit = async () => {
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
                    navigation.navigate('SequenceSettingList', {
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
                navigation.navigate('SequenceSettingList', {
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
                <Provider>
                    <View>
                        <Text style={styles.title}>Sequence Configuration</Text>
                        <Text style={styles.controllerName}>{selectedControllerName}</Text>
                        {/* <View style={{ flexDirection: 'row', backgroundColor: '#3498db', padding: 16 }}>
                        <TouchableOpacity onPress={handleBack}>
                            <Text style={{ color: '#fff', fontSize: 18, marginRight: 16 }}>{'< Back'}</Text>
                        </TouchableOpacity>
                        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Irrigation Sequence</Text>
                    </View> */}
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
                                    label="Time Slot 1"
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
                                    label="Time Slot 2"
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

                            <TouchableOpacity onPress={showTimeSlot3Picker}>

                                <TextInput
                                    label="Time Slot 3"
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

                            <TouchableOpacity onPress={showTimeSlot4Picker}>

                                <TextInput
                                    label="Time Slot 4"
                                    returnKeyType="done"
                                    editable={false}
                                    value={moment(timeSlot4).format('HH:mm')}
                                />
                            </TouchableOpacity>
                            {showTimeSlot4 && (
                                <DateTimePicker
                                    testID="dateTimePickerTime"
                                    value={timeSlot4}
                                    mode="time" // Options: 'date', 'time', 'datetime'
                                    is24Hour={true}
                                    display="default"
                                    onChange={onChangeTimeSlot4}
                                />
                            )}


                            {/* <DropDownPicker
                            open={open}
                            value={selectedValue}
                            items={items}
                            setOpen={setOpen}
                            setValue={setSelectedValue}
                            setItems={setItems}
                            containerStyle={{ padding: 8 }}
                            style={{ backgroundColor: '#fafafa' }}
                            dropDownContainerStyle={{ marginLeft: 2 }}
                            listItemLabelStyle={{ marginLeft: 10 }}
                            itemStyle={{
                                justifyContent: 'flex-start', marginLeft: 8
                            }}
                            onChangeValue={(value) => console.log(value)}
                        /> */}
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
                            {/* <FlatList
                                data={valveArray}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <View>
                                        <Text>ValveNos: {item.ValveNos}</Text>
                                        <Text>Valve Duration: {item.ValveDurationReadonly}</Text>
                                        <Text>Fertilizer Name: {item.FertilizerName}</Text>
                                        <Text>Is Fert: {item.IsFert ? 'Yes' : 'No'}</Text>
                                    </View>
                                )}
                            /> */}

                            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                                <Portal>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContent}>


                                            <View style={styles.modalHeader}>
                                                <IconButton
                                                    icon="close"
                                                    color="black"
                                                    size={20}
                                                    onPress={hideModal}
                                                />
                                            </View>
                                            <View style={{ backgroundColor: 'white', padding: 20 }}>
                                                <TextInput
                                                    label="ValveNos"
                                                    returnKeyType="done"
                                                    keyboardType="numeric"
                                                    value={formValveData.ValveNos}
                                                    onChangeText={(value) => handleTextInputChangeValve('ValveNos', value)}
                                                />
                                                <TextInput
                                                    label="Valve Duration"
                                                    returnKeyType="done"
                                                    value={valveDuration}
                                                />
                                                <Checkbox.Item
                                                    label="IsFert"
                                                    status={checked ? 'checked' : 'unchecked'}
                                                    onPress={() => {
                                                        setChecked(!checked);
                                                    }}
                                                />
                                                <TextInput
                                                    label="Fertilizer Name"
                                                    returnKeyType="done"
                                                    value={formValveData.FertilizerName}
                                                    onChangeText={(value) => handleTextInputChangeValve('FertilizerName', value)}

                                                />
                                                <Button
                                                    mode="outlined"
                                                    onPress={addValveDetails}

                                                >
                                                    Add Valve Details
                                                </Button>

                                            </View>
                                            {/* <FlatList
                                                data={valveArray}
                                                keyExtractor={(item, index) => index.toString()}
                                                renderItem={({ item }) => renderItem({ item, onDelete: onDeleteItem })}
                                            /> */}
                                            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                                                <Row data={['Valve Nos', 'Valve Duration', 'Fertilizer Name', 'Is Fert']} style={styles.head} textStyle={styles.text} />
                                                {
                                                    valveArray.map((item, index) => (
                                                        <Row
                                                            key={index}
                                                            data={[

                                                                item.ValveNos,
                                                                item.ValveDurationReadonly,
                                                                item.FertilizerName,
                                                                item.IsFert ? 'Yes' : 'No'
                                                            ]}

                                                            textStyle={styles.text}
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

    }, controllerName: {
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

});
export default IrrigationSequenceScreen;