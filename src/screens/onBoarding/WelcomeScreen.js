import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Images} from '../../helper/IconConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import OnBoardingText from '../../components/OnBoardingText';
import {strings} from '../../helper/Strings';
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
        OnBoardingMainTextStyle={styles.appStyle}
      />
      <OnBoardingText
        OnBoardingSubText={strings.subContent}
        OnBoardingSubTextStyle={styles.subContentStyle}
      />
      <View>
        <OnBoardingSingleButton
          buttonTextStyle={styles.buttonTextStyle}
          buttonStyle={[styles.buttonStyle, {marginTop: hp(6)}]}
          welcomeScreenFiledImage={Images.google}
          buttonText={strings.signUpGoogle}
          welcomeScreenFiledImageStyle={styles.filedImageStyle}
        />
        <OnBoardingSingleButton
          buttonStyle={styles.buttonStyle}
          welcomeScreenFiledImage={Images.apple}
          buttonText={strings.signUpApple}
          welcomeScreenFiledImageStyle={styles.filedImageStyle}
          buttonTextStyle={styles.buttonTextStyle}
        />
        <OnBoardingSingleButton
          buttonStyle={styles.buttonStyle}
          welcomeScreenFiledImage={Images.facebook}
          buttonText={strings.signUpFacebook}
          welcomeScreenFiledImageStyle={styles.filedImageStyle}
          buttonTextStyle={styles.buttonTextStyle}
        />
        <OnBoardingSingleButton
          buttonStyle={styles.buttonStyle}
          welcomeScreenFiledImage={Images.twitter}
          buttonText={strings.signUpTwitter}
          welcomeScreenFiledImageStyle={styles.filedImageStyle}
          buttonTextStyle={styles.buttonTextStyle}
        />
      </View>
      <View>
        <OnBoardingSingleButton
          buttonStyle={{marginTop: hp(6), height: hp(5)}}
          buttonText={strings.signIn}
          onPress={() => {
            navigation.navigate('SignInScreen');
          }}
        />
      </View>
      <View style={styles.signUpStyle}>
        <OnBoardingText
          OnBoardingSubText={strings.signUpLine}
          OnBoardingSubTextStyle={{fontSize: fontSize(14), fontWeight: '400'}}
        />
        <TouchableOpacity>
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
    height: hp(10),
    width: hp(10),
    marginTop: hp(12),
  },
  subContentStyle: {
    fontSize: fontSize(14),
  },
  buttonStyle: {
    marginVertical: hp(1),
    height: hp(5),
    backgroundColor: 'white',
    borderWidth: 0.4,
  },
  signUpStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: wp(22),
    marginTop: hp(4),
  },
  appStyle: {
    marginTop: hp(6),
  },
  filedImageStyle: {
    position: 'absolute',
    left: wp(3),
  },
  buttonTextStyle: {
    color: 'black',
  },
});

export default WelcomeScreen;
