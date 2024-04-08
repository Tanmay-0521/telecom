import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border, Padding } from "../GlobalStyles";
// import Start from "./Start";
import Values from "./Values";
import Warnings from "./Warnings";
// import Menu from "./Menu";

const Errors = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.errors}>
      <Pressable
        style={styles.errorsInner}
        onPress={() => navigation.navigate(Menu)}
      >
        <Image
          style={styles.frameChild}
          contentFit="cover"
          source={require("../assets/arrow-1.png")}
        />
      </Pressable>
      <Text style={[styles.mainsFail, styles.lowTypo]}>{`Main’s Fail:  `}</Text>
      <Text
        style={[styles.lowAcVoltage, styles.lowTypo]}
      >{`Low AC Voltage: `}</Text>
      <Text
        style={[styles.highAcVoltage, styles.lowTypo]}
      >{`High AC Voltage: `}</Text>
      <Text
        style={[styles.lowDcVoltage, styles.lowTypo]}
      >{`Low DC Voltage: `}</Text>
      <Text
        style={[styles.highDcVoltage, styles.lowTypo]}
      >{`High DC Voltage: `}</Text>
      <View style={styles.errorsChild} />
      <View style={[styles.errorsItem, styles.errorsPosition]} />
      <View style={[styles.rectangleView, styles.errorsChild2Position]} />
      <View style={[styles.errorsChild1, styles.errorsPosition]} />
      <View style={[styles.errorsChild2, styles.errorsChild2Position]} />
      <Text style={[styles.f, styles.lowTypo]}>F</Text>
      <Text style={[styles.f1, styles.f1Typo]}>F</Text>
      <Text style={[styles.f2, styles.f2Typo]}>F</Text>
      <Text style={[styles.f3, styles.f1Typo]}>F</Text>
      <Text style={[styles.f4, styles.f2Typo]}>F</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  lowTypo: {
    textAlign: "left",
    color: Color.colorWhite,
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    fontSize: FontSize.size_6xl,
    position: "absolute",
  },
  errorsPosition: {
    left: "64.72%",
    right: "23.06%",
    backgroundColor: Color.colorDarkslateblue,
    borderRadius: Border.br_6xl,
    width: "12.22%",
    height: "7.63%",
    position: "absolute",
  },
  errorsChild2Position: {
    left: "66.67%",
    right: "21.11%",
    backgroundColor: Color.colorDarkslateblue,
    borderRadius: Border.br_6xl,
    width: "12.22%",
    height: "7.63%",
    position: "absolute",
  },
  f1Typo: {
    left: "68.61%",
    textAlign: "left",
    color: Color.colorWhite,
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    fontSize: FontSize.size_6xl,
    position: "absolute",
  },
  f2Typo: {
    left: "70.56%",
    textAlign: "left",
    color: Color.colorWhite,
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    fontSize: FontSize.size_6xl,
    position: "absolute",
  },
  frameChild: {
    width: 41,
    height: 0,
  },
  errorsInner: {
    top: 705,
    left: 149,
    padding: Padding.p_3xs,
    position: "absolute",
  },
  mainsFail: {
    left: "5.83%",
    color: Color.colorWhite,
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    fontSize: FontSize.size_6xl,
    top: "21%",
  },
  lowAcVoltage: {
    top: "33.38%",
    left: "5.83%",
    color: Color.colorWhite,
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    fontSize: FontSize.size_6xl,
  },
  highAcVoltage: {
    top: "45.75%",
    left: "5.83%",
    color: Color.colorWhite,
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    fontSize: FontSize.size_6xl,
  },
  lowDcVoltage: {
    top: "58.13%",
    left: "5.83%",
    color: Color.colorWhite,
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    fontSize: FontSize.size_6xl,
  },
  highDcVoltage: {
    top: "70.5%",
    left: "5.83%",
    color: Color.colorWhite,
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    fontSize: FontSize.size_6xl,
  },
  errorsChild: {
    top: "19.13%",
    right: "42.78%",
    bottom: "73.25%",
    left: "45%",
    backgroundColor: Color.colorDarkslateblue,
    borderRadius: Border.br_6xl,
    width: "12.22%",
    height: "7.63%",
    position: "absolute",
  },
  errorsItem: {
    top: "31.5%",
    bottom: "60.88%",
  },
  rectangleView: {
    top: "43.88%",
    bottom: "48.5%",
  },
  errorsChild1: {
    top: "56.13%",
    bottom: "36.25%",
  },
  errorsChild2: {
    top: "69%",
    bottom: "23.38%",
  },
  f: {
    left: "48.89%",
    top: "21%",
  },
  f1: {
    top: "33.38%",
  },
  f2: {
    top: "45.75%",
  },
  f3: {
    top: "58%",
  },
  f4: {
    top: "70.88%",
  },
  errors: {
    backgroundColor: Color.colorSteelblue,
    flex: 1,
    width: "100%",
    height: 800,
    overflow: "hidden",
  },
});

export default Errors;
