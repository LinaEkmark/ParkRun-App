import React from "react";
import { Text, View, Button, StyleSheet, Modal, TextInput } from "react-native";
import CheckBox from "../Components/CheckBox";

//import { CustomFonts } from './ParkRunFont'; // Behöver hjälp i hur jag ska importera egen font

export default function SandboxScreen({ navigation, route }) {
  const { selectedCountry, selectedCity, selectedParkrun } = route.params;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={styles.container}>
        <View style={styles.MapBox}></View>
        <Button title={selectedCountry}></Button>
        <Button title={selectedCity}></Button>
        <Button title={selectedParkrun}></Button>
        <View>
          <CheckBox text="Check 1 - Ant hill" modalHeaderText="Myrstacken" />
          <CheckBox text="Check 2 - Old Tree" modalHeaderText="Gamla trädet" />
          <CheckBox text="Check 3 - Power Line" modalHeaderText="Elledningen" />
          <CheckBox text="Check 4 - Sign" modalHeaderText="Skylten" />
          <CheckBox text="Check 5 - Bush" modalHeaderText="Busken" />
          <CheckBox
            text="Check 6 - Large Rock"
            modalHeaderText="Stora stenen"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  MapBox: {
    width: 355,
    height: 334,
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    borderRadius: 10, // Gör såhär för att få snyggare hörn på boxar
  },
});
