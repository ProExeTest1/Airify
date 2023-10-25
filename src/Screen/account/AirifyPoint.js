import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import {strings} from '../../helper/Strings';
import {CommonHeader} from '../../components';
import {color} from '../../helper/ColorConstant';
import {Images} from '../../helper/IconConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import {pointDummy} from '../../assets/DummyData/Data';

const AirifyPoint = ({navigation: {goBack}, navigation}) => {
  return (
    <View style={styles.container}>
      <CommonHeader
        onPress1={true}
        onPress2={false}
        Images2={Images.info}
        Images1={Images.backIcon}
        Images1Color={color.white}
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
          data={pointDummy}
          showsVerticalScrollIndicator={false}
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
    borderRadius: 4,
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
    backgroundColor: color.commonBlue,
  },
  mainCartSubView: {
    alignItems: 'center',
    flexDirection: 'row',
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
    fontWeight: 'bold',
    color: color.white,
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
  },
});

export default AirifyPoint;
