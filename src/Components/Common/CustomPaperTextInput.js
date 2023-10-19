import React from 'react';
import {TextInput} from 'react-native-paper';
import {Pressable, StyleSheet} from 'react-native';

import {color} from '../../helper/ColorConstant';
import {fontSize, hp, wp} from '../../helper/Constant';

const CustomPaperTextInput = ({
  label,
  icon,
  value,
  width,
  onPress,
  placeholder,
  onChangeText,
  marginVertical,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: width,
        marginVertical: marginVertical,
        marginHorizontal: label === 'Class' && 'Passenger' ? null : wp(4),
      }}>
      <TextInput
        label={label}
        value={value}
        mode="outlined"
        editable={false}
        pointerEvents="none"
        placeholder={placeholder}
        onChangeText={onChangeText}
        style={styles.textInputStyle}
        placeholderTextColor={'white'}
        outlineStyle={styles.outlineStyle}
        left={
          <TextInput.Icon
            icon={icon}
            style={{marginTop: hp(2.4), tintColor: 'white'}}
            onPress={onPress}
          />
        }
      />
    </Pressable>
  );
};

export default CustomPaperTextInput;

const styles = StyleSheet.create({
  textInputStyle: {
    height: hp(7.3),
    fontSize: fontSize(18),
    justifyContent: 'center',
    backgroundColor: color.white,
  },
  iconStyle: {
    marginTop: hp(2.4),
    tintColor: color.white,
  },
  outlineStyle: {
    borderRadius: 16,
    borderWidth: 0.5,
  },
});
