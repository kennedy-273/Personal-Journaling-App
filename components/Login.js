import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://journal-backend-x445.onrender.com/signin",
        {
          email,
          password,
        }
      );
      console.log(response);
      await AsyncStorage.setItem("token", response.data.access_token);
      
      navigation.navigate("Home");
    } catch (error) {
      handleError(error);
    }
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post(
        "https://journal-backend-x445.onrender.com/signup",
        {
          first_name: firstName,
          last_name: lastName,
          email,
          password,
        }
      );
      console.log(response);
      await AsyncStorage.setItem("token", response.data.access_token);
      // After successful signup, switch to login mode
      setIsLoginMode(true);
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error) => {
    if (error.response) {
      console.log(">>>>", error.response.data);
    } else if (error.request) {
      console.log(">>>> Request made, no response:", error.request);
    } else {
      console.log(">>>> Error", error.message);
    }
    console.log(error.config);
  };

  const toggleMode = () => {
    // Toggle between login and signup modes
    setIsLoginMode(!isLoginMode);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>{isLoginMode ? "Login" : "Sign Up"}</Text>

        {!isLoginMode && (
          <>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              onChangeText={setFirstName}
              value={firstName}
            />

            <TextInput
              style={styles.input}
              placeholder="Last Name"
              onChangeText={setLastName}
              value={lastName}
            />
          </>
        )}

        <TextInput
          style={styles.input}
          placeholder="emailadress@gmail.com"
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
        />

        {isLoginMode ? (
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        )}

        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>
            {isLoginMode ? "New to the app?" : "Already have an account?"}
          </Text>
          <TouchableOpacity onPress={toggleMode}>
            <Text style={styles.switchButtonText}>
              {isLoginMode ? "Sign Up" : "Login"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

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
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  switchText: {
    marginRight: 10,
  },
  switchButtonText: {
    color: "#AD40AF",
    fontWeight: "700",
  },
});

export default Login;
