import React, { useState, useContext, useEffect, useRef } from "react";
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
import { AntDesign } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
const Tasks = () => {
  let taskRef = useRef();
  const navigation = useNavigation();
  const {
    state,
    setTaskStatus,
    deleteTask,
    getSavedTasks,
    setFeatured,
  } = useContext(Context);

  let tasks = state.tasks;
  const currentDate = state.currentDate;

  tasks = tasks.filter((task) => task.date == currentDate);

  const { colors } = useTheme();

  const RenderItem = ({ id, desc, completed, featured }) => {
    useEffect(() => {}, []);

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
        <TouchableOpacity
          onPress={() => {
            setFeatured(id);
          }}
          style={{
            position: "absolute",
            left: 20,
          }}
        >
          {featured ? (
            <AntDesign name="star" size={24} color={colors.onSurface} />
          ) : (
            <AntDesign name="staro" size={24} color={colors.onSurface} />
          )}
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 12,
            color: colors.onSurface,
            marginRight: 50,
            marginLeft: 20,
            textDecorationLine: completed ? "line-through" : "none",
          }}
          numberOfLines={1}
        >
          {desc}
        </Text>

        <TouchableOpacity
          onPress={() => deleteTask(id)}
          style={{ position: "absolute", right: 50 }}
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
      <Animatable.View ref={taskRef}>
        <FlatList
          data={tasks}
          renderItem={({ item }) => (
            <RenderItem
              id={item.id}
              desc={item.desc}
              completed={item.completed}
              featured={item.featured}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </Animatable.View>
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
