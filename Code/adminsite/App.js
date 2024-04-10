//TODO: Spara parsead output till fil (firebase?)

import { Button, StyleSheet, Text, View } from 'react-native';
//import colours from '../ParkRunApp/config/colours';

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
        test(this);
      }
  };
  xmlhttp.open("GET", "Skatås Parkrun.kml", true);
  xmlhttp.send();
}

function test(xml) {
  let input = xml.responseXML;
  let output;
  let point = input.getElementsByTagName("Point")[0].getElementsByTagName("coordinates")[0].childNodes[0].nodeValue;
  console.log(point);
  let coords = latLng(point);
  console.log("Lat = " + coords[0] + "\n" + "Lng = " + coords[1]);
  //let line = input.getElementsByTagName("LineString")[0].getElementsByTagName("coordinates")[0];
  //console.log(line);
}


function latLng(coords) {
  const cArray = coords.split(",");
  //Koordinater sparas som longitud sen latitud i kml. Det fixas nedan:
  const reversedArray = [cArray[1], cArray[0]];
  return reversedArray;
}