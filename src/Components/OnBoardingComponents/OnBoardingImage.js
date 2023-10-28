import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

import {hp} from '../../helper/Constant';

const OnBoardingImage = ({onBoardingImage}) => {
  return (
    <View>
      <Image source={onBoardingImage} style={styles.OnBoardingImageStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  OnBoardingImageStyle: {
    width: '100%',
    height: hp(60),
  },
});

export default OnBoardingImage;
