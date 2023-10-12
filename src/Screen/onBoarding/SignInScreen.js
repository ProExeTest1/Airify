import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
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
import auth from '@react-native-firebase/auth';
import firestore, {firebase} from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {color} from '../../helper/ColorConstant';

const SignInScreen = ({navigation: {goBack}, navigation}) => {
  const [modal, setModal] = useState(false);
  const [checked, setChecked] = useState(false);
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const openModal = () => {
    setModal(true);
  };
  const closeModal = async () => {
    setModal(false);
  };

  const validation = () => {
    if (!Email.trim().match('[a-z0-9]+@[a-z]+.[a-z]{2,3}')) {
      alert('Please Enter valid Email');
      return;
    } else if (
      !Password.trim().match(
        /^(?=.*[0-9])(?=.*[!@#$%^&*.])[a-zA-Z0-9!@#$%^&*.]{8,16}$/,
      )
    ) {
      alert('Please Enter Valid Password');
      return;
    } else {
      openModal();
      setTimeout(() => {
        handleLogin();
        closeModal();
      }, 5000);
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
      await firestore().collection('Users').doc(auth().currentUser.uid).update({
        Password: Password,
      });
      if (checked == true) {
        let value = {Email, Password};
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('remember-key', jsonValue);
      }
      navigation.navigate('TabNavigation');
    } catch (error) {
      console.log(error.message);
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <OnBoardingModuleHeader
        backImage={Images.backIcon}
        onPress={() => {
          goBack();
        }}
        MainText={strings.welcome}
        SubText={strings.subText}
      />
      <View style={{flex: 0.73, marginTop: hp(4)}}>
        <Text style={styles.textInputTitleStyle}>{strings.EmailText}</Text>
        <OnBoardingTextInput
          textInputIcon={Images.Email}
          textInputPlaceholder={strings.EmailText}
          value={Email}
          onChangeText={email => setEmail(email)}
          keyboardType={'email-address'}
        />
        <Text style={styles.textInputTitleStyle}>{strings.Password}</Text>
        <OnBoardingTextInput
          textInputIcon={Images.password}
          textInputPlaceholder={strings.Password}
          value={Password}
          onChangeText={password => setPassword(password)}
          keyboardType={'default'}
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
            OnBoardingSubTextStyle={{
              fontSize: fontSize(14),
              fontWeight: '400',
            }}
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
          onPress={() => {
            validation();
          }}
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
            OnBoardingSubTextStyle={{width: wp(50), marginTop: hp(6)}}
          />
          <OnBoardingText
            OnBoardingSubText={strings.WelcomeModalSubText2}
            OnBoardingSubTextStyle={{bottom: hp(7)}}
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
    color: color.black,
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
    top: hp(4),
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
