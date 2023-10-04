import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {fontSize, hp, wp} from '../../helpers/helper';
import {Images} from '../../helpers/IconConstant';

const SearchBar = ({value, onChangeText}) => {
  return (
    <View>
      <View style={styles.TextInputBody}>
        <Image style={styles.SearchImg} source={Images.search} />
        <TextInput
          placeholder="Search city or airport"
          placeholderTextColor={'grey'}
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
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: hp(2.5),
    paddingHorizontal: wp(1),
    backgroundColor: '#f3f3f3',
  },
  SearchImg: {
    marginHorizontal: hp(1.5),
  },
  TextInputStyle: {
    flex: 1,
  },
});
