import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import Button from '../components/Button'
import React, { useState } from 'react'
import TextInput from '../components/TextInput'
import { ScrollView } from 'react-native-gesture-handler'

const ValveSettingsScreen = ({ navigation }) => {
    const handleBack = () => {
        navigation.goBack();
    };
    const [MainValveNo, setMainValveNo] = useState({ value: '', error: '' })
    const [TagName, setTagName] = useState({ value: '', error: '' })
    const [Duration_HH, setDuration_HH] = useState({ value: '', error: '' })
    const [PumpNo, setPumpNo] = useState({ value: '', error: '' })
    const [FB_Time_HH, setFB_Time_HH] = useState({ value: '', error: '' })
    const [FO_TimeHH, setFO_TimeHH] = useState({ value: '', error: '' })
    const [CoValveSetting, setCoValveSetting] = useState({ value: '', error: '' })
    const [Co_ValveNo1, setCo_ValveNo1] = useState({ value: '', error: '' })
    const [Co_ValveNo2, setCo_ValveNo2] = useState({ value: '', error: '' })
    const [Co_ValveNo3, setCo_ValveNo3] = useState({ value: '', error: '' })
    const [Duration_MM, setDuration_MM] = useState({ value: '', error: '' })
    const [Duration_SS, setDuration_SS] = useState({ value: '', error: '' })
    const [FB_Time_Min, setFB_Time_Min] = useState({ value: '', error: '' })
    const [Crop_Name, setCrop_Name] = useState({ value: '', error: '' })
    const [Crop_Type, setCrop_Type] = useState({ value: '', error: '' })
    const [Crop_Sowing_Date, setCrop_Sowing_Date] = useState({ value: '', error: '' })
    const [Valve_Area, setValve_Area] = useState({ value: '', error: '' })
    const [Usermobile_IMEINo, setUsermobile_IMEINo] = useState({ value: '', error: '' })

    return (
        <ScrollView>

            <View>
                <View style={{ flexDirection: 'row', backgroundColor: '#3498db', padding: 16 }}>
                    <TouchableOpacity onPress={handleBack}>
                        <Text style={{ color: '#fff', fontSize: 18, marginRight: 16 }}>{'< Back'}</Text>
                    </TouchableOpacity>
                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>ValveSettingsScreen</Text>
                </View>

                <View style={styles.container}>

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
                <TextInput
                    label="MainValveNo"
                    returnKeyType="done"
                    value={MainValveNo.value}
                    onChangeText={(text) => setMainValveNo({ value: text, error: '' })}
                    error={!!MainValveNo.error}
                    errorText={MainValveNo.error}

                />
                <TextInput
                    label="TagName"
                    returnKeyType="done"
                    value={TagName.value}
                    onChangeText={(text) => setTagName({ value: text, error: '' })}
                    error={!!TagName.error}
                    errorText={TagName.error}

                />
                <TextInput
                    label=" Duration_HH"
                    returnKeyType="done"
                    value={Duration_HH.value}
                    onChangeText={(text) => setDuration_HH({ value: text, error: '' })}
                    error={!!Duration_HH.error}
                    errorText={Duration_HH.error}

                />
                <TextInput
                    label="PumpNo"
                    returnKeyType="done"
                    value={PumpNo.value}
                    onChangeText={(text) => setPumpNo({ value: text, error: '' })}
                    error={!!PumpNo.error}
                    errorText={PumpNo.error}

                />
                <TextInput
                    label="FB_Time_HH"
                    returnKeyType="done"
                    value={FB_Time_HH.value}
                    onChangeText={(text) => setFB_Time_HH({ value: text, error: '' })}
                    error={!!FB_Time_HH.error}
                    errorText={FB_Time_HH.error}

                />
                <TextInput
                    label="FO_TimeHH"
                    returnKeyType="done"
                    value={FO_TimeHH.value}
                    onChangeText={(text) => setFO_TimeHH({ value: text, error: '' })}
                    error={!!FO_TimeHH.error}
                    errorText={FO_TimeHH.error}

                />
                <TextInput
                    label="CoValveSetting"
                    returnKeyType="done"
                    value={CoValveSetting.value}
                    onChangeText={(text) => setCoValveSetting({ value: text, error: '' })}
                    error={!!CoValveSetting.error}
                    errorText={CoValveSetting.error}

                />
                <TextInput
                    label="Co_ValveNo1"
                    returnKeyType="done"
                    value={Co_ValveNo1.value}
                    onChangeText={(text) => setCo_ValveNo1({ value: text, error: '' })}
                    error={!!Co_ValveNo1.error}
                    errorText={Co_ValveNo1.error}

                />
                <TextInput
                    label="Co_ValveNo2"
                    returnKeyType="done"
                    value={Co_ValveNo2.value}
                    onChangeText={(text) => setCo_ValveNo2({ value: text, error: '' })}
                    error={!!Co_ValveNo2.error}
                    errorText={Co_ValveNo2.error}

                />
                <TextInput
                    label="Co_ValveNo3"
                    returnKeyType="done"
                    value={Co_ValveNo3.value}
                    onChangeText={(text) => setCo_ValveNo3({ value: text, error: '' })}
                    error={!!Co_ValveNo3.error}
                    errorText={Co_ValveNo3.error}

                />
                <TextInput
                    label="Duration_MM"
                    returnKeyType="done"
                    value={Duration_MM.value}
                    onChangeText={(text) => setDuration_MM({ value: text, error: '' })}
                    error={!!Duration_MM.error}
                    errorText={Duration_MM.error}

                />
                <TextInput
                    label="Duration_SS"
                    returnKeyType="done"
                    value={Duration_SS.value}
                    onChangeText={(text) => setDuration_SS({ value: text, error: '' })}
                    error={!!Duration_SS.error}
                    errorText={Duration_SS.error}

                />
                <TextInput
                    label="FB_Time_Min"
                    returnKeyType="done"
                    value={FB_Time_Min.value}
                    onChangeText={(text) => setFB_Time_Min({ value: text, error: '' })}
                    error={!!FB_Time_Min.error}
                    errorText={FB_Time_Min.error}

                />

                <TextInput
                    label="Crop_Name"
                    returnKeyType="done"
                    value={Crop_Name.value}
                    onChangeText={(text) => setCrop_Name({ value: text, error: '' })}
                    error={!!Crop_Name.error}
                    errorText={Crop_Name.error}

                />
                <TextInput
                    label="Crop_Type"
                    returnKeyType="done"
                    value={Crop_Type.value}
                    onChangeText={(text) => setCrop_Type({ value: text, error: '' })}
                    error={!!Crop_Type.error}
                    errorText={Crop_Type.error}

                />
                <TextInput
                    label="Crop_Sowing_Date"
                    returnKeyType="done"
                    value={Crop_Sowing_Date.value}
                    onChangeText={(text) => setCrop_Sowing_Date({ value: text, error: '' })}
                    error={!!Crop_Sowing_Date.error}
                    errorText={Crop_Sowing_Date.error}

                />
                <TextInput
                    label="Valve_Area"
                    returnKeyType="done"
                    value={Valve_Area.value}
                    onChangeText={(text) => setValve_Area({ value: text, error: '' })}
                    error={!!Valve_Area.error}
                    errorText={Valve_Area.error}

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
        </ScrollView>


    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        width: '100%',
    },
});
export default ValveSettingsScreen;