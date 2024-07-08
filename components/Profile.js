import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    const token = await AsyncStorage.getItem("token");

    fetch('https://journal-backend-x445.onrender.com/user', {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => console.error("Error fetching profile:", error));
  };

  const handleEditProfile = () => {
    // Navigate to edit profile screen or trigger an edit function
    Alert.alert("Edit Profile", "Edit profile functionality goes here.");
  };

  return (
    <View style={styles.container}>
      {user && (
        <>
          <Image source={{ uri: user.image }} style={styles.profileImage} />
          <Text style={styles.nameText}>Welcome {user.first_name} {user.last_name}</Text>
          <Button title="Edit Profile" onPress={handleEditProfile} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  nameText: {
    marginVertical: 8,
  },
});

export default Profile;