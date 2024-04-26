//TODO: Gör så man kan välja vilket parkrun man sparar till

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

function loadDoc() {
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && 
      this.status == 200) {
        parse(this);
      }
  };

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
  await setDoc (doc(db, "Parkruns", "parkruns-info", "Holyrood parkrun", "test-insert-geodata"), {
    track: polyline,
    marks: marks 

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

function latLng(coords) {
  const cArray = coords.split(",");
  //Koordinater sparas som longitud sen latitud i kml. Det fixas nedan:
  const reversedArray = [parseFloat(cArray[1]), parseFloat(cArray[0])];
  return reversedArray;
}

export default App;
