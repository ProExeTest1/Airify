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
import {useSelector} from 'react-redux';

const SignInScreen = ({navigation: {goBack}, navigation}) => {
  const [Email, setEmail] = useState('');
  const [modal, setModal] = useState(false);
  const [condition, setCondition] = useState(false);
  const [Password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const strings = useSelector(state => state?.languageReducer?.languageObject);
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
      await auth()
        .signInWithEmailAndPassword(Email, Password)
        .then(async uid => {
          await firestore()
            .collection('Users')
            .doc(uid.user.uid)
            .update({
              DeviceId: await DeviceInfo.getUniqueId(),
              Password: Password,
            })
            .then(async id => {
              await firestore()
                .collection('Users')
                .doc(uid.user.uid)
                .get()
                .then(async Data => {
                  const userData = Data.data();
                  const jsonValue = JSON.stringify(uid.user.uid);
                  AsyncStorage.setItem('User_UID', jsonValue);
                  if (
                    !userData.Name &&
                    !userData.profileImageURL &&
                    !userData.PhoneNumber &&
                    !userData.BirthDate
                  ) {
                    auth().signOut();
                    navigation.navigate('SignUpScreen', {index: 1});
                  } else if (!userData.JourneyData) {
                    auth().signOut();
                    navigation.navigate('SignUpScreen', {index: 2});
                  } else if (!userData.DineWay) {
                    auth().signOut();
                    navigation.navigate('SignUpScreen', {index: 3});
                  } else if (!userData.FlyData) {
                    auth().signOut();
                    navigation.navigate('SignUpScreen', {index: 4});
                  } else if (!userData.PIN) {
                    auth().signOut();
                    navigation.navigate('SignUpScreen', {index: 6});
                  } else {
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
                  }
                });
            });
        });
    } catch (error) {
      AlertConstant('Please Enter Valid Credetials');
    }
  };
  const color = useSelector(state => state?.themereducer?.colorTheme);
  const styles = ThemeStyle(color);
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
          onSubmitEditing={() => passwordRef?.focus()}
        />
        <Text style={styles.textInputTitleStyle}>{strings.Password}</Text>
        <OnBoardingTextInput
          value={Password}
          keyboardType={'default'}
          ref={input => (passwordRef = input)}
          textInputIcon={Images.password}
          textInputPlaceholder={strings.Password}
          onChangeText={password => setPassword(password)}
        />
        <View style={styles.rememberLineStyle}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <CheckButton
              check={checked}
              onPress={() => {
                setChecked(!checked);
              }}
            />
            <Text style={{marginLeft: wp(4), color: color.black, flex: 1}}>
              {strings.RememberMe}
            </Text>
          </View>
          <View style={{marginRight: wp(3)}}>
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
          <Text style={{color: color.black}}>{strings.signUpLine}</Text>
          <TouchableOpacity
            style={{marginLeft: wp(1)}}
            onPress={() => {
              navigation.navigate('SignUpScreen');
            }}>
            <Text
              style={{
                color: color.commonBlue,
                fontWeight: '600',
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
            backgroundColor: color.white,
          }}>
          <Image
            style={styles.modalImageStyle}
            source={
              color.white == '#fff'
                ? Images.WelcomeScreenModalImage
                : Images.WelcomeScreenModalDarkImage
            }
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

const ThemeStyle = color =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.onBoardingBgColor,
    },
    textInputTitleStyle: {
      marginLeft: wp(6),
      color: color.black,
    },
    rememberLineStyle: {
      flexDirection: 'row',
      paddingVertical: hp(1),
      marginHorizontal: wp(2),
    },
    forgotPasswordStyle: {
      color: color.commonBlue,
      fontWeight: '600',
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
