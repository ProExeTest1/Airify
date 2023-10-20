import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {fontSize, hp, wp} from '../../helper/Constant';
import {strings} from '../../helper/Strings';
import {color} from '../../helper/ColorConstant';
import {useSelector} from 'react-redux';

const Congratulation = ({navigation}) => {
  const route = useRoute();
  console.log('route', route?.params?.header);
  const totalPaymentList = useSelector(e => e.SelectSeatData.totalPaymentList);
  console.log(totalPaymentList);
  return (
    <View
      style={{
        flex: 1,
      }}>
      <StatusBar barStyle={'dark-content'} />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: wp(6),
        }}>
        <LottieView
          source={require('../../helper/Congratulation.json')}
          autoPlay
          loop
          style={{
            height: hp(20),
            width: wp(100),
          }}
        />
        <Text
          style={{
            fontSize: fontSize(25),
            textAlign: 'center',
            fontWeight: 'bold',
            marginTop: hp(2),
            color: '#000',
          }}>
          Congratulation! You've Earned {totalPaymentList.points.getPoint}{' '}
          Points!
        </Text>
        <Text
          style={{
            textAlign: 'center',
            marginTop: hp(2),
            color: '#000',
          }}>
          Your next adventure lust cot even barer. Use your points for discounts
          on future flights!
        </Text>
      </View>
      <View style={styles.bottomButtonBody}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(route?.params?.header);
          }}
          style={styles.okButton}>
          <Text style={styles.okButtonText}>Ok</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Congratulation;

const styles = StyleSheet.create({
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
