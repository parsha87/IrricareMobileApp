import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Button from '../components/Button'
import { SafeAreaView } from 'react-native-safe-area-context'
import DropDownPicker from 'react-native-dropdown-picker'
import { AxiosContext } from '../context/AxiosContext'
import { AuthContext } from '../context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

const MainpageScreen = ({ navigation }) => {
    const { authAxios } = useContext(AxiosContext);
    const authContext = useContext(AuthContext);
    const items = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
    ];
    const [selectedValue, setSelectedValue] = useState();
    const [selectedController, setSelectedController] = useState();

    const [open, setOpen] = useState(false);
    const [itemsController, setItemsController] = useState([]);


    useEffect(() => {
        fetchMyAPI()
    }, []);



    const fetchMyAPI = async () => {
        try {
            const value = await AsyncStorage.getItem('user');
            let jsonVal = JSON.parse(value);
            const response = await authAxios.get('ControllerUser/' + jsonVal.userId);
            console.log(response.data);
            let items = response.data.map(s => ({ label: s.ControllerNo, value: s.ControllerId }))
            setItemsController(items);
        } catch (error) {
            console.log(error);
        }
    };

    const changeSelectOptionHandler = async (value) => {
        console.log(value)
        setSelectedController(value)
        await AsyncStorage.setItem('selectedController', JSON.stringify(value));

    };
    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View>
                <View style={styles.container}>
                    <View>
                        <Text style={{ marginLeft: 8 }}>Select Controller</Text>

                        <DropDownPicker
                            open={open}
                            value={selectedValue}
                            items={itemsController}
                            setOpen={setOpen}
                            setValue={setSelectedValue}
                            setItems={setItemsController}
                            containerStyle={{ padding: 8 }}
                            style={{ backgroundColor: '#fafafa' }}
                            dropDownContainerStyle={{ marginLeft: 8 }}
                            listItemLabelStyle={{ marginLeft: 10 }}
                            itemStyle={{
                                justifyContent: 'flex-start', marginLeft: 8
                            }}
                            onSelectItem={changeSelectOptionHandler}
                        />


                    </View>
                    <Button
                        mode="outlined"
                        onPress={() =>
                            navigation.navigate('Dashboard')
                        }
                    >
                        Configuration settings
                    </Button>
                </View>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        width: '100%',
    },
});
export default MainpageScreen;