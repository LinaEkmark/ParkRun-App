// Page1.js
import React from "react";
import { View, Text, Button } from "react-native";

export default function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Running Screen</Text>
      <Button
        title="Go to sandbox"
        onPress={() => navigation.navigate("Event")}
      ></Button>
    </View>
  );
}
