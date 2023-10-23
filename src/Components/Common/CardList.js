import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import {fontSize, hp, wp} from '../../helper/Constant';
import React from 'react';
import {Images} from '../../helper/IconConstant';
import {useSelector} from 'react-redux';
import {color} from '../../helper/ColorConstant';

const CardList = ({setCartFlightData, item, index, tripType}) => {
  const searchFlightData = useSelector(e =>
    tripType === 'Round-Trip'
      ? e?.searchFlight?.searchFlightReturnData
      : e?.place?.searchFlightData,
  );

  // console.log(tripType);
  return (
    <TouchableOpacity
      onPress={() => {
        setCartFlightData(item);
      }}
      style={[styles.cardBody, {marginTop: index === 0 ? hp(3) : 0}]}>
      <View style={styles.cardHeader}>
        <View style={[styles.cardHeaderLogo, {backgroundColor: item?.logo}]} />
        <Text style={styles.cardHeaderText}>{item?.airlineName}</Text>
        <Text style={styles.cardPrice}>{item?.price}</Text>
        <Text style={styles.cardPriceTitle}>/pax</Text>
      </View>
      <View style={styles.cardDataBody}>
        <View style={styles.FlightsPlaseBody}>
          <Text style={styles.FlightsPlaseName}>{searchFlightData?.from}</Text>
          <Text style={styles.FlightsPlaseNicName}>{item.pickTime}</Text>
        </View>
        <View style={styles.FlightsPlaseImgBody}>
          <Image
            style={styles.FlightsPlaseImg}
            source={Images.airplaneWhiteIcon}
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
const styles = StyleSheet.create({
  cardBody: {
    backgroundColor: color.white,
    paddingHorizontal: wp(4),
    marginBottom: hp(2),
    borderRadius: 10,
    borderColor: color.grayLight,
    borderWidth: 1,
    flex: 1,
  },
  cardHeader: {
    borderColor: color.grayLight,
    borderBottomWidth: 1,
    paddingVertical: hp(2.5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardHeaderText: {
    fontSize: fontSize(18),
    fontWeight: 'bold',
    flex: 1,
    color: 'black',
  },
  cardHeaderLogo: {
    height: wp(5.8),
    width: wp(5.8),
    borderRadius: 500,
    marginEnd: wp(3),
  },
  cardPrice: {
    color: color.commonBlue,
    fontSize: fontSize(20),
    fontWeight: '600',
  },
  cardPriceTitle: {
    color: color.darkLight,
    fontSize: fontSize(18),
  },
  cardDataBody: {
    paddingTop: hp(2.5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  FlightsPlaseBody: {
    width: wp(20),
  },
  FlightsPlaseImgBody: {
    alignItems: 'center',
    flex: 1,
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
    fontSize: fontSize(21),
    color: '#000',
    fontWeight: 'bold',
    marginTop: hp(1.5),
  },
  FlightsPlaseName: {
    color: color.darkLight,
    fontWeight: '500',
  },
  cardBottemBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: hp(2.5),
    paddingTop: hp(1),
  },
});
export default CardList;
