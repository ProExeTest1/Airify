import React from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';

import {strings} from '../../helper/Strings';
import {CommonHeader} from '../../components';

import {Images} from '../../helper/IconConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import {DiscountVoucherDummy} from '../../assets/DummyData/Discount';
import {useSelector} from 'react-redux';

const DiscountVoucher = ({navigation: {goBack}}) => {
  const color = useSelector(state => state?.themereducer?.colorTheme);
  const styles = ThemeStyle(color);
  return (
    <View style={styles.container}>
      <CommonHeader
        Images2={null}
        onPress1={true}
        onPress2={false}
        Images1={Images?.backIcon}
        Images1Color={'#fff'}
        headerName={strings?.discountVoucher}
        navigation1={() => {
          goBack();
        }}
        cancelButtonStyle1={styles.plusIconStyle}
      />
      <View style={styles.flatListOuterViewStyle}>
        <FlatList
          bounces={false}
          data={DiscountVoucherDummy}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <View style={styles.flatListInnerViewStyle}>
                <Text style={styles.cartTitleTextStyle}>{item?.header}</Text>
                <Text numberOfLines={1} style={styles.textStyle}>
                  {item?.title}
                </Text>
                <View style={{flexDirection: 'row', marginTop: hp(1)}}>
                  <View style={styles.cartView}>
                    <Image
                      source={Images?.clock}
                      style={styles.timeIconStyle}
                    />
                    <View>
                      <Text style={styles.validationTextStyle}>
                        {strings?.ValidUntil}
                      </Text>
                      <Text style={styles.textStyle}>{item?.ValidUntil}</Text>
                    </View>
                  </View>
                  <View style={styles.secondViewStyle}>
                    <Image
                      source={Images.payment}
                      style={styles.timeIconStyle}
                    />
                    <View>
                      <Text style={styles.validationTextStyle}>
                        {strings?.minTransaction}
                      </Text>
                      <Text style={styles.textStyle}>
                        {item?.MinTransaction}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

const ThemeStyle = color =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.bgColor,
    },
    flatListOuterViewStyle: {
      flex: 1,
      paddingHorizontal: wp(6),
      paddingVertical: hp(2.5),
    },
    flatListInnerViewStyle: {
      borderRadius: 6,
      marginVertical: hp(1),
      paddingVertical: hp(2),
      backgroundColor: color.white,
      paddingHorizontal: wp(4),
    },
    cartTitleTextStyle: {
      fontWeight: '600',
      marginBottom: hp(1),
      fontSize: fontSize(18),
      color: color.black,
    },
    cartView: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    timeIconStyle: {
      width: wp(4),
      height: hp(4),
      marginRight: wp(2),
      resizeMode: 'contain',
      tintColor: color.black,
    },
    secondViewStyle: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-end',
      marginHorizontal: wp(4),
    },
    useButtonView: {
      flex: 1,
      borderLeftWidth: 1,
      alignItems: 'flex-end',
      justifyContent: 'center',
      borderColor: color.grey,
    },
    useTouchableStyle: {
      borderRadius: 100,
      paddingVertical: hp(1),
      paddingHorizontal: wp(8.5),
      backgroundColor: color.commonBlue,
    },
    textStyle: {
      color: color.black,
    },
    validationTextStyle: {
      fontSize: fontSize(10),
      color: color.black,
    },
  });

export default DiscountVoucher;
