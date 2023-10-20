import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

import {strings} from '../../helper/Strings';
import {CommonHeader} from '../../components';
import {Images} from '../../helper/IconConstant';
import {color} from '../../helper/ColorConstant';
import {fontSize, hp, wp} from '../../helper/Constant';

const SelectSeat = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <CommonHeader
        Images2={null}
        onPress1={true}
        onPress2={false}
        Images2Color={null}
        Images1Color={'#fff'}
        navigation2={() => {}}
        Images1={Images.backIcon}
        headerName={strings.selectSeat}
        navigation1={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.selectSeatHeaderBody}>
        <FlatList
          bounces={false}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={['kenil panchani', 'kenil panchani', 'kenil panchani']}
          renderItem={({index}) => (
            <View
              style={[
                styles.FlatListBody,
                {marginStart: index === 0 ? wp(6) : wp(0)},
              ]}>
              <View style={styles.flatListView}>
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: fontSize(16),
                  }}>
                  {index + 1}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
      <View style={{flex: 1}}></View>
    </View>
  );
};

export default SelectSeat;

const styles = StyleSheet.create({
  selectSeatHeaderBody: {
    height: hp(10),
    paddingTop: hp(1),
    alignItems: 'center',
    paddingBottom: hp(2),
    justifyContent: 'center',
    backgroundColor: color.commonBlue,
  },
  FlatListBody: {
    width: wp(38),
    marginEnd: wp(4),
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: wp(3),
  },
  flatListView: {
    width: wp(7),
    height: wp(7),
    marginEnd: wp(3),
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.commonBlue,
  },
});
