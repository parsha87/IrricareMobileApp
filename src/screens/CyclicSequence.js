import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { ScrollView } from 'react-native-gesture-handler'

const CyclicSequenceScreen = ({ navigation }) => {
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


    const [SequenceNo, setSequenceNo] = useState("")
    const [PumpNo, setPumpNo] = useState("")
    const handleBack = () => {
        navigation.goBack();
    };
    const [dayStartHH, setdayStartHH] = useState("")
    const [opendayStartHH, setopendaystartHH] = useState(false);
    const [itemsHH, setItemsHH] = useState(HHList);
    // //dropdown daystart MM
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
    //dropdown Interval HH
    const [intervalHH, setintervalHH] = useState("")
     const [openintervalHH, setopenintervalHH] = useState(false);
    const [itemsintervalHH, setItemsintervalHH] = useState(MMList);
    //dropdown Interval MM
    const [intervalMM, setintervalMM] = useState("")
    const [openintervalMM, setopenintervalMM] = useState(false);
    const [itemsintervalMM, setitemsintervalMM] = useState(MMList);

    const [WeekdaysString, setWeekdaysString] = useState({ value: '', error: '' })
    const [ValveNo, setValveNo] = useState({ value: '', error: '' })
   

    const [ValveDuration, setValveDuration] = useState({ value: '', error: '' })
    const [FO_TimeHH, setFO_TimeHH] = useState({ value: '', error: '' })
    const [StartTime_Min, setStartTime_Min] = useState({ value: '', error: '' })
    const [EndTime_Min, setEndTime_Min] = useState({ value: '', error: '' })
    const [Usermobile_IMEINo, setUsermobile_IMEINo] = useState({ value: '', error: '' })
    const [StartTime_HH, setStartTime_HH] = useState({ value: '', error: '' })
    const [EndTime_HH, setEndTime_HH] = useState({ value: '', error: '' })
    const [Interval, setInterval] = useState({ value: '', error: '' })


    return (

<ScrollView>
    <View>
            <View style={{ flexDirection: 'row', backgroundColor: '#3498db', padding: 16 }}>
                <TouchableOpacity onPress={handleBack}>
                    <Text style={{ color: '#fff', fontSize: 18, marginRight: 16 }}>{'< Back'}</Text>
                </TouchableOpacity>
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>CyclicSequenceScreen</Text>
            </View>
            <View style={styles.container}>
                <Button
                    mode="outlined"
                    onPress={() =>
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'SequenceSettings' }],
                        })
                    }
                >
                    Back
                </Button>
                <TextInput
                    label="Sequence No"
                    returnKeyType="next"
                    value={SequenceNo.value}
                    onChangeText={(text) => setSequenceNo(text)}
                    autoCapitalize="none"
                />
                <TextInput
                    label="Pump No"
                    returnKeyType="next"
                    value={PumpNo.value}
                    onChangeText={(text) => setPumpNo(text)}

                    autoCapitalize="none"
                />
                <TextInput
                    label="StartTime_HH"
                    returnKeyType="done"
                    value={StartTime_HH.value}
                    onChangeText={(text) => setStartTime_HH({ value: text, error: '' })}
                    error={!!StartTime_HH.error}
                    errorText={StartTime_HH.error}

                />

                {/* Day Start HH */}
                <DropDownPicker
                    open={opendayStartHH}
                    value={dayStartHH}
                    items={itemsHH}
                    setOpen={setopendaystartHH}
                    setValue={setdayStartHH}
                    setItems={setItemsHH}
                />

                 <DropDownPicker
                    open={opendaystartMM}
                    value={dayStartMM}
                    items={itemsHH}
                    setOpen={setopendaystartMM}
                    setValue={ setopendaystartMM}
                    setItems={setItemsMM}

                /> 
                 <TextInput
                label="EndTime_HH"
                returnKeyType="done"
                value={EndTime_HH.value}
                onChangeText={(text) => setEndTime_HH({ value: text, error: '' })}
                error={!!EndTime_HH.error}
                errorText={EndTime_HH.error}

            /> 
                 <DropDownPicker
                    open={openEndHH}
                    value={dayEndHH}
                    items={itemsHH}
                    setOpen={setopenEndHH}
                    setValue={setdayEndHH}
                    setItems={setItemsHH}
                />
                <DropDownPicker
                    open={opendayEndMM}
                    value={dayEndMM}
                    items={itemsEndMM}
                    setOpen={setopendayEndMM}
                    setValue={setdayEndMM}
                    setItems={setItemsMM}
                /> 
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
                    setOpen={setintervalHH}
                    setValue={setintervalHH}
                    setItems={setItemsHH}
                />

                <DropDownPicker
                    open={openintervalMM}
                    value={intervalMM}
                    items={itemsintervalMM}
                    setOpen={setintervalMM}
                    setValue={setintervalMM}
                    setItems={setItemsMM}

                /> 
                <TextInput
                    label="WeekdaysString"
                    returnKeyType="done"
                    value={WeekdaysString.value}
                    onChangeText={(text) => setWeekdaysString({ value: text, error: '' })}
                    error={!!WeekdaysString.error}
                    errorText={WeekdaysString.error}

                />
                <TextInput
                    label="ValveNo"
                    returnKeyType="done"
                    value={ValveNo.value}
                    onChangeText={(text) => setValveNo({ value: text, error: '' })}
                    error={!!ValveNo.error}
                    errorText={ValveNo.error}

                />
                <TextInput
                    label="ValveDuration"
                    returnKeyType="done"
                    value={ValveDuration.value}
                    onChangeText={(text) => setValveDuration({ value: text, error: '' })}
                    error={!!ValveDuration.error}
                    errorText={ValveDuration.error}

                />
                <TextInput
                    label="StartTime_Min"
                    returnKeyType="done"
                    value={StartTime_Min.value}
                    onChangeText={(text) => setStartTime_Min({ value: text, error: '' })}
                    error={!!StartTime_Min.error}
                    errorText={StartTime_Min.error}

                />
                <TextInput
                    label="EndTime_Min"
                    returnKeyType="done"
                    value={EndTime_Min.value}
                    onChangeText={(text) => setEndTime_Min({ value: text, error: '' })}
                    error={!!EndTime_Min.error}
                    errorText={EndTime_Min.error}

                />
                <TextInput
                    label="Usermobile_IMEINo"
                    returnKeyType="done"
                    value={Usermobile_IMEINo.value}
                    onChangeText={(text) => setUsermobile_IMEINo({ value: text, error: '' })}
                    error={!!Usermobile_IMEINo.error}
                    errorText={Usermobile_IMEINo.error}

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

</ScrollView>
    
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        width: '100%',
    },
});
export default CyclicSequenceScreen;