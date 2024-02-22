import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
const CheckBox = ({ text }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.checkBox}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
      </View>

      {/* Button container */}
      <TouchableOpacity onPress={toggleModal} style={styles.buttonContainer}>
        <Text style={styles.openButton}>Open</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        {/* Modal content */}
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Text style ={styles.modalHeaderText}> Marker</Text>

              <View style={styles.photoBox}>
              <Text style={styles.modalText}>Här ska det vara en bild</Text>

              </View>

              <View style={styles.greyBox}>
                  <Text>Här ska det vara instruktoioner i hur man sätter upp skiten</Text>
              </View>
        
            <TouchableOpacity
              style={styles.closeButtonContainer}
              onPress={toggleModal}
            >
                <FontAwesomeIcon icon = {faChevronLeft} size={24} color= {'black'}/>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  ); 
};



const styles = StyleSheet.create({
  checkBox: {
    width: 355,
    height: 49,
    backgroundColor: '#2B223D',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 10,
    position: 'relative', // Ensure the parent container uses relative positioning
  },
  textContainer: {
    marginTop: 10,
    marginLeft: 30,
    position: 'absolute', // Use absolute positioning for the text container
  },
  text: {
    color: '#EC9B02',
  },
  buttonContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    width: 76,
    height: 35,
    right: 15, // Position the button container to the right edge of the parent container
    top: 7, // Adjust top position as needed
    position: 'absolute', // Use absolute positioning for the button container
  },
  openButton: {
    backgroundColor: '#00CEAE',
    padding: 10,
    borderRadius: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
    height: '50%'

  },
  modalText: {
    textAlign: "center",
    fontSize: 12
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalHeader:{
  
  },
  modalHeaderText: {
    fontWeight: 'bold',
    textAlign: 'left',
    marginRight: 180
},

    closeButtonContainer:{
        position: 'absolute',
        top: 10,
        left: 10,

    },
  photoBox: {
    backgroundColor: '#D9D9D9',
    width: 270, // Adjust the width as needed
    height: 180, // Adjust the height as needed
    marginBottom: 20, // Adjust the margin bottom as needed
    borderRadius: 10, // Adjust the border radius as needed
  },
  greyBox: {
    backgroundColor: '#D9D9D9',
    width: 270, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    marginBottom: 20, // Adjust the margin bottom as needed
    borderRadius: 10, // Adjust the border radius as needed
  }
});

export default CheckBox;