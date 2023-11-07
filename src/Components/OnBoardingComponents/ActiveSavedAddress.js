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

import {color} from '../../helper/ColorConstant';
import {Images} from '../../helper/IconConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import {activeFlight} from '../../redux/action/SavedFlights';
import LottieView from 'lottie-react-native';
import {strings} from '../../helper/Strings';

const ActiveSavedAddress = ({onPress, data}) => {
  const dispatch = useDispatch();
  const [activeAddressData, setActiveAddressData] = useState([]);

  useEffect(() => {
    ActiveAddressData();
  }, []);

  const ActiveAddressData = async () => {
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
            Date.now() <=
            new Date(
              moment(
                `${item?.date?.split(',')[1]} ${Number(
                  item?.departureTime?.split(':')[0],
                )}:${Number(item?.departureTime?.split(':')[1])}:00`,
                'MMM DD YYYY HH:mm:ss',
              ).format('YYYY-MM-DD HH:mm:ss'),
            ).valueOf()
          ) {
            return true;
          } else {
            return false;
          }
        });
        setActiveAddressData(activeData);
        dispatch(activeFlight(activeData));
      });
  };
  return (
    <View style={styles.container}>
      {data?.length > 0 || activeAddressData?.length > 0 ? (
        <FlatList
          bounces={false}
          showsVerticalScrollIndicator={false}
          data={data?.length > 0 ? data : activeAddressData}
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
                      index == activeAddressData?.length - 1 ? hp(15) : hp(2),
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
                    style={styles.filledSavedStyle}
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
                <View style={[styles.cardBottemBody, styles.cardBottemBody2]}>
                  <Text style={styles.FlightsPlaseName}>{item?.date}</Text>
                  <Text style={[styles.cardPrice, {marginLeft: wp(30)}]}>
                    {item?.flightPrice}
                  </Text>
                  <Text style={styles.cardPriceTitle}>{strings?.pax}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <View style={styles.LottieViewStyle}>
          <LottieView
            source={require('../../helper/noDataFound.json')}
            autoPlay
            loop
            style={styles.lottiStyle}
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
    width: hp(17),
    height: hp(5),
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
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: hp(2.5),
    justifyContent: 'space-between',
  },
  cardBottemBody2: {
    paddingTop: hp(2),
    borderTopWidth: 1,
    alignItems: 'center',
    borderColor: color.grayLight,
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

export default ActiveSavedAddress;
