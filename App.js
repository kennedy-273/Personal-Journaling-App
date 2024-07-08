import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import {
  useFonts as useBioRhyme,
  BioRhyme_400Regular,
} from "@expo-google-fonts/biorhyme-expanded";
import {
  useFonts as useSpaceMono,
  SpaceMono_400Regular,
  SpaceMono_400Regular_Italic,
} from "@expo-google-fonts/space-mono";
import {
  useFonts as useBigShoulders,
  BigShouldersDisplay_700Bold,
} from "@expo-google-fonts/biorhyme-expanded";
import {
  useFonts as useAnton,
  Anton_400Regular,
} from "@expo-google-fonts/anton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import HomeNavigator from "./HomeNavigator";
import JournalEntry from "./components/JournalEntry";
import Login from "./components/Login";
import Profile from "./components/Profile";
import SignOut from "./components/SignOut";
import { JournalProvider } from "./context/JornalContextProvider";
import JournalDetails from "./components/JournalDetails";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const LogoutButton = () => {
  const navigation = useNavigation();

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem("token");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <View style={styles.logoutContainer}>
      <Button title="Logout" onPress={handleSignOut} />
    </View>
  );
};

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color }) => {
        let iconName;
        if (route.name === "Home") {
          iconName = "home";
        } else if (route.name === "New Entry") {
          iconName = "add-circle";
        } else if (route.name === "Profile") {
          iconName = "person-circle-outline";
        }
        return <Ionicons name={iconName} size={25} color={color} />;
      },
      headerTitleAlign: "center",
      headerStyle: { backgroundColor: colors.cobaltBlue },
      headerTitleStyle: {
        color: "#FFF",
        fontFamily: fonts.Anton,
        fontSize: 24,
        letterSpacing: 1,
        textTransform: "uppercase",
      },
      tabBarLabelStyle: { paddingBottom: 10 },
      tabBarStyle: { height: 80, backgroundColor: colors.midnightBlue },
      tabBarActiveTintColor: colors.mint,
      tabBarLabelStyle: { fontFamily: fonts.BioRhyme, paddingBottom: 7 },
      tabBarInactiveTintColor: "#FFF",
      headerRight: () => <LogoutButton />,
    })}
  >
    <Tab.Screen name="Home" component={HomeNavigator} />
    <Tab.Screen name="New Entry" component={JournalEntry} />
    <Tab.Screen name="Profile" component={Profile} />
  </Tab.Navigator>
);

const App = () => {
  useAnton({
    Anton_400Regular,
  });

  useBioRhyme({
    BioRhyme_400Regular,
  });

  useSpaceMono({
    SpaceMono_400Regular,
    SpaceMono_400Regular_Italic,
  });

  useBigShoulders({
    BigShouldersDisplay_700Bold,
  });

  return (
    <JournalProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen name="JournalDetails" component={JournalDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </JournalProvider>
  );
};

const fonts = {
  Anton: "Anton_400Regular",
  BioRhyme: "BioRhyme_400Regular",
  SpaceMono: "SpaceMono_400Regular",
  SpaceItalic: "SpaceMono_400Regular_Italic",
  BigShoulders: "BigShouldersDisplay_700Bold",
};

const colors = {
  pink: "#FF449F",
  yellow: "#FFD32D",
  mint: "#C1F8CF",
  turquoise: "#4FD3C4",
  midnightBlue: "#AD40AF",
  cobaltBlue: "#AD40AF",
};

const styles = StyleSheet.create({
  logoutContainer: {
    marginRight: 10,
  },
});

export default App;
