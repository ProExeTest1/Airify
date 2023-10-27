import React from 'react';
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
import QRCode from 'react-native-qrcode-generator';
import Clipboard from '@react-native-clipboard/clipboard';

import {strings} from '../../helper/Strings';
import {
  CommonHeader,
  OnBoardingText,
  OnBoardingSingleButton,
} from '../../components';
import {color} from '../../helper/ColorConstant';
import {Images} from '../../helper/IconConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import {randomPromoCodeGenerator} from '../../helper/RandomPromoCodegenerator';

const AirifyReward = ({navigation: {goBack}}) => {
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
        onPress1={true}
        onPress2={false}
        Images2={Images.info}
        Images1={Images.backIcon}
        Images1Color={color.white}
        headerName={strings.airifyReward}
        navigation1={() => {
          goBack();
        }}
        cancelButtonStyle1={styles.plusIconStyle}
      />
      <View>
        <OnBoardingText
          OnBoardingMainText={strings.getSpecialReward}
          OnBoardingMainTextStyle={styles.bodyMainText}
          OnBoardingSubText={strings.getSpecialRewardSub}
        />
        <View style={styles.qrCodeStyle}>
          <QRCode
            size={300}
            bgColor="black"
            fgColor="white"
            value={promocode}
          />
        </View>
      </View>
      <View style={styles.referralCodeView}>
        <Text style={{fontSize: fontSize(16)}}>{strings.copyCode}</Text>
        <View style={styles.textView}>
          <Text style={styles.promocodeTextStyle}>{promocode}</Text>
          <TouchableOpacity onPress={() => copyToClipboard()}>
            <Image
              resizeMode="contain"
              source={Images.copy}
              style={styles.copyImageStyle}
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
    borderWidth: 1,
    marginTop: hp(4),
    alignItems: 'center',
    paddingVertical: hp(4),
    marginHorizontal: wp(8),
    justifyContent: 'center',
    borderColor: color.grayLight,
  },
  promocodeViewStyle: {
    borderRadius: 5,
    flexDirection: 'row',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(2),
    backgroundColor: color.Grey,
  },
  promocodeTextStyle: {
    fontWeight: 'bold',
    marginRight: wp(2),
    color: color.black,
    fontSize: fontSize(18),
  },
  copyImageStyle: {
    width: hp(3),
    height: hp(3),
  },
  referralCodeView: {
    alignItems: 'center',
    paddingVertical: hp(4),
    justifyContent: 'center',
  },
  textView: {
    borderRadius: 4,
    marginTop: hp(2),
    marginBottom: hp(4),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(28),
    backgroundColor: color.Grey,
  },
});

export default AirifyReward;
