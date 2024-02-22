import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import runningScreen from "./pages/MapScreen";
import eventScreen from "./pages/EventScreen";
import startscreen from "./pages/StartScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Start">
          <Stack.Screen
            name="Start"
            component={startscreen}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen name="Running" component={runningScreen}></Stack.Screen>
          <Stack.Screen name="Karta" component={eventScreen}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

// export default function App() {
//   return (
//     <>
//       <View style={styles.container}>
//         <Text>hello</Text>
//         <StatusBar style="auto" />
//       </View>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
