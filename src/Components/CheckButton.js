import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {hp, wp} from '../helper/Constant';
import {Images} from '../helper/IconConstant';

const CheckButton = ({check, onPress, mainStyle}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: check ? 'blue' : 'white',
          borderColor: 'blue',
        },
        mainStyle,
      ]}>
      {check ? (
        <Image
          style={{height: hp(4), width: wp(4), resizeMode: 'contain'}}
          source={Images?.checkMark}
        />
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(2.5),
    width: hp(2.5),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 5,
    marginLeft: wp(4),
  },
});

export default CheckButton;
