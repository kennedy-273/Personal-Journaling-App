import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screen/home";
import CreateTask from "../screen/create-task";
import CreateCategory from "../screen/create-category";
import EditTask from "../screen/edit-task";

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="CreateTask" component={CreateTask} />
      <Stack.Screen name="EditTask" component={EditTask} />
      <Stack.Screen name="CreateCategory" component={CreateCategory} />
    </Stack.Navigator>
  );
};

export default Navigation;


