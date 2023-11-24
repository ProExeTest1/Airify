import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  CardHeader,
  CommonHeader,
  DropDownMenu,
  DropDownPaperTextInput,
  FlightDetailsCard,
  FlightServices,
  PriceDetails,
  ReschedulePriceDetails,
  RescheduleSwitch,
  ReturnDepartureSwitch,
  TicktBookingProgressBar,
} from '../../components';
import {strings} from '../../helper/Strings';

import {fontSize, hp, wp} from '../../helper/Constant';
import {Images} from '../../helper/IconConstant';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {
  ReturnSelectSeatActionData,
  SelectSeatActionData,
} from '../../redux/action/SelectSeatAction';
import {AlertConstant} from '../../helper/AlertConstant';
import {RescheduleSelectSeatData} from '../../redux/action/RescheduleAction';

const RescheduleFillPassengerDetails = ({navigation, route}) => {
  const tripType = route?.params?.TripType;
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [passengerLength, setPassengerLength] = useState();
  const [ticketType, setTicketType] = useState('Old Trip');
  const [dropdown, setDropdownTop] = useState();
  const [passengerList, setPassengerList] = useState([]);
  const [flatlistIndex, setFlatlistIndex] = useState();
  const DropdownButton = useRef();
  const strings = useSelector(state => state?.languageReducer?.languageObject);

  const item = useSelector(state =>
    ticketType === 'Old Trip'
      ? state?.rescheduleFlightdata?.rescheduleCardData?.searchFlightCardData
      : state?.rescheduleFlightdata.rescheduleSelectNewCard,
  );
  const oldTripData = useSelector(
    e => e?.rescheduleFlightdata?.rescheduleCardData,
  );
  const newTripData = useSelector(
    e => e?.rescheduleFlightdata.rescheduleSelectNewCard,
  );
  const searchFlightData = useSelector(e =>
    ticketType === 'Old Trip'
      ? e?.rescheduleFlightdata?.rescheduleCardData.searchFlightData
      : e?.rescheduleFlightdata?.rescheduleCardData.searchFlightData,
  );

  const searchFlightDateData = useSelector(e =>
    ticketType === 'Old Trip'
      ? e?.rescheduleFlightdata?.rescheduleCardData?.searchFlightDateData.toString()
      : e?.rescheduleFlightdata?.rescheduleDateData,
  ).split(',');
  const userData = useSelector(state => state?.userData?.userdata);
  const SelectSeat = useSelector(e => e?.rescheduleFlightdata?.SelectSeatData);
  const totalSeat = Number(searchFlightData?.passenger?.split(' ')[0]);
  const ticketPrice = parseInt(
    item?.price?.slice(1, 8)?.split(',')?.join(''),
    10,
  );

  let newArr = Array?.from({length: totalSeat}, (_, index) => ({
    id: index + 1,
    name: '',
    seatNo: false,
  }));
  let returnNewArr = Array?.from({length: totalSeat}, (_, index) => ({
    id: index + 1,
    name: '',
    seatNo: false,
  }));
  const [flatlistData, setFlatlistData] = useState(newArr);
  const setFlatlistDataa = i => {
    dispatch(RescheduleSelectSeatData(i));
  };
  useEffect(() => {
    passengers();
  }, []);
  const onContinue = () => {
    if (ticketType === 'Old Trip') {
      setTicketType('New Trip');
    } else if (
      SelectSeat.length > 0 &&
      SelectSeat?.every(i => i?.seatNo != false)
    ) {
      navigation?.navigate('ReschedulePaymentConfirmation');
    } else {
      AlertConstant(strings?.add_passenger_first);
    }
  };
  const toggleDropDown = index => {
    visible ? setVisible(false) : openDropdown();
    setFlatlistIndex(index);
  };
  const openDropdown = () => {
    DropdownButton?.current?.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py + h);
    });
    setVisible(true);
  };
  const onItemPress = item => {
    const newData = flatlistData.map(x => {
      if (x.id === flatlistIndex) {
        return {...x, name: item};
      }
      return x;
    });
    setFlatlistData(newData);
    setFlatlistDataa(
      newData?.map(i => {
        return {name: i.name, seatNo: i.seatNo};
      }),
    );
    setVisible(false);
  };
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.dropDownRenderItemTouchStyle}
        onPress={() => {
          onItemPress(item?.FirstName + item?.LastName);
          toggleDropDown();
        }}>
        <Text style={styles.renderItemTextStyle}>
          {item?.FirstName} {item?.LastName}
        </Text>
      </TouchableOpacity>
    );
  };
  const passengers = async () => {
    await firestore()
      .collection('PassengerList')
      .onSnapshot(querySnapshot => {
        querySnapshot?.forEach(documentSnapshot => {
          if (documentSnapshot.id == auth().currentUser.uid) {
            setPassengerList(documentSnapshot.data()?.PassengerList);
            setPassengerLength(documentSnapshot.data()?.PassengerList?.length);
          }
        });
      });
  };
  const color = useSelector(state => state?.themereducer?.colorTheme);
  const styles = ThemeStyle(color);
  return (
    <View style={styles.headerViewStyle}>
      <CommonHeader
        headerName={strings.fillInDetails}
        navigation1={() => {
          navigation.goBack();
          dispatch(RescheduleSelectSeatData([]));
        }}
        navigation2={() => {}}
        Images1Color={'#fff'}
        Images2Color={null}
        onPress1={true}
        onPress2={false}
        Images1={Images.backIcon}
        Images2={null}
      />

      <TicktBookingProgressBar progress={1}></TicktBookingProgressBar>
      <RescheduleSwitch
        onPress1={() => setTicketType('Old Trip')}
        onPress2={() => setTicketType('New Trip')}
        ticketType={ticketType}
      />
      <ScrollView
        bounces={false}
        style={[
          styles.scrollViewStyle,
          {marginTop: tripType === 'Round-Trip' ? hp(1) : hp(0)},
        ]}>
        <View style={{paddingHorizontal: wp(4), marginTop: hp(2)}}>
          <FlightDetailsCard
            item={item}
            searchFlightData={searchFlightData}
            searchFlightDateData={searchFlightDateData}
          />
        </View>
        <View style={styles.cardBody}>
          <View style={styles.flatlistViewStyle}>
            <Image
              source={Images.flyPlaneIcon}
              style={styles.flyIconStyle}
              resizeMode="contain"
            />
            <Text style={styles.cardHeaderText}>{strings.FlightAmenities}</Text>
          </View>
          <FlightServices
            DetailsNavigation={() =>
              navigation?.navigate('FlightPackageDetails', {header: 'Details'})
            }
          />
        </View>
        <View style={styles.cardBody}>
          <CardHeader
            FirstImage={Images.account}
            header={strings.contact_details}
            imageStyle={styles.cardheaderIconStyle}
          />
          <View style={styles.contactDetailsViewStyle}>
            <Text style={styles.nameTextStyle}>{userData.Name}</Text>
            <View style={styles.emailViewStyle}>
              <Text numberOfLines={1} style={styles.emailStyle}>
                {userData.Email}
              </Text>
              <Text numberOfLines={1} style={styles.PhoneNumberStyle}>
                {userData.PhoneNumber}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.cardBody}>
          {ticketType === 'Old Trip' ? (
            <FlatList
              data={oldTripData?.SelectSeatData}
              renderItem={({item, index}) => {
                return (
                  <View>
                    <CardHeader
                      FirstImage={Images.account}
                      header={
                        oldTripData?.SelectSeatData?.length > 1
                          ? `${strings?.Passenger}(${index + 1})`
                          : `${strings?.Passenger}(s)`
                      }
                    />
                    <View style={styles.passengerViewStyle}>
                      <Text style={styles.seatNumberListTitleText}>
                        {item?.name}
                      </Text>
                      <Text style={styles.seatNumberListTitleText}>
                        {item?.seatNo}
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
          ) : (
            <FlatList
              data={flatlistData}
              renderItem={({item, index}) => {
                return (
                  <>
                    <CardHeader
                      FirstImage={Images.account}
                      header={
                        oldTripData?.SelectSeatData?.length > 1
                          ? `${strings?.Passenger}(${index + 1})`
                          : `${strings?.Passenger}(s)`
                      }
                    />
                    <DropDownPaperTextInput
                      placeholder={strings?.Passenger}
                      label={strings?.Passenger}
                      icon={Images.downArrow}
                      value={item.name}
                      toggleDropdown={() => toggleDropDown(item.id)}
                      onPress={() => toggleDropDown(item.id)}
                      style={styles.dropDownInputStyle}
                      iconStyle={styles.dropDownIconStyle}
                      ref={DropdownButton}
                    />

                    {visible && item.id === flatlistIndex && (
                      <DropDownMenu
                        data={passengerList?.filter(i =>
                          flatlistData?.every(e => {
                            return e.name != `${i.FirstName}${i.LastName}`;
                          }),
                        )}
                        dropdownTop={dropdown}
                        renderItem={renderItem}
                        style={styles.dropDownMenuStyle}
                      />
                    )}
                  </>
                );
              }}
            />
          )}
        </View>
        {ticketType !== 'Old Trip' && (
          <View style={styles.cardBody}>
            <TouchableOpacity
              onPress={() => {
                flatlistData?.every(i => i.name.length > 0)
                  ? navigation.navigate('SelectSeat', {
                      TripType: tripType,
                      type: 'Reschedule',
                    })
                  : AlertConstant(strings?.add_passenger_on_click);
              }}>
              <CardHeader
                FirstImage={Images.seat}
                SecondImage={Images.forward}
                header={strings.seat_numberString}
                imageStyle={styles.plusIconStyle}
              />
            </TouchableOpacity>
            <View
              style={{
                marginVertical: hp(2),
                backgroundColor: color.white,
                borderRadius: 5,
              }}>
              {flatlistData.length > 1 && SelectSeat?.every(i => i.seatNo) && (
                <View
                  style={{
                    paddingVertical: hp(1.5),
                    flexDirection: 'row',
                    backgroundColor: color.lightGray,
                  }}>
                  <View style={{width: wp(13), alignItems: 'center'}}>
                    <Text style={styles.searNumberListTitleText}>No.</Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={styles.searNumberListTitleText}>
                      {strings?.Passenger}(s)
                    </Text>
                  </View>
                  <View style={{width: wp(18), alignItems: 'center'}}>
                    <Text style={styles.searNumberListTitleText}>
                      {strings?.seat}
                    </Text>
                  </View>
                </View>
              )}
              {SelectSeat?.every(i => (i.seatNo === false ? false : true)) && (
                <FlatList
                  data={SelectSeat}
                  renderItem={({item, index}) => (
                    <View
                      style={{
                        paddingVertical: hp(1.5),
                        flexDirection: 'row',
                        backgroundColor: color.lightGray,
                      }}>
                      {flatlistData.length > 1 && (
                        <View style={{width: wp(13), alignItems: 'center'}}>
                          <Text style={styles.searNumberListTitleText}>
                            {index + 1}
                          </Text>
                        </View>
                      )}
                      <View style={{flex: 1, marginLeft: wp(4)}}>
                        <Text style={styles.searNumberListTitleText}>
                          {item?.name}
                        </Text>
                      </View>
                      <View style={{width: wp(18), alignItems: 'center'}}>
                        <Text style={styles.searNumberListTitleText}>
                          {item?.seatNo}
                        </Text>
                      </View>
                    </View>
                  )}
                />
              )}
            </View>
          </View>
        )}
        <View style={{marginHorizontal: wp(4)}}>
          <ReschedulePriceDetails
            oldPrice={oldTripData?.totalPaymentList?.totalPayment}
            newPrice={
              Number(newTripData.price.replace(',', '').slice(1)) *
              Number(totalSeat)
            }
            oldTripData={oldTripData?.searchFlightCardData}
            newTripData={newTripData}
            totalPassenger={Number(searchFlightData.passenger.split(' ')[0])}
            ticketPrice={ticketPrice}
            totalSeat={totalSeat}
          />
        </View>
      </ScrollView>
      <View style={styles.bottomButtonBody}>
        <TouchableOpacity
          onPress={() => {
            onContinue();
          }}
          style={styles.okButton}>
          <Text style={styles.okButtonText}>
            {' '}
            {tripType === 'Round-Trip' && ticketType === 'Old Trip'
              ? strings?.Confirm
              : strings.continue}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default RescheduleFillPassengerDetails;
// 2.8% travel inssurance
//1.5% tax
const ThemeStyle = color =>
  StyleSheet.create({
    scrollViewStyle: {flex: 1},
    headerViewStyle: {
      flex: 1,
      backgroundColor: color.bgColor,
    },
    progressViewStyle: {
      backgroundColor: '#0041C0',
      height: hp(4),
      width: hp(4),
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
    },
    progressCountStyle: {
      fontSize: fontSize(17),
      fontWeight: '600',
      color: color.white,
    },
    progressInnerViewStyle: {
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    lineViewStyle: {
      borderWidth: 1,
      borderColor: 'black',
      width: wp(14),
    },
    progressTextStyle: {
      color: '#DBDDE1',
      marginTop: hp(0.5),
    },
    bottomButtonBody: {
      backgroundColor: color.white,
      paddingHorizontal: wp(6),
      paddingTop: hp(2),
      paddingBottom: hp(4),
      flexDirection: 'row',
    },
    okButton: {
      backgroundColor: color.commonBlue,
      paddingVertical: hp(2),
      alignItems: 'center',
      borderRadius: 10,
      flex: 1,
    },
    okButtonText: {
      fontSize: fontSize(18),
      fontWeight: '500',
      color: '#fff',
    },
    cardBody: {
      backgroundColor: color.white,
      paddingHorizontal: wp(4),
      marginBottom: hp(2),
      borderRadius: 10,
      borderColor: '#000',
      marginHorizontal: wp(4),
    },
    cardHeaderText: {
      fontSize: fontSize(18),
      fontWeight: 'bold',
      flex: 1,
      color: color.black,
      marginHorizontal: wp(4),
    },
    nameTextStyle: {
      fontSize: fontSize(18),
      fontWeight: 'bold',
      flex: 1,
      color: color.black,
    },
    flatlistViewStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: '#e2e2e2',
      borderBottomWidth: 1,
      paddingVertical: hp(1.6),
    },
    emailStyle: {
      flex: 1,
      fontSize: fontSize(16),
      color: color.offerColor,
    },
    PhoneNumberStyle: {
      color: color.offerColor,
      fontSize: fontSize(16),
      marginHorizontal: wp(2),
    },
    cardHeaderStyle: {
      height: hp(3),
      width: hp(3),
    },
    flyIconStyle: {
      height: hp(3),
      width: hp(3),
      tintColor: color.black,
    },
    progressBarStyle: {
      height: hp(10),
      backgroundColor: color.commonBlue,
      paddingHorizontal: wp(12),
    },
    cardheaderIconStyle: {
      height: hp(3),
      width: hp(3),
      tintColor: color.commonBlue,
    },
    contactDetailsViewStyle: {
      marginVertical: hp(2),
    },
    emailViewStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      justifyContent: 'space-between',
      marginTop: hp(1),
    },
    plusIconStyle: {
      height: hp(2),
      width: hp(2),
      tintColor: color.commonBlue,
    },
    passengerInputViewStyle: {
      marginBottom: hp(2),
    },
    dropDownInputStyle: {
      marginHorizontal: wp(2),
      height: hp(7),
      marginVertical: hp(1),
    },
    dropDownIconStyle: {
      marginTop: hp(2.4),
    },
    dropDownMenuStyle: {
      marginHorizontal: wp(1),
      marginBottom: hp(1),
    },
    dropDownRenderItemTouchStyle: {
      marginHorizontal: wp(4),
      marginVertical: hp(1.2),
      borderBottomWidth: 0.5,
      borderColor: '#e6e6e6',
      paddingBottom: hp(1.5),
    },
    renderItemTextStyle: {
      fontSize: fontSize(18),
      fontWeight: '500',
      color: '#383838',
    },
    searNumberListTitleText: {
      fontSize: fontSize(17),
      fontWeight: '500',
      color: color.black,
    },
    flatlistViewStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: '#e2e2e2',
      borderBottomWidth: 1,
      paddingVertical: hp(1.6),
    },
    cardHeaderText: {
      fontSize: fontSize(18),
      fontWeight: 'bold',
      flex: 1,
      color: color.black,
      marginHorizontal: wp(4),
    },
    contactDetailsViewStyle: {
      marginVertical: hp(2),
    },
    emailViewStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      justifyContent: 'space-between',
      marginTop: hp(1),
    },
    nameTextStyle: {
      fontSize: fontSize(18),
      fontWeight: 'bold',
      flex: 1,
      color: color.black,
    },
    buttonStyle: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: hp(2),
      borderRadius: 10,
      backgroundColor: color.commonBlue,
      marginVertical: hp(1.2),
      marginBottom: hp(2),
    },
    buttonTextStyle: {
      fontSize: fontSize(18, 812),
      color: 'white',
      fontWeight: 'bold',
    },
    seatNumberListTitleText: {
      fontSize: fontSize(18, 812),
      color: color.black,
      fontWeight: 'bold',
    },
    seatNumberListTitleText1: {
      fontSize: fontSize(20, 812),
      color: color.black,
      fontWeight: 'bold',
    },
    passengerViewStyle: {
      flexDirection: 'row',
      backgroundColor: color.lightGray,
      paddingHorizontal: wp(3),
      paddingVertical: hp(2),
      flex: 1,
      borderRadius: 10,
      justifyContent: 'space-between',
      marginBottom: hp(1),
      marginVertical: hp(2),
    },
    noteStyle: {
      flex: 1,
      marginHorizontal: wp(6),
      textAlign: 'center',
      color: '#383838',
      fontSize: fontSize(16),
    },
  });
