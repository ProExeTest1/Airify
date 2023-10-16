import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {fontSize, hp, wp} from '../../helper/Constant';
import {color} from '../../helper/ColorConstant';
import {Images} from '../../helper/IconConstant';

const DropDownPaperTextInput = ({placeholder, value, toggleDropdown, ref}) => {
  return (
    <View>
      {value?.length > 0 ? (
        <View style={styles.labelStyle}>
          <Text style={{color: color.black}}>{placeholder}</Text>
        </View>
      ) : null}
      <TouchableOpacity
        onPress={toggleDropdown}
        ref={ref}
        style={styles.touchableStyle}>
        <TextInput
          style={styles.textInputStyle}
          placeholder={placeholder}
          editable={false}
          value={value}
          fontSize={fontSize(18)}
          placeholderTextColor={'#383838'}
        />
        <Image
          source={Images.downArrow}
          style={styles.dropDownIconStyle}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default DropDownPaperTextInput;

const styles = StyleSheet.create({
  textInputStyle: {
    flex: 1,
    marginLeft: wp(2),
  },
  iconStyle: {
    marginTop: hp(2.4),
    tintColor: color.white,
  },
  outlineStyle: {
    borderRadius: 10,
    borderWidth: 0.5,
    // borderColor:'white'
  },
  labelStyle: {
    backgroundColor: color.white,
    paddingHorizontal: wp(1),
    position: 'absolute',
    zIndex: 1,
    marginLeft: wp(3),
    alignItems: 'center',
  },
  touchableStyle: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#e6e6e6',
    paddingHorizontal: wp(2),
    paddingVertical: hp(1.8),
    marginVertical: hp(1),
  },
  dropDownIconStyle: {
    height: hp(2.5),
    width: hp(2.5),
    tintColor: '#383838',
  },
});
