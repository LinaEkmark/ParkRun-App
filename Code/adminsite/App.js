//TODO: Gör så man kan välja vilket parkrun man sparar till

import { Button, StyleSheet, Text, View } from 'react-native';
//import colours from '../ParkRunApp/config/colours';

import {doc, setDoc} from 'firebase/firestore';
import db from './Firebase/firebase';

export default function Page() {
  return(
    <><View>
      <Text>Hello world!</Text>
      <Button
        onPress={loadDoc}
        title='Test' />
    </View>
    <View id="tset">
        <Text>ö</Text>
    </View></>
);
}

function loadDoc() {
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && 
      this.status == 200) {
        parse(this);
      }
  };
  //xmlhttp.open("GET", "Billdalsparken parkrun.kml", true);
  xmlhttp.open("GET", "Skatås parkrun.kml", true);
  xmlhttp.send();
}

async function parse(xml) {
  let input = xml.responseXML;
  let polyline = [];
  let marks = [];
  //let point = input.getElementsByTagName("Point")[0].getElementsByTagName("coordinates")[0].childNodes[0].nodeValue;
  //console.log(point);
  //let coords = latLng(point);
  //console.log("Lat = " + coords[0] + "\n" + "Lng = " + coords[1]);
  //let line = input.getElementsByTagName("LineString")[0].getElementsByTagName("coordinates")[0];
  //console.log(line);

  /* let coords = input.getElementsByTagName("LineString")[0].getElementsByTagName("coordinates")[0].childNodes[0].nodeValue.split("\n");
  coords = coords.filter(function(entry) {return /\S/.test(entry);});
  console.log(coords);
  let i = 0;
  while(coords[i]) {
      let coordser = latLng(coords[i]);
      output.push({
          latitude: parseFloat(coordser[0]),
          longitude: parseFloat(coordser[1]),
      });
      
      console.log(output[i]);
      i++;
  } */
  //Skriver om ovan för att ta med markörer också
  let pmarks = input.getElementsByTagName("Placemark");
  let i = 0;
  while (pmarks[i]) {
    if (pmarks[i].getElementsByTagName("LineString")[0]) {
      // Gör antagandet att det bara kommer finnas en LineString
      let coords = pmarks[i].getElementsByTagName("LineString")[0].getElementsByTagName("coordinates")[0].childNodes[0].nodeValue.split("\n");
      coords = coords.filter(function(entry) {return /\S/.test(entry);});

      let j = 0;
      while(coords[j]) {
        let coordser = latLng(coords[j]);
        polyline.push({
          latitude: coordser[0],
          longitude: coordser[1],
        });
      
        j++;
      }
      console.log(j, "coordinates")
    } else if (pmarks[i].getElementsByTagName("Point")[0]) {
      let mCoord = latLng(pmarks[i].getElementsByTagName("Point")[0].getElementsByTagName("coordinates")[0].childNodes[0].nodeValue);
      let mName = pmarks[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
      let mDesc;
      try {
        mDesc = pmarks[i].getElementsByTagName("description")[0].childNodes[0].nodeValue;
      } catch { mDesc = "No description"; }
      
      marks.push({
        latitude:mCoord[0],
        longitude:mCoord[1],
        name:mName,
        description:mDesc});
    }
    i++;
  }
  console.log(marks)
  /* if (input.getElementsByTagName("LineString")[0].getElementsByTagName("coordinates")[0].childNodes[0].nodeValue) {
    console.log("Den jäveln finns");
    console.log("Den jäveln är " + input.getElementsByTagName("LineString")[0].getElementsByTagName("coordinates")[0].childNodes[0].nodeValue);
  }
  else {
    console.log("Den jäveln finns inte");
  } */
  await setDoc (doc(db, "Parkruns", "parkruns-info", "Skatås parkrun", "WTrVlzNX5iqIOPtr1tCO"), {
    track: polyline,
    marks: marks 

  }, {merge: true});
}


function latLng(coords) {
  const cArray = coords.split(",");
  //Koordinater sparas som longitud sen latitud i kml. Det fixas nedan:
  const reversedArray = [parseFloat(cArray[1]), parseFloat(cArray[0])];
  return reversedArray;
}
