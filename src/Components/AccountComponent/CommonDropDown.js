import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

import {color} from '../../helper/ColorConstant';
import {Images} from '../../helper/IconConstant';
import {fontSize, hp, wp} from '../../helper/Constant';

const CommonDropDown = ({
  data,
  onSelect,
  buttonText,
  defaultValue,
  TextInputLabel,
  textInputLabelStyle,
  passengerTextInputStyle,
}) => {
  return (
    <View style={[styles.container]}>
      <Text style={[styles.textInputLabelStyle, textInputLabelStyle]}>
        {TextInputLabel}
      </Text>
      <TouchableOpacity style={styles.inputView}>
        <SelectDropdown
          data={data}
          onSelect={onSelect}
          defaultValue={defaultValue}
          buttonStyle={[
            styles.passengerTextInputStyle,
            passengerTextInputStyle,
          ]}
          buttonTextStyle={[styles.buttonText, buttonText]}
        />
        <Image source={Images.downArrow} style={styles.imageStyle} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: wp(3),
    backgroundColor: color.white,
  },
  passengerTextInputStyle: {
    flex: 1,
    height: hp(7),
    borderRadius: 10,
    fontSize: fontSize(16),
    backgroundColor: color.lightWhite,
  },
  textInputLabelStyle: {
    fontWeight: '500',
    fontSize: fontSize(14),
    marginVertical: hp(1.5),
    marginHorizontal: wp(1),
    color: color.black,
  },
  inputView: {
    borderRadius: wp(4),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: color.lightWhite,
  },
  buttonText: {fontSize: fontSize(16), color: color.darkGray},
  imageStyle: {height: hp(2.5), width: hp(2.5), marginRight: wp(4)},
});

export default CommonDropDown;
