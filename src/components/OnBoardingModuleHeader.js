import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {fontSize, hp, wp} from '../helper/Constant';

const OnBoardingModuleHeader = ({
  backImage,
  backImageStyle,
  onPress,
  MainText,
  SubText,
  width,
}) => {
  let wi = width;
  let w = wi?.toString()?.concat('%');
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {width && (
          <View
            style={{
              width: wp(100),
              position: 'absolute',
              alignItems: 'center',
            }}>
            <View
              style={{
                flex: 1,
                backgroundColor: '#7B9EFF',
                // height: hp(1.5),
                width: wp(60),
                borderRadius: hp(50),
              }}>
              <View
                style={{
                  width: w,
                  backgroundColor: 'white',
                  borderRadius: hp(50),
                  paddingVertical: hp(1),
                }}></View>
            </View>
          </View>
        )}
        <TouchableOpacity onPress={onPress}>
          <Image
            source={backImage}
            style={[styles.backImageStyle, backImageStyle]}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.WelcomeTextStyle}>{MainText}</Text>
      <Text
        style={[
          styles.WelcomeTextStyle,
          {
            fontSize: fontSize(14),
            marginTop: hp(2),
          },
        ]}>
        {SubText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: wp(4),
    paddingTop: hp(8),
  },
  backImageStyle: {
    height: hp(3),
    width: hp(3),
    resizeMode: 'contain',
    tintColor: 'white',
    // marginTop: hp(8),
  },
  WelcomeTextStyle: {
    marginTop: hp(4),
    fontWeight: '600',
    fontSize: fontSize(26),
    color: 'white',
  },
});

export default OnBoardingModuleHeader;
