import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {fontSize, hp, wp} from '../../helper/Constant';
import {useSelector} from 'react-redux';

const OnBoardingText = ({
  OnBoardingSubText,
  OnBoardingMainText,
  OnBoardingSubTextStyle,
  OnBoardingMainTextStyle,
}) => {
  const color = useSelector(state => state?.themereducer?.colorTheme);
  const styles = ThemeStyle(color);
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

const ThemeStyle = color =>
  StyleSheet.create({
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
