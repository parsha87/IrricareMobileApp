import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, TouchableOpacity, SafeAreaView, Alert, ScrollView } from 'react-native'
import { Provider as PaperProvider, Card, DefaultTheme, Checkbox } from 'react-native-paper';
import { AxiosContext } from '../context/AxiosContext';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Text } from "react-native-paper";
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome6';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';

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
    const [valveDuration, setValveDuration] = useState(new Date());

    const [selectedValue, setSelectedValue] = useState(null);
    const [open, setOpen] = useState(false);

    const [showTimeSlot1, setShowTimeSlot1] = useState(false);
    const [showTimeSlot2, setShowTimeSlot2] = useState(false);
    const [showTimeSlot3, setShowTimeSlot3] = useState(false);
    const [showTimeSlot4, setShowTimeSlot4] = useState(false);
    const [showDuration, setShowDuration] = useState(false);

    const [items, setItems] = useState([
        { label: 'Sunday', value: '1' },
        { label: 'Monday', value: '2' },
        { label: 'Tuesday', value: '3' },
        { label: 'Wednesday', value: '4' },
        { label: 'Thrusday', value: '5' },
        { label: 'Friday', value: '6' },
        { label: 'Saturday', value: '7' },
    ]);

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

    const onChangeDuration = (event, selectedTime) => {
        const valveDuration = selectedTime || valveDuration;
        setShowDuration(Platform.OS === 'ios'); // For iOS, we need to manually hide the picker
        setValveDuration(valveDuration);
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

    const showValveDurationPicker = () => {
        setShowDuration(true);
    };

    const [formData, setFormData] = useState({
        Id: 0,
        SequenceNo: "",
        PumbNo: 0,
        TimeSlot1Hh: "",
        TimeSlot1Min: "",
        TimeSlot2Hh: "",
        TimeSlot2Min: "",
        TimeSlot3Hh: "",
        TimeSlot3Min: "",
        TimeSlot4Hh: "",
        TimeSlot4Min: "",
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

    const handleBack = () => {
        navigation.navigate('Dashboard')
    };

    useEffect(() => {
        setIsAdd(isAddData);
        setFormData(dataModel);
    }, []);

    const handleTextInputChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value,
        });
    };


    const [SequenceNo, setSequenceNo] = useState("")
    const [PumpNo, setPumpNo] = useState("")


    return (
        <ScrollView>
            <View>
                <View style={{ flexDirection: 'row', backgroundColor: '#3498db', padding: 16 }}>
                    <TouchableOpacity onPress={handleBack}>
                        <Text style={{ color: '#fff', fontSize: 18, marginRight: 16 }}>{'< Back'}</Text>
                    </TouchableOpacity>
                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Irrigation Sequence</Text>
                </View>
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


                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 2 }}>
                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Time Slot 1
                                </Text>
                                <TextInput
                                    label="Time Slot 1"
                                    returnKeyType="done"
                                    editable={false}
                                    value={moment(timeSlot1).format('HH:mm')}
                                />
                            </View>
                        </View>
                        <View>
                            <Icon style={{ marginTop: 47, padding: 4 }} name="clock" size={25} color="#007500" onPress={showTimeSlot1Picker} />
                        </View>
                    </View>
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



                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 2 }}>
                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Time Slot 2
                                </Text>
                                <TextInput
                                    label="Time Slot 2"
                                    returnKeyType="done"
                                    editable={false}
                                    value={moment(timeSlot2).format('HH:mm')}
                                />
                            </View>
                        </View>
                        <View>
                            <Icon style={{ marginTop: 47, padding: 4 }} name="clock" size={25} color="#007500" onPress={showTimeSlot2Picker} />
                        </View>
                    </View>
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



                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 2 }}>
                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Time Slot 3
                                </Text>
                                <TextInput
                                    label="Time Slot 3"
                                    returnKeyType="done"
                                    editable={false}
                                    value={moment(timeSlot3).format('HH:mm')}
                                />
                            </View>
                        </View>
                        <View>
                            <Icon style={{ marginTop: 47, padding: 4 }} name="clock" size={25} color="#007500" onPress={showTimeSlot3Picker} />
                        </View>
                    </View>
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



                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 2 }}>
                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Time Slot 4
                                </Text>
                                <TextInput
                                    label="Time Slot 4"
                                    returnKeyType="done"
                                    editable={false}
                                    value={moment(timeSlot4).format('HH:mm')}
                                />
                            </View>
                        </View>
                        <View>
                            <Icon style={{ marginTop: 47, padding: 4 }} name="clock" size={25} color="#007500" onPress={showTimeSlot4Picker} />
                        </View>
                    </View>
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


                    <DropDownPicker
                        open={open}
                        value={selectedValue}
                        items={items}
                        setOpen={setOpen}
                        setValue={setSelectedValue}
                        setItems={setItems}
                        containerStyle={{ padding: 8 }}
                        style={{ backgroundColor: '#fafafa' }}
                        dropDownContainerStyle={{ marginLeft: 8 }}
                        listItemLabelStyle={{ marginLeft: 10 }}
                        itemStyle={{
                            justifyContent: 'flex-start', marginLeft: 8
                        }}
                        onChangeValue={(value) => console.log(value)}
                    />
                    <Text>Selected Value: {selectedValue}</Text>



                    <TextInput
                        label="ValveNos"
                        returnKeyType="done"
                        keyboardType="numeric"
                        value={formData.ValveNos.toString()}
                        onChangeText={(value) => handleTextInputChange('ValveNos', value)}

                    />


                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 2 }}>
                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Valve Duration
                                </Text>
                                <TextInput
                                    label="Time Slot 1"
                                    returnKeyType="done"
                                    editable={false}
                                    value={moment(timeSlot1).format('HH:mm')}
                                />
                            </View>
                        </View>
                        <View>
                            <Icon style={{ marginTop: 47, padding: 4 }} name="clock" size={25} color="#007500" onPress={showTimeSlot1Picker} />
                        </View>
                    </View>
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
                        value={formData.FertilizerName}
                        onChangeText={(value) => handleTextInputChange('FertilizerName', value)}

                    />
                    <Button
                        mode="contained"
                        onPress={() =>
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'SequenceSettings' }],
                            })
                        }
                    >
                        Save
                    </Button>

                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        width: '100%',
    },
});
export default IrrigationSequenceScreen;