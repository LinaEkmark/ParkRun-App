import React, { useState } from "react";
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
import KMLReader from "../Utils/KMLreader";

import colours from "../config/colours";
//import { CustomFonts } from './ParkRunFont'; // Behöver hjälp i hur jag ska importera egen font

export default function MapScreen({ navigation, route }) {
  const { selectedParkrun } = route.params;

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

  const [region, setRegion] = useState(regionPositions[selectedParkrun]);

  const routeCoordinates = [
    { latitude: 57.7047, longitude: 12.037 },
    { latitude: 57.7075, longitude: 12.0408 },
    { latitude: 57.7047, longitude: 12.0447 },
    { latitude: 57.7047, longitude: 12.037 },
  ];

  const markers = [
    { coordinate: { latitude: 57.7047, longitude: 12.037 }, title: "Marker 1" },
    {
      coordinate: { latitude: 57.7075, longitude: 12.0408 },
      title: "Marker 2",
    },
    {
      coordinate: { latitude: 57.7047, longitude: 12.0447 },
      title: "Marker 3",
    },
  ];

  const checkBoxText = {
    "Check 1 - Ant hill": "Myrstacken",
    "Check 2 - Old Tree": "Gamla trädet",
    "Check 3 - Power Line": "Elledningen",
    "Check 4 - Sign": "Skylten",
    "Check 5 - Bush": "Busken",
    "Check 6 - Large Rock": "Stora stenen",
  };

  function checkBoxes() {
    return Object.entries(checkBoxText).map(([text, modalHeaderText]) => (
      <CheckBox key={text} text={text} modalHeaderText={modalHeaderText} />
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
            {markers.map((marker, index) => (
              <Marker
                key={index}
                coordinate={marker.coordinate}
                title={marker.title}
              >
                <Callout>
                  <Text>{marker.title}</Text>
                </Callout>
              </Marker>
            ))}
            <Polyline
              coordinates={routeCoordinates}
              strokeColor={colours.primary}
              strokeWidth={3}
              lineDashPattern={[5, 1]}
            />
          </MapView>
          <Text>lat: {region.latitude.toFixed(4)}</Text>
          <Text>long: {region.longitude.toFixed(4)}</Text>
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
