import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Pressable, Image, StyleSheet, Alert, TextInput, Button } from 'react-native';
import { Card, Icon } from 'react-native-elements';

const SubmittedEntry = (props) => {
  if (props.route.params === undefined) {
    return (
      <View style={styles.noEntriesContainer}>
        <Text style={styles.noEntriesText}>You haven't created any entries yet.</Text>
        <Text style={styles.createEntryText}>To create an entry, go to the + New Entry tab.</Text>
      </View>
    );
  }

  const { allEntries } = props.route.params;
  const [savedEntries, setSavedEntries] = useState(allEntries || []);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(null);

  useEffect(() => {
    setSavedEntries(allEntries);
  }, [allEntries]);

  const handleDelete = async (entryId) => {
    try {
      const response = await fetch(`https://yourapi.com/entries/${entryId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Delete failed');
      setSavedEntries(savedEntries.filter((entry) => entry.id !== entryId));
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`https://yourapi.com/entries/${currentEntry.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentEntry),
      });

      if (!response.ok) throw new Error('Update failed');
      const updatedEntry = await response.json();
      setSavedEntries(
        savedEntries.map((entry) =>
          entry.id === updatedEntry.id ? updatedEntry : entry
        )
      );
      setIsEditing(false);
      setCurrentEntry(null);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleEdit = (entry) => {
    setIsEditing(true);
    setCurrentEntry({ ...entry });
  };

  const handleChange = (key, value) => {
    setCurrentEntry({ ...currentEntry, [key]: value });
  };

  const submittedEntries = savedEntries?.map((entry) => (
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
        <Card key={entry.id}>
          <Card.Title style={styles.title}>{entry.title}</Card.Title>
          <View style={styles.header}>
            <Text style={styles.date}>{entry?.date}</Text>
            <Icon size={35} name={entry?.mood?.name} color={entry?.mood?.color} />
          </View>
          <Card.Divider />
          <Text style={styles.text}>{entry.text}</Text>
          {entry.images &&
            entry.images.map((image) => (
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
    <ScrollView style={styles.container}>
      {submittedEntries}
      {isEditing && (
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
          <Button title="Cancel" onPress={() => setIsEditing(false)} />
        </View>
      )}
    </ScrollView>
  );
};

const fonts = {
  Anton: 'Anton_400Regular',
  BioRhyme: 'BioRhyme_400Regular',
  SpaceMono: 'SpaceMono_400Regular',
  SpaceItalic: 'SpaceMono_400Regular_Italic',
  BigShoulders: 'BigShouldersDisplay_700Bold',
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#C1F8CF',
  },
  noEntriesContainer: {
    backgroundColor: '#C1F8CF',
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    padding: 25,
  },
  noEntriesText: {
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: fonts.SpaceItalic,
    fontSize: 12,
  },
  createEntryText: {
    fontFamily: fonts.SpaceMono,
    textAlign: 'center',
  },
  title: {
    fontWeight: 'normal',
    fontFamily: fonts.BioRhyme,
    fontSize: 18,
    marginBottom: 10,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingBottom: 5,
  },
  date: {
    textAlign: 'center',
    fontSize: 10,
    fontFamily: fonts.SpaceMono,
  },
  text: {
    fontFamily: fonts.SpaceItalic,
    fontSize: 12,
    fontStyle: 'normal',
    paddingHorizontal: 5,
  },
  image: {
    width: 325,
    height: 243.75,
    alignSelf: 'center',
    marginTop: 10,
  },
  editContainer: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  input: {
    fontFamily: fonts.BioRhyme,
    fontSize: 16,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
});

export default SubmittedEntry;
