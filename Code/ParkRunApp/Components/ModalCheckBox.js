import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const ModalCheckBox = ({ modalVisible, modalText, modalHeaderText, toggleModal, greyBoxText }) => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalHeaderText}>{modalHeaderText}</Text>
            <View style={[styles.photoBox, { marginTop: 50 }]}>
              <Text style={styles.modalText}>Här ska det vara en bild</Text>
            </View>
            <View style={styles.greyBox}>
              <Text style = {styles.greyBoxText}>{greyBoxText} </Text>
            </View>
            <TouchableOpacity
              style={styles.closeButtonContainer}
              onPress={toggleModal}>
              <FontAwesomeIcon icon={faXmark} size={28} color={'black'} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };
  
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
      elevation: 5,
      width: '80%',
      height: '60%',
    },
    modalText: {
      textAlign: 'center',
      fontSize: 12,
    },
    modalHeaderText: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'left',
      left: 30,
      top: 10,

      position: 'absolute',
    },
    closeButtonContainer: {
      position: 'absolute',
      top: 10,
      right: 10,
    },
    photoBox: {
      backgroundColor: '#D9D9D9',
      marginTop: 30,
      width: 270,
      height: 270,
      marginBottom: 20,
      borderRadius: 10,
    },
    greyBox: {
      backgroundColor: '#D9D9D9',
      width: 270,
      height: 140,
      marginBottom: 20,
      borderRadius: 10,
    },
  });

export default ModalCheckBox;
