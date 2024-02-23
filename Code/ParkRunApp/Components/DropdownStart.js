import React, { useState } from "react";
import { Platform, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";

const DropdownStart = ({ items, placeholder }) => {
  const [selectedValue, setSelectedValue] = useState("");

  return (
    items &&
    items.length > 0 && (
      <RNPickerSelect
        onValueChange={(value) => setSelectedValue(value)}
        items={items}
        style={pickerSelectStyles}
        placeholder={{
          label: placeholder,
          value: null,
        }}
        value={selectedValue}
        useNativeAndroidPickerStyle={false}
      />
    )
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingRight: 30, // to ensure the text is never behind the icon
    height: 40,
    borderColor: "#FFA300",
    borderWidth: 3,
    borderBottomRightRadius: 6,
    borderTopRightRadius: 6,
    alignSelf: "center",
    textAlign: "center",
    color: "#FFA300",
  },
});

export default DropdownStart;
