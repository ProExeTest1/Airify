import {Image, Platform, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {fontSize, hp, wp} from '../../helper/Constant';
import {Images} from '../../helper/IconConstant';

const SearchBar = ({value, onChangeText, placeholder, TextInputBody}) => {
  return (
    <View>
      <View style={[styles.TextInputBody, TextInputBody]}>
        <Image style={styles.SearchImg} source={Images.search} />
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="grey"
          autoCapitalize="none"
          fontSize={fontSize(18)}
          value={value}
          onChangeText={onChangeText}
          style={styles.TextInputStyle}
        />
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  TextInputBody: {
    marginHorizontal: wp(5),
    marginTop: hp(1),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: Platform.OS === 'ios' ? hp(2) : hp(0.4),
    paddingHorizontal: wp(1),
    backgroundColor: '#f3f3f3',
  },
  SearchImg: {
    marginHorizontal: hp(1.5),
  },
  TextInputStyle: {
    flex: 1,
    color: 'black',
  },
});
