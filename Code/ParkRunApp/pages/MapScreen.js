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
//import KMLreader from "../Utils/KMLreader";

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
  const [region, setRegion] = useState(null);
  const latDelta = 0.015;
  const longDelta = 0.015;

  const reee = [{latitude: 57.7035863, longitude: 12.0378259}, 
    {latitude: 57.7036843, longitude: 12.0380968}];
  
  const [track, setTrack] = useState([reee]);
  const [marks, setMarks] = useState([{
    latitude: reee[0].latitude,
    longitude: reee[0].longitude,
    name: "null",
    description: "null"
  }]);
    
  //loading state
  const [isLoading, setIsLoading] = useState(true);

  //data fetch from correct parkrun document
  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, "Parkruns/parkruns-info/" + selectedParkrun));
        const querySnapshot = await getDocs(q);
        let checkBoxText = [];
        let regionPosition = {};
        let importedTrack = [];
        let importedMarks = [];

        querySnapshot.forEach(async (doc) => {
          const checkBoxData = doc.data().checkBoxText;
          const location = doc.data().location;
          //console.log("1: " + location.latitude + " " + location.longitude);
          importedTrack.push(doc.data().track);
          importedMarks.push(doc.data().marks);

          // Set the regionPosition as an object directly
          regionPosition = {
            latitude: location.latitude,
            longitude: location.longitude
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
  //console.log("AAAA ", track);
  //console.log("marks: ", marks);

  function checkBoxes() {
    return checkBoxText.map((text, index) => (
      <CheckBox key={index} 
                text={text[0]} 
                modalHeaderText={text[1]}
                imageURL={text[2]} />
    ));
  }

  function addMarks() {
    return marks.map((val, index) => (
      <Marker
        key={index}
        coordinate={{latitude:val.latitude,longitude:val.longitude}}
        pinColor={val.colour}
      >
        {/* Gör pinsen till balla boxar med siffror */}
        <View 
          style={styles.marker}
          backgroundColor={val.colour}
        >
          <Text>{index}</Text>
        </View>
      </Marker>
    ));
  }/* 

  function CustomMarker() {
    return (
      <View style={styles.marker}>
        <Text style={styles.color}>Tokyo</Text>
      </View>
    );
  } */

  if (isLoading && region === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#2C233D", }}>
        <Text style={{color: "#FFA330",}}>Loading...</Text>
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
  marker: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    //backgroundColor: colours.green,
    borderColor: "#eee",
    borderRadius: 5,
    elevation: 10,
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
