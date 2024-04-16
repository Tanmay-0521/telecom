import * as React from "react";
import { Text, StyleSheet, View, Pressable,ScrollView } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Padding, Border } from "../GlobalStyles";

const Errors = () => {
  const navigation = useNavigation();

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
              <Text style={styles.c}>0</Text>
            </View>
          </View>
        </View>
        <View style={styles.values}>
          <View style={styles.frameParent}>
            <View style={styles.systemTemperatureWrapper}>
              <Text style={styles.systemTemperature}>Low AC Voltage</Text>
            </View>
            <View style={styles.wrapperShadowBox}>
              <Text style={styles.c}>0</Text>
            </View>
          </View>
        </View>
        <View style={styles.values}>
          <View style={styles.frameParent}>
            <View style={styles.systemTemperatureWrapper}>
              <Text style={styles.systemTemperature}>High AC Voltage</Text>
            </View>
            <View style={styles.wrapperShadowBox}>
              <Text style={styles.c}>0</Text>
            </View>
          </View>
        </View>
        <View style={styles.values}>
          <View style={styles.frameParent}>
            <View style={styles.systemTemperatureWrapper}>
              <Text style={styles.systemTemperature}>Low DC Voltage</Text>
            </View>
            <View style={styles.wrapperShadowBox}>
              <Text style={styles.c}>0</Text>
            </View>
          </View>
        </View>
        <View style={styles.values}>
          <View style={styles.frameParent}>
            <View style={styles.systemTemperatureWrapper}>
              <Text style={styles.systemTemperature}>High DC Voltage</Text>
            </View>
            <View style={styles.wrapperShadowBox}>
              <Text style={styles.c}>0</Text>
            </View>
          </View>
        </View>
        <View style={styles.values}>
          <View style={styles.frameParent}>
            <View style={styles.systemTemperatureWrapper}>
              <Text style={styles.systemTemperature}>Battery Low</Text>
            </View>
            <View style={styles.wrapperShadowBox}>
              <Text style={styles.c}>0</Text>
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
              <Text style={styles.c}>0</Text>
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
  pageTypo: {
    marginLeft: 10,
    textAlign: "left",
    color: Color.black,
    fontFamily: FontFamily.b1B,
    fontWeight: "700",
    fontSize: FontSize.b1_size,
  },
  iconFlexBox: {
    padding: Padding.p_xs,
    flexDirection: "row",
    alignItems: "center",
  },
  systemTemperature: {
    width: 136,
    textAlign: "center",
    color: Color.colorBlack,
    fontFamily: FontFamily.b1B,
    fontWeight: "700",
    fontSize: FontSize.b1_size,
  },
  systemTemperatureWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  c: {
    fontWeight: "500",
    fontFamily: FontFamily.b1,
    color: Color.black,
    textAlign: "center",
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
    backgroundColor: Color.colorSilver_200,
    width: 241,
    padding: Padding.p_3xs,
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: Border.br_6xl,
    alignItems: "center",
    position: "absolute",
    overflow: "hidden",
  },
  values: {
    width: 261,
    height: 88,
  },
  valuesParent: {
    width: "75.83%",
    top: 145,
    right: "12.22%",
    bottom: 153,
    left: "11.94%",
    borderRadius: Border.br_xl,
    backgroundColor: Color.colorGainsboro,
    paddingHorizontal: 6,
    paddingVertical: Padding.p_6xs,
    alignItems: "center",
    position: "absolute",
  },
  alarms: {
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
  logoIcon: {
    top: 74,
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
  navigator: {
    marginLeft: -148,
    bottom: 46,
    left: "50%",
    flexDirection: "row",
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
