import React, {useCallback, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
} from 'react-native';
import Modal from 'react-native-modal';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

import ButtonData from './ButtonData';
import {hp, wp} from '../helper/Constant';
import {Images} from '../helper/IconConstant';
import {strings} from '../helper/Strings';

const ImagePickerData = ({pickerResponse, setPickerResponse}) => {
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
        title: strings.title,
        message: strings.alert_meassage,
        buttonNeutral: strings.Ask_me_latter,
        buttonNegative: strings.cancel,
        buttonPositive: strings.ok,
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
        </View>
      </TouchableOpacity>
      <Modal
        isVisible={modal}
        onBackdropPress={closeModal}
        style={styles.modalStyle}>
        <View style={styles.modalViewStyle}>
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
    borderWidth: 2,
    width: hp(12.27),
    height: hp(12.27),
    alignSelf: 'center',
    alignItems: 'center',
    borderColor: '#DFDFDF',
    justifyContent: 'center',
    borderRadius: hp(12.27 / 2),
  },
  buttonStyle: {
    width: '80%',
    marginVertical: hp(1),
  },
  modalStyle: {
    margin: wp(0),
    justifyContent: 'flex-end',
  },
  modalViewStyle: {
    borderRadius: 16,
    height: hp(23.35),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3C93D7',
  },
});

export default ImagePickerData;
