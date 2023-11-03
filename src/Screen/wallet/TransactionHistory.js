import auth from '@react-native-firebase/auth';
import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {FlatList, StyleSheet, Text, View} from 'react-native';

import {strings} from '../../helper/Strings';
import {CommonHeader} from '../../components';
import {color} from '../../helper/ColorConstant';
import {Images} from '../../helper/IconConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import LottieView from 'lottie-react-native';

const TransactionHistory = ({navigation}) => {
  const isFocused = useIsFocused();
  const [transactionHistory, setTransactionHistory] = useState([]);

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

  return (
    <View style={{flex: 1}}>
      {transactionHistory.length == 0 ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <LottieView
            source={require('../../helper/noDataFound.json')}
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

const styles = StyleSheet.create({
  TopUpBody: {
    flex: 1,
  },
  FlatListBody: {
    borderBottomWidth: 1,
    paddingVertical: hp(2),
    borderColor: color.grayLight,
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
