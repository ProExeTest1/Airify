import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {fontSize, hp, wp} from '../helper/Constant';

const OnBoardingModuleHeader = ({
  backImage,
  backImageStyle,
  onPress,
  MainText,
  SubText,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Image
          source={backImage}
          style={[styles.backImageStyle, backImageStyle]}
        />
      </TouchableOpacity>
      <Text style={styles.WelcomeTextStyle}>{MainText}</Text>
      <Text
        style={[
          styles.WelcomeTextStyle,
          {
            fontSize: fontSize(14),
            marginTop: hp(2),
            fontFamily: 'Poppins-Regular',
          },
        ]}>
        {SubText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: wp(4),
  },
  backImageStyle: {
    height: hp(3),
    width: hp(3),
    resizeMode: 'contain',
    tintColor: 'white',
    marginTop: hp(8),
  },
  WelcomeTextStyle: {
    marginTop: hp(4),
    fontWeight: '600',
    fontSize: fontSize(26),
    color: 'white',
    fontFamily: 'Poppins-Regular',
  },
});

export default OnBoardingModuleHeader;
