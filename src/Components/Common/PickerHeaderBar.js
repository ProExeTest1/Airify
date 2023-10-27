import React from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {Images} from '../../helper/IconConstant';
import {color} from '../../helper/ColorConstant';
import {fontSize, hp, wp} from '../../helper/Constant';

const PickerHeaderBar = ({headerName, navigation}) => {
  return (
    <View style={styles.headerViewStyle}>
      <SafeAreaView style={styles.safeHeaderViewStyle}></SafeAreaView>
      <View style={styles.headerinnerViewStyle}>
        <View style={styles.headerTextViewStyle}>
          <Text style={styles.headerTextStyle}>{headerName}</Text>
        </View>
        <TouchableOpacity style={styles.cancelTouchStyle} onPress={navigation}>
          <Image
            resizeMode="contain"
            source={Images.cancel}
            style={styles.cancelButtonStyle}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PickerHeaderBar;

const styles = StyleSheet.create({
  headerViewStyle: {
    backgroundColor: color.commonBlue,
  },
  cancelTouchStyle: {
    height: hp(2),
    width: hp(2),
  },
  cancelButtonStyle: {
    width: hp(2),
    height: hp(2),
    tintColor: color.white,
  },
  headerTextStyle: {
    fontWeight: 'bold',
    color: color.white,
    fontSize: fontSize(22),
  },
  safeHeaderViewStyle: {
    paddingVertical: hp(3),
    paddingHorizontal: wp(7),
  },
  headerinnerViewStyle: {
    justifyContent: 'center',
    paddingHorizontal: wp(8),
    backgroundColor: color.commonBlue,
    flex: 1,
    paddingVertical: Platform.OS === 'ios' ? hp(3) : hp(0.7),
    marginBottom: Platform.OS === 'android' ? hp(3) : null,
  },
  headerTextViewStyle: {
    position: 'absolute',
    flex: 1,
    alignSelf: 'center',
  },
});
