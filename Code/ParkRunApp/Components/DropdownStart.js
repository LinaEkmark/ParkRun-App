import React, { useState } from "react";
import { StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";

const DropdownStart = ({ items, placeholder, initialValue, onValueChange }) => {
  const [selectedValue, setSelectedValue] = useState(initialValue);

  const handleChange = (value) => {
    setSelectedValue(value);
    console.log("valuet är  :" + value);
    onValueChange(value);
  };
  return (
    items &&
    items.length > 0 && (
      <RNPickerSelect
        onValueChange={(value) => handleChange(value)}
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
    paddingHorizontal: "15%", // to ensure the text is never behind the icon
    height: 40,
    borderColor: "#FFA300",
    borderWidth: 1,
    borderBottomRightRadius: 6,
    borderTopRightRadius: 6,
    alignSelf: "center",
    textAlign: "center",
    color: "#FFA330",
  },
});

export default DropdownStart;
