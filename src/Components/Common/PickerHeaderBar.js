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
import {fontSize, hp, wp} from '../../helper/Constants';
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
        <TouchableOpacity onPress={navigation}>
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
  cancelButtonStyle: {
    height: hp(2),
    width: hp(2),
    tintColor: color.white,
    marginVertical: Platform.OS === 'android' ? hp(-1) : null,
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
    height: Platform.OS == 'ios' ? hp(6) : hp(0),
    paddingHorizontal: wp(8),
    justifyContent: 'center',
    marginBottom: Platform.OS === 'android' ? hp(3) : null,
  },
  headerTextViewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: wp(100),
  },
});
