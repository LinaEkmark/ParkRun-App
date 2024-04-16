import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  Modal,
  TextInput,
  ScrollView,
} from "react-native";
import CheckBox from "../Components/CheckBox";
import MapView, { Marker, Callout, Polyline } from "react-native-maps";

import colours from "../config/colours";
//import { CustomFonts } from './ParkRunFont'; // Behöver hjälp i hur jag ska importera egen font


//Database things
import {collection, getDocs, query, where} from "firebase/firestore"
import db from "../Firebase/firebase"

export default function MapScreen({ navigation, route }) {
  //load the parkrun from the previous screen
  const { selectedParkrun } = route.params;

  //empty array to store the text for the checkboxes
  const [checkBoxText, setCheckBoxText] = useState([]);

  //data fetch from correct parkrun document
  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "Parkruns/parkruns-info/" + selectedParkrun));
      const querySnapshot = await getDocs(q);
      let checkBoxText = [];
  
      querySnapshot.forEach((doc) => {
        const checkBoxData = doc.data().checkBoxText;
        // Get the keys and sort them
        const sortedKeys = Object.keys(checkBoxData).sort();
        // Iterate over the sorted keys and push each key's value into the checkBoxText array
        sortedKeys.forEach((key) => {
          checkBoxText.push(checkBoxData[key]);
        });
      });
  
      console.log(checkBoxText);
      setCheckBoxText(checkBoxText);
    };
  
    fetchData();
  }, []);


  const [region, setRegion] = useState({
    latitude: 57.7075,
    longitude: 11.9675,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  const regionPositions = {
    skatås: {
      latitude: 57.7054,
      longitude: 12.0406,
      latitudeDelta: 0.007,
      longitudeDelta: 0.007,
    },
    billdal: {
      latitude: 58.7054,
      longitude: 12.0406,
      latitudeDelta: 0.007,
      longitudeDelta: 0.007,
    },
  };

  // const checkBoxText = [
  //   ["Check 1 - Ant hill", "Myrstacken"],
  //   ["Check 2 - Old Tree", "Gamla trädet"],
  //   ["Check 3 - Power Line", "Elledningen"],
  //   ["Check 4 - Sign", "Skylten"],
  //   ["Check 5 - Bush", "Busken"],
  //   ["Check 6 - Large Rock", "Stora stenen"],
  // ];

  function checkBoxes() {
    return checkBoxText.map((text, index) => (
      <CheckBox key={index} text={text[0]} modalHeaderText={text[1]} />
    ));
  }

  function getRegionPosition(parkrun) {
    return regionPositions[parkrun];
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={styles.container}>
          <MapView
            style={styles.MapBox}
            initialRegion={getRegionPosition(selectedParkrun)}
            onRegionChangeComplete={(region) => setRegion(region)}
          >
            <Marker
              coordinate={skat0}
              pinColor={colours.secondary}
              onPress={(e) => console.log(e.nativeEvent)}
            >
              <Callout>
                <Text>Hej</Text>
              </Callout>
            </Marker>
            <Polyline
              coordinates={[skat0, skat1, skat2, skat3]}
              strokeColor={colours.primary}
              strokeWidth={3}
              lineDashPattern={[5, 1]}
            />
          </MapView>
          <Text>lat: {region.latitude.toFixed(4)}</Text>
          <Text>long: {region.longitude.toFixed(4)}</Text>
          {/* <View>overflow: "hidden", 
            <CheckBox text="Check 1 - Ant hill" modalHeaderText="Myrstacken" />
            <CheckBox
              text="Check 2 - Old Tree"
              modalHeaderText="Gamla trädet"
            />
            <CheckBox
              text="Check 3 - Power Line"
              modalHeaderText="Elledningen"
            />
            <CheckBox text="Check 4 - Sign" modalHeaderText="Skylten" />
            <CheckBox text="Check 5 - Bush" modalHeaderText="Busken" />
            <CheckBox
              text="Check 6 - Large Rock"
              modalHeaderText="Stora stenen"
            />
          </View> */}
          <View style={styles.checkBoxContainer}>{checkBoxes()}</View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
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

const skat0 = {
  latitude: 57.7047,
  longitude: 12.037,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};
const skat1 = {
  latitude: 57.7075,
  longitude: 12.0408,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};
const skat2 = {
  latitude: 57.7047,
  longitude: 12.0447,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};
const skat3 = {
  latitude: 57.7047,
  longitude: 12.037,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};
