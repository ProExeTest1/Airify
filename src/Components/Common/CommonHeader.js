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

const CommonHeader = ({
  headerName,
  navigation1,
  navigation2,
  Images1,
  Images2,
  onPress1,
}) => {
  return (
    <View style={styles.headerViewStyle}>
      <SafeAreaView></SafeAreaView>
      <View style={styles.headerinnerViewStyle}>
        <View style={styles.headerTextViewStyle}>
          <Text style={styles.headerTextStyle}>{headerName}</Text>
        </View>
        <View style={styles.headerTextBody}>
          <TouchableOpacity disabled={!onPress1} onPress={navigation1}>
            <Image
              source={Images1}
              style={styles.cancelButtonStyle}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity disabled={!onPress1} onPress={navigation2}>
            <Image
              source={Images2}
              style={styles.cancelButtonStyle}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  headerViewStyle: {
    backgroundColor: color.commonBlue,
  },
  cancelButtonStyle: {
    height: hp(4),
    width: hp(4),
    resizeMode: 'contain',
    borderRadius: hp(4 / 2),
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

export default CommonHeader;
