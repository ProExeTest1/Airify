import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';

import {fontSize, hp, wp} from '../../helper/Constant';

const OnBoardingModuleHeader = ({
  width,
  SubText,
  onPress,
  MainText,
  backImage,
  backImageStyle,
}) => {
  let wi = width;
  let w = wi?.toString()?.concat('%');

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {width && (
          <View style={styles.widthView}>
            <View style={styles.outView}>
              <View style={[styles.subView, {width: w}]}></View>
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
      <Text style={[styles.WelcomeTextStyle, styles.WelcomeTextStyle2]}>
        {SubText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(4),
    paddingBottom: hp(3),
    backgroundColor: 'blue',
    paddingTop: Platform.OS === 'ios' ? hp(8) : hp(2),
  },
  innerContainer: {flexDirection: 'row', alignItems: 'center'},
  backImageStyle: {
    width: hp(3),
    height: hp(3),
    tintColor: 'white',
    resizeMode: 'contain',
  },
  WelcomeTextStyle: {
    color: 'white',
    marginTop: hp(4),
    fontWeight: '600',
    fontSize: fontSize(26),
  },
  WelcomeTextStyle2: {
    marginTop: hp(2),
    fontSize: fontSize(14),
  },
  widthView: {
    width: wp(100),
    position: 'absolute',
    alignItems: 'center',
  },
  outView: {
    flex: 1,
    width: wp(60),
    borderRadius: hp(50),
    backgroundColor: '#7B9EFF',
  },
  subView: {
    borderRadius: hp(50),
    paddingVertical: hp(1),
    backgroundColor: 'white',
  },
});

export default OnBoardingModuleHeader;
