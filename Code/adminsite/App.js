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
  let output = [];
  let point = input.getElementsByTagName("Point")[0].getElementsByTagName("coordinates")[0].childNodes[0].nodeValue;
  console.log(point);
  let coords = latLng(point);
  console.log("Lat = " + coords[0] + "\n" + "Lng = " + coords[1]);
  //let line = input.getElementsByTagName("LineString")[0].getElementsByTagName("coordinates")[0];
  //console.log(line);
  let i = 0;
  while(input.getElementsByTagName("LineString")[0].getElementsByTagName("coordinates")[0].childNodes[i]) {
      let coords = latLng(input.getElementsByTagName("LineString")[0].getElementsByTagName("coordinates")[0].childNodes[i].nodeValue);
      output.push({
          latitude: coords[0],
          longitude: coords[1],
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
      });
      i++;
  }
  console.log(output[0]);
}


function latLng(coords) {
  const cArray = coords.split(",");
  //Koordinater sparas som longitud sen latitud i kml. Det fixas nedan:
  const reversedArray = [cArray[1], cArray[0]];
  return reversedArray;
}