import React, { useState } from 'react';

// Define the JournalEntry type
interface JournalEntry {
  id: string;
  title: string;
  content: string;
}

const JournalApp: React.FC = () => {
  // State to hold journal entries
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  // State for new entry input
  const [newEntry, setNewEntry] = useState({ title: '', content: '' });

  // Function to add a new entry
  const addEntry = () => {
    const entryToAdd: JournalEntry = {
      id: Date.now().toString(), // Simple unique ID
      title: newEntry.title,
      content: newEntry.content,
    };
    setEntries([...entries, entryToAdd]);
    setNewEntry({ title: '', content: '' }); // Reset input fields
  };

  // Function to delete an entry
  const deleteEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  // Function to update an entry
  const updateEntry = (id: string, updatedTitle: string, updatedContent: string) => {
    setEntries(entries.map(entry => entry.id === id ? { ...entry, title: updatedTitle, content: updatedContent } : entry));
  };

  return (
    <div>
      <h2>Journal</h2>
      <input
        type="text"
        value={newEntry.title}
        onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
        placeholder="Title"
      />
      <textarea
        value={newEntry.content}
        onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
        placeholder="Content"
      />
      <button onClick={addEntry}>Add Entry</button>
      {entries.map(entry => (
        <div key={entry.id}>
          <h3>{entry.title}</h3>
          <p>{entry.content}</p>
          <button onClick={() => deleteEntry(entry.id)}>Delete</button>
          {/* Implement edit functionality as needed, possibly using a modal or inline form */}
        </div>
      ))}
    </div>
  );
};

export default JournalApp;