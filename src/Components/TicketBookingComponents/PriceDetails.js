import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CardHeader from './CardHeader';
import {Images} from '../../helper/IconConstant';
import {useSelector} from 'react-redux';
import {fontSize, hp, wp} from '../../helper/Constant';
import {color} from '../../helper/ColorConstant';
import {strings} from '../../helper/Strings';

const PriceDetails = ({
  totalPassenger,
  totalSeat,
  ticketPrice,
  item,
  ToggleSwitchBut1,
  TotalPoints,
}) => {
  const DiscountData = useSelector(e => e.SelectSeatData.DiscountData);
  const insurancePrice = Math.round((totalSeat * ticketPrice * 2.8) / 100);
  const travelTax = Math.round((totalSeat * ticketPrice * 1.5) / 100);
  const discount = DiscountData?.discountPR
    ? Math.round((totalSeat * ticketPrice * DiscountData?.discountPR) / 100)
    : 0;
  const TotalPoint = TotalPoints ? TotalPoints : 0;
  const validPoint = ToggleSwitchBut1 ? Math.floor(TotalPoint / 100) : 0;
  const havePonts = TotalPoint % 100;
  console.log('totalSeat', totalSeat);
  return (
    <View style={styles.cardBody}>
      <CardHeader
        FirstImage={Images.dollarIcon}
        header={strings.Pice_Detail_string}
      />
      <View style={styles.ticketPriceViewStyle}>
        <View style={styles.priceViewStyle}>
          <Text numberOfLines={1} style={styles.priceTextStyle}>
            {item?.airlineName} {`(${strings.Adult}) x ${totalPassenger} `}
          </Text>
          <Text numberOfLines={1} style={styles.priceTextStyle}>
            ${totalSeat * ticketPrice}.00
          </Text>
        </View>
        <View style={styles.priceViewStyle}>
          <Text numberOfLines={1} style={styles.priceTextStyle}>
            {strings.travel_inssurance}
          </Text>
          <Text style={styles.priceTextStyle}>${insurancePrice}.00</Text>
        </View>
        <View style={styles.priceViewStyle}>
          <Text numberOfLines={1} style={styles.priceTextStyle}>
            {strings.tax}
          </Text>
          <Text style={styles.priceTextStyle}>${travelTax}.00</Text>
        </View>
        {DiscountData?.id && (
          <View style={styles.priceViewStyle}>
            <Text numberOfLines={1} style={styles.priceTextStyle}>
              Discount{`(${DiscountData.discountPR}%)`}
            </Text>
            <Text style={styles.priceTextStyle}>-${discount}.00</Text>
          </View>
        )}
        {ToggleSwitchBut1 && (
          <View style={styles.priceViewStyle}>
            <Text numberOfLines={1} style={styles.priceTextStyle}>
              Points Used
            </Text>
            <Text style={styles.priceTextStyle}>-${validPoint}.00</Text>
          </View>
        )}
      </View>
      <View style={styles.priceViewStyle}>
        <Text numberOfLines={1} style={styles.priceTextStyle}>
          {strings.total_price}
        </Text>
        <Text numberOfLines={1} style={styles.priceTextStyle}>
          $
          {totalSeat * ticketPrice +
            insurancePrice +
            travelTax -
            discount -
            validPoint}
          .00
        </Text>
      </View>
    </View>
  );
};

export default PriceDetails;

const styles = StyleSheet.create({
  priceTextStyle: {
    fontSize: fontSize(17),
    fontWeight: '600',
    color: color.black,
  },
  priceViewStyle: {
    flexDirection: 'row',
    flex: 1,
    marginVertical: hp(1),
    justifyContent: 'space-between',
  },
  ticketPriceViewStyle: {
    marginVertical: hp(1),
    borderBottomWidth: 0.5,
    borderColor: '#e2e2e2',
  },
  cardBody: {
    backgroundColor: color.white,
    paddingHorizontal: wp(4),
    marginBottom: hp(2),
    borderRadius: 10,
    borderColor: '#000',
  },
  plusIconStyle: {
    height: hp(2),
    width: hp(2),
  },
});
