// const Stack = createNativeStackNavigator();
// import * as React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { useFonts } from "expo-font";
// import Start from "./screens/Start";
// import Menu from "./screens/Menu";
// import Values from "./screens/Values";
// import Errors from "./screens/Errors";
// import Warnings from "./screens/Warnings";
// import Start1 from "./components/Start1";
// import 'react-native-gesture-handler';


// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { View, Text, Pressable, TouchableOpacity } from "react-native";

// const App = () => {
//   const [hideSplashScreen, setHideSplashScreen] = React.useState(true);

//   const [fontsLoaded, error] = useFonts({
//     "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
//   });

//   if (!fontsLoaded && !error) {
//     return null;
//   }

//   return (
//     <>
//       <NavigationContainer>
//         {/* {hideSplashScreen ? ( */}
//           <Stack.Navigator /*screenOptions={{ headerShown: false }}*/>
//             <Stack.Screen
//               name="Start"
//               component={Start}
//               // options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="Menu"
//               component={Menu}
//               // options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="Values"
//               component={Values}
//               // options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="Errors"
//               component={Errors}
//               // options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="Warnings"
//               component={Warnings}
//               // options={{ headerShown: false }}
//             />
//           </Stack.Navigator>
//         {/* ) : null} */}
//       </NavigationContainer>
//     </>
//   );
// };
// export default App;

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import Start from "./screens/Start";
import Menu from "./screens/Menu";
import Values from "./screens/Values";
import Errors from "./screens/Errors";
import Warnings from "./screens/Warnings";
import 'react-native-gesture-handler';
import Graph from "./screens/Graph";

const Stack = createNativeStackNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null; // Return null while fonts are loading
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // Hide header for all screens
        }}
        initialRouteName="Menu" // Set initial route
      >
        {/* <Stack.Screen name="Start" component={Start} /> */}
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Values" component={Values} />
        <Stack.Screen name="Errors" component={Errors} />
        <Stack.Screen name="Warnings" component={Warnings} />
        {/* <Stack.Screen name="Graph" component={Graph} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

