import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";

import Carousel from "react-native-snap-carousel";

import { useTheme, Title } from "react-native-paper";
import { Context } from "../context/todoContext";
import * as Animatable from "react-native-animatable";
import Project from "../components/Project";
const FeaturedProjects = () => {
  const {
    state: { featuredTasks },
    setTaskStatus,
  } = useContext(Context);

  const [featured, setFeatured] = useState([]);
  useEffect(() => {
    setFeatured(featuredTasks);
  }, [featuredTasks]);

  const screenWidth = Dimensions.get("window").width;

  const { colors } = useTheme();

  return (
    <View animation="fadeIn">
      <Title style={{ color: colors.onSurface }}>Featured Projects</Title>

      <View>
        <Carousel
          data={featured}
          renderItem={({ item }) => (
            <Project item={item} setTaskStatus={setTaskStatus} />
          )}
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
