// CardItem.js
import React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CardItemSequenceList = ({ item, onPress }) => {
    return (
        <TouchableOpacity onPress={() => onPress(item)} style={styles.container}>
             <View style={styles.card}>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.boldLabel}>Sequence No: <Text style={styles.gridItemText}>{item.SequenceNo}</Text></Text>
                        <Text style={styles.boldLabel}>TimeSlot1: <Text style={styles.gridItemText}>{item.TimeSlot1Hh}:{item.TimeSlot1Min}</Text></Text>
                        <Text style={styles.boldLabel}>TimeSlot3: <Text style={styles.gridItemText}>{item.TimeSlot3Hh}:{item.TimeSlot3Min}</Text></Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.boldLabel}>Pump No: <Text style={styles.gridItemText}>{item.PumbNo}</Text></Text>
                        <Text style={styles.boldLabel}>TimeSlot2: <Text style={styles.gridItemText}>{item.TimeSlot2Hh}:{item.TimeSlot2Min}</Text></Text>
                        <Text style={styles.boldLabel}>TimeSlot4: <Text style={styles.gridItemText}>{item.TimeSlot4Hh}:{item.TimeSlot4Min}</Text></Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <Text style={styles.boldLabel}>Weekdays: <Text style={styles.gridItemText}>{item.WeekdaysString}</Text></Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    card: {
        backgroundColor: '#F4FFF0', // Green color gradient
        borderRadius: 8,
        padding: 16,
        margin: 8,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 4,
    },
    column: {
        flex: 1,
        paddingHorizontal: 5,
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 1,
    },
});

export default CardItemSequenceList;