import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useTheme, Title, Button } from "react-native-paper";
import Spacer from "../components/Spacer";
import BigSpacer from "../components/BigSpacer";
import { categories } from "../constants";
import FeaturedProjects from "../components/FeaturedProjects";
import Tasks from "../components/Tasks";
import { Context } from "../context/todoContext";
import { Dimensions } from "react-native";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

const Home = () => {
  const {
    state: { totalTasks },
    getSavedTasks,
    getTotalTasks,
  } = useContext(Context);

  const [query, setQuery] = useState("all");
  const [percentangeCompleted, setPercentangeCompleted] = useState([
    0,
    0,
    0,
    0,
  ]);

  const [totalOneToTen, setTotalOneToTen] = useState(0);
  const [totalElevenToTwenty, setTotalElevenToTwenty] = useState(0);

  const [totalTwentyOneOnwards, setTotalTwentyOneOnwards] = useState(0);

  const changeQuery = (qr) => {
    if (query !== qr) {
      setQuery(qr);
    }
  };

  useEffect(() => {
    getSavedTasks();
    getTotalTasks();

    setPercentangeCompleted(
      totalTasks.map((task) => task.completed / task.total)
    );

    // Totals

    let testA = 0;
    let testB = 0;
    let testC = 0;

    if (query == "all") {
      totalTasks.forEach((task) => (testA += task.oneToTen));
      totalTasks.forEach((task) => (testB += task.elevenToTwenty));
      totalTasks.forEach((task) => (testC += task.twentyOneOnwards));
    } else {
      totalTasks.forEach((task) =>
        task.category === query ? (testA += task.oneToTen) : null
      );

      totalTasks.forEach((task) =>
        task.category === query ? (testB += task.elevenToTwenty) : null
      );

      totalTasks.forEach((task) =>
        task.category === query ? (testC += task.twentyOneOnwards) : null
      );
    }
    setTotalOneToTen(testA);
    setTotalElevenToTwenty(testB);
    setTotalTwentyOneOnwards(testC);
  }, [totalTasks, query]);

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const data = {
    labels: ["Important", "Casual", "Custom"],

    data: percentangeCompleted,
  };

  const chartConfig = {
    backgroundGradientFrom: "#141414",

    backgroundGradientFromOpacity: 0.7,

    backgroundGradientTo: "#08130D",

    backgroundGradientToOpacity: 0.3,

    color: (opacity = 255) => {
      let r = 0;
      let b = 0;
      let g = 0;

      if (opacity == 0.2) {
        r = Math.floor(opacity * 50);
        g = Math.floor(opacity);
        b = Math.floor(opacity * 50);
      }
      if (opacity >= 0.6 && opacity <= 1) {
        r = Math.floor(opacity * 255);
        g = Math.floor(opacity * 150);
        b = Math.floor(opacity * 50);
      }

      return `rgba(${255 + r} , ${10 + g}, ${130 + b}, ${opacity})`;
    },

    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,

    useShadowColorFromDataset: false,
  };

  const DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let date = new Date().getDate();
  let day = DAYS[new Date().getDay()];

  const { colors } = useTheme();

  const RenderCategory = ({ name, catid, percentage }) => {
    let color = null;
    switch (catid) {
      case 1:
        color = colors.primary;
        break;
      case 2:
        color = colors.secondary;
        break;

      case 3:
        color = colors.tertiary;
        break;

      default:
        color = colors.primary;
        break;
    }

    return (
      <View style={styles.category}>
        <View style={[styles.circle, { backgroundColor: color }]}></View>
        <View>
          <Text style={{ color: colors.onSurface }}>{name}</Text>
          <Text
            style={{
              fontSize: 12,
              color: colors.disabled,
            }}
          ></Text>
        </View>
      </View>
    );
  };

  //
  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Header */}
      <View
        style={{
          margin: 50,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity>
          <Image style={styles.menu} source={require("../assets/menu.png")} />
        </TouchableOpacity>
        <Title
          style={{ color: colors.onSurface, fontSize: 30, marginBottom: 15 }}
        >
          {day}, {date}
        </Title>
        <TouchableOpacity>
          <Image
            style={styles.calender}
            source={require("../assets/calender.png")}
          />
        </TouchableOpacity>
      </View>

      {/* Featured Projects */}
      <Spacer>
        <FeaturedProjects />
      </Spacer>

      {/* Visualization Section */}
      <Spacer>
        <Title style={{ marginBottom: 10 }}>Completed Tasks</Title>
      </Spacer>

      <View
        style={{
          backgroundColor: colors.backdrop,
          flex: 1,
          marginRight: 20,
        }}
      >
        {/* Graph */}
        <View>
          <ProgressChart
            data={data}
            width={screenWidth - 20}
            height={200}
            strokeWidth={16}
            radius={30}
            chartConfig={chartConfig}
            hideLegend={false}
          />
        </View>
      </View>

      <Spacer>
        <Title>Monthly Tasks</Title>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Button color={colors.onSurface} onPress={() => changeQuery("all")}>
            All
          </Button>

          <Button
            color={colors.purple}
            onPress={() => changeQuery("important")}
          >
            Important
          </Button>
          <Button onPress={() => changeQuery("casual")} color="#C1507C">
            Casual
          </Button>
          <Button onPress={() => changeQuery("custom")} color="#E07396">
            Custom
          </Button>
        </View>
      </Spacer>

      <LineChart
        data={{
          labels: ["", "1-10", "11-20", "21-31"],
          datasets: [
            {
              data: [
                0,
                totalOneToTen,
                totalElevenToTwenty,
                totalTwentyOneOnwards,
              ],
            },
          ],
        }}
        yAxisInterval={1} // optional, defaults to 1
        width={Dimensions.get("window").width} // from react-native
        height={200}
        chartConfig={{
          backgroundGradientFrom: colors.purple,
          backgroundGradientTo: colors.primary,

          backgroundGradientFromOpacity: 0.2,
          backgroundGradientToOpacity: 0.1,

          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255,255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
      />

      {/* Tasks */}
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  calender: {
    width: 30,
    height: 30,
    marginLeft: 45,
  },
  menu: {
    width: 30,
    height: 30,
    marginRight: 55,
  },
  graph: {
    width: 190,
    height: 200,
    marginVertical: 15,
  },
  category: {
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    height: 15,
    width: 15,
    marginRight: 15,
    borderRadius: 100,
  },
});
