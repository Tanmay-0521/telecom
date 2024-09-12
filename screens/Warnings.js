import * as React from "react";
import  { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Padding, Border } from "../GlobalStyles";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import NetInfo from "@react-native-community/netinfo";
import {DATA_API} from '@env';
const Warnings = () => {
  const navigation = useNavigation();
  const [data, setData] = useState(null);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const state = await NetInfo.fetch();
        setIsConnected(state.isConnected);

        const response = await fetch(DATA_API);//tanmay wifi
        // const response = await fetch('http://172.16.80.96:3500/api/data');//college wifi
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [0,0,0,0,0,0,0,0,0,0,0,0]);

  // Threshold values for displaying warnings
  const thresholdValues = {
    Wlowac: -1,
    Whighac: -1,
    Wcriticalloadspdb: -1,
    Whighdc54v: -1,
  };

  const isAboveThreshold = (value, threshold) => value > threshold;
  const isBelowThreshold = (value, threshold) => value < threshold;


  return (
    <View style={styles.warnings}>
      <View style={styles.warningsChild} />
      <Text style={styles.warnings1}>Warnings</Text>
      
      {data && (
        <View style={styles.dataContainer}>
          {isAboveThreshold(data.Wlowac, thresholdValues.Wlowac) && (
            <Text style={styles.dataText}>Wlowac: {data.Wlowac}</Text>
          )}
          {isBelowThreshold(data.Whighac, thresholdValues.Whighac) && (
            <Text style={styles.dataText}>Whighac: {data.Whighac}</Text>
          )}
          {isAboveThreshold(data.Wcriticalloadspdb, thresholdValues.Wcriticalloadspdb) && (
            <Text style={styles.dataText}>Wcriticalloadspdb: {data.Wcriticalloadspdb}</Text>
          )}
          {isBelowThreshold(data.Whighdc54v, thresholdValues.Whighdc54v) && (
            <Text style={styles.dataText}>Whighdc54v: {data.Whighdc54v}</Text>
          )}
          <View style={[styles.dot, isConnected ? styles.greenDot : styles.redDot]} />
        </View>
      )}
      {!data && (
        <Text style={styles.noWarnings}>No Warnings</Text>
      )}
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

const styles = StyleSheet.create({  //navigation wale (warning)
  dataContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  dataText: {
    fontSize: 16,
    marginBottom: 10,
    color: Color.black,
    fontFamily: FontFamily.b1B,
  },
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
  iconFlexBox: {  //navigation wale
    // padding: Padding.p_xs,
    padding: wp(2),
    alignItems: "center",
    flexDirection: "row",
  },
  warningsChild: {  //warnings wale
    // width: "78.06%",
    // top: 141,
    // right: "11.11%",
    // bottom: 151,
    // left: "10.83%",
    width: wp(80),
    top: hp(15),
    right: "11.11%",
    bottom: hp(15),
    left: wp(10),
    borderRadius: Border.br_xl,
    backgroundColor: Color.colorGainsboro,
    opacity: 0.5,
    position: "absolute",
  },
  warnings1: {  //title wala
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
  noWarnings: { //warnings wale
    // height: "56.75%",
    // top: "19.63%",
    // left: 61,
    height: hp(50),
    top: hp(20),
    left: wp(20),
    fontWeight: "500",
    fontFamily: FontFamily.b1,
    textAlign: "left",
    // width: 232,
    width: wp(60),
    //fontSize: FontSize.b1_size,
    fontSize: wp(8),
    color: Color.colorBlack,
    position: "absolute",
  },
  logoIcon: { //logo wala
    // top: 70,
    // right: 37,
    // width: 53,
    // height: 55,
    top: hp(8),
    right: wp(8),
    width: wp(10),
    height: hp(5),
    position: "absolute",
  },
  icon: { //logo wala ya fir navigation wala
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
  iconContainer: {
    backgroundColor: Color.colorDimgray,
    borderRadius: Border.br_6xl,
  },
  navi: {
    backgroundColor: Color.colorDarkslategray,
    borderRadius: Border.br_6xl,
    flexDirection: "row",
  },
  navigator: {  //navigator wale
    // marginLeft: -160,
    // bottom: 46,
    // left: "50%",
    // flexDirection: "row",
    marginLeft: wp(-43),
    bottom: hp(2),
    left: wp(50),
    height: hp(20),
    top: hp(95),
    position: "absolute",
  },
  warnings: {
    backgroundColor: Color.black,
    flex: 1,
    width: "100%",
    height: 800,
    overflow: "hidden",
  },
  ot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    position: "absolute",
    right: 11,
    top: 5,
  },
  greenDot: {
    backgroundColor: "green",
  },
  redDot: {
    backgroundColor: "red",
  }
});

export default Warnings;
