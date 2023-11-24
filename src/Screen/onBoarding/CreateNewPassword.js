import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {View, Text, StyleSheet, Image, ActivityIndicator} from 'react-native';

import {strings} from '../../helper/Strings';
import {Images} from '../../helper/IconConstant';
import {hp, wp} from '../../helper/Constant';
import {
  OnBoardingText,
  OnBoardingTextInput,
  OnBoardingModuleHeader,
  OnBoardingSingleButton,
} from '../../components';
import {useSelector} from 'react-redux';

const CreateNewPassword = ({navigation: {goBack}}) => {
  const [modal, setModal] = useState(false);
  const openModal = () => {
    setModal(true);
  };
  const closeModal = async () => {
    setModal(false);
  };
  const color = useSelector(state => state?.themereducer?.colorTheme);
  const styles = ThemeStyle(color);
  return (
    <View style={styles.container}>
      <View style={{flex: 0.27, backgroundColor: 'blue'}}>
        <OnBoardingModuleHeader
          onPress={() => {
            goBack();
          }}
          SubText={strings.subText}
          MainText={strings.welcome}
          backImage={Images.backIcon}
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
            onPress={openModal}
            buttonText={strings.SavePass}
            buttonStyle={styles.buttonStyle}
          />
        </View>
      </View>
      <Modal
        isVisible={modal}
        backdropOpacity={0.8}
        onDismiss={closeModal}
        onBackdropPress={closeModal}
        style={{
          justifyContent: 'center',
          margin: wp(0),
          paddingHorizontal: wp(10),
        }}>
        <View style={styles.modalView}>
          <Image
            style={styles.modalImageStyle}
            source={Images.passResetSuccess}
          />
          <OnBoardingText
            OnBoardingMainTextStyle={{color: 'blue'}}
            OnBoardingSubText={strings.WelcomeModalSubText}
            OnBoardingMainText={strings.PasswordChangeSuccessText}
            OnBoardingSubTextStyle={{width: wp(50), marginTop: hp(2)}}
          />
          <OnBoardingText
            OnBoardingSubTextStyle={{bottom: hp(3)}}
            OnBoardingSubText={strings.WelcomeModalSubText2}
          />
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </Modal>
    </View>
  );
};

const ThemeStyle = color =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    textInputTitleStyle: {
      marginLeft: wp(6),
    },
    rememberLineStyle: {
      marginTop: hp(2),
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    forgotPasswordStyle: {
      color: 'blue',
    },
    signUpStyle: {
      alignSelf: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: wp(22),
      justifyContent: 'space-around',
    },
    buttonStyle: {
      height: hp(6),
      marginTop: hp(4),
    },
    lineStyle: {
      height: 1,
      marginTop: hp(4),
      backgroundColor: '#ECEFEF',
      marginHorizontal: wp(5),
    },
    modalImageStyle: {
      width: wp(70),
      height: hp(30),
      marginTop: hp(2),
    },
    buttonViewStyle: {flex: 1, justifyContent: 'flex-end', marginBottom: hp(4)},
    modalView: {
      height: hp(58),
      borderRadius: 16,
      alignItems: 'center',
      backgroundColor: 'white',
    },
  });

export default CreateNewPassword;
