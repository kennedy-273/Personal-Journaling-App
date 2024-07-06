import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // const handleLogin = async () => {
  //   try {
  //     const response = await axios.post("http://127.0.0.1:5500/signin", {
  //       email,
  //       password,
  //     });
  //     console.log(response);
  //     await AsyncStorage.setItem("token", response.data.token);
  //     navigation.navigate("Home");
  //   } catch (error) {
  //     console.log(">>>>", error.response.data);
  //     console.log(error);
  //   }
  // };

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
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(">>>>", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(">>>> Request made, no response:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log(">>>> Error", error.message);
      }
      console.log(error.config);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontFamily: "Roboto-Medium",
              fontSize: 28,
              fontWeight: "500",
              color: "#333",
              marginBottom: 30,
            }}
          >
            Login
          </Text>

          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#ddd",
              borderRadius: 10,
              paddingHorizontal: 10,
              paddingVertical: 5,
              marginBottom: 20,
            }}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={setEmail}
          />

          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#ddd",
              borderRadius: 10,
              paddingHorizontal: 10,
              paddingVertical: 5,
              marginBottom: 20,
            }}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            style={{
              backgroundColor: "#AD40AF",
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
              marginBottom: 20,
            }}
            onPress={handleLogin}
          >
            <Text style={{ color: "#fff", textAlign: "center" }}>Login</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Text style={{ color: "#AD40AF", fontWeight: "700" }}>
              {" "}
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
