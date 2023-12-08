import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Button from '../components/Button'

const ConfigurationSettingsScreen=({navigation})=>{
    return (
        <View>
            <Text>ConfigurationSettingsScreen</Text>
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
    );
}
export default  ConfigurationSettingsScreen;