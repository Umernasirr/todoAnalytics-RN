import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import Spacer from "../components/Spacer";
import { Context } from "../context/todoContext";
import { Button, useTheme } from "react-native-paper";
const Settings = ({ navigation }) => {
  const { resetAsync } = useContext(Context);
  const { colors } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        alignItems: "center",
      }}
    >
      <Spacer />
      <Spacer />
      <Text
        style={{
          color: colors.text,
          fontSize: 30,
          padding: 5,
          borderBottomColor: colors.purple,
          borderBottomWidth: 5,
        }}
      >
        Settings
      </Text>
      <Spacer />
      <Spacer />
      <Spacer>
        <Button
          onPress={resetAsync}
          mode="contained"
          style={{ padding: 10, paddingHorizontal: 15, borderRadius: 10 }}
          color={colors.purple}
        >
          Reset Data
        </Button>
      </Spacer>

      <Spacer>
        <Button
          onPress={() => {
            navigation.navigate("Home");
          }}
          mode="outlined"
          style={{ padding: 10, paddingHorizontal: 15, borderRadius: 10 }}
          color={colors.text}
        >
          Go to Home
        </Button>
      </Spacer>

      <Spacer />
      <Spacer>
        <Text style={{ color: colors.text }}>
          More features will be added later...
        </Text>
      </Spacer>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
