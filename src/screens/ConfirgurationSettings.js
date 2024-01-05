import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
const ConfigurationSettingsScreen = ({ navigation }) => {
    const handleBack = () => {
        navigation.goBack();
    };
    const [MaxFilter, setMaxFilter] = useState({ value: '', error: '' })
    const [TotalFilterValvePump1, setMaxTotalFilterValvePump1] = useState({ value: '', error: '' })
    const [FilterValveWithPump1, setFilterValveWithPump1] = useState({ value: '', error: '' })
    const [TotalFilterValvePump2, setTotalFilterValvePump2] = useState({ value: '', error: '' })
    const [FilterValveWithPump2, setFilterValveWithPump2] = useState({ value: '', error: '' })
    const [MaxValve, setMaxValve] = useState({ value: '', error: '' })
    const [IrrigationValve, setIrrigationValve] = useState({ value: '', error: '' })
    
    return (
        <View>
            <View style={{ flexDirection: 'row', backgroundColor: '#3498db', padding: 16 }}>
                <TouchableOpacity onPress={handleBack}>
                    <Text style={{ color: '#fff', fontSize: 18, marginRight: 16 }}>{'< Back'}</Text>
                </TouchableOpacity>
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>ConfigurationsSettingsScreen</Text>
            </View>

            <View style={styles.container}>

                <Button
                    mode="text"
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

            <TextInput
                    label="Max Filter"
                    returnKeyType="done"
                    value={MaxFilter.value}
                    onChangeText={(text) => setMaxFilter({ value: text, error: '' })}
                    error={!!MaxFilter.error}
                    errorText={MaxFilter.error}

                />
                <TextInput
                    label="Total Filter Valve Pump1"
                    returnKeyType="done"
                    value={TotalFilterValvePump1.value}
                    onChangeText={(text) => setTotalFilterValvePump1({ value: text, error: '' })}
                    error={!!TotalFilterValvePump1.error}
                    errorText={TotalFilterValvePump1.error}

                />
                <TextInput
                    label=" Filter Valve With Pump1"
                    returnKeyType="done"
                    value={FilterValveWithPump1.value}
                    onChangeText={(text) => setFilterValveWithPump1({ value: text, error: '' })}
                    error={!!FilterValveWithPump1.error}
                    errorText={FilterValveWithPump1.error}

                />
                <TextInput
                    label="TotalFilterValvePump2"
                    returnKeyType="done"
                    value={TotalFilterValvePump2.value}
                    onChangeText={(text) => setTotalFilterValvePump2({ value: text, error: '' })}
                    error={!!TotalFilterValvePump2.error}
                    errorText={TotalFilterValvePump2.error}

                />
                <TextInput
                    label="FilterValveWithPump2"
                    returnKeyType="done"
                    value={FilterValveWithPump2.value}
                    onChangeText={(text) => setFilterValveWithPump2({ value: text, error: '' })}
                    error={!!FilterValveWithPump2.error}
                    errorText={FilterValveWithPump2.error}

                />
                <TextInput
                    label="MaxValve"
                    returnKeyType="done"
                    value={MaxValve.value}
                    onChangeText={(text) => setMaxValve({ value: text, error: '' })}
                    error={!!MaxValve.error}
                    errorText={MaxValve.error}

                />
                <TextInput
                    label="Irrigation Valve"
                    returnKeyType="done"
                    value={IrrigationValve.value}
                    onChangeText={(text) => setIrrigationValve({ value: text, error: '' })}
                    error={!!IrrigationValve.error}
                    errorText={IrrigationValve.error}

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


    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        width: '100%',
    },
})
export default ConfigurationSettingsScreen;