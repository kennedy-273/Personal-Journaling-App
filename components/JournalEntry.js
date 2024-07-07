import React, { useContext, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Alert,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Icon, Button } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { JournalContext } from "../context/JournalContext";

const JournalEntry = ({ navigation }) => {
  const [previewModal, setPreviewModal] = useState(false);
  const [newEntryData, setNewEntryData] = useState([]);
  const [newEntryTitle, setNewEntryTitle] = useState("");
  const [newEntryCategory, setNewEntryCategory] = useState("");
  const [newEntryBody, setNewEntryBody] = useState("");

  const { fetchJournals } = useContext(JournalContext);

  async function handleSubmitEntry() {
    const entry = {
      title: newEntryTitle,
      category: newEntryCategory,
      body: newEntryBody,
    };

    let allEntries = newEntryData.concat(entry);
    setNewEntryData(allEntries);

    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        "https://journal-backend-x445.onrender.com/journals",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(entry),
        }
      );

      if (response.status !== 201) {
        Alert.alert("Failed to save entry to backend");
      } else {
        const savedEntry = await response.json();
        setNewEntryData([...newEntryData, savedEntry]);
        fetchJournals();
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to save entry to backend");
    }
    navigation.navigate("Home", { allEntries });

    setNewEntryTitle("");
    setNewEntryCategory("");
    setNewEntryBody("");
    setPreviewModal(false);
    // Alert.alert("Journal entry submitted");
  }

  return (
    <ScrollView style={styles.container}>
      <View style={{ flexDirection: "column" }}>
        <Text style={styles.label}>Title:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(title) => setNewEntryTitle(title)}
          value={newEntryTitle}
          placeholder="Your Title"
          autoCapitalize="words"
          placeholderTextColor={colors.placeholder}
        />

        <Text style={styles.label}>Category:</Text>
        <Picker
          selectedValue={newEntryCategory}
          style={styles.picker}
          onValueChange={(itemValue) => setNewEntryCategory(itemValue)}
        >
          <Picker.Item label="Select Category..." value="" />
          <Picker.Item label="Work" value="Work" />
          <Picker.Item label="Personal" value="Personal" />
          <Picker.Item label="Travel" value="Travel" />
        </Picker>
      </View>

      <View style={{ margin: 10 }}>
        <TextInput
          style={styles.textarea}
          onChangeText={(text) => setNewEntryBody(text)}
          value={newEntryBody}
          multiline
          numberOfLines={10}
          placeholder="Add your journal entry here!"
          placeholderTextColor={colors.placeholder}
        />
      </View>

      <Button
        title="Log Entry"
        buttonStyle={styles.logButton}
        titleStyle={styles.logButtonText}
        containerStyle={styles.logButtonContainer}
        onPress={() => setPreviewModal(true)}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={previewModal}
        onRequestClose={() => setPreviewModal(!previewModal)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={() => setPreviewModal(!previewModal)}>
              <Icon name="close" size={30} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Submit Your Journal Entry:</Text>
            <View style={styles.modalButtonRow}>
              <Button
                title="Submit"
                buttonStyle={styles.submitButton}
                containerStyle={styles.submitButtonContainer}
                onPress={handleSubmitEntry}
              />
              <Button
                title="Cancel"
                buttonStyle={styles.cancelButton}
                containerStyle={styles.cancelButtonContainer}
                onPress={() => setPreviewModal(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const colors = {
  background: "#F5F5F5",
  text: "#333333",
  primary: "#AD40AF",
  secondary: "#03DAC6",
  inputBackground: "#FFFFFF",
  placeholder: "#999999",
  cancel: "red",
};

const fonts = {
  regular: "System",
  bold: "System",
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.background,
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
  textarea: {
    backgroundColor: colors.inputBackground,
    padding: 10,
    color: colors.text,
    fontFamily: fonts.regular,
    fontSize: 16,
    borderRadius: 5,
  },
  logButton: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    paddingVertical: 10,
  },
  logButtonText: {
    fontSize: 18,
    fontFamily: fonts.bold,
  },
  logButtonContainer: {
    marginVertical: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: colors.inputBackground,
    borderRadius: 5,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontFamily: fonts.bold,
    color: colors.text,
    fontSize: 20,
    marginBottom: 10,
  },
  modalButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  submitButton: {
    backgroundColor: colors.secondary,
    borderRadius: 5,
  },
  submitButtonContainer: {
    flex: 1,
    marginRight: 5,
  },
  cancelButton: {
    backgroundColor: colors.cancel,
    borderRadius: 5,
  },
  cancelButtonContainer: {
    flex: 1,
    marginLeft: 5,
  },
});

export default JournalEntry;
