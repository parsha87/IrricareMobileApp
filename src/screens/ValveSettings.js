import { View,TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import Button from '../components/Button'


const ValveSettingsScreen = ({ navigation }) => {
    const handleBack = () => {
        navigation.goBack();
    };

    return (

        <View>
            <View style={{ flexDirection: 'row', backgroundColor: '#3498db', padding: 16 }}>
                  <TouchableOpacity onPress={handleBack}>
                    <Text style={{ color: '#fff', fontSize: 18, marginRight: 16 }}>{'< Back'}</Text>
                    </TouchableOpacity>
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>ValveSettingsScreen</Text>
            </View>

        
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
export default ValveSettingsScreen;