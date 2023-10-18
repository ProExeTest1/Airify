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
import {color} from '../../helper/ColorConstant';
import {CommonHeader} from '../../components';
import {strings} from '../../helper/Strings';
import {Images} from '../../helper/IconConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import {DiscountVoucherDummy} from '../../assets/DummyData/Discount';
import {useDispatch, useSelector} from 'react-redux';
import {DiscountDataAction} from '../../redux/action/SelectSeatAction';

const UseDiscountVoucher = ({navigation: {goBack}, navigation}) => {
  const dispatch = useDispatch();
  const [DiscountData, setDiscountData] = useState(
    useSelector(e => e.SelectSeatData.DiscountData),
  );
  const item = useSelector(state => state.searchFlight.searchFlightCardData);
  const searchFlightData = useSelector(e => e?.place?.searchFlightData);
  const totalSeat = Number(searchFlightData.passenger.split(' ')[0]);
  const ticketPrice = parseInt(item?.price.slice(1, 8).split(',').join(''), 10);
  const CheckData = () => {
    if (DiscountData?.id) {
      if (
        Number(
          DiscountData?.MinTransaction.replace('$', '').replaceAll(',', ''),
        ) <
        ticketPrice * totalSeat
      ) {
        dispatch(DiscountDataAction(DiscountData));
        navigation.navigate('PatmentConfirmation');
      } else {
        Alert.alert('this voucher not valid for you');
      }
    } else {
      setDiscountData({});
      Alert.alert('please select one voucher');
    }
  };
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
                      <Text style={{fontSize: fontSize(13), marginTop: 'auto'}}>
                        {item.ValidUntil}
                      </Text>
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
                      <Text style={{fontSize: fontSize(13), marginTop: 'auto'}}>
                        {item.MinTransaction}
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
          <Text style={styles.okButtonText}>Ok</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListOuterViewStyle: {
    flex: 1,
    paddingHorizontal: wp(6),
    paddingtop: hp(2.5),
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
    justifyContent: 'space-between',
    marginTop: hp(0.5),
  },
  timeIconStyle: {
    height: wp(3.5),
    width: wp(3.5),
    marginRight: wp(2),
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
    borderColor: color.grayLight,
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
    backgroundColor: '#fff',
    paddingHorizontal: wp(6),
    paddingTop: hp(2),
    paddingBottom: hp(4),
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
});

export default UseDiscountVoucher;
