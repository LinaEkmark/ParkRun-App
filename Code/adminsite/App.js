import { Button, StyleSheet, Text, View } from 'react-native';
//import colours from '../ParkRunApp/config/colours';

export default function Page() {
  return(
    <><View>
      <Text>Hello world!</Text>
      <Button
        onPress={loadDoc}
        title='Test' />
      <Button
        onPress={logFetched}
        title='Log' />
    </View>
    <View id="tset">
        <Text>ö</Text>
    </View></>
);
}

let kml, parser, kmlparse;
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
  document.getElementById("tset").innerHTML=
  xml.responseXML.getElementsByTagName("name")[1].childNodes[0].nodeValue;
}

function logFetched() {
  console.log(kml);
}