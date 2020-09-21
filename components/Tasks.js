import React, { useState, useContext, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { useTheme, Title, Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { Context } from "../context/todoContext";
import Spacer from "./Spacer";
import { ScrollView } from "react-native-gesture-handler";

const Tasks = () => {
  const navigation = useNavigation();
  const { state, setTaskStatus, deleteTask, getSavedTasks } = useContext(
    Context
  );

  let tasks = state.tasks;
  const currentDate = state.currentDate;

  tasks = tasks.filter((task) => task.date == currentDate);

  const { colors } = useTheme();

  const RenderItem = ({ id, desc, completed }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.backdrop,
          paddingHorizontal: 30,
          paddingVertical: 20,

          borderRadius: 100,
          flexDirection: "row",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Text
          style={{
            fontSize: 12,
            color: colors.onSurface,
            marginRight: 60,
            textDecorationLine: completed ? "line-through" : "none",
          }}
          numberOfLines={1}
        >
          {desc}
        </Text>

        <TouchableOpacity
          onPress={() => deleteTask(id)}
          style={{ position: "absolute", right: 60 }}
        >
          <MaterialCommunityIcons
            name="delete-outline"
            size={24}
            color="white"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            position: "absolute",
            right: 0,
          }}
          onPress={() => setTaskStatus(id)}
        >
          <View
            style={{
              width: 25,
              height: 25,
              borderColor: colors.onSurface,
              borderWidth: 1,
              borderRadius: 100,
              marginRight: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {completed ? (
              <Image
                style={styles.checked}
                source={require("../assets/checked.png")}
              />
            ) : null}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  if (tasks.length > 0) {
    return (
      <ScrollView>
        <FlatList
          data={tasks}
          renderItem={({ item }) => (
            <RenderItem
              id={item.id}
              desc={item.desc}
              completed={item.completed}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>
    );
  } else {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Title style={{ color: colors.disabled }}>No Tasks found today</Title>
        <Button
          onPress={() => navigation.navigate("AddTask", { currentDate })}
          style={styles.button}
          mode="contained"
          color={colors.purple}
        >
          Add a Task
        </Button>
      </View>
    );
  }
};

export default Tasks;

const styles = StyleSheet.create({
  checked: {
    height: 20,
    width: 20,
  },
  button: {
    padding: 10,
    paddingHorizontal: 30,
    margin: 10,
  },
});
