import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {fontSize, hp, wp} from '../../helper/Constant';

import {useSelector} from 'react-redux';

const CardHeader = ({FirstImage, header, SecondImage, onPress, imageStyle}) => {
  const color = useSelector(state => state?.themereducer?.colorTheme);
  const styles = ThemeStyle(color);
  return (
    <View style={styles.flatlistViewStyle}>
      <Image
        source={FirstImage}
        style={styles.cardHeaderStyle}
        resizeMode="contain"
      />
      <Text style={styles.cardHeaderText}>{header}</Text>
      <TouchableOpacity onPress={onPress}>
        <Image source={SecondImage} style={imageStyle} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default CardHeader;

const ThemeStyle = color =>
  StyleSheet.create({
    flatlistViewStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: '#e2e2e2',
      borderBottomWidth: 1,
      paddingVertical: hp(1.6),
    },
    cardHeaderText: {
      fontSize: fontSize(18),
      fontWeight: 'bold',
      flex: 1,
      color: color.black,
      marginHorizontal: wp(4),
    },
    cardHeaderStyle: {
      height: hp(3),
      width: hp(3),
      tintColor: color.black,
    },
  });
