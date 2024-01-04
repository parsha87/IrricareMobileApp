import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import { Text } from 'react-native-paper'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
//reactnavigation.org - datepicker
//https://github.com/react-native-datetimepicker/datetimepicker#usage
const ConfigurationTimeScreen = ({ navigation }) => {
    const [date, setDate] = useState(new Date(1598051730000));

  //dropdown
  const [dayStartMM, setdayStartMM] = useState("")
  const [opendaystartMM, setopendaystartMM] = useState(false);
  const [items, setItems] = useState("");



    (event, selectedDate) => {
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
     const [currentDay, setcurrentDay] = useState({ value: '', error: '' })
     const [dayStart, setdayStart] = useState({ value: '', error: '' })
     const [dayStartmm, setdayStartmm] = useState({ value: '', error: '' })
     const [dayEnd, setdayEnd] = useState({ value: '', error: '' })
     const [dayEndHH, setdayEndHH] = useState({ value: '', error: '' })

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
        <TextInput
          label="dayStart"
         returnKeyType="done"
          value={dayStart.value}
          onChangeText={(text) => setdayStart({ value: text, error: '' })}
          error={!!dayStart.error}
          errorText={dayStart.error}
          
        />
        <TextInput
          label="dayStartHH"
         returnKeyType="done"
          value={dayStartMM.value}
          onChangeText={(text) => setdayStartMM({ value: text, error: '' })}
          error={!!dayStartMM.error}
          errorText={dayStartMM.error}
          
        />
        
         <TextInput
          label="dayEnd "
          returnKeyType="done"
          value={dayEnd.value}
          onChangeText={(text) => setendDay({ value: text, error: '' })}
          error={!!dayEnd.error}
          errorText={dayEnd.error}
          
        />
        <TextInput
          label="dayEndMM"
          returnKeyType="done"
          value={dayEndMM.value}
          onChangeText={(text) => setdayEndMM({ value: text, error: '' })}
          error={!!dayEndMM.error}
          errorText={dayEndMM.error}
          
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