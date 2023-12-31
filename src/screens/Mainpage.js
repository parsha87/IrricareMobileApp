import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Button from '../components/Button'

const MainpageScreen = ({ navigation }) => {

    const handleBack = () => {
        navigation.goBack();
    };
    return (

        <View>
            <View style={{ flexDirection: 'row', backgroundColor: '#3498db', padding: 16 }}>
                <TouchableOpacity onPress={handleBack}>
                    <Text style={{ color: '#fff', fontSize: 18, marginRight: 16 }}>{'< Back'}</Text>
                </TouchableOpacity>
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Sequence2Screen</Text>
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
                <Button
                    mode="outlined"
                    onPress={() =>
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Dashboard' }],
                        })
                    }
                >
                    Dashboard
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
export default MainpageScreen;