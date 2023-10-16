import {Image, SectionList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {color} from '../../helper/ColorConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import {Images} from '../../helper/IconConstant';

const RefundandRescheduleInfo = ({sectionData, header}) => {
  return (
    <View style={styles.mainViewStyle}>
      <View style={styles.refundouterViewStyle}>
        <View style={styles.imageViewStyle}>
          <Image
            source={Images.tickMark}
            style={styles.imageStyle}
            resizeMode="contain"
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
    width: '92%',
    alignSelf: 'center',
    flex: 1,
    borderRadius: 10,
    paddingVertical: hp(2.4),
    backgroundColor: color.white,
  },
  refundouterViewStyle: {flexDirection: 'row', alignItems: 'center'},
  imageViewStyle: {
    backgroundColor: color.commonBlue,
    padding: hp(0.9),
    borderRadius: 100,
    marginHorizontal: wp(2.3),
  },
  imageStyle: {
    height: hp(1.3),
    width: hp(1.3),
    tintColor: color.white,
  },
  refundTextStyle: {
    fontSize: fontSize(22),
    fontWeight: '600',
    color: color.commonBlue,
    marginHorizontal: wp(1),
  },
  titleTextStyle: {
    fontSize: fontSize(19),
    fontWeight: '500',
    color: color.black,
    marginTop: hp(2),
  },
  titleViewStyle: {
    borderTopWidth: 0.5,
    width: '100%',
    borderColor: '#e2e2e2',
    marginHorizontal: wp(2.3),
    marginVertical: hp(2),
  },
  textStyle: {
    fontSize: fontSize(17),
    color: '#383838',
  },
  textViewStyle: {
    flexDirection: 'row',
    width: '85%',
    marginVertical: hp(0.5),
    marginHorizontal: wp(5.3),
  },
});
