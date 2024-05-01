import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import { faXmark } from "@fortawesome/free-solid-svg-icons";


//const testbild = "../Design/skyltvidbänk.jpg";
const CheckBox = ({ text, modalHeaderText, imageURL }) => {
  const [modalVisible, setModalVisible] = useState(false);

  // useEffect(() => {
  //   const fetchImage = async () => {
  //     const storageRef = getStorage();
  //     const image = ref(storageRef, imageRef);
  //     await getDownloadURL(image).then((url) => {
  //       setImageURL(url);
  //     });
      
  //   };
  //   if(imageURL == undefined) fetchImage();
  // }, []);

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
            <Text style={styles.modalHeaderText}> {text}</Text>

            <View style={styles.photoBox}>
              <Image 
              source={{uri: imageURL}} 
              style={styles.modalImage} />
            </View>

            <View style={styles.greyBox}>
              <Text style={styles.modalText}>
                {modalHeaderText}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.closeButtonContainer}
              onPress={toggleModal}
            >
              <FontAwesomeIcon icon={faXmark} size={28} color={"black"} />
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
    backgroundColor: "#2B223D",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 10,
    position: "relative", // Ensure the parent container uses relative positioning
  },
  textContainer: {
    marginTop: 10,
    marginLeft: 30,
    position: "absolute", // Use absolute positioning for the text container
  },
  text: {
    color: "#EC9B02",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: {
    borderRadius: 10,
    overflow: "hidden",
    width: 76,
    height: 35,
    right: 15, // Position the button container to the right edge of the parent container
    top: 7, // Adjust top position as needed
    position: "absolute", // Use absolute positioning for the button container
  },
  openButton: {
    backgroundColor: "#00CEAE",
    borderRadius: 10,
    paddingVertical: 9, // Adjust padding vertically as needed
    paddingHorizontal: 15, // Adjust padding horizontally as needed
    textAlign: "center",
    textAlignVertical: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
    height: "80%",
  },
  modalText: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    textAlign: "left",
    fontSize: 18,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalHeaderText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
  },

  closeButtonContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  photoBox: {
    backgroundColor: "#D9D9D9",
    width: 270, // Adjust the width as needed
    height: 180, // Adjust the height as needed
    marginBottom: 20, // Adjust the margin bottom as needed
    borderRadius: 10, // Adjust the border radius as needed
  },
  modalImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 10, // Adjust the border radius as needed
    paddingTop: 10, // Adjust the padding top as needed
  },

  greyBox: {
    backgroundColor: "#D9D9D9",
    width: 270, // Adjust the width as needed
    height: 140, // Adjust the height as needed
    marginBottom: 20, // Adjust the margin bottom as needed
    borderRadius: 10, // Adjust the border radius as needed
  },
});

export default CheckBox;
