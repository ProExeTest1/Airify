import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {View, Text, StyleSheet} from 'react-native';
import {strings} from '../../helper/Strings';
import {hp, wp} from '../../helper/Constant';
import {Images} from '../../helper/IconConstant';
import OnBoardingModuleHeader from '../../components/OnBoardingModuleHeader';
import OnBoardingSingleButton from '../../components/OnBoardingSingleButton';
import OnBoardingTextInput from '../../components/OnBoardingTextInput';
import {AlertConstant} from '../../helper/AlertConstant';

const ResetPassword = ({navigation: {goBack}, navigation}) => {
  const [email, setEmail] = useState('');

  const validation = () => {
    if (!email.trim().match('[a-z0-9]+@[a-z]+.[a-z]{2,3}')) {
      AlertConstant('Please Enter Email which are use in login');
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
          AlertConstant('Password reset email has been sent successfully.');
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
          onPress={() => {
            goBack();
          }}
          SubText={strings.HeaderSub}
          backImage={Images.backIcon}
          MainText={strings.HeaderMain}
        />
      </View>
      <View style={{flex: 0.73, marginTop: hp(3)}}>
        <Text style={styles.textInputTitleStyle}>{strings.EmailText}</Text>
        <OnBoardingTextInput
          value={email}
          textInputIcon={Images.Email}
          keyboardType={'email-address'}
          onChangeText={email => setEmail(email)}
          textInputPlaceholder={strings.EmailText}
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
    color: 'black',
    marginLeft: wp(6),
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
    marginTop: hp(3),
  },
  lineStyle: {
    height: 1,
    marginHorizontal: wp(5),
    backgroundColor: '#ECEFEF',
  },
  buttonViewStyle: {flex: 1, justifyContent: 'flex-end', marginBottom: hp(4)},
});

export default ResetPassword;
