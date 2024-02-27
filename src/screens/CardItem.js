import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

const CardItem = ({ item, onPress }) => {
    const duration = `${item.DurationHh}:${item.DurationMm}:${item.DurationSs}`;
    const tagNameWithDuration = `TagName: ${item.TagName}`;
    return (
        <TouchableOpacity onPress={() => onPress(item)} style={styles.container}>
            <View style={styles.card}>
                <View style={styles.tagContainer}>
                    <View style={styles.tagBox}>
                        <View style={styles.tagColumn}>
                            <Text style={[styles.tagText, styles.boldText]}>TagName:</Text>
                            <Text style={styles.tagText}>{item.TagName}</Text>
                        </View>
                        <View style={styles.tagColumn}>
                        <Icon style={{ marginTop: 3, padding: 1 }} name="clock" size={25} color="#007500"></Icon>
                            <Text style={styles.durationText}>{duration}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.circle}>
                        <Text style={styles.circleText}>{item.MainValveNo}</Text>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.boldLabel}>Crop Type:</Text>
                        <Text style={styles.gridItemText}>{item.CropType}</Text>
                        <Text style={styles.boldLabel}>Valve Area:</Text>
                        <Text style={styles.gridItemText}>{item.ValveArea}</Text>
                        <Text style={styles.boldLabel}>Pump No:</Text>
                        <Text style={styles.gridItemText}>{item.PumpNo}</Text>
                        <Text style={styles.boldLabel}>Crop Name:</Text>
                        <Text style={styles.gridItemText}>{item.CropName}</Text>
                    </View>
                </View>

            </View>
        </TouchableOpacity>
    );
};

export default CardItem;

const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 7,
        margin: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 1,
        elevation: 0.5,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    circle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    circleText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    detailsContainer: {
        flex: 1,
        marginRight: 10,
    },
    boldLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    gridItemText: {
        fontSize: 16,
        marginBottom: 5,
    },
    tagContainer: {
        alignItems: 'flex-end',
        marginTop: 10,
    },
    tagBox: {
        flexDirection: 'row',
        backgroundColor: '#F0F0F0',
        borderRadius: 5,
    },
    tagColumn: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    tagText: {
        fontSize: 16,
        marginLeft: 5,
        paddingLeft: 6
    },
    boldText: {
        fontWeight: 'bold',
    },
    durationText: { marginLeft: 6, paddingLeft: 5, fontSize: 16,}
});
