import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Alert,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditJournal = ({ entry, handleOnCancel, updateEntry }) => {
  if (!entry) {
    return (
      <View style={styles.noEntriesContainer}>
        <Text style={styles.noEntriesText}>Journal entry not found</Text>
        <Text style={styles.createEntryText}>
          To create an entry, go to the + New Entry tab.
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleOnCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
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
    <ScrollView contentContainerStyle={styles.scrollContainer}>
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
          placeholder="Body"
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={handleOnCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const colors = {
  background: "#F5F5F5",
  inputBorder: "#CCCCCC",
  primaryButton: "#AD40AF", // Same color as "Add Journal" button
  secondaryButton: "#E74C3C", // Different color for Cancel button
  buttonText: "#FFFFFF",
  text: "#333333",
};

const fonts = {
  regular: "System",
  bold: "System",
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: colors.background,
  },
  noEntriesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  noEntriesText: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.text,
  },
  createEntryText: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.text,
    marginTop: 10,
    textAlign: "center",
  },
  editContainer: {
    padding: 20,
    backgroundColor: colors.background,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    fontFamily: fonts.regular,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  primaryButton: {
    backgroundColor: colors.primaryButton,
    borderRadius: 9,
    paddingHorizontal: 46,
    paddingVertical: 12,
    marginHorizontal: 8,
  },
  secondaryButton: {
    backgroundColor: colors.secondaryButton,
    borderRadius: 9,
    paddingHorizontal: 46,
    paddingVertical: 12,
    marginHorizontal: 8,
  },
  buttonText: {
    color: colors.buttonText,
    fontFamily: fonts.bold,
    fontSize: 16,
    textAlign: "center",
  },
});

export default EditJournal;


/**
 * Use navigatest to Home, they see all journals with Edit and delete buttons
 * Use clicks on edit, they see a form with the journal details in the new page which expects the journal that needs editing
 * User submits edit, on success, navigate back to home
 */
