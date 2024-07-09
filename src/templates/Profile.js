import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    firstName: "",
    lastName: "",
    oldPassword: "",
    newPassword: "",
    image: null,
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
        image: user.image,
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
      
      if (editedProfile.image) {
        formData.append("image", {
          uri: editedProfile.image,
          type: "image/jpeg",
          name: "profile.jpg",
        });
      }

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

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedProfile({
      firstName: user.first_name,
      lastName: user.last_name,
      oldPassword: "",
      newPassword: "",
      image: user.image,
    });
  };

  const handleInputChange = (name, value) => {
    setEditedProfile({ ...editedProfile, [name]: value });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setEditedProfile({ ...editedProfile, image: result.assets[0].uri });
    }
  };

  return (
    <View style={styles.container}>
      {user && (
        <>
          <Image source={{ uri: editedProfile.image }} style={styles.profileImage} />
          {editMode ? (
            <View style={styles.editContainer}>
              <TouchableOpacity onPress={pickImage} style={styles.imagePickerButton}>
                <Text style={styles.imagePickerButtonText}>Change Picture</Text>
              </TouchableOpacity>
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
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSaveProfile}
                >
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={handleCancelEdit}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.profileContainer}>
              <Text style={styles.nameText}>
                Welcome {user.first_name} {user.last_name}
              </Text>
              <TouchableOpacity
                style={styles.editButton}
                onPress={handleEditProfile}
              >
                <Text style={styles.editButtonText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
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
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  profileContainer: {
    alignItems: "center",
  },
  editContainer: {
    width: "100%",
    alignItems: "center",
  },
  nameText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    width: "80%",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: "80%",
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#AD40AF', 
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
    marginRight: 10, 
  },
  saveButtonText: {
    color: "#FFFFFF", 
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: '#1DACD6', 
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
  },
  cancelButtonText: {
    color: "#FFFFFF", 
    fontSize: 16,
    fontWeight: "bold",
  },
  editButton: {
    backgroundColor: "#AD40AF", 
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
    width: "80%",
    alignItems: "center",
  },
  editButtonText: {
    color: "pink",
    fontSize: 16,
    fontWeight: "bold",
  },
  imagePickerButton: {
    backgroundColor: "#AD40AF", 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: "center",
  },
  imagePickerButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Profile;
