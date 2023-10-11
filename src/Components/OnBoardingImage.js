import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {hp} from '../helper/Constant';

const OnBoardingImage = ({onBoardingImage}) => {
  return (
    <View style={styles.container}>
      <Image source={onBoardingImage} style={styles.OnBoardingImageStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  OnBoardingImageStyle: {
    width: '100%',
    height: hp(60),
  },
});

export default OnBoardingImage;
