import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {hp, wp} from '../helper/Constant';

const ButtonData = ({button, textStyle, buttonStyle, onPress}) => {
  return (
    <TouchableOpacity
      style={[styles.buttonStyle, buttonStyle]}
      onPress={onPress}>
      <Text style={[styles.textStyle, textStyle]}>{button}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    height: hp(5),
    width: hp(18),
    borderWidth: wp(0.2),
    borderRadius: wp(15),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textStyle: {
    color: 'black',
  },
});

export default ButtonData;
