import React, {useEffect, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import moment from 'moment';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {RAZORPAY_KEY_ID} from '@env';
import {strings} from '../../helper/Strings';
import {CommonHeader} from '../../components';
import {color} from '../../helper/ColorConstant';
import {Images} from '../../helper/IconConstant';
import {fontSize, hp, wp} from '../../helper/Constant';

const TopUp = ({navigation}) => {
  const [userData, setUserData] = useState({});
  const [textInput1, setTextInput1] = useState('');
  const [myWallet, setMyWallet] = useState(0);
  const [transactionHistory, setTransactionHistory] = useState([]);

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
          wallet: Number(textInput1.split('.')[0]) + Number(myWallet),
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
      navigation.goBack();
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
          Images2={null}
          onPress1={true}
          onPress2={false}
          Images2Color={null}
          Images1Color={'#fff'}
          Images1={Images.backIcon}
          headerName={strings.walletTopUp}
          navigation2={() => {}}
          navigation1={() => {
            navigation.goBack();
          }}
        />
        <View style={styles.borderBottom}></View>
        <View style={styles.inputBody}>
          <View style={styles.TextInputBody}>
            <TextInput
              maxLength={4}
              placeholder="00"
              value={textInput1}
              inputMode="numeric"
              placeholderTextColor={'#fff'}
              style={styles.TextInputStyle}
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
    paddingTop: hp(3),
    paddingBottom: hp(5),
    backgroundColor: '#fff',
    paddingHorizontal: wp(6),
  },
  ContinueButton: {
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: hp(2),
    backgroundColor: color.commonBlue,
    paddingHorizontal: wp(4),
  },
  ContinueText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: fontSize(16),
  },
  inputBody: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dollorSign: {
    color: '#fff',
    fontWeight: '500',
    marginTop: hp(0.5),
    fontSize: fontSize(18),
  },
  TextInputStyle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: fontSize(40),
  },
  TextInputBody: {
    flexDirection: 'row',
  },
});
