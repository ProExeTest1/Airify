import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {fontSize, hp, wp} from '../../helper/Constant';
import {Images} from '../../helper/IconConstant';
import {color} from '../../helper/ColorConstant';

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
            source={Images.cancel}
            style={styles.cancelButtonStyle}
            resizeMode="contain"
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
    height: hp(2),
    width: hp(2),
    tintColor: color.white,
  },
  headerTextStyle: {
    fontSize: fontSize(22),
    fontWeight: 'bold',
    color: color.white,
  },
  safeHeaderViewStyle: {
    paddingHorizontal: wp(7),
    paddingVertical: hp(3),
  },
  headerinnerViewStyle: {
    backgroundColor: color.commonBlue,
    flex: 1,
    paddingVertical: Platform.OS === 'ios' ? hp(3) : hp(0.7),
    paddingHorizontal: wp(8),
    justifyContent: 'center',
    marginBottom: Platform.OS === 'android' ? hp(3) : null,
  },
  headerTextViewStyle: {
    position: 'absolute',
    flex: 1,
    alignSelf: 'center',
  },
});
