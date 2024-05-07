import * as React from "react";
import { Text, StyleSheet, View, Pressable,ScrollView } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Padding, Border } from "../GlobalStyles";
import  { useState, useEffect } from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Errors = () => {
  const navigation = useNavigation();
  // const [lowac,setLowac]= useState(0);
  // const [highac,setHighac]= useState(0);
  const [criticalspd,setcriticspd]= useState(0);
  // const [highdc45,sethighdc45]= useState(0);
  const [Mainsf,setMainsf]= useState(0);
  const [lowac,setlowac]= useState(0);
  const [highac,sethighac]= useState(0);
  const [lowdc,setlowdc]= useState(0);
  const [lowdc46,setlowdc46]= useState(0);
  const [highdc,sethighdc]= useState(0);

  //const tot_rec = {rect1} + {rect2} + {rect3};
  // // let textRatio1, textRatio2,textRatio3;
  // Wlowac: 0,
  //   Whighac: 0,
  //   Wcriticalloadspdb: 0,
  //   Whighdc54v: 0,
  // Lowdc: 0,
  //   Highac: 0,
  //   Lowdc46: 0,
  //   Highdc: 0,
  //   Mainsfail: 0,
  //   Lowac: 0,
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.63.17:4000/api/data');
        const data = await response.json();
        const recentData = data[0]; // Get the most recent data point
        if (recentData) {
          // setLowac(recentData.Wlowac);
          // setHighac(recentData.Whighac);
          // // setWlowac(recentData.Wlowac); 
          setcriticspd(recentData.Wcriticalloadspdb);
          // sethighdc45(recentData.Whighdc54v);
              setMainsf(recentData.Mainsfail);
              sethighac(recentData.Highac);
              sethighdc(recentData.Highdc);
              setlowac(recentData.Lowac);
              setlowdc(recentData.Lowdc);
              setlowdc46(recentData.Lowdc46);
          // }
        }
        // let textRatio1, textRatio2;
        
      } catch (error) {
        console.error('Error fetching temperature data:', error);
      }
    };
    const interval = setInterval(fetchData, 2000); // Fetch data every 2 seconds
    

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  return (
    <View style={styles.errors}>
      <View style={styles.valuesParent}>
       <ScrollView Vertical={true} contentContainerStyle={styles.scrollViewContent}>
        {/* scroll effect */}
        <View style={styles.values}>
          <View style={styles.frameParent}>
            <View style={styles.systemTemperatureWrapper}>
              <Text style={styles.systemTemperature}>Mains Fail</Text>
            </View>
            <View style={styles.wrapperShadowBox}>
              <Text style={styles.c}>{Mainsf}</Text>
            </View>
          </View>
        </View>
        <View style={styles.values}>
          <View style={styles.frameParent}>
            <View style={styles.systemTemperatureWrapper}>
              <Text style={styles.systemTemperature}>Low AC Voltage</Text>
            </View>
            <View style={styles.wrapperShadowBox}>
              <Text style={styles.c}>{lowac}</Text>
            </View>
          </View>
        </View>
        <View style={styles.values}>
          <View style={styles.frameParent}>
            <View style={styles.systemTemperatureWrapper}>
              <Text style={styles.systemTemperature}>High AC Voltage</Text>
            </View>
            <View style={styles.wrapperShadowBox}>
              <Text style={styles.c}>{highac}</Text>
            </View>
          </View>
        </View>
        <View style={styles.values}>
          <View style={styles.frameParent}>
            <View style={styles.systemTemperatureWrapper}>
              <Text style={styles.systemTemperature}>Low DC Voltage</Text>
            </View>
            <View style={styles.wrapperShadowBox}>
              <Text style={styles.c}>{lowdc}</Text>
            </View>
          </View>
        </View>
        <View style={styles.values}>
          <View style={styles.frameParent}>
            <View style={styles.systemTemperatureWrapper}>
              <Text style={styles.systemTemperature}>High DC Voltage</Text>
            </View>
            <View style={styles.wrapperShadowBox}>
              <Text style={styles.c}>{highdc}</Text>
            </View>
          </View>
        </View>
        <View style={styles.values}>
          <View style={styles.frameParent}>
            <View style={styles.systemTemperatureWrapper}>
              <Text style={styles.systemTemperature}>Battery Low</Text>
            </View>
            <View style={styles.wrapperShadowBox}>
              <Text style={styles.c}>{lowdc46}</Text>
            </View>
          </View>
        </View>
        <View style={styles.values}>
          <View style={styles.frameParent}>
            <View style={styles.systemTemperatureWrapper}>
              <Text style={styles.systemTemperature}>High Temperature</Text>
            </View>
            <View style={styles.wrapperShadowBox}>
              <Text style={styles.c}>0</Text>
            </View>
          </View>
        </View>
        <View style={styles.values}>
          <View style={styles.frameParent}>
            <View style={styles.systemTemperatureWrapper}>
              <Text style={styles.systemTemperature}>
                Critical Load (SPD Fail)
              </Text>
            </View>
            <View style={styles.wrapperShadowBox}>
              <Text style={styles.c}>{criticalspd}</Text>
            </View>
          </View>
        </View>
        </ScrollView>
      </View>
      <Text style={styles.alarms}>Alarms</Text>
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
          <View style={[styles.iconGroup, styles.iconFlexBox]}>
            <Image
              style={styles.icon}
              contentFit="cover"
              source={require("../assets/alarms.png")}
            />
            <Text style={styles.pageTypo}>Alarms</Text>
          </View>
          <Pressable
            style={styles.iconFlexBox}
            onPress={() => navigation.navigate("Warnings")}
          >
            <Image
              style={styles.icon}
              contentFit="cover"
              source={require("../assets/warnings.png")}
            />
            <Text style={[styles.page1, styles.pageTypo]}>Page 3</Text>
          </Pressable>
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
  pageTypo: { //navigation wale (errors)
    // marginLeft: 10,
    marginLeft: wp(2),
    textAlign: "left",
    color: Color.black,
    fontFamily: FontFamily.b1B,
    fontWeight: "700",
    // fontSize: FontSize.b1_size,
    fontSize: wp(6),
  },
  iconFlexBox: {  //navigation wale
    // padding: Padding.p_xs,
    padding: wp(2),
    flexDirection: "row",
    alignItems: "center",
  },
  systemTemperature: {  //errors wale
    // width: 136,
    width: wp(35),
    textAlign: "left",
    color: Color.colorBlack,
    fontFamily: FontFamily.b1B,
    fontWeight: "700",
    // fontSize: FontSize.b1_size,
    fontSize: wp(6),
  },
  systemTemperatureWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  c: {  //errors wale
    fontWeight: "500",
    fontFamily: FontFamily.b1,
    color: Color.black,
    textAlign: "center",
    // fontSize: FontSize.b1_size,
    fontSize: wp(5),
    height: hp(3),
  },
  wrapperShadowBox: {
    // marginLeft: 6,
    marginLeft: hp(0),
    // paddingVertical: Padding.p_2xs,
    // paddingHorizontal: Padding.p_6xs,
    paddingVertical: wp(4),
    paddingHorizontal: hp(2),
    // width: 81,
    width: wp(20),
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    backgroundColor: Color.colorDarkslategray,
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: Border.br_6xl,
    alignItems: "center",
    overflow: "hidden",
  },
  frameParent: {  //errors wale
    // top: 10,
    // left: 10,
    top: hp(1),
    bottom: hp(1),
    left: wp(4),
    backgroundColor: Color.colorSilver_200,
    // width: 241,
    width: wp(70),
    // padding: Padding.p_3xs,
    padding: wp(1),
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: Border.br_6xl,
    alignItems: "center",
    position: "absolute",
    overflow: "hidden",
  },
  values: { //errors wale
    // width: 261,
    width: wp(80),
    // height: 88,
    height: hp(15),
  },
  valuesParent: { //errors wale
    // width: "75.83%",
    // top: 145,
    // right: "12.22%",
    // bottom: 153,
    // left: "11.94%",
    width: wp(80),
    top: hp(15),
    right: "11.11%",
    bottom: hp(15),
    left: wp(10),
    borderRadius: Border.br_xl,
    backgroundColor: Color.colorGainsboro,
    paddingHorizontal: 6,
    // paddingVertical: Padding.p_6xs,
    paddingVertical: hp(2),
    alignItems: "center",
    position: "absolute",
  },
  alarms: { //title wala
    // top: 78,
    // left: 39,
    // fontSize: FontSize.h1_size,
    top: hp(7),
    left: wp(7),
    fontSize: wp(10),
    fontWeight: "800",
    fontFamily: FontFamily.h1,
    // width: 274,
    // height: 47,
    width: wp(50),
    height: hp(20),
    textAlign: "left",
    color: Color.colorBlack,
    position: "absolute",
  },
  logoIcon: { //logo wala
    // top: 74,
    // right: 37,
    // width: 53,
    // height: 55,
    top: hp(8),
    right: wp(8),
    width: wp(10),
    height: hp(5),
    position: "absolute",
  },
  icon: { //logo wala
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
  iconGroup: {
    backgroundColor: Color.colorDimgray,
    borderRadius: Border.br_6xl,
    padding: Padding.p_xs,
  },
  navi: {
    backgroundColor: Color.colorDarkslategray,
    flexDirection: "row",
    borderRadius: Border.br_6xl,
  },
  navigator: {  //navigator wale
    // marginLeft: -148,
    // bottom: 46,
    // left: "50%",
    // flexDirection: "row",
    marginLeft: wp(-39),
    bottom: hp(2),
    left: wp(50),
    height: hp(20),
    top: hp(95),
    position: "absolute",
  },
  errors: {
    backgroundColor: Color.black,
    flex: 1,
    width: "100%",
    height: 800,
    overflow: "hidden",
  },
});

export default Errors;
