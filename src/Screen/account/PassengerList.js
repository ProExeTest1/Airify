import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {color} from '../../helper/ColorConstant';
import {CommonHeader} from '../../components';
import {strings} from '../../helper/Strings';
import {Images} from '../../helper/IconConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import firestore, {firebase} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const PassengerList = ({navigation: {goBack}, navigation}) => {
  const [passengerList, setPassengerList] = useState([]);
  useEffect(() => {
    getPassengerListData();
  }, []);

  const getPassengerListData = async () => {
    await firestore()
      .collection('PassengerList')
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
            setPassengerList(item?.PassengerList);
            return false;
          } else {
            return false;
          }
        });
      });
  };

  return (
    <View style={styles.container}>
      <CommonHeader
        headerName={strings.passengerList}
        navigation1={() => {
          goBack();
        }}
        navigation2={() => {
          navigation.navigate('NewPassenger');
        }}
        onPress1={true}
        onPress2={true}
        Images1={Images.backIcon}
        Images2={Images.plus}
        cancelButtonStyle={styles.plusIconStyle}
        Images1Color={color.white}
      />
      <View style={[styles.headerStyle, {backgroundColor: color.commonBlue}]}>
        <Text style={[styles.mainHeaderText, {color: color.white}]}>
          {strings.no}
        </Text>
        <Text style={[styles.mainHeaderText, {color: color.white}]}>
          {strings.name}
        </Text>
      </View>
      <View style={styles.flatListView}>
        <FlatList
          bounces={false}
          showsVerticalScrollIndicator={false}
          data={passengerList}
          renderItem={({item, index}) => {
            return (
              <View
                style={[
                  styles.headerStyle,
                  {
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: index % 2 == 0 ? color.white : color.grey1,
                  },
                ]}>
                <View style={styles.textStyle}>
                  <Text style={styles.mainHeaderText}>{index + 1} .</Text>
                  <Text
                    style={[styles.mainHeaderText, {paddingHorizontal: wp(7)}]}>
                    {item.FirstName}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{marginRight: wp(6)}}
                  onPress={() => {
                    navigation.navigate('NewPassenger', {
                      passengerData: item,
                      mode: 'Edit',
                    });
                  }}>
                  <Image source={Images.pencil} style={styles.EditIconStyle} />
                </TouchableOpacity>
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
  plusIconStyle: {
    height: hp(2.5),
    width: hp(2.5),
    resizeMode: 'contain',
    tintColor: color.white,
  },
  mainHeaderText: {
    color: color.black,
    fontSize: fontSize(16),
    fontWeight: 'bold',
    paddingHorizontal: wp(4),
  },
  headerStyle: {
    flexDirection: 'row',
    borderTopWidth: 0.2,
    borderColor: color.white,
    paddingVertical: hp(2),
  },
  EditIconStyle: {
    height: hp(2),
    width: hp(2),
    resizeMode: 'contain',
    tintColor: color.commonBlue,
  },
  textStyle: {
    flexDirection: 'row',
  },
  flatListView: {
    flex: 1,
  },
});

export default PassengerList;
