import React from 'react';
import OtpInputs from 'react-native-otp-inputs';
import {View, Text, StyleSheet} from 'react-native';

import {strings} from '../../helper/Strings';
import {hp, wp} from '../../helper/Constant';
import {Images} from '../../helper/IconConstant';
import {OnBoardingModuleHeader, OnBoardingSingleButton} from '../../components';
import {useSelector} from 'react-redux';

const OtpVerificationScreen = ({navigation: {goBack}, navigation}) => {
  const color = useSelector(state => state?.themereducer?.colorTheme);
  const styles = ThemeStyle(color);
  return (
    <View style={styles.container}>
      <View style={{flex: 0.27, backgroundColor: 'blue'}}>
        <OnBoardingModuleHeader
          onPress={() => {
            goBack();
          }}
          backImage={Images.backIcon}
          SubText={strings.OTPHeaderSub}
          MainText={strings.OTPHeaderMain}
        />
      </View>
      <View style={{flex: 0.73}}>
        <View style={styles.textInputView1}>
          <OtpInputs
            value="4"
            numberOfInputs={4}
            keyboardType="phone-pad"
            inputStyles={styles.otpInputStyle}
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
            buttonStyle={styles.buttonStyle}
            buttonText={strings.OnBoardingButtonSecond}
            onPress={() => {
              navigation.navigate('CreateNewPassword');
            }}
          />
        </View>
      </View>
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
      marginTop: hp(4),
      marginLeft: wp(6),
    },
    rememberLineStyle: {
      marginTop: hp(4),
      alignItems: 'center',
      justifyContent: 'center',
    },
    forgotPasswordStyle: {
      marginTop: hp(2),
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
      marginHorizontal: wp(5),
      backgroundColor: '#ECEFEF',
    },
    modalImageStyle: {
      width: wp(70),
      height: hp(30),
      marginTop: hp(2),
    },
    buttonViewStyle: {flex: 1, justifyContent: 'flex-end', marginBottom: hp(4)},
    textInputView1: {
      marginTop: hp(4),
      marginBottom: 10,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: wp(14),
    },
    otpInputStyle: {
      width: wp(14),
      height: hp(6),
      borderRadius: 10,
      letterSpacing: 5,
      textAlign: 'center',
      backgroundColor: '#DFE1E5',
    },
  });

export default OtpVerificationScreen;
