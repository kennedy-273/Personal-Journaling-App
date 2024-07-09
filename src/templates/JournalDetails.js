import React from "react";
import { View, Text, StyleSheet } from "react-native";

const JournalDetails = ({ route }) => {
  const { title, body, category } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Journal Detail</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>{body}</Text>
        <Text style={styles.category}>Category: {category}</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}></Text>
      </View>
      
    </View>
  );
};


const colors = {
  background: "#fff", // Subtle off-white background for a more book-like feel
  title: "#2C2C2C",      // Darker color for the title
  body: "#4E4E4E",       // Dark color for body text
  category: "#7B4B94",   // Accent color for the category
  headerFooter: "#AD40AF", // Pink color for header and footer
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.headerFooter,
    padding: 20,
    alignItems: "center",
  },
  headerText: {
    fontSize: 25,
    color: "#fff",
    padding: 10,
    marginBottom: 10,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    padding: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.title,
    marginBottom: 20,
    paddingBottom: 10,
    fontFamily: 'serif', 
  },
  body: {
    fontSize: 18,
    color: colors.body,
    marginBottom: 20,
    lineHeight: 30,     
    fontFamily: 'serif', 
  },
  category: {
    fontSize: 26,
    color: colors.category,
    marginTop: 5,
    fontStyle: "italic",
  },
  footer: {
    backgroundColor: colors.headerFooter,
    padding: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default JournalDetails;
