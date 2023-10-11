import React, {Component} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import OnBoardingModuleHeader from '../../components/OnBoardingModuleHeader';
import {Images} from '../../helper/IconConstant';
import {strings} from '../../helper/Strings';
import {hp, wp} from '../../helper/Constant';
import OnBoardingSingleButton from '../../components/OnBoardingSingleButton';
import OtpInputs from 'react-native-otp-inputs';

const OtpVerificationScreen = ({navigation: {goBack}, navigation}) => {
  return (
    <View style={styles.container}>
      <View style={{flex: 0.27, backgroundColor: 'blue'}}>
        <OnBoardingModuleHeader
          backImage={Images.backIcon}
          onPress={() => {
            goBack();
          }}
          MainText={strings.OTPHeaderMain}
          SubText={strings.OTPHeaderSub}
        />
      </View>
      <View style={{flex: 0.73}}>
        <View style={styles.textInputView1}>
          <OtpInputs
            keyboardType="phone-pad"
            inputStyles={styles.otpInputStyle}
            numberOfInputs={4}
            value="4"
          />
        </View>
        <View style={styles.rememberLineStyle}>
          <Text>{strings.MailNotReceive}</Text>
          <Text style={styles.forgotPasswordStyle}>
            {strings.resendCodeText} 52 s
          </Text>
        </View>
        <View style={styles.buttonViewStyle}>
          <View style={styles.lineStyle} />
          <OnBoardingSingleButton
            buttonText={strings.OnBoardingButtonSecond}
            buttonStyle={styles.buttonStyle}
            onPress={() => {
              navigation.navigate('CreateNewPassword');
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
    marginTop: hp(4),
  },
  rememberLineStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(4),
  },
  forgotPasswordStyle: {
    marginTop: hp(2),
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
  textInputView1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: hp(4),
    paddingHorizontal: wp(14),
  },
  otpInputStyle: {
    backgroundColor: '#DFE1E5',
    textAlign: 'center',
    height: hp(6),
    width: wp(14),
    borderRadius: 10,
    letterSpacing: 5,
  },
});

export default OtpVerificationScreen;
