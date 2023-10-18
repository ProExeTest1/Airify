import {
  Button,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
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
import {
  FlightDetailsData,
  FlightDetailsData1,
} from '../../assets/DummyData/FlightDetailsData';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Modal from 'react-native-modal';
import {FlightDetailsCard} from '../../components';

const FlightDetailsScreen = ({navigation}) => {
  const [savedFlight, setSavedFlight] = useState([]);
  const [press, setPress] = useState(false);
  const [value, setValue] = useState();
  const item = useSelector(state => state.searchFlight.searchFlightCardData);
  // console.log(typeof Number(item?.price));
  const searchFlightData = useSelector(e => e?.place?.searchFlightData);
  // console.log(Number(searchFlightData.passenger.split(' ')[0]));
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
      .update({
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
      .update({
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
    <View style={{flex: 1}}>
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

      <View style={{paddingHorizontal: wp(4), marginTop: hp(2), flex: 1}}>
        <FlightDetailsCard item={item} />
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
          <Text style={styles.priceTextStyle}>
            Total Price : {searchFlightData?.passenger?.split(' ')[0]} person(s)
          </Text>
          <Text style={styles.cardPrice}>
            $
            {parseInt(item?.price?.slice(1, 8).split(',').join(''), 10) *
              Number(searchFlightData?.passenger?.split(' ')[0])}
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
        animationOut={'bounceOutUp'}
        animationIn={'bounceIn'}
        isVisible={press}
        style={styles.modalStyle}>
        <View style={styles.modalViewViewStyle}>
          <View style={styles.imageViewStyle}>
            <Image
              source={Images.tickMark}
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
