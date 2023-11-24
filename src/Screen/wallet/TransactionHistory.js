import auth from '@react-native-firebase/auth';
import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {FlatList, StyleSheet, Text, View} from 'react-native';

import {strings} from '../../helper/Strings';
import {CommonHeader} from '../../components';

import {Images} from '../../helper/IconConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import LottieView from 'lottie-react-native';
import {useSelector} from 'react-redux';

const TransactionHistory = ({navigation}) => {
  const isFocused = useIsFocused();
  const [transactionHistory, setTransactionHistory] = useState([]);
  const strings = useSelector(state => state?.languageReducer?.languageObject);
  const getTransactionHistory = async () => {
    await firestore()
      .collection('UserWallet')
      .doc(auth()?.currentUser?.uid)
      .get()
      .then(a => setTransactionHistory(a?.data().transactionHistory));
  };
  useEffect(() => {
    if (transactionHistory) {
      getTransactionHistory();
    }
  }, [isFocused]);
  const color = useSelector(state => state?.themereducer?.colorTheme);
  const styles = ThemeStyle(color);
  return (
    <View style={{flex: 1, backgroundColor: color.bgColor}}>
      {transactionHistory.length == 0 ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <LottieView
            source={
              color.white == '#fff'
                ? require('../../helper/noDataFound.json')
                : require('../../helper/noDataFoundDark.json')
            }
            autoPlay
            loop
            style={styles.lottiStyle}
          />
        </View>
      ) : (
        <View style={styles.TopUpBody}>
          <CommonHeader
            Images2={null}
            onPress1={true}
            onPress2={false}
            Images2Color={null}
            Images1Color={'#fff'}
            navigation2={() => {}}
            Images1={Images.backIcon}
            headerName={strings.walletTopUp}
            navigation1={() => {
              navigation?.navigate('WalletScreen');
            }}
          />
          <View style={{flex: 1, paddingHorizontal: wp(8)}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={transactionHistory}
              bounces={false}
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
      )}
    </View>
  );
};

export default TransactionHistory;

const ThemeStyle = color =>
  StyleSheet.create({
    TopUpBody: {
      flex: 1,
    },
    FlatListBody: {
      borderBottomWidth: 1,
      paddingVertical: hp(2),
      borderColor: color.grey,
    },
    headerBody: {
      marginBottom: hp(1),
      flexDirection: 'row',
    },
    headerText: {
      flex: 1,
      fontWeight: '600',
      fontSize: fontSize(18),
      color: color.black,
    },
    priceText: {
      fontSize: fontSize(18),
      color: color.black,
    },
  });
