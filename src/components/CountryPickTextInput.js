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

const CountryPickTextInput = ({value, onChangeText}) => {
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('');
  return (
    <View style={{alignItems: 'center', marginVertical: hp(1)}}>
      <View
        style={{
          width: '90%',
          height: hp(6.5),
          backgroundColor: '#FAFAFA',
          padding: 10,
          borderRadius: wp(2),
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {countryCode ? (
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => setShow(true)}>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
              }}>
              {countryCode}
            </Text>
            <Image
              source={Images.downArrow}
              style={[styles.textInputIconStyle]}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setShow(true)}>
            <Image
              source={Images.downArrow}
              style={[styles.textInputIconStyle]}
            />
          </TouchableOpacity>
        )}
        <TextInput
          placeholder={strings.Phone}
          style={{marginLeft: wp(4)}}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
      <CountryPicker
        show={show}
        pickerButtonOnPress={item => {
          setCountryCode(item.flag);
          setShow(false);
        }}
      />
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
});

export default CountryPickTextInput;
