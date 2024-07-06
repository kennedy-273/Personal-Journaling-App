import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Alert, Modal, TouchableOpacity, StyleSheet,} from 'react-native';
import { Icon, Button, Card } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from "@react-native-async-storage/async-storage";


const JournalEntry = ({ navigation }) => {
  const [previewModal, setPreviewModal] = useState(false);
  const [newEntryData, setNewEntryData] = useState([]);
  const [newEntryTitle, setNewEntryTitle] = useState('');
  const [newEntryCategory, setNewEntryCategory] = useState('');
  const [newEntryBody, setNewEntryBody] = useState('');

  async function handleSubmitEntry() {
    const entry = {
      title: newEntryTitle,
      category: newEntryCategory,
      body: newEntryBody,
    };

    // Update the state with the new entry
    let allEntries = newEntryData.concat(entry);
    setNewEntryData(allEntries);
    
    // Make a POST request to the backend API to save the entry
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch('https://journal-backend-x445.onrender.com/journals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(entry),
      });

      if (response.status !== 201) {
      Alert.alert('Failed to save entry to backend');
      } else {
      const savedEntry = await response.json();
      setNewEntryData([...newEntryData, savedEntry]);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to save entry to backend');
    }
    console.log('Entry saved:', entry);

    // Navigate to 'My Journal' with updated entries
    navigation.navigate('My Journal', { allEntries });

    // Clear the input fields
    setNewEntryTitle('');
    setNewEntryCategory('');
    setNewEntryBody('');
    setPreviewModal(false);
    Alert.alert('Journal entry submitted');
  }

  return (
    <ScrollView style={styles.container}>
      <View style={{ flexDirection: 'column' }}>
        <Text style={[{ fontFamily: fonts.SpaceMono, color: colors.midnightBlue }]}>Title:</Text>
        <TextInput
          style={styles.title}
          onChangeText={title => setNewEntryTitle(title)}
          value={newEntryTitle}
          placeholder='Your Title'
          autoCapitalize='words'
        />

        <Text style={[{ fontFamily: fonts.SpaceMono, color: colors.midnightBlue }]}>Category:</Text>
        <Picker
          selectedValue={newEntryCategory}
          style={styles.category}
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
          onChangeText={text => setNewEntryBody(text)}
          value={newEntryBody}
          multiline
          numberOfLines={10}
          placeholder='Add your journal entry here!'
        />
      </View>

      <Button
        title="Log Entry"
        buttonStyle={{ backgroundColor: colors.turquoise, borderRadius: 40, paddingBottom: 14 }}
        titleStyle={{ fontSize: 18, fontFamily: fonts.Anton, letterSpacing: 0.5 }}
        containerStyle={{ height: 80, width: '100%', marginBottom: 30 }}
        onPress={() => setPreviewModal(true)}
      />
      <Modal
        animationType='fade'
        transparent={true}
        visible={previewModal}
        onRequestClose={() => setPreviewModal(!previewModal)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => setPreviewModal(!previewModal)}
            >
              <Icon
                name='close'
                size={30}
              />
            </TouchableOpacity>
            <Text style={{ fontFamily: fonts.Anton, color: colors.cobaltBlue, fontSize: 20, letterSpacing: 1, marginBottom: 10 }}>Your Journal Entry:</Text>
            <Button
              title='Submit'
              buttonStyle={{ backgroundColor: colors.cobaltBlue, borderRadius: 5 }}
              containerStyle={{ width: 200, marginHorizontal: 50, marginVertical: 20 }}
              onPress={handleSubmitEntry}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const colors = {
  mint: '#C1F8CF',
  midnightBlue: '#3E4985',
  cobaltBlue: '#488FB1',
  turquoise: '#4FD3C4',
};

const fonts = {
  Anton: 'Anton_400Regular',
  BioRhyme: 'BioRhyme_400Regular',
  SpaceMono: 'SpaceMono_400Regular',
  SpaceItalic: 'SpaceMono_400Regular_Italic',
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.mint,
  },
  title: {
    marginLeft: 10,
    backgroundColor: '#FFF',
    width: '72%',
    height: 46,
    paddingHorizontal: 10,
    color: colors.midnightBlue,
    fontFamily: fonts.BioRhyme,
    fontSize: 16,
  },
  textarea: {
    backgroundColor: '#FFF',
    padding: 10,
    marginHorizontal: -10,
    alignItems: 'flex-start',
    marginTop: 5,
    fontFamily: fonts.SpaceItalic,
    fontSize: 12,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 56,
    marginBottom: 79,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    margin: 15,
    backgroundColor: '#FFF',
    width: '92%',
    maxHeight: '75%',
  },
});

export default JournalEntry;
