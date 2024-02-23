// Page1.js
import React from "react";
import { Text, View, Button } from "react-native";
import DropdownStart from "../Components/DropdownStart";

export default function SandboxScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <DropdownStart
        items={[
          { label: "Item 1", value: "1" },
          { label: "Item 2", value: "2" },
          { label: "Item 3", value: "3" },
          { label: "Item 4", value: "4" },
          { label: "Item 5", value: "5" },
          { label: "Item 6", value: "6" },
          { label: "Item 7", value: "7" },
          { label: "Item 8", value: "8" },
        ]}
        placeholder="test"
      ></DropdownStart>
    </View>
  );
}

// <Text>Event Screen</Text>
//       <Button
//         title="Go back to first screen in stack"
//         onPress={() => navigation.popToTop()}
//       />
