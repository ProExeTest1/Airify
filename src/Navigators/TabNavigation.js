import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screen/DashBoard/HomeScreen';
import SavedScreen from '../Screen/DashBoard/SavedScreen';
import BookingsScreen from '../Screen/DashBoard/BookingsScreen';
import WalletScreen from '../Screen/DashBoard/WalletScreen';
import AccountScreen from '../Screen/DashBoard/AccountScreen';
import {Images} from '../Helpers/IconConstant';
import { TabBarComponents } from '../Components';

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
            <TabBarComponents
              props={props}
              Icon={Images.TabHomeIcon}
            />
          ),
        }}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          title: 'Saved',
          tabBarIcon: props => (
            <TabBarComponents
              props={props}
              Icon={Images.saved}
            />
          ),
        }}
        name="SavedScreen"
        component={SavedScreen}
      />
      <Tab.Screen
        options={{
          title: 'Bookings',
          tabBarIcon: props => (
            <TabBarComponents
              props={props}
              Icon={Images.booking}
            />
          ),
        }}
        name="BookingsScreen"
        component={BookingsScreen}
      />
      <Tab.Screen
        options={{
          title: 'Wallet',
          tabBarIcon: props => (
            <TabBarComponents
              props={props}
              Icon={Images.wallet}
            />
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
