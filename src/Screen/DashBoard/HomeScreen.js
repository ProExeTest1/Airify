import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Images} from '../../helper/IconConstant';

import {
  ClassPickerModal,
  CustomPaperTextInput,
  Loader,
  PassengerPickerModal,
  SwiperFlatlistComponent,
} from '../../components/index';

import {fontSize, hp, wp} from '../../helper/Constant';
import {color} from '../../helper/ColorConstant';
import {useSelector, useDispatch} from 'react-redux';
import {strings} from '../../helper/Strings';
import {SearchFlightAction} from '../../redux/action/PlaceAction';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {AlertConstant} from '../../helper/AlertConstant';
import {UserDataAction} from '../../redux/action/UserDataAction';
import {SearchFlightReturnAction} from '../../redux/action/SearchFlightAction';

const HomeScreen = ({navigation}) => {
  const theme = useColorScheme();
  useEffect(() => {
    UserData();
  }, []);
  const dispatch = useDispatch();
  const reduxDepatureDate = useSelector(state => state?.date?.depatureDate);

  const reduxReturnDate = useSelector(state => state.date.returnDate);

  const reduxDepaturePlace = useSelector(state => state.place.depaturePlace);
  //Maintaining textInput value with redux data
  let depatureData = reduxDepaturePlace
    ? reduxDepaturePlace.city + '(' + reduxDepaturePlace.airport + ')'
    : null;
  const reduxDestinationPlace = useSelector(
    state => state.place.destinationPlace,
  );
  let destinationData = reduxDestinationPlace
    ? reduxDestinationPlace.city + '(' + reduxDestinationPlace.airport + ')'
    : null;
  const ndate = new Date();
  const hours = ndate.getHours();
  const [seat, setSeat] = useState();
  const [passengerClass, setPassengerClass] = useState('');
  const [press, setPress] = useState('One-way');
  const [loader, setLoader] = useState(true);
  const [change, setChnage] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isClassModalVisible, setClassModalVisible] = useState(false);
  const [adult, setAdult] = useState(1);
  const [child, setChild] = useState(0);
  const [twoYearBelowChild, setTwoYearBelowChild] = useState(0);
  const [userData, setUserData] = useState({});
  const seatcount = () => {
    setSeat(adult + child + twoYearBelowChild + ' ' + 'seat');
    setAdult(1);
    setChild(null);
    setTwoYearBelowChild(null);
  };

  const toggleChange = () => {
    setChnage(!change);
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleClassModal = () => {
    setClassModalVisible(!isClassModalVisible);
  };
  // It will naviagte to searchFlight screen and store all inputs in redux
  const SearchFlightsBut = () => {
    if (
      depatureData &&
      destinationData &&
      seat &&
      passengerClass &&
      reduxDepatureDate
    ) {
      if (depatureData !== destinationData) {
        if (reduxReturnDate && press === 'Round-trip') {
          if (reduxReturnDate !== reduxDepatureDate) {
            dispatch(
              SearchFlightReturnAction({
                from: reduxDestinationPlace.city,
                fromShortform: reduxDestinationPlace.airport,
                to: reduxDepaturePlace.city,
                toShortform: reduxDepaturePlace.airport,
                passenger: seat,
                class: passengerClass,
              }),
            );
            dispatch(
              SearchFlightAction({
                from: reduxDepaturePlace.city,
                fromShortform: reduxDepaturePlace.airport,
                to: reduxDestinationPlace.city,
                toShortform: reduxDestinationPlace.airport,
                passenger: seat,
                class: passengerClass,
              }),
            );
            navigation.navigate('SearchFlights', {TripType: 'Round-Trip'});
          } else {
            AlertConstant(
              'Return date and departure date does not be same please change it!',
            );
          }
        } else {
          dispatch(
            SearchFlightAction({
              from: reduxDepaturePlace.city,
              fromShortform: reduxDepaturePlace.airport,
              to: reduxDestinationPlace.city,
              toShortform: reduxDestinationPlace.airport,
              passenger: seat,
              class: passengerClass,
            }),
          );
          navigation.navigate('SearchFlights', {TripType: 'One-Way'});
        }
      } else {
        AlertConstant('Destination Place and Departure Place does not be same');
      }
    } else {
      AlertConstant('Please Fill All Details');
    }
  };

  const UserData = async () => {
    // const journeyData = await firestore()
    //   .collection('Users')
    //   .doc(auth().currentUser.uid)
    //   .get();

    const subscriber = firestore()
      .collection('Users')
      .onSnapshot(querySnapshot => {
        querySnapshot?.forEach(documentSnapshot => {
          if (documentSnapshot.id == auth().currentUser.uid) {
            dispatch(UserDataAction(documentSnapshot.data()));
            setUserData(documentSnapshot.data());
            setLoader(false);
          }
        });
      });
  };
  const TripOption = ({tripType}) => {
    return (
      <TouchableOpacity
        style={[
          styles.optionTouchStyle,
          tripType == 'One-way' ? {marginEnd: wp(3.5)} : {marginStart: wp(3.5)},
          {
            backgroundColor:
              press === tripType ? color.commonBlue : color.white,
          },
        ]}
        onPress={() => setPress(tripType)}>
        <Text
          style={[
            styles.optionTextStyle,
            {color: press === tripType ? color.white : 'black'},
          ]}>
          {tripType}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerViewStyle}></View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={styles.ScrollViewStyle}>
        <SafeAreaView style={styles.headerStyle}>
          <View style={styles.profilepicViewStyle}>
            {loader ? (
              <Loader color={'blue'} />
            ) : (
              <Image
                source={{uri: userData?.profileImageURL}}
                style={styles.profilePicStyle}
                resizeMode="stretch"
                loadingIndicatorSource={Images.Email}
              />
            )}
            <View style={styles.headertextStyle}>
              <Text style={styles.GMStyle}>
                {hours < 12
                  ? strings.Morning
                  : hours < 17
                  ? strings.Afternoon
                  : hours < 20
                  ? strings.evening
                  : strings.Night}
              </Text>
              <Text style={styles.userNameStyle}>{userData.Name}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.bellTouchStyle}
            onPress={() => navigation.navigate('NotificationScreen')}>
            <Image
              source={Images.bell}
              style={styles.bellStyle}
              resizeMode="stretch"
            />
          </TouchableOpacity>
        </SafeAreaView>
        <View style={styles.seatBookingMainViewStyle}>
          <View style={styles.optionStyle}>
            <TripOption tripType={'One-way'} />
            <TripOption tripType={'Round-trip'} />
          </View>
          <View>
            <CustomPaperTextInput
              marginVertical={hp(1)}
              label={'From'}
              marginHorizontal={wp(4)}
              onPress={() =>
                navigation.navigate('PlacePicker', {data: 'Select Origin'})
              }
              icon={Images.takeOff}
              value={
                !change
                  ? reduxDepaturePlace &&
                    depatureData !== 'undefined(undefined)'
                    ? depatureData
                    : null
                  : destinationData !== 'undefined(undefined)'
                  ? destinationData
                  : null
              }
            />
            <CustomPaperTextInput
              label={'To'}
              marginVertical={hp(1)}
              marginHorizontal={wp(4)}
              onPress={() =>
                navigation.navigate('PlacePicker', {data: 'Select Destination'})
              }
              icon={Images.landing}
              value={
                change
                  ? reduxDepaturePlace &&
                    depatureData !== 'undefined(undefined)'
                    ? depatureData
                    : null
                  : destinationData !== 'undefined(undefined)'
                  ? destinationData
                  : null
              }
            />
            <TouchableOpacity
              onPress={() => toggleChange()}
              style={styles.updownTouchStyle}>
              <Image
                source={Images.up_down}
                style={styles.updownStyle}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <CustomPaperTextInput
            placeholder={'Depature Date'}
            marginVertical={hp(1)}
            marginHorizontal={wp(4)}
            label={'Depature Date'}
            disabled={true}
            icon={Images.calendar}
            value={reduxDepatureDate ? reduxDepatureDate : null}
            onPress={() => navigation.navigate('DatePicker')}
          />
          {press === 'Round-trip' ? (
            <CustomPaperTextInput
              placeholder={'Return Date'}
              marginVertical={hp(1)}
              marginHorizontal={wp(4)}
              label={'Return Date'}
              icon={Images.calendar}
              onPress={() =>
                navigation.navigate('DatePicker', {return: 'returnDate'})
              }
              value={reduxReturnDate ? reduxReturnDate : null}
            />
          ) : null}
          <View style={styles.customInputStyle}>
            <CustomPaperTextInput
              placeholder={'Seat'}
              label={'Passenger'}
              width={'45%'}
              icon={Images.passenger}
              onPress={toggleModal}
              value={seat}
            />
            <CustomPaperTextInput
              placeholder={'Class'}
              label={'Class'}
              width={'50%'}
              icon={Images.seat}
              onPress={toggleClassModal}
              value={passengerClass ? passengerClass.split(' ')[0] : null}
            />
          </View>
          <TouchableOpacity
            onPress={() => SearchFlightsBut()}
            style={styles.searchButtonStyle}>
            <Text style={styles.searchFontStyle}>Search Flights</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.offerStyle}>
          <View style={styles.specialOfferViewStyle}>
            <Text style={styles.specialOfferTextStyle}>
              {strings.specialoffer}
            </Text>
            <TouchableOpacity
              style={styles.profilepicViewStyle}
              onPress={() =>
                navigation.navigate('SpecialOffer', {header: 'Special Offer'})
              }>
              <Text
                style={{color: color.commonBlue, marginHorizontal: wp(2.6)}}>
                {strings.ViewAll}
              </Text>
              <Image
                source={Images.forward}
                style={styles.forwardStyle}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <SwiperFlatlistComponent />
        </View>
      </ScrollView>
      <PassengerPickerModal
        toggleModal={() => {
          toggleModal();
          seatcount();
        }}
        isModalVisible={isModalVisible}
        setAdult={setAdult}
        setChild={setChild}
        setTwoYearBelowChild={setTwoYearBelowChild}
        onCancel={() => {
          toggleModal();
          setSeat(null);
        }}
      />
      <ClassPickerModal
        isModalVisible={isClassModalVisible}
        toggleModal={toggleClassModal}
        setClass={setPassengerClass}
        onCancel={() => {
          toggleClassModal();
          setPassengerClass(null);
        }}
      />
    </View>
  );
};

export default HomeScreen;

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: width * 0.6,
    textAlign: 'center',
  },
  ScrollViewStyle: {
    flex: 1,
    // backgroundColor: color.black,
  },
  headerViewStyle: {
    backgroundColor: color.commonBlue,
    height: hp(35),
    width: wp(100),
    position: 'absolute',
  },
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(6.66),
    justifyContent: 'space-between',
    marginTop: Platform.OS === 'android' ? hp(3) : null,
    marginBottom: hp(3),
  },
  profilepicViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePicStyle: {
    height: hp(7.38),
    width: hp(7.38),
    borderRadius: 100,
  },
  headertextStyle: {
    marginHorizontal: wp(2.6),
  },
  GMStyle: {
    color: color.white,
    marginVertical: hp(0.6),
  },
  userNameStyle: {
    fontWeight: 'bold',
    color: color.white,
    fontSize: fontSize(20, 812),
    marginVertical: hp(0.6),
  },
  bellTouchStyle: {
    borderWidth: 1,
    borderRadius: 100,
    borderColor: color.white,
    padding: hp(1.2),
  },
  bellStyle: {
    height: hp(3.07),
    width: hp(3.07),
    tintColor: color.white,
  },
  seatBookingMainViewStyle: {
    paddingVertical: hp(2.4),
    backgroundColor: color.white,
    borderRadius: 16,
    marginHorizontal: wp(6),
  },
  optionStyle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: wp(4),
  },
  optionTouchStyle: {
    borderRadius: 30,
    borderWidth: 0.5,
    // backgroundColor:'black',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp(1.6),
    flex: 1,
  },
  optionTextStyle: {
    fontWeight: '700',
  },
  customInputStyle: {
    flexDirection: 'row',
    marginHorizontal: wp(4),
    marginVertical: hp(1.2),
    justifyContent: 'space-between',
  },
  searchButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(7),
    borderRadius: 16,
    backgroundColor: 'blue',
    marginVertical: hp(1.2),
    marginHorizontal: wp(4),
  },
  searchFontStyle: {
    fontSize: fontSize(20, 812),
    color: 'white',
    fontWeight: 'bold',
  },
  offerStyle: {
    flex: 1,
    marginTop: hp(2),
    marginHorizontal: wp(6),
  },
  specialOfferViewStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: hp(1.2),
  },
  specialOfferTextStyle: {
    fontSize: fontSize(20, 812),
    fontWeight: 'bold',
    color: color.black,
  },
  forwardStyle: {
    height: hp(1.8),
    width: hp(1.8),
    tintColor: color.commonBlue,
  },
  updownStyle: {
    height: hp(3.6),
    width: hp(3.6),
    tintColor: 'white',
  },
  updownTouchStyle: {
    backgroundColor: color.commonBlue,
    borderRadius: 100,
    padding: hp(1.6),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '35%',
    right: wp(10),
  },
});
