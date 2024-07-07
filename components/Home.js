import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, FlatList, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = ({ navigation }) => {
  const [journalEntries, setJournalEntries] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchJournals();
  }, [page]);

  const fetchJournals = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        `https://journal-backend-x445.onrender.com/journals?page=${page}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200) {
        console.log("Failed to fetch journal entries", response.status);
        Alert.alert("Error", "Failed to fetch journal entries");
      } else {
        const journals = await response.json();
        setJournalEntries((prevEntries) => [...prevEntries, ...journals]);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to fetch journal entries");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <View style={styles.container}>
      {journalEntries.length > 0 ? (
        <FlatList
          data={journalEntries}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardBody}>{item.body}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading && <ActivityIndicator size="large" color="#3E4985" />}
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
  noEntriesText: {
    marginTop: 20,
    color: "#3E4985",
    fontSize: 20,
    textAlign: "center",
  },
});

export default Home;
