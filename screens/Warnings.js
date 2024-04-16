import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Padding, FontSize, FontFamily, Color } from "../GlobalStyles";
import SimpleLineChart from '../components/SimpleLineChart';
// import Menu from "./Menu";

const Warnings = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.warnings}>
      <Pressable
        style={styles.warningsInner}
        onPress={() => navigation.navigate(Menu)}
      >
        <Image
          style={styles.frameChild}
          contentFit="cover"
          source={require("../assets/arrow-1.png")}
        />
      </Pressable>
      {/* <Text style={styles.noWarnings}>No Warnings</Text> */}
      <SimpleLineChart />
    </View>
  );
};

const styles = StyleSheet.create({
  frameChild: {
    width: 41,
    height: 0,
  },
  warningsInner: {
    top: 705,
    left: 149,
    padding: Padding.p_3xs,
    position: "absolute",
  },
  noWarnings: {
    height: "15.88%",
    width: "80.83%",
    top: "36.88%",
    left: "9.44%",
    fontSize: FontSize.size_6xl,
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
    color: Color.colorWhite,
    textAlign: "center",
    position: "absolute",
  },
  warnings: {
    backgroundColor: Color.colorSteelblue,
    flex: 1,
    width: "100%",
    height: 800,
    overflow: "hidden",
  },
});

export default Warnings;
