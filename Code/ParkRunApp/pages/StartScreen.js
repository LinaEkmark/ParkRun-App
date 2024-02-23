import React, { useState } from "react";
import { View, Text, Button, Image, StyleSheet, TextInput } from "react-native";
import DropdownStart from "../Components/DropdownStart";

export default function DetailsScreen({ navigation }) {
  const [Input, setInput] = useState("");
  const [selectedCity, setSelectedcity] = useState(null);

  const handleInputChange = (Currentinput) => {
    setInput(Currentinput);
  };

  const handleSubmit = () => {
    alert(`You entered: ${Input}`);
  };

  const Cities = [
    { label: "Item 1", value: "1" },
    { label: "Item 2", value: "2" },
    { label: "Item 3", value: "3" },
    { label: "Item 4", value: "4" },
    { label: "Item 5", value: "5" },
    { label: "Item 6", value: "6" },
    { label: "Item 7", value: "7" },
    { label: "Item 8", value: "8" },
  ];

  return (
    <View style={styles.container}>
      <Image
        source={require("../Design/parkrun-seeklogo.png")}
        style={styles.image}
      />
      <Text style={styles.text}>Welcome to the ParkRun</Text>
      <Text style={styles.text}>Volunteer Database!</Text>
      <Text style={styles.text2}>Find your park!</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchbar}
          onChangeText={handleInputChange}
          value={Input}
          placeholder="Sök..."
          placeholderTextColor={"#FFA300"}
        />
        <Button
          title="Sök"
          onPress={handleSubmit}
          style={styles.Dropdownmenu}
        />
      </View>
      <View style={styles.selectList}>
        <Image
          source={require("../Design/swe-flag-400.png")}
          style={styles.dropdownlistimage}
        />
        <DropdownStart
          items={Cities}
          placeholder="test"
          style={styles.Dropdownmenu}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2C233D",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 150,
    alignSelf: "center",
    resizeMode: "contain",
    backgroundColor: "white",
    marginTop: "20%",
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 25,
  },
  text2: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 23,
    marginTop: "5%",
  },
  searchContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  searchbar: {
    height: 40,
    width: "55%",
    borderColor: "#FFA300",
    borderWidth: 3,
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6,
    alignSelf: "center",
    textAlign: "center",
    color: "#FFA300",
  },
  button: {},
  dropdownlistimage: {
    width: "55%",
  },
  Dropdownmenu: {
    height: 40,
    width: "55%",
    borderColor: "#FFA300",
    borderWidth: 3,
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6,
    alignSelf: "center",
    textAlign: "center",
    color: "#FFA300",
  },
});
