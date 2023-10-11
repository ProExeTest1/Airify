import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {fontSize, hp, wp} from '../../helper/Constant';
import {color} from '../../helper/ColorConstant';
import {Images} from '../../helper/IconConstant';

const CommonHeader = ({
  headerName,
  navigation1,
  navigation2,
  Images1,
  Images2,
  onPress1,
  onPress2,
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
              style={[
                styles.cancelButtonStyle,
                {borderRadius: Images.planIcon === Images1 ? hp(4 / 2) : 0},
              ]}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity disabled={!onPress2} onPress={navigation2}>
            <Image
              source={Images2}
              style={[styles.cancelButtonStyle, {tintColor: color.white}]}
              resizeMode="contain"
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
  },
  cancelButtonStyle: {
    height: hp(3),
    width: hp(3),
    resizeMode: 'contain',
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
  headerTextBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerinnerViewStyle: {
    backgroundColor: color.commonBlue,
    height: hp(6),
    paddingHorizontal: wp(6),
    justifyContent: 'center',
  },
  headerTextViewStyle: {
    alignItems: 'center',
    position: 'absolute',
    width: wp(100),
    paddingVertical: hp(1),
  },
});

export default CommonHeader;
