import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';

import {wp} from '../../helper/Constant';
import {Images} from '../../helper/IconConstant';
import {useSelector} from 'react-redux';

const CheckBox = ({onClick, isChecked}) => {
  const color = useSelector(state => state?.themereducer?.colorTheme);
  const styles = ThemeStyle(color);
  return (
    <TouchableOpacity
      onPress={onClick}
      style={[
        styles.CheckBoxBody,
        {backgroundColor: isChecked ? color.commonBlue : color.white},
      ]}>
      {isChecked && (
        <Image style={styles.CheckBoxImg} source={Images.doneIcon} />
      )}
    </TouchableOpacity>
  );
};

export default CheckBox;

const ThemeStyle = color =>
  StyleSheet.create({
    CheckBoxBody: {
      width: wp(5.5),
      borderWidth: 1,
      height: wp(5.5),
      borderRadius: 5,
      paddingVertical: wp(0.5),
      paddingHorizontal: wp(0.5),
      borderColor: color.commonBlue,
    },
    CheckBoxImg: {
      width: wp(4),
      height: wp(4),
    },
  });
