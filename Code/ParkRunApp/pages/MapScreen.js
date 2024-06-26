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
import * as Location from "expo-location";

import colours from "../config/colours";

//Database things
import { collection, getDocs, query, where } from "firebase/firestore";
import db from "../Firebase/firebase";

export default function MapScreen({ navigation, route }) {
  //load the parkrun from the previous screen
  const { selectedParkrun } = route.params;

  //empty array to store the text for the checkboxes
  const [checkBoxText, setCheckBoxText] = useState([]);
  const [region, setRegion] = useState(null);
  const latDelta = 0.015;
  const longDelta = 0.015;

  const reee = [
    { latitude: 57.7035863, longitude: 12.0378259 },
    { latitude: 57.7036843, longitude: 12.0380968 },
  ];

  const [track, setTrack] = useState([reee]);
  const [marks, setMarks] = useState([
    {
      latitude: reee[0].latitude,
      longitude: reee[0].longitude,
      name: "null",
      description: "null",
    },
  ]);

  //loading state
  const [isLoading, setIsLoading] = useState(true);

  //data fetch from correct parkrun document
  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(db, "Parkruns/parkruns-info/" + selectedParkrun)
        );
        const querySnapshot = await getDocs(q);
        let checkBoxText = [];
        let regionPosition = {};
        let importedTrack = [];
        let importedMarks = [];

        querySnapshot.forEach(async (doc) => {
          const checkBoxData = doc.data().checkBoxText;
          const location = doc.data().location;
          importedTrack.push(doc.data().track);
          importedMarks.push(doc.data().marks);

          // Set the regionPosition as an object directly
          regionPosition = {
            latitude: location.latitude,
            longitude: location.longitude,
          };

          // Sort the keys of the checkBoxData object
          const sortedKeys = Object.keys(checkBoxData).sort();
          // Iterate over the sorted keys and push each key's value into the checkBoxText array
          sortedKeys.forEach((key) => {
            checkBoxText.push(checkBoxData[key]);
          });
        });

        setTrack(importedTrack[0]);
        setMarks(importedMarks[0]);

        setCheckBoxText(checkBoxText);

        setRegion({
          latitude: regionPosition.latitude,
          longitude: regionPosition.longitude,
          latitudeDelta: latDelta,
          longitudeDelta: longDelta,
        });
      } catch (e) {
        console.error("Error fetching data: ", e);
      } finally {
        setIsLoading(false);
        console.log("Data fetched successfully");
      }
    };
    fetchData();
  }, []);

  const initialLocation = { latitude: 37.771707, longitude: -122.4053769 };
  const [myLocation, setMyLocation] = useState(null);

  useEffect(() => {
    _getLocation(); // Initial location fetch

    const locationInterval = setInterval(() => {
      _getLocation(); // Fetch location every 5 seconds
    }, 5000);
    return () => clearInterval(locationInterval);
  }, []);

  const _getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 5000 },
        (newLocation) => {
          setMyLocation(newLocation.coords);
          console.log("new Location");
        }
      );
    } catch (err) {
      console.warn(err);
    }
  };

  function addPosition() {
    if (myLocation) {
      return (
        <Marker
          coordinate={{
            latitude: myLocation.latitude,
            longitude: myLocation.longitude,
          }}
          title="Du är här"
          pinColor="#007bff"
        />
      );
    }
  }

  function checkBoxes() {
    return checkBoxText.map((text, index) => (
      <CheckBox
        key={index}
        text={text[0]}
        modalHeaderText={text[1]}
        imageURL={text[2]}
      />
    ));
  }

  function addMarks() {
    return marks.map((val, index) => (
      <Marker
        key={index}
        coordinate={{ latitude: val.latitude, longitude: val.longitude }}
        pinColor={colours.secondary}
      />
    ));
  }

  if (isLoading && region === null) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#2C233D",
        }}
      >
        <Text style={{ color: "#FFA330" }}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={styles.container}>
          <MapView
            style={styles.MapBox}
            initialRegion={region}
            onRegionChangeComplete={(region) => setRegion(region)}
          >
            {addPosition()}
            {addMarks()}
            <Polyline
              coordinates={track}
              strokeColor={colours.primary}
              strokeWidth={3}
              lineDashPattern={[5, 1]}
            />
          </MapView>
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
