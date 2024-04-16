import * as React from "react";
import { Text, StyleSheet, View, Pressable, ScrollView } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Padding, Border } from "../GlobalStyles";
//import { ScrollView } from "react-native-gesture-handler";

const About = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.about}>
      <Text style={styles.aboutTheProject}>About the Project</Text>
      <Image
        style={styles.logoIcon}
        contentFit="cover"
        source={require("../assets/logo.png")}
      />
      {/* <View style = {styles.container}>  */}
      <ScrollView Vertical={true} contentContainerStyle={styles.scrollViewContent}></ScrollView>
      <View style={styles.rectangleParent}>
      
        <View style={styles.frameChild} />
        
        <Text style={styles.lorem}>
          SysMonitor Pro is a comprehensive system monitoring application
          designed to provide real-time insights into the critical parameters of
          your system. With a user-friendly interface and robust functionality,
          SysMonitor Pro empowers users to keep a close eye on temperature,
          pressure, voltage, and other essential metrics, ensuring optimal
          performance and early detection of potential issues .
        </Text>
      </View>
      {/* </View> */}
      <View style={styles.navigator}>
        <View style={styles.navi}>
          <Pressable
            style={styles.frameViewFlexBox}
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
            style={styles.frameViewFlexBox}
            onPress={() => navigation.navigate("Errors")}
          >
            <Image
              style={styles.icon}
              contentFit="cover"
              source={require("../assets/alarms.png")}
            />
            <Text style={[styles.page1, styles.pageTypo]}>Page 2</Text>
          </Pressable>
          <Pressable
            style={styles.frameViewFlexBox}
            onPress={() => navigation.navigate("Warnings")}
          >
            <Image
              style={styles.icon}
              contentFit="cover"
              source={require("../assets/warnings.png")}
            />
            <Text style={[styles.page1, styles.pageTypo]}>Page 3</Text>
          </Pressable>
          <View style={[styles.frameView, styles.frameViewFlexBox]}>
            <Image
              style={styles.icon}
              contentFit="cover"
              source={require("../assets/about.png")}
            />
            <Text style={styles.pageTypo}>{`About `}</Text>
          </View>
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
  frameViewFlexBox: {
    padding: Padding.p_xs,
    flexDirection: "row",
    alignItems: "center",
  },
  aboutTheProject: {
    top: 78,
    left: 39,
    fontSize: FontSize.h1_size,
    fontWeight: "800",
    fontFamily: FontFamily.h1,
    width: 274,
    height: 120,
    textAlign: "left",
    color: Color.colorBlack,
    position: "absolute",
  },
  logoIcon: {
    top: 110,
    right: 37,
    width: 53,
    height: 55,
    position: "absolute",
  },
  frameChild: {
    alignSelf: "stretch",
    backgroundColor: Color.colorGainsboro,
    height: 534,
    opacity: 0.5,
    zIndex: 0,
    borderRadius: Border.br_xl,
  },
  lorem: {
    width: "76.87%",
    top: 16,
    left: "11.74%",
    fontWeight: "500",
    fontFamily: FontFamily.b1,
    height: 511,
    zIndex: 1,
    fontSize: FontSize.b1_size,
    textAlign: "left",
    color: Color.colorBlack,
    position: "absolute",
  },
  rectangleParent: {
    width: "78.06%",
    top: 195,
    right: "13.06%",
    bottom: 151,
    left: "8.89%",
    alignItems: "center",
    borderRadius: Border.br_xl,
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
  frameView: {
    backgroundColor: Color.colorDimgray,
    borderRadius: Border.br_6xl,
  },
  navi: {
    backgroundColor: Color.colorDarkslategray,
    borderRadius: Border.br_6xl,
    flexDirection: "row",
  },
  navigator: {
    marginLeft: -144,
    bottom: 46,
    left: "50%",
    flexDirection: "row",
    position: "absolute",
  },
  about: {
    backgroundColor: Color.black,
    flex: 1,
    width: "100%",
    height: 800,
    overflow: "hidden",
  },
  
});

export default About;
