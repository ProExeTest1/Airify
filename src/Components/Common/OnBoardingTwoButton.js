import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {hp, wp} from '../../helper/Constant';
import {useSelector} from 'react-redux';

const OnBoardingTwoButton = ({
  onPress1,
  onPress2,
  buttonTextOne,
  buttonTextTwo,
  TwoButtonStyle,
  twoButtonStyle,
}) => {
  const color = useSelector(state => state?.themereducer?.colorTheme);
  const styles = ThemeStyle(color);
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
const ThemeStyle = color =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: hp(2),
      borderTopWidth: 2,
      borderColor: color.grey,
    },
    buttonStyle: {
      height: hp(5),
      width: wp(40),
      marginRight: wp(2),
      borderRadius: wp(2),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: color.TowButtonBgColor,
    },
    textStyle: {
      color: color.TowButtonTextColor,
      fontWeight: '500',
      textAlign: 'center',
    },
  });
export default OnBoardingTwoButton;
