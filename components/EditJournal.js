import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  Pressable,
  Image,
  StyleSheet,
  Alert,
  TextInput,
  Button,
} from "react-native";
import { Card, Icon } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditJournal = ({ entry, handleOnCancel, updateEntry}) => {
  if (!entry) {
    return (
      <View style={styles.noEntriesContainer}>
        <Text style={styles.noEntriesText}>Journal etry not found</Text>
        <Text style={styles.createEntryText}>
          To create an entry, go to the + New Entry tab.
        </Text>
        <Button title="Cancel" onPress={handleOnCancel} />
      </View>
    );
  }

  const [currentEntry, setCurrentEntry] = useState(entry);

  const handleChange = (key, value) => {
    setCurrentEntry({ ...currentEntry, [key]: value });
  };

  const handleUpdate = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.error("Token not found");
        return;
      }
      const response = await fetch(
        `https://journal-backend-x445.onrender.com/journal/${currentEntry.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(currentEntry),
        }
      );

      if (!response.ok) {
        throw new Error("Update failed");
      } else {
        Alert.alert("Success", "Entry updated successfully");
        updateEntry(currentEntry);
        handleOnCancel();
      }
    } catch (error) {
      console.error("Error updating entry:", error);
      Alert.alert("Error", "Failed to update entry");
    }
  };

  return (
    <ScrollView>
      <View style={styles.editContainer}>
        <TextInput
          style={styles.input}
          value={currentEntry?.title}
          onChangeText={(text) => handleChange("title", text)}
          placeholder="Title"
        />
        <TextInput
          style={styles.input}
          value={currentEntry.body}
          onChangeText={(text) => handleChange("body", text)}
          placeholder="Body"
          multiline
        />
        <TextInput
          style={styles.input}
          value={currentEntry.category}
          onChangeText={(text) => handleChange("category", text)}
          placeholder="Category"
        />
        <Button title="Update" onPress={handleUpdate} />
        <Button title="Cancel" onPress={handleOnCancel} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  noEntriesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noEntriesText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  createEntryText: {
    fontSize: 16,
    marginTop: 10,
  },
  entryContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: {
    fontSize: 14,
    color: "gray",
  },
  text: {
    fontSize: 16,
    marginVertical: 10,
  },
  image: {
    width: "100%",
    height: 200,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editContainer: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
});

export default EditJournal;

/**
 * Use navigatest to Home, they see all journals with Edit and delete buttons
 * Use clicks on edit, they see a form with the journal details in the new page which expects the journal that needs editing
 * User submits edit, on success, navigate back to home
 */
