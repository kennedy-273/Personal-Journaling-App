import {  StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'


type SafeAreaWrapperProps = {
    children: React.ReactNode
}

const SafeAreaWrapper = ({ children }: SafeAreaWrapperProps) => {
  return (
    <SafeAreaView style={{
        flex: 1,
    }}>
        
        {children}

    </SafeAreaView>
  )
}

export default SafeAreaWrapper

const styles = StyleSheet.create({})