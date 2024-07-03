import { Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Text } from "../../utils/theme"
import useGlobalStore from '../../store'
const Home = () => {

  const navigation=useNavigation()
  const {tasks, categories} = useGlobalStore()


  return (
    <View>
      <Text variant='text2Xl'>Home</Text>
      <Pressable onPress={ () =>
        navigation.navigate('CreateCategory')
      
      }>
        <Text variant='text2Xl' color='green500'> Navigate to categrory.</Text>
      </Pressable>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})