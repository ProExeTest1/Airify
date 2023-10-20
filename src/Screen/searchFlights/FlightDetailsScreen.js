import React, {useEffect, useState} from 'react';
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
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {Images} from '../../helper/IconConstant';
import {color} from '../../helper/ColorConstant';
import {FlightDetailsCard} from '../../components';
import {fontSize, hp, wp} from '../../helper/Constant';
import {
  FlightDetailsData,
  FlightDetailsData1,
} from '../../assets/DummyData/FlightDetailsData';

const FlightDetailsScreen = ({navigation}) => {
  const [value, setValue] = useState();
  const [press, setPress] = useState(false);
  const [savedFlight, setSavedFlight] = useState([]);
  const searchFlightData = useSelector(e => e?.place?.searchFlightData);
  const item = useSelector(state => state.searchFlight.searchFlightCardData);
  const searchFlightDateData = useSelector(e => e?.date?.depatureDate).split(
    ',',
  );
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setPress(false);
    }, 2000);
  }, [press]);
  const getData = async () => {
    const uid = auth().currentUser.uid;
    await firestore()
      .collection('SavedFlights')
      .doc(uid)
      .get()
      .then(res => {
        setSavedFlight(res._data.savedFlights.map(x => x.airlineName));
      });
  };
  const saveFlightDetails = async () => {
    const uid = auth().currentUser.uid;
    await firestore()
      .collection('SavedFlights')
      .doc(uid)
      .set({
        savedFlights: firestore.FieldValue.arrayUnion({
          airlineName: item?.airlineName,
          logo: item?.logo,
          date: `${searchFlightDateData[0].slice(0, 3)},${
            searchFlightDateData[1]
          }`,
          departurePlace: searchFlightData?.from,
          destinationPlace: searchFlightData?.to,
          departureTime: item.pickTime,
          landingTime: item.lendTime,
          totalHours: item.totalHours,
          departureShortForm: searchFlightData?.fromShortform,
          destinationShortForm: searchFlightData?.toShortform,
          stops: item.stop,
          flightPrice: item?.price,
        }),
      })
      .then(async () => {
        setValue('Saved');
        setPress(true);
        await firestore()
          .collection('SavedFlights')
          .doc(uid)
          .get()
          .then(res => {
            setSavedFlight(res._data.savedFlights.map(x => x.airlineName));
          });
      });
  };
  const unsaveFlightDetails = async () => {
    const uid = auth().currentUser.uid;
    await firestore()
      .collection('SavedFlights')
      .doc(uid)
      .set({
        savedFlights: firestore.FieldValue.arrayRemove({
          airlineName: item?.airlineName,
          logo: item?.logo,
          date: `${searchFlightDateData[0].slice(0, 3)},${
            searchFlightDateData[1]
          }`,
          departurePlace: searchFlightData?.from,
          destinationPlace: searchFlightData?.to,
          departureTime: item.pickTime,
          landingTime: item.lendTime,
          totalHours: item.totalHours,
          departureShortForm: searchFlightData?.fromShortform,
          destinationShortForm: searchFlightData?.toShortform,
          stops: item.stop,
          flightPrice: item?.price,
        }),
      })
      .then(async () => {
        setValue('Removed');
        setPress(true);
        await firestore()
          .collection('SavedFlights')
          .doc(uid)
          .get()
          .then(res => {
            setSavedFlight(res._data.savedFlights.map(x => x.airlineName));
          });
      });
  };
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
                resizeMode="contain"
                source={Images.backIcon}
                style={styles.backIconStyle}
              />
            </TouchableOpacity>
            <View style={styles.saveShareViewStyle}>
              <TouchableOpacity
                onPress={() => {
                  savedFlight.some(a => a === item?.airlineName) === true
                    ? unsaveFlightDetails()
                    : saveFlightDetails();
                }}>
                <Image
                  source={
                    savedFlight.some(a => a === item?.airlineName) === true
                      ? Images.filled_save
                      : Images.saved
                  }
                  resizeMode="contain"
                  style={styles.saveShareIconStyle}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  resizeMode="contain"
                  source={Images.shareIcon}
                  style={styles.saveShareIconStyle}
                />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
      <FlightDetailsCard item={item} />
      <View style={styles.cardBody}>
        <View
          style={[
            styles.flatlistViewStyle,
            {
              marginTop: hp(1),
            },
          ]}>
          <Image
            resizeMode="contain"
            source={Images.aeroPlane}
            style={styles.aeroPlaneImageStyle}
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
            bounces={false}
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
            horizontal={true}
            data={FlightDetailsData1}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <View style={styles.flatlist2InnerViewStyle}>
                  <Image
                    source={item.image}
                    resizeMode="contain"
                    style={styles.flatlistIconStyle}
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
              resizeMode="contain"
              source={Images.forward}
              style={styles.forwardStyle}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.thirdCardStyle}>
        <View>
          <Text style={styles.priceTextStyle}>
            Total Price : {searchFlightData.passenger.split(' ')[0]} person(s)
          </Text>
          <Text style={styles.cardPrice}>
            $
            {parseInt(item?.price.slice(1, 8).split(',').join(''), 10) *
              Number(searchFlightData.passenger.split(' ')[0])}
            .00
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('FillPassengerDetails')}
          style={styles.continueButtonStyle}>
          <Text style={styles.continueTextStyle}>Continue</Text>
        </TouchableOpacity>
      </View>
      <Modal
        backdropOpacity={0}
        isVisible={press}
        animationIn={'bounceIn'}
        animationOut={'bounceOutUp'}
        style={styles.modalStyle}>
        <View style={styles.modalViewViewStyle}>
          <View style={styles.imageViewStyle}>
            <Image
              resizeMode="contain"
              source={Images.tickMark}
              style={styles.imageStyle}
            />
          </View>
          <Text style={styles.modalTextStyle}>{value}!</Text>
        </View>
      </Modal>
    </View>
  );
};

export default FlightDetailsScreen;

const styles = StyleSheet.create({
  headerViewStyle: {
    backgroundColor: color.commonBlue,
  },
  backIconStyle: {
    width: hp(3),
    height: hp(3),
    tintColor: color.white,
  },
  headerTextStyle: {
    fontWeight: 'bold',
    color: color.white,
    fontSize: fontSize(22),
  },
  saveShareIconStyle: {
    width: hp(2.5),
    height: hp(2.5),
    tintColor: color.white,
  },
  safeHeaderViewStyle: {
    flexDirection: 'row',
    paddingHorizontal: wp(7),
    justifyContent: 'space-between',
    paddingVertical: Platform.OS == 'ios' ? hp(2) : hp(3),
  },
  headerTextViewStyle: {
    width: wp(100),
    alignSelf: 'center',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveShareViewStyle: {
    width: wp(17),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardBody: {
    width: '92%',
    borderRadius: 10,
    borderColor: '#000',
    alignSelf: 'center',
    marginBottom: hp(2),
    paddingHorizontal: wp(4),
    backgroundColor: color.white,
  },
  cardPrice: {
    fontWeight: '600',
    fontSize: fontSize(20),
    color: color.commonBlue,
    marginVertical: hp(1.2),
  },
  cardPriceTitle: {
    color: '#7e7e7f',
    fontSize: fontSize(16),
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
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: hp(2.5),
    justifyContent: 'space-between',
  },
  flatlistIconStyle: {
    width: hp(2.5),
    height: hp(2.5),
    tintColor: '#383838',
  },
  forwardStyle: {
    width: hp(1.8),
    height: hp(1.8),
    tintColor: color.commonBlue,
  },
  flatlistViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#e2e2e2',
    paddingVertical: hp(1.6),
  },
  aeroPlaneImageStyle: {
    width: hp(6),
    height: hp(6),
  },
  secondCardHeaderStyle: {
    marginHorizontal: wp(5),
  },
  secondCardheaderTextStyle: {
    fontWeight: 'bold',
    fontSize: fontSize(18),
  },
  thirdCardStyle: {
    borderColor: '#000',
    flexDirection: 'row',
    paddingHorizontal: wp(4),
    backgroundColor: color.white,
    justifyContent: 'space-between',
    paddingVertical: Platform.OS == 'ios' ? hp(4) : hp(2),
  },
  flatlistTextStyle: {
    color: '#383838',
    fontSize: fontSize(18),
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
    width: '50%',
    height: hp(6.5),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.commonBlue,
  },
  continueTextStyle: {
    fontWeight: '600',
    color: color.white,
    fontSize: fontSize(18),
  },
  modalStyle: {
    alignSelf: 'center',
    justifyContent: 'flex-start',
    top: Platform.OS == 'ios' ? hp(4) : hp(0),
  },
  modalViewViewStyle: {
    width: '40%',
    elevation: 30,
    shadowRadius: 6,
    borderRadius: 100,
    shadowOpacity: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: wp(2.6),
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(1.3),
    backgroundColor: color.white,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  imageViewStyle: {
    padding: hp(0.9),
    borderRadius: 100,
    marginHorizontal: wp(2.3),
    backgroundColor: color.commonBlue,
  },
  imageStyle: {
    width: hp(2.5),
    height: hp(2.5),
    tintColor: color.white,
  },
  modalTextStyle: {
    fontWeight: '600',
    color: color.black,
    fontSize: fontSize(22),
    marginHorizontal: wp(1),
  },
});
