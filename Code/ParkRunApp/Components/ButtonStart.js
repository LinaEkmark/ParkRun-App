import React from "react";
import { Text, Pressable } from "react-native";

export default function ButtonStart(props) {
  const { onPress, title, buttonStyle, textStyle } = props;
  return (
    <Pressable style={buttonStyle} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </Pressable>
  );
}
