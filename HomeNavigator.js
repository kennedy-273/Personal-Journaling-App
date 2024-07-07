import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";

import HomeScreen from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/templates/Signup";

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signup">
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
//     <Stack.Navigator
// screenOptions={{headerShown: false,}}

    
//     >
//       <Stack.Screen name="Home" component={HomeScreen} />
//     </Stack.Navigator>
  );
};

export default HomeNavigator;
