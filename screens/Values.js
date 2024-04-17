import * as React from "react";
import  { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Pressable, ScrollView } from "react-native";
//import { Text, StyleSheet, View, Pressable } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Color, Padding, Border, FontFamily, FontSize } from "../GlobalStyles";
import RealTimeGraphsScreen from "./RealTimeGraphsScreen ";
import PressableMenu from "./PressableMenu";
import RealTimeGraphsScreenh from "./RealTimeGraphsScreenh";

const Values = () => {
  const [temperature, setTemperature] = useState(0);
  const [humidity, sethumidity] = useState(0);
  const navigation = useNavigation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.93.17:4000/api/data');
        const data = await response.json();
        const recentData = data[0]; // Get the most recent data point
        if (recentData) {
          setTemperature(recentData.temperature); 
          sethumidity(recentData.humidity)// Update recent temperature value
        }
      } catch (error) {
        console.error('Error fetching temperature data:', error);
      }
    };
    const interval = setInterval(fetchData, 2000); // Fetch data every 2 seconds

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  return (
    <View style={styles.values}>
      <View style={styles.valuesParent}>
        <ScrollView Vertical={true} contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.values1}>
          <View style={[styles.frameParent, styles.frameParentFlexBox]}>
            {/* Press for Graph */}
          <Pressable
              style={styles.frameParentFlexBox}
              onPress={() => navigation.navigate(RealTimeGraphsScreen)}>
            <View style={styles.wrapperFlexBox}>
              <Text style={styles.systemTemperature}>DC Voltage</Text>
            </View>
            <View style={styles.wrapperShadowBox}>
              <Text style={styles.cTypo}>000V</Text>
            </View>
            </Pressable>
          </View>
        </View>
        <View style={styles.values1}>
          <View style={[styles.frameParent, styles.frameParentFlexBox]}>
            {/* Press for Graph */}
          <Pressable
              style={styles.frameParentFlexBox}
              onPress={() => navigation.navigate(RealTimeGraphsScreen)}>
            <View style={styles.wrapperFlexBox}>
              <Text style={styles.systemTemperature}>AC Voltage</Text>
            </View>
            <View style={styles.wrapperShadowBox}>
              <Text style={styles.cTypo}>000V</Text>
            </View>
            </Pressable>
          </View>
        </View>
        <View style={styles.values1}>
          <View style={[styles.frameParent, styles.frameParentFlexBox]}>
            {/* Press for Graph */}
          <Pressable
              style={styles.frameParentFlexBox}
              onPress={() => navigation.navigate(RealTimeGraphsScreen)}>
            <View style={styles.wrapperFlexBox}>
              <Text style={styles.systemTemperature}>Total Rect Current</Text>
            </View>
            <View style={styles.wrapperShadowBox}>
              <Text style={styles.cTypo}>000A</Text>
            </View>
            </Pressable>
          </View>
        </View>
        <View style={styles.values1}>
          <View style={[styles.frameParent, styles.frameParentFlexBox]}>
            {/* Press for Graph */}
          <Pressable
              style={styles.frameParentFlexBox}
              onPress={() => navigation.navigate(RealTimeGraphsScreenh)}>
            <View style={styles.wrapperFlexBox}>
              <Text style={styles.systemTemperature}>Humidity</Text>
            </View>
            <View style={styles.wrapperShadowBox}>
              <Text style={styles.cTypo}>{humidity}%</Text>
            </View>
            </Pressable>
          </View>
        </View>
        <View style={styles.values1}>
          <View style={[styles.frameParent, styles.frameParentFlexBox]}>
             {/* Press for Graph */}
          <Pressable
              style={styles.frameParentFlexBox}
              onPress={() => navigation.navigate(RealTimeGraphsScreen)}>
            <View style={styles.wrapperFlexBox}>
              <Text style={styles.systemTemperature}>System Temperature</Text>
            </View>
            <View style={styles.wrapperShadowBox}>
              <Text style={styles.cTypo}>{temperature}°C</Text>
            </View>
            </Pressable>
          </View>
        </View>
        <View style={styles.frameWrapper}>
          <View style={[styles.frameParent2, styles.frameParentFlexBox]}>
            <View
              style={[styles.rectifierStatuesWrapper, styles.wrapperFlexBox]}
            >
              <Text style={styles.systemTemperature}>Rectifier Statues</Text>
            </View>
            <View style={styles.vectorShadowBox}>
              <Image
                style={styles.frameChild}
                contentFit="cover"
                source={require("../assets/line-2.png")}
              />
              <Text style={[styles.text, styles.cTypo]}>1</Text>
              <Text style={[styles.text1, styles.textTypo]}>3</Text>
            </View>
            <View style={styles.vectorShadowBox}>
              <Image
                style={styles.frameChild}
                contentFit="cover"
                source={require("../assets/line-2.png")}
              />
              <Text style={[styles.text2, styles.textTypo]}>2</Text>
              <Text style={[styles.text1, styles.textTypo]}>3</Text>
            </View>
            <View style={styles.vectorShadowBox}>
              <Image
                style={styles.frameChild}
                contentFit="cover"
                source={require("../assets/line-2.png")}
              />
              <Text style={[styles.text2, styles.textTypo]}>3</Text>
              <Text style={[styles.text1, styles.textTypo]}>3</Text>
            </View>
          </View>
        </View>
        </ScrollView>
      </View>
      <Text style={styles.values6}>Values</Text>
      {/* <Pressable
            onPress={() => navigation.navigate(PressableMenu)}> */}
        <Image
          style={styles.logoIcon}
          contentFit="cover"
          source={require("../assets/logo.png")} 
        />
      {/* </Pressable> */}
      <View style={styles.navigator}>
        <View style={styles.navi}>
          <View style={[styles.iconParent, styles.iconFlexBox]}>
            <Image
              style={styles.icon}
              contentFit="cover"
              source={require("../assets/values.png")}
            />
            <Text style={styles.pageTypo}>Values</Text>
          </View>
          <Pressable
            style={styles.iconFlexBox}
            onPress={() => navigation.navigate("Errors")}
          >
            <Image
              style={styles.icon}
              contentFit="cover"
              source={require("../assets/alarms.png")}
            />
            <Text style={[styles.page2, styles.pageTypo]}>Page 2</Text>
          </Pressable>
          <Pressable
            style={styles.iconFlexBox}
            onPress={() => navigation.navigate("Warnings")}
          >
            <Image
              style={styles.icon}
              contentFit="cover"
              source={require("../assets/warnings.png")}
            />
            <Text style={[styles.page2, styles.pageTypo]}>Page 3</Text>
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
            <Text style={[styles.page2, styles.pageTypo]}>Page 4</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  valuesParent: {
    height: "650",
    width: "100%",
    flexDirection: "row",
  },
  values1: {
    width: 261,
    height: 88,
  },
  frameParentFlexBox: {
    justifyContent: "center",
    width: 241,
    backgroundColor: Color.colorSilver_200,
    padding: Padding.p_3xs,
    flexDirection: "row",
    borderRadius: Border.br_6xl,
    alignItems: "center",
    overflow: "hidden",
  },
  wrapperFlexBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  cTypo: {
    color: Color.black,
    fontFamily: FontFamily.b1,
    fontWeight: "500",
    textAlign: "center",
    fontSize: FontSize.b2_size,
  },
  textTypo: {
    left: 7,
    color: Color.black,
    fontFamily: FontFamily.b1,
    fontWeight: "500",
    textAlign: "center",
    fontSize: FontSize.b2_size,
    position: "absolute",
  },
  iconFlexBox: {
    padding: Padding.p_xs,
    flexDirection: "row",
    alignItems: "center",
  },
  pageTypo: {
    marginLeft: 10,
    textAlign: "left",
    color: Color.black,
    fontFamily: FontFamily.b1B,
    fontWeight: "700",
    fontSize: FontSize.b1_size,
  },
  systemTemperature: {
    width: 136,
    textAlign: "center",
    color: Color.colorBlack,
    fontFamily: FontFamily.b1B,
    fontWeight: "700",
    fontSize: FontSize.b1_size,
  },
  wrapperShadowBox: {
    marginLeft: 6,
    paddingVertical: Padding.p_2xs,
    paddingHorizontal: Padding.p_6xs,
    width: 81,
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
  frameParent: {
    top: 10,
    left: 10,
    padding: Padding.p_2xs,
    position: "absolute",
  },
  values1: {
    width: 261,
    height: 100,
  },
  rectifierStatuesWrapper: {
    width: 124,
  },
  frameChild: {
    left: 3,
    maxHeight: "100%",
    width: 20,
    top: 25,
    position: "absolute",
  },
  text: {
    left: 8,
    top: 1,
    position: "absolute",
  },
  text1: {
    top: 25,
  },
  vectorShadowBox: {
    height: 49,
    width: 26,
    marginLeft: 6,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    backgroundColor: Color.colorDarkslategray,
    borderRadius: Border.br_6xl,
    overflow: "hidden",
  },
  text2: {
    top: 1,
  },
  frameParent2: {
    padding: Padding.p_3xs,
  },
  frameWrapper: {
    padding: Padding.p_3xs,
  },
  valuesParent: {
    width: "76.94%",
    top: 149,
    right: "11.11%",
    bottom: 150,
    left: "11.94%",
    borderRadius: Border.br_xl,
    backgroundColor: Color.colorGainsboro,
    paddingHorizontal: 8,
    paddingVertical: Padding.p_3xs,
    alignItems: "center",
    position: "absolute",
  },
  values6: {
    top: 70,
    left: 39,
    fontSize: FontSize.h1_size,
    fontWeight: "800",
    fontFamily: FontFamily.h1,
    width: 274,
    height: 60,
    textAlign: "left",
    color: Color.colorBlack,
    position: "absolute",
  },
  logoIcon: {
    top: 74,
    right: 35,
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
  iconParent: {
    backgroundColor: Color.colorDimgray,
    borderRadius: Border.br_6xl,
    padding: Padding.p_xs,
  },
  page2: {
    display: "none",
  },
  navi: {
    backgroundColor: Color.colorDarkslategray,
    flexDirection: "row",
    borderRadius: Border.br_xl,
  },
  navigator: {
    marginLeft: -144.5,
    bottom: 46,
    left: "50%",
    height: 54,
    //top: 675,
    position: "absolute",
  },
  values: {
    backgroundColor: Color.black,
    flex: 1,
    width: "100%",
    height: 800,
    overflow: "hidden",
  },
});

export default Values;
// String postData = "temperature=";
// postData += String(temperature);
// postData += "&humidity=";
// postData += String(humidity);
// postData += "&time=";
// postData += String(timeString);
// postData += "Acvolt=";
// postData += String(acVolts);
// postData += "Dcvolt=";
// postData += String(dcVolts);
// postData += "Rect1curr=";
// postData += String(current1_amp);
// postData += "Rect2curr=";
// postData += String(current2_amp);
// postData += "Rect3curr=";
// postData += String(current3_amp);
// postData += "Mainsfail=";
// postData += String(error1);
// postData += "Temperature Shutdown";
// postData += String(error2);
// postData += "O/p DC Low voltage=";
// postData += String(error3);
// postData += "O/p DC Overvoltage=";
// postData += String(error4);
// postData += "Rectifer Failure";
// postData += String(error5);
// postData += "Battery High Temperature=";
// postData += String(error6);
// postData += "Rectifier Power Derate=";
// postData += String(warn1);
// postData += "AC i/p over volt=";
// postData += String(warn2);
// postData += "Load Power Derate=";
// postData += String(warn3);
// postData += "DC i/p over volt=";
// postData += String(warn4);

//new
// String postData = "temperature=";
//     postData += String(temperature);
//     postData += "&humidity=";
//     postData += String(humidity);
//     postData += "&time=";
//     postData += String(timeString);
//     postData += "Acvolt=";
//     postData += String(acVolts);
//     postData += "Dcvolt=";
//     postData += String(dcVolts);
//     postData += "Rect1curr=";
//     postData += String(current1_amp);
//     postData += "Rect2curr=";
//     postData += String(current2_amp);
//     postData += "Rect3curr=";
//     postData += String(current3_amp);
//     postData += "Lowdc=";
//     postData += String(error1);
//     postData += "highac";
//     postData += String(error2);
//     postData += "lowdc46=";
//     postData += String(error3);
//     postData += "highdc=";
//     postData += String(error4);
//     postData += "Mainsfail=";
//     postData += String(error5);
//     postData += "Lowac";
//     postData += String(error6);
//     postData += "wlowac=";
//     postData += String(warn1);
//     postData += "whighac=";
//     postData += String(warn2);
//     postData += "wcriticalloadspdb=";
//     postData += String(warn3);
//     postData += "whighdc54v=";
//     postData += String(warn4);