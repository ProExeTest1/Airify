import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {hp, wp} from '../../helper/Constant';

const OnBoardingTwoButton = ({
  onPress1,
  onPress2,
  buttonTextOne,
  buttonTextTwo,
  TwoButtonStyle,
  twoButtonStyle,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.buttonStyle, twoButtonStyle]}
        onPress={onPress1}>
        <Text style={styles.textStyle}>{buttonTextOne}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttonStyle, TwoButtonStyle, {backgroundColor: 'blue'}]}
        onPress={onPress2}>
        <Text style={[styles.textStyle, {color: 'white'}]}>
          {buttonTextTwo}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    height: hp(5),
    width: wp(40),
    marginRight: wp(2),
    borderRadius: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEF2FF',
  },
  textStyle: {
    color: 'blue',
    fontWeight: '500',
    textAlign: 'center',
  },
});
export default OnBoardingTwoButton;
