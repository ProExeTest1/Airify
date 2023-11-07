import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {strings} from '../../helper/Strings';
import {CommonHeader} from '../../components';
import {color} from '../../helper/ColorConstant';
import {Images} from '../../helper/IconConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LottieView from 'lottie-react-native';
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

        querySnapshot?.forEach(documentSnapshot => {
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
        onPress1={true}
        onPress2={true}
        Images2={Images.plus}
        Images1={Images.backIcon}
        Images1Color={color.white}
        headerName={strings.passengerList}
        cancelButtonStyle={styles.plusIconStyle}
        navigation1={() => {
          goBack();
        }}
        navigation2={() => {
          navigation.navigate('NewPassenger');
        }}
      />
      {passengerList?.length === 0 ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
          <LottieView
            source={require('../../helper/noDataFound.json')}
            autoPlay
            loop
            style={styles.lottiStyle}
          />
        </View>
      ) : (
        <View style={{flex: 1, backgroundColor: color.white}}>
          <View
            style={[styles.headerStyle, {backgroundColor: color.commonBlue}]}>
            <Text style={[styles.mainHeaderText, {color: color.white}]}>
              {strings?.no}
            </Text>
            <Text style={[styles.mainHeaderText, {color: color.white}]}>
              {strings?.name}
            </Text>
          </View>
          <View style={styles.flatListView}>
            <FlatList
              bounces={false}
              data={passengerList}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={[
                      styles.headerStyle,
                      {
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor:
                          index % 2 == 0 ? color.white : color.grey1,
                      },
                    ]}>
                    <View style={styles.textStyle}>
                      <Text style={styles.mainHeaderText}>{index + 1} .</Text>
                      <Text
                        style={[
                          styles.mainHeaderText,
                          {paddingHorizontal: wp(7)},
                        ]}>
                        {item?.FirstName}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{marginRight: wp(6)}}
                      onPress={() => {
                        navigation?.navigate('NewPassenger', {
                          passengerData: item,
                          mode: 'Edit',
                        });
                      }}>
                      <Image
                        source={Images?.pencil}
                        style={styles.EditIconStyle}
                      />
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  plusIconStyle: {
    width: hp(2.5),
    height: hp(2.5),
    resizeMode: 'contain',
    tintColor: color.white,
  },
  mainHeaderText: {
    color: color.black,
    fontWeight: 'bold',
    fontSize: fontSize(16),
    paddingHorizontal: wp(4),
  },
  headerStyle: {
    flexDirection: 'row',
    borderTopWidth: 0.2,
    paddingVertical: hp(2),
    borderColor: color.white,
  },
  EditIconStyle: {
    width: hp(2),
    height: hp(2),
    resizeMode: 'contain',
    tintColor: color.commonBlue,
  },
  textStyle: {
    flexDirection: 'row',
  },
  flatListView: {
    flex: 1,
  },
  lottiStyle: {
    height: hp(100),
    width: hp(50),
  },
});

export default PassengerList;
