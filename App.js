import { StatusBar } from "react-native";
import React from "react";
import Routes from "./src/routes";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#232330" barStyle="light-content" />
      <Routes />
    </NavigationContainer>
  );
}
