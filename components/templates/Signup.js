import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const Profile = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        <Image 
          source={{uri: 'https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg'}} 
          style={styles.profileImage} 
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.detailLabel}>First Name:</Text>
          <Text style={styles.detailItem}>John</Text>
          <Text style={styles.detailLabel}>Last Name:</Text>
          <Text style={styles.detailItem}>Doe</Text>
          <Text style={styles.detailLabel}>Email:</Text>
          <Text style={styles.detailItem}>john.doe@example.com</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f8f8f8",
  },
  innerContainer: {
    paddingHorizontal: 25,
    alignItems: "center",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 30,
  },
  detailsContainer: {
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'flex-start',
  },
  detailLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailItem: {
    fontSize: 16,
    marginBottom: 20,
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 28,
    fontWeight: "500",
    color: "#333",
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    width: "100%",
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#AD40AF",
    borderRadius: 10,
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  loginText: {
    color: "#AD40AF",
    fontWeight: "700",
  },
});

export default Profile;
