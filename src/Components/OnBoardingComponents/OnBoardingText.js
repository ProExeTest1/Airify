import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {color} from '../../helper/ColorConstant';
import {fontSize, hp, wp} from '../../helper/Constant';

const OnBoardingText = ({
  OnBoardingSubText,
  OnBoardingMainText,
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
    width: wp(75),
    marginTop: hp(2),
    fontWeight: 'bold',
    color: color.black,
    textAlign: 'center',
    fontSize: fontSize(24),
  },
  OnBoardingSubTextStyle: {
    width: wp(63),
    color: color.black,
    textAlign: 'center',
    fontSize: fontSize(12),
  },
});

export default OnBoardingText;
