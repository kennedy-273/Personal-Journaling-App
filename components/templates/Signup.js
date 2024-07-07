import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";

const Signup = ({ navigation }) => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

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
      navigate('/login')
      
      console.log(response);
      // Redirect to Login screen after successful signup
      navigation.replace("Login");
    } catch (error) {
      if (error.response) {
        console.log(">>>>", error.response.data);
      } else if (error.request) {
        console.log(">>>> Request made, no response:", error.request);
      } else {
        console.log(">>>> Error", error.message);
      }
      console.log(error.config);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Signup</Text>

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

        <TextInput
          style={styles.input}
          placeholder="Email"
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

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginText}> Login</Text>
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

export default Signup;
