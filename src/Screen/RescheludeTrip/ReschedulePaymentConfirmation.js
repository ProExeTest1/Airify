import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  CommonHeader,
  FlightDetailsCard,
  ReschedulePriceDetails,
  RescheduleSwitch,
  TicktBookingProgressBar,
} from '../../components';
import {Images} from '../../helper/IconConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import ToggleSwitch from 'toggle-switch-react-native';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {
  DiscountDataAction,
  SelectpaymentMethodAction,
} from '../../redux/action/SelectSeatAction';
import {AlertConstant} from '../../helper/AlertConstant';
import {
  ReschedulePaymentMethodAction,
  RescheduleTotalPaymentListAction,
} from '../../redux/action/RescheduleAction';

const ReschedulePaymentConfirmation = ({navigation, route}) => {
  const tripType = route?.params?.TripType;

  const dispatch = useDispatch();
  const [ToggleSwitchBut1, setToggleSwitchBut1] = useState(false);
  const [WalletData, setWalletData] = useState({});
  const [ticketType, setTicketType] = useState('Old Trip');
  const [PointsData, setPointsData] = useState({});
  const strings = useSelector(state => state?.languageReducer?.languageObject);

  const item = useSelector(state =>
    ticketType === 'Old Trip'
      ? state?.rescheduleFlightdata?.rescheduleCardData?.searchFlightCardData
      : state?.rescheduleFlightdata?.rescheduleSelectNewCard,
  );
  const oldTripData = useSelector(
    e => e?.rescheduleFlightdata?.rescheduleCardData,
  );
  const newTripData = useSelector(
    e => e?.rescheduleFlightdata?.rescheduleSelectNewCard,
  );
  const searchFlightData = useSelector(e =>
    ticketType === 'Old Trip'
      ? e?.rescheduleFlightdata?.rescheduleCardData?.searchFlightData
      : e?.rescheduleFlightdata?.rescheduleCardData?.searchFlightData,
  );

  const searchFlightDateData = useSelector(e =>
    ticketType === 'Old Trip'
      ? e?.rescheduleFlightdata?.rescheduleCardData?.searchFlightDateData?.toString()
      : e?.rescheduleFlightdata?.rescheduleDateData,
  ).split(',');
  const ticketPrice = parseInt(
    item?.price?.slice(1, 8)?.split(',')?.join(''),
    10,
  );

  const PaymentMethodData = useSelector(
    e => e?.rescheduleFlightdata?.ReschedulePaymentMethodData,
  );
  const totalSeat = Number(searchFlightData?.passenger?.split(' ')[0]);

  const TotalPoint = Number(PointsData.TotalPoints);
  const validPoint = ToggleSwitchBut1 ? Math.floor(TotalPoint / 100) : 0;
  const havePonts = ToggleSwitchBut1 ? TotalPoint % 100 : TotalPoint;

  const getFirebaseData = async () => {
    await firestore()
      .collection('Points')
      .onSnapshot(querySnapshot => {
        const users = [];

        querySnapshot?.forEach(documentSnapshot => {
          users.push({
            ...documentSnapshot?.data(),
            key: documentSnapshot?.id,
          });
        });
        users.filter(item => {
          if (item?.key == auth()?.currentUser?.uid) {
            setPointsData(item);
            return true;
          } else {
            return true;
          }
        });
      });
  };
  const getFirebaseWalletData = async () => {
    await firestore()
      .collection('UserWallet')
      .onSnapshot(querySnapshot => {
        const users = [];

        querySnapshot?.forEach(documentSnapshot => {
          users.push({
            ...documentSnapshot?.data(),
            key: documentSnapshot?.id,
          });
        });
        users?.filter(item => {
          if (item?.key == auth()?.currentUser?.uid) {
            setWalletData(item);
            return true;
          } else {
            return true;
          }
        });
      });
  };
  const totalSeatPrice =
    Number(newTripData?.price.replace(',', '').slice(1)) * totalSeat;
  const payNow = () => {
    if (ticketType === 'Old Trip') {
      setTicketType('New Trip');
    } else if (PaymentMethodData?.type) {
      dispatch(
        RescheduleTotalPaymentListAction({
          seat: {
            totalSeat: totalSeat,
            totalSeatPrice: totalSeatPrice,
          },
          travalInsurance: Math.round((totalSeatPrice * 2.8) / 100),

          tax: Math.round((totalSeatPrice * 1.5) / 100),

          points: {
            pointsUse: Math.round(validPoint * 100),
            havePoint: havePonts,
            getPoint: totalSeatPrice / 2,
            usePointPrice: -Math.round(validPoint),
          },
          discount: {
            ValidDiscount: false,
            discountData: {},
            useDiscountPrice: 0,
          },
          totalPayment: Math.round(
            totalSeatPrice +
              Math.round((totalSeatPrice * 2.8) / 100) +
              Math.round((totalSeatPrice * 1.5) / 100),
          ),
          rescheduletotalPayment: Math.round(
            totalSeatPrice +
              Math.round((totalSeatPrice * 2.8) / 100) +
              Math.round((totalSeatPrice * 1.5) / 100) -
              oldTripData?.totalPaymentList?.totalPayment,
          ),
        }),
      );
      navigation?.navigate('RescheduleConfirmPin');
    } else {
      AlertConstant(strings?.please_select_payment_method);
    }
  };
  useEffect(() => {
    getFirebaseWalletData();
  }, []);
  useEffect(() => {
    getFirebaseData();
  }, []);
  const color = useSelector(state => state?.themereducer?.colorTheme);
  const styles = ThemeStyle(color);
  return (
    <View style={styles.headerViewStyle}>
      <CommonHeader
        headerName={'Payment Confirmaion'}
        navigation1={() => {
          navigation.goBack();
          dispatch(DiscountDataAction({}));
          dispatch(SelectpaymentMethodAction({}));
          dispatch(ReschedulePaymentMethodAction({}));
        }}
        navigation2={() => {}}
        Images1Color={'#fff'}
        Images2Color={null}
        onPress1={true}
        onPress2={false}
        Images1={Images.backIcon}
        Images2={null}
      />
      <TicktBookingProgressBar progress={2}></TicktBookingProgressBar>
      <RescheduleSwitch
        onPress1={() => setTicketType('Old Trip')}
        onPress2={() => setTicketType('New Trip')}
        ticketType={ticketType}
      />

      <View style={styles.ScrollBody}>
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <FlightDetailsCard
            searchFlightData={searchFlightData}
            searchFlightDateData={searchFlightDateData}
            item={item}
          />
          <View style={styles.boxBody}>
            <TouchableOpacity
              onPress={() =>
                ticketType !== 'Old Trip' &&
                navigation.navigate('PaymentMethod', {
                  TripType: tripType,
                  type: 'Reschedule',
                  payment: Number(
                    totalSeatPrice +
                      Math.round((totalSeatPrice * 2.8) / 100) +
                      Math.round((totalSeatPrice * 1.5) / 100) -
                      oldTripData?.totalPaymentList?.totalPayment,
                  ),
                })
              }>
              <View style={[styles.boxTitleBody, {alignItems: 'center'}]}>
                <Image style={styles.boxIcon} source={Images?.payment}></Image>
                <Text style={styles.boxTitle}>{strings?.Payment_Method}</Text>
                <Image style={styles.skipIcon} source={Images?.forward}></Image>
              </View>
              <View style={styles.StopsButBody}></View>
            </TouchableOpacity>
            {(PaymentMethodData?.type || ticketType === 'Old Trip') && (
              <View style={styles.discountBody}>
                <View style={{flexDirection: 'row', flex: 1}}>
                  <View style={styles.PaymentMethodBody}>
                    <Image
                      style={styles.PaymentMethodIcon}
                      source={Images.wallet}
                    />
                    <Text style={styles.PaymentMethodName}>
                      {strings?.My_Wallet}
                    </Text>
                    {ticketType !== 'Old Trip' && (
                      <Text style={styles.walletPraice}>
                        ${WalletData?.wallet}
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            )}
          </View>
          {ticketType === 'Old Trip' ? (
            <View style={styles.boxBody}>
              <View style={styles.boxTitleBody}>
                <Image style={styles.boxIcon} source={Images.coinsIcon}></Image>
                <View style={[styles.boxTitle, {paddingEnd: wp(5)}]}>
                  <Text style={styles.boxTitle}>{`${
                    strings?.you_have
                  } ${Math.round(
                    oldTripData?.totalPaymentList?.points?.pointsUse +
                      oldTripData?.totalPaymentList?.points?.havePoint,
                  )} Points`}</Text>
                  <Text style={{marginTop: hp(1), color: color.black}}>
                    {strings?.you_get}{' '}
                    {oldTripData?.totalPaymentList?.points?.getPoint}{' '}
                    {strings?.point_after_booking}
                  </Text>
                </View>
                <View>
                  <ToggleSwitch
                    isOn={
                      ticketType === 'Old Trip'
                        ? oldTripData?.totalPaymentList?.points?.pointsUse !== 0
                        : ToggleSwitchBut1
                    }
                    size="medium"
                    onColor={color.commonBlue}
                    offColor={color.availableSeatColor}
                    onToggle={isOn => {
                      ticketType === 'Old Trip'
                        ? null
                        : Number(PointsData?.TotalPoints) > 100
                        ? setToggleSwitchBut1(isOn)
                        : AlertConstant(strings?.not_valid_points);
                    }}
                  />
                </View>
              </View>
              <View style={styles.StopsButBody}></View>
            </View>
          ) : null}

          {ticketType === 'Old Trip' &&
            oldTripData?.totalPaymentList?.discount?.ValidDiscount && (
              <View style={styles.boxBody}>
                <TouchableOpacity
                  onPress={() => {
                    ticketType !== 'Old Trip' &&
                      navigation?.navigate('UseDiscountVoucher', {
                        TripType: tripType,
                        type: 'Reschedule',
                      });
                  }}>
                  <View style={[styles.boxTitleBody, {alignItems: 'center'}]}>
                    <Image
                      style={styles.boxIcon}
                      source={Images?.discount}></Image>
                    <Text style={styles.boxTitle}>
                      {strings?.discountVoucher}{' '}
                    </Text>
                    <Image
                      style={styles.skipIcon}
                      source={Images?.forward}></Image>
                  </View>
                  <View style={styles.StopsButBody}></View>
                </TouchableOpacity>
                <View style={styles.discountBody}>
                  <View style={styles.discountBut}>
                    <Text style={styles.discountText}>
                      {
                        oldTripData?.totalPaymentList?.discount?.discountData
                          ?.id
                      }
                    </Text>
                    <TouchableOpacity style={{marginStart: wp(4)}}>
                      <Text style={styles.discountText}>X</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
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
            DiscountData={false}
            TotalPoints={PointsData.TotalPoints}
            ToggleSwitchBut1={ToggleSwitchBut1}
          />
          {/* <PriceDetails
            item={item}
            totalPassenger={Number(searchFlightData?.passenger?.split(' ')[0])}
            ticketPrice={ticketPrice}
            totalSeat={totalSeat}
            ToggleSwitchBut1={ToggleSwitchBut1}
            TotalPoints={PointsData.TotalPoints}
            isReturn={tripType}
            returnTicketPrice={returbTicketPrice}
            returnItem={returnItem}
            DiscountData={DiscountData}
          /> */}
        </ScrollView>
      </View>
      <View style={styles.bottomButtonBody}>
        <TouchableOpacity
          onPress={() => {
            payNow();
          }}
          style={styles.okButton}>
          <Text style={styles.okButtonText}>{strings.payNow}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReschedulePaymentConfirmation;

const ThemeStyle = color =>
  StyleSheet.create({
    headerViewStyle: {
      flex: 1,
      backgroundColor: color.bgColor,
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
    ScrollBody: {
      flex: 1,
      paddingHorizontal: wp(6),
      paddingTop: hp(3),
    },
    boxBody: {
      backgroundColor: color.white,
      paddingHorizontal: wp(4),
      borderRadius: 10,
      marginBottom: hp(2),
    },
    boxTitleBody: {
      paddingVertical: hp(2),
      flexDirection: 'row',
    },
    boxTitle: {
      color: color.black,
      fontSize: fontSize(17),
      fontWeight: 'bold',
      flex: 1,
    },
    boxVelue: {
      fontSize: fontSize(18),
      color: color.black,
    },
    StopsButBody: {
      // paddingVertical: hp(1.5),
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    StopsBut: {
      backgroundColor: '#f2f2f2',
      borderWidth: 2,
      borderRadius: 10,
      paddingVertical: hp(1.3),
      width: wp(23.5),
      alignItems: 'center',
      marginEnd: wp(2.7),
    },
    boxIcon: {
      height: wp(6),
      width: wp(6),
      marginEnd: wp(4),
      tintColor: color.black,
    },
    skipIcon: {
      height: wp(4),
      width: wp(4),
      tintColor: color.black,
    },
    discountBody: {
      paddingVertical: hp(2),
      borderTopWidth: 1,
      borderColor: color.grey,
      alignItems: 'flex-start',
      flex: 1,
      backgroundColor: color.white,
    },
    discountBut: {
      backgroundColor: color.commonBlue,
      paddingVertical: hp(1.5),
      paddingHorizontal: wp(6),
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 200,
    },
    discountText: {
      color: '#fff',
      fontSize: fontSize(17),
      fontWeight: '500',
    },
    PaymentMethodBody: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 10,
    },
    PaymentMethodIcon: {
      height: wp(8),
      width: wp(8),
      tintColor: color.commonBlue,
      marginEnd: wp(4),
    },
    PaymentMethodName: {
      flex: 1,
      fontSize: fontSize(18),
      fontWeight: '600',
      color: color.black,
    },
    walletPraice: {
      fontSize: fontSize(18),
      fontWeight: '600',
      marginEnd: wp(3),
      color: color.commonBlue,
    },
  });
