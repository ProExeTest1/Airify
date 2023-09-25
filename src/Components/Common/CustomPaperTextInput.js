import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import { icons } from '../../Helpers/ImageHelper';


const CustomPaperTextInput = ({width,placeholder,label,icon,onChangeText,text}) => {
  return (
    <View style={{width:width}}>
      <TextInput
        label={label}
        placeholder={placeholder}
        value={text}
        outlineStyle={{borderRadius:20}}
        mode='outlined'
        left={<TextInput.Icon icon={icon} style={{marginTop:20}} />}
        style={{backgroundColor:'white',height:70,justifyContent:'center',fontSize:20}}
        outlineColor='grey'
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default CustomPaperTextInput;

const styles = StyleSheet.create({});
