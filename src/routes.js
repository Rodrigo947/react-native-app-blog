import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import CategoryPosts from "./pages/CategoryPosts";
import Search from "./pages/Search";

const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="Category" component={CategoryPosts} />
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
}

export default Routes;
