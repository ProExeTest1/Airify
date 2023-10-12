import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CommonHeader} from '../../components';
import {strings} from '../../helper/Strings';
import {Images} from '../../helper/IconConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import {color} from '../../helper/ColorConstant';

const SelectSeat = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <CommonHeader
        headerName={strings.selectSeat}
        navigation1={() => {
          navigation.goBack();
        }}
        navigation2={() => {}}
        onPress1={true}
        onPress2={false}
        Images1={Images.backIcon}
        Images2={null}
      />
      <View style={styles.selectSeatHeaderBody}>
        <FlatList
          data={['kenil panchani', 'kenil panchani', 'kenil panchani']}
          bounces={false}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <View
              style={[
                styles.FlatListBody,
                {marginStart: index === 0 ? wp(6) : wp(0)},
              ]}>
              <View
                style={{
                  backgroundColor: color.commonBlue,
                  height: wp(7),
                  width: wp(7),
                  borderRadius: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginEnd: wp(3),
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: fontSize(16),
                    fontWeight: 'bold',
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
    backgroundColor: color.commonBlue,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: hp(1),
    paddingBottom: hp(2),
  },
  FlatListBody: {
    flexDirection: 'row',
    width: wp(38),

    marginEnd: wp(4),
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: wp(3),
    alignItems: 'center',
  },
});
