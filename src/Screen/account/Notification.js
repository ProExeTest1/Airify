import auth from '@react-native-firebase/auth';
import React, {useEffect, useState} from 'react';
import ToggleSwitch from 'toggle-switch-react-native';
import firestore from '@react-native-firebase/firestore';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {CommonHeader} from '../../components';
import {Images} from '../../helper/IconConstant';
import {color} from '../../helper/ColorConstant';
import {useSelector, useDispatch} from 'react-redux';
import {fontSize, hp, wp} from '../../helper/Constant';

const Notification = ({navigation: {goBack}}) => {
  const strings = useSelector(state => state?.languageReducer?.languageObject);
  const [NotificationList, setNotificationList] = useState([]);

  useEffect(() => {
    NotificationData();
  }, [NotificationList]);

  const NotificationData = async () => {
    try {
      const notificationList = await firestore()
        .collection('Users')
        .doc(auth()?.currentUser?.uid)
        .get();
      setNotificationList(notificationList?.data()?.NotificationList);
    } catch (error) {
      console.log('error :>> ', error);
    }
  };
  return (
    <View style={styles.container}>
      <CommonHeader
        Images2={null}
        onPress1={true}
        onPress2={false}
        navigation2={() => {}}
        Images1={Images.backIcon}
        Images1Color={color.white}
        headerName={strings.notification}
        navigation1={() => {
          goBack();
        }}
      />
      <View style={styles.flatListBodyViewStyle}>
        <FlatList
          bounces={false}
          data={NotificationList}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <View style={styles.FlatListView}>
                <Text style={styles.titleStyle}>{item?.title}</Text>
                <ToggleSwitch
                  isOn={item?.isOn}
                  size="medium"
                  onColor={color.commonBlue}
                  onToggle={async () => {
                    await firestore()
                      .collection('Users')
                      .doc(auth()?.currentUser?.uid)
                      .update({
                        NotificationList: NotificationList?.map(i => {
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
    fontWeight: '500',
    fontSize: fontSize(18),
    color: color.black,
  },
  flatListBodyViewStyle: {
    flex: 1,
    paddingHorizontal: wp(4),
  },
});

export default Notification;
