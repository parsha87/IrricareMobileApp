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
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
const FilterSequenceScreen = ({ route }) => {
    const navigation = useNavigation();

    const { authAxios } = useContext(AxiosContext);
    const { selectedControllerId, selectedControllerName } = route.params;
    const [formData, setFormData] = useState({
        Id: number = 0,
        MaxFilterValve: number = 0,
        PumpNo: number = 0,
        ValvePumpNo: number = 0,
        FlushTimeMin: number = 0,
        IntervalHh: number = 0,
        UserId: string = "",
        ControllerNo: "",
        ControllerId: number = 0,
        FlushTimeSec: number = 0,
        IntervalMin: number = 0,
        IntervalSec: number = 0,
        UsermobileImeino: "",
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
    //Show Day Start time picker
    const [showFbTime, setShowFbTime] = useState(false);
    //Show Day end Time Picker
    const [showDFoTime, setShowFoTime] = useState(false);


    const handleBack = () => {
        navigation.navigate('Dashboard')
    };

    const handleSubmit = async () => {
        const value = await AsyncStorage.getItem('user');
        let jsonVal = JSON.parse(value);
        formData.UserId = jsonVal.userId;

        const fullYear = date.getFullYear();
        // Convert full year to two-digit year (YY)
        const twoDigitYear = String(fullYear).slice(2, 4);
        formData.CurrentDayServer = date.getDay()
        formData.CurrentMonthServer = date.getMonth()
        formData.CurrentYearServer = +twoDigitYear;
        formData.CuttentTimeServerHh = currentTime.getHours() == NaN ? 0 : currentTime.getHours();
        formData.CurrentTimeServerMin = currentTime.getMinutes() == NaN ? 0 : currentTime.getMinutes();
        formData.DayStartTimeHh = dayStartTime.getHours() == NaN ? 0 : dayStartTime.getHours();
        formData.DayStartTimeMin = dayStartTime.getMinutes() == NaN ? 0 : dayStartTime.getMinutes();
        formData.DayEndTimeHh = dayEndTime.getHours() == NaN ? 0 : dayEndTime.getHours();
        formData.DayEndTimeMin = dayEndTime.getMinutes() == NaN ? 0 : dayEndTime.getMinutes();
        formData.ControllerId = selectedControllerId;
        formData.ControllerNo = selectedControllerName;
        if (isAdd) {
            //Add
            try {
                console.log("adding")
                const response = await authAxios.post('/ControllerTimeSetting', formData);
                console.log('Response:', response.data);
                setIsAdd(false)
                //set controller object
                setControllerTimeObj(response.data)
                alert('Saved Successfully!');
            } catch (error) {
                console.error('Error:', error);
                // Handle the error here
            }

        }
        else {
            //Update
            try {
                console.log("Updating")
                const response = await authAxios.put('/ControllerTimeSetting/' + formData.Id, formData);
                console.log('Response:', response.data);
                alert('Updated Successfully!');

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
    const showFoTimePicker = () => {
        setShowFoTime(true);
    };

    const showFbimePicker = () => {
        setShowFbTime(true);
    };
    return (
        <SafeAreaView>
            <View style={{ flexDirection: 'row', backgroundColor: '#3498db', padding: 16 }}>
                <TouchableOpacity onPress={handleBack}>
                    <Text style={{ color: '#fff', fontSize: 18, marginRight: 16 }}>{'< Back'}</Text>
                </TouchableOpacity>
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Filter Sequence</Text>
            </View>
            <Card>
                <Card.Content style={{ padding: 5, margin: 5 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Controller No: {selectedControllerName}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={styles.container}>
                            <Text style={styles.label}>Max Filter Valve:
                            </Text>
                            <TextInput style={{ color: 'black', backgroundColor: 'white' }}
                                label="Max Filter Valve"
                                returnKeyType="done"
                                keyboardType="numeric"
                                value={formData.MaxFilterValve.toString()}
                                onChangeText={(value) => handleTextInputChange('MaxFilterValve', value)}
                            />
                            <Text style={styles.label}>Pump No:
                            </Text>
                            <TextInput style={{ color: 'black', backgroundColor: 'white' }}
                                label="Pump No"
                                returnKeyType="done"
                                keyboardType="numeric"
                                value={formData.PumpNo.toString()}
                                onChangeText={(value) => handleTextInputChange('PumpNo', value)}
                            />
                            <Text style={styles.label}>Valve Pump No:
                            </Text>
                            <TextInput style={{ color: 'black', backgroundColor: 'white' }}
                                label="Valve Pump No"
                                returnKeyType="done"
                                keyboardType="numeric"
                                value={formData.ValvePumpNo.toString()}
                                onChangeText={(value) => handleTextInputChange('ValvePumpNo', value)}
                            />

                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 2 }}>
                                    <View style={styles.formGroup}>
                                        <Text style={styles.label}>FB Time:
                                        </Text>
                                        <TextInput
                                            label="FB Time"
                                            returnKeyType="done"
                                            editable={false}
                                            value={moment(fbTIme).format('HH:mm')}
                                        />
                                    </View>
                                </View>
                                <View>
                                    <Icon style={{ marginTop: 47, padding: 4 }} name="clock" size={25} color="#007500" onPress={showFbimePicker} />
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
                                        <Text style={styles.label}>FO Time:
                                        </Text>
                                        <TextInput
                                            label="FO Time"
                                            returnKeyType="done"
                                            editable={false}
                                            value={moment(foTime).format('HH:mm')}
                                        />
                                    </View>
                                </View>
                                <View>
                                    <Icon style={{ marginTop: 47, padding: 4 }} name="clock" size={25} color="#007500" onPress={showFoTimePicker} />
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



                            <TextInput
                                label=" Interval"
                                returnKeyType="done"
                                value={Interval.value}
                                onChangeText={(text) => setInterval({ value: text, error: '' })}
                                error={!!Interval.error}
                                errorText={Interval.error}

                            />
                            <DropDownPicker
                                open={openintervalHH}
                                value={intervalHH}
                                items={itemsintervalHH}
                                setOpen={setopenintervalHH}
                                setValue={setintervalHH}
                                setItems={setItemsHH}
                            />

                            <DropDownPicker
                                open={openintervalMM}
                                value={intervalMM}
                                items={itemsintervalMM}
                                setOpen={setopenintervalMM}
                                setValue={setintervalMM}
                                setItems={setItemsMM}

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
                                Sumbit
                            </Button>


                        </View>
                    </View>
                </Card.Content>
            </Card>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        width: '100%',
    },
});
export default FilterSequenceScreen;