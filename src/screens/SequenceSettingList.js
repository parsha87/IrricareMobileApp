import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, TouchableOpacity, SafeAreaView, Alert, ScrollView, FlatList } from 'react-native'
import { Provider as PaperProvider, Card, DefaultTheme } from 'react-native-paper';
import { AxiosContext } from '../context/AxiosContext';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Text } from "react-native-paper";
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome6';
import DateTimePicker from '@react-native-community/datetimepicker';
import CardItem from './CardItem';
import CardItemSequenceList from './CardItemSequenceLsit';

const SequenceSettingsListScreen = ({ route }) => {
    const navigation = useNavigation();
    const { authAxios } = useContext(AxiosContext);
    const { selectedControllerId, selectedControllerName } = route.params;
    const [formDataList, setFormDataList] = useState([]);
    const [formData, setFormData] = useState({
        Id: 0,
        SequenceNo: "",
        PumbNo: 0,
        TimeSlot1Hh: "",
        TimeSlot1Min: "",
        TimeSlot2Hh: "",
        TimeSlot2Min: "",
        TimeSlot3Hh: "",
        TimeSlot3Min: "",
        TimeSlot4Hh: "",
        TimeSlot4Min: "",
        WeekdaysString: "",
        ValveNos: "",
        ValveDurationReadonly: "",
        IsFert: false,
        UserId: "",
        ControllerNo: "",
        ControllerId: 0,
        UsermobileImeino: ""
    })

    const renderItem = ({ item }) => (
        <CardItem item={item} onPress={handleCardItemPress(item)}> </CardItem>
    );

    const handleCardItemPress = (item) => {
        // Handle card item press, e.g., navigate to a detailed view
        console.log(item)
        navigation.navigate('IrrigationSequenceScreen', {
            selectedControllerId: selectedControllerId,
            selectedControllerName: selectedControllerName,
            dataModel: item,
            isAddData: false
        })
    };

    const handleButtonClick = () => {
        // Add functionality for button click here
        navigation.navigate('ValveSettingsScreen', {
            selectedControllerId: selectedControllerId,
            selectedControllerName: selectedControllerName,
            dataModel: formData,
            isAddData: true
        })
    };
    useEffect(() => {
        // Define a function to fetch data from the API
        const fetchData = async () => {
            try {
                const response = await authAxios.get('SequenceSetting/GetSequenceSettingByControllerId/' + selectedControllerId);
                // Update the state with the received data
                let data = response.data
                setFormDataList(data)
                if (data != null) {

                }
                else {
                    //Add
                }

                //setApiData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        // getIMEI();
        fetchData();
    }, []);

    const handleBack = () => {
        navigation.navigate('Dashboard')
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{ flexDirection: 'row', backgroundColor: '#3498db', padding: 16 }}>
                    <TouchableOpacity onPress={handleBack}>
                        <Text style={{ color: '#fff', fontSize: 18, marginRight: 16 }}>{'< Back'}</Text>
                    </TouchableOpacity>
                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Valve Settings</Text>
                </View>
                <Button title="Click me" mode="outlined" onPress={handleButtonClick}>Add Valve Setting</Button>

                <FlatList
                    data={formDataList}
                    renderItem={({ item }) => <CardItemSequenceList item={item} onPress={handleCardItemPress} />}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContainer}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        width: '100%',
    },
    list: {
        paddingHorizontal: 16,
    },
    item: {
        backgroundColor: '#fff',
        padding: 20,
        marginBottom: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 4, // Android
    },
    title: {
        fontSize: 18,
    }, card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        margin: 8,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 4,
    },
    gridItemText: {
        fontSize: 16,
    },
    listContainer: {
        paddingVertical: 8,
    },
});
export default SequenceSettingsListScreen;