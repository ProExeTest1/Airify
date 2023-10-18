import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CommonHeader} from '../../components';
import {strings} from '../../helper/Strings';
import {Images} from '../../helper/IconConstant';
import {color} from '../../helper/ColorConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {SelectpaymentMethodAction} from '../../redux/action/SelectSeatAction';

const PaymentMethod = ({navigation}) => {
  const dispatch = useDispatch();
  const [WalletData, setWalletData] = useState({});
  const [selectOpc, setSelectOpc] = useState({});
  const item = useSelector(state => state.searchFlight.searchFlightCardData);
  const searchFlightData = useSelector(e => e?.place?.searchFlightData);
  const totalSeat = Number(searchFlightData.passenger.split(' ')[0]);
  const ticketPrice = parseInt(item?.price.slice(1, 8).split(',').join(''), 10);

  console.log('>>>>>>>>>>>>>>', Number(WalletData?.wallet?.split(',')[0]));
  const setDataFunction = () => {
    if (totalSeat * ticketPrice <= Number(WalletData?.wallet?.split(',')[0])) {
      dispatch(SelectpaymentMethodAction(selectOpc));
      navigation.goBack();
    } else {
      navigation.navigate('TopUp');
      Alert.alert('please TopUp your Wallet');
    }
  };
  const getFirebaseData = async () => {
    await firestore()
      .collection('UserWallet')
      .onSnapshot(querySnapshot => {
        const users = [];

        querySnapshot.forEach(documentSnapshot => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        console.log(users);
        users.filter(item => {
          if (item.key == auth().currentUser.uid) {
            setWalletData(item);
            return true;
          } else {
            return true;
          }
        });
      });
  };
  console.log(WalletData);
  useEffect(() => {
    getFirebaseData();
  }, []);
  return (
    <View style={styles.container}>
      <CommonHeader
        headerName={strings.selectPaymentMethod}
        navigation1={() => {
          navigation.goBack();
        }}
        onPress1={true}
        onPress2={false}
        Images1={Images.backIcon}
        Images2={null}
        cancelButtonStyle1={styles.plusIconStyle}
        Images1Color={color.white}
      />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: wp(6)}}>
        <TouchableOpacity
          onPress={() =>
            setSelectOpc({type: 'My Wallet', image: Images.wallet})
          }
          style={[
            styles.PaymentMethodBody,
            {
              borderColor:
                selectOpc.type === 'My Wallet' ? color.commonBlue : '#fff',
            },
          ]}>
          <Image style={styles.PaymentMethodIcon} source={Images.wallet} />
          <Text style={styles.PaymentMethodName}>My Wallet</Text>
          <View style={styles.myWalletBody}>
            <Text
              style={[
                styles.walletPraice,
                {
                  color:
                    totalSeat * ticketPrice <=
                    Number(WalletData?.wallet?.split(',')[0])
                      ? color.commonBlue
                      : 'red',
                },
              ]}>
              ${WalletData.wallet}
            </Text>
            <Image
              style={[
                styles.selectedCard,
                {
                  tintColor:
                    selectOpc.type === 'My Wallet' ? color.commonBlue : '#fff',
                },
              ]}
              source={Images.doneIcon}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            setSelectOpc({type: 'PayPal', image: Images.paypalIcon})
          }
          style={[
            styles.PaymentMethodBody,
            {
              borderColor:
                selectOpc.type === 'PayPal' ? color.commonBlue : '#fff',
            },
          ]}>
          <Image
            style={styles.PaymentMethodOtherIcon}
            source={Images.paypalIcon}
          />
          <Text style={styles.PaymentMethodName}>PayPal</Text>
          <View style={styles.myWalletBody}>
            <Image
              style={[
                styles.selectedCard,
                {
                  tintColor:
                    selectOpc.type === 'PayPal' ? color.commonBlue : '#fff',
                },
              ]}
              source={Images.doneIcon}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            setSelectOpc({type: 'Google Pay', image: Images.google})
          }
          style={[
            styles.PaymentMethodBody,
            {
              borderColor:
                selectOpc.type === 'Google Pay' ? color.commonBlue : '#fff',
            },
          ]}>
          <Image style={styles.PaymentMethodOtherIcon} source={Images.google} />
          <Text style={styles.PaymentMethodName}>Google Pay</Text>
          <View style={styles.myWalletBody}>
            <Image
              style={[
                styles.selectedCard,
                {
                  tintColor:
                    selectOpc.type === 'Google Pay' ? color.commonBlue : '#fff',
                },
              ]}
              source={Images.doneIcon}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectOpc({type: 'Apple Pay', image: Images.apple})}
          style={[
            styles.PaymentMethodBody,
            {
              borderColor:
                selectOpc.type === 'Apple Pay' ? color.commonBlue : '#fff',
            },
          ]}>
          <Image style={styles.PaymentMethodOtherIcon} source={Images.apple} />
          <Text style={styles.PaymentMethodName}>Apple Pay</Text>
          <View style={styles.myWalletBody}>
            <Image
              style={[
                styles.selectedCard,
                {
                  tintColor:
                    selectOpc.type === 'Apple Pay' ? color.commonBlue : '#fff',
                },
              ]}
              source={Images.doneIcon}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            setSelectOpc({type: 'Visa Pay', image: Images.visaIcon})
          }
          style={[
            styles.PaymentMethodBody,
            {
              borderColor:
                selectOpc.type === 'Visa Pay' ? color.commonBlue : '#fff',
            },
          ]}>
          <Image
            style={styles.PaymentMethodOtherIcon}
            source={Images.visaIcon}
          />
          <Text style={styles.PaymentMethodName}>Visa Pay</Text>
          <View style={styles.myWalletBody}>
            <Image
              style={[
                styles.selectedCard,
                {
                  tintColor:
                    selectOpc.type === 'Visa Pay' ? color.commonBlue : '#fff',
                },
              ]}
              source={Images.doneIcon}
            />
          </View>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.bottomButtonBody}>
        <TouchableOpacity
          onPress={() => {
            selectOpc.type === 'My Wallet'
              ? setDataFunction()
              : Alert.alert(
                  'PayPal,Google Pay,Apple Pay and Visa pay not available at that time please pay with Wallet',
                );
          }}
          style={styles.okButton}>
          <Text style={styles.okButtonText}>{strings.payNow}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentMethod;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  PaymentMethodBody: {
    backgroundColor: '#fff',
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
    marginTop: hp(3),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
  },
  PaymentMethodIcon: {
    height: wp(15),
    width: wp(15),
    tintColor: color.commonBlue,
    marginEnd: wp(4),
  },
  PaymentMethodName: {
    flex: 1,
    fontSize: fontSize(18),
    fontWeight: '600',
  },
  myWalletBody: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletPraice: {
    fontSize: fontSize(18),
    fontWeight: '600',
    marginEnd: wp(3),
  },
  selectedCard: {
    height: wp(7),
    width: wp(7),
  },
  PaymentMethodOtherIcon: {
    height: wp(15),
    width: wp(15),
    marginEnd: wp(4),
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
