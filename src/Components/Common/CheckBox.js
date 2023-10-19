import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';

import {wp} from '../../helper/Constant';
import {color} from '../../helper/ColorConstant';
import {Images} from '../../helper/IconConstant';

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
