import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {fontSize, hp, wp} from '../../helper/Constant';
import {color} from '../../helper/ColorConstant';
import {Images} from '../../helper/IconConstant';
import {useSelector} from 'react-redux';

const TicktBookingProgressBar = ({progress}) => {
  const strings = useSelector(state => state?.languageReducer?.languageObject);
  return (
    <View style={styles.mainViewstyle}>
      <View style={styles.progressInnerViewStyle}>
        <View style={styles.firstViewStyle}>
          <View
            style={[
              styles.progressViewStyle,
              {backgroundColor: progress >= 1 ? '#fff' : '#0041C0'},
            ]}>
            {progress > 1 ? (
              <Image
                style={styles.doneIconstyle}
                source={Images.doneIcon}></Image>
            ) : (
              <Text
                style={[
                  styles.progressCountStyle,
                  {color: progress >= 1 ? color.commonBlue : '#fff'},
                ]}>
                1
              </Text>
            )}
          </View>
          <Text style={styles.progressTextStyle}>{strings.book}</Text>
        </View>
        <View
          style={[
            styles.lineViewStyle,
            {
              borderColor: progress > 1 ? '#fff' : '#00000050',
              backgroundColor: progress > 1 ? '#fff' : '#00000050',
            },
          ]}
        />
        <View style={styles.firstViewStyle}>
          <View
            style={[
              styles.progressViewStyle,
              {backgroundColor: progress >= 2 ? '#fff' : '#0041C0'},
            ]}>
            {progress > 2 ? (
              <Image
                style={styles.doneIconstyle}
                source={Images.doneIcon}></Image>
            ) : (
              <Text
                style={[
                  styles.progressCountStyle,
                  {color: progress >= 2 ? color.commonBlue : '#fff'},
                ]}>
                2
              </Text>
            )}
          </View>
          <Text style={styles.progressTextStyle}>{strings.pay}</Text>
        </View>
        <View
          style={[
            styles.lineViewStyle,
            {
              borderColor: progress > 2 ? '#fff' : '#00000050',
              backgroundColor: progress > 2 ? '#fff' : '#00000050',
            },
          ]}
        />
        <View style={styles.firstViewStyle}>
          <View
            style={[
              styles.progressViewStyle,
              {backgroundColor: progress >= 3 ? '#fff' : '#0041C0'},
            ]}>
            <Text
              style={[
                styles.progressCountStyle,
                {color: progress >= 3 ? color.commonBlue : '#fff'},
              ]}>
              3
            </Text>
          </View>
          <Text numberOfLines={1} style={styles.progressTextStyle}>
            {strings.eTicket}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TicktBookingProgressBar;

const styles = StyleSheet.create({
  progressViewStyle: {
    height: hp(4),
    width: hp(4),
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressCountStyle: {
    fontSize: fontSize(17),
    fontWeight: '600',
    color: color.white,
  },
  progressInnerViewStyle: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  lineViewStyle: {
    borderWidth: 1,
    width: wp(14),
    marginTop: hp(2),
  },
  progressTextStyle: {
    color: '#DBDDE1',
    marginTop: hp(0.5),
  },
  mainViewstyle: {
    height: hp(10),
    backgroundColor: color.commonBlue,
    paddingHorizontal: wp(12),
  },
  firstViewStyle: {
    alignItems: 'center',
    width: wp(15),
  },
  doneIconstyle: {
    height: wp(5),
    width: wp(5),
    tintColor: color.commonBlue,
  },
});
