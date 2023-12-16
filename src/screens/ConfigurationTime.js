import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import { Text } from 'react-native-paper'
import Button from '../components/Button'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
//reactnavigation.org - datepicker
//https://github.com/react-native-datetimepicker/datetimepicker#usage
const ConfigurationTimeScreen = ({ navigation }) => {
    const [date, setDate] = useState(new Date(1598051730000));
   
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
        </SafeAreaView>


    );
}
export default ConfigurationTimeScreen;