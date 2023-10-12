import {
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {color} from '../../helper/ColorConstant';
import {CommonHeader} from '../../components';
import {strings} from '../../helper/Strings';
import {Images} from '../../helper/IconConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import {RAZORPAY_KEY_ID} from '@env';
import RazorpayCheckout from 'react-native-razorpay';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Modal from 'react-native-modal';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';

const TopUp = ({navigation}) => {
  const [textInput1, setTextInput1] = useState('');
  const [userData, setUserData] = useState({});
  const [myWallet, setMyWallet] = useState('00.00');
  const [transactionHistory, setTransactionHistory] = useState([]);

  // const Focused = useIsFocused();
  // console.log(transactionHistory);
  const UserData = async () => {
    const journeyData = await firestore()
      .collection('Users')
      .doc(auth().currentUser.uid)
      .get();
    setUserData(journeyData.data());
  };

  const SetWalletData = async () => {
    let data = await firestore()
      .collection('UserWallet')
      .doc(auth().currentUser.uid)
      .get()
      .then(a => a.data().wallet);
    return data;
  };

  const getTransactionHistory = async () => {
    let data = await firestore()
      .collection('UserWallet')
      .doc(auth().currentUser.uid)
      .get()
      .then(a => a.data().transactionHistory);

    return data;
  };
  useEffect(() => {
    UserData();
  }, []);

  useEffect(() => {
    if (myWallet != SetWalletData()) {
      SetWalletData().then(e => {
        setMyWallet(e);
      });
    } else {
      setMyWallet(myWallet);
    }
  }, [userData]);

  useEffect(() => {
    if (transactionHistory.length != getTransactionHistory().length) {
      getTransactionHistory().then(e => {
        setTransactionHistory(e);
      });
    } else {
      setTransactionHistory(transactionHistory);
    }
  }, [transactionHistory]);

  const currency = 'INR';
  let razorpayKeyId = RAZORPAY_KEY_ID;

  const handlePayment = async () => {
    if (textInput1.trim() !== '') {
      // var options = {
      //   description: strings.walletTopUp,
      //   image: '',
      //   currency: currency,
      //   key: razorpayKeyId,
      //   amount: Number(textInput1) * 100,
      //   name: strings.walletTopUp,
      //   order_id: '',
      //   prefill: {
      //     email: userData.Email,
      //     contact: userData.PhoneNumber,
      //     name: userData.Name,
      //   },
      //   theme: {color: color.commonBlue, currency: currency},
      // };

      // RazorpayCheckout.open(options)
      //   .then(async data => {
      //     if (data?.razorpay_payment_id) {
      //       await firestore()
      //         .collection('UserWallet')
      //         .doc(auth().currentUser.uid)
      //         .update({
      //           wallet: `${
      //             Number(textInput1.split('.')[0]) +
      //             Number(myWallet.split('.')[0])
      //           }.00`,
      //         })
      //         .then(() => {
      //           navigation.navigate('WalletScreen');
      //         });
      //     }
      //     // Alert.alert(`Success: ${data.razorpay_payment_id}`);
      //   })
      //   .catch(error => {
      //     console.log('error>>>>>>>>>>>', error);
      //   });
      await firestore()
        .collection('UserWallet')
        .doc(auth().currentUser.uid)
        .update({
          wallet: `${
            Number(textInput1.split('.')[0]) + Number(myWallet.split('.')[0])
          }.00`,
        })
        .then(async () => {
          await firestore()
            .collection('UserWallet')
            .doc(auth().currentUser.uid)
            .update({
              transactionHistory: [
                {
                  title: strings.walletTopUp,
                  price: `+$${textInput1}`,
                  date: moment(new Date()).format('MMM D,YYYY'),
                  time: new Date().toLocaleTimeString('en-IN'),
                },
                ...transactionHistory,
              ],
            });
          navigation.navigate('WalletScreen');
        });
    } else {
      Alert.alert('plsss enter valid ');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'height' : ''}
      style={{flex: 1}}>
      <View style={styles.TopUpBody}>
        <CommonHeader
          headerName={strings.walletTopUp}
          navigation1={() => {
            navigation.navigate('WalletScreen');
          }}
          Images1Color={'#fff'}
          Images2Color={null}
          navigation2={() => {}}
          onPress1={true}
          onPress2={false}
          Images1={Images.backIcon}
          Images2={null}
        />
        <View style={styles.borderBottom}></View>
        <View style={styles.inputBody}>
          <View style={styles.TextInputBody}>
            <TextInput
              value={textInput1}
              placeholder="00"
              placeholderTextColor={'#fff'}
              style={styles.TextInputStyle}
              maxLength={4}
              inputMode="numeric"
              onChangeText={e => setTextInput1(e)}
            />
            <Text style={styles.dollorSign}>$</Text>
          </View>
          <Text style={{color: '#fff'}}>
            {strings.avalableBalance}
            {myWallet}$
          </Text>
        </View>
        <View style={styles.buttonBody}>
          <TouchableOpacity
            onPress={() => {
              textInput1.length !== 0
                ? handlePayment()
                : Alert.alert('please enter valid amount');
            }}
            style={styles.ContinueButton}>
            <Text style={styles.ContinueText}>{strings.continue}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default TopUp;

const styles = StyleSheet.create({
  TopUpBody: {
    flex: 1,
    backgroundColor: color.commonBlue,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: '#e2e2e250',
  },
  buttonBody: {
    backgroundColor: '#fff',
    paddingTop: hp(3),
    paddingBottom: hp(5),
    paddingHorizontal: wp(6),
  },
  ContinueButton: {
    backgroundColor: color.commonBlue,
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
    alignItems: 'center',
    borderRadius: 10,
  },
  ContinueText: {
    fontSize: fontSize(16),
    fontWeight: '500',
    color: '#fff',
  },
  inputBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dollorSign: {
    color: '#fff',
    fontSize: fontSize(18),
    fontWeight: '500',
    marginTop: hp(0.5),
  },
  TextInputStyle: {
    fontSize: fontSize(40),
    fontWeight: 'bold',
    color: '#fff',
  },
  TextInputBody: {
    flexDirection: 'row',
  },
});
