import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { DOMParser, XMLSerializer } from 'xmldom';

const indata = require("../assets/skatasparkrun.kml");

export default function KMLreader() {
    let converted = loadDoc();
    return converted;
}

function loadDoc() {
    /*
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && 
        this.status == 200) {
          let r = test(this);
        }
    };
    xmlhttp.open("GET", "../assets/skatasparkrun.kml", true);
    xmlhttp.send();
    */
   let r = test(indata);

    return r;
  }
  
function test(xml) {
    const s = new  XMLSerializer();
    const str = s.serializeToString(xml);
    console.log(str);
    
    /*
    parser = new DOMParser.DOMParser();
    let input = parser.parseFromString(xml,"text/xml");
    let output = 1;
    let point = input.getElementsByTagName("Point")[0].getElementsByTagName("coordinates")[0].childNodes[0].nodeValue;
    //console.log(point);
    let coords = latLng(point);
    console.log("Lat = " + coords[0] + "\n" + "Lng = " + coords[1]);
    //let line = input.getElementsByTagName("LineString")[0].getElementsByTagName("coordinates")[0].childnodes;
    //console.log(line);

    let i = 0;
    while(input.getElementsByTagName("LineString")[0].getElementsByTagName("coordinates")[0].childnodes[i]) {
        let coords = latLng(input.getElementsByTagName("LineString")[0].getElementsByTagName("coordinates")[0].childnodes[i].nodeValue);
        output.push({
            latitude: coords[0],
            longitude: coords[1],
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        });
        i++;
    }
    if (output == []) {
        output = [{
            latitude: 57.7047,
            longitude: 12.037,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
            },
            {
                latitude: 57.7075,
                longitude: 12.0408,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            },
            {
                latitude: 57.7047,
                longitude: 12.0447,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            },
            {
                latitude: 57.7047,
                longitude: 12.037,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }];
    } 
    return output;
    */
/*
   const x = {
    latitude: coords[0],
    longitude: coords[1],
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
}
   return x;
   */
}

function latLng(coords) {
    const cArray = coords.split(",");
    //Koordinater sparas som longitud sen latitud i kml. Det fixas nedan:
    const reversedArray = [cArray[1], cArray[0]];
    return reversedArray;
}
