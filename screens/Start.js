import * as React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Start1 from "../components/Start1";
import { Color } from "../GlobalStyles";
import Menu from "./Menu";

const Start = () => {
  const navigation = useNavigation();
  

  return (
    <View style={styles.start}>
      <Start1
        sTART="START"
        startPosition="absolute"
        startTop={338}
        startLeft={19}
        startWidth={322}
        startHeight={124}
        startRight="unset"
        startBottom="unset"
        onStartPress={() => navigation.navigate(Menu)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  start: {
    backgroundColor: Color.colorSteelblue,
    flex: 1,
    width: "100%",
    height: 800,
    overflow: "hidden",
  },
});

export default Start;
