import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import { useTheme, Title, Button, Checkbox } from "react-native-paper";
import Spacer from "../components/Spacer";

const Project = ({ item }) => {
  const { colors } = useTheme();
  let { id, category, completed, date, desc } = item;

  const [checkedComplete, setCheckedCompleted] = useState(completed);
  const DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  category = category.toUpperCase();
  if (item) {
    return (
      <View>
        <View
          style={{
            flex: 1,
            backgroundColor: colors.backdrop,
            borderRadius: 20,
            padding: 30,
            margin: 30,
          }}
        >
          <Image
            style={styles.catImage}
            source={require("../assets/cat1.png")}
          />

          <View>
            <Title style={{ marginTop: 10, color: colors.disabled }}>
              {category}
            </Title>
            <Text
              style={{
                marginVertical: 5,
                marginVertical: 10,
                color: colors.onSurface,
              }}
              numberOfLines={3}
            >
              {desc}
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text
              style={{
                color: colors.tertiary,
                backgroundColor: "rgba(0, 255, 255, 0.1)",
                borderRadius: 15,
                padding: 10,
                marginRight: 5,
              }}
            >
              {date}, {new Date().toUTCString().slice(8, 17)}
            </Text>
            <Text
              style={{
                color: colors.purple,
                backgroundColor: "rgba(218, 24, 132, 0.1)",
                borderRadius: 15,
                padding: 10,
              }}
            >
              {DAYS[date % 7]}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          ></View>
        </View>
      </View>
    );
  }
};

export default Project;

const styles = StyleSheet.create({
  catImage: {
    width: 40,
    height: 40,
  },
});
