import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Images} from '../../helper/IconConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import {color} from '../../helper/ColorConstant';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Modal from 'react-native-modal';
import {
  FlightDetailsCard,
  FlightServices,
  ReturnDepartureSwitch,
} from '../../components';
import {strings} from '../../helper/Strings';
import {ShareConstant} from '../../helper/ShareConstant';
import {SearchFlightData} from '../../assets/DummyData/SearchFlightData';

const FlightDetailsScreen = ({navigation, route}) => {
  const tripType = route?.params?.TripType;
  const navigationType = route?.params?.navigation;
  //ReshceduleFilldetails
  const [savedFlight, setSavedFlight] = useState([]);
  const [press, setPress] = useState(false);
  const [value, setValue] = useState();
  const [ticketType, setTicketType] = useState('Departure');
  const strings = useSelector(state => state?.languageReducer?.languageObject);

  const item = useSelector(state =>
    ticketType === 'Departure'
      ? navigationType === 'ReshceduleFilldetails'
        ? state.rescheduleFlightdata.rescheduleSelectNewCard
        : state.searchFlight.searchFlightCardData
      : state.searchFlight.searchFlightReturnCardData,
  );

  const searchFlightData = useSelector(e =>
    ticketType === 'Departure'
      ? navigationType === 'ReshceduleFilldetails'
        ? e?.rescheduleFlightdata?.rescheduleCardData.searchFlightData
        : e?.place?.searchFlightData
      : e?.searchFlight?.searchFlightReturnData,
  );
  const searchFlightDateData = useSelector(e =>
    ticketType === 'Departure'
      ? navigationType === 'ReshceduleFilldetails'
        ? e?.rescheduleFlightdata?.rescheduleDateData
        : e?.date?.depatureDate
      : e?.date?.returnDate,
  ).split(',');
  const SelectDate = useSelector(e =>
    ticketType === 'Departure'
      ? e?.date?.normalDate
      : e?.date?.returnNormalDate,
  );

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setPress(false);
    }, 3000);
  }, [press]);
  const getData = async () => {
    const uid = auth()?.currentUser?.uid;
    await firestore()
      .collection('SavedFlights')
      .doc(uid)
      .get()
      .then(res => {
        setSavedFlight(res?._data?.savedFlights);
      });
  };
  const saveFlightDetails = async () => {
    const uid = auth()?.currentUser?.uid;
    await firestore()
      .collection('SavedFlights')
      .doc(uid)
      .update({
        savedFlights: firestore.FieldValue.arrayUnion({
          airlineName: item?.airlineName,
          logo: item?.logo,
          date: `${searchFlightDateData[0].slice(0, 3)},${
            searchFlightDateData[1]
          }`,
          departurePlace: searchFlightData?.from,
          destinationPlace: searchFlightData?.to,
          departureTime: item?.pickTime,
          landingTime: item?.lendTime,
          totalHours: item?.totalHours,
          departureShortForm: searchFlightData?.fromShortform,
          destinationShortForm: searchFlightData?.toShortform,
          stops: item.stop,
          flightPrice: item?.price,
          ticketType: ticketType,
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
            setSavedFlight(res?._data?.savedFlights);
          });
      });
  };
  const unsaveFlightDetails = async () => {
    const uid = auth()?.currentUser?.uid;
    await firestore()
      .collection('SavedFlights')
      .doc(uid)
      .update({
        SavedFlights: firestore.FieldValue.arrayRemove({
          airlineName: item?.airlineName,
          logo: item?.logo,
          date: `${searchFlightDateData[0].slice(0, 3)},${
            searchFlightDateData[1]
          }`,
          departurePlace: searchFlightData?.from,
          destinationPlace: searchFlightData?.to,
          departureTime: item?.pickTime,
          landingTime: item?.lendTime,
          totalHours: item?.totalHours,
          departureShortForm: searchFlightData?.fromShortform,
          destinationShortForm: searchFlightData?.toShortform,
          stops: item?.stop,
          flightPrice: item?.price,
          ticketType: ticketType,
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
            setSavedFlight(res?._data?.savedFlights);
          });
      });
  };
  return (
    <View style={{flex: 1}}>
      <View style={styles.headerViewStyle}>
        <SafeAreaView>
          <View style={styles.safeHeaderViewStyle}>
            <View style={styles.headerTextViewStyle}>
              <Text style={styles.headerTextStyle}>
                {strings.Flight_Details}
              </Text>
            </View>
            <TouchableOpacity onPress={() => navigation?.goBack()}>
              <Image
                source={Images.backIcon}
                style={styles.backIconStyle}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View style={styles.saveShareViewStyle}>
              <TouchableOpacity
                onPress={() => {
                  savedFlight?.some(
                    a =>
                      a?.airlineName == item?.airlineName &&
                      a?.landingTime == item?.lendTime &&
                      a?.departurePlace == searchFlightData?.from &&
                      a?.destinationPlace == searchFlightData?.to &&
                      a?.departureTime == item?.pickTime &&
                      a?.flightPrice == item?.price &&
                      a?.stops == item?.stop &&
                      a?.totalHours == item?.totalHours,
                  ) === true
                    ? unsaveFlightDetails()
                    : saveFlightDetails();
                }}>
                <Image
                  source={
                    savedFlight?.some(
                      a =>
                        a?.airlineName == item?.airlineName &&
                        a?.landingTime == item?.lendTime &&
                        a?.departurePlace == searchFlightData?.from &&
                        a?.destinationPlace == searchFlightData?.to &&
                        a?.departureTime == item?.pickTime &&
                        a?.flightPrice == item?.price &&
                        a?.stops == item?.stop &&
                        a?.totalHours == item?.totalHours,
                    ) === true
                      ? Images?.filled_save
                      : Images?.saved
                  }
                  style={styles.saveShareIconStyle}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  ShareConstant(SearchFlightData?.airlineName);
                }}>
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
      {tripType === 'Round-Trip' ? (
        <ReturnDepartureSwitch
          onPress1={() => setTicketType('Departure')}
          onPress2={() => setTicketType('Return')}
          ticketType={ticketType}
        />
      ) : null}
      <ScrollView
        bounces={false}
        style={styles.ScrollViewStyle}
        showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: wp(4), marginTop: hp(2), flex: 1}}>
          <FlightDetailsCard
            searchFlightData={searchFlightData}
            searchFlightDateData={searchFlightDateData}
            item={item}
          />
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
              source={Images?.aeroPlane}
              style={styles.aeroPlaneImageStyle}
              resizeMode="contain"
            />
            <View style={styles.secondCardHeaderStyle}>
              <Text style={styles.secondCardheaderTextStyle}>
                {strings.Original}
              </Text>
              <Text style={styles.cardPrice}>
                {item?.price}
                <Text style={styles.cardPriceTitle}>{strings.pax}</Text>
              </Text>
            </View>
          </View>
          <FlightServices
            DetailsNavigation={() =>
              navigation?.navigate('FlightPackageDetails', {header: 'Details'})
            }
          />
        </View>
      </ScrollView>
      <View style={styles.thirdCardStyle}>
        <View>
          <Text style={styles.priceTextStyle}>
            {strings.total_price} : {searchFlightData?.passenger?.split(' ')[0]}{' '}
            person(s)
          </Text>
          <Text style={styles.cardPrice}>
            $
            {parseInt(item?.price?.slice(1, 8).split(',').join(''), 10) *
              Number(searchFlightData?.passenger?.split(' ')[0])}
            .00
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (tripType === 'Round-Trip' && ticketType === 'Departure') {
              setTicketType('Return');
            } else {
              navigationType == 'ReshceduleFilldetails'
                ? navigation.navigate('RescheduleFillPassengerDetails')
                : navigation.navigate('FillPassengerDetails', {
                    TripType: tripType,
                  });
            }
          }}
          style={styles.continueButtonStyle}>
          <Text style={styles.continueTextStyle}>
            {tripType === 'Round-Trip' && ticketType === 'Departure'
              ? 'Confirm'
              : strings.continue}
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        backdropOpacity={0}
        animationOut={'bounceOutUp'}
        animationIn={'bounceIn'}
        isVisible={press}
        style={styles.modalStyle}>
        <View style={styles.modalViewViewStyle}>
          <View style={styles.imageViewStyle}>
            <Image
              source={Images?.tickMark}
              style={styles.imageStyle}
              resizeMode="contain"
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
  ScrollViewStyle: {marginTop: hp(1)},
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
    marginHorizontal: wp(4),
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
    paddingVertical: hp(2),
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
  modalStyle: {
    justifyContent: 'flex-start',
    alignSelf: 'center',
    top: Platform.OS == 'ios' ? hp(4) : hp(0),
  },
  modalViewViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '40%',
    backgroundColor: color.white,
    borderRadius: 100,
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(1.3),
    paddingRight: wp(2.6),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 30,
  },
  imageViewStyle: {
    backgroundColor: color.commonBlue,
    padding: hp(0.9),
    borderRadius: 100,
    marginHorizontal: wp(2.3),
  },
  imageStyle: {
    height: hp(2.5),
    width: hp(2.5),
    tintColor: color.white,
  },
  modalTextStyle: {
    fontSize: fontSize(22),
    fontWeight: 'bold',
    color: color.black,
    marginHorizontal: wp(1),
  },
});
