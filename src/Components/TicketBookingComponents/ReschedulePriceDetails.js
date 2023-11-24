import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CardHeader from './CardHeader';
import {Images} from '../../helper/IconConstant';
import {useSelector} from 'react-redux';
import {fontSize, hp, wp} from '../../helper/Constant';

const ReschedulePriceDetails = ({
  oldPrice,
  oldTripData,
  newPrice,
  newTripData,
  totalPassenger,
  ticketPrice,
  totalSeat,
  DiscountData,
  TotalPoints,
  ToggleSwitchBut1,
}) => {
  const strings = useSelector(state => state?.languageReducer?.languageObject);

  const insurancePrice = Math.round((newPrice * 2.8) / 100);
  const travelTax = Math.round((newPrice * 1.5) / 100);

  console.log('<<><><><><><>>', DiscountData, TotalPoints);
  // isReturn === 'Round-Trip'
  //   ?
  //   : Math.round((totalSeat * ticketPrice * 1.5) / 100);
  const discount = 0;
  // DiscountData?.discountPR
  //   ? isReturn === 'Round-Trip'
  //     ? Math.round(
  //         (totalSeat *
  //           (ticketPrice + returnTicketPrice) *
  //           DiscountData?.discountPR) /
  //           100,
  //       )
  //     : Math.round((totalSeat * ticketPrice * DiscountData?.discountPR) / 100)
  //   : 0;
  const TotalPoint = TotalPoints ? TotalPoints : 0;
  const validPoint = ToggleSwitchBut1 ? Math.floor(TotalPoint / 100) : 0;
  const havePonts = TotalPoint % 100;
  const color = useSelector(state => state?.themereducer?.colorTheme);
  const styles = ThemeStyle(color);
  return (
    <View style={styles.cardBody}>
      <CardHeader
        FirstImage={Images.dollarIcon}
        header={strings.Pice_Detail_string}
      />
      <View style={styles.ticketPriceViewStyle}>
        <View style={styles.priceViewStyle}>
          <Text numberOfLines={1} style={styles.priceTextStyle}>
            {' '}
            Old Trip:{oldTripData?.airlineName.split(' ')[0]}{' '}
            {`(${strings.Adult}) x ${totalPassenger} `}
          </Text>
          <Text numberOfLines={1} style={styles.priceTextStyle}>
            -${oldPrice}.00
          </Text>
        </View>
        <View style={styles.priceViewStyle}>
          <Text numberOfLines={1} style={styles.priceTextStyle}>
            {' '}
            New Trip:{newTripData?.airlineName.split(' ')[0]}{' '}
            {`(${strings.Adult}) x ${totalPassenger} `}
          </Text>
          <Text numberOfLines={1} style={styles.priceTextStyle}>
            ${newPrice}.00
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
          {
            // totalSeat * ticketPrice +
            //   totalSeat * returnTicketPrice +
            newPrice +
              insurancePrice +
              travelTax -
              discount -
              validPoint -
              oldPrice
          }
          .00
        </Text>
      </View>
    </View>
  );
};

export default ReschedulePriceDetails;

const ThemeStyle = color =>
  StyleSheet.create({
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
