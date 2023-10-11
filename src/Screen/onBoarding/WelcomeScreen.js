import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Images} from '../../helper/IconConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import OnBoardingText from '../../components/OnBoardingText';
import {strings} from '../../helper/Strings';
import OnBoardingSingleButton from '../../components/OnBoardingSingleButton';
import {color} from '../../helper/ColorConstant';

const WelcomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingTop: hp(4),
        }}>
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
      </View>
      <View style={{flex: 1}}>
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
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: '#ECEFEF',
          paddingBottom: hp(4),
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
              fontSize: fontSize(14),
              fontWeight: '400',
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
    height: hp(10),
    width: hp(10),
  },
  subContentStyle: {
    fontSize: fontSize(14),
  },
  buttonStyle: {
    marginVertical: hp(1),
    backgroundColor: 'white',
    borderWidth: 1,
  },
  signUpStyle: {
    flexDirection: 'row',
    marginVertical: hp(3),
    marginBottom: hp(5),
  },
  filedImageStyle: {
    marginStart: wp(3),
  },
  buttonTextStyle: {
    color: color.black,
    flex: 1,
  },
});

export default WelcomeScreen;
