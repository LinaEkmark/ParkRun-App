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
  //document.getElementById("tset").innerHTML=
  //xml.responseXML.getElementsByTagName("name")[1].childNodes[0].nodeValue;
  let input = xml.responseXML;
  let output;
  let point = input.getElementsByTagName("Point")[0].getElementsByTagName("coordinates")[0].childNodes[0].nodeValue;
  console.log(point);
}

  //TODO: Dela upp lat- och lng-koordinater