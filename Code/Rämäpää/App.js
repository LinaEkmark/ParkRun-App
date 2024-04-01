import { StyleSheet, Text, View } from 'react-native';
import DOMParser from 'react-native-html-parser';
import colours from '../ParkRunApp/config/colours';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello world!</Text>
    </View>
  );
}

const kml = fetch("Skatås Parkrun.kml");
let parse = new DOMParser().parseFromString(kml, "application/xml");
console.log(parse.getElementsByAttribute('Style', '"icon-seq2-2-1-0288D1-highlight"'));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
