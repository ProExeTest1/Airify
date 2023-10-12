import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {color} from '../../helper/ColorConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import {Images} from '../../helper/IconConstant';
import {CommonHeader} from '../../components';
import {strings} from '../../helper/Strings';

const FillPassngerDetails = ({navigation}) => {
  return (
    <View style={styles.headerViewStyle}>
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
      <View
        style={{
          height: hp(10),
          backgroundColor: color.commonBlue,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: wp(12),
        }}>
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
    backgroundColor: '#0041C0',
    height: hp(4),
    width: hp(4),
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressCountStyle: {
    fontSize: fontSize(17),
    fontWeight: '600',
    color: color.white,
  },
  progressInnerViewStyle: {alignItems: 'center'},
  lineViewStyle: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    marginHorizontal: wp(5),
  },
  progressTextStyle: {color: '#DBDDE1', marginTop: hp(0.5)},
});
