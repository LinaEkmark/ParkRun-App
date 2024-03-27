import React from "react";
import { Text, Pressable } from "react-native";

const ButtonStart = ({ onPress, title, buttonStyle, textStyle }) => {
  return (
    <Pressable style={buttonStyle} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </Pressable>
  );
};
export default ButtonStart;
