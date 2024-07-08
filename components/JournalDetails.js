import React from "react";
import { View, Text, StyleSheet } from "react-native";

const JournalDetails = ({ route }) => {
  const { title, body, category } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
      <Text style={styles.category}>Category: {category}</Text>
    </View>
  );
};

const colors = {
  background: "#FAF3E0", // Subtle off-white background for a more book-like feel
  title: "#2C2C2C",      // Darker color for the title
  body: "#4E4E4E",       // Dark color for body text
  category: "#7B4B94",   // Accent color for the category
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.title,
    marginBottom: 20,
    paddingBottom: 10,
    fontFamily: 'serif', // Serif font for a traditional reading feel
  },
  body: {
    fontSize: 18,
    color: colors.body,
    marginBottom: 20,
    lineHeight: 30,      // Increased line height for better readability
    fontFamily: 'serif', // Serif font for body text as well
  },
  category: {
    fontSize: 26,
    color: colors.category,
    marginTop: 5,
    fontStyle: "italic",
  },
});

export default JournalDetails;
