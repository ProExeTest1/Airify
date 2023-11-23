import {
  Alert,
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
  PriceDetails,
  ReturnDepartureSwitch,
  TicktBookingProgressBar,
} from '../../components';
import {Images} from '../../helper/IconConstant';
import {strings} from '../../helper/Strings';
import {fontSize, hp, wp} from '../../helper/Constant';
import {color} from '../../helper/ColorConstant';
import ToggleSwitch from 'toggle-switch-react-native';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {
  DiscountDataAction,
  SelectpaymentMethodAction,
  totalPaymentListAction,
} from '../../redux/action/SelectSeatAction';
import {AlertConstant} from '../../helper/AlertConstant';

const PatmentConfirmation = ({navigation, route}) => {
  const tripType = route?.params?.TripType;

  const dispatch = useDispatch();
  const [ToggleSwitchBut1, setToggleSwitchBut1] = useState(false);
  const [WalletData, setWalletData] = useState({});
  const [ticketType, setTicketType] = useState('Departure');
  const [PointsData, setPointsData] = useState({});
  const strings = useSelector(state => state?.languageReducer?.languageObject);

  const item = useSelector(state => state.searchFlight.searchFlightCardData);
  const returnItem = useSelector(
    state => state?.searchFlight?.searchFlightReturnCardData,
  );
  const ticketPrice = parseInt(
    item?.price?.slice(1, 8)?.split(',')?.join(''),
    10,
  );
  const returbTicketPrice = parseInt(
    returnItem?.price?.slice(1, 8)?.split(',')?.join(''),
    10,
  );
  const DiscountData = useSelector(e => e?.SelectSeatData?.DiscountData);
  const searchFlightData = useSelector(e => e?.place?.searchFlightData);
  const returnSearchFlightData = useSelector(
    e => e?.searchFlight?.searchFlightReturnData,
  );
  const totalSeat = Number(searchFlightData?.passenger?.split(' ')[0]);
  const searchFlightDateData = useSelector(e => e?.date?.depatureDate).split(
    ',',
  );
  const returnSearchFlightDateData = useSelector(
    e => e?.date?.returnDate,
  ).split(',');

  const TotalPoint = Number(PointsData?.TotalPoints);
  const validPoint = ToggleSwitchBut1 ? Math.floor(TotalPoint / 100) : 0;
  const havePonts = ToggleSwitchBut1 ? TotalPoint % 100 : TotalPoint;
  const Discount = Number(DiscountData?.discountPR)
    ? Number(DiscountData?.discountPR)
    : 0;

  const PaymentMethodData = useSelector(
    e => e?.SelectSeatData?.SelectPaymentMethod,
  );

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
  const totalSeatPrice = returbTicketPrice * totalSeat;
  const payNow = () => {
    if (PaymentMethodData?.type) {
      dispatch(
        totalPaymentListAction({
          departure: {
            seat: {
              totalSeat: totalSeat,
              totalSeatPrice: ticketPrice * totalSeat,
            },
            travalInsurance: Math.round((totalSeat * ticketPrice * 2.8) / 100),
            tax: Math.round((totalSeat * ticketPrice * 1.5) / 100),
            points: {
              pointsUse: Math.round((validPoint * 100) / 2),
              havePoint: havePonts / 2,
              getPoint: (totalSeat * ticketPrice) / 2,
              usePointPrice: -Math.round(validPoint / 2),
            },
            discount: {
              ValidDiscount: DiscountData?.id ? true : false,
              discountData: DiscountData,
              useDiscountPrice:
                (Number(totalSeat) * Number(ticketPrice) * Discount) / 100,
            },
            totalPayment:
              totalSeat * ticketPrice +
              Math.round((totalSeat * ticketPrice * 2.8) / 100) +
              Math.round((totalSeat * ticketPrice * 1.5) / 100) -
              (Number(totalSeat) * Number(ticketPrice) * Number(Discount)) /
                100 -
              Number(Math.round(validPoint / 2)),
          },
          return:
            tripType !== 'Round-Trip'
              ? false
              : {
                  seat: {
                    totalSeat: totalSeat,
                    totalSeatPrice: totalSeatPrice,
                  },
                  travalInsurance: Math.round((totalSeatPrice * 2.8) / 100),

                  tax: Math.round((totalSeatPrice * 1.5) / 100),

                  points: {
                    pointsUse: Math.round((validPoint * 100) / 2),
                    havePoint: havePonts / 2,
                    getPoint: totalSeatPrice / 2,
                    usePointPrice: -Math.round(validPoint / 2),
                  },
                  discount: {
                    ValidDiscount: DiscountData?.id ? true : false,
                    discountData: DiscountData,
                    useDiscountPrice: (Number(totalSeatPrice) * Discount) / 100,
                  },
                  totalPayment: Math.round(
                    totalSeatPrice +
                      Math.round((totalSeatPrice * 2.8) / 100) +
                      Math.round((totalSeatPrice * 1.5) / 100) -
                      (Number(totalSeatPrice) * Discount) / 100 -
                      Math.round(validPoint / 2),
                  ),
                },
        }),
      );
      navigation?.navigate('ConfirmPin', {TripType: tripType});
    } else {
      AlertConstant(strings.please_select_payment_method);
    }
  };
  useEffect(() => {
    getFirebaseWalletData();
  }, []);
  useEffect(() => {
    getFirebaseData();
  }, []);
  return (
    <View style={styles.headerViewStyle}>
      <CommonHeader
        headerName={strings?.payment_confirm}
        navigation1={() => {
          navigation.goBack();
          dispatch(DiscountDataAction({}));
          dispatch(SelectpaymentMethodAction({}));
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

      <View style={styles.ScrollBody}>
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <FlightDetailsCard
            searchFlightData={searchFlightData}
            searchFlightDateData={searchFlightDateData}
            item={item}
          />
          {tripType === 'Round-Trip' ? (
            <FlightDetailsCard
              searchFlightData={returnSearchFlightData}
              searchFlightDateData={returnSearchFlightDateData}
              item={returnItem}
            />
          ) : null}
          <View style={styles.boxBody}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('PaymentMethod', {TripType: tripType})
              }>
              <View style={[styles.boxTitleBody, {alignItems: 'center'}]}>
                <Image style={styles.boxIcon} source={Images?.payment}></Image>
                <Text style={styles.boxTitle}>{strings.payment_method}</Text>
                <Image style={styles.skipIcon} source={Images?.forward}></Image>
              </View>
              <View style={styles.StopsButBody}></View>
            </TouchableOpacity>
            {PaymentMethodData?.type && (
              <View style={styles.discountBody}>
                <View style={{flexDirection: 'row', flex: 1}}>
                  <View style={styles.PaymentMethodBody}>
                    <Image
                      style={styles.PaymentMethodIcon}
                      source={Images.wallet}
                    />
                    <Text style={styles.PaymentMethodName}>
                      {strings.My_Wallet}
                    </Text>
                    <Text style={styles.walletPraice}>
                      ${WalletData?.wallet}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>
          <View style={styles.boxBody}>
            <View style={styles.boxTitleBody}>
              <Image style={styles.boxIcon} source={Images.coinsIcon}></Image>
              <View style={[styles.boxTitle, {paddingEnd: wp(5)}]}>
                <Text
                  style={
                    styles.boxTitle
                  }>{`${strings.you_have} ${PointsData?.TotalPoints} ${strings.points}`}</Text>
                <Text style={{marginTop: hp(1), color: color.black}}>
                  {`${strings.you_get} ${ticketPrice / 2} ${
                    strings.point_after_booking
                  }`}
                </Text>
              </View>
              <View>
                <ToggleSwitch
                  isOn={ToggleSwitchBut1}
                  size="medium"
                  onColor={color.commonBlue}
                  onToggle={isOn => {
                    Number(PointsData?.TotalPoints) > 100
                      ? setToggleSwitchBut1(isOn)
                      : AlertConstant(strings.not_valid_points);
                  }}
                />
              </View>
            </View>
            <View style={styles.StopsButBody}></View>
          </View>

          <View style={styles.boxBody}>
            <TouchableOpacity
              onPress={() =>
                navigation?.navigate('UseDiscountVoucher', {TripType: tripType})
              }>
              <View style={[styles.boxTitleBody, {alignItems: 'center'}]}>
                <Image style={styles.boxIcon} source={Images?.discount}></Image>
                <Text style={styles.boxTitle}>{strings.discountVoucher}</Text>
                <Image style={styles.skipIcon} source={Images?.forward}></Image>
              </View>
              <View style={styles.StopsButBody}></View>
            </TouchableOpacity>
            {DiscountData?.id && (
              <View style={styles.discountBody}>
                <View style={styles.discountBut}>
                  <Text style={styles.discountText}>{DiscountData?.id}</Text>
                  <TouchableOpacity
                    onPress={() => dispatch(DiscountDataAction({}))}
                    style={{marginStart: wp(4)}}>
                    <Text style={styles.discountText}>X</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
          <PriceDetails
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
          />
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

export default PatmentConfirmation;

const styles = StyleSheet.create({
  headerViewStyle: {
    flex: 1,
  },
  bottomButtonBody: {
    backgroundColor: '#fff',
    paddingHorizontal: wp(6),
    paddingTop: hp(2),
    paddingBottom: hp(2),
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
    backgroundColor: '#fff',
    paddingHorizontal: wp(4),
    borderRadius: 10,
    marginBottom: hp(2),
  },
  boxTitleBody: {
    paddingVertical: hp(2),
    flexDirection: 'row',
  },
  boxTitle: {
    fontSize: fontSize(17),
    color: color.black,
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
  },
  skipIcon: {
    height: wp(4),
    width: wp(4),
  },
  discountBody: {
    paddingVertical: hp(2),
    borderTopWidth: 1,
    borderColor: color.grayLight,
    alignItems: 'flex-start',
    flex: 1,
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
    backgroundColor: '#fff',
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
