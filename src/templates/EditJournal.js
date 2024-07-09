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
import { Picker } from "@react-native-picker/picker";
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
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Title:</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="words"
          value={currentEntry?.title}
          onChangeText={(text) => handleChange("title", text)}
        />

        <Text style={styles.label}>Category:</Text>
        <Picker
          selectedValue={currentEntry.category}
          onValueChange={(itemValue, itemIndex) =>
            handleChange("category", itemValue)
          }
          style={styles.picker}
        >
          <Picker.Item label="Select Category..." value="" />
          <Picker.Item label="Work" value="Work" />
          <Picker.Item label="Personal" value="Personal" />
          <Picker.Item label="Travel" value="Travel" />
        </Picker>
      </View>

      <Text style={styles.label}>Journal:</Text>
      <View style={styles.bodyContainer}>
        <TextInput
          style={styles.textarea}
          multiline
          numberOfLines={10}
          placeholderTextColor={colors.placeholder}
          value={currentEntry.body}
          onChangeText={(text) => handleChange("body", text)}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleOnCancel}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.editContainer}>
        <Text style={styles.label}>Title:</Text>
        <TextInput
          style={styles.input}
          value={currentEntry?.title}
          autoCapitalize="words"
          onChangeText={(text) => handleChange("title", text)}
        />

        <Text style={styles.label}>Category:</Text>
        <TextInput
          style={styles.input}
          value={currentEntry.body}
          onChangeText={(text) => handleChange("category", text)}
          multiline
        />

        <Text style={styles.label}>Journal:</Text>
        <TextInput
          style={styles.input}
          value={currentEntry.category}
          onChangeText={(text) => handleChange("body", text)}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleOnCancel}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View> */}
    </ScrollView>
  );
};

const colors = {
  background: "#F5F5F5",
  inputBorder: "#CCCCCC",
  primaryButton: "#AD40AF",
  secondaryButton: "#E74C3C",
  primary: "#AD40AF",
  secondary: "#03DAC6",
  inputBackground: "#FFFFFF",
  buttonText: "#FFFFFF",
  text: "#333333",
};

const fonts = {
  regular: "System",
  bold: "System",
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
    backgroundColor: colors.background,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontFamily: fonts.bold,
    color: colors.text,
    marginBottom: 5,
  },
  input: {
    backgroundColor: colors.inputBackground,
    width: "100%",
    height: 46,
    paddingHorizontal: 10,
    color: colors.text,
    fontFamily: fonts.regular,
    fontSize: 16,
    marginBottom: 10,
    borderRadius: 5,
  },
  picker: {
    backgroundColor: colors.inputBackground,
    color: colors.text,
    marginBottom: 10,
    borderRadius: 5,
  },
  bodyContainer: {
    marginBottom: 10,
  },
  textarea: {
    backgroundColor: colors.inputBackground,
    padding: 10,
    color: colors.text,
    fontFamily: fonts.regular,
    fontSize: 16,
    borderRadius: 5,
    textAlignVertical: "top",
    height: 120,
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
