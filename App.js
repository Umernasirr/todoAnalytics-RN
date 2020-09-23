import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { DarkTheme, DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Provider } from "./context/todoContext";


import Home from "./screens/Home";
import CheckList from "./screens/CheckList";
import AddTask from "./screens/AddTask";

const theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    backdrop: "#1C1C1C",
    primary: "#0056BB",
    secondary: "#FF7900",
    tertiary: "#00FFFF",
    purple: "#DA1884",
  },
  roundness: 20,
};



function App() {
  const TaskStack = createStackNavigator();
  const BottomTab = createBottomTabNavigator();

  const TaskStackNav = () => (
    <TaskStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <TaskStack.Screen name="CheckList" component={CheckList} />
      <TaskStack.Screen name="AddTask" component={AddTask} />
    </TaskStack.Navigator>
  );

  const BottomTabNav = () => (
    <BottomTab.Navigator>
      <BottomTab.Screen name="Home" component={Home} />
      <BottomTab.Screen name="TaskStackNav" component={TaskStackNav} />
    </BottomTab.Navigator>
  );

  return (
    <NavigationContainer>
      <BottomTabNav />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default () => (
  <PaperProvider theme={theme}>
    <Provider>
      <App />
    </Provider>
  </PaperProvider>
);
