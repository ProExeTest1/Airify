import React from 'react';
import {Text, StyleSheet} from 'react-native';

const TextData = ({text, textStyle}) => {
  return <Text style={[textStyle, textStyle]}>{text}</Text>;
};

export default TextData;
