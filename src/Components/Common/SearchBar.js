import React from 'react';
import {Image, Platform, StyleSheet, TextInput, View} from 'react-native';

import {Images} from '../../helper/IconConstant';
import {fontSize, hp, wp} from '../../helper/Constant';

const SearchBar = ({value, onChangeText, placeholder, TextInputBody}) => {
  return (
    <View>
      <View style={[styles.TextInputBody, TextInputBody]}>
        <Image style={styles.SearchImg} source={Images.search} />
        <TextInput
<<<<<<< HEAD
          placeholder={placeholder}
          placeholderTextColor="grey"
=======
          value={value}
>>>>>>> origin/KenilBranch
          autoCapitalize="none"
          fontSize={fontSize(18)}
          placeholder={placeholder}
          onChangeText={onChangeText}
          placeholderTextColor={'grey'}
          style={styles.TextInputStyle}
        />
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  TextInputBody: {
    borderRadius: 10,
    marginTop: hp(1),
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: wp(5),
    paddingHorizontal: wp(1),
    backgroundColor: '#f3f3f3',
    paddingVertical: Platform.OS === 'ios' ? hp(2) : hp(0.4),
  },
  SearchImg: {
    marginHorizontal: hp(1.5),
  },
  TextInputStyle: {
    flex: 1,
    color: 'black',
  },
});
