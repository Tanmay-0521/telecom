import  React, { useState, useEffect } from "react";
import RealTimeGraphsScreen from "./RealTimeGraphsScreen ";
import Values from "./Values";
import { Text, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Color, FontSize, FontFamily, Border, Padding } from "../GlobalStyles";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { useNavigation } from "@react-navigation/native";
import NetInfo from "@react-native-community/netinfo";

const Start = () => {
  const navigation = useNavigation();
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    // Simulate internet connection status change
    const timer = setInterval(() => {
      NetInfo.fetch().then(state => {
        setIsConnected(state.isConnected);
      });
    }, 5000);// Change every 1 seconds
    

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={[styles.start, styles.startBg]}>
      <View style={styles.frameParent}>
        <View style={styles.appNameParent}>
          <Text style={styles.appName}>Sys Monitoring Pro.</Text>
          <Text style={[styles.description, styles.body1BoldTypo]}>
            Our Project aims to Monitor the Real Time Values of the System’s
            Critical Parameters in order to review the Health of the System.
          </Text>
        </View>
        {/* Pressable Button */}
        <Pressable
            style={styles.iconFlexBox}
            onPress={() => navigation.navigate(Values)}> 
        <View style={[styles.button, styles.startBg]}>
          <View style={[styles.iconPlaceholder, styles.iconLayout]} />
          <Text style={[styles.body1Bold, styles.body1BoldTypo]}>Start</Text>
          <Image
            style={[styles.iconPlaceholder1, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/icon-placeholder.png")}
          />
          <View style={[styles.dot, isConnected ? styles.greenDot : styles.redDot]} />
        </View>
        </Pressable>
      </View>
      <Image
        style={styles.logoIcon}
        contentFit="cover"
        source={require("../assets/logo.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  startBg: {
    overflow: "hidden",
    backgroundColor: Color.black,
  },
  body1BoldTypo: {
    fontSize: FontSize.b1_size,
    textAlign: "left",
    color: Color.colorBlack,
  },
  iconLayout: {
    height: 30,
    width: 30,
  },
  appName: {
    top: "400",
    fontSize: FontSize.h1_size,
    fontWeight: "800",
    fontFamily: FontFamily.h1,
    textAlign: "left",
    color: Color.colorBlack,
    alignSelf: "stretch",
  },
  description: {
    fontWeight: "500",
    fontFamily: FontFamily.b1,
    marginTop: 8,
    alignSelf: "stretch",
  },
  appNameParent: {
    alignSelf: "stretch",
  },
  iconPlaceholder: {
    backgroundColor: Color.colorSilver_100,
    display: "none",
  },
  body1Bold: {
    fontWeight: "700",
    fontFamily: FontFamily.b1B,
    marginLeft: 12,
  },
  iconPlaceholder1: {
    marginLeft: 12,
  },
  button: {
    borderRadius: Border.br_6xl,
    borderStyle: "solid",
    borderColor: Color.colorGray,
    borderWidth: 2,
    width: 132,
    height: 63,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Padding.p_mini,
    paddingVertical: Padding.p_sm,
    marginTop: 10,
  },
  frameParent: {
    width: "68.44%",
    top: 113,
    right: "21.14%",
    bottom: 319,
    left: "10.42%",
    position: "absolute",
  },
  logoIcon: {
    top: 86,
    right: 37,
    width: 53,
    height: 55,
    position: "absolute",
  },
  start: {
    flex: 1,
    width: "100%",
    height: 800,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    position: "absolute",
    right: 8,
    top: 8,
  },
  greenDot: {
    backgroundColor: "green",
  },
  redDot: {
    backgroundColor: "red",
  }
});

export default Start;
