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
            placeholder="Sök..."
            placeholderTextColor={"#FFA300"}
          />
          <Button
            title="Sök"
            onPress={handleSubmit}
            style={styles.Button}
          ></Button>
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
            backgroundColor="#dfdfdf"
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
    width: "55%",
    borderColor: "#FFA300",
    borderWidth: 3,
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6,
    alignSelf: "center",
    textAlign: "center",
    color: "#FFA300",
  },
  Button: {},
  dropdownlists: {
    marginTop: 10,
    height: 40,
    width: "50%",
    borderCurve: "continuous",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "",
  },
  dropdownlistimage: {
    marginTop: "5%",
    width: "35%",
    height: "110%",
    alignSelf: "center",
    resizeMode: "contain",
    borderWidth: 3,
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6,
    borderColor: "#FFA300",
  },
});
