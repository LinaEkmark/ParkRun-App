import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useDropzone } from 'react-dropzone';
import { doc, setDoc } from 'firebase/firestore';
import db from './Firebase/firebase';

const App = () => {
  const [kmlFilePath, setKMLFilePath] = useState('');

  const onDrop = async (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setKMLFilePath(file.path);
      await loadDoc(file);
    }
  };

  const loadDoc = async (file) => {
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const kmlContent = reader.result;
        
        await parse(kmlContent);

      };
      reader.readAsText(file);
    } catch (err) {
      console.error('Error loading document:', err);
    }
  };

  async function parse(xml) {
    let input = xml;
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
            latitude: coordser[0],
            longitude: coordser[1],
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
  
  const saveToFirestore = async (coordinates) => {
    try {
      await setDoc(doc(db, 'Parkruns', 'parkruns-info', 'Holyrood parkrun', 'test-insert-geodata'), {
        track: coordinates,
      });
      console.log('Coordinates saved to Firestore:', coordinates);
    } catch (err) {
      console.error('Error saving coordinates to Firestore:', err);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Parkrun Volunteer App Admin Page</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Drop KML file here:</Text>
        <div {...getRootProps({ style: styles.dropzone })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop a KML file here, or click to select file</p>
        </div>
        <TextInput
          style={styles.input}
          placeholder="Or enter path to KML file"
          value={kmlFilePath}
          editable={false}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Add checkpoint instructions here:</Text>
        {/* Add more UI elements here */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    width: 200,
    marginTop: 10,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
  },
  dropzone: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: '2px',
    borderRadius: '2px',
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
  },
});

export default App;
