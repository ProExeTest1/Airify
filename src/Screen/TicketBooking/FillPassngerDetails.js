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
import {CommonHeader, TicktBookingProgressBar} from '../../components';
import {strings} from '../../helper/Strings';

const FillPassngerDetails = ({navigation}) => {
  return (
    <View style={styles.headerViewStyle}>
      <CommonHeader
        headerName={'Fill In Details'}
        navigation1={() => {
          navigation.goBack();
        }}
        navigation2={() => {}}
        Images1Color={'#fff'}
        Images2Color={null}
        onPress1={true}
        onPress2={false}
        Images1={Images.backIcon}
        Images2={null}
      />
      <TicktBookingProgressBar progress={1}></TicktBookingProgressBar>
      <View style={{flex: 1}}></View>
      <View style={styles.bottomButtonBody}>
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate('SelectSeat');
            navigation.navigate('PatmentConfirmation');
          }}
          style={styles.okButton}>
          <Text style={styles.okButtonText}>{strings.continue}</Text>
        </TouchableOpacity>
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

  bottomButtonBody: {
    backgroundColor: '#fff',
    paddingHorizontal: wp(6),
    paddingTop: hp(2),
    paddingBottom: hp(4),
    flexDirection: 'row',
  },

  okButton: {
    backgroundColor: color.commonBlue,
    paddingVertical: hp(2),
    alignItems: 'center',
    borderRadius: 10,
    flex: 1,
  },
  okButtonText: {
    fontSize: fontSize(18),
    fontWeight: '500',
    color: '#fff',
  },
});
