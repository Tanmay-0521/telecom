import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {Border, Padding, FontSize, FontFamily, Color } from "../GlobalStyles";
import axios from 'axios'; // Import axios directly
// import { useFonts } from "expo-font";
import { useState, useEffect } from 'react';
const channelId = 2409420;
const serverUrl = 'http://192.168.0.105:3000';

const Values = () => {
  const navigation = useNavigation();
  const [temperature, setTemperature] = useState('');
  const [humidity, setHumidity] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${serverUrl}/`);
      const { data } = response;
      setTemperature(data[0]?.data[0]?.temperature); // Access temperature data from the response
      setHumidity(data[1]?.data[1]?.humidity); // Access humidity data from the response
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.values}>
      <Pressable style={styles.valuesInner} onPress={() => navigation.navigate('Menu')}>
        <Image
          style={styles.frameChild}
          contentFit="cover"
          source={require('../assets/arrow-1.png')}
        />
      </Pressable>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <Text style={[styles.text, styles.voltageTypo]}>Temp: {temperature}°C</Text>
          <Text style={[styles.text, styles.voltageTypo]}>Humidity: {humidity}</Text>
          <Text style={[styles.text, styles.text5Typo]}>Total Current: </Text>
          <Text style={[styles.text, styles.voltageTypo]}>Battery Current: </Text>
          <Text style={styles.rectifierStatus}>Rectifier Status: </Text>
          <View style={[styles.valuesChild, styles.valuesChildLayout]} />
          <View style={[styles.valuesItem, styles.valuesPosition]} />
          <View style={[styles.rectangleView, styles.valuesPosition]} />
          <View style={[styles.valuesChild1, styles.valuesPosition]} />
          <View style={[styles.valuesChild2, styles.valuesChildLayout]} />
          <View style={[styles.valuesChild3, styles.valuesChildLayout]} />
          <View style={[styles.valuesChild4, styles.valuesChildLayout]} />
          <Text style={[styles.text, styles.textTypo1]}>{temperature}</Text>
          <Text style={[styles.text, styles.textTypo]}>1</Text>
          <Text style={[styles.text, styles.textTypo]}>1</Text>
          <Text style={[styles.text, styles.textTypo]}>1</Text>
          <Text style={[styles.text, styles.textTypo1]}>2</Text>
          <Text style={[styles.text, styles.text5Typo]}>{humidity}</Text>
          <Text style={[styles.text, styles.voltageTypo]}>0000</Text>
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  voltageTypo: {
    textAlign: "left",
    color: Color.colorWhite,
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    fontSize: FontSize.size_6xl,
    position: "absolute",
  },
  text5Typo: {
    top: "45.75%",
    textAlign: "left",
    color: Color.colorWhite,
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    fontSize: FontSize.size_6xl,
    position: "absolute",
  },
  valuesChildLayout: {
    backgroundColor: Color.colorDarkslateblue,
    borderRadius: Border.br_6xl,
    width: "26.94%",
    height: "7.63%",
    position: "absolute",
  },
  valuesPosition: {
    bottom: "25.13%",
    top: "69.88%",
    width: "9.44%",
    height: "5%",
    backgroundColor: Color.colorDarkslateblue,
    borderRadius: Border.br_6xl,
    position: "absolute",
  },
  textTypo1: {
    left: "52.78%",
    textAlign: "left",
    color: Color.colorWhite,
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    fontSize: FontSize.size_6xl,
    position: "absolute",
  },
  textTypo: {
    textAlign: "center",
    top: "70.5%",
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
  valuesInner: {
    top: 705,
    left: 149,
    padding: Padding.p_3xs,
    position: "absolute",
  },
  dcVoltage: {
    left: "5.83%",
    top: "21%",
  },
  acVoltage: {
    top: "33.38%",
    left: "5.83%",
  },
  totalCurrent: {
    left: "5.83%",
  },
  batteryCurrent: {
    top: "58.13%",
    left: "5.83%",
  },
  rectifierStatus: {
    top: "70.5%",
    textAlign: "left",
    color: Color.colorWhite,
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    fontSize: FontSize.size_6xl,
    left: "5.83%",
    position: "absolute",
  },
  valuesChild: {
    top: "19.13%",
    bottom: "73.25%",
    left: "48.89%",
    right: "24.17%",
    backgroundColor: Color.colorDarkslateblue,
    borderRadius: Border.br_6xl,
    width: "26.94%",
    height: "7.63%",
  },
  valuesItem: {
    right: "27.78%",
    left: "62.78%",
  },
  rectangleView: {
    right: "16.94%",
    left: "73.61%",
  },
  valuesChild1: {
    right: "6.11%",
    left: "84.44%",
  },
  valuesChild2: {
    top: "31.5%",
    bottom: "60.88%",
    left: "48.89%",
    right: "24.17%",
    backgroundColor: Color.colorDarkslateblue,
    borderRadius: Border.br_6xl,
    width: "26.94%",
    height: "7.63%",
  },
  valuesChild3: {
    top: "43.88%",
    right: "17.78%",
    bottom: "48.5%",
    left: "55.28%",
    backgroundColor: Color.colorDarkslateblue,
    borderRadius: Border.br_6xl,
    width: "26.94%",
    height: "7.63%",
  },
  valuesChild4: {
    top: "56.13%",
    right: "9.44%",
    bottom: "36.25%",
    left: "63.61%",
    backgroundColor: Color.colorDarkslateblue,
    borderRadius: Border.br_6xl,
    width: "26.94%",
    height: "7.63%",
  },
  text: {
    top: "21%",
  },
  text1: {
    left: "65.56%",
  },
  text2: {
    left: "76.39%",
  },
  text3: {
    left: "87.22%",
  },
  text4: {
    top: "33.38%",
  },
  text5: {
    left: "59.17%",
  },
  text6: {
    top: "58%",
    left: "67.5%",
  },
  values: {
    backgroundColor: Color.colorSteelblue,
    flex: 1,
    width: "100%",
    height: 800,
    overflow: "hidden",
  },
});

export default Values;
