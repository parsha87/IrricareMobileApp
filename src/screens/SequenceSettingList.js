import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, TouchableOpacity, SafeAreaView, Alert, ScrollView, FlatList } from 'react-native'
import { Provider as PaperProvider, Card, DefaultTheme, FAB, ActivityIndicator } from 'react-native-paper';
import { AxiosContext } from '../context/AxiosContext';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Text } from "react-native-paper";
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome6';
import DateTimePicker from '@react-native-community/datetimepicker';
import CardItem from './CardItem';
import CardItemSequenceList from './CardItemSequenceLsit';

const SequenceSettingsListScreen = ({ route }) => {
    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation();
    const { authAxios } = useContext(AxiosContext);
    // const { selectedControllerId, selectedControllerName } = route.params;
    const [controller, setSelectedController] = useState({
        selectedControllerId: 0,
        selectedControllerName: ''
    })
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
            selectedControllerId: controller.selectedControllerId,
            selectedControllerName: controller.selectedControllerName,
            dataModel: item,
            isAddData: false
        })
    };

    const handleButtonClick = () => {
        // Add functionality for button click here
        navigation.navigate('IrrigationSequenceScreen', {
            selectedControllerId: controller.selectedControllerId,
            selectedControllerName: controller.selectedControllerName,
            dataModel: formData,
            isAddData: true
        })
    };

    useFocusEffect(
        React.useCallback(() => {
            setIsLoading(true);
            // Retrieve selected controller from AsyncStorage
            const retrieveSelectedController = async () => {
                try {

                    const value = await AsyncStorage.getItem('selectedController');
                    if (value !== null) {

                        let jsonVal = JSON.parse(value);
                        let controller = {
                            selectedControllerId: jsonVal.value,
                            selectedControllerName: jsonVal.label
                        }
                        setSelectedController(controller);
                        fetchData(jsonVal.value);
                    }
                    else {
                        alert("Select controller no form dashboard")
                        setIsLoading(false);
                    }
                } catch (error) {
                    console.error('Error retrieving selected controller:', error);
                    alert("Select controller no form dashboard")
                    setIsLoading(false);
                }
            };



            setIsLoading(true);


            retrieveSelectedController();
        }, [authAxios]) // Make sure to include any dependencies of the effect
    );
    // Define a function to fetch data from the API
    const fetchData = async (id) => {
        try {
            const response = await authAxios.get('SequenceSetting/SequenceSettingByControllerId/' + id);
            // Update the state with the received data
            let data = response.data.filter(x=>x.SequenceNo<9)
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
    // Method to handle deletion of an item
    const handleDelete = async (itemId) => {

        // Show confirmation dialog before deleting
        Alert.alert(
            'Confirm Deletion',
            'Are you sure you want to delete this item?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', onPress: () => confirmDelete(itemId) }
            ],
            { cancelable: true }
        );

    };


    const confirmDelete = async (itemId) => {
        const response = await authAxios.delete('SequenceSetting/' + itemId);
        let data = response.data
        alert("Sequence Deleted Successfully")
        fetchData(controller.selectedControllerId)
    };
    
    const handleBack = () => {
        navigation.navigate('SequenceSetting')
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
            <Icon onPress={handleBack} name="chevron-left" size={30} color="green" />
                <Text style={styles.title}>Irrigation Sequence</Text>
                <Text style={styles.controllerName}>Controller No:{controller.selectedControllerName}</Text>
                {/* <View style={{ flexDirection: 'row', backgroundColor: '#3498db', padding: 16 }}>
                    <TouchableOpacity onPress={handleBack}>
                        <Text style={{ color: '#fff', fontSize: 18, marginRight: 16 }}>{'< Back'}</Text>
                    </TouchableOpacity>
                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Sequence Settings</Text>
                </View> */}
                {/* <Button title="Click me" mode="outlined" onPress={handleButtonClick}>Add Sequence Setting</Button> */}
                <FlatList
                    data={formDataList}
                    renderItem={({ item }) => <CardItemSequenceList item={item}
                        onPress={handleCardItemPress}
                        onDelete={() => handleDelete(item.Id)} />}
                    keyExtractor={item => item.Id}
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
    }, title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
        color: 'green'

    }, controllerName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: 'green'
    },

});
export default SequenceSettingsListScreen;