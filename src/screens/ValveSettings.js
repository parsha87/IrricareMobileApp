import { View } from "react-native";
import { Text } from "react-native-paper";
import Button from '../components/Button'


const ValveSettingsScreen = ({ navigation }) => {
    return (
        <View>
            <Text>ValveSettingsScreen</Text>
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