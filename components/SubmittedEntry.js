import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Pressable, Image, StyleSheet, Alert, TextInput, Button } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SubmittedEntry = ({ route }) => {
  if (!route.params || !route.params.allEntries) {
    return (
      <View style={styles.noEntriesContainer}>
        <Text style={styles.noEntriesText}>You haven't created any entries yet.</Text>
        <Text style={styles.createEntryText}>To create an entry, go to the + New Entry tab.</Text>
      </View>
    );
  }

  const { allEntries } = route.params;
  const [savedEntries, setSavedEntries] = useState(allEntries || []);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(null);

  useEffect(() => {
    setSavedEntries(allEntries);
  }, [allEntries]);

  const handleChange = (key, value) => {
    setCurrentEntry({ ...currentEntry, [key]: value });
  };

  const handleDelete = async (entryId) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('Token not found');
        return;
      }

      const response = await fetch(`https://journal-backend-x445.onrender.com/journal/${entryId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete entry');
      } else {
        setSavedEntries(savedEntries.filter(entry => entry.id !== entryId));
        Alert.alert('Journal Entry deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting entry:', error);
      Alert.alert('Error', 'Failed to delete entry, give it another try.');
    }
  };

  const handleUpdate = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('Token not found');
        return;
      }

      const response = await fetch(`https://journal-backend-x445.onrender.com/journal/${currentEntry.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(currentEntry),
      });

      if (!response.ok) {
        throw new Error('Update failed');
      } else {
        const updatedEntry = await response.json();
        setSavedEntries(savedEntries.map(entry => entry.id === updatedEntry.id ? updatedEntry : entry));
        setIsEditing(false);
        setCurrentEntry(null);
        Alert.alert('Success', 'Entry updated successfully');
      }
    } catch (error) {
      console.error('Error updating entry:', error);
      Alert.alert('Error', 'Failed to update entry');
    }
  };

  const handleEdit = (entry) => {
    setIsEditing(true);
    setCurrentEntry({ ...entry });
  };

  const sortedEntries = savedEntries.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const submittedEntries = sortedEntries.map(entry => (
    <View key={entry.id} style={styles.entryContainer}>
      <Pressable
        onLongPress={() =>
          Alert.alert(
            'Delete',
            'Do you want to delete this entry?',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => handleDelete(entry.id),
              },
            ],
            {
              cancelable: true,
            }
          )
        }
      >
        <Card>
          <Card.Title style={styles.title}>{entry.title}</Card.Title>
          <View style={styles.header}>
            <Text style={styles.date}>{entry.created_at}</Text>
            <Icon size={35} name={entry.mood?.name} color={entry.mood?.color} />
          </View>
          <Card.Divider />
          <Text style={styles.text}>{entry.body}</Text>
          {entry.images &&
            entry.images.map(image => (
              <Image
                key={image}
                source={{ uri: image }}
                style={styles.image}
                resizeMode="cover"
              />
            ))}
          <View style={styles.buttonContainer}>
            <Button title="Edit" onPress={() => handleEdit(entry)} />
            <Button title="Delete" onPress={() => handleDelete(entry.id)} color="red" />
          </View>
        </Card>
      </Pressable>
    </View>
  ));

  return (
    <ScrollView>
      {isEditing && currentEntry ? (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.input}
            value={currentEntry.title}
            onChangeText={(text) => handleChange('title', text)}
            placeholder="Title"
          />
          <TextInput
            style={styles.input}
            value={currentEntry.body}
            onChangeText={(text) => handleChange('body', text)}
            placeholder="Body"
            multiline
          />
          <TextInput
            style={styles.input}
            value={currentEntry.category}
            onChangeText={(text) => handleChange('category', text)}
            placeholder="Category"
          />
          <Button title="Save" onPress={handleUpdate} />
          <Button title="Cancel" onPress={() => { setIsEditing(false); setCurrentEntry(null); }} />
        </View>
      ) : (
        submittedEntries
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  noEntriesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noEntriesText: {
    fontSize: 18,
    fontWeight: 'bold',
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
    fontWeight: 'bold',
    marginBottom: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 14,
    color: 'gray',
  },
  text: {
    fontSize: 16,
    marginVertical: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editContainer: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
});

export default SubmittedEntry;
