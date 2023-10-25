import {useSelector} from 'react-redux';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import {Images} from '../../helper/IconConstant';
import {color} from '../../helper/ColorConstant';
import {fontSize, hp, wp} from '../../helper/Constant';

const FlightDetailsCard = ({
  item,
  ticketType,
  searchFlightData,
  searchFlightDateData,
}) => {
  // console.log(searchFlightDateData, 'hfghjfb=======>>>>>');
  console.log(searchFlightDateData);
  return (
    <View style={styles.cardBody}>
      <View style={styles.cardHeader}>
        <View style={[styles.cardHeaderLogo, {backgroundColor: item?.logo}]} />
        <Text style={styles.cardHeaderText}>{item?.airlineName}</Text>

        <Text style={styles.cardPriceTitle}>{`${searchFlightDateData[0]?.slice(
          0,
          3,
        )},${searchFlightDateData[1]}`}</Text>
      </View>
      <View style={styles.cardDataBody}>
        <View style={styles.FlightsPlaseBody}>
          <Text style={styles.FlightsPlaseName}>{searchFlightData?.from}</Text>
          <Text style={styles.FlightsPlaseNicName}>{item?.pickTime}</Text>
        </View>
        <View style={styles.FlightsPlaseImgBody}>
          <Image
            style={styles.FlightsPlaseImg}
            source={Images.airplaneWhiteIcon}
          />
          <Text style={styles.FlightsPlaseImgText}>{item?.totalHours}</Text>
        </View>
        <View style={[styles.FlightsPlaseBody, {alignItems: 'flex-end'}]}>
          <Text style={styles.FlightsPlaseName}>{searchFlightData?.to}</Text>
          <Text style={styles.FlightsPlaseNicName}>{item?.lendTime}</Text>
        </View>
      </View>
      <View style={styles.cardBottemBody}>
        <Text style={styles.FlightsPlaseName}>
          {searchFlightData?.fromShortform}
        </Text>
        <Text style={styles.FlightsPlaseImgText}>{item?.stop}</Text>
        <Text style={styles.FlightsPlaseName}>
          {searchFlightData?.toShortform}
        </Text>
      </View>
    </View>
  );
};

export default FlightDetailsCard;

const styles = StyleSheet.create({
  cardBody: {
    borderRadius: 10,
    borderColor: '#000',
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    marginBottom: hp(2),
    paddingHorizontal: wp(4),
    backgroundColor: color.white,
  },
  cardHeader: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#e2e2e2',
    paddingVertical: hp(2.5),
  },
  cardHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    color: color.black,
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
    marginVertical: hp(1.2),
    color: color.commonBlue,
  },
  cardPriceTitle: {
    color: '#7e7e7f',
    fontSize: fontSize(16),
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
    flex: 1,
    alignItems: 'center',
  },
  FlightsPlaseImg: {
    height: hp(5),
    width: hp(17),
  },
  FlightsPlaseImgText: {
    color: '#7e7e7f',
    fontSize: fontSize(13),
  },
  FlightsPlaseNicName: {
    color: '#000',
    fontWeight: 'bold',
    marginTop: hp(1.5),
    fontSize: fontSize(21),
  },
  FlightsPlaseName: {
    color: '#7e7e7f',
    fontWeight: '500',
  },
  cardBottemBody: {
    paddingTop: hp(1),
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: hp(2.5),
    justifyContent: 'space-between',
  },
});
