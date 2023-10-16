import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {PickerHeaderBar, SwiperFlatlistComponent} from '../../components';
import {strings} from '../../helper/Strings';
import {randomPromoCodeGenerator} from '../../helper/RandomPromoCodegenerator';
import {Images} from '../../helper/IconConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import {color} from '../../helper/ColorConstant';
import Clipboard from '@react-native-clipboard/clipboard';

const SpecialOfferScreen = ({route, navigation}) => {
  const headerData = route?.params?.header;
  const promocode = randomPromoCodeGenerator(6);

  const copyToClipboard = () => {
    Clipboard.setString(promocode);
    if (Platform.OS === 'android') {
      ToastAndroid.show('Text copied to clipboard!', ToastAndroid.SHORT);
    } else if (Platform.OS === 'ios') {
      Alert.alert('Text copied to clipboard!');
    }
  };
  return (
    <View style={styles.container}>
      <PickerHeaderBar
        headerName={headerData}
        navigation={() => navigation.goBack()}
      />
      <View style={styles.innerContainer}>
        <SwiperFlatlistComponent showPagination={true} />
        <Text style={styles.titleStyle}>{strings.exclusive_offer}</Text>
        <Text style={[styles.textStyle, {marginVertical: hp(1.2)}]}>
          {strings.offeerDiscription}
        </Text>
        <View style={styles.promocodeViewStyle}>
          <Text style={styles.promocodeTextStyle}>{promocode}</Text>
          <TouchableOpacity onPress={() => copyToClipboard()}>
            <Image
              source={Images.copy}
              style={styles.copyImageStyle}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.validateViewStyle}>
          <View>
            <View style={styles.commonViewStyle}>
              <Image
                source={Images.clock}
                style={styles.clockimageStyle}
                resizeMode="contain"
              />
              <Text style={styles.textStyle1}>Valid until</Text>
            </View>
            <Text style={styles.validateTextStyle}>Dec 31,2023</Text>
          </View>
          <View style={styles.lineStyle}></View>
          <View>
            <View style={styles.commonViewStyle}>
              <Image
                source={Images.payments}
                style={styles.clockimageStyle}
                resizeMode="contain"
              />
              <Text style={styles.textStyle1}>Min transaction</Text>
            </View>
            <Text style={styles.validateTextStyle}>$1,000.00</Text>
          </View>
        </View>
        <Text style={styles.titleStyle}>{strings.T_and_D}</Text>
        <View style={styles.termsTextViewStyle}>
          <Text style={styles.dottextStyle}>•</Text>
          <Text style={styles.textStyle}>{strings.T_and_D_line1}</Text>
        </View>
        <View style={styles.termsTextViewStyle}>
          <Text style={styles.dottextStyle}>•</Text>
          <Text style={styles.textStyle}>{strings.T_and_D_line2}</Text>
        </View>
        <TouchableOpacity style={styles.claimDiscountButtonStyle}>
          <Text style={styles.claimDiscountFontStyle}>Claim Discount</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SpecialOfferScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  innerContainer: {
    marginHorizontal: wp(5),
    marginVertical: hp(2),
  },
  titleStyle: {
    fontSize: fontSize(20),
    fontWeight: '700',
    marginTop: hp(0.5),
    color: color.black,
  },
  dottextStyle: {
    fontSize: fontSize(16),
    color: '#565656',
    marginHorizontal: wp(2),
  },
  textStyle: {
    fontSize: fontSize(16),
    color: '#565656',
  },
  termsTextViewStyle: {
    flexDirection: 'row',
    marginVertical: hp(0.8),
  },
  claimDiscountButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(7),
    borderRadius: 12,
    backgroundColor: 'blue',
    marginVertical: Platform.OS === 'ios' ? hp(4) : null,
  },
  claimDiscountFontStyle: {
    fontSize: fontSize(18),
    color: color.white,
    fontWeight: 'bold',
  },
  promocodeViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#F3F3F3',
    height: hp(7.5),
    justifyContent: 'center',
  },
  promocodeTextStyle: {
    fontSize: fontSize(18),
    marginHorizontal: wp(3),
    color: color.black,
  },
  copyImageStyle: {
    height: hp(3),
    width: hp(3),
  },
  validateViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: color.grey,
    padding: hp(2),
    borderRadius: 5,
    marginVertical: hp(1.2),
  },
  clockimageStyle: {
    height: hp(2),
    width: hp(2),
    tintColor: color.commonBlue,
  },
  commonViewStyle: {
    flexDirection: 'row',
    marginVertical: hp(0.8),
  },
  lineStyle: {
    borderWidth: 0.5,
    height: hp(5),
  },
  validateTextStyle: {
    fontWeight: '700',
    marginLeft: wp(7),
    color: color.black,
  },
  textStyle1: {
    marginHorizontal: wp(2.5),
    color: color.black,
  },
});
