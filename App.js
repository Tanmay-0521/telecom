const Stack = createNativeStackNavigator();
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import RealTimeGraphsScreen from "./screens/RealTimeGraphsScreen ";
import Start from "./screens/Start";
import Loading from "./screens/Loading";
import Values from "./screens/Values";
import Errors from "./screens/Errors";
import Warnings from "./screens/Warnings";
import About from "./screens/About";
import PressableMenu from "./screens/PressableMenu";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable, TouchableOpacity } from "react-native";

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);

  const [fontsLoaded, error] = useFonts({
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
    "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
    "Inter-ExtraBold": require("./assets/fonts/Inter-ExtraBold.ttf"),
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <>
      <NavigationContainer>
        {hideSplashScreen ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* <Stack.Screen
              name="Loading"
              component={Loading}
              options={{ headerShown: false }}
            /> */}
            <Stack.Screen
              name="Start"
              component={Start}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PressableMenu"
              component={PressableMenu}
              options={{ headerShown: false }}
            />
             <Stack.Screen
              name="RealTimeGraphsScreen"
              component={RealTimeGraphsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Values"
              component={Values}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Errors"
              component={Errors}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Warnings"
              component={Warnings}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="About"
              component={About}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        ) : null}
      </NavigationContainer>
    </>
  );
};
export default App;
