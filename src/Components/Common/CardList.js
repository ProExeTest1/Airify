import React from 'react';
import {useSelector} from 'react-redux';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import {Images} from '../../helper/IconConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import {strings} from '../../helper/Strings';

const CardList = ({
  setCartFlightData,
  item,
  index,
  tripType,
  searchFlight,
  searchFilght,
}) => {
  const searchFlightData = searchFlight
    ? searchFlight
    : useSelector(e =>
        tripType === 'Round-Trip'
          ? e?.searchFlight?.searchFlightReturnData
          : e?.place?.searchFlightData,
      );
  const color = useSelector(state => state?.themereducer?.colorTheme);
  const styles = ThemeStyle(color);
  return (
    <TouchableOpacity
      onPress={() => {
        setCartFlightData(item);
      }}
      style={[
        styles.cardBody,
        {
          marginTop: index === 0 ? hp(3) : 0,
          marginBottom: index == searchFilght?.length - 1 ? hp(15) : hp(2),
        },
      ]}>
      <View style={styles.cardHeader}>
        <View style={[styles.cardHeaderLogo, {backgroundColor: item?.logo}]} />
        <Text style={styles.cardHeaderText}>{item?.airlineName}</Text>
        <Text style={styles.cardPrice}>{item?.price}</Text>
        <Text style={styles.cardPriceTitle}>{strings.pax}</Text>
      </View>
      <View style={styles.cardDataBody}>
        <View style={styles.FlightsPlaseBody}>
          <Text style={styles.FlightsPlaseName}>{searchFlightData?.from}</Text>
          <Text style={styles.FlightsPlaseNicName}>{item.pickTime}</Text>
        </View>
        <View style={styles.FlightsPlaseImgBody}>
          <Image
            style={styles.FlightsPlaseImg}
            source={
              color.white === '#fff'
                ? Images.airplaneWhiteIcon
                : Images.airplaneDarkWhiteIcon
            }
          />
          <Text style={styles.FlightsPlaseImgText}>{item.totalHours}</Text>
        </View>
        <View style={[styles.FlightsPlaseBody, {alignItems: 'flex-end'}]}>
          <Text style={styles.FlightsPlaseName}>{searchFlightData?.to}</Text>
          <Text style={styles.FlightsPlaseNicName}>{item.lendTime}</Text>
        </View>
      </View>
      <View style={styles.cardBottemBody}>
        <Text style={styles.FlightsPlaseName}>
          {searchFlightData?.fromShortform}
        </Text>
        <Text style={styles.FlightsPlaseImgText}>{item.stop}</Text>
        <Text style={styles.FlightsPlaseName}>
          {searchFlightData?.toShortform}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const ThemeStyle = color =>
  StyleSheet.create({
    cardBody: {
      flex: 1,
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: wp(4),
      borderColor: color.grey,
      backgroundColor: color.white,
    },
    cardHeader: {
      alignItems: 'center',
      flexDirection: 'row',
      borderBottomWidth: 2,
      paddingVertical: hp(2.5),
      borderColor: color.grey,
    },
    cardHeaderText: {
      flex: 1,
      color: color.black,
      fontWeight: 'bold',
      fontSize: fontSize(18),
    },
    cardHeaderLogo: {
      width: wp(5.8),
      height: wp(5.8),
      marginEnd: wp(3),
      borderRadius: 500,
    },
    cardPrice: {
      fontWeight: '600',
      fontSize: fontSize(20),
      color: color.commonBlue,
    },
    cardPriceTitle: {
      color: color.darkLight,
      fontSize: fontSize(18),
    },
    cardDataBody: {
      paddingTop: hp(2.5),
      alignItems: 'center',
      flexDirection: 'row',
    },
    FlightsPlaseBody: {
      width: wp(20),
    },
    FlightsPlaseImgBody: {
      flex: 1,
      alignItems: 'center',
    },
    FlightsPlaseImg: {
      height: hp(5),
      width: hp(17),
    },
    FlightsPlaseImgText: {
      color: color.darkLight,
      fontSize: fontSize(13),
    },
    FlightsPlaseNicName: {
      color: color.black,
      fontWeight: 'bold',
      marginTop: hp(1.5),
      fontSize: fontSize(21),
    },
    FlightsPlaseName: {
      fontWeight: '500',
      color: color.darkLight,
    },
    cardBottemBody: {
      paddingTop: hp(1),
      alignItems: 'center',
      flexDirection: 'row',
      paddingBottom: hp(2.5),
      justifyContent: 'space-between',
    },
  });
export default CardList;
