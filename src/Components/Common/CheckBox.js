import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Images} from '../../helper/IconConstant';
import {color} from '../../helper/ColorConstant';
import {wp} from '../../helper/Constant';

const CheckBox = ({onClick, isChecked}) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={[
        styles.CheckBoxBody,
        {backgroundColor: isChecked ? color.commonBlue : '#fff'},
      ]}>
      {isChecked && (
        <Image style={styles.CheckBoxImg} source={Images.doneIcon} />
      )}
    </TouchableOpacity>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  CheckBoxBody: {
    paddingVertical: wp(0.5),
    paddingHorizontal: wp(0.5),
    height: wp(5.5),
    width: wp(5.5),
    borderRadius: 5,
    borderColor: color.commonBlue,
    borderWidth: 1,
  },
  CheckBoxImg: {
    height: wp(4),
    width: wp(4),
  },
});
