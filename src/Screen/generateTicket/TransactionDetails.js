import {
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  CardHeader,
  CommonHeader,
  FlightDetailsCard,
  FlightServices,
  PriceDetails,
  ReturnDepartureSwitch,
} from '../../components';
import {strings} from '../../helper/Strings';
import {Images} from '../../helper/IconConstant';
import {color} from '../../helper/ColorConstant';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {fontSize, hp, wp} from '../../helper/Constant';
import Barcode from '@kichiyaki/react-native-barcode-generator';
import Clipboard from '@react-native-clipboard/clipboard';
import {AlertConstant} from '../../helper/AlertConstant';
import {SearchFlightReturnAction} from '../../redux/action/SearchFlightAction';
import {SearchFlightAction} from '../../redux/action/PlaceAction';

const TransactionDetails = ({navigation, route}) => {
  //BKG951233154
  const tripType = route?.params?.TripType;
  console.log(tripType, 'hello');
  const dispatch = useDispatch();
  const [ticketType, setTicketType] = useState('Departure');
  const [firebaseTicketData, setFirebaseTicketData] = useState({});
  const ticketId = useSelector(state => state?.showTicketData?.ticketId);
  // const ticketId = '1698034006588';

  const getTicketData = async () => {
    await firestore()
      .collection('SaveTicket')
      .onSnapshot(querySnapshot => {
        querySnapshot?.forEach(documentSnapshot => {
          if (documentSnapshot?.id == auth().currentUser.uid) {
            setFirebaseTicketData(
              documentSnapshot?.data().SaveTicket.find(e => e.id == ticketId),
            );
          }
        });
      });
  };
  useEffect(() => {
    getTicketData();
  }, []);
  const copyToClipboard = () => {
    Clipboard.setString(firebaseTicketData?.Departure?.bookingID);
    AlertConstant('Text copied to clipboard!');
  };
  const ontoggleSwitch = () => {
    if (ticketType === 'Departure') {
      setTicketType('Return');
    } else {
      setTicketType('Departure');
    }
  };
  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle={'light-content'} />

      <CommonHeader
        headerName={'Transaction Details'}
        navigation1={() => {
          navigation?.navigate('TabNavigation');
          dispatch(SearchFlightReturnAction({}));
          dispatch(SearchFlightAction({}));
        }}
        onPress1={true}
        onPress2={false}
        Images1={Images.backIcon}
        Images2={null}
        Images1Color={color.white}
      />
      {tripType === 'Round-Trip' ? (
        <ReturnDepartureSwitch
          onPress={ontoggleSwitch}
          ticketType={ticketType}
        />
      ) : null}
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={[
          styles.scrollViewStyle,
          {marginTop: tripType === 'Round-Trip' ? hp(1) : hp(0)},
        ]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: wp(4),
            marginVertical: hp(1),
            marginTop: hp(3),
          }}>
          <Text style={styles.seatNumberListTitleText1}>Booking ID:</Text>
          <TouchableOpacity
            onPress={copyToClipboard}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.seatNumberListTitleText1}>
              {ticketType === 'Departure'
                ? firebaseTicketData?.Departure?.bookingID
                : firebaseTicketData?.Return?.bookingID}
            </Text>
            <Image
              source={Images.copy}
              style={{height: hp(3), width: hp(3), marginLeft: wp(2)}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <Barcode
          value={
            ticketType === 'Departure'
              ? firebaseTicketData?.Departure?.bookingID
              : firebaseTicketData?.Return?.bookingID
          }
          format="CODE128"
          style={{
            flex: 1,
            paddingVertical: hp(2),
            marginHorizontal: wp(4),
            marginVertical: hp(1),
          }}
        />
        <Text style={styles.noteStyle}>{strings.ticket_note}</Text>
        <View style={{paddingHorizontal: wp(4), marginTop: hp(2)}}>
          {ticketType === 'Departure'
            ? firebaseTicketData?.Departure?.searchFlightDateData && (
                <FlightDetailsCard
                  item={firebaseTicketData?.Departure?.searchFlightCardData}
                  searchFlightData={
                    firebaseTicketData?.Departure?.searchFlightData
                  }
                  searchFlightDateData={
                    firebaseTicketData?.Departure?.searchFlightDateData
                  }
                />
              )
            : firebaseTicketData?.Return?.searchReturnFlightDateData && (
                <FlightDetailsCard
                  item={firebaseTicketData?.Return?.searchReturnFlightCardData}
                  searchFlightData={
                    firebaseTicketData?.Return?.searchReturnFlightData
                  }
                  searchFlightDateData={
                    firebaseTicketData?.Return?.searchReturnFlightDateData
                  }
                />
              )}
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
          />
          <View style={styles.contactDetailsViewStyle}>
            <Text style={styles.nameTextStyle}>
              {firebaseTicketData?.Departure?.contactDetails?.Name}
            </Text>
            <View style={styles.emailViewStyle}>
              <Text numberOfLines={1} style={styles.emailStyle}>
                {firebaseTicketData?.Departure?.contactDetails?.Email}
              </Text>
              <Text numberOfLines={1} style={styles.PhoneNumberStyle}>
                {firebaseTicketData?.Departure?.contactDetails?.PhoneNumber}
              </Text>
            </View>
          </View>
        </View>
        <View style={{marginHorizontal: wp(4)}}>
          <PriceDetails
            item={firebaseTicketData?.Departure?.searchFlightCardData}
            totalPassenger={
              tripType === 'Round-Trip'
                ? Number(
                    firebaseTicketData?.Departure?.totalPaymentList?.seat
                      ?.totalSeat,
                  ) / 2
                : Number(
                    firebaseTicketData?.Departure?.totalPaymentList?.seat
                      ?.totalSeat,
                  )
            }
            ticketPrice={Number(
              firebaseTicketData?.Departure?.searchFlightCardData?.price
                .slice(1)
                .split(',')
                .join(''),
            )}
            totalSeat={
              tripType === 'Round-Trip'
                ? Number(
                    firebaseTicketData?.Departure?.totalPaymentList?.seat
                      ?.totalSeat,
                  ) / 2
                : Number(
                    firebaseTicketData?.Departure?.totalPaymentList?.seat
                      ?.totalSeat,
                  )
            }
            TotalPoints={
              firebaseTicketData?.Departure?.totalPaymentList?.points
                ?.havePoint +
              firebaseTicketData?.Departure?.totalPaymentList?.points?.pointsUse
            }
            isReturn={tripType}
            returnTicketPrice={
              tripType === 'Round-Trip'
                ? Number(
                    firebaseTicketData?.Return?.searchReturnFlightCardData?.price
                      ?.slice(1)
                      ?.split(',')
                      ?.join(''),
                  )
                : 0
            }
            returnItem={
              tripType === 'Round-Trip'
                ? firebaseTicketData?.Return?.searchReturnFlightCardData
                : false
            }
            ToggleSwitchBut1={
              firebaseTicketData?.Departure?.totalPaymentList?.points
                ?.pointsUse == 0
                ? false
                : true
            }
            DiscountData={
              firebaseTicketData?.Departure?.totalPaymentList?.discount
                ?.discountData
            }
          />
        </View>
        <View style={styles.cardBody}>
          <CardHeader FirstImage={Images?.copy} header={'Transaction Detail'} />

          <View style={[styles.TransactionDetailsStyle, {marginTop: hp(2)}]}>
            <Text style={styles.labeltxtStyle}>Payment Method</Text>
            <Text style={styles.dataTextStyle}>
              {firebaseTicketData?.Departure?.paymentMethod}
            </Text>
          </View>
          <View style={styles.TransactionDetailsStyle}>
            <Text style={styles.labeltxtStyle}>Status</Text>
            <View
              style={{
                padding: hp(1),
                backgroundColor: color.commonBlue,
                borderRadius: 5,
              }}>
              <Text style={{color: color.white}}>PAID</Text>
            </View>
          </View>
          <View style={styles.TransactionDetailsStyle}>
            <Text style={styles.labeltxtStyle}>Booking ID</Text>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.dataTextStyle}>
                {ticketType === 'Departure'
                  ? firebaseTicketData?.Departure?.bookingID
                  : firebaseTicketData?.Return?.bookingID}
              </Text>
              <Image
                source={Images.copy}
                style={{height: hp(2.3), width: hp(2.3)}}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.TransactionDetailsStyle}>
            <Text style={styles.labeltxtStyle}>Transacation ID</Text>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.dataTextStyle}>
                {ticketType === 'Departure'
                  ? firebaseTicketData?.Departure?.transactionID
                  : firebaseTicketData?.Return?.transactionID}
              </Text>
              <Image
                source={Images.copy}
                style={{height: hp(2.3), width: hp(2.3)}}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View style={[styles.TransactionDetailsStyle, {marginBottom: hp(2)}]}>
            <Text style={styles.labeltxtStyle}>Reference ID</Text>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.dataTextStyle}>
                {ticketType === 'Departure'
                  ? firebaseTicketData?.Departure?.referenceID
                  : firebaseTicketData?.Return?.referenceID}
              </Text>
              <Image
                source={Images.copy}
                style={{height: hp(2.3), width: hp(2.3)}}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
        {ticketType === 'Departure'
          ? firebaseTicketData?.Departure?.SelectSeatData?.every(i =>
              i.seatNo === false ? false : true,
            ) && (
              <FlatList
                data={firebaseTicketData?.Departure?.SelectSeatData}
                renderItem={({item, index}) => {
                  return (
                    <View style={styles.cardBody}>
                      <CardHeader
                        FirstImage={Images.account}
                        header={
                          firebaseTicketData?.Departure?.SelectSeatData
                            ?.length > 1
                            ? `Passenger(${index + 1})`
                            : 'Passenger(s)'
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
                      <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={() => {
                          navigation.navigate('ETicket', {
                            header: {
                              bookingID:
                                firebaseTicketData?.Departure?.bookingID,
                              contactDetails:
                                firebaseTicketData?.Departure?.contactDetails,
                              searchFlightCardData: {
                                ...firebaseTicketData?.Departure
                                  ?.searchFlightCardData,
                                searchFlightDateData:
                                  firebaseTicketData?.Departure
                                    ?.searchFlightDateData,
                              },
                              searchFlightData:
                                firebaseTicketData?.Departure?.searchFlightData,
                              SelectSeatData:
                                firebaseTicketData?.Departure?.SelectSeatData,
                            },
                          });
                        }}>
                        <Text style={styles.buttonTextStyle}>
                          Show E-Ticket
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            )
          : firebaseTicketData?.Return?.SelectReturnSeatData?.every(i =>
              i.seatNo === false ? false : true,
            ) && (
              <FlatList
                data={firebaseTicketData?.Return?.SelectReturnSeatData}
                renderItem={({item, index}) => {
                  return (
                    <View style={styles.cardBody}>
                      <CardHeader
                        FirstImage={Images.account}
                        header={
                          firebaseTicketData?.Return?.SelectReturnSeatData
                            ?.length > 1
                            ? `Passenger(${index + 1})`
                            : 'Passenger(s)'
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
                      <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={() => {
                          navigation.navigate('ETicket', {
                            header: {
                              bookingID: firebaseTicketData?.Return?.bookingID,
                              contactDetails:
                                firebaseTicketData?.Departure?.contactDetails,
                              searchFlightCardData: {
                                ...firebaseTicketData?.Return
                                  ?.searchReturnFlightCardData,
                                searchFlightDateData:
                                  firebaseTicketData?.Return
                                    ?.searchReturnFlightDateData,
                              },
                              searchFlightData:
                                firebaseTicketData?.Return
                                  ?.searchReturnFlightData,
                              SelectSeatData:
                                firebaseTicketData?.Return
                                  ?.SelectReturnSeatData,
                            },
                            tripType: tripType,
                          });
                        }}>
                        <Text style={styles.buttonTextStyle}>
                          Show E-Ticket
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            )}

        <TouchableOpacity
          style={[
            styles.rescheduleButtonStyle,
            {borderColor: color.commonBlue},
          ]}>
          <Text style={[styles.rescheduleTextStyle, {color: color.commonBlue}]}>
            Recshedule Trip
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.rescheduleButtonStyle,
            {borderColor: 'red', marginBottom: hp(4)},
          ]}>
          <Text style={[styles.rescheduleTextStyle, {color: 'red'}]}>
            Cancel Booking
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default TransactionDetails;

const styles = StyleSheet.create({
  scrollViewStyle: {flex: 1},
  cardBody: {
    backgroundColor: color.white,
    paddingHorizontal: wp(4),
    marginBottom: hp(2),
    borderRadius: 10,
    borderColor: '#000',
    marginHorizontal: wp(4),
  },
  flatlistViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#e2e2e2',
    borderBottomWidth: 1,
    paddingVertical: hp(1.6),
  },
  flyIconStyle: {
    height: hp(3),
    width: hp(3),
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
  emailStyle: {
    flex: 1,
    fontSize: fontSize(16),
    color: '#383838',
  },
  PhoneNumberStyle: {
    color: '#383838',
    fontSize: fontSize(16),
    marginHorizontal: wp(2),
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
    backgroundColor: '#F3F3F3',
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
  rescheduleButtonStyle: {
    paddingHorizontal: wp(6),
    marginHorizontal: wp(4),
    paddingVertical: hp(2),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 2,
    marginVertical: hp(1.2),
  },
  rescheduleTextStyle: {
    fontSize: fontSize(20),
    fontWeight: 'bold',
  },
  TransactionDetailsStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: hp(1),
  },
  labeltxtStyle: {
    fontSize: fontSize(18),
    fontWeight: '500',
    color: color.black,
  },
  dataTextStyle: {
    fontSize: fontSize(18),
    color: color.black,
    fontWeight: 'bold',
  },
});
