import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useTheme, Title } from "react-native-paper";
import Spacer from "../components/Spacer";
import BigSpacer from "../components/BigSpacer";
import Dates from "../components/Dates";
import Tasks from "../components/Tasks";

import { Context } from "../context/todoContext";
const CheckList = ({ navigation }) => {
  const { getSavedTasks, getFeaturedTasks, state } = useContext(Context);
  const DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const [isWeekly, setIsWeekly] = useState(true);
  const [dates, setDates] = useState([]);
  let now = new Date();

  let day = now.toString().slice(0, 3);
  let date = now.toString().slice(8, 10);

  const daysInMonth = new Date(now.getMonth(), now.getFullYear(), 0).getDate();

  useEffect(() => {
    let datess = [];
    for (let i = 0; i < 7; i++) {
      let date = new Date();
      date.setDate(now.getDate() + i);

      let dayy = date.toString().slice(0, 3);
      let datee = date.toString().slice(8, 10);
      datess.push({
        date: parseInt(datee),
        day: dayy,
      });
    }

    setDates(datess);
    console.log(dates);
  }, []);

  useEffect(() => {
    getSavedTasks();
    let datess = [];
    if (isWeekly) {
      let now = new Date();

      day = now.toString().slice(0, 3);
      date = now.toString().slice(8, 10);

      for (let i = -1; i < 7; i++) {
        let date = new Date();
        date.setDate(now.getDate() + i);

        let dayy = date.toString().slice(0, 3);
        let datee = date.toString().slice(8, 10);
        datess.push({
          date: parseInt(datee),
          day: dayy,
        });
      }
    } else {
      let now = new Date();

      day = now.toString().slice(0, 3);
      date = now.toString().slice(8, 10);

      now.setDate(1);

      for (let i = 0; i < daysInMonth; i++) {
        let date = new Date();
        date.setDate(now.getDate() + i);

        let dayy = date.toString().slice(0, 3);
        let datee = date.toString().slice(8, 10);

        datess.push({
          date: parseInt(datee),
          day: dayy,
        });
      }
    }

    setDates(datess);
  }, [isWeekly]);

  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Header */}
      <View
        style={{
          margin: 50,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity onPress={() => setIsWeekly(!isWeekly)}>
          <Image
            style={styles.calender}
            source={
              isWeekly
                ? require("../assets/weekly.png")
                : require("../assets/monthly.png")
            }
          />
        </TouchableOpacity>
        <Title
          style={{ color: colors.onSurface, fontSize: 30, marginBottom: 15 }}
        >
          {day}, {date}
        </Title>
        <TouchableOpacity
          style={styles.addTask}
          onPress={() => navigation.navigate("AddTask")}
        >
          <Ionicons name="md-add" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <View>
        <Spacer>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={dates}
            renderItem={({ item }) => <Dates day={item.day} date={item.date} />}
            keyExtractor={(item) => item.date.toString()}
          />
        </Spacer>
      </View>

      <BigSpacer>
        <Title>Tasks</Title>
        <View style={{ marginTop: 10 }}>
          <Tasks />
        </View>
      </BigSpacer>
    </View>
  );
};

export default CheckList;

const styles = StyleSheet.create({
  calender: {
    width: 40,
    height: 40,
    marginRight: 50,
  },

  addTask: {
    borderColor: "#fffFff",
    borderWidth: 1,
    paddingHorizontal: 5,
    marginLeft: 45,
    alignSelf: "center",
  },
});
