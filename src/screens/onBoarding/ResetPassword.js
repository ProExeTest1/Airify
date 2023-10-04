import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import OnBoardingModuleHeader from '../../components/OnBoardingModuleHeader';
import {Images} from '../../helper/IconConstant';
import {strings} from '../../helper/Strings';
import OnBoardingSingleButton from '../../components/OnBoardingSingleButton';
import OnBoardingText from '../../components/OnBoardingText';
import {fontSize, hp, wp} from '../../helper/Constant';
import OnBoardingTextInput from '../../components/OnBoardingTextInput';
import auth, {firebase} from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {otp} from '../../redux/action/HomeAction';

const ResetPassword = ({navigation: {goBack}, navigation}) => {
  const [email, setEmail] = useState('');
  const validation = () => {
    if (!email.trim().match('[a-z0-9]+@[a-z]+.[a-z]{2,3}')) {
      alert('Please Enter Email which are use in login');
      return;
    } else {
      sendOTP();
    }
  };

  const sendOTP = async () => {
    try {
      await auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          alert('Password reset email has been sent successfully.');
        })
        .catch(err => {
          console.log('err :>> ', err);
        });
    } catch (error) {
      console.log('error :>> ', error);
    }
    await auth().signOut();
    navigation.navigate('SignInScreen');
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 0.27, backgroundColor: 'blue'}}>
        <OnBoardingModuleHeader
          backImage={Images.backIcon}
          onPress={() => {
            goBack();
          }}
          MainText={strings.HeaderMain}
          SubText={strings.HeaderSub}
        />
      </View>
      <View style={{flex: 0.73, marginTop: hp(3)}}>
        <Text style={styles.textInputTitleStyle}>{strings.EmailText}</Text>
        <OnBoardingTextInput
          textInputIcon={Images.Email}
          textInputPlaceholder={strings.EmailText}
          value={email}
          onChangeText={email => setEmail(email)}
          keyboardType={'email-address'}
        />
        <View style={styles.buttonViewStyle}>
          <View style={[styles.lineStyle]} />
          <OnBoardingSingleButton
            buttonText={strings.EmailSend}
            buttonStyle={styles.buttonStyle}
            onPress={() => {
              validation();
            }}
          />
        </View>
      </View>
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
    color: 'black',
  },
  signUpStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: wp(22),
    alignSelf: 'center',
  },
  buttonStyle: {
    marginTop: hp(3),
    height: hp(6),
  },
  lineStyle: {
    height: 1,
    backgroundColor: '#ECEFEF',
    marginHorizontal: wp(5),
  },
  buttonViewStyle: {flex: 1, justifyContent: 'flex-end', marginBottom: hp(4)},
});

export default ResetPassword;
