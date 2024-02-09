import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { useNavigation } from '@react-navigation/native';

const IrrigationSequenceScreen = ({ route }) => {
    const navigation = useNavigation();
    const { authAxios } = useContext(AxiosContext);
    const { selectedControllerId, selectedControllerName, dataModel, isAddData } = route.params;
    const [isAdd, setIsAdd] = useState(true);

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


    const [showTimeSlot1, setShowTimeSlot1] = useState(false);
    const [showTimeSlot2, setShowTimeSlot2] = useState(false);
    const [showTimeSlot3, setShowTimeSlot3] = useState(false);
    const [showTimeSlot4, setShowTimeSlot4] = useState(false);
    const [showDuration, setShowDuration] = useState(false);


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

    const [formObj, setFormObj] = useState({
        id: 0,
        sequenceNo: "",
        pumbNo: 0,
        timeSlot1Hh: "",
        timeSlot1Min: "",
        timeSlot2Hh: "",
        timeSlot2Min: "",
        timeSlot3Hh: "",
        timeSlot3Min: "",
        timeSlot4Hh: "",
        timeSlot4Min: "",
        weekdaysString: "",
        valveNos: "",
        valveDurationReadonly: "",
        isFert: false,
        userId: "",
        controllerNo: "",
        controllerId: 0,
        usermobileImeino: ""
    }
    )

    const handleBack = () => {
        navigation.navigate('Dashboard')
    };

    useEffect(() => {
        setIsAdd(isAddData);
        setFormData(dataModel);
    }, []);




    const [SequenceNo, setSequenceNo] = useState("")
    const [PumpNo, setPumpNo] = useState("")

    return (
        <View>
            <View style={{ flexDirection: 'row', backgroundColor: '#3498db', padding: 16 }}>
                <TouchableOpacity onPress={handleBack}>
                    <Text style={{ color: '#fff', fontSize: 18, marginRight: 16 }}>{'< Back'}</Text>
                </TouchableOpacity>
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>IrrigationSequenceScreen</Text>
            </View>
            <View style={styles.container}>
                <Button
                    mode="contained"
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
                    label="SequenceNo"
                    returnKeyType="next"
                    value={SequenceNo.value}
                    onChangeText={(text) => setSequenceNo(text)}
                    autoCapitalize="none"
                />
                <TextInput
                    label="PumpNo"
                    returnKeyType="next"
                    value={PumpNo.value}
                    onChangeText={(text) => setPumpNo(text)}
                    autoCapitalize="none"
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
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        width: '100%',
    },
});
export default IrrigationSequenceScreen;