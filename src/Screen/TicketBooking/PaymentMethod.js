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
import {CommonHeader} from '../../components';
import {strings} from '../../helper/Strings';
import {Images} from '../../helper/IconConstant';

import {fontSize, hp, wp} from '../../helper/Constant';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {SelectpaymentMethodAction} from '../../redux/action/SelectSeatAction';
import {ReschedulePaymentMethodAction} from '../../redux/action/RescheduleAction';
import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
import {AlertConstant} from '../../helper/AlertConstant';

const PaymentMethod = ({navigation, route}) => {
  const tripType = route?.params?.TripType;
  const typeReschedule = route?.params?.type;
  const typePaymeta = route?.params?.payment; //Reschedule
  const dispatch = useDispatch();
  const [WalletData, setWalletData] = useState({});
  const [selectOpc, setSelectOpc] = useState({});
  const strings = useSelector(state => state?.languageReducer?.languageObject);

  const item = useSelector(state =>
    typeReschedule === 'Reschedule'
      ? state?.rescheduleFlightdata?.rescheduleCardData?.searchFlightCardData
      : state.searchFlight.searchFlightCardData,
  );
  const searchFlightData = useSelector(e =>
    typeReschedule === 'Reschedule'
      ? e?.rescheduleFlightdata?.rescheduleCardData.searchFlightData
      : e?.place?.searchFlightData,
  );
  const returnItem = useSelector(
    state => state?.searchFlight?.searchFlightReturnCardData,
  );
  const totalSeat = Number(searchFlightData.passenger.split(' ')[0]);
  const ticketPrice = parseInt(
    item?.price?.slice(1, 8)?.split(',')?.join(''),
    10,
  );
  const returbTicketPrice = parseInt(
    returnItem?.price?.slice(1, 8)?.split(',')?.join(''),
    10,
  );
  const totalSeatPrice = (ticketPrice + returbTicketPrice) * totalSeat;

  const dataForTurnary =
    typeReschedule == 'Reschedule'
      ? typePaymeta <= WalletData?.wallet
      : tripType === 'Round-Trip'
      ? totalSeatPrice +
          Math.round((totalSeatPrice * 2.8) / 100) +
          Math.round((totalSeatPrice * 1.5) / 100) <=
        WalletData?.wallet
      : totalSeat * ticketPrice +
          Math.round((totalSeat * ticketPrice * 2.8) / 100) +
          Math.round((totalSeat * ticketPrice * 1.5) / 100) <=
        WalletData?.wallet;

  const setDataFunction = () => {
    if (dataForTurnary) {
      dispatch(
        typeReschedule == 'Reschedule'
          ? ReschedulePaymentMethodAction(selectOpc)
          : SelectpaymentMethodAction(selectOpc),
      );
      typeReschedule == 'Reschedule'
        ? navigation.goBack()
        : navigation.navigate('PaymentConfirmation', {TripType: tripType});
    } else {
      BookingUpdateNotification();
      navigation.navigate('TopUp', {TripType: tripType});
    }
  };
  const getFirebaseData = async () => {
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
        users.filter(item => {
          if (item?.key == auth()?.currentUser?.uid) {
            setWalletData(item);
            return true;
          } else {
            return true;
          }
        });
      });
  };
  useEffect(() => {
    getFirebaseData();
  }, []);

  const BookingUpdateNotification = async () => {
    await firestore()
      .collection('Users')
      .doc(auth().currentUser.uid)
      .get()
      .then(i => {
        let users = i.data()?.NotificationList?.map(i => {
          return i;
        });
        users?.map(async e => {
          if (e?.title == 'Low Balance in Wallet') {
            if (e?.isOn == true) {
              // Request permissions (required for iOS)
              await notifee.requestPermission();

              // Create a channel (required for Android)
              const channelId = await notifee.createChannel({
                id: auth().currentUser?.uid,
                name: 'Ticket Booking',
              });

              // Display a notification
              await notifee.displayNotification({
                title: strings?.wallet_popup,
                body: strings?.balance_low,
                android: {
                  channelId,
                  smallIcon: 'ic_notification',
                  sound: 'default',
                  pressAction: {
                    id: 'default',
                  },
                },
              });

              notifee.onForegroundEvent(async ({type, detail}) => {
                await firestore()
                  .collection('NotificationHistory')
                  .doc(auth().currentUser.uid)
                  .get()
                  .then(async i => {
                    await firestore()
                      .collection('NotificationHistory')
                      .doc(auth().currentUser.uid)
                      .update({
                        NotificationHistory: [
                          ...i?.data()?.NotificationHistory,
                          {
                            id: detail?.notification?.id,
                            title: detail?.notification?.title,
                            body: detail?.notification?.body,
                            date: Date.now(),
                            NotificationType: e?.title,
                          },
                        ],
                      });
                  });
                switch (type) {
                  case EventType.DISMISSED:
                    console.log(
                      'User dismissed notification',
                      detail.notification,
                    );
                    break;
                  case EventType.PRESS:
                    navigation.navigate('TopUp', {TripType: tripType});
                    break;
                }
              });
            }
          }
        });
      });
  };
  const color = useSelector(state => state?.themereducer?.colorTheme);
  const styles = ThemeStyle(color);
  return (
    <View style={styles.container}>
      <CommonHeader
        headerName={strings.selectPaymentMethod}
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
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: wp(6)}}>
        <TouchableOpacity
          onPress={() =>
            setSelectOpc({type: 'My Wallet', image: Images.wallet})
          }
          style={[
            styles.PaymentMethodBody,
            {
              borderColor:
                selectOpc.type === 'My Wallet' ? color.commonBlue : color.grey,
            },
          ]}>
          <Image style={styles.PaymentMethodIcon} source={Images.wallet} />
          <Text style={styles.PaymentMethodName}>{strings.My_Wallet}</Text>
          <View style={styles.myWalletBody}>
            <Text
              style={[
                styles.walletPraice,
                {
                  color: dataForTurnary
                    ? // Number(WalletData?.wallet?.split(',')[0])
                      color.commonBlue
                    : 'red',
                },
              ]}>
              ${WalletData.wallet}
            </Text>
            <Image
              style={[
                styles.selectedCard,
                {
                  tintColor:
                    selectOpc.type === 'My Wallet'
                      ? color.commonBlue
                      : color.white,
                },
              ]}
              source={Images.doneIcon}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            setSelectOpc({type: 'PayPal', image: Images.paypalIcon})
          }
          style={[
            styles.PaymentMethodBody,
            {
              borderColor:
                selectOpc.type === 'PayPal' ? color.commonBlue : color.grey,
            },
          ]}>
          <Image
            style={styles.PaymentMethodOtherIcon}
            source={Images.paypalIcon}
          />
          <Text style={styles.PaymentMethodName}>{strings.PayPal}</Text>
          <View style={styles.myWalletBody}>
            <Image
              style={[
                styles.selectedCard,
                {
                  tintColor:
                    selectOpc.type === 'PayPal'
                      ? color.commonBlue
                      : color.white,
                },
              ]}
              source={Images.doneIcon}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            setSelectOpc({type: 'Google Pay', image: Images.google})
          }
          style={[
            styles.PaymentMethodBody,
            {
              borderColor:
                selectOpc.type === 'Google Pay' ? color.commonBlue : color.grey,
            },
          ]}>
          <Image style={styles.PaymentMethodOtherIcon} source={Images.google} />
          <Text style={styles.PaymentMethodName}>{strings.Google_Pay}</Text>
          <View style={styles.myWalletBody}>
            <Image
              style={[
                styles.selectedCard,
                {
                  tintColor:
                    selectOpc.type === 'Google Pay'
                      ? color.commonBlue
                      : color.white,
                },
              ]}
              source={Images.doneIcon}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectOpc({type: 'Apple Pay', image: Images.apple})}
          style={[
            styles.PaymentMethodBody,
            {
              borderColor:
                selectOpc.type === 'Apple Pay' ? color.commonBlue : color.grey,
            },
          ]}>
          <Image
            style={[styles.PaymentMethodOtherIcon, {tintColor: color.black}]}
            source={Images.apple}
          />
          <Text style={styles.PaymentMethodName}>{strings.Apple_Pay}</Text>
          <View style={styles.myWalletBody}>
            <Image
              style={[
                styles.selectedCard,
                {
                  tintColor:
                    selectOpc.type === 'Apple Pay'
                      ? color.commonBlue
                      : color.white,
                },
              ]}
              source={Images.doneIcon}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            setSelectOpc({type: 'Visa Pay', image: Images.visaIcon})
          }
          style={[
            styles.PaymentMethodBody,
            {
              borderColor:
                selectOpc.type === 'Visa Pay' ? color.commonBlue : color.grey,
            },
          ]}>
          <Image
            style={styles.PaymentMethodOtherIcon}
            source={Images.visaIcon}
          />
          <Text style={styles.PaymentMethodName}>{strings.Visa_Pay}</Text>
          <View style={styles.myWalletBody}>
            <Image
              style={[
                styles.selectedCard,
                {
                  tintColor:
                    selectOpc.type === 'Visa Pay'
                      ? color.commonBlue
                      : color.white,
                },
              ]}
              source={Images.doneIcon}
            />
          </View>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.bottomButtonBody}>
        <TouchableOpacity
          onPress={() => {
            selectOpc.type === 'My Wallet'
              ? setDataFunction()
              : AlertConstant(strings.payment_alert);
          }}
          style={styles.okButton}>
          <Text style={styles.okButtonText}>{strings.payNow}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentMethod;

const ThemeStyle = color =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.bgColor,
    },
    PaymentMethodBody: {
      backgroundColor: color.white,
      paddingVertical: hp(2),
      paddingHorizontal: wp(4),
      marginTop: hp(3),
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 10,
      borderWidth: 2,
    },
    PaymentMethodIcon: {
      height: wp(15),
      width: wp(15),
      tintColor: color.commonBlue,
      marginEnd: wp(4),
    },
    PaymentMethodName: {
      flex: 1,
      fontSize: fontSize(18),
      fontWeight: '600',
      color: color.black,
    },
    myWalletBody: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    walletPraice: {
      fontSize: fontSize(18),
      fontWeight: '600',
      marginEnd: wp(3),
    },
    selectedCard: {
      height: wp(7),
      width: wp(7),
    },
    PaymentMethodOtherIcon: {
      height: wp(15),
      width: wp(15),
      marginEnd: wp(4),
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
  });
