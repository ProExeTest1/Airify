import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Images} from '../../helper/IconConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import {color} from '../../helper/ColorConstant';
import {useSelector} from 'react-redux';

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
    backgroundColor: color.white,
    paddingHorizontal: wp(4),
    marginBottom: hp(2),
    borderRadius: 10,
    borderColor: '#000',
    flex: 1,
    width: '100%',
    alignSelf: 'center',
  },
  cardHeader: {
    borderColor: '#e2e2e2',
    borderBottomWidth: 1,
    paddingVertical: hp(2.5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardHeaderText: {
    fontSize: fontSize(18),
    fontWeight: 'bold',
    flex: 1,
    color: color.black,
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
    marginVertical: hp(1.2),
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
    alignItems: 'center',
    flex: 1,
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
    fontSize: fontSize(21),
    color: '#000',
    fontWeight: 'bold',
    marginTop: hp(1.5),
  },
  FlightsPlaseName: {
    color: '#7e7e7f',
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
