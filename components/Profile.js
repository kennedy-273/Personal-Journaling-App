import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
// import { launchImageLibrary } from 'react-native-image-picker';

const Profile = () => {
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [profileImage, setProfileImage] = useState('https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg');

  const handleImagePicker = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets && response.assets.length > 0) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  const handleSaveProfile = () => {
    // Here, you can handle saving the profile details, e.g., sending them to a backend server.
    console.log('Profile Saved:', { firstName, lastName, email, profileImage });
  };

  return (
    <ScrollView contentContainerStyle={styles.profileContainer}>
      <View style={styles.profileInnerContainer}>
        <TouchableOpacity onPress={handleImagePicker}>
          <Image 
            source={{ uri: profileImage }} 
            style={styles.profileImage} 
          />
        </TouchableOpacity>
        <View style={styles.profileDetailsContainer}>
          <Text style={styles.profileDetailLabel}>First Name:</Text>
          <TextInput 
            style={styles.profileInput} 
            placeholder="First Name" 
            value={firstName} 
            onChangeText={setFirstName} 
          />
          <Text style={styles.profileDetailLabel}>Last Name:</Text>
          <TextInput 
            style={styles.profileInput} 
            placeholder="Last Name" 
            value={lastName} 
            onChangeText={setLastName} 
          />
          <Text style={styles.profileDetailLabel}>Email:</Text>
          <TextInput 
            style={styles.profileInput} 
            placeholder="Email" 
            value={email} 
            onChangeText={setEmail} 
          />
        </View>
        <TouchableOpacity style={styles.profileButton} onPress={handleSaveProfile}>
          <Text style={styles.profileButtonText}>Save Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f8f8f8",
  },
  profileInnerContainer: {
    paddingHorizontal: 25,
    alignItems: "center",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 30,
  },
  profileDetailsContainer: {
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'flex-start',
  },
  profileDetailLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    width: "100%",
    backgroundColor: "#fff",
  },
  profileTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 28,
    fontWeight: "500",
    color: "#333",
    marginBottom: 30,
  },
  profileButton: {
    backgroundColor: "#AD40AF",
    borderRadius: 10,
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  profileButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  profileLoginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  profileLoginText: {
    color: "#AD40AF",
    fontWeight: "700",
  },
});

export default Profile;
