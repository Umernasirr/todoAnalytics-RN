import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme, Title, TouchableRipple } from "react-native-paper";
import * as Animatable from "react-native-animatable";

import { Context } from "../context/todoContext";

const Dates = ({ date, day }) => {
  const {
    state: { currentDate },
    setCurrentDate,
  } = useContext(Context);

  const { colors } = useTheme();

  day = day.substring(0, 3);
  day = day.toUpperCase();

  date = useState(date)[0];
  day = useState(day)[0];

  return (
    <TouchableRipple onPress={() => setCurrentDate(date)}>
      <Animatable.View
        animation="fadeIn"
        style={[
          styles.card,
          {
            backgroundColor:
              currentDate === date ? colors.purple : colors.onSurface,
            height: currentDate === date ? 90 : 80,
            width: currentDate === date ? 70 : 60,
          },
        ]}
      >
        <Text
          style={{
            fontSize: currentDate == date ? 24 : 18,
            textAlign: "center",

            color: currentDate == date ? colors.onSurface : colors.background,
          }}
        >
          {date}
        </Text>
        <Text
          style={{
            color: colors.background,
            fontSize: 12,
            textAlign: "center",
          }}
        >
          {day}
        </Text>
      </Animatable.View>
    </TouchableRipple>
  );
};

export default Dates;

const styles = StyleSheet.create({
  card: {
    alignContent: "center",
    justifyContent: "center",
    width: 60,
    height: 80,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
