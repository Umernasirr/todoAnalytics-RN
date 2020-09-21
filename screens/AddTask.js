import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View, Picker } from "react-native";

import {
  useTheme,
  Title,
  TextInput,
  Button,
  Divider,
  TouchableRipple,
} from "react-native-paper";

import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import BigSpacer from "../components/BigSpacer";
import Spacer from "../components/Spacer";
import { FontAwesome } from "@expo/vector-icons";
import { Context } from "../context/todoContext";
import FeaturedProjects from "../components/FeaturedProjects";
import { color } from "react-native-reanimated";

const AddTask = ({ navigation, route }) => {
  const { state, addTask } = useContext(Context);

  const { colors } = useTheme();
  const [completed, setCompleted] = useState(false);
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState(new Date(1598051730000));
  const [formattedDate, setFormattedDate] = useState(null);
  const [category, setCategory] = useState("Casual");

  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (route.params) {
      const now = new Date();
      const date = new Date(
        now.getFullYear(),
        now.getMonth(),
        route.params.currentDate
      );
      setDate(date);
      const splitDate = date.toString().split(" ");
      setFormattedDate(splitDate[2]);
    } else {
      const now = new Date();
      setDate(now);
      const splitDate = now.toString().split(" ");
      setFormattedDate(splitDate[2]);
    }
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    setShow(Platform.OS === "ios");
    setDate(currentDate);

    const splitDate = currentDate.toString().split(" ");
    setFormattedDate(splitDate[2]);
  };

  const showDatepicker = () => {
    setShow(true);
    setMode("date");
  };

  const now = new Date();
  const daysInMonth = new Date(now.getMonth(), now.getFullYear(), 0).getDate();

  const minDate = new Date(now.getFullYear(), now.getMonth(), 1);
  const maxDate = new Date(now.getFullYear(), now.getMonth(), daysInMonth);

  return (
    <View
      style={{
        backgroundColor: colors.background,
        flex: 1,
      }}
    >
      <Spacer />
      <BigSpacer>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Ionicons
            name="ios-add-circle-outline"
            size={30}
            color="white"
            style={{ marginRight: 10 }}
          />
          <Title
            style={{
              fontSize: 25,
            }}
          >
            New Task
          </Title>

          <TouchableRipple
            onPress={() => navigation.navigate("CheckList")}
            style={{ position: "absolute", right: 10 }}
          >
            <AntDesign name="close" size={25} color="white" />
          </TouchableRipple>
        </View>
        <Spacer />
        <Text style={{ color: colors.onSurface, margin: 5 }}>Description</Text>
        <TextInput
          value={desc}
          onChangeText={setDesc}
          mode="flat"
          label="What are you planning?"
          underlineColor={colors.purple}
        />

        <Divider />

        <Spacer />
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <FontAwesome name="pencil" size={20} color="white" />
          <Text style={{ marginLeft: 10, color: colors.onSurface }}>
            Category
          </Text>
        </View>

        <View
          style={{
            borderBottomColor: "rgba(218, 20, 132,0.8)",
            borderBottomWidth: 2,
          }}
        >
          <Picker
            selectedValue={category}
            style={{
              color: colors.onSurface,
              backgroundColor: colors.backdrop,
              marginTop: 10,
            }}
            onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
          >
            <Picker.Item label="casual" value="casual" />
            <Picker.Item label="important" value="important" />
            <Picker.Item label="random" value="random" />
          </Picker>
        </View>

        <Spacer />

        <TouchableRipple onPress={showDatepicker}>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <Fontisto
              style={{ marginVertical: 10, marginRight: 10 }}
              name="date"
              size={24}
              color="white"
            />
            <Text style={{ color: colors.onSurface }}>
              {date.toString().substring(0, 3)} {", "}
              {date.toString().substring(4, 10)}
            </Text>
          </View>
        </TouchableRipple>

        <Button color={colors.purple} onPress={showDatepicker}>
          Show date picker!
        </Button>

        {show && (
          <DateTimePicker
            maximumDate={maxDate}
            minimumDate={minDate}
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}

        <Spacer />
        <Button
          onPress={() => {
            if (desc.length > 2) {
              addTask(desc, formattedDate, completed, category);
              navigation.pop();
            }
          }}
          style={{ padding: 10 }}
          mode="contained"
          color={colors.purple}
        >
          Add Task
        </Button>
      </BigSpacer>
    </View>
  );
};

export default AddTask;

const styles = StyleSheet.create({});
