import React from "react";
import { TouchableOpacity, Image, View } from "react-native";
import searchLogo from "../Design/searchLogowhite.png";

const SearchButtonStart = ({ onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Image
        source={searchLogo}
        style={{
          resizeMode: "contain",
          transform: [{ rotate: "90deg" }],
          maxWidth: "70%",
          maxHeight: "97%",
        }}
      />
    </TouchableOpacity>
  );
};

export default SearchButtonStart;
