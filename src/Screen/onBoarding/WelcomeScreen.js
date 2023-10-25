import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import {strings} from '../../helper/Strings';
import {color} from '../../helper/ColorConstant';
import {Images} from '../../helper/IconConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import OnBoardingText from '../../components/OnBoardingText';
import OnBoardingSingleButton from '../../components/OnBoardingSingleButton';

const WelcomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image
        source={Images.welcomeScreenIcon}
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
          welcomeScreenFiledImageStyle={styles.filedImageStyle}
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
        />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
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
    marginVertical: hp(1),
    backgroundColor: 'white',
  },
  signUpStyle: {
    marginBottom: hp(5),
    flexDirection: 'row',
    marginVertical: hp(3),
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
