import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Button from '../components/Button'
import TextInput from '../components/TextInput'

const IrrigationSequenceScreen = ({ navigation }) => {
    const [SequenceNo, setSequenceNo] = useState("")
    const [PumpNo, setPumpNo] = useState("")
    const handleBack = () => {
        navigation.goBack();
    };
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