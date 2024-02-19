import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, TouchableOpacity, SafeAreaView, Alert, ScrollView, FlatList } from 'react-native'
import { AxiosContext } from '../context/AxiosContext';
import { ActivityIndicator, Text } from "react-native-paper";
import Button from '../components/Button'
import { useNavigation } from '@react-navigation/native';
import CardItem from './CardItem';
import { FAB } from 'react-native-paper';

const ValveSettingsListScreen = ({ route }) => {
    const navigation = useNavigation();
    const { authAxios } = useContext(AxiosContext);
    const { selectedControllerId, selectedControllerName } = route.params;
    const [formDataList, setFormDataList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);
        // Define a function to fetch data from the API
        const fetchData = async () => {
            try {
                const response = await authAxios.get('ValveSetting/ValveSettingByControllerId/' + selectedControllerId);
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
        // getIMEI();
        fetchData();
    }, []);

    const handleBack = () => {
        navigation.navigate('Dashboard')
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <ScrollView>
                <View style={{ flexDirection: 'row', justifyContent: '', backgroundColor: '#3498db', padding: 16 }}>
                    <TouchableOpacity onPress={handleBack}>
                        <Text style={{ color: '#fff', fontSize: 18 }}>{'< Back'}</Text>
                    </TouchableOpacity>
                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Valve Settings</Text>
                </View>
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
export default ValveSettingsListScreen;