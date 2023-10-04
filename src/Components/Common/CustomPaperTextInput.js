import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import {fontSize, hp} from '../../helpers/helper';

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
        value={value}
        outlineStyle={styles.outlineStyle}
        mode="outlined"
        left={
          <TextInput.Icon
            icon={icon}
            style={styles.iconStyle}
            onPress={onPress}
          />
        }
        style={styles.textInputStyle}
        outlineColor="grey"
        onChangeText={onChangeText}
      />
    </Pressable>
  );
};

export default CustomPaperTextInput;

const styles = StyleSheet.create({
  textInputStyle: {
    backgroundColor: 'white',
    height: hp(7.3),
    justifyContent: 'center',
    fontSize: fontSize(18),
  },
  iconStyle: {
    marginTop: hp(2.4),
  },
  outlineStyle: {
    borderRadius: 16,
    borderWidth: 0.5,
  },
});
