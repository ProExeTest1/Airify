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
import CheckButton from '../../components/CheckButton';

const SignInScreen = ({navigation: {goBack}, navigation}) => {
  const [modal, setModal] = useState(false);
  const [checked, setChecked] = useState(false);

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
        <Text style={styles.textInputTitleStyle}>{strings.Email}</Text>
        <OnBoardingTextInput
          textInputIcon={Images.Email}
          textInputPlaceholder={strings.Email}
        />
        <Text style={styles.textInputTitleStyle}>{strings.Password}</Text>
        <OnBoardingTextInput
          textInputIcon={Images.password}
          textInputPlaceholder={strings.Password}
        />
        <View style={styles.rememberLineStyle}>
          <View
            style={{
              marginHorizontal: wp(6),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <CheckButton
              check={checked}
              onPress={() => {
                setChecked(!checked);
              }}
            />
            <Text style={{marginLeft: wp(6)}}>{strings.RememberMe}</Text>
          </View>
          <View style={{marginLeft: wp(12)}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ResetPassword');
              }}>
              <Text style={styles.forgotPasswordStyle}>
                {strings.ForgotPassword}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.lineStyle} />
        <View style={styles.signUpStyle}>
          <OnBoardingText
            OnBoardingSubText={strings.signUpLine}
            OnBoardingSubTextStyle={{fontSize: fontSize(14), fontWeight: '400'}}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignUpScreen');
            }}>
            <OnBoardingText
              OnBoardingSubText={strings.signUp}
              OnBoardingSubTextStyle={{
                color: 'blue',
                fontSize: fontSize(14),
                fontWeight: '400',
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.lineStyle, {marginTop: hp(18)}]} />
        <OnBoardingSingleButton
          buttonText={strings.signInText}
          buttonStyle={styles.buttonStyle}
          onPress={openModal}
        />
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
        <View
          style={{
            backgroundColor: 'white',
            height: hp(55),
            borderRadius: 16,
            alignItems: 'center',
          }}>
          <Image
            source={Images.WelcomeScreenModalImage}
            style={styles.modalImageStyle}
          />
          <OnBoardingText
            OnBoardingMainText={strings.WelcomeModalMainText}
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
    marginTop: hp(2),
    alignItems: 'center',
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
  checkbox: {
    alignSelf: 'center',
  },
});

export default SignInScreen;
