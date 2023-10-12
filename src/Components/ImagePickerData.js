import React, {Component, useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
} from 'react-native';
import Modal from 'react-native-modal';
import {hp, wp} from '../helper/Constant';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import TextData from './TextData';
import ButtonData from './ButtonData';
import {Images} from '../helper/IconConstant';

const ImagePickerData = ({pickerResponse, setPickerResponse, boxStyle}) => {
  const [modal, setModal] = useState(false);
  const openModal = () => {
    setModal(true);
  };

  const closeModal = async () => {
    setModal(false);
    const result = await launchImageLibrary(options);
  };
  const onImageLibraryPress = useCallback(() => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    launchImageLibrary(options, res => {
      res.didCancel ? closeModal() : setPickerResponse(res?.assets[0].uri);
      closeModal();
    });
  }, []);

  const onCameraPress = useCallback(async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
    };
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'App Camera Permission',
        message: 'App needs access to your camera ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      launchCamera(options, res => {
        setModalVisible(false);
        setPickerResponse(res?.assets[0].uri);
      });
    }
  }, []);

  const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          openModal();
        }}>
        <View>
          <Image
            style={styles.boxStyle}
            source={
              pickerResponse ? {uri: pickerResponse} : Images.imagePickIcon
            }
          />
          {/* <Image
            source={Images.editIcon}
            style={{
              width: hp(3),
              height: hp(3),
              position: 'absolute',
              alignSelf: 'flex-end',
              right: wp(38),
              top: hp(9),
              tintColor: 'white',
              backgroundColor: 'blue',
            }}
          /> */}
        </View>
      </TouchableOpacity>

      <Modal
        isVisible={modal}
        onBackdropPress={closeModal}
        style={{
          justifyContent: 'flex-end',
          margin: wp(0),
        }}>
        <View
          style={{
            backgroundColor: '#3C93D7',
            height: hp(23.35),
            borderRadius: 16,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ButtonData
            button="Choose From Gallery"
            buttonStyle={styles.buttonStyle}
            onPress={() => {
              onImageLibraryPress();
            }}
          />
          <ButtonData
            button="Take Photo"
            buttonStyle={styles.buttonStyle}
            onPress={() => {
              onCameraPress();
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePlusStyle: {
    width: hp(4.27),
    height: hp(4.27),
  },
  boxStyle: {
    width: hp(12.27),
    height: hp(12.27),
    borderRadius: hp(12.27 / 2),
    borderColor: '#DFDFDF',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonStyle: {
    marginVertical: hp(1),
    width: '80%',
  },
});

export default ImagePickerData;
