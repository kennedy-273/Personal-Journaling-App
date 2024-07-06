import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Pressable, Image, StyleSheet, Alert, TextInput, Button } from 'react-native';
import { Card, Icon } from 'react-native-elements';

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

  const handleDelete = async (entryId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5500/journal/${entryId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Delete failed');
      } else {
        setSavedEntries(savedEntries.filter(entry => entry.id !== entryId));
        Alert.alert('Entry deleted successfully');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to delete entry');
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5500/journal/${currentEntry.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
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
        Alert.alert('Entry updated successfully');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update entry');
    }
  };

  const handleEdit = (entry) => {
    setIsEditing(true);
    setCurrentEntry({ ...entry });
  };

  const handleChange = (key, value) => {
    setCurrentEntry({ ...currentEntry, [key]: value });
  };

  const submittedEntries = savedEntries.map(entry => (
    <View key={entry.id}>
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
            <Text style={styles.date}>{entry.date}</Text>
            <Icon size={35} name={entry.mood?.name} color={entry.mood?.color} />
          </View>
          <Card.Divider />
          <Text style={styles.text}>{entry.text}</Text>
          {entry.images &&
            entry.images.map(image => (
              <Image
                key={image}
                source={{ uri: image }}
                style={styles.image}
                resizeMode="cover"
              />
            ))}
          <Button title="Edit" onPress={() => handleEdit(entry)} />
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
            value={currentEntry.text}
            onChangeText={(text) => handleChange('text', text)}
            placeholder="Text"
            multiline
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
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
  editContainer: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
});

export default SubmittedEntry;
