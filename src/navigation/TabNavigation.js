import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Images} from '../helper/IconConstant';
import {TabBarComponents} from '../components';
import HomeScreen from '../screen/dashBoard/HomeScreen';
import SavedScreen from '../screen/dashBoard/SavedScreen';
import WalletScreen from '../screen/dashBoard/WalletScreen';
import AccountScreen from '../screen/dashBoard/AccountScreen';
import BookingsScreen from '../screen/dashBoard/BookingsScreen';
import DeviceInfo from 'react-native-device-info';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alert, NativeModules} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const navigation = useNavigation();
  useEffect(() => {
    UserLoginMaintain();
  }, []);
  const strings = useSelector(state => state?.languageReducer?.languageObject);
  const UserLoginMaintain = async () => {
    let ID = await DeviceInfo?.getUniqueId();
    await firestore()
      .collection('Users')
      .doc(auth().currentUser?.uid)
      .get()
      .then(i => {
        if (i?.data()?.DeviceId != ID) {
          Alert.alert(
            'Already LoggedIn',
            'User already Logged In Other Device',
            [{text: 'OK', onPress: () => navigation.navigate('WelcomeScreen')}],
          );
          auth().signOut();
        }
      })
      .catch(err => {
        console.log('err', err);
      });
  };
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        options={{
          title: strings?.Home,
          tabBarIcon: props => (
            <TabBarComponents props={props} Icon={Images.TabHomeIcon} />
          ),
        }}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          title: strings?.Saved,
          tabBarIcon: props => (
            <TabBarComponents props={props} Icon={Images.saved} />
          ),
        }}
        name="SavedScreen"
        component={SavedScreen}
      />
      <Tab.Screen
        options={{
          title: strings?.Bookings,
          tabBarIcon: props => (
            <TabBarComponents props={props} Icon={Images.booking} />
          ),
        }}
        name="BookingsScreen"
        component={BookingsScreen}
      />
      <Tab.Screen
        options={{
          title: strings?.Wallet,
          tabBarIcon: props => (
            <TabBarComponents props={props} Icon={Images.wallet} />
          ),
        }}
        name="WalletScreen"
        component={WalletScreen}
      />
      <Tab.Screen
        options={{
          title: strings?.Account,
          tabBarIcon: props => (
            <TabBarComponents
              props={props}
              ActiveIcon={Images.TabActiveHomeIcon}
              Icon={Images.account}
            />
          ),
        }}
        name="AccountScreen"
        component={AccountScreen}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
