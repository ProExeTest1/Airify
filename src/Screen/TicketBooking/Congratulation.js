import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {StackActions, useRoute} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {fontSize, hp, wp} from '../../helper/Constant';
import {strings} from '../../helper/Strings';

import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from 'moment';

const Congratulation = ({navigation, route}) => {
  const tripType = route?.params?.TripType;
  const type = route?.params?.type;
  const header = route?.params?.header;
  const totalPaymentList = useSelector(e =>
    type == 'Reschedule'
      ? e?.rescheduleFlightdata?.RescheduletotalPaymentList
      : e?.SelectSeatData?.totalPaymentList,
  );

  const [UserPointData, setUserPointData] = useState({});

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

  const setPoint = async () => {
    await firestore()
      .collection('Points')
      .doc(auth()?.currentUser?.uid)
      .update({
        TotalPoints:
          Number(UserPointData?.TotalPoints) +
          (type == 'Reschedule'
            ? totalPaymentList?.points?.getPoint
            : totalPaymentList?.return
            ? totalPaymentList?.return?.points?.getPoint +
              totalPaymentList?.departure?.points?.getPoint
            : totalPaymentList?.departure?.points?.getPoint),
        PointsHistory: [
          {
            title: 'points',
            price: `+${
              type == 'Reschedule'
                ? totalPaymentList?.points?.getPoint
                : totalPaymentList?.return
                ? totalPaymentList?.return?.points?.getPoint +
                  totalPaymentList?.departure?.points?.getPoint
                : totalPaymentList?.departure?.points?.getPoint
            }`,
            date: moment(new Date()).format('MMM D,YYYY'),
            time: new Date().toLocaleTimeString('en-IN'),
          },
          ...UserPointData?.PointsHistory,
        ],
      })
      .then(() => {
        navigation?.navigate(header, {TripType: tripType});
      });
  };
  useEffect(() => {
    getUserPointData();
  }, []);
  const color = useSelector(state => state?.themereducer?.colorTheme);
  const styles = ThemeStyle(color);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: color.white,
      }}>
      <StatusBar
        barStyle={color.white == '#fff' ? 'dark-content' : 'light-content'}
      />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: wp(6),
        }}>
        <LottieView
          source={require('../../helper/Congratulation.json')}
          autoPlay
          loop
          style={{
            height: hp(20),
            width: wp(100),
          }}
        />
        <Text
          style={{
            fontSize: fontSize(25),
            textAlign: 'center',
            fontWeight: 'bold',
            marginTop: hp(2),
            color: color.black,
          }}>
          {strings.you_earned}{' '}
          {type == 'Reschedule'
            ? totalPaymentList.points.getPoint
            : totalPaymentList.return
            ? totalPaymentList.return.points.getPoint +
              totalPaymentList.departure.points.getPoint
            : totalPaymentList.departure.points.getPoint}{' '}
          {strings.points}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            marginTop: hp(2),
            color: color.black,
          }}>
          {strings.use_your_point}
        </Text>
      </View>
      <View style={styles.bottomButtonBody}>
        <TouchableOpacity
          onPress={() => {
            setPoint();
          }}
          style={styles.okButton}>
          <Text style={styles.okButtonText}>{strings.ok}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Congratulation;

const ThemeStyle = color =>
  StyleSheet.create({
    bottomButtonBody: {
      backgroundColor: color.white,
      paddingHorizontal: wp(6),
      paddingTop: hp(2),
      paddingBottom: hp(4),
      flexDirection: 'row',
      borderTopWidth: 2,
      borderColor: color.grey,
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
