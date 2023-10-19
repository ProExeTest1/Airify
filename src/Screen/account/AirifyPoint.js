import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {color} from '../../helper/ColorConstant';
import {strings} from '../../helper/Strings';
import {Images} from '../../helper/IconConstant';
import {CommonHeader} from '../../components';
import {fontSize, hp, wp} from '../../helper/Constant';
import {pointDummy} from '../../assets/DummyData/Data';

const AirifyPoint = ({navigation: {goBack}, navigation}) => {
  return (
    <View style={styles.container}>
      <CommonHeader
        headerName={strings.airifyPoint}
        navigation1={() => {
          goBack();
        }}
        onPress1={true}
        onPress2={false}
        Images1={Images.backIcon}
        Images2={Images.info}
        cancelButtonStyle1={styles.plusIconStyle}
        Images1Color={color.white}
      />
      <View style={styles.bodyView}>
        <View style={styles.mainCartViewStyle}>
          <View style={styles.mainCartSubView}>
            <Text style={styles.mainCartTextHeader}>{strings.totalPoint}</Text>
            <Image source={Images.scanner} style={styles.scannerStyle} />
          </View>
          <Text style={styles.pointTextStyle}>- 300</Text>
          <Text style={styles.infoLine}>{strings.line}</Text>
        </View>
      </View>
      <View style={styles.bodyView}>
        <View style={styles.flatListHeader}>
          <Text style={{fontSize: fontSize(20), fontWeight: 'bold'}}>
            {strings.pointHistory}
          </Text>
          <TouchableOpacity
            style={styles.flatListHeader}
            onPress={() => {
              navigation.navigate('pointHistory');
            }}>
            <Text style={{color: color.commonBlue, fontWeight: 'bold'}}>
              {strings.ViewAll}
            </Text>
            <Image source={Images.upArrow} style={styles.arrowStyle} />
          </TouchableOpacity>
        </View>
        <FlatList
          bounces={false}
          showsVerticalScrollIndicator={false}
          data={pointDummy}
          ListFooterComponent={() => <View style={{marginBottom: hp(35)}} />}
          renderItem={({item}) => {
            return (
              <View style={styles.flatListView}>
                <View style={styles.flatListSubView}>
                  <Text style={styles.mainTextStyle}>{item.title}</Text>
                  <Text style={styles.mainTextStyle}>{item.point}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text>{item.date} </Text>
                  <View style={styles.dotStyle} />
                  <Text> {item.time}</Text>
                </View>
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
  mainCartViewStyle: {
    backgroundColor: color.commonBlue,
    paddingVertical: hp(1),
    borderRadius: 4,
    paddingHorizontal: wp(4),
  },
  mainCartSubView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainCartTextHeader: {
    fontSize: fontSize(12),
    color: color.white,
    marginBottom: hp(1),
  },
  scannerStyle: {
    height: hp(5),
    width: wp(5),
    resizeMode: 'contain',
    tintColor: color.white,
  },
  pointTextStyle: {
    fontSize: fontSize(24),
    color: color.white,
    marginBottom: hp(1),
    fontWeight: 'bold',
  },
  infoLine: {
    fontSize: fontSize(11),
    color: color.white,
    marginBottom: hp(1),
  },
  bodyView: {paddingHorizontal: wp(6), paddingVertical: hp(2)},
  flatListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrowStyle: {
    marginLeft: wp(4),
    height: hp(3),
    width: wp(3),
    resizeMode: 'contain',
    transform: [{rotate: '90deg'}],
    tintColor: color.commonBlue,
  },
  dotStyle: {
    height: hp(0.3),
    width: hp(0.3),
    borderRadius: hp(0.3),
    backgroundColor: color.black,
  },
  flatListView: {
    paddingVertical: hp(1),
    borderBottomWidth: 1,
    borderColor: color.lightGray,
  },
  flatListSubView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp(1),
  },
  mainTextStyle: {
    fontWeight: 'bold',
  },
});

export default AirifyPoint;
