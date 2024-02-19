// Page1.js
import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default function DetailsScreen({ navigation }) {
  const [Input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Sverige", value: "sve" },
    { label: "England", value: "eng" },
  ]);

  const handleInputChange = (Currentinput) => {
    setInput(Currentinput);
  };

  const handleSubmit = () => {
    alert(`You entered: ${Input}`);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#2C233D" }}>
      <View style={{ marginTop: "20%", backgroundColor: "white" }}>
        <Image
          source={require("../Design/parkrun-seeklogo.png")}
          style={styles.image}
        ></Image>
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={styles.Text}>Welcome to the ParkRun</Text>
        <Text style={styles.Text}>Volunteer Database!</Text>
        <Text style={styles.Text2}>Find your park!</Text>

        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={styles.searchbar}
            onChangeText={handleInputChange}
            value={Input}
            defaultValue={"Search..."}
          />
          <Button title="Submit" onPress={handleSubmit}></Button>
        </View>
        <View style={styles.dropdownlists}>
          <Image
            source={require("../Design/swe-flag-400.png")}
            style={styles.dropdownlistimage}
          />
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="Välj Land"
            dropDownContainerStyle={{
              backgroundColor: "#dfdfdf",
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 150,
    alignSelf: "center",
    resizeMode: "contain",
  },
  view: {
    flex: 1,
  },
  Text: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 25,
  },
  Text2: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 23,
    marginTop: "5%",
  },
  searchbar: {
    height: 40,
    width: "50%",
    borderColor: "#FFA300",
    borderWidth: 2,
    borderCurve: "continuous",
    alignSelf: "center",
  },
  dropdownlistimage: {
    width: "30%",
    alignSelf: "center",
    resizeMode: "contain",
    borderWidth: 2,
    borderColor: "#FFA300",
  },
  dropdownlists: {
    height: 40,
    width: "50%",
    borderCurve: "continuous",
    justifyContent: "center",
    flexDirection: "row",
  },
});
