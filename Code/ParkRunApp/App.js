import React from 'react';
import { StatusBar, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const rectangles = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    text: `Check ${index + 1}`,
  }));

  const handleRectanglePress = (id) => {
    console.log('Rectangle clicked:', id);
    // You can add your logic here for handling click events
  };

  return (
      <View style={styles.container}>
        <View style={styles.topHalf}></View>
        <ScrollView style={styles.scrollContainer}>
          {rectangles.map(rectangle => (
              <View key={rectangle.id} style={styles.rectangleContainer}>
                <View style={styles.rectangle}>
                  <Text style={styles.text}>{rectangle.text}</Text>
                  <TouchableOpacity style={styles.button} />
                </View>
              </View>
          ))}
        </ScrollView>
        <StatusBar style="auto" />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topHalf: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  rectangleContainer: {
    width: '100%', // Ensure rectangles take the full width of the screen
    paddingHorizontal: 10, // Reduced horizontal padding
    marginBottom: 5, // Reduced margin between rectangles
  },
  rectangle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%', // Ensure rectangles take the full width of the screen
    height: 50,
    backgroundColor: '#2C233D',
    alignItems: 'center',
    marginBottom: 5, // Reduced margin between rectangles
    borderRadius: 10,
    paddingHorizontal: 5, // Reduced padding to the rectangle
  },
  text: {
    flex: 1, // Adjusted flex to fill the available space
    textAlign: 'left',
    color: '#FFFFFF',
    marginRight: 10, // Added margin to the right for better spacing
  },
  button: {
    width: 40,
    height: 40,
    backgroundColor: '#FFA300',
    borderRadius: 10,
  },
});
