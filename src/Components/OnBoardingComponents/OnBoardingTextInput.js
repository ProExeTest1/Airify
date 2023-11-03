import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import {hp, wp} from '../../helper/Constant';
import {color} from '../../helper/ColorConstant';
import {Images} from '../../helper/IconConstant';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const OnBoardingTextInput = ({
  value,
  onPress,
  container,
  onChangeText,
  keyboardType,
  textInputIcon,
  textInputStyle,
  onPressCalender,
  textInputIconStyle,
  textInputPlaceholder,
  contextMenuHidden,
}) => {
  const [focus, setFocus] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.3}
      onPress={onPress}
      disabled={onPress ? false : true}
      style={[styles.container, container]}>
      {textInputIcon && (
        <Image
          source={textInputIcon}
          style={[styles.textInputIconStyle, textInputIconStyle]}
        />
      )}
      <TextInput
        value={value}
        autoCorrect={false}
        onPressIn={onPress}
        autoCapitalize="none"
        secureTextEntry={focus}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        editable={onPress ? false : true}
        placeholderTextColor={color.grey}
        placeholder={textInputPlaceholder}
        style={[styles.textInputStyle, textInputStyle]}
        contextMenuHidden={contextMenuHidden}
      />
      {textInputPlaceholder == 'Password' ||
      textInputPlaceholder == 'Confirm New Password' ? (
        <TouchableOpacity
          style={styles.imageTouchStyle}
          onPress={() => {
            textInputPlaceholder == 'Password' ||
            textInputPlaceholder == 'Confirm New Password'
              ? setFocus(!focus)
              : setFocus(false);
          }}>
          <Image
            style={styles.hidePasswordStyle}
            source={focus ? Images.HidePassword : Images.ViewPassword}
          />
        </TouchableOpacity>
      ) : null}
      {textInputPlaceholder == 'Date of Birth' ? (
        <TouchableOpacity
          style={{alignItems: 'flex-end', marginRight: wp(4)}}
          onPress={() => {
            onPressCalender();
            setFocus(false);
          }}>
          <Image style={styles.calenderIconStyle} source={Images.calender} />
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: hp(6.5),
    paddingVertical: Platform.OS === 'ios' ? hp(2.2) : hp(0.5),
    width: wp(90),
    borderRadius: wp(2),
    paddingStart: wp(2),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(2),
    backgroundColor: '#E6E6E6',
  },
  textInputIconStyle: {
    width: hp(2),
    height: hp(2),
    tintColor: '#A0A0A0',
    color: color.black,
  },
  textInputStyle: {
    flex: 1,
    marginLeft: wp(2),
    color: color.black,
  },
  calenderIconStyle: {
    width: hp(2),
    height: hp(2),
    paddingRight: 15,
    tintColor: '#A0A0A0',
  },
  hidePasswordStyle: {
    width: hp(2),
    height: hp(2),
    paddingRight: 15,
    tintColor: '#A0A0A0',
  },
  imageTouchStyle: {
    alignItems: 'flex-end',
    paddingHorizontal: wp(4),
  },
});

export default OnBoardingTextInput;
