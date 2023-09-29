import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {images} from '../../helpers/IconConstant';
import {color} from '../../helpers/ColorConstant';
import {fontSize, hp, wp} from '../../helpers/helper';

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
            source={images.cancel}
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
    tintColor: 'white',
  },
  headerTextStyle: {
    fontSize: fontSize(25, 812),
    fontWeight: 'bold',
    color: 'white',
  },
  safeHeaderViewStyle: {
    paddingHorizontal: wp(7),
    paddingVertical: hp(3),
  },
  headerinnerViewStyle: {
    backgroundColor: color.commonBlue,
    height: hp(6),
    paddingHorizontal: wp(8),
    justifyContent: 'center',
  },
  headerTextViewStyle: {
    alignItems: 'center',
    position: 'absolute',
    width: wp(100),
    paddingVertical: hp(1),
  },
});
