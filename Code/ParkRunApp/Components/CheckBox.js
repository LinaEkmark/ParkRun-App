import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';

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
            <Text style={styles.modalText}>Modal Content Here</Text>
            <TouchableOpacity
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={toggleModal}
            >
              <Text style={styles.textStyle}>Close</Text>
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
    marginBottom: 15,
    textAlign: "center"
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  }
});

export default CheckBox;