import React from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SelectUser from "./src/screens/SelectUser";
import Intro from "./src/screens/Intro";
import Home from "./src/screens/Home";

const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Intro"
      >
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="SelectUser" component={SelectUser} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}