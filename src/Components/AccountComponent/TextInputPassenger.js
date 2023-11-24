import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';

import {strings} from '../../helper/Strings';
import {fontSize, hp, wp} from '../../helper/Constant';
import {useSelector} from 'react-redux';

const TextInputPassenger = (
  {
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
    autoCapitalize,
    onSubmitEditing,
    inputMode,
  },
  ref,
) => {
  const [focus, setFocus] = useState(false);
  const color = useSelector(state => state?.themereducer?.colorTheme);
  const styles = ThemeStyle(color);
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
            <Image style={styles.textInputIconstyle} source={textInputIcon} />
          </View>
        ) : null}
        <TextInput
          editable={editable}
          placeholder={placeholder}
          value={value}
          ref={ref}
          inputMode={inputMode}
          onSubmitEditing={onSubmitEditing}
          numberOfLi
          nes={1}
          autoCapitalize={autoCapitalize}
          maxLength={placeholder == strings.Phone ? 10 : 100}
          onChangeText={onChangeText}
          placeholderTextColor={color.offerColor}
          cursorColor={color.commonBlue}
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
            <Image style={styles.calenderIcon} source={calenderIcon} />
          </TouchableOpacity>
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

export default React.forwardRef(TextInputPassenger);
const ThemeStyle = color =>
  StyleSheet.create({
    container: {
      marginHorizontal: wp(3),
      backgroundColor: color.onBoardingBgColor,
    },
    passengerTextInputStyle: {
      flex: 1,
      fontSize: fontSize(16),
      color: color.black,
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
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: wp(6),
      paddingVertical: Platform.OS === 'ios' ? hp(2.5) : hp(0.5),
      backgroundColor: color.lightWhite,
    },
    textInputIconstyle: {
      height: hp(2),
      width: hp(2),
      tintColor: color.darkLight,
      right: wp(4),
    },
    calenderIcon: {
      height: hp(2),
      width: hp(2),
      tintColor: color.darkLight,
    },
  });
