import {Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-paper';
import {fontSize, hp} from '../../helper/Constant';
import {color} from '../../helper/ColorConstant';

const CustomPaperTextInput = ({
  width,
  placeholder,
  label,
  icon,
  onChangeText,
  value,
  marginVertical,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={{width: width, marginVertical: marginVertical}}>
      <TextInput
        editable={false}
        label={label}
        pointerEvents="none"
        placeholder={placeholder}
        placeholderTextColor={'white'}
        value={value}
        // theme={{ colors: { onSurfaceVariant: 'white'} }}
        // activeOutlineColor="white"
        // outlineColor="white"
        // textColor="white"
        mode="outlined"
        outlineStyle={styles.outlineStyle}
        left={
          <TextInput.Icon
            icon={icon}
            style={{marginTop: hp(2.4), tintColor: 'white'}}
            onPress={onPress}
          />
        }
        style={styles.textInputStyle}
        onChangeText={onChangeText}
      />
    </Pressable>
  );
};

export default CustomPaperTextInput;

const styles = StyleSheet.create({
  textInputStyle: {
    height: hp(7.3),
    justifyContent: 'center',
    fontSize: fontSize(18),
    backgroundColor: color.white,
  },
  iconStyle: {
    marginTop: hp(2.4),
    tintColor: color.white,
  },
  outlineStyle: {
    borderRadius: 16,
    borderWidth: 0.5,
    // borderColor:'white'
  },
});
