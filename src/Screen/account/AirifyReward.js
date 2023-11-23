import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Share,
  ActivityIndicator,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {strings} from '../../helper/Strings';
import {
  CommonHeader,
  OnBoardingText,
  OnBoardingSingleButton,
  Loader,
} from '../../components';
import {color} from '../../helper/ColorConstant';
import {Images} from '../../helper/IconConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import QRCode from 'react-native-qrcode-svg';
import {AlertConstant} from '../../helper/AlertConstant';
import {useSelector, useDispatch} from 'react-redux';

const AirifyReward = ({navigation: {goBack}}) => {
  const strings = useSelector(state => state?.languageReducer?.languageObject);
  const [promocode, setPromocode] = useState('');
  const copyToClipboard = () => {
    Clipboard?.setString(promocode);
    AlertConstant(strings?.text_copied_clipboard);
  };

  useEffect(() => {
    promocodeData();
  }, []);
  const promocodeData = async () => {
    await firestore()
      ?.collection('Users')
      ?.doc(auth()?.currentUser?.uid)
      ?.get()
      ?.then(i => {
        setPromocode(i?.data()?.ReferralCode);
      });
  };

  const onShare = async () => {
    try {
      const result = await Share?.share({
        message: promocode,
      });
      if (result?.action === Share?.sharedAction) {
        if (result?.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result?.action === Share?.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      AlertConstant(error?.message);
    }
  };

  return (
    <View style={styles?.container}>
      <CommonHeader
        onPress1={true}
        onPress2={false}
        Images2={Images?.info}
        Images1={Images?.backIcon}
        Images1Color={color?.white}
        headerName={strings?.airifyReward}
        navigation1={() => {
          goBack();
        }}
        cancelButtonStyle1={styles?.plusIconStyle}
      />
      <View>
        <OnBoardingText
          OnBoardingMainText={strings?.getSpecialReward}
          OnBoardingMainTextStyle={styles?.bodyMainText}
          OnBoardingSubText={strings?.getSpecialRewardSub}
        />
        <View style={styles?.qrCodeStyle}>
          {promocode ? (
            <QRCode
              value={promocode}
              size={hp(35)}
              logoBackgroundColor="transparent"
            />
          ) : (
            <ActivityIndicator size="small" />
          )}
        </View>
      </View>
      <View style={styles?.referralCodeView}>
        <Text style={{fontSize: fontSize(16), color: color?.black}}>
          {strings?.copyCode}
        </Text>
        <TouchableOpacity
          onPress={() => copyToClipboard()}
          style={styles?.textView}>
          <Text style={styles?.promocodeTextStyle}>{promocode}</Text>

          <Image
            resizeMode="contain"
            source={Images?.copy}
            style={styles?.copyImageStyle}
          />
        </TouchableOpacity>
        <View
          style={{
            borderTopWidth: 1,
            paddingVertical: hp(2),
            borderColor: color?.grey1,
          }}>
          <OnBoardingSingleButton
            buttonText={strings?.shareCode}
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
