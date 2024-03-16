import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, TouchableOpacity, SafeAreaView, Alert, ScrollView, FlatList } from 'react-native'
import { AxiosContext } from '../context/AxiosContext';
import { ActivityIndicator, Text } from "react-native-paper";
import Button from '../components/Button'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import CardItem from './CardItem';
import { FAB } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome6';
const WaterMeterSettingsListScreen = ({ route }) => {
    const navigation = useNavigation();
    const { authAxios } = useContext(AxiosContext);
    const [formDataList, setFormDataList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // const { selectedControllerId, selectedControllerName } = route.params;
    const [controller, setSelectedController] = useState({
        selectedControllerId: 0,
        selectedControllerName: ''
    })
    const [formData, setFormData] = useState({
        Id: 0,
        MainValveNo: 0,
        TagName: '',
        DurationHh: 0,
        DurationMm: 0,
        DurationSs: 0,
        PumpNo: 0,
        FbTimeHh: 0,
        FbTimeMin: 0,
        FoTimeHh: 0,
        FoTimeMin: 0,
        CoValveSetting: '',
        CoValveNo1: 0,
        CoValveNo2: 0,
        CoValveNo3: 0,
        UserId: '',
        CropName: '',
        CropType: '',
        CropSowingDate: '',
        ValveArea: '',
        UsermobileImeino: '',
        ControllerId: 0,
        ControllerNo: '',
    })
    // const renderItem = ({ item }) => (
    //     <CardItem item={item} onPress={() => handleCardItemPress(item)} />
    // );

    const renderItem = ({ item }) => (
        <CardItem item={item} onPress={handleCardItemPress(item)}> </CardItem>

    );

    const handleCardItemPress = (item) => {
        // Handle card item press, e.g., navigate to a detailed view
        console.log(item)
        navigation.navigate('ValveSettingsScreen', {
            dataModel: item,
            isAddData: false
        })
    };

    const handleButtonClick = () => {
        // Add functionality for button click here
        navigation.navigate('ValveSettingsScreen', {
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
            // Define a function to fetch data from the API
            const fetchData = async (id) => {
                try {
                    const response = await authAxios.get('ValveSetting/ValveSettingByControllerId/' + id);
                    // Update the state with the received data
                    let data = response.data
                    setFormDataList(data)
                    setIsLoading(false);
                    if (data != null) {

                    }
                    else {
                        //Add
                    }

                    //setApiData(data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setIsLoading(false);
                }
            };

            retrieveSelectedController();
        }, [authAxios]) // Make sure to include any dependencies of the effect
    );



    const handleBack = () => {
        navigation.navigate('Dashboard')
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
            <Icon onPress={handleBack} name="chevron-left" size={30} color="green" />
                {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
                    <Text style={{ fontSize: 18, color: 'green', fontWeight: 'bold', textAlign: 'center' }}>Valve setting</Text>
                </View> */}
                   <Text style={styles.title}>Water Meter setting</Text>
                <Text style={styles.controllerName}>Controller No: {controller.selectedControllerName}</Text>
                <FlatList
                    data={formDataList}
                    renderItem={({ item }) => <CardItem item={item} onPress={handleCardItemPress} />}
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

    fabContainer: {
        position: 'absolute',
        bottom: 10,
        right: 10,
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
    title: {
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
export default WaterMeterSettingsListScreen;