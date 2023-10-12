import {
  Alert,
  FlatList,
  Image,
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
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';

const TransactionHistory = ({navigation}) => {
  const [transactionHistory, setTransactionHistory] = useState([]);

  const isFocused = useIsFocused();

  const getTransactionHistory = async () => {
    await firestore()
      .collection('UserWallet')
      .doc(auth().currentUser.uid)
      .get()
      .then(a => setTransactionHistory(a.data().transactionHistory));
  };
  useEffect(() => {
    if (transactionHistory) {
      getTransactionHistory();
    }
  }, [isFocused]);

  return (
    <View style={{flex: 1}}>
      <View style={styles.TopUpBody}>
        <CommonHeader
          headerName={strings.walletTopUp}
          navigation1={() => {
            navigation.navigate('WalletScreen');
          }}
          navigation2={() => {}}
          Images1Color={'#fff'}
          Images2Color={null}
          onPress1={true}
          onPress2={false}
          Images1={Images.backIcon}
          Images2={null}
        />
        <View style={{flex: 1, paddingHorizontal: wp(8)}}>
          <FlatList
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
    </View>
  );
};

export default TransactionHistory;

const styles = StyleSheet.create({
  TopUpBody: {
    flex: 1,
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
