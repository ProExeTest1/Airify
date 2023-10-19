import React from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';

import {strings} from '../../helper/Strings';
import {CommonHeader} from '../../components';
import {color} from '../../helper/ColorConstant';
import {Images} from '../../helper/IconConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import {DiscountVoucherDummy} from '../../assets/DummyData/Discount';

const DiscountVoucher = ({navigation: {goBack}}) => {
  return (
    <View style={styles.container}>
      <CommonHeader
        Images2={null}
        onPress1={true}
        onPress2={false}
        Images1={Images.backIcon}
        Images1Color={color.white}
        headerName={strings.discountVoucher}
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
                <Text style={styles.cartTitleTextStyle}>{item.header}</Text>
                <Text numberOfLines={1}>{item.title}</Text>
                <View style={{flexDirection: 'row', marginTop: hp(1)}}>
                  <View style={styles.cartView}>
                    <Image source={Images.clock} style={styles.timeIconStyle} />
                    <View>
                      <Text style={{fontSize: fontSize(10)}}>
                        {strings.ValidUntil}
                      </Text>
                      <Text>{item.ValidUntil}</Text>
                    </View>
                  </View>
                  <View style={styles.secondViewStyle}>
                    <Image
                      source={Images.payment}
                      style={styles.timeIconStyle}
                    />
                    <View>
                      <Text style={{fontSize: fontSize(10)}}>
                        {strings.minTransaction}
                      </Text>
                      <Text>{item.MinTransaction}</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListOuterViewStyle: {
    marginBottom: hp(13),
    paddingHorizontal: wp(6),
    paddingVertical: hp(2.5),
  },
  flatListInnerViewStyle: {
    borderRadius: 6,
    marginVertical: hp(1),
    paddingVertical: hp(2),
    backgroundColor: '#fff',
    paddingHorizontal: wp(4),
  },
  cartTitleTextStyle: {
    fontWeight: '600',
    marginBottom: hp(1),
    fontSize: fontSize(18),
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
    borderColor: color.grayLight,
  },
  useTouchableStyle: {
    borderRadius: 100,
    paddingVertical: hp(1),
    paddingHorizontal: wp(8.5),
    backgroundColor: color.commonBlue,
  },
});

export default DiscountVoucher;
