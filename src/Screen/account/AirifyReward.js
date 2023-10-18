import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ToastAndroid,
  Alert,
  Platform,
  TouchableOpacity,
  Image,
  Share,
} from 'react-native';
import {color} from '../../helper/ColorConstant';
import {CommonHeader} from '../../components';
import {strings} from '../../helper/Strings';
import {Images} from '../../helper/IconConstant';
import OnBoardingText from '../../components/OnBoardingText';
import {fontSize, hp, wp} from '../../helper/Constant';
import QRCode from 'react-native-qrcode-generator';
import OnBoardingSingleButton from '../../components/OnBoardingSingleButton';
import {randomPromoCodeGenerator} from '../../helper/RandomPromoCodegenerator';
import Clipboard from '@react-native-clipboard/clipboard';

const AirifyReward = ({navigation: {goBack}, navigation}) => {
  const promocode = randomPromoCodeGenerator(6);

  const copyToClipboard = () => {
    Clipboard.setString(promocode);
    if (Platform.OS === 'android') {
      ToastAndroid.show('Text copied to clipboard!', ToastAndroid.SHORT);
    } else if (Platform.OS === 'ios') {
      Alert.alert('Text copied to clipboard!');
    }
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: promocode,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  return (
    <View style={styles.container}>
      <CommonHeader
        headerName={strings.airifyReward}
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
      <View>
        <OnBoardingText
          OnBoardingMainText={strings.getSpecialReward}
          OnBoardingSubText={strings.getSpecialRewardSub}
          OnBoardingMainTextStyle={styles.bodyMainText}
        />
        <View style={styles.qrCodeStyle}>
          <QRCode
            value={promocode}
            size={300}
            bgColor="black"
            fgColor="white"
          />
        </View>
      </View>
      <View style={styles.referralCodeView}>
        <Text style={{fontSize: fontSize(16)}}>{strings.copyCode}</Text>
        <View style={styles.textView}>
          <Text style={styles.promocodeTextStyle}>{promocode}</Text>
          <TouchableOpacity onPress={() => copyToClipboard()}>
            <Image
              source={Images.copy}
              style={styles.copyImageStyle}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderTopWidth: 1,
            paddingVertical: hp(2),
            borderColor: color.grey1,
          }}>
          <OnBoardingSingleButton
            buttonText={strings.shareCode}
            onPress={() => {
              onShare();
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  bodyMainText: {
    paddingVertical: hp(2),
  },
  qrCodeStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginHorizontal: wp(8),
    paddingVertical: hp(4),
    marginTop: hp(4),
    borderColor: color.grayLight,
  },
  promocodeViewStyle: {
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: color.Grey,
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(2),
  },
  promocodeTextStyle: {
    fontSize: fontSize(18),
    color: color.black,
    marginRight: wp(2),
    fontWeight: 'bold',
  },
  copyImageStyle: {
    height: hp(3),
    width: hp(3),
  },
  referralCodeView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(4),
  },
  textView: {
    backgroundColor: color.Grey,
    paddingHorizontal: wp(28),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    paddingVertical: hp(1.5),
    flexDirection: 'row',
    marginBottom: hp(4),
    marginTop: hp(2),
  },
});

export default AirifyReward;
