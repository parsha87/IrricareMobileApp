import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, TouchableOpacity, SafeAreaView, Alert, ScrollView, FlatList } from 'react-native'
import { Provider as PaperProvider, Card, DefaultTheme, FAB, ActivityIndicator } from 'react-native-paper';
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
    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation();
    const { authAxios } = useContext(AxiosContext);
    const { selectedControllerId, selectedControllerName } = route.params;
    const [formDataList, setFormDataList] = useState([]);
    const [formData, setFormData] = useState({
        Id: 0,
        SequenceNo: 0,
        PumbNo: 0,
        TimeSlot1Hh: 0,
        TimeSlot1Min: 0,
        TimeSlot2Hh: 0,
        TimeSlot2Min: 0,
        TimeSlot3Hh: 0,
        TimeSlot3Min: 0,
        TimeSlot4Hh: 0,
        TimeSlot4Min: 0,
        WeekdaysString: "",
        ValveNos: "",
        ValveDurationReadonly: "",
        IsFert: false,
        UserId: "",
        ControllerNo: "",
        ControllerId: 0,
        UsermobileImeino: "",
        FertilizerName: ""

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
        navigation.navigate('IrrigationSequenceScreen', {
            selectedControllerId: selectedControllerId,
            selectedControllerName: selectedControllerName,
            dataModel: formData,
            isAddData: true
        })
    };
    useEffect(() => {
        setIsLoading(true);
        // Define a function to fetch data from the API
        const fetchData = async () => {
            try {
                console.log(selectedControllerId)
                const response = await authAxios.get('SequenceSetting/SequenceSettingByControllerId/' + selectedControllerId);
                // Update the state with the received data
                let data = response.data
                console.log(data)
                setFormDataList(data)
                if (data != null) {

                }
                else {
                    //Add
                }
                setIsLoading(false);
                //setApiData(data);
            } catch (error) {
                setIsLoading(false);
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
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={{ flexDirection: 'row', backgroundColor: '#3498db', padding: 16 }}>
                    <TouchableOpacity onPress={handleBack}>
                        <Text style={{ color: '#fff', fontSize: 18, marginRight: 16 }}>{'< Back'}</Text>
                    </TouchableOpacity>
                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Sequence Settings</Text>
                </View>
                {/* <Button title="Click me" mode="outlined" onPress={handleButtonClick}>Add Sequence Setting</Button> */}
                <FlatList
                    data={formDataList}
                    renderItem={({ item }) => <CardItemSequenceList item={item} onPress={handleCardItemPress} />}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContainer}
                />
            </ScrollView>
            <View style={styles.fabContainer}>
                <FAB
                    icon="plus"
                    onPress={handleButtonClick}
                    style={styles.fab}
                />
            </View>
            {/* Show the spinner if isLoading is true */}
            {isLoading && (
                <View style={styles.spinnerContainer}>
                    <ActivityIndicator size="large" color="green" />
                </View>
            )}
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
    }, fabContainer: {
        position: 'absolute',
        bottom: 16,
        right: 16,
    },
    fab: {
        color: 'white',
        backgroundColor: 'green', // Adjust the color as needed
    },
    spinnerContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },

});
export default SequenceSettingsListScreen;