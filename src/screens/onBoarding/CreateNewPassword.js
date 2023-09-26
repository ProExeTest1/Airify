import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import OnBoardingModuleHeader from '../../components/OnBoardingModuleHeader';
import {Images} from '../../helper/IconConstant';
import {strings} from '../../helper/Strings';
import OnBoardingTextInput from '../../components/OnBoardingTextInput';
import {fontSize, hp, wp} from '../../helper/Constant';
import OnBoardingText from '../../components/OnBoardingText';
import OnBoardingSingleButton from '../../components/OnBoardingSingleButton';
import Modal from 'react-native-modal';

const CreateNewPassword = ({navigation: {goBack}, navigation}) => {
  const [modal, setModal] = useState(false);
  const openModal = () => {
    setModal(true);
  };
  const closeModal = async () => {
    setModal(false);
  };
  return (
    <View style={styles.container}>
      <View style={{flex: 0.27, backgroundColor: 'blue'}}>
        <OnBoardingModuleHeader
          backImage={Images.backIcon}
          onPress={() => {
            goBack();
          }}
          MainText={strings.welcome}
          SubText={strings.subText}
        />
      </View>
      <View style={{flex: 0.73, marginTop: hp(4)}}>
        <Text style={styles.textInputTitleStyle}>{strings.newPass}</Text>
        <OnBoardingTextInput
          textInputIcon={Images.Email}
          textInputPlaceholder={strings.Password}
        />
        <Text style={styles.textInputTitleStyle}>{strings.cPass}</Text>
        <OnBoardingTextInput
          textInputIcon={Images.password}
          textInputPlaceholder={strings.cPass}
        />
        <View style={styles.buttonViewStyle}>
          <View style={styles.lineStyle} />
          <OnBoardingSingleButton
            buttonText={strings.SavePass}
            buttonStyle={styles.buttonStyle}
            onPress={openModal}
          />
        </View>
      </View>
      <Modal
        onBackdropPress={closeModal}
        onDismiss={closeModal}
        backdropOpacity={0.8}
        isVisible={modal}
        style={{
          justifyContent: 'center',
          margin: wp(0),
          paddingHorizontal: wp(10),
        }}>
        <View style={styles.modalView}>
          <Image
            source={Images.passResetSuccess}
            style={styles.modalImageStyle}
          />
          <OnBoardingText
            OnBoardingMainText={strings.PasswordChangeSuccessText}
            OnBoardingMainTextStyle={{color: 'blue'}}
            OnBoardingSubText={strings.WelcomeModalSubText}
            OnBoardingSubTextStyle={{width: wp(50), marginTop: hp(2)}}
          />
          <OnBoardingText
            OnBoardingSubText={strings.WelcomeModalSubText2}
            OnBoardingSubTextStyle={{bottom: hp(3)}}
          />
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  textInputTitleStyle: {
    marginLeft: wp(6),
  },
  rememberLineStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: hp(2),
  },
  forgotPasswordStyle: {
    color: 'blue',
  },
  signUpStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: wp(22),
    alignSelf: 'center',
  },
  buttonStyle: {
    marginTop: hp(4),
    height: hp(6),
  },
  lineStyle: {
    height: 1,
    backgroundColor: '#ECEFEF',
    marginHorizontal: wp(5),
    marginTop: hp(4),
  },
  modalImageStyle: {
    height: hp(30),
    width: wp(70),
    marginTop: hp(2),
  },
  buttonViewStyle: {flex: 1, justifyContent: 'flex-end', marginBottom: hp(4)},
  modalView: {
    backgroundColor: 'white',
    height: hp(58),
    borderRadius: 16,
    alignItems: 'center',
  },
});

export default CreateNewPassword;
