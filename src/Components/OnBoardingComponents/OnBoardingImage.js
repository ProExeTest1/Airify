import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

import {hp} from '../../helper/Constant';
import {useSelector} from 'react-redux';

const OnBoardingImage = ({onBoardingImage}) => {
  const color = useSelector(state => state?.themereducer?.colorTheme);
  const styles = ThemeStyle(color);
  return (
    <View>
      <Image source={onBoardingImage} style={styles.OnBoardingImageStyle} />
    </View>
  );
};

const ThemeStyle = color =>
  StyleSheet.create({
    OnBoardingImageStyle: {
      width: '100%',
      height: hp(60),
    },
  });

export default OnBoardingImage;
