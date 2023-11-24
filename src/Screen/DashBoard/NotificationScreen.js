import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {Images} from '../../helper/IconConstant';

import {fontSize, hp, wp} from '../../helper/Constant';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import {strings} from '../../helper/Strings';
import {CommonHeader} from '../../components';
import LottieView from 'lottie-react-native';
import {useSelector} from 'react-redux';

const NotificationScreen = ({navigation}) => {
  const [NotificationData, SetNotificationData] = useState([]);
  const strings = useSelector(state => state?.languageReducer?.languageObject);

  const passengers = async () => {
    await firestore()
      .collection('NotificationHistory')
      .onSnapshot(querySnapshot => {
        querySnapshot?.forEach(documentSnapshot => {
          if (documentSnapshot?.id == auth()?.currentUser?.uid) {
            SetNotificationData(
              documentSnapshot
                ?.data()
                ?.NotificationHistory?.sort((a, b) => b.date - a.date),
            );
          }
        });
      });
  };
  useEffect(() => {
    passengers();
  }, []);
  const color = useSelector(state => state?.themereducer?.colorTheme);
  const styles = ThemeStyle(color);
  return (
    <View style={styles.container}>
      <CommonHeader
        headerName={strings.notification}
        navigation1={() => {
          navigation.goBack();
        }}
        navigation2={() => {
          console.log('hello');
          navigation.navigate('Notification');
        }}
        onPress1={true}
        onPress2={true}
        Images1={Images.backIcon}
        Images2={Images.setting}
        cancelButtonStyle1={styles.plusIconStyle}
        Images1Color={'#fff'}
        Images2Color={'#fff'}
      />
      {NotificationData?.length === 0 ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
          <LottieView
            source={
              color.white == '#fff'
                ? require('../../helper/noDataFound.json')
                : require('../../helper/noDataFoundDark.json')
            }
            autoPlay
            loop
            style={styles.lottiStyle}
          />
        </View>
      ) : (
        <View style={styles.sectionListStyle}>
          <FlatList
            bounces={false}
            data={NotificationData}
            keyExtractor={item => item?.id}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <>
                  {new Date(NotificationData[index]?.date)
                    ?.toLocaleString()
                    ?.split(',')[0] !==
                  new Date(NotificationData[index - 1]?.date)
                    ?.toLocaleString()
                    ?.split(',')[0] ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        marginVertical: hp(1),
                        paddingHorizontal: wp(5),
                        alignItems: 'center',
                      }}>
                      <Text style={{color: '#929292', fontWeight: 'bold'}}>
                        {moment(item.date).subtract('day').calendar()}
                      </Text>
                      <View
                        style={{
                          borderWidth: 1,
                          borderColor: color.darkGray,
                          flex: 1,
                          marginStart: wp(3),
                        }}></View>
                    </View>
                  ) : null}
                  <View style={styles.listTouchStyle}>
                    <View style={styles.listImageViewStyle}>
                      <Image
                        source={
                          item?.NotificationType == 'Refunds and Cancellations'
                            ? Images.wallet
                            : item.NotificationType == 'Ticket Booking Updates'
                            ? Images.booking
                            : item.NotificationType == 'Ticket Booking Updates'
                            ? Images.booking
                            : Images.wallet
                        }
                        resizeMode="contain"
                        style={styles.listImageStyle}
                      />
                    </View>
                    <View style={styles.listTextViewStyle}>
                      <Text style={styles.listTitleTextStyle} numberOfLines={1}>
                        {item?.NotificationType}
                      </Text>
                      <Text
                        style={styles.listDiscriptionTextStyle}
                        numberOfLines={2}>
                        {item?.body}
                      </Text>
                      <Text style={{color: color.black}}>
                        {new Date(item?.date).toLocaleTimeString('en-IN')}
                      </Text>
                    </View>
                  </View>
                </>
              );
            }}
            renderSectionHeader={({section: {time}}) => (
              <View style={styles.listHeaderViewStyle}>
                <Text style={styles.header}>{time}</Text>
                <View style={styles.listHeaderLineStyle}>
                  {/* <Text>hello</Text> */}
                </View>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default NotificationScreen;

const ThemeStyle = color =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    sectionListStyle: {
      flex: 1,
      // marginVertical: hp(2.4),
      backgroundColor: color.white,
    },
    listTouchStyle: {
      flexDirection: 'row',
      marginVertical: hp(1),
      paddingHorizontal: wp(5),
    },
    listImageDiffStyle: {
      width: hp(7),
      height: hp(7),
      borderRadius: 12,
    },
    listImageViewStyle: {
      borderWidth: 1,
      padding: hp(1.7),
      borderRadius: 100,
      borderColor: color.grey,
      width: hp(7),
      height: hp(7),
      alignItems: 'center',
      justifyContent: 'center',
    },
    listImageStyle: {
      width: hp(3),
      height: hp(3),
      tintColor: color.black,
    },
    listTextViewStyle: {
      marginHorizontal: wp(2.8),
      flex: 1,
    },
    listTitleTextStyle: {
      fontSize: fontSize(18),
      flex: 1,
      fontWeight: '600',
      color: color.black,
      marginVertical: hp(1),
      fontSize: fontSize(18),
    },
    listDiscriptionTextStyle: {
      color: color.black,
      flex: 1,
      marginBottom: hp(0.5),
    },
    forwardIconStyle: {
      width: hp(4.4),
      height: wp(4.4),
    },
    listHeaderViewStyle: {
      alignItems: 'center',
      flexDirection: 'row',
      marginHorizontal: wp(3),
    },
    listHeaderLineStyle: {
      borderWidth: 0.7,
      height: 0,
      marginHorizontal: wp(3),
      borderColor: color.grey,
      flex: 1,
    },
    lottiStyle: {
      height: hp(100),
      width: hp(50),
    },
  });
