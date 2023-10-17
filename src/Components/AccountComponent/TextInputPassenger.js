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

const TextInputPassenger = ({
  placeholder,
  value,
  onChangeText,
  passengerTextInputStyle,
  TextInputLabel,
  textInputLabelStyle,
  onPressCalender,
  onPressCountryPicker,
  editable,
  textInputIcon,
  disabled,
  onPress,
  calenderIcon,
}) => {
  const [focus, setFocus] = useState(false);

  return (
    <View
      style={[
        styles.container,
        {flex: passengerTextInputStyle ? passengerTextInputStyle : 1},
      ]}>
      <Text style={[styles.textInputLabelStyle, textInputLabelStyle]}>
        {TextInputLabel}
      </Text>
      <TouchableOpacity
        style={styles.inputView}
        disabled={disabled == true ? false : true}
        onPress={onPress}>
        {placeholder == strings.countryCode ||
        placeholder == strings.EmailText ||
        placeholder == strings.issueCountry ? (
          <View
            onPress={() => {
              onPressCountryPicker();
              setFocus(false);
            }}>
            <Image
              style={{
                height: hp(2),
                width: hp(2),
                tintColor: '#A0A0A0',
                right: wp(4),
              }}
              source={textInputIcon}
            />
          </View>
        ) : null}
        <TextInput
          editable={editable}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          style={[styles.passengerTextInputStyle, passengerTextInputStyle]}
        />
        {placeholder == strings.DateBirth ||
        placeholder == strings.issueDate ||
        placeholder == strings.expiryDate ? (
          <TouchableOpacity
            style={{marginLeft: wp(2)}}
            onPress={() => {
              onPressCalender();
              setFocus(false);
            }}>
            <Image
              style={{
                height: hp(2),
                width: hp(2),
                tintColor: '#A0A0A0',
              }}
              source={calenderIcon}
            />
          </TouchableOpacity>
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    marginHorizontal: wp(3),
  },
  passengerTextInputStyle: {
    fontSize: fontSize(16),
    flex: 1,
  },
  textInputLabelStyle: {
    fontSize: fontSize(14),
    fontWeight: '500',
    marginVertical: hp(1.5),
    marginHorizontal: wp(1),
  },
  inputView: {
    flexDirection: 'row',
    backgroundColor: color.lightWhite,
    paddingVertical: hp(2.5),
    borderRadius: wp(4),
    paddingHorizontal: wp(6),
  },
});

export default TextInputPassenger;
