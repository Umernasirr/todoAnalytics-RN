import React from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import { useTheme, Title, Button } from "react-native-paper";
import Spacer from "../components/Spacer";

const Project = () => {
  const { colors } = useTheme();

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
        <Spacer>
          <Image
            style={styles.catImage}
            source={require("../assets/cat1.png")}
          />

          <View>
            <Title style={{ marginTop: 10, color: colors.disabled }}>
              Meetings
            </Title>
            <Text
              style={{
                marginVertical: 5,
                marginVertical: 10,
                color: colors.onSurface,
              }}
              numberOfLines={3}
            >
              Meet a friend on Friday for Coffee
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
              Friday
            </Text>
            <Text
              style={{
                color: colors.purple,
                backgroundColor: "rgba(218, 24, 132, 0.1)",
                borderRadius: 15,
                padding: 10,
              }}
            >
              11:30 AM
            </Text>
          </View>
        </Spacer>
      </View>
    </View>
  );
};

export default Project;

const styles = StyleSheet.create({
  catImage: {
    width: 40,
    height: 40,
  },
});
