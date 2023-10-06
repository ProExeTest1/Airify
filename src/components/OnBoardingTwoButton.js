import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {hp, wp} from '../helper/Constant';

const OnBoardingTwoButton = ({
  buttonTextOne,
  buttonTextTwo,
  onPress1,
  onPress2,
  twoButtonStyle,
  TwoButtonStyle,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.buttonStyle, twoButtonStyle]}
        onPress={onPress1}>
        <Text
          style={{
            textAlign: 'center',
            color: 'blue',
            fontWeight: '500',
          }}>
          {buttonTextOne}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttonStyle, TwoButtonStyle, {backgroundColor: 'blue'}]}
        onPress={onPress2}>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontWeight: '500',
          }}>
          {buttonTextTwo}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: hp(4),
  },
  buttonStyle: {
    height: hp(5),
    width: wp(40),
    marginRight: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(2),
    backgroundColor: '#EEF2FF',
  },
});

export default OnBoardingTwoButton;
