import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {hp, wp} from '../helper/Constant';
import {Images} from '../helper/IconConstant';

const DatePickerTextInput = ({
  textInputPlaceholder,
  textInputIcon,
  textInputIconStyle,
  value,
  onChangeText,
  textInputStyle,
  container,
  onPressCalender,
  onPress,
  keyboardType,
}) => {
  const [focus, setFocus] = useState(false);

  return (
    <TouchableOpacity
      disabled={onPress ? false : true}
      onPress={onPress}
      style={[styles.container, container]}>
      <Image
        source={textInputIcon}
        style={[styles.textInputIconStyle, textInputIconStyle]}
      />
      <TextInput
        placeholder={textInputPlaceholder}
        value={value}
        autoCorrect={false}
        editable={onPress ? false : true}
        onPressIn={onPress}
        onChangeText={onChangeText}
        style={[styles.textInputStyle, textInputStyle]}
        secureTextEntry={focus}
        keyboardType={keyboardType}
      />
      {textInputPlaceholder == 'Password' ||
      textInputPlaceholder == 'Confirm New Password' ? (
        <TouchableOpacity
          style={{alignItems: 'flex-end', marginRight: wp(2)}}
          onPress={() => {
            textInputPlaceholder == 'Password' ||
            textInputPlaceholder == 'Confirm New Password'
              ? setFocus(!focus)
              : setFocus(false);
          }}>
          <Image
            style={{
              paddingRight: 15,
              height: hp(2),
              width: hp(2),
              tintColor: '#A0A0A0',
            }}
            source={focus ? Images.HidePassword : Images.ViewPassword}
          />
        </TouchableOpacity>
      ) : null}
      {textInputPlaceholder == 'Date of Birth' ? (
        <TouchableOpacity
          style={{alignItems: 'flex-end', marginRight: wp(2)}}
          onPress={() => {
            onPressCalender();
            setFocus(false);
          }}>
          <Image
            style={{
              paddingRight: 15,
              height: hp(2),
              width: hp(2),
              tintColor: '#A0A0A0',
            }}
            source={Images.calender}
          />
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: wp(90),
    alignItems: 'center',
    marginVertical: hp(2),
    alignSelf: 'center',
    height: hp(6),
    paddingStart: wp(2),
    borderRadius: wp(2),
    backgroundColor: '#FAFAFA',
  },
  textInputIconStyle: {
    height: hp(2),
    width: hp(2),
    tintColor: '#A0A0A0',
  },
  textInputStyle: {
    marginLeft: wp(2),
    flex: 1,
  },
});

export default DatePickerTextInput;
