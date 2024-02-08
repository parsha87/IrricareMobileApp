// CardItem.js
import React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';

const CardItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(item)} style={styles.card}>
      <Text style={styles.gridItemText}>Main Valve No: {item.MainValveNo}</Text>
      <Text style={styles.gridItemText}>Tag Name: {item.TagName}</Text>
      <Text style={styles.gridItemText}>Duration: {item.DurationHh}:{item.DurationMm}:{item.DurationSs}</Text>
      <Text style={styles.gridItemText}>Pump No: {item.PumpNo}</Text>
      <Text style={styles.gridItemText}>Crop Name: {item.CropName}</Text>
      <Text style={styles.gridItemText}>Crop Type: {item.CropType}</Text>
      <Text style={styles.gridItemText}>Valve Area: {item.ValveArea}</Text>
    </TouchableOpacity>
  );
};

export default CardItem;
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
