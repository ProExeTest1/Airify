import React from 'react';
import {useSelector} from 'react-redux';
import {FlatList, Image, Platform, StyleSheet, Text, View} from 'react-native';

import {color} from '../../helper/ColorConstant';
import {Images} from '../../helper/IconConstant';
import {
  FlightDetailsData,
  FlightDetailsData1,
} from '../../assets/DummyData/FlightDetailsData';
import {fontSize, hp, wp} from '../../helper/Constant';

const FlightDetails = () => {
  const cardData = useSelector(
    state => state.searchFlight.searchFlightCardData,
  );
  const searchFlightData = useSelector(e => e?.place?.searchFlightData);
  const searchFlightDateData = useSelector(e => e?.date?.depatureDate).split(
    ' ',
  );
  const reduxDepaturePlace = useSelector(state => state.place.depaturePlace);
  const reduxDestinationPlace = useSelector(
    state => state.place.destinationPlace,
  );
  let depatureData =
    reduxDepaturePlace.city + '(' + reduxDepaturePlace.airport + ')';
  let destinationData =
    reduxDestinationPlace.city + '(' + reduxDestinationPlace.airport + ')';
  return (
    <View style={styles.mainViewStyle}>
      <View style={styles.firstViewStyle}>
        <View>
          <Text style={styles.timeTextStyle}>{cardData.pickTime}</Text>
          <Text style={styles.dateStyle}>
            {searchFlightDateData[0].split(',')[1]} {searchFlightDateData[1]}
          </Text>
        </View>
        <Text style={styles.dateStyle}>{cardData.totalHours}</Text>
        <View>
          <Text style={styles.timeTextStyle}>{cardData.lendTime}</Text>
          <Text style={styles.dateStyle}>
            {searchFlightDateData[0].split(',')[1]} {searchFlightDateData[1]}
          </Text>
        </View>
      </View>
      <View>
        <Image
          style={{flex: 1}}
          resizeMode="contain"
          source={Images.planPrograce}
        />
      </View>
      <View style={{flex: 1}}>
        <Text style={styles.cardHeaderText}>
          {depatureData}, {reduxDepaturePlace.country}
        </Text>
        <Text style={styles.dateStyle}>
          {reduxDepaturePlace.capitalName} International Airport
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
              EK-202 {searchFlightData.class.split(' ')[0]}
            </Text>
          </View>

          <View style={[styles.flatlistViewStyle, {borderBottomWidth: 1}]}>
            <FlatList
              bounces={false}
              scrollEnabled={false}
              data={FlightDetailsData}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => {
                return (
                  <View style={styles.flatlist1InnerViewStyle}>
                    <Image
                      source={item.image}
                      resizeMode="contain"
                      style={styles.flatlistIconStyle}
                    />
                    <Text style={styles.flatlistTextStyle}>{item.text}</Text>
                  </View>
                );
              }}
              keyExtractor={item => item.id}
            />
          </View>
          <View style={styles.flatlistViewStyle}>
            <FlatList
              bounces={false}
              scrollEnabled={false}
              data={FlightDetailsData1}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => {
                return (
                  <View style={styles.flatlist1InnerViewStyle}>
                    <Image
                      source={item.image}
                      resizeMode="contain"
                      style={styles.flatlistIconStyle}
                    />
                    {item.text == 'Airline' ? (
                      <Text style={styles.flatlistTextStyle}>
                        {cardData.airlineName} {searchFlightData.passenger}
                      </Text>
                    ) : (
                      <Text style={styles.flatlistTextStyle}>{item.text}</Text>
                    )}
                  </View>
                );
              }}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
        <Text style={styles.cardHeaderText}>
          {destinationData}, {reduxDestinationPlace.country}
        </Text>
        <Text style={styles.dateStyle}>
          {reduxDestinationPlace.capitalName} International Airport
        </Text>
      </View>
    </View>
  );
};

export default FlightDetails;

const styles = StyleSheet.create({
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
    tintColor: '#383838',
  },
  flatlistViewStyle: {
    alignItems: 'center',
    borderColor: '#e2e2e2',
    marginVertical: Platform.OS === 'ios' ? hp(0.9) : hp(0.5),
  },
  flatlistTextStyle: {
    color: '#383838',
    fontSize: fontSize(15),
    marginHorizontal: wp(3),
  },
  flatlist1InnerViewStyle: {
    flexDirection: 'row',
    marginVertical: Platform.OS == 'ios' ? hp(1) : hp(0.7),
  },
  mainViewStyle: {
    width: '92%',
    height: '77%',
    marginHorizontal: wp(4),
    borderRadius: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    paddingVertical: hp(2.4),
    paddingHorizontal: wp(5.3),
    backgroundColor: color.white,
  },
  firstViewStyle: {
    flex: 1,
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
    color: '#383838',
    fontSize: fontSize(15),
    marginVertical: hp(1),
  },
  secondInnerViewStyle: {
    borderRadius: 7,
    borderWidth: 0.5,
    padding: hp(1.2),
    marginVertical: Platform.OS === 'ios' ? hp(1) : hp(0.5),
  },
  airlineNameStyle: {
    borderColor: '#e2e2e2',
    borderBottomWidth: 0.5,
    paddingVertical: Platform.OS === 'ios' ? hp(0.4) : hp(0),
  },
  classtextStyle: {
    color: color.black,
    fontSize: fontSize(16),
    marginVertical: hp(0.6),
  },
});
