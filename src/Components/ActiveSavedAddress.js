import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
import {color} from '../helper/ColorConstant';
import {fontSize, hp, wp} from '../helper/Constant';
import {Images} from '../helper/IconConstant';
import {useDispatch} from 'react-redux';
import {activeFlight} from '../redux/action/SavedFlights';

const ActiveSavedAddress = ({onPress, data}) => {
  const [activeAddressData, setActiveAddressData] = useState([]);
  useEffect(() => {
    ActiveAddressData();
  }, []);

  const dispatch = useDispatch();
  const ActiveAddressData = async () => {
    await firestore()
      .collection('SavedFlights')
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
            const tmp = item?.savedFlights?.filter(i => {
              (addressDate = moment(i?.date, 'ddd,MMM DD YYYY').format(
                'MM/DD/YYYY',
              )),
                (todayDate = new Date().toLocaleDateString());

              if (moment(todayDate).isSameOrBefore(addressDate)) {
                return [activeAddressData, ...activeAddressData, i];
              }
            });
            setActiveAddressData(tmp);
            dispatch(activeFlight(tmp));
            return false;
          } else {
            return false;
          }
        });
      });
  };
  return (
    <View style={styles.container}>
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
              style={[styles.cardBody, {marginTop: index === 0 ? hp(3) : 0}]}>
              <View style={styles.cardHeader}>
                <View
                  style={[styles.cardHeaderLogo, {backgroundColor: item?.logo}]}
                />
                <Text style={styles.cardHeaderText}>{item?.airlineName}</Text>
                <Text style={styles.cardPrice}>{item?.price}</Text>
                <Image
                  source={Images.filled_save}
                  style={{
                    height: hp(2.5),
                    width: hp(2.5),
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
                    {item.departureTime}
                  </Text>
                </View>
                <View style={styles.FlightsPlaseImgBody}>
                  <Image
                    style={styles.FlightsPlaseImg}
                    source={Images.airplaneWhiteIcon}
                  />
                  <Text style={styles.FlightsPlaseImgText}>
                    {item.totalHours}
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
                <Text style={styles.FlightsPlaseImgText}>{item.stops}</Text>
                <Text style={styles.FlightsPlaseName}>
                  {item?.destinationShortForm}
                </Text>
              </View>
              <View
                style={[
                  styles.cardBottemBody,
                  {
                    borderTopWidth: 1,
                    borderColor: color.grayLight,
                    paddingTop: hp(2),
                    alignItems: 'center',
                  },
                ]}>
                <Text style={styles.FlightsPlaseName}>{item?.date}</Text>
                <Text style={[styles.cardPrice, {marginLeft: wp(30)}]}>
                  {item?.flightPrice}
                </Text>
                <Text style={styles.cardPriceTitle}>/pax</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(4),
  },
  cardBody: {
    backgroundColor: color.white,
    paddingHorizontal: wp(4),
    marginBottom: hp(2),
    borderRadius: 10,
    borderColor: color.grayLight,
    borderWidth: 1,
    flex: 1,
  },
  cardHeader: {
    borderColor: color.grayLight,
    borderBottomWidth: 1,
    paddingVertical: hp(2.5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardHeaderText: {
    fontSize: fontSize(18),
    fontWeight: 'bold',
    flex: 1,
  },
  cardHeaderLogo: {
    height: wp(5.8),
    width: wp(5.8),
    borderRadius: 500,
    marginEnd: wp(3),
  },
  cardPrice: {
    color: color.commonBlue,
    fontSize: fontSize(20),
    fontWeight: '600',
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
    alignItems: 'center',
    flex: 1,
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
    fontSize: fontSize(21),
    color: '#000',
    fontWeight: 'bold',
    marginTop: hp(1.5),
  },
  FlightsPlaseName: {
    color: color.darkLight,
    fontWeight: '500',
  },
  cardBottemBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: hp(2.5),
    paddingTop: hp(1),
  },
});

export default ActiveSavedAddress;
