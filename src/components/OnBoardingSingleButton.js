import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {hp, wp} from '../helper/Constant';

const OnBoardingSingleButton = ({
  onPress,
  buttonStyle,
  buttonText,
  welcomeScreenFiledImage,
  welcomeScreenFiledImageStyle,
  buttonTextStyle,
}) => {
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

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    height: hp(5),
    width: wp(80),
    marginRight: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(2),
    backgroundColor: 'blue',
    flexDirection: 'row',
  },
  welcomeScreenFiledImageStyle: {
    height: hp(3),
    width: hp(3),
  },
  buttonTextStyle: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '500',
  },
});

export default OnBoardingSingleButton;
