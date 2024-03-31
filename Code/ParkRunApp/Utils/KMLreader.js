import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

export default function App() {
    const [kmlData, setKmlData] = useState(null);

    useEffect(() => {
        // Import the KML file as an asset
        const kmlFile = require('../assets/skatasparkrun.kml');
        // Access the content of the KML file
        setKmlData(kmlFile);
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {kmlData ? (
                <Text>KML File Content: {kmlData}</Text>
            ) : (
                <Text>Loading...</Text>
            )}
        </View>
    );
}
