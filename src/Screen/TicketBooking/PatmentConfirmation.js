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
import {DiscountDataAction} from '../../redux/action/SelectSeatAction';
const PatmentConfirmation = ({navigation}) => {
  const dispatch = useDispatch();
  const [ToggleSwitchBut1, setToggleSwitchBut1] = useState(false);
  const [WalletData, setWalletData] = useState({});

  const [PointsData, setPointsData] = useState({});
  const item = useSelector(state => state.searchFlight.searchFlightCardData);
  const ticketPrice = parseInt(item?.price.slice(1, 8).split(',').join(''), 10);
  const DiscountData = useSelector(e => e.SelectSeatData.DiscountData);
  const PaymentMethodData = useSelector(
    e => e.SelectSeatData.SelectPaymentMethod,
  );
  console.log('>>>>>>>>>>>>>', PaymentMethodData);
  const getFirebaseData = async () => {
    await firestore()
      .collection('Points')
      .onSnapshot(querySnapshot => {
        const users = [];

        querySnapshot.forEach(documentSnapshot => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        users.filter(item => {
          if (item.key == auth().currentUser.uid) {
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

        querySnapshot.forEach(documentSnapshot => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        console.log(users);
        users.filter(item => {
          if (item.key == auth().currentUser.uid) {
            setWalletData(item);
            return true;
          } else {
            return true;
          }
        });
      });
  };
  useEffect(() => {
    getFirebaseWalletData();
  }, []);
  useEffect(() => {
    getFirebaseData();
  }, []);
  const TotalPoint = PointsData.TotalPoints;
  const validPoint = ToggleSwitchBut1 ? Math.floor(TotalPoint / 100) : 0;
  const havePonts = TotalPoint % 100;
  return (
    <View style={styles.headerViewStyle}>
      <CommonHeader
        headerName={'Payment Confirmaion'}
        navigation1={() => {
          navigation.goBack();
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
          <FlightDetailsCard item={item} />
          <View style={styles.boxBody}>
            <TouchableOpacity
              onPress={() => navigation.navigate('PaymentMethod')}>
              <View style={[styles.boxTitleBody, {alignItems: 'center'}]}>
                <Image style={styles.boxIcon} source={Images.payment}></Image>
                <Text style={styles.boxTitle}>Payment Method</Text>
                <Image style={styles.skipIcon} source={Images.forward}></Image>
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
                    <Text style={styles.PaymentMethodName}>My Wallet</Text>
                    <Text style={styles.walletPraice}>
                      ${WalletData.wallet}
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
                  }>{`You Have ${PointsData.TotalPoints} Points`}</Text>
                <Text style={{marginTop: hp(1)}}>
                  {`100 points equals $1. You will get ${
                    ticketPrice / 2
                  } points after this booking`}
                </Text>
              </View>
              <View>
                <ToggleSwitch
                  isOn={ToggleSwitchBut1}
                  size="medium"
                  onColor={color.commonBlue}
                  onToggle={isOn => {
                    Number(PointsData.TotalPoints) > 100
                      ? setToggleSwitchBut1(isOn)
                      : Alert.alert(
                          'your points is not valid please increase your point',
                        );
                  }}
                />
              </View>
            </View>
            <View style={styles.StopsButBody}></View>
          </View>

          <View style={styles.boxBody}>
            <TouchableOpacity
              onPress={() => navigation.navigate('UseDiscountVoucher')}>
              <View style={[styles.boxTitleBody, {alignItems: 'center'}]}>
                <Image style={styles.boxIcon} source={Images.discount}></Image>
                <Text style={styles.boxTitle}>Dicouts / Voucher</Text>
                <Image style={styles.skipIcon} source={Images.forward}></Image>
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
            ToggleSwitchBut1={ToggleSwitchBut1}
            TotalPoints={PointsData.TotalPoints}
          />
        </ScrollView>
      </View>
      <View style={styles.bottomButtonBody}>
        <TouchableOpacity onPress={() => {}} style={styles.okButton}>
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
    fontWeight: 'bold',
    flex: 1,
  },
  boxVelue: {
    fontSize: fontSize(18),
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
  },
  walletPraice: {
    fontSize: fontSize(18),
    fontWeight: '600',
    marginEnd: wp(3),
    color: color.commonBlue,
  },
});
