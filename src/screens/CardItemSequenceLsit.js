// CardItem.js
import React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CardItemSequenceList= ({ item, onPress }) => {
    return (
        <TouchableOpacity onPress={() => onPress(item)} style={styles.card}>
            <Text style={styles.gridItemText}>Sequence No: {item.sequenceNo}</Text>
            <Text style={styles.gridItemText}>Pump No: {item.PumpNo}</Text>
        </TouchableOpacity>
    );
};

export default CardItemSequenceList;
const styles = StyleSheet.create({
    card: {
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
    },
});
