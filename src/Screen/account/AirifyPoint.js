import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import {strings} from '../../helper/Strings';
import {CommonHeader, Loader} from '../../components';

import {Images} from '../../helper/IconConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import firestore from '@react-native-firebase/firestore';
import {useSelector, useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';

const AirifyPoint = ({navigation: {goBack}, navigation}) => {
  const [pointData, setPointData] = useState({});
  const [strings, setString] = useState(
    useSelector(state => state?.languageReducer?.languageObject),
  );

  console.log(strings, 'hello');
  const getUserPointData = async () => {
    await firestore()
      .collection('Points')
      .onSnapshot(querySnapshot => {
        querySnapshot?.forEach(documentSnapshot => {
          if (documentSnapshot.id == auth().currentUser.uid) {
            setPointData(documentSnapshot?.data());
          }
        });
      });
  };
  useEffect(() => {
    getUserPointData();
  }, []);
  const color = useSelector(state => state?.themereducer?.colorTheme);
  const styles = ThemeStyle(color);
  return (
    <View style={styles.container}>
      <CommonHeader
        onPress1={true}
        onPress2={false}
        Images2={Images.info}
        Images1={Images.backIcon}
        Images1Color={'#fff'}
        Images2Color={'#fff'}
        headerName={strings.airifyPoint}
        navigation1={() => {
          goBack();
        }}
        cancelButtonStyle1={styles.plusIconStyle}
      />
      <View style={styles.bodyView}>
        <View style={styles.mainCartViewStyle}>
          <View style={styles.mainCartSubView}>
            <Text style={styles.mainCartTextHeader}>{strings.totalPoint}</Text>
          </View>
          <Text style={styles.pointTextStyle}>{pointData?.TotalPoints}</Text>
          <Text style={styles.infoLine}>{strings.line}</Text>
        </View>
      </View>
      <View style={styles.bodyView}>
        <View style={styles.flatListHeader}>
          <Text
            style={{
              fontSize: fontSize(20),
              fontWeight: 'bold',
              color: color.black,
            }}>
            {strings.pointHistory}
          </Text>
          <TouchableOpacity
            style={styles.flatListHeader}
            onPress={() => {
              navigation.navigate('pointHistory', {
                header: pointData?.PointsHistory,
              });
            }}>
            <Text
              style={{
                color: color.commonBlue,
                fontWeight: 'bold',
                color: color.black,
              }}>
              {strings.ViewAll}
            </Text>
            <Image source={Images.upArrow} style={styles.arrowStyle} />
          </TouchableOpacity>
        </View>
        {pointData?.PointsHistory ? (
          <FlatList
            bounces={false}
            data={pointData?.PointsHistory}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() => <View style={{marginBottom: hp(35)}} />}
            renderItem={({item}) => {
              return (
                <View style={styles.flatListView}>
                  <View style={styles.flatListSubView}>
                    <Text style={styles.mainTextStyle}>
                      {item.price.slice(0, 1) == '+'
                        ? 'You earn points'
                        : 'You use points'}
                    </Text>
                    <Text style={styles.mainTextStyle}>{item.price}</Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.textStyle}>{item.date} </Text>
                    <View style={styles.dotStyle} />
                    <Text style={styles.textStyle}> {item.time}</Text>
                  </View>
                </View>
              );
            }}
          />
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Loader color={color.commonBlue} />
          </View>
        )}
      </View>
    </View>
  );
};

const ThemeStyle = color =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.white,
    },
    mainCartViewStyle: {
      borderRadius: 4,
      paddingVertical: hp(1),
      paddingHorizontal: wp(4),
      backgroundColor: color.commonBlue,
    },
    mainCartSubView: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: hp(1.5),
    },
    mainCartTextHeader: {
      color: '#fff',
      marginBottom: hp(1),
      fontSize: fontSize(12),
    },
    scannerStyle: {
      width: wp(5),
      height: hp(5),
      resizeMode: 'contain',
      tintColor: color.white,
    },
    pointTextStyle: {
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: hp(1),
      fontSize: fontSize(24),
    },
    infoLine: {
      color: '#fff',
      marginBottom: hp(1),
      fontSize: fontSize(11),
    },
    bodyView: {paddingHorizontal: wp(6), paddingVertical: hp(2)},
    flatListHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    arrowStyle: {
      width: wp(3),
      height: hp(3),
      marginLeft: wp(4),
      resizeMode: 'contain',
      tintColor: color.commonBlue,
      transform: [{rotate: '90deg'}],
    },
    dotStyle: {
      width: hp(0.3),
      height: hp(0.3),
      borderRadius: hp(0.3),
      backgroundColor: color.black,
    },
    flatListView: {
      borderBottomWidth: 2,
      paddingVertical: hp(1),
      borderColor: color.grey,
    },
    flatListSubView: {
      flexDirection: 'row',
      paddingVertical: hp(1),
      justifyContent: 'space-between',
    },
    mainTextStyle: {
      fontWeight: 'bold',
      color: color.black,
    },
    textStyle: {
      color: color.black,
    },
  });

export default AirifyPoint;
