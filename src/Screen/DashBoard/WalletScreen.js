import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CommonHeader} from '../../components';
import {strings} from '../../helper/Strings';
import {Images} from '../../helper/IconConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import {color} from '../../helper/ColorConstant';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';

const WalletScreen = ({navigation}) => {
  const [userData, setUserData] = useState({});
  const [myWallet, setMyWallet] = useState('00.00');
  const [transactionHistory, setTransactionHistory] = useState([]);

  const isFocused = useIsFocused();
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
    await firestore()
      .collection('UserWallet')
      .doc(auth().currentUser.uid)
      .get()
      .then(a => setTransactionHistory(a.data().transactionHistory));
  };

  useEffect(() => {
    if (myWallet != SetWalletData()) {
      SetWalletData().then(e => {
        setMyWallet(e);
      });
    } else {
      setMyWallet(myWallet);
    }
  }, [isFocused]);

  useEffect(() => {
    if (transactionHistory) {
      getTransactionHistory();
    }
  }, [isFocused]);

  useEffect(() => {
    UserData();
  }, []);
  return (
    <View style={{flex: 1}}>
      <CommonHeader
        headerName={strings.wallet}
        navigation1={() => {}}
        navigation2={() => {}}
        onPress1={false}
        onPress2={false}
        Images1={Images.planIcon}
        Images2={Images.search}
      />
      <View style={styles.walletBody}>
        <View style={styles.mywalletCardBody}>
          <Text style={styles.mywalletCardName}>{userData?.Name}</Text>
          <Text style={styles.mywalletCardBalanceTitle}>
            {strings.yourBalance}
          </Text>
          <View style={styles.mywalletCardBalanceBody}>
            <Text style={styles.mywalletCardBalance}>${myWallet}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('TopUp')}
              style={styles.topUpBut}>
              <Image style={styles.topUpIcon} source={Images.topUpIcon} />
              <Text>{strings.topUp}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 1}}>
          <View style={styles.transactionHistoryHeader}>
            <Text style={styles.headerText}>{strings.transactionHistory}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('TransactionHistory')}
              style={styles.transactionHistoryViewAllBut}>
              <Text style={styles.ViewAllButText}>{strings.ViewAll}</Text>
              <Image style={styles.ViewAllButIcon} source={Images.downArrow} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={transactionHistory}
            scrollEnabled={false}
            renderItem={({item, index}) => (
              <View style={styles.FlatListBody}>
                <View style={styles.headerBody}>
                  <Text numberOfLines={1} style={styles.headerText}>
                    {item.title}
                  </Text>
                  <Text style={styles.priceText}>{item.price}</Text>
                </View>
                <Text style={{color: color.darkLight}}>
                  {item.date} - {item.time}
                </Text>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  walletBody: {
    flex: 1,
    paddingHorizontal: wp(6),
    paddingTop: hp(3),
  },
  mywalletCardBody: {
    paddingHorizontal: wp(6),
    paddingVertical: hp(3),
    backgroundColor: color.commonBlue,
    borderRadius: 10,
  },
  mywalletCardName: {
    fontSize: fontSize(18),
    fontWeight: 'bold',
    color: color.white,
    marginBottom: hp(3),
  },
  mywalletCardBalanceTitle: {
    fontSize: fontSize(16),
    fontWeight: '500',
    color: color.white,
    marginBottom: hp(1),
  },
  mywalletCardBalanceBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mywalletCardBalance: {
    fontSize: fontSize(25),
    fontWeight: 'bold',
    color: color.white,
  },
  topUpBut: {
    paddingVertical: hp(1.3),
    backgroundColor: '#fff',
    paddingHorizontal: wp(4),
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  topUpIcon: {
    height: wp(5),
    width: wp(5),
    marginEnd: wp(1),
  },
  transactionHistoryHeader: {
    flexDirection: 'row',
    paddingTop: hp(4),
    paddingBottom: hp(2),
    alignItems: 'center',
  },
  headerText: {
    fontSize: fontSize(20),
    fontWeight: 'bold',
    flex: 1,
  },
  transactionHistoryViewAllBut: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ViewAllButText: {
    color: color.commonBlue,
    fontWeight: '600',
    marginEnd: wp(3),
  },
  ViewAllButIcon: {
    width: wp(6),
    height: wp(6),
    transform: [{rotate: '270deg'}],
    tintColor: color.commonBlue,
  },
  FlatListBody: {
    paddingVertical: hp(2),
    borderBottomWidth: 1,
    borderColor: color.grayLight,
  },
  headerBody: {
    flexDirection: 'row',
    marginBottom: hp(1),
  },
  headerText: {
    flex: 1,
    fontSize: fontSize(18),
    fontWeight: '600',
  },
  priceText: {
    fontSize: fontSize(18),
  },
});
