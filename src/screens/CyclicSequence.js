import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Button from '../components/Button'
import TextInput from '../components/TextInput'

const CyclicSequenceScreen=({navigation})=>{
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
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>CyclicSequenceScreen</Text>
            </View>
            
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
        </View>
    );
}
export default CyclicSequenceScreen;