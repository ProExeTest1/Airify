import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {fontSize, hp, wp} from '../helper/Constant';

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
    fontFamily: 'Poppins-Bold',
  },
  OnBoardingSubTextStyle: {
    fontSize: fontSize(12),
    textAlign: 'center',
    fontWeight: '200',
    width: wp(63),
    fontFamily: 'Poppins-Regular',
  },
});

export default OnBoardingText;
