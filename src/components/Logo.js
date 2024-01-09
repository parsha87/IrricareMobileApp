import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo() {
  return <Image source={require('../assets/JainLogo.png')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 54,
    height: 50,
    marginBottom: 2,
    
  },
})
