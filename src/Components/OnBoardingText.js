import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {fontSize, hp, wp} from '../helper/Constant';
import {color} from '../helper/ColorConstant';

const OnBoardingText = ({
  OnBoardingMainText,
  OnBoardingSubText,
  OnBoardingSubTextStyle,
  OnBoardingMainTextStyle,
}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.OnBoardingMainTextStyle, OnBoardingMainTextStyle]}>
        {OnBoardingMainText}
      </Text>
      <Text style={[styles.OnBoardingSubTextStyle, OnBoardingSubTextStyle]}>
        {OnBoardingSubText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  OnBoardingMainTextStyle: {
    fontSize: fontSize(24),
    textAlign: 'center',
    marginTop: hp(2),
    fontWeight: '600',
    width: wp(75),
    color: color.black,
  },
  OnBoardingSubTextStyle: {
    fontSize: fontSize(12),
    textAlign: 'center',
    width: wp(63),
    color: color.black,
    bottom: hp(4),
  },
});

export default OnBoardingText;
