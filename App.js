import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Provider } from "./context/todoContext";
import { Entypo } from "@expo/vector-icons";
import Home from "./screens/Home";
import CheckList from "./screens/CheckList";
import AddTask from "./screens/AddTask";
import { FontAwesome5 } from "@expo/vector-icons";
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
  const BottomTab = createMaterialBottomTabNavigator();

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
    <BottomTab.Navigator
      backBehavior="none"
      shifting
      initialRouteName="TaskStackNav"
      activeColor="#f0edf6"
      inactiveColor="#8B8C8D"
      barStyle={{ backgroundColor: "#C822B0" }}
    >
      <BottomTab.Screen
        name="TaskStackNav"
        component={TaskStackNav}
        options={{
          tabBarColor: "#BE1474",

          tabBarLabel: "Tasks",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="tasks" size={24} color={color} />
          ),
        }}
      />

      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={24} color={color} />
          ),
          tabBarColor: "#6441A5",
        }}
      />
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
