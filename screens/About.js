import * as React from "react";
import { Text, StyleSheet, View, Pressable, ScrollView, SafeAreaView } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Padding, Border } from "../GlobalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
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
      <SafeAreaView style={styles.container}>
        <ScrollView Vertical={true} style={styles.scrollView}>
          {/* <View style={styles.rectangleParent}>
      
        <View style={styles.frameChild} /> */}

          <Text style={styles.lorem}>
            SysMonitor Pro is a comprehensive system monitoring application
            designed to provide real-time insights into the critical parameters
            of your system. With a user-friendly interface and robust
            functionality, SysMonitor Pro empowers users to keep a close eye on
            temperature, pressure, voltage, and other essential metrics,
            ensuring optimal performance and early detection of potential
            issues.
          </Text>
          {/* </View> */}
        </ScrollView>
      </SafeAreaView>
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
  //navigation wale (about)
  pageTypo: {
    // marginLeft: 10,
    marginLeft: wp(2),
    color: Color.black,
    fontFamily: FontFamily.b1B,
    fontWeight: "700",
    // fontSize: FontSize.b1_size,
    fontSize: wp(6),
    textAlign: "left",
  },
  frameViewFlexBox: {
    //navigation wale
    // padding: Padding.p_xs,
    padding: wp(2),
    flexDirection: "row",
    alignItems: "center",
  },
  aboutTheProject: {
    //title
    // top: 78,
    // left: 39,
    // fontSize: FontSize.h1_size,
    top: hp(7),
    left: wp(7),
    fontSize: wp(10),
    fontWeight: "800",
    fontFamily: FontFamily.h1,
    // width: 274,
    // height: 120,
    width: wp(50),
    height: hp(20),
    textAlign: "left",
    color: Color.colorBlack,
    position: "absolute",
  },
  logoIcon: {
    //logo wala
    // top: 110,
    // right: 37,
    // width: 53,
    // height: 55,
    top: hp(8),
    right: wp(8),
    width: wp(10),
    height: hp(5),
    position: "absolute",
  },
  frameChild: {
    //about wala
    alignSelf: "stretch",
    backgroundColor: Color.colorGainsboro,
    // height: 534,
    height: hp(72),
    opacity: 0.5,
    zIndex: 0,
    borderRadius: Border.br_xl,
  },
  lorem: {
    //about wala
    // width: "76.87%",
    // top: 16,
    // left: "11.74%",
    fontWeight: "500",
    fontFamily: FontFamily.b1,
    // height: 511,
    zIndex: 1,
    // fontSize: FontSize.b1_size,
    height: hp(100),
    top: hp(2),
    left: wp(6),
    width: wp(65),
    fontSize: wp(6),
    textAlign: "left",
    color: Color.colorBlack,
    //position: "absolute",
  },
  rectangleParent: {
    //about wale
    width: "78.06%",
    // top: 195,
    top: hp(20),
    right: "13.06%",
    bottom: 151,
    //left: "8.89%",
    left: wp(11),
    alignItems: "center",
    borderRadius: Border.br_xl,
    position: "absolute",
  },
  icon: {
    //navigation wale
    borderRadius: Border.br_8xs,
    // width: 30,
    // height: 30,
    width: wp(10),
    height: hp(4),
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
    //navigation wala
    // marginLeft: -144,
    // bottom: 46,
    // left: "50%",
    // flexDirection: "row",
    marginLeft: wp(-38.5),
    bottom: hp(2),
    left: wp(50),
    height: hp(20),
    top: hp(95),
    position: "absolute",
  },
  about: {
    backgroundColor: Color.black,
    flex: 1,
    width: "100%",
    height: 800,
    overflow: "hidden",
  },
  // scrollViewContent: {
  //   flexGrow: 1,
  //   justifyContent: 'center',
  // },
  scrollView: {
    backgroundColor: Color.colorGainsboro,
    marginHorizontal: 20,
    borderRadius: Border.br_6xl,
    // top: hp(25),
    // bottom: hp(50),
  },
  container: {
    flex: 1,
    paddingBottom: hp(13),
    paddingTop: hp(23),
    margin: wp(4),
  },
});

export default About;
