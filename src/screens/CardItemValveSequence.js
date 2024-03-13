import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper'; // Import IconButton from react-native-paper

const CardItemValveSequenceList = ({ item, onPress, onDelete }) => {
    return (
        <TouchableOpacity onPress={() => onPress(item)} style={styles.container}>
             <View style={styles.card}>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.label}>Sequence No:</Text>
                        <Text style={styles.value}>{item.SequenceNo}</Text>
                        <Text style={styles.label}>Start Time:</Text>
                        <Text style={styles.value}>{item.TimeSlot1Hh}:{item.TimeSlot1Min}</Text>
                        <Text style={styles.label}>Interval:</Text>
                        <Text style={styles.value}>{item.TimeSlot3Hh}:{item.TimeSlot3Min}</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>Pump No:</Text>
                        <Text style={styles.value}>{item.PumbNo}</Text>
                        <Text style={styles.label}>End Time:</Text>
                        <Text style={styles.value}>{item.TimeSlot2Hh}:{item.TimeSlot2Min}</Text>
                        
                    </View>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Weekdays:</Text>
                    <Text style={styles.value}>{item.WeekdaysString}</Text>
                </View>
                <View style={styles.deleteButtonContainer}>
                    <IconButton
                        icon="delete"
                        color="#FFOOOO"
                        size={30}
                        onPress={() => onDelete(item.id)} // Pass the id or any identifier of the item to onDelete
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 4,
    },
    column: {
        flex: 1,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#333333',
    },
    value: {
        fontSize: 14,
        marginBottom: 8,
        color: '#666666',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    deleteButtonContainer: {
        alignItems: 'flex-end', // Align the delete button to the right
    },
});

export default CardItemValveSequenceList;
