import {
  Alert,
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Images} from '../../helper/IconConstant';

import {
  ClassPickerModal,
  CustomPaperTextInput,
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
  let depatureData =
    reduxDepaturePlace.city + '(' + reduxDepaturePlace.airport + ')';
  const reduxDestinationPlace = useSelector(
    state => state.place.destinationPlace,
  );
  let destinationData =
    reduxDestinationPlace.city + '(' + reduxDestinationPlace.airport + ')';
  const ndate = new Date();
  const hours = ndate.getHours();

  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [depatureDate, setDepatureDate] = useState();
  const [seat, setSeat] = useState();
  const [passengerClass, setPassengerClass] = useState('');
  const [returnDate, setReturnDate] = useState();
  const [press, setPress] = useState(false);
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
  const dynamicStyle = {
    marginTop: hp(3),
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
    if (depatureData && destinationData && seat && passengerClass) {
      if (depatureData !== destinationData) {
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
        navigation.navigate('SearchFlights');
      } else {
        if (Platform.OS === 'android') {
          ToastAndroid.show(
            'Destination Place and Departure Place does not be same',
            ToastAndroid.SHORT,
          );
        } else if (Platform.OS === 'ios') {
          Alert.alert('Destination Place and Departure Place does not be same');
        }
      }
    } else {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Please Fill All Details', ToastAndroid.SHORT);
      } else if (Platform.OS === 'ios') {
        Alert.alert('Please Fill All Details');
      }
    }
  };

  const UserData = async () => {
    const journeyData = await firestore()
      .collection('Users')
      .doc(auth().currentUser.uid)
      .get();
    setUserData(journeyData.data());
  };
  return (
    <View style={{flex: 1}}>
      <View style={styles.headerViewStyle}></View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={styles.ScrollViewStyle}>
        <SafeAreaView style={styles.headerStyle}>
          <View style={styles.profilepicViewStyle}>
            <Image
              source={{uri: userData?.profileImageURL}}
              style={styles.profilePicStyle}
              resizeMode="stretch"
            />
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
            <TouchableOpacity
              style={[
                styles.optionTouchStyle,
                {
                  backgroundColor: !press ? color.commonBlue : color.white,
                  marginEnd: wp(4),
                },
              ]}
              onPress={() => setPress(false)}>
              <Text
                style={[
                  styles.optionTextStyle,
                  {color: !press ? color.white : 'black'},
                ]}>
                {strings.one_way}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionTouchStyle,
                {backgroundColor: press ? color.commonBlue : color.white},
              ]}
              onPress={() => setPress(true)}>
              <Text
                style={[
                  styles.optionTextStyle,
                  {color: press ? color.white : 'black'},
                ]}>
                {strings.roundTrip}
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <CustomPaperTextInput
              marginVertical={hp(1)}
              placeholder={'From'}
              label={'From'}
              onPress={() =>
                navigation.navigate('PlacePicker', {data: 'Select Origin'})
              }
              icon={Images.takeOff}
              value={
                change
                  ? reduxDestinationPlace &&
                    destinationData !== 'undefined(undefined)'
                    ? destinationData
                    : 'To'
                  : depatureData !== 'undefined(undefined)'
                  ? depatureData
                  : 'From'
                // change
                //   ? reduxDestinationPlace
                //     ? destinationData
                //     : destination
                //   : depatureData !== 'undefined(undefined)'
                //   ? depatureData
                //   : origin
              }
              onChangeText={txt =>
                change ? setDestination(txt) : setOrigin(txt)
              }
            />
            <CustomPaperTextInput
              placeholder={'Destination'}
              label={'To'}
              marginVertical={hp(1)}
              onPress={() =>
                navigation.navigate('PlacePicker', {data: 'Select Destination'})
              }
              icon={Images.landing}
              value={
                change
                  ? reduxDepaturePlace &&
                    depatureData !== 'undefined(undefined)'
                    ? depatureData
                    : 'From'
                  : destinationData !== 'undefined(undefined)'
                  ? destinationData
                  : 'To'
              }
              onChangeText={txt =>
                change ? setOrigin(txt) : setDestination(txt)
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
            label={'Depature Date'}
            disabled={true}
            icon={Images.calendar}
            value={reduxDepatureDate ? reduxDepatureDate : depatureDate}
            onPress={() => navigation.navigate('DatePicker')}
            onChangeText={txt => setDepatureDate(txt)}
          />
          {press ? (
            <CustomPaperTextInput
              placeholder={'Return Date'}
              marginVertical={hp(1)}
              label={'Return Date'}
              icon={Images.calendar}
              onPress={() =>
                navigation.navigate('DatePicker', {return: 'returnDate'})
              }
              value={reduxReturnDate ? reduxReturnDate : returnDate}
              onChangeText={txt => setReturnDate(txt)}
            />
          ) : null}
          <View style={styles.customInputStyle}>
            <CustomPaperTextInput
              placeholder={'Seat'}
              width={'42%'}
              label={'Passenger'}
              icon={Images.passenger}
              onPress={toggleModal}
              value={seat}
            />
            <CustomPaperTextInput
              placeholder={'Class'}
              width={'44%'}
              label={'Class'}
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
        <View style={StyleSheet.flatten([styles.offerStyle, dynamicStyle])}>
          <View style={styles.specialOfferViewStyle}>
            <Text style={styles.specialOfferTextStyle}>
              {strings.specialoffer}
            </Text>
            <TouchableOpacity
              style={styles.profilepicViewStyle}
              onPress={() =>
                navigation.navigate('SpecialOffer', {header: 'Special Offer'})
              }>
              <Text style={{color: color.commonBlue, marginHorizontal: 10}}>
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
  },
  profilepicViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  profilePicStyle: {
    height: hp(7.38),
    width: hp(7.38),
    borderRadius: 100,
  },
  headertextStyle: {marginHorizontal: wp(2.6)},
  GMStyle: {color: color.white, marginVertical: hp(0.6)},
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
    marginBottom: hp(2),
  },
  bellStyle: {height: hp(3.07), width: hp(3.07), tintColor: color.white},
  seatBookingMainViewStyle: {
    paddingVertical: hp(2.4),
    backgroundColor: color.white,
    borderRadius: 16,
    marginHorizontal: wp(6),
  },
  optionStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
  },
  optionTouchStyle: {
    borderRadius: 30,
    borderWidth: 0.5,
    // backgroundColor:'black',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp(1.6),
    //
    flex: 1,
  },
  optionTextStyle: {
    fontWeight: '700',
  },
  customInputStyle: {
    flexDirection: 'row',
    marginVertical: hp(1.2),
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
    width: wp(88),
    alignSelf: 'center',
    position: 'relative',
  },
  specialOfferViewStyle: {
    width: wp(88),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp(1.2),
  },
  specialOfferTextStyle: {
    fontSize: fontSize(20, 812),
    fontWeight: 'bold',
    color: color.black,
  },
  forwardStyle: {height: hp(1.8), width: hp(1.8), tintColor: color.commonBlue},
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
