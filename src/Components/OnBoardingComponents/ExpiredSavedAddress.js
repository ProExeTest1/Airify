import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {Images} from '../../helper/IconConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import {expiredFlight} from '../../redux/action/SavedFlights';
import LottieView from 'lottie-react-native';
import {strings} from '../../helper/Strings';

const ExpiredSavedAddress = ({onPress}) => {
  const dispatch = useDispatch();
  const [expireAddressData, setExpireAddressData] = useState([]);

  useEffect(() => {
    ExpireAddressData();
  }, []);

  const ExpireAddressData = async () => {
    await firestore()
      .collection('SavedFlights')
      .onSnapshot(querySnapshot => {
        let users;
        querySnapshot?.forEach(documentSnapshot => {
          if (documentSnapshot?.id == auth()?.currentUser?.uid) {
            users = documentSnapshot?.data()?.savedFlights;
          }
        });
        let activeData = users?.filter(item => {
          if (
            Date.now() >=
            new Date(
              moment(
                `${item?.date?.split(',')[1]} ${Number(
                  item?.departureTime?.split(':')[0],
                )}:${Number(item?.departureTime?.split(':')[1])}:00`,
                'MMM DD YYYY HH:mm:ss',
              )?.format('YYYY-MM-DD HH:mm:ss'),
            )?.valueOf()
          ) {
            return true;
          } else {
            return false;
          }
        });
        setExpireAddressData(activeData);
        dispatch(expiredFlight(activeData));
      });
  };
  const color = useSelector(state => state?.themereducer?.colorTheme);
  const styles = ThemeStyle(color);
  return (
    <View style={styles.container}>
      {expireAddressData?.length > 0 ? (
        <FlatList
          bounces={false}
          data={expireAddressData}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  onPress(item);
                }}
                style={[
                  styles.cardBody,
                  {
                    marginTop: index === 0 ? hp(3) : 0,
                    marginBottom:
                      index == expireAddressData?.length - 1 ? hp(15) : hp(2),
                  },
                ]}>
                <View style={styles.cardHeader}>
                  <View
                    style={[
                      styles.cardHeaderLogo,
                      {backgroundColor: item?.logo},
                    ]}
                  />
                  <Text style={styles.cardHeaderText}>{item?.airlineName}</Text>
                  <Text style={styles.cardPrice}>{item?.price}</Text>
                  <Image
                    source={Images.filled_save}
                    style={styles.saveIconStyle}
                  />
                </View>
                <View style={styles.cardDataBody}>
                  <View style={styles.FlightsPlaseBody}>
                    <Text style={styles.FlightsPlaseName}>
                      {item?.departurePlace}
                    </Text>
                    <Text style={styles.FlightsPlaseNicName}>
                      {item?.departureTime}
                    </Text>
                  </View>
                  <View style={styles.FlightsPlaseImgBody}>
                    <Image
                      style={styles.FlightsPlaseImg}
                      source={
                        color.white == '#fff'
                          ? Images.airplaneWhiteIcon
                          : Images.airplaneDarkWhiteIcon
                      }
                    />
                    <Text style={styles.FlightsPlaseImgText}>
                      {item?.totalHours}
                    </Text>
                  </View>
                  <View
                    style={[styles.FlightsPlaseBody, {alignItems: 'flex-end'}]}>
                    <Text style={styles.FlightsPlaseName}>
                      {item?.destinationPlace}
                    </Text>
                    <Text style={styles.FlightsPlaseNicName}>
                      {item?.landingTime}
                    </Text>
                  </View>
                </View>
                <View style={styles.cardBottemBody}>
                  <Text style={styles.FlightsPlaseName}>
                    {item?.departureShortForm}
                  </Text>
                  <Text style={styles.FlightsPlaseImgText}>{item?.stops}</Text>
                  <Text style={styles.FlightsPlaseName}>
                    {item?.destinationShortForm}
                  </Text>
                </View>
                <View style={[styles.cardBottemBody, styles.cardBottemBody2]}>
                  <Text style={styles.FlightsPlaseName}>{item?.date}</Text>
                  <View style={styles.expiredViewStyle}>
                    <Text>{strings?.expired}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <View style={styles.LottieViewStyle}>
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
      )}
    </View>
  );
};

const ThemeStyle = color =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: wp(4),
    },
    cardBody: {
      flex: 1,
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: hp(2),
      paddingHorizontal: wp(4),
      backgroundColor: color.white,
      borderColor: color.grey,
    },
    cardHeader: {
      alignItems: 'center',
      flexDirection: 'row',
      borderBottomWidth: 1,
      paddingVertical: hp(2.5),
      borderColor: color.grey,
    },
    cardHeaderText: {
      flex: 1,
      fontWeight: 'bold',
      fontSize: fontSize(18),
      color: color.black,
    },
    cardHeaderLogo: {
      width: wp(5.8),
      height: wp(5.8),
      marginEnd: wp(3),
      borderRadius: 500,
    },
    cardPrice: {
      fontWeight: '600',
      fontSize: fontSize(20),
      color: color.commonBlue,
    },
    cardPriceTitle: {
      color: color.offerColor,
      fontSize: fontSize(18),
    },
    cardDataBody: {
      paddingTop: hp(2.5),
      flexDirection: 'row',
      alignItems: 'center',
    },
    FlightsPlaseBody: {
      width: wp(20),
    },
    FlightsPlaseImgBody: {
      flex: 1,
      alignItems: 'center',
    },
    FlightsPlaseImg: {
      width: hp(17),
      height: hp(5),
    },
    FlightsPlaseImgText: {
      color: color.offerColor,
      fontSize: fontSize(13),
    },
    FlightsPlaseNicName: {
      color: color.black,
      fontWeight: 'bold',
      marginTop: hp(1.5),
      fontSize: fontSize(21),
    },
    FlightsPlaseName: {
      fontWeight: '500',
      color: color.offerColor,
    },
    cardBottemBody: {
      paddingTop: hp(1),
      alignItems: 'center',
      flexDirection: 'row',
      paddingBottom: hp(2.5),
      justifyContent: 'space-between',
    },
    cardBottemBody2: {
      paddingTop: hp(2),
      borderTopWidth: 1,
      alignItems: 'center',
      borderColor: color.grey,
    },

    filledSavedStyle: {
      width: hp(2.5),
      height: hp(2.5),
      resizeMode: 'contain',
      tintColor: color.commonBlue,
    },
    LottieViewStyle: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    lottiStyle: {
      height: hp(65),
      width: wp(100),
    },
  });

export default ExpiredSavedAddress;
