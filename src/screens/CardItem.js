// CardItem.js
import React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';

const CardItem = ({ item, onPress }) => {
  return (
  <TouchableOpacity onPress={() => onPress(item)} style={styles.container}>
  <View style={styles.card}>
     <View style={styles.row}>
         <View style={styles.column}>
             <Text style={styles.boldLabel}>Main Valve No: <Text style={styles.gridItemText}>{item.MainValveNo}</Text></Text>
             <Text style={styles.boldLabel}>Duration: <Text style={styles.gridItemText}>{item.DurationHh}:{item.DurationMm}:{item.DurationSs}</Text></Text>
             <Text style={styles.boldLabel}>Crop Type: <Text style={styles.gridItemText}>{item.CropType}</Text></Text>
             <Text style={styles.boldLabel}>Valve Area: <Text style={styles.gridItemText}>{item.ValveArea}</Text></Text>

         </View>
         <View style={styles.column}>
             <Text style={styles.boldLabel}>Tag Name: <Text style={styles.gridItemText}>{item.TagName}</Text></Text>
             <Text style={styles.boldLabel}>Pump No: <Text style={styles.gridItemText}>{item.PumpNo}</Text></Text>
             <Text style={styles.boldLabel}>Crop Name: <Text style={styles.gridItemText}>{item.CropName}</Text></Text>
             
         </View>
     </View>
  
 </View>
</TouchableOpacity>
   
  );
};

export default CardItem;
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
