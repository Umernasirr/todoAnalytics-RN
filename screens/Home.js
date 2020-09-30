import React, { useContext, useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { useTheme, Title, Button } from "react-native-paper";
import Spacer from "../components/Spacer";
import FeaturedProjects from "../components/FeaturedProjects";
import { Context } from "../context/todoContext";
import { Dimensions } from "react-native";
import DataViewer from "../components/DataViewer";
import { LineChart, ProgressChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
const Home = ({ navigation }) => {
  const AnimationRef = useRef(null);

  const {
    state,
    state: { totalTasks, tasks, featuredTasks },
    getSavedTasks,
    getLocalTotalTasks,
    resetAsync,
    getFeaturedTasks,
    getTotalCurrent,
  } = useContext(Context);

  const [query, setQuery] = useState("all");

  const [totalOneToTen, setTotalOneToTen] = useState(0);
  const [totalElevenToTwenty, setTotalElevenToTwenty] = useState(0);

  const [totalTwentyOneOnwards, setTotalTwentyOneOnwards] = useState(0);

  const [percentages, setPercentages] = useState([0, 0, 0]);

  const resetCounts = () => {
    setTotalOneToTen(0);
    setTotalElevenToTwenty(0);
    setTotalTwentyOneOnwards(0);
  };

  const changeQuery = (qr) => {
    if (query !== qr) {
      setQuery(qr);
      AnimationRef.current?.fadeInUp();
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getSavedTasks();

      getFeaturedTasks();

      getLocalTotalTasks();

      calculateCurrentTotals();
    });

    getSavedTasks();
    getFeaturedTasks();

    getLocalTotalTasks();
    calculateCurrentTotals();
    return unsubscribe;
  }, []);

  useEffect(() => {
    resetCounts();

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
  }, [tasks, query]);

  const calculateCurrentTotals = () => {
    let totalCat1 = 0;
    let totalCat2 = 0;
    let totalCat3 = 0;
    let total = 0;

    setPercentages(0, 0, 0);

    state.tasks.forEach((task) => {
      if (task.category === "casual") {
        totalCat1 = totalCat1 + 1;
      } else if (task.category === "important") {
        totalCat2 = totalCat2 + 1;
      } else if (task.category === "custom") {
        totalCat3 = totalCat3 + 1;
      }
    });

    console.log(totalCat1);
    console.log(totalCat2);
    console.log(totalCat3);

    console.log("----");

    console.log(totalTasks[0].completed);
    console.log(totalTasks[1].completed);
    console.log(totalTasks[2].completed);

    let p1 = 0;
    let p2 = 0;
    let p3 = 0;

    if (totalTasks[0].completed != 0) p1 = totalTasks[0].completed / totalCat1;

    if (totalTasks[1].completed != 0) p2 = totalTasks[1].completed / totalCat2;

    if (totalTasks[2].completed != 0) p3 = totalTasks[2].completed / totalCat3;

    setPercentages([p1, p2, p3]);
  };

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  const data = {
    labels: ["Casual", "Important", "Custom"],

    data: percentages,
  };

  const { colors } = useTheme();

  const chartConfig = {
    backgroundGradientFrom: colors.purple,
    backgroundGradientTo: colors.primary,

    backgroundGradientFromOpacity: 0.2,
    backgroundGradientToOpacity: 0.1,

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
    labelFont: () => `12`,
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
    <ScrollView
      style={{
        height: screenHeight,
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      {/* Header */}
      <View
        style={{
          margin: 50,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity style={{ marginRight: 50 }} onPress={() => {}}>
          <Feather name="settings" size={32} color="white" />
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

      {/* Featured Projects */}

      {featuredTasks.length > 0 ? (
        <Spacer>
          <FeaturedProjects />
        </Spacer>
      ) : null}

      {/* Visualization Section */}

      <View
        style={{
          backgroundColor: colors.background,
          flex: 1,
          marginRight: 20,
        }}
      >
        <Animatable.View
          style={{ marginRight: 20, borderRadius: 20, marginBottom: 15 }}
        >
          <ProgressChart
            data={data}
            width={screenWidth}
            height={200}
            strokeWidth={16}
            radius={30}
            chartConfig={chartConfig}
            hideLegend={false}
          />
        </Animatable.View>
      </View>
      <Spacer>
        <DataViewer />
      </Spacer>

      <Spacer>
        <Title style={{ color: colors.onSurface }}>Total Tasks</Title>
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
      <Animatable.View ref={AnimationRef}>
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
          yAxisInterval={2} // optional, defaults to 1
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
      </Animatable.View>

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
