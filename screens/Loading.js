import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { Color } from "../GlobalStyles";

const Loading = () => {
  return (
    <View style={styles.loading}>
      <Image
        style={styles.logoIcon}
        contentFit="cover"
        source={require("../assets/logo1.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  logoIcon: {
    position: "absolute",
    marginTop: -96,
    marginLeft: -96,
    top: "50%",
    left: "50%",
    width: 191,
    height: 191,
  },
  loading: {
    backgroundColor: Color.black,
    flex: 1,
    width: "100%",
    height: 800,
    overflow: "hidden",
  },
});

export default Loading;
