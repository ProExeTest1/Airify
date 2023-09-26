import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-paper';
import {fontSize, hp, wp} from '../helper/constants';

const TextInputData = ({
  textInputStyle,
  TextInputText,
  onPress,
  GenderIcon,
  value,
  onChangeText,
}) => {
  const [text, setText] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);
  return (
    <View>
      {GenderIcon && (
        <TouchableOpacity onPress={onPress}>
          <Image source={GenderIcon} style={styles.iconStyle} />
        </TouchableOpacity>
      )}
      <TextInput
        label={TextInputText}
        value={value}
        onChangeText={onChangeText}
        style={[styles.textInputStyle, textInputStyle]}
        activeUnderlineColor="black"
        underlineStyle={{
          marginLeft: wp(4),
          marginRight: wp(6),
        }}
        secureTextEntry={!passwordVisible}
        right={
          TextInputText == 'Password' || TextInputText == 'Confirm Password' ? (
            <TextInput.Icon
              icon={
                passwordVisible
                  ? require('../assets/Icon/view.png')
                  : require('../assets/Icon/hidden.png')
              }
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInputStyle: {
    marginVertical: hp(1),
    backgroundColor: 'white',
  },
  iconStyle: {
    width: hp(1.6),
    height: hp(1.48),
    resizeMode: 'contain',
    alignSelf: 'flex-end',
    right: wp(6),
  },
});

export default TextInputData;
