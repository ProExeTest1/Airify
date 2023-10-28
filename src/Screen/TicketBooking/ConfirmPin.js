import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import OtpInputs from 'react-native-otp-inputs';
import {CommonHeader, OnBoardingTwoButton} from '../../components';
import {strings} from '../../helper/Strings';
import {Images} from '../../helper/IconConstant';
import {color} from '../../helper/ColorConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Modal from 'react-native-modal';
import {ActivityIndicator} from 'react-native-paper';
import {randomBookingIDGenerator} from '../../helper/RandomPromoCodegenerator';
import {useDispatch, useSelector} from 'react-redux';
import LottieView from 'lottie-react-native';
import {
  DiscountDataAction,
  SelectSeatActionData,
  SelectpaymentMethodAction,
} from '../../redux/action/SelectSeatAction';
import moment from 'moment';
import {showTicketActionData} from '../../redux/action/showTicketAction';
const ConfirmPin = ({navigation, route}) => {
  const tripType = route?.params?.TripType;
  const [pinData, setPinData] = useState('');
  const [condti, setcondti] = useState(true);
  const [condti2, setcondti2] = useState(true);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [SaveTicketData, setSaveTicketData] = useState([]);
  const [UserWalletData, setUserWalletData] = useState({});
  const [UserPointData, setUserPointData] = useState({});
  const [SeatData, SetSeatData] = useState([]);

  const searchFlightCardData = useSelector(
    state => state.searchFlight.searchFlightCardData,
  );
  const searchReturnFlightCardData = useSelector(
    state => state.searchFlight.searchFlightReturnCardData,
  );
  const userData = useSelector(state => state.userData.userdata);
  const SelectSeatData = useSelector(e => e.SelectSeatData.SelectSeatData);
  const SelectReturnSeatData = useSelector(
    e => e?.SelectSeatData?.ReturnSelectSeatData,
  );
  const totalPaymentList = useSelector(e => e.SelectSeatData.totalPaymentList);
  const SelectPaymentMethod = useSelector(
    e => e.SelectSeatData.SelectPaymentMethod,
  );
  const searchFlightData = useSelector(e => e?.place?.searchFlightData);
  const searchReturnFlightData = useSelector(
    e => e?.searchFlight?.searchFlightReturnData,
  );
  const searchFlightDateData = useSelector(e => e?.date?.depatureDate).split(
    ',',
  );
  const searchReturnFlightDateData = useSelector(
    e => e?.date?.returnDate,
  ).split(',');
  const SelectDate = useSelector(e => e?.date?.normalDate);
  const ReturnSelectedDate = useSelector(e => e?.date?.returnNormalDate);
  const dispatch = useDispatch();
  console.log(SelectReturnSeatData, 'SelectReturnSeatData');
  console.log(searchReturnFlightData, 'searchReturnFlightData');
  console.log(searchReturnFlightDateData, 'searchReturnFlightDateData');
  console.log(searchReturnFlightCardData, 'searchReturnFlightCardData');
  const checkPin = async pin => {
    console.log('totalPaymentList', totalPaymentList);
    if (pin.length == 4) {
      if (pin == Number(pinData)) {
        setcondti2(true);
        setModalVisible2(true);
        await firestore()
          .collection('UserWallet')
          .doc(auth().currentUser.uid)
          .update({
            wallet:
              Number(UserWalletData.wallet) - totalPaymentList.totalPayment,
            transactionHistory: [
              {
                title: strings.walletTopUp,
                price: `-$${totalPaymentList.totalPayment}`,
                date: moment(new Date()).format('MMM D,YYYY'),
                time: new Date().toLocaleTimeString('en-IN'),
              },
              ...UserWalletData.transactionHistory,
            ],
          });
        if (tripType === 'Round-Trip') {
          await firestore()
            .collection('AirlineSeatBookData')
            .doc('JaTwXgqSHSESiR6CDzdy')
            .update({
              AirlineSeatBookData: SeatData.map(i => {
                if (i.date == SelectDate?.date) {
                  return {
                    date: i.date,
                    day: i.day,
                    flightData: i.flightData.map(e => {
                      if (
                        e.flightData.airlineName ==
                          searchFlightCardData?.airlineName &&
                        e.flightData.lendTime ==
                          searchFlightCardData?.lendTime &&
                        e.flightData.logo == searchFlightCardData?.logo &&
                        e.flightData.pickTime ==
                          searchFlightCardData?.pickTime &&
                        e.flightData.price == searchFlightCardData?.price &&
                        e.flightData.stop == searchFlightCardData?.stop &&
                        e.flightData.stopDuration ==
                          searchFlightCardData?.stopDuration &&
                        e.flightData.totalHours ==
                          searchFlightCardData?.totalHours &&
                        e.flightData.day == searchFlightCardData?.day
                      ) {
                        return {
                          flightData: e.flightData,
                          selectSeat: [
                            ...e?.selectSeat,
                            SelectReturnSeatData.map(a => a.seatNo),
                          ].flat(),
                        };
                      }
                      return e;
                    }),
                  };
                }
                if (i.date == ReturnSelectedDate?.date) {
                  return {
                    date: i.date,
                    day: i.day,
                    flightData: i.flightData.map(e => {
                      if (
                        e.flightData.airlineName ==
                          searchReturnFlightCardData?.airlineName &&
                        e.flightData.lendTime ==
                          searchReturnFlightCardData?.lendTime &&
                        e.flightData.logo == searchReturnFlightCardData?.logo &&
                        e.flightData.pickTime ==
                          searchReturnFlightCardData?.pickTime &&
                        e.flightData.price ==
                          searchReturnFlightCardData?.price &&
                        e.flightData.stop == searchReturnFlightCardData?.stop &&
                        e.flightData.stopDuration ==
                          searchReturnFlightCardData?.stopDuration &&
                        e.flightData.totalHours ==
                          searchReturnFlightCardData?.totalHours &&
                        e.flightData.day == searchReturnFlightCardData?.day
                      ) {
                        return {
                          flightData: e.flightData,
                          selectSeat: [
                            ...e?.selectSeat,
                            SelectReturnSeatData.map(a => a.seatNo),
                          ].flat(),
                        };
                      }
                      return e;
                    }),
                  };
                }
                return i;
              }),
            });

          totalPaymentList.points?.pointsUse != 0 &&
            (await firestore()
              .collection('Points')
              .doc(auth().currentUser.uid)
              .set({
                TotalPoints:
                  Number(UserPointData.TotalPoints) -
                  totalPaymentList.points.pointsUse,
                PointsHistory: [
                  {
                    title: 'points',
                    price: `-$${totalPaymentList.points.pointsUse}`,
                    date: moment(new Date()).format('MMM D,YYYY'),
                    time: new Date().toLocaleTimeString('en-IN'),
                  },
                  ...UserPointData.PointsHistory,
                ],
              }));

          const ticketId = Date.now();
          dispatch(showTicketActionData(ticketId));
          await firestore()
            .collection('SaveTicket')
            .doc(auth().currentUser.uid)
            .update({
              SaveTicket: [
                ...SaveTicketData,
                {
                  id: ticketId,
                  Departure: {
                    bookingID: randomBookingIDGenerator(9, 'BKG'),
                    searchFlightCardData,
                    contactDetails: {
                      Email: userData.Email,
                      Name: userData.Name,
                      PhoneNumber: userData.PhoneNumber,
                    },
                    totalPaymentList,
                    SelectSeatData,
                    paymentMethod: SelectPaymentMethod.type,
                    transactionID: randomBookingIDGenerator(9, 'TRN'),
                    referenceID: randomBookingIDGenerator(9, 'REF'),
                    searchFlightData,
                    searchFlightDateData,
                  },
                  Return: {
                    bookingID: randomBookingIDGenerator(9, 'BKG'),
                    searchReturnFlightCardData,
                    transactionID: randomBookingIDGenerator(9, 'TRN'),
                    referenceID: randomBookingIDGenerator(9, 'REF'),
                    SelectReturnSeatData,
                    searchReturnFlightData,
                    searchReturnFlightDateData,
                  },
                },
              ],
            })
            .then(async () => {
              setTimeout(() => {
                // dispatch(ReturnSelectSeatActionData([]));
                dispatch(SelectSeatActionData([]));
                dispatch(DiscountDataAction({}));
                dispatch(SelectpaymentMethodAction({}));
                setcondti2(false);
              }, 2000);
            });
        } else {
          await firestore()
            .collection('AirlineSeatBookData')
            .doc('JaTwXgqSHSESiR6CDzdy')
            .update({
              AirlineSeatBookData: SeatData.map(i => {
                if (i.date == SelectDate?.date) {
                  return {
                    date: i.date,
                    day: i.day,
                    flightData: i.flightData.map(e => {
                      if (
                        e.flightData.airlineName ==
                          searchFlightCardData?.airlineName &&
                        e.flightData.lendTime ==
                          searchFlightCardData?.lendTime &&
                        e.flightData.logo == searchFlightCardData?.logo &&
                        e.flightData.pickTime ==
                          searchFlightCardData?.pickTime &&
                        e.flightData.price == searchFlightCardData?.price &&
                        e.flightData.stop == searchFlightCardData?.stop &&
                        e.flightData.stopDuration ==
                          searchFlightCardData?.stopDuration &&
                        e.flightData.totalHours ==
                          searchFlightCardData?.totalHours &&
                        e.flightData.day == searchFlightCardData?.day
                      ) {
                        return {
                          flightData: e.flightData,
                          selectSeat: [
                            ...e?.selectSeat,
                            SelectSeatData.map(a => a.seatNo),
                          ].flat(),
                        };
                      }
                      return e;
                    }),
                  };
                }
                return i;
              }),
            });

          totalPaymentList.points?.pointsUse != 0 &&
            (await firestore()
              .collection('Points')
              .doc(auth().currentUser.uid)
              .set({
                TotalPoints:
                  Number(UserPointData.TotalPoints) -
                  totalPaymentList.points.pointsUse,
                PointsHistory: [
                  {
                    title: 'points',
                    price: `-$${totalPaymentList.points.pointsUse}`,
                    date: moment(new Date()).format('MMM D,YYYY'),
                    time: new Date().toLocaleTimeString('en-IN'),
                  },
                  ...UserPointData.PointsHistory,
                ],
              }));

          const ticketId = Date.now();
          dispatch(showTicketActionData(ticketId));
          await firestore()
            .collection('SaveTicket')
            .doc(auth().currentUser.uid)
            .update({
              SaveTicket: [
                ...SaveTicketData,
                {
                  id: ticketId,
                  Departure: {
                    bookingID: randomBookingIDGenerator(9, 'BKG'),
                    searchFlightCardData,
                    contactDetails: {
                      Email: userData.Email,
                      Name: userData.Name,
                      PhoneNumber: userData.PhoneNumber,
                    },
                    totalPaymentList,
                    SelectSeatData,
                    paymentMethod: SelectPaymentMethod.type,
                    transactionID: randomBookingIDGenerator(9, 'TRN'),
                    referenceID: randomBookingIDGenerator(9, 'REF'),
                    searchFlightData,
                    searchFlightDateData,
                  },
                  Return: {},
                },
              ],
            })
            .then(async () => {
              setTimeout(() => {
                // dispatch(ReturnSelectSeatActionData([]));
                dispatch(SelectSeatActionData([]));
                dispatch(DiscountDataAction({}));
                dispatch(SelectpaymentMethodAction({}));
                setcondti2(false);
              }, 2000);
            });
        }
      } else {
        setcondti(false);
        Alert.alert('PIN is not match');
      }
    }
  };
  const getPinData = async () => {
    await firestore()
      .collection('Users')
      .onSnapshot(querySnapshot => {
        querySnapshot?.forEach(documentSnapshot => {
          if (documentSnapshot.id == auth().currentUser.uid) {
            setPinData(documentSnapshot.data().PIN);
          }
        });
      });
  };

  const getTicketData = async () => {
    await firestore()
      .collection('SaveTicket')
      .onSnapshot(querySnapshot => {
        querySnapshot?.forEach(documentSnapshot => {
          if (documentSnapshot.id == auth().currentUser.uid) {
            setSaveTicketData(documentSnapshot.data().SaveTicket);
          }
        });
      });
  };
  const getUserWalletData = async () => {
    await firestore()
      .collection('UserWallet')
      .onSnapshot(querySnapshot => {
        querySnapshot?.forEach(documentSnapshot => {
          if (documentSnapshot.id == auth().currentUser.uid) {
            setUserWalletData(documentSnapshot.data());
          }
        });
      });
  };
  const getUserPointData = async () => {
    await firestore()
      .collection('Points')
      .onSnapshot(querySnapshot => {
        querySnapshot?.forEach(documentSnapshot => {
          if (documentSnapshot.id == auth().currentUser.uid) {
            setUserPointData(documentSnapshot.data());
          }
        });
      });
  };
  const getSeatData = async () => {
    await firestore()
      .collection('AirlineSeatBookData')
      .onSnapshot(querySnapshot => {
        querySnapshot?.forEach(documentSnapshot => {
          if (documentSnapshot.id == 'JaTwXgqSHSESiR6CDzdy') {
            SetSeatData(documentSnapshot.data().AirlineSeatBookData);
          }
        });
      });
  };
  useEffect(() => {
    getPinData();
    getSeatData();
    getTicketData();
    getUserPointData();
    getUserWalletData();
  }, []);
  return (
    <View style={styles.container}>
      <CommonHeader
        headerName={'Confirm PIN'}
        navigation1={() => {
          navigation.goBack();
        }}
        onPress1={true}
        onPress2={false}
        Images1={Images.backIcon}
        Images2={null}
        cancelButtonStyle1={styles.plusIconStyle}
        Images1Color={color.white}
      />
      <View style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: fontSize(18),
            marginBottom: hp(3),
          }}>
          Enter the PIN to confirm ticket payment.
        </Text>
        <View style={styles.slide}>
          <OtpInputs
            rejectResponderTermination={condti}
            contextMenuHidden={true}
            secureTextEntry={true}
            inputStyles={styles.otpInputStyle}
            numberOfInputs={4}
            handleChange={code => checkPin(code)}
          />
        </View>
      </View>
      <Modal
        isVisible={modalVisible2}
        backdropColor="#000000"
        onBackdropPress={() => setModalVisible2(false)}>
        <View style={styles.createAlertBody}>
          {condti2 ? (
            <>
              <ActivityIndicator size="large" color={color.commonBlue} />
              <Text
                style={{
                  marginTop: hp(5),
                  fontSize: fontSize(18),
                  fontWeight: '500',
                }}>
                Processing Payment...
              </Text>
            </>
          ) : (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <LottieView
                source={require('../../helper/bookingSuccess.json')}
                autoPlay
                loop
                style={{
                  height: hp(20),
                  width: hp(20),
                }}
              />
              <Text
                style={{
                  fontSize: fontSize(20),
                  fontWeight: 'bold',
                  color: color.commonBlue,
                  marginBottom: hp(3),
                }}>
                Booking Confirmed!
              </Text>
              <Text>Congratulation! your flight ticket is Confirmed</Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible2(false);
                  navigation.navigate('Congratulation', {
                    TripType: tripType,
                    header: 'TransactionDetails',
                  });
                  // navigation.navigate('TransactionDetails');
                }}
                style={{
                  backgroundColor: color.commonBlue,
                  width: wp(70),
                  paddingVertical: hp(1.8),
                  alignItems: 'center',
                  borderRadius: 10,
                  marginTop: hp(4),
                }}>
                <Text
                  style={{
                    fontSize: fontSize(17),
                    fontWeight: 'bold',
                    color: '#fff',
                  }}>
                  View Transacation
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible2(false);

                  navigation.navigate('Congratulation', {
                    TripType: tripType,
                    header: 'TabNavigation',
                  });
                }}
                style={{
                  backgroundColor: '#0053F920',
                  width: wp(70),
                  paddingVertical: hp(1.8),
                  alignItems: 'center',
                  borderRadius: 10,
                  marginTop: hp(1),
                }}>
                <Text
                  style={{
                    fontSize: fontSize(17),
                    fontWeight: 'bold',
                    color: color.commonBlue,
                  }}>
                  Back to Home
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default ConfirmPin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  otpInputStyle: {
    backgroundColor: '#DFE1E5',
    textAlign: 'center',
    height: wp(14),
    width: wp(14),
    borderRadius: 10,
    fontSize: fontSize(20),
  },
  slide: {
    flexDirection: 'row',
    paddingHorizontal: wp(10),
  },
  createAlertBody: {
    backgroundColor: '#fff',
    paddingVertical: wp(6),
    paddingHorizontal: wp(6),
    borderRadius: 20,
    alignItems: 'center',
  },
  createAlertTitleBody: {
    alignItems: 'center',
    paddingBottom: hp(2),
    borderBottomWidth: 1,
    borderColor: '#e2e2e2',
  },
  createAlertTitle: {
    fontSize: fontSize(20),
    fontWeight: '600',
  },
  sortModalBody: {
    paddingVertical: hp(1),
    borderBottomWidth: 1,
    borderColor: '#e2e2e2',
  },
});
