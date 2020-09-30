import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState, useRef } from "react";
import { Context } from "../context/todoContext";
import Spacer from "../components/Spacer";
import { useTheme, Title } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
const DataViewer = () => {
  const {
    state: { totalTasks },
  } = useContext(Context);
  const { colors } = useTheme();

  const [counts, setCounts] = useState([0, 0, 0]);
  const [categories, setCategories] = useState([
    "casual",
    "important",
    "custom",
  ]);
  const [completed, setCompleted] = useState([0, 0, 0]);

  useEffect(() => {
    let cat = [];

    if (totalTasks.length > 0) {
      totalTasks.forEach((totalTask) => {
        cat.push(totalTask.category);
      });
    }

    setCategories(cat);

    let counts = [];
    let completed = [];
    totalTasks.forEach((totalTask) => {
      counts.push(totalTask.total);
    });

    totalTasks.forEach((totalTask) => {
      completed.push(totalTask.completed);
    });

    setCounts(counts);
    setCompleted(completed);
  }, [totalTasks]);

  const renderItem = (idx, item) => {
    let c1 = colors.primary;

    let c2 = colors.primary;

    switch (idx) {
      case 0:
        c1 = "rgba(188, 24, 95,1)";
        c2 = "rgba(165, 24, 144,0.9)";
        break;
      case 1:
        c1 = "rgba(255, 79, 255,0.8)";
        c2 = "rgba(100, 65, 165,1)";

        break;
      case 2:
        c1 = "rgba(184, 69, 146,1)";
        c2 = "rgba(165, 24, 144,0.9)";

        break;
    }

    return (
      <View
        key={idx.toString()}
        style={{ alignItems: "center", marginHorizontal: 20 }}
      >
        <Text style={{ color: colors.onSurface, fontSize: 12 }}>
          {categories[idx].toUpperCase()}
        </Text>

        <Title style={{ color: colors.onSurface, fontSize: 24, margin: 5 }}>
          {completed[idx]} / {item}
        </Title>

        <LinearGradient
          start={[0, 0]}
          end={[1, 0]}
          // Button Linear Gradient
          colors={[c1, c2]}
          style={{
            marginTop: 5,
            opacity: 0.8,
            padding: 4,
            alignItems: "center",
            borderRadius: 20,
            width: 80,
          }}
        ></LinearGradient>
      </View>
    );
  };

  return (
    <View>
      <Title style={{ color: colors.onSurface }}>Your Progress </Title>
      <Spacer />
      <View style={{ alignItems: "center" }}>
        <View style={{ flexDirection: "row" }}>
          {counts.map((count, idx) => renderItem(idx, count))}
        </View>
      </View>
    </View>
  );
};

export default DataViewer;

const styles = StyleSheet.create({});
