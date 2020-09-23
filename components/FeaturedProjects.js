import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  FlatList,
} from "react-native";

import Carousel from "react-native-snap-carousel";

import { useTheme, Title, Button } from "react-native-paper";

import Project from "../components/Project";
const FeaturedProjects = () => {
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  const { colors } = useTheme();

  return (
    <View>
      <Title style={{ color: colors.onSurface }}>Featured Projects</Title>

      <View>
        <Carousel
          data={[1, 1, 1, 1]}
          renderItem={({ item, index }) => <Project />}
          sliderWidth={screenWidth - 40}
          itemWidth={screenWidth - 50}
          layout="stack"
          activeAnimationType="timing"
          activeSlideAlignment="center"
        />

        {/*  */}
      </View>
    </View>
  );
};

export default FeaturedProjects;

const styles = StyleSheet.create({});
