import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {Images} from '../../helper/IconConstant';
import {color} from '../../helper/ColorConstant';
import {fontSize, hp, wp} from '../../helper/Constant';

const CommonHeader = ({
  Images1,
  Images2,
  onPress1,
  onPress2,
  headerName,
  navigation1,
  navigation2,
  Images1Color,
  cancelButtonStyle,
  cancelButtonStyle1,
}) => {
  return (
    <SafeAreaView style={styles.headerViewStyle}>
      <View style={styles.headerinnerViewStyle}>
        <View style={styles.headerTextViewStyle}>
          <Text style={styles.headerTextStyle}>{headerName}</Text>
        </View>
        <View style={styles.headerTextBody}>
          <TouchableOpacity disabled={!onPress1} onPress={navigation1}>
            <Image
              source={Images1}
              resizeMode="contain"
              style={[
                styles.cancelButtonStyle,
                {borderRadius: Images.planIcon === Images1 ? hp(4 / 2) : 0},
                cancelButtonStyle1,
                {
                  borderRadius: Images.planIcon === Images1 ? hp(4 / 2) : 0,
                  tintColor: Images1Color,
                },
              ]}
            />
          </TouchableOpacity>
          <TouchableOpacity disabled={!onPress2} onPress={navigation2}>
            <Image
              source={Images2}
              resizeMode="contain"
              style={[
                styles.cancelButtonStyle,
                {tintColor: color.white},
                cancelButtonStyle,
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  headerViewStyle: {
    backgroundColor: color.commonBlue,
    zIndex: 1,
  },
  cancelButtonStyle: {
    width: hp(3),
    height: hp(3),
    resizeMode: 'contain',
  },
  headerTextStyle: {
    fontWeight: 'bold',
    color: color.white,
    fontSize: fontSize(18),
  },
  safeHeaderViewStyle: {
    paddingVertical: hp(3),
    paddingHorizontal: wp(7),
  },
  headerTextBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerinnerViewStyle: {
    height: hp(6),
    paddingHorizontal: wp(6),
    justifyContent: 'center',
    backgroundColor: color.commonBlue,
  },
  headerTextViewStyle: {
    width: wp(100),
    alignItems: 'center',
    position: 'absolute',
    paddingVertical: hp(1),
  },
});

export default CommonHeader;
