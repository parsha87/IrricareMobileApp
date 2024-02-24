// CardItem.js
import React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';

const CardItemFilterList = ({ item, onPress }) => {
  return (
  <TouchableOpacity onPress={() => onPress(item)} style={styles.container}>
  <View style={styles.card}>
     <View style={styles.row}>
         <View style={styles.column}>
             <Text style={styles.boldLabel}>Max Filter Valve: <Text style={styles.gridItemText}>{item.MaxFilterValve}</Text></Text>
             <Text style={styles.boldLabel}>Flush Time: <Text style={styles.gridItemText}>{item.FlushTimeMin}:{item.FlushTimeSec}</Text></Text>
         </View>
         <View style={styles.column}>
             <Text style={styles.boldLabel}>Pump No: <Text style={styles.gridItemText}>{item.PumpNo}</Text></Text>
             <Text style={styles.boldLabel}>Interval: <Text style={styles.gridItemText}>{item.IntervalHh}:{item.IntervalMin}:{item.IntervalSec}</Text></Text>
         </View>
     </View>
  
 </View>
</TouchableOpacity>
   
  );
};

export default CardItemFilterList;
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
