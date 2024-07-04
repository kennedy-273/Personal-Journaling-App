import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Box } from '../utils/theme'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'




const NavigateBack = () => {

    const navigation = useNavigation()

    const navigationToHome = () => {
        navigation.navigate("Home")
    }

  return (
    <Box 
        bg="white"
        borderRadius="rounded2Xl"
        justifyContent="center"
        alignItems="center"
        width={40}
        height={40}
    
    >
        <Pressable onPress={navigationToHome}>
            <Ionicons name="arrow-back" size={24} color="black"/>
        </Pressable>

    </Box>
  )
}

export default NavigateBack

const styles = StyleSheet.create({})