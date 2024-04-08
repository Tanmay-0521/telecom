import React, { useMemo } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Border, Color, FontSize, FontFamily } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const Start1 = ({
  sTART,
  startPosition,
  startTop,
  startLeft,
  startWidth,
  startHeight,
  startRight,
  startBottom,
  onStartPress,
}) => {
  const startStyle = useMemo(() => {
    return {
      ...getStyleValue("position", startPosition),
      ...getStyleValue("top", startTop),
      ...getStyleValue("left", startLeft),
      ...getStyleValue("width", startWidth),
      ...getStyleValue("height", startHeight),
      ...getStyleValue("right", startRight),
      ...getStyleValue("bottom", startBottom),
    };
  }, [
    startPosition,
    startTop,
    startLeft,
    startWidth,
    startHeight,
    startRight,
    startBottom,
  ]);

  return (
    <View style={[styles.start, startStyle]} onPress={onStartPress}>
      <View style={styles.startChild} />
      <Text style={styles.start1}>{sTART}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  startChild: {
    height: "100%",
    width: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    borderRadius: Border.br_43xl,
    backgroundColor: Color.colorDarkslateblue,
    position: "absolute",
  },
  start1: {
    top: "25.81%",
    left: "24.22%",
    fontSize: FontSize.size_31xl,
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
    color: Color.colorWhite,
    textAlign: "left",
    position: "absolute",
  },
  start: {
    width: 322,
    height: 124,
  },
});

export default Start1;
