import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    firstName: "",
    lastName: "",
    oldPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (user) {
      setEditedProfile({
        firstName: user.first_name,
        lastName: user.last_name,
        oldPassword: "",
        newPassword: "",
      });
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch("https://journal-backend-x445.onrender.com/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUser(data);
      setEditMode(false);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleEditProfile = () => setEditMode(true);

  const handleSaveProfile = async () => {
    if (editedProfile.oldPassword === "" || editedProfile.newPassword === "") {
      Alert.alert("Please enter your old and new passwords.");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");
      const formData = new FormData();
      formData.append("first_name", editedProfile.firstName);
      formData.append("last_name", editedProfile.lastName);
      formData.append("old_password", editedProfile.oldPassword);
      formData.append("new_password", editedProfile.newPassword);

      const response = await fetch("https://journal-backend-x445.onrender.com/user", {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      setUser(data);
      setEditMode(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const handleInputChange = (name, value) => {
    setEditedProfile({ ...editedProfile, [name]: value });
  };

  return (
    <View style={styles.container}>
      {user && (
        <>
          <Image source={{ uri: user.image }} style={styles.profileImage} />
          {editMode ? (
            <>
              <TextInput
                value={editedProfile.firstName}
                onChangeText={(value) => handleInputChange("firstName", value)}
                style={styles.input}
                placeholder="First Name"
              />
              <TextInput
                value={editedProfile.lastName}
                onChangeText={(value) => handleInputChange("lastName", value)}
                style={styles.input}
                placeholder="Last Name"
              />
              <TextInput
                value={editedProfile.oldPassword}
                onChangeText={(value) => handleInputChange("oldPassword", value)}
                style={styles.input}
                placeholder="Old Password"
                secureTextEntry
              />
              <TextInput
                value={editedProfile.newPassword}
                onChangeText={(value) => handleInputChange("newPassword", value)}
                style={styles.input}
                placeholder="New Password"
                secureTextEntry
              />
              <Button title="Save" onPress={handleSaveProfile} />
            </>
          ) : (
            <>
              <Text style={styles.nameText}>
                Welcome {user.first_name} {user.last_name}
              </Text>
              <Button title="Edit Profile" onPress={handleEditProfile} />
            </>
          )}
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
    marginBottom: 16,
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
  input: {
    borderWidth: 1,
    borderColor: "gray",
    width: "80%",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
});

export default Profile;
