import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const [user, setUser] = useState();
  const [editMode, setEditMode] = useState(false);
  const [editedFirstName, setEditedFirstName] = useState("");
  const [editedLastName, setEditedLastName] = useState("");
  const [editedPassword, setEditedPassword] = useState("");

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (user) {
      setEditedFirstName(user.first_name);
      setEditedLastName(user.last_name);
      setEditedPassword(user.password);
    }
  }, [user]);

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
    setEditMode(!editMode);
  };

  const handleSaveProfile = async () => {
    const token = await AsyncStorage.getItem("token");
    fetch('https://journal-backend-x445.onrender.com/user', {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        first_name: editedFirstName,
        last_name: editedLastName,
        password: user.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setEditMode(false);
      })
      .catch((error) => console.error("Error saving profile:", error));
  };

  return (
    <View style={styles.container}>
      {user && (
        <>
          <Image source={{ uri: user.image }} style={styles.profileImage} />
          {editMode ? (
            <>
              <TextInput
                value={editedFirstName}
                onChangeText={setEditedFirstName}
                style={styles.input}
              />
              <TextInput
                value={editedLastName}
                onChangeText={setEditedLastName}
                style={styles.input}
              />

              <TextInput
                value={user.password}
                onChangeText={setEditedPassword}
                style={styles.input}
              />
              
              <Button title="Save" onPress={handleSaveProfile} />
            </>
          ) : (
            <>
              <Text style={styles.nameText}>Welcome {user.first_name} {user.last_name}</Text>
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
  },
  nameText: {
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    width: '80%',
    padding: 10,
    marginVertical: 5,
  },
});

export default Profile;