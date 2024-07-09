import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";

import Home from "./src/templates/Home";
import Login from "./src/templates/Login";
import Signup from "./src/templates/Signup";

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
