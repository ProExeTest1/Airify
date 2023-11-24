import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import {strings} from '../../helper/Strings';

import {Images} from '../../helper/IconConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import {OnBoardingText, OnBoardingSingleButton} from '../../components';
import {useSelector} from 'react-redux';

const WelcomeScreen = ({navigation}) => {
  const strings = useSelector(state => state?.languageReducer?.languageObject);
  const color = useSelector(state => state?.themereducer?.colorTheme);
  const styles = ThemeStyle(color);
  return (
    <View style={styles.container}>
      <Image
        source={
          color.white == '#fff'
            ? Images.welcomeScreenIcon
            : Images?.welcomeScreenDarkIcon
        }
        style={styles.welcomeScreenIconStyle}
      />
      <OnBoardingText
        OnBoardingMainText={strings.AppName}
        OnBoardingSubText={strings.subContent}
        OnBoardingMainTextStyle={styles.appStyle}
        OnBoardingSubTextStyle={styles.subContentStyle}
      />
      <View style={{flex: 1}}>
        <OnBoardingSingleButton
          buttonText={strings.signUpGoogle}
          welcomeScreenFiledImage={Images.google}
          buttonTextStyle={styles.buttonTextStyle}
          welcomeScreenFiledImageStyle={styles.filedImageStyle}
          buttonStyle={[styles.buttonStyle, {marginTop: hp(6)}]}
        />
        <OnBoardingSingleButton
          buttonStyle={styles.buttonStyle}
          buttonText={strings.signUpApple}
          welcomeScreenFiledImage={Images.apple}
          buttonTextStyle={styles.buttonTextStyle}
          welcomeScreenFiledImageStyle={[
            styles.filedImageStyle,
            {tintColor: color.black},
          ]}
        />
        <OnBoardingSingleButton
          buttonStyle={styles.buttonStyle}
          buttonText={strings.signUpFacebook}
          buttonTextStyle={styles.buttonTextStyle}
          welcomeScreenFiledImage={Images.facebook}
          welcomeScreenFiledImageStyle={styles.filedImageStyle}
        />
        <OnBoardingSingleButton
          buttonStyle={styles.buttonStyle}
          buttonText={strings.signUpTwitter}
          welcomeScreenFiledImage={Images.twitter}
          buttonTextStyle={styles.buttonTextStyle}
          welcomeScreenFiledImageStyle={styles.filedImageStyle}
        />
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          paddingBottom: hp(4),
          borderColor: '#ECEFEF',
        }}>
        <OnBoardingSingleButton
          buttonStyle={{marginTop: hp(6), height: hp(5)}}
          buttonText={strings.signIn}
          onPress={() => {
            navigation.navigate('SignInScreen');
          }}
          buttonTextStyle={{color: 'white'}}
        />
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
    </View>
  );
};

const ThemeStyle = color =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: color.onBoardingBgColor,
    },
    welcomeScreenIconStyle: {
      width: hp(10),
      height: hp(10),
      marginTop: hp(10),
    },
    subContentStyle: {
      marginTop: hp(3),
      fontSize: fontSize(14),
    },
    buttonStyle: {
      borderWidth: 1,
      borderColor: color.grey,
      marginVertical: hp(1),
      backgroundColor: color.grayLight2,
    },
    signUpStyle: {
      marginBottom: hp(5),
      flexDirection: 'row',
      marginVertical: hp(3),
      alignItems: 'center',
    },
    filedImageStyle: {
      marginStart: wp(3),
    },
    buttonTextStyle: {
      flex: 1,
      color: color.black,
    },
    appStyle: {
      marginTop: hp(6),
    },
  });

export default WelcomeScreen;
