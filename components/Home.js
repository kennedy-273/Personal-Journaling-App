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
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [entryToEdit, setEntryToEdit] = useState(null);
  const [filter, setFilter] = useState('All'); 

  const handleEdit = (journal) => {
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
    setJournalEntries(journals || []);
  }, [journals]);

  useEffect(() => {
    applyFilter(filter);
  }, [journalEntries, filter]);

  const applyFilter = (filter) => {
    const now = new Date();
    let filtered = journalEntries;

    switch (filter) {
      case 'Today':
        filtered = filtered.filter((entry) => {
          const entryDate = new Date(entry.date); 
          return entryDate.toDateString() === now.toDateString();
        });
        break;
      case 'Week':
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        const endOfWeek = new Date(now.setDate(startOfWeek.getDate() + 6));
        filtered = filtered.filter((entry) => {
          const entryDate = new Date(entry.date); 
          return entryDate >= startOfWeek && entryDate <= endOfWeek;
        });
        break;
      case 'Month':
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        filtered = filtered.filter((entry) => {
          const entryDate = new Date(entry.date); 
          return entryDate >= startOfMonth && entryDate <= endOfMonth;
        });
        break;
      default:
        break;
    }

    setFilteredEntries(filtered);
  };

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
      <View style={styles.filterContainer}>
        {['All', 'Today', 'Week', 'Month'].map((category) => (
          <TouchableOpacity
            key={category}
            style={[styles.filterButton, filter === category && styles.activeFilter]}
            onPress={() => setFilter(category)}
          >
            <Text style={styles.filterText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {filteredEntries.length > 0 ? (
        <FlatList
          data={filteredEntries}
          renderItem={({ item }) => (
            <View style={styles.card}>
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
            </View>
          )}
          keyExtractor={(item) => item.id.toString()} 
          ListFooterComponent={
            loading && <ActivityIndicator size="large" color={colors.primary} />
          }
        />
      ) : (
        <Text style={styles.noEntriesText}>No journal entries available.</Text>
      )}
    </View>
  );
};

const colors = {
  background: "#F5F5F5",
  cardBackground: "#FFFFFF",
  cardShadow: "#000000",
  cardTitle: "#333333",
  cardBody: "#666666",
  buttonText: "#FFFFFF",
  editButton: "#AD40AF",
  deleteButton: "#E74C3C",
  noEntriesText: "#3E4985",
  primary: "#AD40AF",
  filterButton: "#D3D3D3", 
  activeFilter: "#AD40AF", 
  filterText: "#333333",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 5,
  },
  filterButton: {
    flex: 1, 
    backgroundColor: colors.filterButton,
    borderRadius: 8,
    paddingVertical: 10,
    marginHorizontal: 5, 
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  activeFilter: {
    backgroundColor: colors.activeFilter,
  },
  filterText: {
    color: colors.filterText,
    fontWeight: 'bold',
    fontSize: 16,
  },
  card: {
    width: "100%",
    marginBottom: 16,
    padding: 16,
    borderRadius: 10,
    backgroundColor: colors.cardBackground,
    shadowColor: colors.cardShadow,
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
    color: colors.cardTitle,
  },
  cardBody: {
    marginTop: 8,
    fontSize: 16,
    color: colors.cardBody,
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  editButton: {
    backgroundColor: colors.editButton,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginLeft: 10,
  },
  deleteButton: {
    backgroundColor: colors.deleteButton,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginLeft: 10,
  },
  buttonText: {
    color: colors.buttonText,
    fontWeight: "bold",
    fontSize: 16,
  },
  noEntriesText: {
    marginTop: 20,
    color: colors.noEntriesText,
    fontSize: 20,
    textAlign: "center",
  },
});

export default Home;
