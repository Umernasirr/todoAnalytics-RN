import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  FlatList,
} from "react-native";

import { useTheme, Title, Button } from "react-native-paper";
import Spacer from "../components/Spacer";
import Project from "../components/Project";
import { ScrollView } from "react-native-gesture-handler";
const FeaturedProjects = () => {
  const { colors } = useTheme();

  return (
    <View>
      <Title style={{ color: colors.onSurface }}>Featured Projects</Title>

      <View
        style={{
          flexDirection: "row",
        }}
      >
        <FlatList
          pagingEnabled
          horizontal
          bounces
          data={[1, 1, 1, 1]}
          renderItem={({ item }) => <Project />}
          keyExtractor={(item) => item + (Math.random() * 10).toString()}
        />

        {/*  */}
      </View>
    </View>
  );
};

export default FeaturedProjects;

const styles = StyleSheet.create({});
