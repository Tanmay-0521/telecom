import * as React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Padding, Border } from "../GlobalStyles";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Warnings = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.warnings}>
      <View style={styles.warningsChild} />
      <Text style={styles.warnings1}>Warnings</Text>
      <Text style={styles.noWarnings}>No Warnings</Text>
      <Image
        style={styles.logoIcon}
        contentFit="cover"
        source={require("../assets/logo.png")}
      />
      <View style={styles.navigator}>
        <View style={styles.navi}>
          <Pressable
            style={styles.iconFlexBox}
            onPress={() => navigation.navigate("Values")}
          >
            <Image
              style={styles.icon}
              contentFit="cover"
              source={require("../assets/values.png")}
            />
            <Text style={[styles.page1, styles.pageTypo]}>Page 1</Text>
          </Pressable>
          <Pressable
            style={styles.iconFlexBox}
            onPress={() => navigation.navigate("Errors")}
          >
            <Image
              style={styles.icon}
              contentFit="cover"
              source={require("../assets/alarms.png")}
            />
            <Text style={[styles.page1, styles.pageTypo]}>Page 2</Text>
          </Pressable>
          <View style={[styles.iconContainer, styles.iconFlexBox]}>
            <Image
              style={styles.icon}
              contentFit="cover"
              source={require("../assets/warnings.png")}
            />
            <Text style={styles.pageTypo}>Warnings</Text>
          </View>
          <Pressable
            style={styles.iconFlexBox}
            onPress={() => navigation.navigate("About")}
          >
            <Image
              style={styles.icon}
              contentFit="cover"
              source={require("../assets/about.png")}
            />
            <Text style={[styles.page1, styles.pageTypo]}>Page 4</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageTypo: {
    marginLeft: 10,
    color: Color.black,
    fontFamily: FontFamily.b1B,
    fontWeight: "700",
    fontSize: FontSize.b1_size,
    textAlign: "left",
  },
  iconFlexBox: {
    padding: Padding.p_xs,
    alignItems: "center",
    flexDirection: "row",
  },
  warningsChild: {
    width: "78.06%",
    top: 141,
    right: "11.11%",
    bottom: 151,
    left: "10.83%",
    borderRadius: Border.br_xl,
    backgroundColor: Color.colorGainsboro,
    opacity: 0.5,
    position: "absolute",
  },
  warnings1: {
    top: 78,
    left: 39,
    fontSize: FontSize.h1_size,
    fontWeight: "800",
    fontFamily: FontFamily.h1,
    width: 274,
    height: 47,
    textAlign: "left",
    color: Color.colorBlack,
    position: "absolute",
  },
  noWarnings: {
    height: "56.75%",
    top: "19.63%",
    left: 61,
    fontWeight: "500",
    fontFamily: FontFamily.b1,
    textAlign: "center",
    width: 232,
    fontSize: FontSize.b1_size,
    color: Color.colorBlack,
    position: "absolute",
  },
  logoIcon: {
    top: 70,
    right: 37,
    width: 53,
    height: 55,
    position: "absolute",
  },
  icon: {
    borderRadius: Border.br_8xs,
    width: 30,
    height: 30,
    overflow: "hidden",
  },
  page1: {
    display: "none",
  },
  iconContainer: {
    backgroundColor: Color.colorDimgray,
    borderRadius: Border.br_6xl,
  },
  navi: {
    backgroundColor: Color.colorDarkslategray,
    borderRadius: Border.br_6xl,
    flexDirection: "row",
  },
  navigator: {
    marginLeft: -160,
    bottom: 46,
    left: "50%",
    flexDirection: "row",
    position: "absolute",
  },
  warnings: {
    backgroundColor: Color.black,
    flex: 1,
    width: "100%",
    height: 800,
    overflow: "hidden",
  },
});

export default Warnings;
