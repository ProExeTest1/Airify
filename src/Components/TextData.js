import React from 'react';
import {Text, StyleSheet} from 'react-native';

const TextData = ({text, textStyle}) => {
  return <Text style={[styles.textStyle, textStyle]}>{text}</Text>;
};

const styles = StyleSheet.create({});

export default TextData;
