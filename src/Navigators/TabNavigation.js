import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screen/DashBoard/HomeScreen';
import { TabActiveHomeIcon, TabHomeIcon } from '../Helpers/IconConstant';
import SavedScreen from '../Screen/DashBoard/SavedScreen';
import BookingsScreen from '../Screen/DashBoard/BookingsScreen';
import WalletScreen from '../Screen/DashBoard/WalletScreen';
import AccountScreen from '../Screen/DashBoard/AccountScreen';
import TabBarComponents from '../Components/Common/TabBarComponents';
const Tab = createBottomTabNavigator();
const TabNavigation = () => {
  return (
        <Tab.Navigator screenOptions={{
            headerShown:false,
        }}>
          <Tab.Screen options={{title:'Home',tabBarIcon:(props)=><TabBarComponents props={props} ActiveIcon={TabActiveHomeIcon} Icon={TabHomeIcon}/>}} name="HomeScreen" component={HomeScreen} />
          <Tab.Screen options={{title:'Saved',tabBarIcon:(props)=><TabBarComponents props={props} ActiveIcon={TabActiveHomeIcon} Icon={TabHomeIcon}/>}} name="SavedScreen" component={SavedScreen} />
          <Tab.Screen options={{title:'Bookings',tabBarIcon:(props)=><TabBarComponents props={props} ActiveIcon={TabActiveHomeIcon} Icon={TabHomeIcon}/>}} name="BookingsScreen" component={BookingsScreen} />
          <Tab.Screen options={{title:'Wallet',tabBarIcon:(props)=><TabBarComponents props={props} ActiveIcon={TabActiveHomeIcon} Icon={TabHomeIcon}/>}} name="WalletScreen" component={WalletScreen} />
          <Tab.Screen options={{title:'Account',tabBarIcon:(props)=><TabBarComponents props={props} ActiveIcon={TabActiveHomeIcon} Icon={TabHomeIcon}/>}} name="AccountScreen" component={AccountScreen} />
        </Tab.Navigator>
  );
};

export default TabNavigation;
