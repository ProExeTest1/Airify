import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {CommonHeader} from '../../components';
import {strings} from '../../helper/Strings';
import {Images} from '../../helper/IconConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import {DiscountVoucherDummy} from '../../assets/DummyData/Discount';
import {useDispatch, useSelector} from 'react-redux';
import {DiscountDataAction} from '../../redux/action/SelectSeatAction';
import {AlertConstant} from '../../helper/AlertConstant';
import {RescheduleDiscountDataAction} from '../../redux/action/RescheduleAction';

const UseDiscountVoucher = ({navigation, route}) => {
  const tripType = route?.params?.TripType;
  const type = route?.params?.type;
  const dispatch = useDispatch();
  const [DiscountData, setDiscountData] = useState(
    useSelector(e => e?.SelectSeatData?.DiscountData),
  );
  const item = useSelector(state =>
    type == 'Reschedule'
      ? state?.rescheduleFlightdata?.rescheduleCardData?.searchFlightCardData
      : state.searchFlight.searchFlightCardData,
  );
  const searchFlightData = useSelector(e =>
    type == 'Reschedule'
      ? e?.rescheduleFlightdata?.rescheduleCardData.searchFlightData
      : e?.place?.searchFlightData,
  );
  const totalSeat = Number(searchFlightData?.passenger?.split(' ')[0]);
  const ticketPrice = parseInt(item?.price.slice(1, 8).split(',').join(''), 10);
  const CheckData = () => {
    if (DiscountData?.id) {
      if (
        Number(
          DiscountData?.MinTransaction?.replace('$', '').replaceAll(',', ''),
        ) <
        ticketPrice * totalSeat
      ) {
        type == 'Reschedule'
          ? dispatch(RescheduleDiscountDataAction(DiscountData))
          : dispatch(DiscountDataAction(DiscountData));
        type == 'Reschedule'
          ? navigation.goBack()
          : navigation.navigate('PaymentConfirmation', {TripType: tripType});
      } else {
        AlertConstant(strings.not_valid_voucher);
      }
    } else {
      setDiscountData({});
      AlertConstant(strings.select_voucher);
    }
  };
  const color = useSelector(state => state?.themereducer?.colorTheme);
  const styles = ThemeStyle(color);
  return (
    <View style={styles.container}>
      <CommonHeader
        headerName={strings.discountVoucher}
        navigation1={() => {
          navigation?.goBack();
        }}
        onPress1={true}
        onPress2={false}
        Images1={Images.backIcon}
        Images2={null}
        cancelButtonStyle1={styles.plusIconStyle}
        Images1Color={'#fff'}
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
                <Text numberOfLines={1} style={styles.textStyle}>
                  {item.title}
                </Text>
                <View style={{flexDirection: 'row', marginTop: hp(1)}}>
                  <View style={styles.cartView}>
                    <Image source={Images.clock} style={styles.timeIconStyle} />
                    <View>
                      <Text
                        style={{fontSize: fontSize(10), color: color.black}}>
                        {strings.ValidUntil}
                      </Text>
                      <Text
                        style={{
                          fontSize: fontSize(13),
                          marginTop: 'auto',
                          color: color.black,
                        }}>
                        {item?.ValidUntil}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.secondViewStyle}>
                    <Image
                      source={Images.payment}
                      style={styles.timeIconStyle}
                    />
                    <View>
                      <Text
                        style={{fontSize: fontSize(10), color: color.black}}>
                        {strings.minTransaction}
                      </Text>
                      <Text
                        style={{
                          fontSize: fontSize(13),
                          marginTop: 'auto',
                          color: color.black,
                        }}>
                        {item?.MinTransaction}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.useButtonView}>
                    <TouchableOpacity
                      onPress={() => setDiscountData(item)}
                      style={[
                        styles.useTouchableStyle,
                        {
                          backgroundColor:
                            DiscountData?.id === item?.id
                              ? '#fff'
                              : color.commonBlue,
                          borderColor:
                            DiscountData?.id === item?.id
                              ? color.grayLight
                              : color.commonBlue,
                        },
                      ]}>
                      <Text
                        style={{
                          color:
                            DiscountData?.id === item?.id ? '#000' : '#fff',
                        }}>
                        Use
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
      <View style={styles.bottomButtonBody}>
        <TouchableOpacity
          onPress={() => {
            CheckData();
          }}
          style={styles.okButton}>
          <Text style={styles.okButtonText}>{strings.ok}</Text>
        </TouchableOpacity>
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
      paddingtop: hp(2.5),
    },
    flatListInnerViewStyle: {
      backgroundColor: color.white,
      paddingHorizontal: wp(4),
      paddingVertical: hp(2),
      borderRadius: 6,
      marginVertical: hp(1),
    },
    cartTitleTextStyle: {
      fontSize: fontSize(18),
      fontWeight: '600',
      marginBottom: hp(1),
      color: color.black,
    },
    cartView: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'space-between',
      marginTop: hp(0.5),
    },
    timeIconStyle: {
      height: wp(3.5),
      width: wp(3.5),
      marginRight: wp(2),
      tintColor: color.black,
    },
    secondViewStyle: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'space-between',
      marginHorizontal: wp(4),
      marginTop: hp(0.5),
    },
    useButtonView: {
      flex: 1,
      alignItems: 'flex-end',
      justifyContent: 'center',
      borderLeftWidth: 1,
      borderColor: color.grey,
      marginTop: hp(0.5),
    },
    useTouchableStyle: {
      borderWidth: 1,
      borderRadius: 100,
      paddingVertical: hp(1),
      width: wp(20),
      alignItems: 'center',
    },
    bottomButtonBody: {
      backgroundColor: color.white,
      paddingHorizontal: wp(6),
      paddingTop: hp(2),
      paddingBottom: hp(2),
      flexDirection: 'row',
    },

    okButton: {
      backgroundColor: color.commonBlue,
      paddingVertical: hp(2),
      alignItems: 'center',
      borderRadius: 10,
      flex: 1,
    },
    okButtonText: {
      fontSize: fontSize(18),
      fontWeight: '500',
      color: '#fff',
    },
    textStyle: {
      color: color.black,
    },
  });

export default UseDiscountVoucher;
