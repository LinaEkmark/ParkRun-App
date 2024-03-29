import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import DropdownStart from "../Components/DropdownStart";
import ButtonStart from "../Components/ButtonStart";
import SearchButtonStart from "../Components/searchButtonStart";
import Logo from "../Design/parkrunAppLogo.png";

export default function StartScreen({ navigation }) {
  const [Input, setInput] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedParkrun, setSelectedParkrun] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [filteredParkruns, setFilteredParkruns] = useState([]);
  const textInputRef = useRef(null);
  const [openFlatList, setopenFlatList] = useState(true);

  const valdPark = [selectedCountry, selectedCity, selectedParkrun];

  const Countries = [
    { label: "Sverige", value: "sverige" },
    { label: "Scottland", value: "scottland" },
    { label: "England", value: "england" },
  ];
  const Cities = [
    { label: "Göteborg", value: "göteborg", key: "sverige" },
    { label: "Stockholm", value: "stockholm", key: "sverige" },
    { label: "London", value: "london", key: "england" },
    { label: "Edinburg", value: "edinburg", key: "scottland" },
  ];

  const Parkruns = [
    { label: "Skatås", value: "skatås", key: "göteborg" },
    { label: "Billdal", value: "billdal", key: "göteborg" },
    { label: "Haga", value: "haga", key: "stockholm" },
    { label: "London", value: "london", key: "london" },
    { label: "Edinburg", value: "edinburg", key: "edinburg" },
    { label: "Stoke", value: "stoke", key: "stoke" },
  ];

  const filterParkruns = (text) => {
    const filteredParkruns = Parkruns.filter((parkrun) =>
      parkrun.label.toLowerCase().startsWith(text.toLowerCase())
    );
    if (filteredParkruns.length === 0) {
      setFilteredParkruns([
        {
          label: "Parkrun saknas",
          value: "parkrun_saknas",
          key: "parkrun_saknas",
        },
      ]);
    } else {
      setFilteredParkruns(filteredParkruns);
    }
  };

  const autocompleteListMaxHeight =
    filteredParkruns.length > 0
      ? Math.min(filteredParkruns.length * 30, 200)
      : 0;

  const sweFlag = "../Design/swe-flag-400.png";

  const handleInputChange = (Currentinput) => {
    setInput(Currentinput);
    filterParkruns(Currentinput);
    setopenFlatList(true);
  };

  const handleSubmit = () => {
    alert(`You entered: ${Input}`);
  };

  function getCities(country) {
    if (country) {
      console.log("Selected country:", country);
      // If Sweden is selected, return only Göteborg and Stockholm
      return Cities.filter((city) => city.key === country);
    } else {
      // If any other country is selected, return all cities
      return Cities;
    }
  }
  function getParkruns(city) {
    if (city) {
      console.log("Selected city:", city);
      // If a city is selected, return parkruns filtered by that city
      return Parkruns.filter((parkrun) => parkrun.key === city);
    } else {
      // If no city is selected, return all parkruns
      return Parkruns;
    }
  }

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.image} />
      <Text style={styles.text}>Welcome to the ParkRun</Text>
      <Text style={styles.text}>Volunteer Database!</Text>
      <Text style={styles.text2}>Find your park!</Text>

      <View style={styles.main}>
        <View style={styles.searchContainer}>
          <TextInput
            ref={textInputRef}
            style={styles.searchbar}
            onChangeText={handleInputChange}
            value={Input}
            placeholder="Sök..."
            placeholderTextColor={"#FFA300"}
          />
          <SearchButtonStart onPress={handleSubmit} style={styles.seachImage} />
        </View>

        <View style={styles.flatlistBox}>
          {Input.length > 0 && openFlatList && (
            <FlatList
              style={[
                styles.autocompleteList,
                { maxHeight: autocompleteListMaxHeight },
              ]}
              data={filteredParkruns}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.flatListItemContainer}
                  onPress={() => {
                    setSelectedParkrun(item);
                    setInput(item.label); // Update TextInput value
                    textInputRef.current.blur(); // Hide keyboard
                    setopenFlatList(false);
                  }}
                >
                  <Text style={styles.FlatlistItemText}>{item.label}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.value}
            />
          )}
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
        <View style={[styles.dropdownsections, { marginBottom: "8%" }]}>
          <Image source={require(sweFlag)} style={styles.dropdownlistimage} />
          <DropdownStart
            items={getParkruns(selectedCity)}
            placeholder="Välj Parkrun"
            initialValue={selectedParkrun}
            onValueChange={setSelectedParkrun}
          />
        </View>
        <View>
          <ButtonStart
            onPress={
              () => navigation.navigate("Event Screen")

              // navigation.navigate("Event Screen", {
              //   selectedCountry: selectedCountry,
              //   selectedCity: selectedCity,
              //   selectedParkrun: selectedParkrun,
              // })
            }
            title="Confirm"
            buttonStyle={styles.confirmbutton}
            textStyle={styles.textConfirmButton}
          ></ButtonStart>
        </View>
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
    width: "100%",
    height: "20%",
    alignSelf: "center",
    resizeMode: "contain",
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
    alignItems: "center",
  },
  searchbar: {
    height: "70%",
    width: "55%",
    borderColor: "#FFA300",
    borderWidth: 1,
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6,
    alignSelf: "center",
    textAlign: "center",
    color: "#FFA300",
    fontSize: 25,
    fontWeight: "bold",
  },
  seachImage: {
    borderWidth: 1,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderColor: "#FFA330",
    maxHeight: "70%",
    maxWidth: 100,
    justifyContent: "center",
    alignItems: "center",

    //overflow: "hidden",
  },
  dropdownsections: {
    flexDirection: "row",
    marginTop: "5%",
  },
  dropdownlistimage: {
    width: "15%",
    resizeMode: "contain",
    borderColor: "#FFA300",
    borderWidth: 1,
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6,
    maxHeight: 40,
  },
  flatlistBox: {
    marginRight: "25%",
    width: "55%",
  },
  autocompleteList: {
    backgroundColor: "#2C233D",
    borderColor: "#FFA300",
    borderWidth: 3,
    borderRadius: 4,
  },
  flatListItemContainer: {
    alignItems: "center", // Horizontally center the content
  },
  FlatlistItemText: {
    color: "#FFA300",
    marginHorizontal: 20,
    fontSize: 16,
  },
  confirmbutton: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: "15%",
    paddingVertical: "5%",
    borderRadius: 6,
    elevation: 3,
    backgroundColor: "#00CEAE",
  },
  textConfirmButton: {
    fontSize: 34,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#2B233D",
  },
});
