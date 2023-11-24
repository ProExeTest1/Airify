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
import {
  RescheduleCardData,
  RescheduleDateData,
  RescheduleFilterData,
  RescheduleNormalDateData,
  ReschedulePaymentMethodAction,
  RescheduleSelectSeatData,
  RescheduleTotalPaymentListAction,
  rescheduleSelectNewCardData,
} from '../../redux/action/RescheduleAction';

const RescheduleConfirmPin = ({navigation, route}) => {
  const [pinData, setPinData] = useState('');
  const [condti, setcondti] = useState(true);
  const [condti2, setcondti2] = useState(true);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [SaveTicketData, setSaveTicketData] = useState([]);
  const [UserWalletData, setUserWalletData] = useState({});
  const [UserPointData, setUserPointData] = useState({});
  const [SeatData, SetSeatData] = useState([]);

  const oldTripData = useSelector(
    e => e?.rescheduleFlightdata?.rescheduleCardData,
  );
  const searchFlightCardData = useSelector(
    state => state?.rescheduleFlightdata?.rescheduleSelectNewCard,
  );
  const userData = useSelector(state => state?.userData?.userdata);
  const SelectSeatData = useSelector(
    e => e.rescheduleFlightdata.SelectSeatData,
  );
  const totalPaymentList = useSelector(
    e => e?.rescheduleFlightdata?.RescheduletotalPaymentList,
  );
  const SelectPaymentMethod = useSelector(
    e => e?.rescheduleFlightdata?.ReschedulePaymentMethodData,
  );
  const searchFlightData = useSelector(
    e => e?.rescheduleFlightdata?.rescheduleCardData.searchFlightData,
  );
  const searchFlightDateData = useSelector(
    e => e?.rescheduleFlightdata?.rescheduleDateData,
  ).split(',');
  const SelectDate = useSelector(
    e => e?.rescheduleFlightdata?.rescheduleNormalDateData,
  );
  const dispatch = useDispatch();

  console.log('SelectDate', SelectSeatData);
  const checkPin = async pin => {
    if (pin.length == 4) {
      if (pin == Number(pinData)) {
        setcondti2(true);
        setModalVisible2(true);
        await firestore()
          .collection('UserWallet')
          .doc(auth()?.currentUser?.uid)
          .update({
            wallet:
              totalPaymentList?.rescheduletotalPayment
                ?.toString()
                .slice(0, 1) == '-'
                ? Number(UserWalletData?.wallet) +
                  Number(
                    totalPaymentList?.rescheduletotalPayment
                      ?.toString()
                      .slice(1),
                  )
                : Number(UserWalletData?.wallet) -
                  Number(totalPaymentList?.rescheduletotalPayment),

            transactionHistory: [
              {
                title: 'Payment Success',
                price: `$${
                  totalPaymentList?.rescheduletotalPayment
                    .toString()
                    .slice(0, 1) == '-'
                    ? '+'
                    : '-'
                }${
                  totalPaymentList?.rescheduletotalPayment
                    ?.toString()
                    ?.slice(0, 1) == '-'
                    ? Number(
                        totalPaymentList?.rescheduletotalPayment
                          ?.toString()
                          ?.slice(1),
                      )
                    : Number(totalPaymentList?.rescheduletotalPayment)
                }`,
                date: moment(new Date()).format('MMM D,YYYY'),
                time: new Date().toLocaleTimeString('en-IN'),
              },
              ...UserWalletData?.transactionHistory,
            ],
          });

        await firestore()
          .collection('AirlineSeatBookData')
          .doc('JaTwXgqSHSESiR6CDzdy')
          .update({
            AirlineSeatBookData: SeatData?.map(i => {
              if (
                i.date ==
                moment(
                  oldTripData?.searchFlightDateData[1],
                  'MMM DD YYYY',
                ).format('D/M/YYYY')
              ) {
                return {
                  date: i.date,
                  day: i.day,
                  flightData: i?.flightData?.map(e => {
                    if (
                      e?.flightData?.airlineName ==
                        oldTripData?.searchFlightCardData?.airlineName &&
                      e?.flightData?.lendTime ==
                        oldTripData?.searchFlightCardData?.lendTime &&
                      e?.flightData?.logo ==
                        oldTripData?.searchFlightCardData?.logo &&
                      e?.flightData?.pickTime ==
                        oldTripData?.searchFlightCardData?.pickTime &&
                      e?.flightData?.price ==
                        oldTripData?.searchFlightCardData?.price &&
                      e?.flightData?.stop ==
                        oldTripData?.searchFlightCardData?.stop &&
                      e?.flightData?.stopDuration ==
                        oldTripData?.searchFlightCardData?.stopDuration &&
                      e?.flightData?.totalHours ==
                        oldTripData?.searchFlightCardData?.totalHours &&
                      e?.flightData?.day ==
                        oldTripData?.searchFlightCardData?.day
                    ) {
                      return {
                        flightData: e.flightData,
                        selectSeat: [
                          e?.selectSeat.filter(i => {
                            oldTripData?.SelectSeatData?.some(
                              a => a?.seatNo == i,
                            );
                          }),
                          SelectSeatData.map(i => i.seatNo),
                        ].flat(),
                      };
                    }
                    return e;
                  }),
                };
              }
              if (i.date == SelectDate?.date) {
                return {
                  date: i.date,
                  day: i.day,
                  flightData: i.flightData?.map(e => {
                    if (
                      e?.flightData?.airlineName ==
                        searchFlightCardData?.airlineName &&
                      e?.flightData?.lendTime ==
                        searchFlightCardData?.lendTime &&
                      e?.flightData?.logo == searchFlightCardData?.logo &&
                      e?.flightData?.pickTime ==
                        searchFlightCardData?.pickTime &&
                      e?.flightData?.price == searchFlightCardData?.price &&
                      e?.flightData?.stop == searchFlightCardData?.stop &&
                      e?.flightData?.stopDuration ==
                        searchFlightCardData?.stopDuration &&
                      e?.flightData?.totalHours ==
                        searchFlightCardData?.totalHours &&
                      e?.flightData?.day == searchFlightCardData?.day
                    ) {
                      return {
                        flightData: e?.flightData,
                        selectSeat: [
                          ...e?.selectSeat,
                          SelectSeatData?.map(a => a?.seatNo),
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

        dispatch(showTicketActionData(oldTripData?.id));
        await firestore()
          .collection('SaveTicket')
          .doc(auth()?.currentUser?.uid)
          .update({
            SaveTicket: SaveTicketData?.map((item, index) => {
              if (item?.id == oldTripData?.id) {
                console.log(item);
                return {
                  Departure:
                    oldTripData.type == 'Departure'
                      ? {
                          bookingID: randomBookingIDGenerator(9, 'BKG'),
                          searchFlightCardData,
                          contactDetails: {
                            Email: userData?.Email,
                            Name: userData?.Name,
                            PhoneNumber: userData?.PhoneNumber,
                          },
                          totalPaymentList: totalPaymentList,
                          SelectSeatData: SelectSeatData,
                          paymentMethod: SelectPaymentMethod.type,
                          transactionID: randomBookingIDGenerator(9, 'TRN'),
                          referenceID: randomBookingIDGenerator(9, 'REF'),
                          searchFlightData,
                          searchFlightDateData,
                          id: item.id,
                          type: 'Departure',
                        }
                      : item.Departure,
                  Return:
                    oldTripData.type == 'Return'
                      ? {
                          bookingID: randomBookingIDGenerator(9, 'BKG'),
                          searchFlightCardData,
                          contactDetails: {
                            Email: userData?.Email,
                            Name: userData?.Name,
                            PhoneNumber: userData?.PhoneNumber,
                          },
                          totalPaymentList: totalPaymentList,
                          SelectSeatData: SelectSeatData,
                          paymentMethod: SelectPaymentMethod?.type,
                          transactionID: randomBookingIDGenerator(9, 'TRN'),
                          referenceID: randomBookingIDGenerator(9, 'REF'),
                          searchFlightData,
                          searchFlightDateData,
                          id: item.id,
                          type: 'Return',
                        }
                      : item.Return,

                  id: item.id,
                };
              }
              return item;
            }),
          })
          .then(async () => {
            setTimeout(() => {
              RescheduleCardData(),
                rescheduleSelectNewCardData(),
                RescheduleFilterData(),
                RescheduleDateData(),
                RescheduleNormalDateData(),
                RescheduleSelectSeatData(),
                RescheduleTotalPaymentListAction(),
                ReschedulePaymentMethodAction(),
                setcondti2(false);
            }, 2000);
          });
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
          if (documentSnapshot?.id == auth()?.currentUser?.uid) {
            setPinData(documentSnapshot?.data()?.PIN);
          }
        });
      });
  };

  const getTicketData = async () => {
    await firestore()
      .collection('SaveTicket')
      .onSnapshot(querySnapshot => {
        querySnapshot?.forEach(documentSnapshot => {
          if (documentSnapshot?.id == auth()?.currentUser?.uid) {
            setSaveTicketData(documentSnapshot?.data()?.SaveTicket);
          }
        });
      });
  };
  const getUserWalletData = async () => {
    await firestore()
      .collection('UserWallet')
      .onSnapshot(querySnapshot => {
        querySnapshot?.forEach(documentSnapshot => {
          if (documentSnapshot?.id == auth()?.currentUser?.uid) {
            setUserWalletData(documentSnapshot?.data());
          }
        });
      });
  };
  const getUserPointData = async () => {
    await firestore()
      .collection('Points')
      .onSnapshot(querySnapshot => {
        querySnapshot?.forEach(documentSnapshot => {
          if (documentSnapshot?.id == auth()?.currentUser?.uid) {
            setUserPointData(documentSnapshot?.data());
          }
        });
      });
  };
  const getSeatData = async () => {
    await firestore()
      .collection('AirlineSeatBookData')
      .onSnapshot(querySnapshot => {
        querySnapshot?.forEach(documentSnapshot => {
          if (documentSnapshot?.id == 'JaTwXgqSHSESiR6CDzdy') {
            SetSeatData(documentSnapshot?.data()?.AirlineSeatBookData);
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
  const color = useSelector(state => state?.themereducer?.colorTheme);
  const styles = ThemeStyle(color);
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
        Images1Color={'#fff'}
      />
      <View style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: fontSize(18),
            marginBottom: hp(3),
            color: color.black,
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
                  color: color.black,
                }}>
                Processing Payment...
              </Text>
            </>
          ) : (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <LottieView
                source={
                  color.white == '#fff'
                    ? require('../../helper/bookingSuccess.json')
                    : require('../../helper/bookingSuccessDark.json')
                }
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
              <Text style={{color: color.black}}>
                Congratulation! your flight ticket is Confirmed
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible2(false);
                  navigation.navigate('Congratulation', {
                    header: 'TransactionDetails',
                    type: 'Reschedule',
                    // tripType: 'One-way',
                  });
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

export default RescheduleConfirmPin;

const ThemeStyle = color =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.onBoardingBgColor,
    },
    otpInputStyle: {
      backgroundColor: color.grayLight,
      textAlign: 'center',
      height: wp(14),
      width: wp(14),
      borderRadius: 10,
      fontSize: fontSize(20),
      color: color.black,
    },
    slide: {
      flexDirection: 'row',
      paddingHorizontal: wp(10),
    },
    createAlertBody: {
      backgroundColor: color.white,
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
    textStyle: {
      color: color.black,
    },
  });
