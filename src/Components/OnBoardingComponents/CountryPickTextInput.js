import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
} from 'react-native';

import {strings} from '../../helper/Strings';
import {hp, wp} from '../../helper/Constant';
import {Images} from '../../helper/IconConstant';
import {color} from '../../helper/ColorConstant';

const CountryPickTextInput = (
  {
    value,
    onPress1,
    onPress2,
    disabled,
    editable,
    countryCode,
    placeholder,
    onChangeText,
    textInputStyle,
    placeholderTextColor,
    onSubmitEditing,
  },
  ref,
) => {
  return (
    <KeyboardAvoidingView>
      <View style={styles.mainViewStyle}>
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
              value={value}
              ref={ref}
              editable={editable}
              onSubmitEditing={onSubmitEditing}
              keyboardType="number-pad"
              maxLength={10}
              placeholder={placeholder}
              onChangeText={onChangeText}
              placeholderTextColor={placeholderTextColor}
              style={[styles.textInputStyle, textInputStyle]}
            />
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  textInputIconStyle: {
    width: hp(2),
    height: hp(2),
    marginLeft: wp(1),
    tintColor: '#A0A0A0',
  },
  viewStyle: {
    padding: 10,
    width: '90%',
    height: hp(6.5),
    borderRadius: wp(2),
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#E6E6E6',
  },
  InputViewStyle: {
    color: color.black,
    flexDirection: 'row',
    paddingVertical: hp(1),
  },
  textInputStyle: {
    flex: 1,
    marginLeft: wp(4),
    color: color.black,
  },
  mainViewStyle: {
    alignItems: 'center',
    marginVertical: hp(1),
  },
});

export default React.forwardRef(CountryPickTextInput);
