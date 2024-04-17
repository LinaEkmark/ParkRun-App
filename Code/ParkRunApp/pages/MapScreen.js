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
  const latDelta = 0.007;
  const longDelta = 0.007;

  const reee = [{latitude: 57.7035863, longitude: 12.0378259}, 
    {latitude: 57.7036843, longitude: 12.0380968}];
  
  const [track, setTrack] = useState([reee]);
    
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

        const w = query(collection(db, "Parkruns", "parkruns-info", "Holyrood parkrun")); 
          const querySnapshot2 = await getDocs(w);
          querySnapshot2.forEach(async (doc) => {
          importedTrack.push(doc.data().track);

          //console.log("track: ", importedTrack);
        });
        console.log("Track element: ", importedTrack[0][0].longitude);
        /* let i = 0;
        while(importedTrack[0][i]) {
          track.push({
            latitude: importedTrack[0][i].latitude,
            longitude: importedTrack[0][i].longitude
          });
          i++;
        } */
        setTrack(importedTrack[0]);
        console.log("track :", track);
        //console.log("point: ", skat0);

        querySnapshot.forEach(async (doc) => {
          const checkBoxData = doc.data().checkBoxText;
          const location = doc.data().location;
          console.log("1: " + location.latitude + " " + location.longitude);

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

        console.log("2: ", regionPosition);

        console.log("3: ", checkBoxText);
        setCheckBoxText(checkBoxText);
        setRegion({
          latitude: regionPosition.latitude,
          longitude: regionPosition.longitude,
          latitudeDelta: latDelta,
          longitudeDelta: longDelta,
        });
        console.log("4: ", region); // Log the region state after it has been updated
      } catch (e) {
        console.error("Error fetching data: ", e);
      } finally {
        setIsLoading(false);
        console.log("Data fetched successfully");
      }
    };
    fetchData();
  }, []);
  console.log("AAAA ", track);
  

  function checkBoxes() {
    return checkBoxText.map((text, index) => (
      <CheckBox key={index} 
                text={text[0]} 
                modalHeaderText={text[1]} />
    ));
  }

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
              coordinates={track}
              strokeColor={colours.primary}
              strokeWidth={3}
              lineDashPattern={[5, 1]}
            />
          </MapView>
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
