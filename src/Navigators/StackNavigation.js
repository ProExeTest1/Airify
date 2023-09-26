import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SearchFlights from '../screen/SearchFlights';
import TabNavigation from './TabNavigation';
const Stack = createNativeStackNavigator();
const StackNavigation = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
            headerShown:false
        }} initialRouteName='TabNavigation'>
          <Stack.Screen name="TabNavigation" component={TabNavigation} />
          <Stack.Screen name="SearchFlights" component={SearchFlights} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default StackNavigation;
