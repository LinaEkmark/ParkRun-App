import { Button, StyleSheet, Text, View } from 'react-native';
//import colours from '../ParkRunApp/config/colours';

export default function Page() {
  return(
    <><View>
      <Text>Hello world!</Text>
      <Button
        onPress={Test}
        title='Test' />
    </View>
    <View id="tset">
        <Text>ö</Text>
    </View></>
);
}

const kml = 
`    <Folder>
<name>Skyltar</name>
<Placemark>
  <name>Start och mål</name>
  <styleUrl>#icon-1661-000000-nodesc</styleUrl>
  <Point>
    <coordinates>
      12.0378104,57.7035969,0
    </coordinates>
  </Point>
</Placemark>
<Placemark>
  <name>Höger</name>
  <description>Leder deltagarna mot åttan. Efter start vänds skylten så att
  den leder deltagarna i slutspurten.</description>
  <styleUrl>#icon-1899-0288D1</styleUrl>
  <Point>
    <coordinates>
      12.0384246,57.7038155,0
    </coordinates>
  </Point>
</Placemark>
</Folder>`;
let parser = new DOMParser();
let kmlparse = parser.parseFromString(kml,"text/xml");

function Test () {
  document.getElementById("tset").innerHTML=
  kmlparse.getElementsByTagName("name")[1].childNodes[0].nodeValue;
}