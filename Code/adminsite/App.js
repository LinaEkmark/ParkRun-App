//TODO: Spara parsead output till fil (firebase?)

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
  xmlhttp.open("GET", "Skatås Parkrun.kml", true);
  xmlhttp.send();
}

async function parse(xml) {
  let input = xml.responseXML;
  let output = [];
  //let point = input.getElementsByTagName("Point")[0].getElementsByTagName("coordinates")[0].childNodes[0].nodeValue;
  //console.log(point);
  //let coords = latLng(point);
  //console.log("Lat = " + coords[0] + "\n" + "Lng = " + coords[1]);
  //let line = input.getElementsByTagName("LineString")[0].getElementsByTagName("coordinates")[0];
  //console.log(line);

  // Koordinater är en 
  let coords = input.getElementsByTagName("LineString")[0].getElementsByTagName("coordinates")[0].childNodes[0].nodeValue.split("\n");
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
  }
  if (input.getElementsByTagName("LineString")[0].getElementsByTagName("coordinates")[0].childNodes[0].nodeValue) {
    console.log("Den jäveln finns");
    console.log("Den jäveln är " + input.getElementsByTagName("LineString")[0].getElementsByTagName("coordinates")[0].childNodes[0].nodeValue);
  }
  else {
    console.log("Den jäveln finns inte");
  }
  await setDoc (doc(db, "Parkruns", "parkruns-info", "Holyrood parkrun", "test-insert-geodata"), {
    track: output 

  });
}


function latLng(coords) {
  const cArray = coords.split(",");
  //Koordinater sparas som longitud sen latitud i kml. Det fixas nedan:
  const reversedArray = [cArray[1], cArray[0]];
  return reversedArray;
}
