import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {color} from '../../helper/ColorConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import {strings} from '../../helper/Strings';
import {Images} from '../../helper/IconConstant';
import SelectDropdown from 'react-native-select-dropdown';

const CommonDropDown = ({
  passengerTextInputStyle,
  TextInputLabel,
  textInputLabelStyle,
  data,
  onSelect,
  buttonText,
  defaultValue,
}) => {
  const [focus, setFocus] = useState(false);

  return (
    <View style={[styles.container]}>
      <Text style={[styles.textInputLabelStyle, textInputLabelStyle]}>
        {TextInputLabel}
      </Text>
      <TouchableOpacity style={styles.inputView}>
        <SelectDropdown
          buttonStyle={[
            styles.passengerTextInputStyle,
            passengerTextInputStyle,
          ]}
          buttonTextStyle={[styles.buttonText, buttonText]}
          data={data}
          onSelect={onSelect}
          defaultValue={defaultValue}
        />
        <Image
          source={Images.downArrow}
          style={{height: hp(2.5), width: hp(2.5), marginRight: wp(4)}}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(3),
    backgroundColor: color.white,
    flex: 1,
  },
  passengerTextInputStyle: {
    fontSize: fontSize(16),
    flex: 1,
    borderRadius: 10,
    height: hp(7),
    backgroundColor: color.lightWhite,
  },
  textInputLabelStyle: {
    fontSize: fontSize(14),
    fontWeight: '500',
    marginVertical: hp(1.5),
    marginHorizontal: wp(1),
  },
  inputView: {
    flexDirection: 'row',
    borderRadius: wp(4),
    backgroundColor: color.lightWhite,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {fontSize: fontSize(16), color: color.darkGray},
});

export default CommonDropDown;
