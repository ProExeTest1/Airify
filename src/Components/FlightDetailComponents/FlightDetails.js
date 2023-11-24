import React from 'react';
import {useSelector} from 'react-redux';
import {FlatList, Image, Platform, StyleSheet, Text, View} from 'react-native';

import {Images} from '../../helper/IconConstant';
import {
  FlightDetailsData,
  FlightDetailsData1,
  FrenchFlightDetailsData,
  FrenchFlightDetailsData1,
} from '../../assets/DummyData/FlightDetailsData';
import {fontSize, hp, wp} from '../../helper/Constant';

const FlightDetails = () => {
  const strings = useSelector(state => state?.languageReducer?.languageObject);
  const cardData = useSelector(
    state => state?.searchFlight?.searchFlightCardData,
  );
  const searchFlightData = useSelector(e => e?.place?.searchFlightData);
  const searchFlightDateData = useSelector(e => e?.date?.depatureDate).split(
    ' ',
  );
  const reduxDepaturePlace = useSelector(state => state?.place?.depaturePlace);
  const reduxDestinationPlace = useSelector(
    state => state?.place?.destinationPlace,
  );
  let depatureData =
    reduxDepaturePlace?.city + '(' + reduxDepaturePlace?.airport + ')';
  let destinationData =
    reduxDestinationPlace?.city + '(' + reduxDestinationPlace?.airport + ')';

  const color = useSelector(state => state?.themereducer?.colorTheme);
  const styles = ThemeStyle(color);
  return (
    <View style={styles.mainViewStyle}>
      <View style={styles.firstViewStyle}>
        <View>
          <Text style={styles.timeTextStyle}>{cardData?.pickTime}</Text>
          <Text style={styles.dateStyle}>
            {searchFlightDateData[0]?.split(',')[1]} {searchFlightDateData[1]}
          </Text>
        </View>
        <Text style={styles.dateStyle}>{cardData?.totalHours}</Text>
        <View>
          <Text style={styles.timeTextStyle}>{cardData?.lendTime}</Text>
          <Text style={styles.dateStyle}>
            {searchFlightDateData[0]?.split(',')[1]} {searchFlightDateData[1]}
          </Text>
        </View>
      </View>
      <View>
        <Image
          style={{flex: 1}}
          resizeMode="contain"
          source={
            color.white == '#fff'
              ? Images.planPrograce
              : Images.planPrograceDark
          }
        />
      </View>
      <View style={{flex: 3}}>
        <Text style={styles.cardHeaderText}>
          {depatureData}, {reduxDepaturePlace?.country}
        </Text>
        <Text style={styles.dateStyle}>
          {reduxDepaturePlace?.capitalName} {strings?.internation_airport}
        </Text>
        <View style={styles.secondInnerViewStyle}>
          <View style={styles.airlineNameStyle}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={[
                  styles.cardHeaderLogo,
                  {backgroundColor: cardData?.logo},
                ]}
              />
              <Text style={styles.cardHeaderText}>{cardData?.airlineName}</Text>
            </View>
            <Text style={styles.classtextStyle}>
              {strings?.EK_202} {searchFlightData?.class?.split(' ')[0]}
            </Text>
          </View>

          <View style={[styles.flatlistViewStyle, {borderBottomWidth: 1}]}>
            <FlatList
              bounces={false}
              scrollEnabled={false}
              data={
                strings?.translate ? FrenchFlightDetailsData : FlightDetailsData
              }
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => {
                return (
                  <View style={styles.flatlist1InnerViewStyle}>
                    <Image
                      source={item.image}
                      resizeMode="contain"
                      style={styles.flatlistIconStyle}
                    />
                    <Text style={styles.flatlistTextStyle}>{item?.text}</Text>
                  </View>
                );
              }}
              keyExtractor={item => item?.id}
            />
          </View>
          <View style={styles.flatlistViewStyle}>
            <FlatList
              bounces={false}
              scrollEnabled={false}
              data={
                strings?.translate
                  ? FrenchFlightDetailsData1
                  : FlightDetailsData1
              }
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => {
                return (
                  <View style={styles.flatlist1InnerViewStyle}>
                    <Image
                      source={item?.image}
                      resizeMode="contain"
                      style={styles.flatlistIconStyle}
                    />
                    {item.text == 'Airline' ? (
                      <Text style={styles.flatlistTextStyle}>
                        {cardData?.airlineName} {searchFlightData?.passenger}
                      </Text>
                    ) : (
                      <Text style={styles.flatlistTextStyle}>{item?.text}</Text>
                    )}
                  </View>
                );
              }}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
        <Text style={styles.cardHeaderText}>
          {destinationData}, {reduxDestinationPlace?.country}
        </Text>
        <Text style={styles.dateStyle}>
          {reduxDestinationPlace?.capitalName} {strings?.internation_airport}
        </Text>
      </View>
    </View>
  );
};

export default FlightDetails;

const ThemeStyle = color =>
  StyleSheet.create({
    cardHeaderText: {
      fontWeight: '700',
      color: color.black,
      fontSize: fontSize(17),
    },
    cardHeaderLogo: {
      width: wp(5.8),
      height: wp(5.8),
      marginEnd: wp(3),
      borderRadius: 500,
    },
    flatlistIconStyle: {
      width: hp(2.3),
      height: hp(2.3),
      tintColor: color.darkLight,
    },
    flatlistViewStyle: {
      // alignItems: 'center',
      borderColor: color.grey,
      marginVertical: hp(0.9),
    },
    flatlistTextStyle: {
      color: color.darkLight,
      fontSize: fontSize(15),
      marginLeft: wp(3),
      flex: 1,
    },
    flatlist1InnerViewStyle: {
      flexDirection: 'row',
      marginVertical: hp(0.7),
    },
    mainViewStyle: {
      flex: 1,
      marginBottom: hp(2),
      marginHorizontal: wp(4),
      borderRadius: 10,
      alignSelf: 'center',
      flexDirection: 'row',
      paddingVertical: hp(2.4),
      paddingHorizontal: wp(5.3),
      backgroundColor: color.white,
    },
    firstViewStyle: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      marginRight: wp(4),
    },
    timeTextStyle: {
      fontWeight: '500',
      color: color.black,
      fontSize: fontSize(18),
    },
    dateStyle: {
      color: color.darkLight,
      fontSize: fontSize(15),
      marginVertical: hp(1),
    },
    secondInnerViewStyle: {
      borderRadius: 7,
      borderWidth: 1,
      borderColor: color.grey,
      padding: hp(1.2),
      marginVertical: hp(1),
    },
    airlineNameStyle: {
      borderColor: '#e2e2e2',
      borderBottomWidth: 0.5,
      paddingVertical: hp(0.4),
    },
    classtextStyle: {
      color: color.black,
      fontSize: fontSize(16),
      marginVertical: hp(0.6),
    },
  });
