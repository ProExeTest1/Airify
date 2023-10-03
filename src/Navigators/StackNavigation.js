import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import SearchFlights from '../screen/searchFlights/SearchFlights';
import TabNavigation from './TabNavigation';
import SearchFlightsFilter from '../screen/searchFlights/SearchFlightsFilter';
const Stack = createNativeStackNavigator();
const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="SearchFlights" component={SearchFlights} />
        <Stack.Screen
          name="SearchFlightsFilter"
          component={SearchFlightsFilter}
        />
        <Stack.Screen name="TabNavigation" component={TabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
