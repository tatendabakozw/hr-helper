import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Intro from "./src/screens/Intro";
import Login from "./src/screens/Login";
import Home from "./src/screens/Home";
import SingleEmployee from "./src/screens/SingleEmployee";
import AllEmployees from "./src/screens/AllEmployees";
import AddEmployee from "./src/screens/AddEmployee";
import EditEmployee from "./src/screens/EditEmployee";

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
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SingleEmployee" component={SingleEmployee} />
        <Stack.Screen name="AllEmployees" component={AllEmployees} />
        <Stack.Screen name="AddEmployee" component={AddEmployee} />
        <Stack.Screen name="EditEmployee" component={EditEmployee} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
