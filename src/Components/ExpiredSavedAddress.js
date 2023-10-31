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
import {useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {color} from '../helper/ColorConstant';
import {Images} from '../helper/IconConstant';
import {fontSize, hp, wp} from '../helper/Constant';
import {expiredFlight} from '../redux/action/SavedFlights';
import LottieView from 'lottie-react-native';
import {strings} from '../helper/Strings';

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
                style={[styles.cardBody, {marginTop: index === 0 ? hp(3) : 0}]}>
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
                    style={{
                      width: hp(2.5),
                      height: hp(2.5),
                      resizeMode: 'contain',
                      tintColor: color.commonBlue,
                    }}
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
                      source={Images.airplaneWhiteIcon}
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
                <View
                  style={[
                    styles.cardBottemBody,
                    {
                      paddingTop: hp(2),
                      borderTopWidth: 1,
                      borderColor: color.grayLight,
                    },
                  ]}>
                  <Text style={styles.FlightsPlaseName}>{item?.date}</Text>
                  <View
                    style={{
                      borderRadius: 4,
                      paddingVertical: hp(1),
                      paddingHorizontal: wp(2),
                      backgroundColor: color.Grey,
                    }}>
                    <Text>{strings?.expired}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <LottieView
            source={require('../helper/noDataFound.json')}
            autoPlay
            loop
            style={{
              height: hp(65),
              width: wp(100),
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
    borderColor: color.grayLight,
  },
  cardHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingVertical: hp(2.5),
    borderColor: color.grayLight,
  },
  cardHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: fontSize(18),
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
    color: color.darkLight,
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
    height: hp(5),
    width: hp(17),
  },
  FlightsPlaseImgText: {
    color: color.darkLight,
    fontSize: fontSize(13),
  },
  FlightsPlaseNicName: {
    color: '#000',
    fontWeight: 'bold',
    marginTop: hp(1.5),
    fontSize: fontSize(21),
  },
  FlightsPlaseName: {
    fontWeight: '500',
    color: color.darkLight,
  },
  cardBottemBody: {
    paddingTop: hp(1),
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: hp(2.5),
    justifyContent: 'space-between',
  },
});

export default ExpiredSavedAddress;
