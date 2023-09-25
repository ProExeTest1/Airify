import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {hp} from '../../helper/Constant';

const OnBoardingFirst = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/onBoarding3.png')}
        style={{width: '100%', height: hp(60)}}
      />
      <Text>OnBoardingFirst</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default OnBoardingFirst;
