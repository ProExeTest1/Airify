import React, {useState} from 'react';
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {hp, wp} from '../../helper/Constant';
import {Images} from '../../helper/IconConstant';

const DatePickerTextInput = ({
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
}) => {
  const [focus, setFocus] = useState(false);

  return (
    <View style={[styles.container, container]}>
      <TouchableOpacity onPress={onPress}>
        <Image
          source={textInputIcon}
          style={[styles.textInputIconStyle, textInputIconStyle]}
        />
      </TouchableOpacity>
      <TextInput
        value={value}
        editable={true}
        autoCorrect={false}
        secureTextEntry={focus}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholder={textInputPlaceholder}
        style={[styles.textInputStyle, textInputStyle]}
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
            style={styles.imageStyle}
            source={focus ? Images.HidePassword : Images.ViewPassword}
          />
        </TouchableOpacity>
      ) : null}
      {textInputPlaceholder == 'Date of Birth' ? (
        <TouchableOpacity
          style={styles.imageTouchStyle}
          onPress={() => {
            onPressCalender();
            setFocus(false);
          }}>
          <Image style={styles.imageStyle} source={Images.calender} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
export default DatePickerTextInput;

const styles = StyleSheet.create({
  container: {
    width: wp(90),
    height: hp(6),
    paddingStart: wp(2),
    borderRadius: wp(2),
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: hp(2),
    backgroundColor: '#E6E6E6',
  },
  textInputIconStyle: {
    width: hp(2),
    height: hp(2),
    tintColor: '#A0A0A0',
  },
  textInputStyle: {
    flex: 1,
    marginLeft: wp(2),
  },
  imageTouchStyle: {
    alignItems: 'flex-end',
    marginRight: wp(2),
  },
  imageStyle: {
    paddingRight: 15,
    height: hp(2),
    width: hp(2),
    tintColor: '#A0A0A0',
  },
});
