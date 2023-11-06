import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

import {strings} from '../../helper/Strings';
import {CommonHeader} from '../../components';
import {color} from '../../helper/ColorConstant';
import {Images} from '../../helper/IconConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import {useRoute} from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const pointHistory = ({navigation: {goBack}}) => {
  const pointDummy = useRoute();
  return (
    <View style={styles.container}>
      <CommonHeader
        Images2={null}
        onPress1={true}
        onPress2={false}
        Images1={Images.cancel}
        Images1Color={color.white}
        headerName={strings.airifyPoint}
        cancelButtonStyle1={styles.plusIconStyle}
        navigation1={() => {
          goBack();
        }}
      />
      {pointDummy?.params?.header.length === 0 ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <LottieView
            source={require('../../helper/noDataFound.json')}
            autoPlay
            loop
            style={styles.lottiStyle}
          />
        </View>
      ) : (
        <View style={styles.bodyView}>
          <View style={styles.flatListHeader}>
            <Text style={{fontSize: fontSize(20), fontWeight: 'bold'}}>
              {strings?.pointHistory}
            </Text>
          </View>
          <FlatList
            bounces={false}
            data={pointDummy?.params?.header}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() => <View style={{marginBottom: hp(15)}} />}
            renderItem={({item}) => {
              return (
                <View style={styles.flatListView}>
                  <View style={styles.flatListSubView}>
                    <Text style={styles.mainTextStyle}>
                      {item.price.slice(0, 1) == '+'
                        ? 'You earn points'
                        : 'You use points'}
                    </Text>
                    <Text style={styles.mainTextStyle}>{item?.price}</Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color: color.black}}>{item?.date} </Text>
                    <View style={styles.dotStyle} />
                    <Text style={{color: color.black}}> {item?.time}</Text>
                  </View>
                </View>
              );
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
    backgroundColor: color.white,
  },
  mainCartViewStyle: {
    borderRadius: 4,
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
    backgroundColor: color.commonBlue,
  },
  mainCartSubView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainCartTextHeader: {
    color: color.white,
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
    color: color.white,
    fontWeight: 'bold',
    marginBottom: hp(1),
    fontSize: fontSize(24),
  },
  infoLine: {
    color: color.white,
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
    borderBottomWidth: 1,
    paddingVertical: hp(1),
    borderColor: color.lightGray,
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
  plusIconStyle: {
    width: hp(2.5),
    height: hp(2.5),
    resizeMode: 'contain',
  },
});

export default pointHistory;
