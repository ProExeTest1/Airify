import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {color} from '../../helper/ColorConstant';
import {CommonHeader} from '../../components';
import {strings} from '../../helper/Strings';
import {Images} from '../../helper/IconConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import {DiscountVoucherDummy} from '../../assets/DummyData/Discount';

const DiscountVoucher = ({navigation: {goBack}, navigation}) => {
  return (
    <View style={styles.container}>
      <CommonHeader
        headerName={strings.discountVoucher}
        navigation1={() => {
          goBack();
        }}
        onPress1={true}
        onPress2={false}
        Images1={Images.backIcon}
        Images2={null}
        cancelButtonStyle1={styles.plusIconStyle}
        Images1Color={color.white}
      />
      <View style={styles.flatListOuterViewStyle}>
        <FlatList
          bounces={false}
          showsVerticalScrollIndicator={false}
          data={DiscountVoucherDummy}
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
                  {/* <View style={styles.useButtonView}>
                    <TouchableOpacity style={styles.useTouchableStyle}>
                      <Text style={{color: '#fff'}}>Use</Text>
                    </TouchableOpacity>
                  </View> */}
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
    paddingHorizontal: wp(6),
    paddingVertical: hp(2.5),
    marginBottom: hp(13),
  },
  flatListInnerViewStyle: {
    backgroundColor: '#fff',
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    borderRadius: 6,
    marginVertical: hp(1),
  },
  cartTitleTextStyle: {
    fontSize: fontSize(18),
    fontWeight: '600',
    marginBottom: hp(1),
  },
  cartView: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-end',
  },
  timeIconStyle: {
    height: hp(4),
    width: wp(4),
    resizeMode: 'contain',
    marginRight: wp(2),
  },
  secondViewStyle: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-end',
    marginHorizontal: wp(4),
  },
  useButtonView: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderColor: color.grayLight,
  },
  useTouchableStyle: {
    backgroundColor: color.commonBlue,
    borderRadius: 100,
    paddingVertical: hp(1),
    paddingHorizontal: wp(8.5),
  },
});

export default DiscountVoucher;
