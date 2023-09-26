import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import OnBoardingModuleHeader from '../../components/OnBoardingModuleHeader';
import {Images} from '../../helper/IconConstant';
import {strings} from '../../helper/Strings';
import OnBoardingSingleButton from '../../components/OnBoardingSingleButton';
import OnBoardingText from '../../components/OnBoardingText';
import {fontSize, hp, wp} from '../../helper/Constant';
import OnBoardingTextInput from '../../components/OnBoardingTextInput';

const ResetPassword = ({navigation: {goBack}, navigation}) => {
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
        <Text style={styles.textInputTitleStyle}>{strings.Email}</Text>
        <OnBoardingTextInput
          textInputIcon={Images.Email}
          textInputPlaceholder={strings.Email}
        />
        <View style={styles.buttonViewStyle}>
          <View style={[styles.lineStyle]} />
          <OnBoardingSingleButton
            buttonText={strings.OnBoardingButtonSecond}
            buttonStyle={styles.buttonStyle}
            onPress={() => {
              navigation.navigate('OtpVerificationScreen');
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
