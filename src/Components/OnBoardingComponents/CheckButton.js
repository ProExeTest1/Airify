import React from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';

import {hp, wp} from '../../helper/Constant';
import {Images} from '../../helper/IconConstant';
import {useSelector} from 'react-redux';

const CheckButton = ({check, onPress, mainStyle}) => {
  const color = useSelector(state => state?.themereducer?.colorTheme);
  const styles = ThemeStyle(color);
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={[
        styles.container,
        {
          backgroundColor: check ? color.commonBlue : color.white,
          borderColor: 'blue',
        },
        mainStyle,
      ]}>
      {check ? (
        <Image style={styles.checkMarkstyle} source={Images?.checkMark} />
      ) : null}
    </TouchableOpacity>
  );
};

const ThemeStyle = color =>
  StyleSheet.create({
    container: {
      width: hp(2.5),
      borderWidth: 2,
      height: hp(2.5),
      borderRadius: 5,
      marginLeft: wp(4),
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkMarkstyle: {
      height: hp(4),
      width: wp(4),
      resizeMode: 'contain',
    },
  });

export default CheckButton;
