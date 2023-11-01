import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {strings} from '../../helper/Strings';
import {color} from '../../helper/ColorConstant';
import {Images} from '../../helper/IconConstant';
import CheckButton from '../../components/OnBoardingComponents/CheckButton';
import {fontSize, hp, wp} from '../../helper/Constant';
import {AlertConstant} from '../../helper/AlertConstant';
import {
  OnBoardingText,
  OnBoardingTextInput,
  OnBoardingModuleHeader,
  OnBoardingSingleButton,
} from '../../components';
import DeviceInfo from 'react-native-device-info';

const SignInScreen = ({navigation: {goBack}, navigation}) => {
  const [Email, setEmail] = useState('');
  const [modal, setModal] = useState(false);
  const [condition, setCondition] = useState(false);
  const [Password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);

  const openModal = () => {
    setModal(true);
  };
  const closeModal = async () => {
    setModal(false);
  };

  const validation = () => {
    if (!Email?.trim()?.match('[a-z0-9]+@[a-z]+.[a-z]{2,3}')) {
      AlertConstant(strings.please_enter_valid_email);
      return;
    } else if (
      !Password.trim().match(
        /^(?=.*[0-9])(?=.*[!@#$%^&*.])[a-zA-Z0-9!@#$%^&*.]{8,16}$/,
      )
    ) {
      AlertConstant(strings.please_enter_valid_password);
      return;
    } else {
      handleLogin();
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('remember-key');
      const RememberMeValue = JSON.parse(jsonValue);
      setEmail(RememberMeValue?.Email);
      setPassword(RememberMeValue?.Password);
    } catch (e) {
      console.log('e :>> ', e);
    }
  };
  const handleLogin = async () => {
    try {
      const isUserLogin = await auth().signInWithEmailAndPassword(
        Email,
        Password,
      );
      await firestore()
        .collection('Users')
        .doc(auth().currentUser.uid)
        .update({
          DeviceId: await DeviceInfo.getUniqueId(),
          Password: Password,
        });
      if (checked == true) {
        let value = {Email, Password};
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('remember-key', jsonValue);
      }
      openModal();
      setTimeout(() => {
        closeModal();
        navigation.navigate('TabNavigation');
      }, 2000);
    } catch (error) {
      // console.log(error.message);
      AlertConstant('Please Enter Valid Credetials');
    }
  };

  return (
    <View style={styles.container}>
      <OnBoardingModuleHeader
        onPress={() => {
          goBack();
        }}
        SubText={strings.subText}
        MainText={strings.welcome}
        backImage={Images.backIcon}
      />
      <View style={{paddingTop: hp(4), flex: 1}}>
        <Text style={styles.textInputTitleStyle}>{strings.EmailText}</Text>
        <OnBoardingTextInput
          value={Email}
          textInputIcon={Images.Email}
          keyboardType={'email-address'}
          onChangeText={email => setEmail(email)}
          textInputPlaceholder={strings.EmailText}
        />
        <Text style={styles.textInputTitleStyle}>{strings.Password}</Text>
        <OnBoardingTextInput
          value={Password}
          keyboardType={'default'}
          textInputIcon={Images.password}
          textInputPlaceholder={strings.Password}
          onChangeText={password => setPassword(password)}
        />
        <View style={styles.rememberLineStyle}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: wp(6),
            }}>
            <CheckButton
              check={checked}
              onPress={() => {
                setChecked(!checked);
              }}
            />
            <Text style={{marginLeft: wp(6), color: color.black}}>
              {strings.RememberMe}
            </Text>
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
        <View style={styles.signUpStyle}>
          <Text style={{color: 'black'}}>{strings.signUpLine}</Text>
          <TouchableOpacity
            style={{marginLeft: wp(1)}}
            onPress={() => {
              navigation.navigate('SignUpScreen');
            }}>
            <Text
              style={{
                color: 'blue',
                fontWeight: '400',
                fontSize: fontSize(14),
              }}>
              {strings.signUp}
            </Text>
          </TouchableOpacity>
        </View>
        <OnBoardingSingleButton
          buttonText={strings.signInText}
          buttonStyle={styles.buttonStyle}
          onPress={() => {
            validation();
          }}
        />
      </View>

      {/* ------------------------------------------------->>> Modal  */}
      <Modal
        isVisible={modal}
        backdropOpacity={0.8}
        onDismiss={closeModal}
        onBackdropPress={closeModal}
        style={{
          flex: 1,
          margin: wp(0),
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: wp(10),
        }}>
        <View
          style={{
            borderRadius: 16,
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <Image
            style={styles.modalImageStyle}
            source={Images.WelcomeScreenModalImage}
          />
          <OnBoardingText
            OnBoardingMainTextStyle={{color: 'blue'}}
            OnBoardingSubText={strings.WelcomeModalSubText}
            OnBoardingSubTextStyle={{marginVertical: hp(4)}}
            OnBoardingMainText={strings.WelcomeModalMainText}
          />
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={{marginBottom: hp(2)}}
          />
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
    color: color.black,
  },
  rememberLineStyle: {
    marginTop: hp(2),
    flexDirection: 'row',
  },
  forgotPasswordStyle: {
    color: 'blue',
  },
  signUpStyle: {
    flex: 1,
    borderTopWidth: 1,
    paddingTop: hp(4),
    flexDirection: 'row',
    marginVertical: hp(5),
    borderBottomWidth: 1,
    borderColor: '#ECEFEF',
    marginHorizontal: wp(6),
    justifyContent: 'center',
  },
  buttonStyle: {
    height: hp(6),
    bottom: hp(2.5),
  },
  lineStyle: {
    height: 1,
    marginTop: hp(4),
    marginHorizontal: wp(5),
    backgroundColor: '#ECEFEF',
  },
  modalImageStyle: {
    width: wp(70),
    height: hp(30),
    marginTop: hp(2),
  },
  checkbox: {
    alignSelf: 'center',
  },
});

export default SignInScreen;
