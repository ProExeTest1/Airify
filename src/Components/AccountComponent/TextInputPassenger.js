import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

import {strings} from '../../helper/Strings';
import {color} from '../../helper/ColorConstant';
import {fontSize, hp, wp} from '../../helper/Constant';

const TextInputPassenger = ({
  value,
  onPress,
  editable,
  disabled,
  placeholder,
  onChangeText,
  calenderIcon,
  textInputIcon,
  TextInputLabel,
  onPressCalender,
  textInputLabelStyle,
  onPressCountryPicker,
  passengerTextInputStyle,
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
          maxLength={placeholder == strings.Phone ? 10 : 100}
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
    marginHorizontal: wp(3),
    backgroundColor: color.white,
  },
  passengerTextInputStyle: {
    flex: 1,
    fontSize: fontSize(16),
  },
  textInputLabelStyle: {
    fontWeight: '500',
    fontSize: fontSize(14),
    marginVertical: hp(1.5),
    marginHorizontal: wp(1),
  },
  inputView: {
    borderRadius: wp(4),
    flexDirection: 'row',
    paddingHorizontal: wp(6),
    paddingVertical: hp(2.5),
    backgroundColor: color.lightWhite,
  },
});

export default TextInputPassenger;
