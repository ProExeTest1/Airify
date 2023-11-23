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
import {
  RescheduleCardData,
  RescheduleDateData,
  RescheduleNormalDateData,
} from '../../redux/action/RescheduleAction';
import moment from 'moment';

const TransactionDetails = ({navigation, route}) => {
  //BKG951233154
  const tripType = route?.params?.TripType;
  const dispatch = useDispatch();
  const [ticketType, setTicketType] = useState('Departure');
  const [firebaseTicketData, setFirebaseTicketData] = useState({});
  const [TicketTypeData, setTicketTypeData] = useState({});

  const ticketId = useSelector(state => state?.showTicketData?.ticketId);
  const strings = useSelector(state => state?.languageReducer?.languageObject);

  console.log(firebaseTicketData, TicketTypeData);

  const getTicketData = async () => {
    await firestore()
      .collection('SaveTicket')
      .onSnapshot(querySnapshot => {
        querySnapshot?.forEach(documentSnapshot => {
          if (documentSnapshot?.id == auth().currentUser.uid) {
            setFirebaseTicketData(
              documentSnapshot?.data().SaveTicket.find(e => e.id == ticketId)
                ?.Departure,
            );
            setTicketTypeData(
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
    Clipboard.setString(firebaseTicketData?.bookingID);
    AlertConstant('Text copied to clipboard!');
  };
  return (
    <View style={{flex: 1}}>
      {firebaseTicketData?.bookingID && (
        <>
          <StatusBar barStyle={'light-content'} />

          <CommonHeader
            headerName={strings?.transation_details}
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
              onPress1={() => {
                setTicketType('Departure');
                setFirebaseTicketData(TicketTypeData.Departure);
              }}
              onPress2={() => {
                setTicketType('Return');
                setFirebaseTicketData(TicketTypeData.Return);
              }}
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
              <Text style={styles.seatNumberListTitleText1}>
                {strings?.booking_id}:
              </Text>
              <TouchableOpacity
                onPress={copyToClipboard}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.seatNumberListTitleText1}>
                  {firebaseTicketData?.bookingID}
                </Text>
                <Image
                  source={Images.copy}
                  style={{height: hp(3), width: hp(3), marginLeft: wp(2)}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <Barcode
              value={firebaseTicketData?.bookingID}
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
              <FlightDetailsCard
                item={firebaseTicketData?.searchFlightCardData}
                searchFlightData={firebaseTicketData?.searchFlightData}
                searchFlightDateData={firebaseTicketData?.searchFlightDateData}
              />
            </View>
            <View style={styles.cardBody}>
              <View style={styles.flatlistViewStyle}>
                <Image
                  source={Images.flyPlaneIcon}
                  style={styles.flyIconStyle}
                  resizeMode="contain"
                />
                <Text style={styles.cardHeaderText}>
                  {strings.FlightAmenities}
                </Text>
              </View>
              <FlightServices
                DetailsNavigation={() =>
                  navigation?.navigate('FlightPackageDetails', {
                    header: 'Details',
                  })
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
                  {firebaseTicketData?.contactDetails?.Name}
                </Text>
                <View style={styles.emailViewStyle}>
                  <Text numberOfLines={1} style={styles.emailStyle}>
                    {firebaseTicketData?.contactDetails?.Email}
                  </Text>
                  <Text numberOfLines={1} style={styles.PhoneNumberStyle}>
                    {firebaseTicketData?.contactDetails?.PhoneNumber}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{marginHorizontal: wp(4)}}>
              <PriceDetails
                item={firebaseTicketData?.searchFlightCardData}
                totalPassenger={Number(
                  firebaseTicketData?.totalPaymentList?.seat?.totalSeat,
                )}
                ticketPrice={Number(
                  firebaseTicketData?.searchFlightCardData?.price
                    .slice(1)
                    .split(',')
                    .join(''),
                )}
                totalSeat={Number(
                  firebaseTicketData?.totalPaymentList?.seat?.totalSeat,
                )}
                TotalPoints={
                  firebaseTicketData?.totalPaymentList?.points?.havePoint +
                  firebaseTicketData?.totalPaymentList?.points?.pointsUse
                }
                isReturn={tripType}
                returnTicketPrice={
                  Number(
                    firebaseTicketData?.searchFlightCardData?.price
                      ?.slice(1)
                      ?.split(',')
                      ?.join(''),
                  )
                    ? Number(
                        firebaseTicketData?.searchFlightCardData?.price
                          ?.slice(1)
                          ?.split(',')
                          ?.join(''),
                      )
                    : 0
                }
                returnItem={firebaseTicketData?.searchFlightCardData}
                ToggleSwitchBut1={
                  firebaseTicketData?.totalPaymentList?.points?.pointsUse == 0
                    ? false
                    : true
                }
                DiscountData={
                  firebaseTicketData?.totalPaymentList?.discount?.discountData
                }
              />
            </View>
            <View style={styles.cardBody}>
              <CardHeader
                FirstImage={Images?.copy}
                header={strings?.transation_details}
              />

              <View
                style={[styles.TransactionDetailsStyle, {marginTop: hp(2)}]}>
                <Text style={styles.labeltxtStyle}>
                  {strings.payment_method}
                </Text>
                <Text style={styles.dataTextStyle}>
                  {firebaseTicketData?.paymentMethod}
                </Text>
              </View>
              <View style={styles.TransactionDetailsStyle}>
                <Text style={styles.labeltxtStyle}>{strings.status}</Text>
                <View
                  style={{
                    padding: hp(1),
                    backgroundColor: color.commonBlue,
                    borderRadius: 5,
                  }}>
                  <Text style={{color: color.white}}>{strings.paid}</Text>
                </View>
              </View>
              <View style={styles.TransactionDetailsStyle}>
                <Text style={styles.labeltxtStyle}>{strings.booking_id}</Text>
                <TouchableOpacity
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.dataTextStyle}>
                    {firebaseTicketData?.bookingID}
                  </Text>
                  <Image
                    source={Images.copy}
                    style={{height: hp(2.3), width: hp(2.3)}}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.TransactionDetailsStyle}>
                <Text style={styles.labeltxtStyle}>
                  {strings.transaction_id}
                </Text>
                <TouchableOpacity
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.dataTextStyle}>
                    {firebaseTicketData?.transactionID}
                  </Text>
                  <Image
                    source={Images.copy}
                    style={{height: hp(2.3), width: hp(2.3)}}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              <View
                style={[styles.TransactionDetailsStyle, {marginBottom: hp(2)}]}>
                <Text style={styles.labeltxtStyle}>{strings.reference_id}</Text>
                <TouchableOpacity
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.dataTextStyle}>
                    {firebaseTicketData?.referenceID}
                  </Text>
                  <Image
                    source={Images.copy}
                    style={{height: hp(2.3), width: hp(2.3)}}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <FlatList
              data={firebaseTicketData?.SelectSeatData}
              renderItem={({item, index}) => {
                return (
                  <View style={styles.cardBody}>
                    <CardHeader
                      FirstImage={Images.account}
                      header={
                        firebaseTicketData?.SelectSeatData?.length > 1
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
                    <TouchableOpacity
                      style={styles.buttonStyle}
                      onPress={() => {
                        navigation.navigate('ETicket', {
                          header: {
                            bookingID: firebaseTicketData?.bookingID,
                            contactDetails: firebaseTicketData?.contactDetails,
                            searchFlightCardData: {
                              ...firebaseTicketData?.searchFlightCardData,
                              searchFlightDateData:
                                firebaseTicketData?.searchFlightDateData,
                            },
                            searchFlightData:
                              firebaseTicketData?.searchFlightData,
                            SelectSeatData: firebaseTicketData?.SelectSeatData,
                          },
                        });
                      }}>
                      <Text style={styles.buttonTextStyle}>
                        {strings.show_eticket}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />

            <TouchableOpacity
              onPress={() => {
                // dispatch(RescheduleCardData(firebaseTicketData));
                // dispatch(
                //   RescheduleNormalDateData({
                //     date: moment(
                //       firebaseTicketData.searchFlightDateData[1],
                //       'MMM DD YYYY',
                //     ).format('D/M/YYYY'),
                //     day: firebaseTicketData?.searchFlightDateData[0],
                //   }),
                // );
                // dispatch(
                //   RescheduleDateData(
                //     `${firebaseTicketData?.searchFlightDateData[0]} ,${firebaseTicketData.searchFlightDateData[1]}`,
                //   ),
                // );
                dispatch(RescheduleCardData(firebaseTicketData));
                dispatch(
                  RescheduleNormalDateData({
                    date: moment(
                      firebaseTicketData.searchFlightDateData[1],
                      'MMM DD YYYY',
                    ).format('D/M/YYYY'),
                    day: firebaseTicketData?.searchFlightDateData[0],
                  }),
                );
                dispatch(
                  RescheduleDateData(
                    `${firebaseTicketData?.searchFlightDateData[0]} ,${firebaseTicketData.searchFlightDateData[1]}`,
                  ),
                );
                dispatch(RescheduleCardData(firebaseTicketData));
                navigation?.navigate('RescheduleSearchFlight');
              }}
              style={[
                styles.rescheduleButtonStyle,
                {borderColor: color.commonBlue},
              ]}>
              <Text
                style={[styles.rescheduleTextStyle, {color: color.commonBlue}]}>
                {strings.reschedule_trip}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.rescheduleButtonStyle,
                {borderColor: 'red', marginBottom: hp(4)},
              ]}>
              <Text style={[styles.rescheduleTextStyle, {color: 'red'}]}>
                {strings.cancel_booking}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </>
      )}
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
