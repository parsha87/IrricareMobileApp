import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import { Text } from 'react-native-paper'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';

//reactnavigation.org - datepicker
//https://github.com/react-native-datetimepicker/datetimepicker#usage
const ConfigurationTimeScreen = ({ navigation }) => {

    const HHList=[
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

    const MMList=[
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
    const [date, setDate] = useState(new Date(1598051730000));

    const [currentDay, setcurrentDay] = useState({ value: '', error: '' })
    const [dayStart, setdayStart] = useState({ value: '', error: '' })


    const [dayEnd, setdayEnd] = useState({ value: '', error: '' })
    const [dayEndHH, setdayEndHH] = useState({ value: '', error: '' })
    
   
    const [dayStartHH, setdayStartHH] = useState("")
    const [opendaystartHH, setopendaystartHH] = useState(false);
    const [itemsHH, setItemsHH] = useState(HHList);
    // //dropdown daystart MM
    const [dayStartMM, setdayStartMM] = useState("")
    const [opendaystartMM, setopendaystartMM] = useState(false);
    const [itemsMM, setItemsMM] = useState(MMList);


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            is24Hour: true,
        });
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };
    const handleBack = () => {
        navigation.goBack();
    };




    return (
        <SafeAreaView>

            <View style={{ flexDirection: 'row', backgroundColor: '#3498db', padding: 16 }}>
                <TouchableOpacity onPress={handleBack}>
                    <Text style={{ color: '#fff', fontSize: 18, marginRight: 16 }}>{'< Back'}</Text>
                </TouchableOpacity>
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>ConfigurationSettingsScreen</Text>
            </View>

            <View style={styles.container}>

                <View>
                    <Text>ConfigurationTimeScreen</Text>

                    <Button
                        mode="outlined"
                        onPress={() =>
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Dashboard' }],
                            })
                        }
                    >
                        Back
                    </Button>

                </View>
                <Button mode="outlined" onPress={showDatepicker} title="Show date picker!" >Date</Button>
                <Button mode="outlined" onPress={showTimepicker} title="Show time picker!" >Time</Button>

                <Text>selected: {date.toLocaleString()}</Text>
                <TextInput
                    label="current Day"
                    returnKeyType="done"
                    value={currentDay.value}
                    onChangeText={(text) => setcurrentDay({ value: text, error: '' })}
                    error={!!currentDay.error}
                    errorText={currentDay.error}

                />
                {/* Day Start */}
                <TextInput
                    label="dayStart"
                    returnKeyType="done"
                    value={dayStart.value}
                    onChangeText={(text) => setdayStart({ value: text, error: '' })}
                    error={!!dayStart.error}
                    errorText={dayStart.error}

                />
                {/* Day Start HH */}
                <DropDownPicker
                    open={opendaystartHH}
                    value={dayStartHH}
                    items={itemsHH}
                    setOpen={setopendaystartHH}
                    setValue={setdayStartHH}
                    setItems={setItemsHH}
                />
  <DropDownPicker
                    open={opendaystartMM}
                    value={dayStartMM}
                    items={itemsMM}
                    setOpen={setopendaystartMM}
                    setValue={setdayStartMM}
                    setItems={setItemsMM}
                />





            </View>


        </SafeAreaView>


    );
}

const styles = StyleSheet.create({
    container: {

        padding: 20,
        width: '100%',
    },
})
export default ConfigurationTimeScreen;