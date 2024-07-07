import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import EditJournal from "./EditJournal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { JournalContext } from "../context/JournalContext";

const Home = ({ navigation, route }) => {
  const [journalEntries, setJournalEntries] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [entryToEdit, setEntryToEdit] = useState(null);



  const handleEdit = async (journal) => {
    setEntryToEdit(journal);
  };

  const updateEntry = (updatedEntry) => {
    setJournalEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.id === updatedEntry.id ? updatedEntry : entry
      )
    );
  };

  const handleDelete = async (journalId) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        `https://journal-backend-x445.onrender.com/journal/${journalId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200) {
        Alert.alert("Error", "Failed to delete the journal entry");
      } else {
        Alert.alert("Success", "Journal entry deleted successfully");
        // Remove the deleted journal from state
        setJournalEntries((prevEntries) =>
          prevEntries.filter((entry) => entry.id !== journalId)
        );
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to delete the journal entry");
    }
  };

  const handleOnCancel = () => {
    setEntryToEdit(null);
  };

  const { loading, journals } = useContext(JournalContext);

  useEffect(() => {
    setJournalEntries(journals);
  }, [journals]);

  if (entryToEdit?.id) {
    return (
      <EditJournal
        entry={entryToEdit}
        handleOnCancel={handleOnCancel}
        updateEntry={updateEntry}
      />
    );
  }

  return (
    <View style={styles.container}>
      {journalEntries.length > 0 ? (
        <FlatList
          data={journalEntries}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => handleEdit(item)}
            >
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardBody}>{item.body}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => handleEdit(item)}
                >
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(item.id)}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={
            loading && <ActivityIndicator size="large" color="#3E4985" />
          }
        />
      ) : (
        <Text style={styles.noEntriesText}>No journal entries available.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  card: {
    width: "100%",
    marginBottom: 16,
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
  },
  cardBody: {
    marginTop: 8,
    fontSize: 16,
    color: "#666666",
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  editButton: {
    backgroundColor: "#AD40AF",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginLeft: 10,
  },
  deleteButton: {
    backgroundColor: "#E74C3C",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginLeft: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  noEntriesText: {
    marginTop: 20,
    color: "#3E4985",
    fontSize: 20,
    textAlign: "center",
  },
});

export default Home;
