import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import {CountryPicker} from 'react-native-country-codes-picker';
import {hp, wp} from '../helper/Constant';
import {strings} from '../helper/Strings';
import {Images} from '../helper/IconConstant';
import {color} from '../helper/ColorConstant';

const CountryPickTextInput = ({
  value,
  onChangeText,
  placeholder,
  countryCode,
  disabled,
  onPress1,
  onPress2,
  editable,
  placeholderTextColor,
  textInputStyle,
}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        marginVertical: hp(1),
      }}>
      <TouchableOpacity
        style={styles.viewStyle}
        disabled={strings.Phone ? disabled : true}
        onPress={onPress1}>
        {placeholder === strings.Phone && (
          <TouchableOpacity style={styles.InputViewStyle} onPress={onPress2}>
            <Text>{countryCode}</Text>
            <Image
              source={Images.downArrow}
              style={[styles.textInputIconStyle]}
            />
          </TouchableOpacity>
        )}
        <View style={styles.InputViewStyle}>
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            style={[styles.textInputStyle, textInputStyle]}
            value={value}
            onChangeText={onChangeText}
            keyboardType="number-pad"
            editable={editable}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  textInputIconStyle: {
    height: hp(2),
    width: hp(2),
    tintColor: '#A0A0A0',
    marginLeft: wp(1),
  },
  viewStyle: {
    width: '90%',
    height: hp(6.5),
    backgroundColor: '#E6E6E6',
    padding: 10,
    borderRadius: wp(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  InputViewStyle: {
    flexDirection: 'row',
    paddingVertical: hp(1),
    color: color.black,
  },
  textInputStyle: {
    marginLeft: wp(4),
    color: color.black,
    flex: 1,
  },
});

export default CountryPickTextInput;
