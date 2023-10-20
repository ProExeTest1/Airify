import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {strings} from '../../helper/Strings';
import {CommonHeader} from '../../components';
import {color} from '../../helper/ColorConstant';
import {Images} from '../../helper/IconConstant';
import {fontSize, hp, wp} from '../../helper/Constant';

const FillPassngerDetails = ({navigation}) => {
  return (
    <View style={styles.headerViewStyle}>
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
      <View style={styles.MainView}>
        <View style={styles.progressInnerViewStyle}>
          <View style={styles.progressViewStyle}>
            <Text style={styles.progressCountStyle}>1</Text>
          </View>
          <Text style={styles.progressTextStyle}>Book</Text>
        </View>

        <View style={styles.lineViewStyle} />
        <View style={styles.progressInnerViewStyle}>
          <View style={styles.progressViewStyle}>
            <Text style={styles.progressCountStyle}>2</Text>
          </View>
          <Text style={styles.progressTextStyle}>Pay</Text>
        </View>
        <View style={styles.lineViewStyle} />
        <View style={styles.progressInnerViewStyle}>
          <View style={styles.progressViewStyle}>
            <Text style={styles.progressCountStyle}>3</Text>
          </View>
          <Text style={styles.progressTextStyle}>E-Ticket</Text>
        </View>
      </View>
    </View>
  );
};

export default FillPassngerDetails;
// 2.8% travel inssurance
//1.5% tax
const styles = StyleSheet.create({
  headerViewStyle: {
    flex: 1,
  },
  progressViewStyle: {
    width: hp(4),
    height: hp(4),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0041C0',
  },
  progressCountStyle: {
    fontWeight: '600',
    color: color.white,
    fontSize: fontSize(17),
  },
  progressInnerViewStyle: {alignItems: 'center'},
  lineViewStyle: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    marginHorizontal: wp(5),
  },
  progressTextStyle: {color: '#DBDDE1', marginTop: hp(0.5)},
  MainView: {
    height: hp(10),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(12),
    justifyContent: 'space-between',
    backgroundColor: color.commonBlue,
  },
});
