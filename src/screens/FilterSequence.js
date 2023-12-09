import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Button from '../components/Button'

const FilterSequenceScreen=({navigation})=>{
    return (
        <View>
            <Text>FilterSequenceScreen</Text>
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
        </View>
    );
}
export default FilterSequenceScreen;