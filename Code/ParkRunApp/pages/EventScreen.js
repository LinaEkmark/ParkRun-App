// Page1.js
import React from "react";
import { Text, View, Button, StyleSheet, Modal, TextInput} from "react-native";
import CheckBox from "../Components/CheckBox";
//import Dropdown from './DropDown';
//import { StatusBar } from 'expo-status-bar';

//import { CustomFonts } from './ParkRunFont'; // Behöver hjälp i hur jag ska importera egen font


export default function SandboxScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <View style={styles.container}> 
      <View style={styles.MapBox}>

      </View>
    
      <View>
        <CheckBox text="Check 1 - Ant hill"/>
        <CheckBox text="Check 2 - Old Tree"/>
        <CheckBox text="Check 3 - Power Line"/>
        <CheckBox text="Check 4 - Sign"/>
        <CheckBox text="Check 5 - Bush"/>
        <CheckBox text="Check 6 - Large Rock"/>

      </View>

    </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  MapBox: {
    width: 355,
    height: 334,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    borderRadius: 10, // Gör såhär för att få snyggare hörn på boxar
  
  },

});