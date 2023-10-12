import React, {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {CommonHeader} from '../../components';
import {strings} from '../../helper/Strings';
import {Images} from '../../helper/IconConstant';
import {color} from '../../helper/ColorConstant';
import {NotificationData} from '../../assets/DummyData/Data';
import {fontSize, hp, wp} from '../../helper/Constant';
import ToggleSwitch from 'toggle-switch-react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Notification = ({navigation: {goBack}, navigation}) => {
  const [NotificationList, setNotificationList] = useState([]);
  useEffect(() => {
    NotificationData();
  }, [NotificationList]);

  const NotificationData = async () => {
    try {
      const notificationList = await firestore()
        .collection('Users')
        .doc(auth().currentUser.uid)
        .get();
      setNotificationList(notificationList?.data()?.NotificationList);
    } catch (error) {
      console.log('error :>> ', error);
    }
  };
  return (
    <View style={styles.container}>
      <CommonHeader
        headerName={strings.notification}
        navigation1={() => {
          goBack();
        }}
        navigation2={() => {}}
        onPress1={true}
        onPress2={false}
        Images1={Images.backIcon}
        Images2={null}
      />
      <View style={styles.flatListBodyViewStyle}>
        <FlatList
          showsVerticalScrollIndicator={false}
          bounces={false}
          data={NotificationList}
          renderItem={({item}) => {
            return (
              <View style={styles.FlatListView}>
                <Text style={styles.titleStyle}>{item.title}</Text>
                <ToggleSwitch
                  isOn={item?.isOn}
                  size="medium"
                  onColor={color.commonBlue}
                  onToggle={async () => {
                    await firestore()
                      .collection('Users')
                      .doc(auth().currentUser.uid)
                      .update({
                        NotificationList: NotificationList.map(i => {
                          if (i.id === item.id) {
                            i.isOn = !i.isOn;
                            return i;
                          }
                          return i;
                        }),
                      });
                  }}
                />
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  FlatListView: {
    flexDirection: 'row',
    paddingVertical: hp(2),
  },
  titleStyle: {
    flex: 1,
    fontSize: fontSize(18),
    fontWeight: '500',
  },
  flatListBodyViewStyle: {
    paddingHorizontal: wp(4),
    flex: 1,
  },
});

export default Notification;
