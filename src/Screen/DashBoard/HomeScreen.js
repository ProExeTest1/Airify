import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import React, {useState} from 'react';
import {Images} from '../../helpers/IconConstant';

import {
  ClassPickerModal,
  CustomPaperTextInput,
  PassengerPickerModal,
} from '../../components/index';
import {fontSize, hp, wp} from '../../helpers/helper';
import {color} from '../../helpers/ColorConstant';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {dummyData} from '../../assets/DummyData/Data';
import {useSelector} from 'react-redux';
import {string} from '../../helpers/String';
import {useDispatch} from 'react-redux';
import {SearchFlightAction} from '../../redux/action/PlaceAction';

const HomeScreen = ({navigation}) => {
  const theme = useColorScheme();

  console.log(theme);
  const dispatch = useDispatch();
  const reduxDepatureDate = useSelector(state => state.date.depatureDate);
  const reduxReturnDate = useSelector(state => state.date.returnDate);
  const reduxDepaturePlace = useSelector(state => state.place.depaturePlace);
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
  const [passengerClass, setPassengerClass] = useState();
  const [returnDate, setReturnDate] = useState();
  const [press, setPress] = useState(false);
  const [change, setChnage] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isClassModalVisible, setClassModalVisible] = useState(false);
  const [adult, setAdult] = useState(1);
  const [child, setChild] = useState(0);
  const [twoYearBelowChild, setTwoYearBelowChild] = useState(0);
  const seatcount = () => {
    setSeat(adult + child + twoYearBelowChild + ' ' + 'seat');
    setAdult(1);
    setChild(null);
    setTwoYearBelowChild(null);
  };
  const dynamicStyle = {
    marginTop: press ? hp(53) : hp(43),
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
  const SearchFlightsBut = () => {
    if (depatureData && destinationData && seat && passengerClass) {
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
    }
  };
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={styles.ScrollViewStyle}>
        <View style={styles.headerViewStyle}>
          <SafeAreaView>
            <View style={styles.headerStyle}>
              <View style={styles.profilepicViewStyle}>
                <Image
                  source={Images.demoPic}
                  style={styles.profilePicStyle}
                  resizeMode="stretch"
                />
                <View style={styles.headertextStyle}>
                  <Text style={styles.GMStyle}>
                    {hours < 12
                      ? string.Morning
                      : hours < 17
                      ? string.Afternoon
                      : hours < 20
                      ? string.evening
                      : string.Night}
                  </Text>
                  <Text style={styles.userNameStyle}>Andrew Ainsley</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.bellTouchStyle}>
                <Image
                  source={Images.bell}
                  style={styles.bellStyle}
                  resizeMode="stretch"
                />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
        <View style={styles.seatBookingMainViewStyle}>
          <View style={styles.optionStyle}>
            <TouchableOpacity
              style={[
                styles.optionTouchStyle,
                {backgroundColor: !press ? color.commonBlue : color.white},
              ]}
              onPress={() => setPress(false)}>
              <Text
                style={[
                  styles.optionTextStyle,
                  {color: !press ? color.white : 'black'},
                ]}>
                {string.one_way}
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
                {string.roundTrip}
              </Text>
            </TouchableOpacity>
          </View>
          <CustomPaperTextInput
            width={'90%'}
            marginVertical={10}
            placeholder={'From'}
            label={'From'}
            onPress={() =>
              navigation.navigate('PlacePicker', {data: 'Select Origin'})
            }
            icon={Images.takeOff}
            value={
              change
                ? reduxDestinationPlace
                  ? destinationData
                  : destination
                : depatureData !== 'undefined(undefined)'
                ? depatureData
                : origin
            }
            onChangeText={txt =>
              change ? setDestination(txt) : setOrigin(txt)
            }
          />
          <CustomPaperTextInput
            width={'90%'}
            placeholder={'Destination'}
            label={'To'}
            marginVertical={10}
            onPress={() =>
              navigation.navigate('PlacePicker', {data: 'Select Destination'})
            }
            icon={Images.landing}
            value={
              change
                ? reduxDepaturePlace
                  ? depatureData
                  : origin
                : destinationData !== 'undefined(undefined)'
                ? destinationData
                : destination
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
          <CustomPaperTextInput
            width={'90%'}
            placeholder={'Depature Date'}
            marginVertical={10}
            label={'Depature Date'}
            disabled={true}
            icon={Images.calendar}
            value={reduxDepatureDate ? reduxDepatureDate : depatureDate}
            onPress={() => navigation.navigate('DatePicker')}
            onChangeText={txt => setDepatureDate(txt)}
          />
          {press ? (
            <CustomPaperTextInput
              width={'90%'}
              placeholder={'Return Date'}
              marginVertical={10}
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
              width="50%"
              placeholder={'Seat'}
              label={'Passenger'}
              icon={Images.passenger}
              onPress={toggleModal}
              value={seat}
            />
            <CustomPaperTextInput
              width={'44%'}
              placeholder={'Class'}
              label={'Class'}
              icon={Images.seat}
              onPress={toggleClassModal}
              value={passengerClass}
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
              {string.specialoffer}
            </Text>
            <TouchableOpacity style={styles.profilepicViewStyle}>
              <Text style={{color: color.commonBlue, marginHorizontal: 10}}>
                {string.ViewAll}
              </Text>
              <Image
                source={Images.forward}
                style={styles.forwardStyle}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View>
            <SwiperFlatList
              autoplay
              autoplayDelay={3}
              autoplayLoop
              data={dummyData}
              renderItem={({item}) => {
                return (
                  <View style={styles.child}>
                    <Image
                      source={item.image}
                      style={styles.offerimageStyle}
                      resizeMode="stretch"
                    />
                  </View>
                );
              }}
            />
          </View>
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
    </>
  );
};

export default HomeScreen;

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  child: {
    width,
    justifyContent: 'center',
  },
  text: {
    fontSize: width * 0.5,
    textAlign: 'center',
  },
  ScrollViewStyle: {
    flex: 1,
  },
  headerViewStyle: {
    backgroundColor: color.commonBlue,
    height: hp(35),
  },
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(6.66),
    justifyContent: 'space-between',
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
  headertextStyle: {marginHorizontal: 10},
  GMStyle: {color: color.white, marginVertical: 5},
  userNameStyle: {
    fontWeight: 'bold',
    color: color.white,
    fontSize: fontSize(20, 812),
    marginVertical: 5,
  },
  bellTouchStyle: {
    borderWidth: 1,
    borderRadius: 100,
    borderColor: color.white,
    padding: hp(1.2),
  },
  bellStyle: {height: hp(3.07), width: hp(3.07), tintColor: color.white},
  seatBookingMainViewStyle: {
    width: wp(93),
    paddingVertical: hp(2.4),
    backgroundColor: color.white,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 16,
    position: 'absolute',
    top: hp(15),
    zIndex: 1,
  },
  optionStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp(83),
  },
  optionTouchStyle: {
    borderRadius: 30,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp(1.6),
    width: wp(40),
  },
  optionTextStyle: {
    fontWeight: '700',
  },
  customInputStyle: {
    flexDirection: 'row',
    marginVertical: hp(1.2),
    justifyContent: 'space-between',
    width: '90%',
  },
  searchButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(84),
    height: hp(7),
    borderRadius: 16,
    backgroundColor: 'blue',
    marginVertical: hp(1.2),
  },
  searchFontStyle: {
    fontSize: fontSize(20, 812),
    color: 'white',
    fontWeight: 'bold',
  },
  offerStyle: {
    marginTop: hp(50),
    width: wp(90),
    alignSelf: 'center',
    position: 'relative',
  },
  specialOfferViewStyle: {
    width: wp(90),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp(1.2),
  },
  specialOfferTextStyle: {
    fontSize: fontSize(20, 812),
    fontWeight: 'bold',
  },
  forwardStyle: {height: hp(1.8), width: hp(1.8), tintColor: color.commonBlue},
  offerimageStyle: {height: hp(25), width: wp(90), borderRadius: 16},
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
    top: hp(15),
    right: wp(10),
  },
});
