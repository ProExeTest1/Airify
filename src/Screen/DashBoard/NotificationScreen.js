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
import {color} from '../../helper/ColorConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
// import {NotificationData} from '../../assets/DummyData/NotificationData';

const NotificationScreen = ({navigation}) => {
  const [NotificationData, SetNotificationData] = useState([]);

  console.log(NotificationData);
  const passengers = async () => {
    await firestore()
      .collection('NotificationHistory')
      .onSnapshot(querySnapshot => {
        querySnapshot?.forEach(documentSnapshot => {
          if (documentSnapshot.id == auth().currentUser.uid) {
            SetNotificationData(
              documentSnapshot
                ?.data()
                ?.NotificationHistory.sort((a, b) => b.date - a.date),
            );
          }
        });
      });
  };
  useEffect(() => {
    passengers();
  }, []);
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeHeaderViewStyle}>
        <View style={styles.headerinnerViewStyle}>
          <TouchableOpacity onPress={() => navigation.goBack('')}>
            <Image
              source={Images.backIcon}
              style={styles.cancelButtonStyle}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={styles.headerTextViewStyle}>
            <Text style={styles.headerTextStyle}>Notification</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Notification');
            }}>
            <Image
              source={Images.setting}
              style={styles.cancelButtonStyle}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View style={styles.sectionListStyle}>
        <FlatList
          bounces={false}
          data={NotificationData}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <>
                {new Date(NotificationData[index].date)
                  .toLocaleString()
                  .split(',')[0] !==
                new Date(NotificationData[index - 1]?.date)
                  .toLocaleString()
                  .split(',')[0] ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      marginVertical: hp(1),
                      paddingHorizontal: wp(5),
                      alignItems: 'center',
                    }}>
                    <Text style={{color: '#929292', fontWeight: 'bold'}}>
                      {moment(item.date).subtract('days').calendar()}
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
                        item.NotificationType == 'Refunds and Cancellations'
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
                      {item.NotificationType}
                    </Text>
                    <Text
                      style={styles.listDiscriptionTextStyle}
                      numberOfLines={2}>
                      {item.body}
                    </Text>
                    <Text>
                      {new Date(item.date).toLocaleTimeString('en-IN')}
                    </Text>
                  </View>
                </View>
              </>
            );
          }}
          renderSectionHeader={({section: {time}}) => (
            <View style={styles.listHeaderViewStyle}>
              <Text style={styles.header}>{time}</Text>
              <View style={styles.listHeaderLineStyle} />
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  header: {
    fontWeight: '500',
    color: color.grey,
    fontSize: fontSize(16),
  },
  headerViewStyle: {
    backgroundColor: color.commonBlue,
  },
  cancelButtonStyle: {
    width: hp(3),
    height: hp(3),
    tintColor: color.white,
  },
  headerTextStyle: {
    fontWeight: 'bold',
    color: color.white,
    fontSize: fontSize(22),
  },
  safeHeaderViewStyle: {
    backgroundColor: color.commonBlue,
    paddingHorizontal: wp(7),
    paddingVertical: Platform.OS == 'android' ? hp(1) : hp(3),
  },
  headerinnerViewStyle: {
    height: hp(7),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: wp(8),
    justifyContent: 'space-between',
    backgroundColor: color.commonBlue,
  },
  headerTextViewStyle: {
    alignItems: 'center',
    paddingVertical: hp(1),
  },
  sectionListStyle: {
    flex: 1,
    marginVertical: hp(2.4),
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
    right: 20,
    width: hp(4.4),
    height: wp(4.4),
    height: wp(4.4),
    width: hp(4.4),
  },
  listHeaderViewStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: wp(3),
  },
  listHeaderLineStyle: {
    right: 0,
    height: 0,
    borderWidth: 0.5,
    position: 'absolute',
    marginHorizontal: wp(3),
    borderColor: color.grey,
    flex: 1,
  },
});
