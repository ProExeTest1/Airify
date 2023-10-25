import React from 'react';
import {Image, SectionList, StyleSheet, Text, View} from 'react-native';

import {color} from '../../helper/ColorConstant';
import {Images} from '../../helper/IconConstant';
import {fontSize, hp, wp} from '../../helper/Constant';

const RefundandRescheduleInfo = ({sectionData, header}) => {
  return (
    <View style={styles.mainViewStyle}>
      <View style={styles.refundouterViewStyle}>
        <View style={styles.imageViewStyle}>
          <Image
            resizeMode="contain"
            source={Images.tickMark}
            style={styles.imageStyle}
          />
        </View>
        <Text style={styles.refundTextStyle}>{header}</Text>
      </View>
      <SectionList
        sections={sectionData}
        bounces={false}
        keyExtractor={item => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({item}) => {
          return (
            <View style={styles.textViewStyle}>
              <Text style={styles.textStyle}>{item.id}.</Text>
              <Text style={[styles.textStyle, {marginHorizontal: hp(0.5)}]}>
                {item.text}
              </Text>
            </View>
          );
        }}
        renderSectionHeader={({section: {title}}) => {
          return (
            <View style={styles.titleViewStyle}>
              <Text style={styles.titleTextStyle}>{title}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default RefundandRescheduleInfo;

const styles = StyleSheet.create({
  mainViewStyle: {
    flex: 1,
    width: '92%',
    borderRadius: 10,
    alignSelf: 'center',
    paddingVertical: hp(2.4),
    backgroundColor: color.white,
  },
  refundouterViewStyle: {flexDirection: 'row', alignItems: 'center'},
  imageViewStyle: {
    padding: hp(0.9),
    borderRadius: 100,
    marginHorizontal: wp(2.3),
    backgroundColor: color.commonBlue,
  },
  imageStyle: {
    width: hp(1.3),
    height: hp(1.3),
    tintColor: color.white,
  },
  refundTextStyle: {
    fontWeight: '600',
    fontSize: fontSize(22),
    marginHorizontal: wp(1),
    color: color.commonBlue,
  },
  titleTextStyle: {
    marginTop: hp(2),
    fontWeight: '500',
    color: color.black,
    fontSize: fontSize(19),
  },
  titleViewStyle: {
    width: '100%',
    borderTopWidth: 0.5,
    marginVertical: hp(2),
    borderColor: '#e2e2e2',
    marginHorizontal: wp(2.3),
  },
  textStyle: {
    color: '#383838',
    fontSize: fontSize(17),
  },
  textViewStyle: {
    width: '85%',
    flexDirection: 'row',
    marginVertical: hp(0.5),
    marginHorizontal: wp(5.3),
  },
});
