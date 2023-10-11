import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Images} from '../../helper/IconConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import {color} from '../../helper/ColorConstant';
import {useSelector} from 'react-redux';
import {
  FlightDetailsData,
  FlightDetailsData1,
} from '../../assets/DummyData/FlightDetailsData';

const FlightDetailsScreen = ({navigation}) => {
  const item = useSelector(state => state.searchFlight.searchFlightCardData);
  const searchFlightData = useSelector(e => e?.place?.searchFlightData);
  const searchFlightDateData = useSelector(e => e?.date?.depatureDate).split(
    ',',
  );
  return (
    <View>
      <View style={styles.headerViewStyle}>
        <SafeAreaView>
          <View style={styles.safeHeaderViewStyle}>
            <View style={styles.headerTextViewStyle}>
              <Text style={styles.headerTextStyle}>Flight Details</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.goBack('')}>
              <Image
                source={Images.backIcon}
                style={styles.backIconStyle}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View style={styles.saveShareViewStyle}>
              <TouchableOpacity>
                <Image
                  source={Images.saved}
                  style={styles.saveShareIconStyle}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={Images.shareIcon}
                  style={styles.saveShareIconStyle}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
      <View style={[styles.cardBody, {marginVertical: hp(2)}]}>
        <View style={styles.cardHeader}>
          <View
            style={[styles.cardHeaderLogo, {backgroundColor: item?.logo}]}
          />
          <Text style={styles.cardHeaderText}>{item?.airlineName}</Text>

          <Text style={styles.cardPriceTitle}>{`${searchFlightDateData[0].slice(
            0,
            3,
          )},${searchFlightDateData[1]}`}</Text>
        </View>
        <View style={styles.cardDataBody}>
          <View style={styles.FlightsPlaseBody}>
            <Text style={styles.FlightsPlaseName}>
              {searchFlightData?.from}
            </Text>
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
      </View>
      <View style={styles.cardBody}>
        <View
          style={[
            styles.flatlistViewStyle,
            {
              marginTop: hp(1),
            },
          ]}>
          <Image
            source={Images.aeroPlane}
            style={styles.aeroPlaneImageStyle}
            resizeMode="contain"
          />
          <View style={styles.secondCardHeaderStyle}>
            <Text style={styles.secondCardheaderTextStyle}>Original</Text>
            <Text style={styles.cardPrice}>
              {item?.price}
              <Text style={styles.cardPriceTitle}>/pax</Text>
            </Text>
          </View>
        </View>
        <View style={styles.flatlistViewStyle}>
          <FlatList
            data={FlightDetailsData}
            showsVerticalScrollIndicator={false}
            bounces={false}
            renderItem={({item}) => {
              return (
                <View style={styles.flatlist1InnerViewStyle}>
                  <Image
                    source={item.image}
                    style={styles.flatlistIconStyle}
                    resizeMode="contain"
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
            data={FlightDetailsData1}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            bounces={false}
            renderItem={({item}) => {
              return (
                <View style={styles.flatlist2InnerViewStyle}>
                  <Image
                    source={item.image}
                    style={styles.flatlistIconStyle}
                    resizeMode="contain"
                  />
                </View>
              );
            }}
            keyExtractor={item => item.id}
          />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('FlightPackageDetails', {header: 'Details'})
            }
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.detailsTextStyle}>Details</Text>
            <Image
              source={Images.forward}
              style={styles.forwardStyle}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.thirdCardStyle}>
        <View>
          <Text style={styles.priceTextStyle}>Total Price : 1 person(s)</Text>
          <Text style={styles.cardPrice}>{item?.price}.00</Text>
        </View>
        <TouchableOpacity style={styles.continueButtonStyle}>
          <Text style={styles.continueTextStyle}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FlightDetailsScreen;

const styles = StyleSheet.create({
  headerViewStyle: {
    backgroundColor: color.commonBlue,
  },
  backIconStyle: {
    height: hp(3),
    width: hp(3),
    tintColor: color.white,
  },
  headerTextStyle: {
    fontSize: fontSize(22),
    fontWeight: 'bold',
    color: color.white,
  },
  saveShareIconStyle: {
    height: hp(2.5),
    width: hp(2.5),
    tintColor: color.white,
  },
  safeHeaderViewStyle: {
    paddingHorizontal: wp(7),
    justifyContent: 'space-between',
    paddingVertical: Platform.OS == 'ios' ? hp(2) : hp(3),
    flexDirection: 'row',
  },
  headerTextViewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    width: wp(100),
  },
  saveShareViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp(17),
  },
  cardBody: {
    backgroundColor: color.white,
    paddingHorizontal: wp(4),
    marginBottom: hp(2),
    borderRadius: 10,
    borderColor: '#000',
    width: '92%',
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
  flatlistIconStyle: {
    height: hp(2.5),
    width: hp(2.5),
    tintColor: '#383838',
  },
  forwardStyle: {
    height: hp(1.8),
    width: hp(1.8),
    tintColor: color.commonBlue,
  },
  flatlistViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#e2e2e2',
    borderBottomWidth: 1,
    paddingVertical: hp(1.6),
  },
  aeroPlaneImageStyle: {
    height: hp(6),
    width: hp(6),
  },
  secondCardHeaderStyle: {
    marginHorizontal: wp(5),
  },
  secondCardheaderTextStyle: {
    fontSize: fontSize(18),
    fontWeight: 'bold',
  },
  thirdCardStyle: {
    backgroundColor: color.white,
    paddingHorizontal: wp(4),
    borderColor: '#000',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Platform.OS == 'ios' ? hp(4) : hp(2),
  },
  flatlistTextStyle: {
    fontSize: fontSize(18),
    color: '#383838',
    marginHorizontal: wp(3),
  },
  flatlist1InnerViewStyle: {
    flexDirection: 'row',
    marginVertical: hp(1),
  },
  flatlist2InnerViewStyle: {
    marginHorizontal: wp(2),
  },
  detailsTextStyle: {
    fontSize: fontSize(18),
    color: color.commonBlue,
    marginHorizontal: wp(3),
  },
  priceTextStyle: {color: '#383838'},
  continueButtonStyle: {
    height: hp(6.5),
    width: '50%',
    backgroundColor: color.commonBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  continueTextStyle: {
    fontSize: fontSize(18),
    color: color.white,
    fontWeight: '600',
  },
});
