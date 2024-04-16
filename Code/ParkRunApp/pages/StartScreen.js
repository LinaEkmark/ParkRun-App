import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Dimensions
} from "react-native";
import DropdownStart from "../Components/DropdownStart";
import ButtonStart from "../Components/ButtonStart";
import SearchButtonStart from "../Components/searchButtonStart";
import Logo from "../Design/parkrunAppLogo.png";
import { Dropdown } from 'react-native-element-dropdown';

// //Database things
import {collection, getDocs, query, where} from "firebase/firestore"
import db from "../Firebase/firebase"


export default function StartScreen({ navigation }) {
  const [Input, setInput] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedParkrun, setSelectedParkrun] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [filteredParkruns, setFilteredParkruns] = useState([]);
  const textInputRef = useRef(null);
  const [openFlatList, setopenFlatList] = useState(true);

  const valdPark = [selectedCountry, selectedCity, selectedParkrun];

  // const Countries = [
  //   { label: "Sverige", value: "sverige" },
  //   { label: "Scottland", value: "scottland" },
  //   { label: "England", value: "england" },
  // ];

  //---------
  const [Countries, setCountries] = useState([]);
  const [Cities, setCities] = useState([]);
  const [Parkruns, setParkruns] = useState([]);

    useEffect(() => {
    const fetchData = async () => {
      try {
        // QUERY ATTEMPT, read all documents from the collection 'Parkruns' where the field 'country' is not empty
        const q = query(collection(db, 'Parkruns'), where('country', '!=', ''));
        const qResult = await getDocs(q);  

        // Create empty arrays for countries, cities and parkruns
        const countries = [];
        const cities = [];
        const parkruns = [];

        // Loop through the query result and add unique countries, cities and parkruns to the arrays
        qResult.forEach((doc) => {
          const country = doc.data().country;
          const city = doc.data().city;
          const parkrun = doc.data().name;

          // Check if the country, city or parkrun already exists in the array, do not add if already present
          if (country && !countries.some(item => item.value === country)) {
            countries.push({ label: country, value: country });
          }
          
          if (city && !cities.some(item => item.value === city)) {
            cities.push({ label: city, value: city, key: country });
          }
          if(parkrun && !parkruns.some(item => item.value === parkrun)){
            parkruns.push({label: parkrun, value: parkrun, key: city});
          }
        });
        setCountries(countries);
        setCities(cities);
        setParkruns(parkruns);

        setCityList(cities);
        setParkrunList(parkruns);
        
      } catch (error) {
        console.error("Error fetching data: ", error)
      }

    };
    fetchData();
  }, []);
  //---------

  // const Cities = [
  //   { label: "Göteborg", value: "göteborg", key: "sverige" },
  //   { label: "Stockholm", value: "stockholm", key: "sverige" },
  //   { label: "London", value: "london", key: "england" },
  //   { label: "Edinburg", value: "edinburg", key: "scottland" },
  // ];

  // const Parkruns = [
  //   { label: "Skatås", value: "skatås", key: "göteborg" },
  //   { label: "Billdal", value: "billdal", key: "göteborg" },
  //   { label: "Haga", value: "haga", key: "stockholm" },
  //   { label: "London", value: "london", key: "london" },
  //   { label: "Edinburg", value: "edinburg", key: "edinburg" },
  //   { label: "Stoke", value: "stoke", key: "stoke" },
  // ];



  //const [value, setValue] = useState(null);
  const [isCountryFocus, setIsCountryFocus] = useState(false);
  const [isCityFocus, setIsCityFocus] = useState(false);
  const [isParkrunFocus, setIsParkrunFocus] = useState(false);


  const [cityList, setCityList] = useState([]);
  const [parkrunList, setParkrunList] = useState([]);






  const filterParkruns = (text) => {
    const filteredParkruns = Parkruns.filter((parkrun) =>
      parkrun.label.toLowerCase().startsWith(text.toLowerCase())
    );
    if (filteredParkruns.length === 0) {
      setFilteredParkruns([
        {
          label: "Parkrun saknas",
          value: "parkrun_saknas",
          key: "parkrun_saknas",
        },
      ]);
    } else {
      setFilteredParkruns(filteredParkruns);
    }
  };

  const autocompleteListMaxHeight =
    filteredParkruns.length > 0
      ? Math.min(filteredParkruns.length * 30, 200)
      : 0;

  const sweFlag = "../Design/swe-flag-400.png";

  const handleInputChange = (Currentinput) => {
    setInput(Currentinput);
    filterParkruns(Currentinput);
    setopenFlatList(true);
  };

  //go to map page
  const handleSubmit = () => {
    console.log(selectedParkrun);
    navigation.navigate("Karta", {
      selectedParkrun: selectedParkrun,
    });
  };

  function getCities(country) {
    if (country) {
      console.log("Selected country:", country);
      // If Sweden is selected, return only Göteborg and Stockholm
      return Cities.filter((city) => city.key === country);
    } else {
      // If any other country is selected, return all cities
      return Cities;
    }
  };
  function getParkruns(city) {
    if (city) {
      console.log("Selected city:", city);
      // If a city is selected, return parkruns filtered by that city
      return Parkruns.filter((parkrun) => parkrun.key === city);
    } else {
      // If no city is selected, return all parkruns
      return Parkruns;
    }
  }




  return (
    <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <Image source={Logo} style={styles.image} />
        <Text style={styles.text}>Välkommen till parkruns</Text>
        <Text style={styles.text}>volontärdatabas!</Text>
        <Text style={styles.text2}>Hitta din park!</Text>

        <View style={styles.main}>
          <View style={styles.searchContainer}>
            <TextInput
              ref={textInputRef}
              style={styles.searchbar}
              onChangeText={handleInputChange}
              value={Input}
              placeholder="Sök..."
              placeholderTextColor={"#FFA300"}
            />
            <SearchButtonStart onPress={handleSubmit} style={styles.searchImage} />
          </View>

          <View style={styles.flatlistBox}>
            {Input.length > 0 && openFlatList && (
              <FlatList
                style={[
                  styles.autocompleteList,
                  { maxHeight: autocompleteListMaxHeight },
                ]}
                data={filteredParkruns}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.flatListItemContainer}
                    onPress={() => {
                      setSelectedParkrun(item.value);
                      setInput(item.label); // Update TextInput value
                      textInputRef.current.blur(); // Hide keyboard
                      setopenFlatList(false);
                    }}
                  >
                    <Text style={styles.FlatlistItemText}>{item.label}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.value}
              />
            )}
          </View>
          <Text style={styles.text2}>Eller välj:</Text>
          <View style={styles.dropdownsections}>
            {/* <Image source={require(sweFlag)} style={styles.dropdownlistimage} /> */}


            {/*<DropdownStart
              items={Countries}
              placeholder="Välj Land"
              initialValue={selectedCountry}
              onValueChange={setSelectedCountry}
            />*/}

            <Dropdown
                style={[styles.dropdown, isCountryFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                //iconStyle={styles.iconStyle}
                data={Countries}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isCountryFocus ? 'Select country' : '...'}
                searchPlaceholder="Search..."
                //value={value}
                value={selectedCountry}
                onFocus={() => setIsCountryFocus(true)}
                onBlur={() => setIsCountryFocus(false)}
                onChange={item => {
                  //setSelectedCountry(item.value)
                  setSelectedCountry(item.value)
                  setSelectedCity("")
                  setSelectedParkrun("")
                  setCityList(getCities(item.value))

                }}

            />




            <Dropdown
                style={[styles.dropdown, isCityFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                //iconStyle={styles.iconStyle}
                data={cityList}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isCityFocus ? 'Select city' : '...'}
                searchPlaceholder="Search..."
                //value={value}
                value={selectedCity}
                onFocus={() => setIsCityFocus(true)}
                onBlur={() => setIsCityFocus(false)}
                onChange={item => {
                  //setSelectedCountry(item.value)
                  setSelectedCity(item.value)
                  setSelectedParkrun("")
                  setParkrunList(getParkruns(item.value))
                }}

            />






            <Dropdown
                style={[styles.dropdown, isParkrunFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                //iconStyle={styles.iconStyle}
                data={parkrunList}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isParkrunFocus ? 'Select parkrun' : '...'}
                searchPlaceholder="Search..."
                //value={value}
                value={selectedParkrun}
                onFocus={() => setIsParkrunFocus(true)}
                onBlur={() => setIsParkrunFocus(false)}
                onChange={item => {
                  //setSelectedCountry(item.value)
                  setSelectedParkrun(item.value)

                }}

            />

          </View>

         {/* <View style={styles.dropdownsections}>

            <DropdownStart
              items={getCities(selectedCountry)}
              placeholder="Välj Stad"
              initialValue={selectedCity}
              onValueChange={setSelectedCity}
            />
          </View>
          <View style={[styles.dropdownsections, { marginBottom: "8%" }]}>

            <DropdownStart
              items={getParkruns(selectedCity)}
              placeholder="Välj Parkrun"
              initialValue={selectedParkrun}
              onValueChange={setSelectedParkrun}
            />
          </View>*/}

          <View>
            <ButtonStart
              onPress={() =>
                navigation.navigate("Karta", {
                  selectedParkrun: selectedParkrun,
                })
              }
              title="Bekräfta"
              buttonStyle={styles.confirmbutton}
              textStyle={styles.textConfirmButton}
            ></ButtonStart>
          </View>
        </View>
        </ScrollView>
      </View>
    
  );
}






const screenWidth = Dimensions.get('window').width;













const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
  },
  container: {
    flex: 1,
    backgroundColor: "#2C233D",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "20%",
    alignSelf: "center",
    resizeMode: "contain",
    marginTop: "15%",
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 15,
  },
  text2: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 15,
    marginTop: "10%",
  },
  main: {
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchbar: {
    height: "70%",
    width: "55%",
    borderColor: "#FFA300",
    borderWidth: 1,
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6,
    alignSelf: "center",
    textAlign: "center",
    color: "#FFA300",
    fontSize: 25,
    fontWeight: "bold",
  },
  searchImage: {
    borderWidth: 1,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderColor: "#FFA330",
    maxHeight: "81%",
    maxWidth: 100,
    justifyContent: "center",
    alignItems: "center",

    //overflow: "hidden",
  },
  dropdownsections: {
    alignSelf: "center",
    width: "60%",
    marginTop: "1%",
    marginBottom: "5%",
  },
  dropdownlistimage: {
    width: "15%",
    resizeMode: "contain",
    borderColor: "#FFA300",
    borderWidth: 1,
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6,
    maxHeight: 40,
  },
  flatlistBox: {
    marginRight: "19%",
    width: "55%",
  },
  autocompleteList: {
    backgroundColor: "#2C233D",
    borderColor: "#FFA300",
    borderWidth: 1,
    borderRadius: 4,
  },
  flatListItemContainer: {
    alignItems: "center", // Horizontally center the content
  },
  FlatlistItemText: {
    color: "#FFA300",
    marginHorizontal: 20,
    fontSize: 16,
  },
  confirmbutton: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: "15%",
    paddingVertical: "5%",
    borderRadius: 6,
    elevation: 3,
    backgroundColor: "#00CEAE",
  },
  textConfirmButton: {
    fontSize: 34,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#2B233D",
  },

















  /*container: {
    backgroundColor: 'white',
    padding: 16,
  },*/
  dropdown: {
    marginTop: "5%",
    height: 50,
    //borderColor: 'gray',
    //textAlign: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderColor: "#FFA300",


  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    textAlign: "center",
    color: "#CCCCCC",

  },
  selectedTextStyle: {
    fontSize: 16,
    textAlign: "center",
    color: "#FFA300"
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  inputIOS: {
    marginTop: "5%",
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#FFA300",
    borderRadius: 6,
    color: "#FFA330", // to ensure the text is never behind the icon
  },



});
