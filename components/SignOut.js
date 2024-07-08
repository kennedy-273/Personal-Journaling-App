import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const SignOut = () => {
  const navigation = useNavigation();

  const handleSignOut = async () => {
    try {
      // Clear the authentication token from AsyncStorage
      await AsyncStorage.removeItem('authToken');
      console.log('Token removed from AsyncStorage');

      // Navigate to the Login screen
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
      <Text style={styles.signOutText}>Logout</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  signOutButton: {
    backgroundColor: '#FF449F', // Customize the color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 10,
  },
  signOutText: {
    color: '#FFF', // Customize the text color
    fontFamily: 'Anton_400Regular',
    fontSize: 16,
    textTransform: 'uppercase',
  },
});

export default SignOut;
