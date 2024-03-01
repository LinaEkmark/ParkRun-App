import React, { useState } from "react";
import { View, Text, Button, Image, StyleSheet, TextInput } from "react-native";
import DropdownStart from "../Components/DropdownStart";

export default function DetailsScreen({ navigation }) {
  const [Input, setInput] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedParkrun, setSelectedParkrun] = useState(null);

  const valdPark = [selectedCountry, selectedCity, selectedParkrun];

  const Countries = [
    { label: "Sverige", value: "sverige" },
    { label: "Scottland", value: "scottland" },
    { label: "England", value: "england" },
  ];
  const Cities = [
    { label: "Göteborg", value: "göteborg", key: "sverige" },
    { label: "Stockholm", value: "stockholm", key: "sverige" },
    { label: "London", value: "London" },
  ];

  const Parkrun = [
    { label: "Skatås", value: "skatås", key: "göteborg" },
    { label: "Billdal", value: "billdal", key: "göteborg" },
  ];

  const sweFlag = "../Design/swe-flag-400.png";

  const handleInputChange = (Currentinput) => {
    setInput(Currentinput);
  };

  const handleSubmit = () => {
    alert(`You entered: ${Input}`);
  };

  function getCities(country) {
    if (country === "sverige") {
      // If Sweden is selected, return only Göteborg and Stockholm
      return Cities.filter((city) => city.key === "sverige");
    } else {
      // If any other country is selected, return all cities
      return Cities;
    }
  }
  function getParkruns(city) {
    if (city === "Göteborg") {
      // If Sweden is selected, return only Göteborg and Stockholm
      return Parkrun.filter((parkrun) => parkrun.key === "göteborg");
    } else {
      // If any other country is selected, return all cities
      return Cities;
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../Design/parkrun-seeklogo.png")}
        style={styles.image}
      />
      <Text style={styles.text}>Welcome to the ParkRun</Text>
      <Text style={styles.text}>Volunteer Database!</Text>
      <Text style={styles.text2}>Find your park!</Text>

      <View style={styles.main}>
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
        <View style={styles.dropdownsections}>
          <Image source={require(sweFlag)} style={styles.dropdownlistimage} />
          <DropdownStart
            items={Countries}
            placeholder="Välj Land"
            initialValue={selectedCountry}
            onValueChange={setSelectedCountry}
          />
        </View>
        <View style={styles.dropdownsections}>
          <Image source={require(sweFlag)} style={styles.dropdownlistimage} />
          <DropdownStart
            items={getCities(selectedCountry)}
            placeholder="Välj Stad"
            initialValue={selectedCity}
            onValueChange={setSelectedCity}
          />
        </View>
        <View style={styles.dropdownsections}>
          <Image source={require(sweFlag)} style={styles.dropdownlistimage} />
          <DropdownStart
            items={getParkruns(Parkrun)}
            placeholder="Välj Parkrun"
            initialValue={selectedParkrun}
            onValueChange={setSelectedParkrun}
          />
        </View>

        <Button
          title="Hitta Parkrun"
          onPress={console.log({ valdPark })}
        ></Button>
      </View>
      <View>
        <Button
          title="Next page"
          onPress={() => navigation.navigate("Event Screen")}
        ></Button>
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
  main: {
    width: "100%",
    flex: 1,
    alignItems: "center",
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
  dropdownsections: {
    flexDirection: "row",
    marginTop: 20,
  },
  dropdownlistimage: {
    width: "15%",
    resizeMode: "contain",
    borderColor: "#FFA300",
    borderWidth: 3,
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6,
    maxHeight: 40,
  },
});
