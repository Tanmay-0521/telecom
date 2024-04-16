import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Padding, Border } from "../GlobalStyles";
// import Start from "./Start";
import Values from "./Values";
import Errors from "./Errors";
import Warnings from "./Warnings";
import Graph from "./Graph";

const Menu = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.menu}>
      {/* <Pressable
        style={styles.menuInner}
        onPress={() => navigation.navigate(Start)}
      >
        <Image
          style={styles.frameChild}
          contentFit="cover"
          source={require("../assets/arrow-1.png")}
        />
      </Pressable> */}
      <Pressable
        style={[styles.values, styles.valuesLayout]}
        onPress={() => navigation.navigate(Values)}
      >
        <View style={styles.valuesChild} />
        <Text style={[styles.values1, styles.values1Typo]}>VALUES</Text>
      </Pressable>
      <Pressable
        style={[styles.errors, styles.valuesLayout]}
        onPress={() => navigation.navigate(Errors)}
      >
        <View style={styles.valuesChild} />
        <Text style={[styles.errors1, styles.values1Typo]}>ERRORS</Text>
      </Pressable>
      <Pressable
        style={[styles.warnings, styles.valuesLayout]}
        onPress={() => navigation.navigate(Warnings)}
      >
        <View style={styles.valuesChild} />
        <Text style={[styles.warnings1, styles.values1Typo]}>WARNINGS</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  valuesLayout: {
    height: 124,
    width: 322,
    position: "absolute",
  },
  values1Typo: {
    textAlign: "center",
    color: Color.colorWhite,
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    fontSize: FontSize.size_31xl,
    position: "absolute",
  },
  frameChild: {
    width: 41,
    height: 0,
  },
  menuInner: {
    top: 705,
    left: 149,
    padding: Padding.p_3xs,
    position: "absolute",
  },
  valuesChild: {
    height: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    borderRadius: Border.br_43xl,
    backgroundColor: Color.colorDarkslateblue,
    position: "absolute",
    width: "100%",
  },
  values1: {
    left: "19.25%",
    top: "25.81%",
    textAlign: "center",
    color: Color.colorWhite,
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    fontSize: FontSize.size_31xl,
  },
  values: {
    top: 81,
    left: 19,
    height: 124,
    width: 322,
  },
  errors1: {
    left: "18.94%",
    top: "25.81%",
    textAlign: "center",
    color: Color.colorWhite,
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    fontSize: FontSize.size_31xl,
  },
  errors: {
    top: 282,
    left: 19,
    height: 124,
    width: 322,
  },
  warnings1: {
    top: "24.19%",
    left: "7.14%",
  },
  warnings: {
    top: 484,
    left: 21,
  },
  menu: {
    backgroundColor: Color.colorSteelblue,
    flex: 1,
    height: 800,
    overflow: "hidden",
    width: "100%",
  },
});

export default Menu;
