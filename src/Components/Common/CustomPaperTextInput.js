import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';

const CustomPaperTextInput = ({
  width,
  placeholder,
  label,
  icon,
  onChangeText,
  value,
  marginVertical,
  onPress
}) => {
  return (
    <TouchableOpacity 
    onPress={()=>console.log("hello")}
    style={{width: width, marginVertical: marginVertical}}>
      <TextInput
        label={label}
        placeholder={placeholder}
        value={value}
        outlineStyle={{borderRadius: 16, borderWidth: 0.5}}
        mode="outlined"
        left={<TextInput.Icon icon={icon} style={{marginTop: 20}} onPress={onPress}/>}
        style={{
          backgroundColor: 'white',
          height: 60,
          justifyContent: 'center',
          fontSize: 20,
        }}
        outlineColor="grey"
        onChangeText={onChangeText}
      />
    </TouchableOpacity>
  );
};

export default CustomPaperTextInput;

const styles = StyleSheet.create({});
