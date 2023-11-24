import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

import {hp, wp} from '../../helper/Constant';

import {useSelector} from 'react-redux';

const OnBoardingSingleButton = ({
  onPress,
  buttonText,
  buttonStyle,
  buttonTextStyle,
  welcomeScreenFiledImage,
  welcomeScreenFiledImageStyle,
}) => {
  const color = useSelector(state => state?.themereducer?.colorTheme);
  const styles = ThemeStyle(color);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.buttonStyle, buttonStyle]}
        onPress={onPress}>
        {welcomeScreenFiledImage && (
          <Image
            source={welcomeScreenFiledImage}
            style={[
              styles.welcomeScreenFiledImageStyle,
              welcomeScreenFiledImageStyle,
            ]}
          />
        )}
        <Text style={[styles.buttonTextStyle, buttonTextStyle]}>
          {buttonText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const ThemeStyle = color =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: color.grey,
      paddingTop: hp(2),
    },
    buttonStyle: {
      width: wp(80),
      marginRight: wp(2),
      borderRadius: wp(2),
      paddingVertical: hp(1.2),
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: 'blue',
      justifyContent: 'center',
    },
    welcomeScreenFiledImageStyle: {
      width: wp(6),
      height: wp(6),
    },
    buttonTextStyle: {
      color: 'white',
      fontWeight: '500',
      textAlign: 'center',
    },
  });

export default OnBoardingSingleButton;
