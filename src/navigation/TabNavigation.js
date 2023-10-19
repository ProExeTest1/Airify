import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Images} from '../helper/IconConstant';
import {TabBarComponents} from '../components';
import HomeScreen from '../screen/dashBoard/HomeScreen';
import SavedScreen from '../screen/dashBoard/SavedScreen';
import WalletScreen from '../screen/dashBoard/WalletScreen';
import AccountScreen from '../screen/dashBoard/AccountScreen';
import BookingsScreen from '../screen/dashBoard/BookingsScreen';

const Tab = createBottomTabNavigator();
const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        options={{
          title: 'Home',
          tabBarIcon: props => (
            <TabBarComponents props={props} Icon={Images.TabHomeIcon} />
          ),
        }}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          title: 'Saved',
          tabBarIcon: props => (
            <TabBarComponents props={props} Icon={Images.saved} />
          ),
        }}
        name="SavedScreen"
        component={SavedScreen}
      />
      <Tab.Screen
        options={{
          title: 'Bookings',
          tabBarIcon: props => (
            <TabBarComponents props={props} Icon={Images.booking} />
          ),
        }}
        name="BookingsScreen"
        component={BookingsScreen}
      />
      <Tab.Screen
        options={{
          title: 'Wallet',
          tabBarIcon: props => (
            <TabBarComponents props={props} Icon={Images.wallet} />
          ),
        }}
        name="WalletScreen"
        component={WalletScreen}
      />
      <Tab.Screen
        options={{
          title: 'Account',
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
