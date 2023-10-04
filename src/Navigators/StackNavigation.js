import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import SearchFlights from '../screen/searchFlights/SearchFlights';
import TabNavigation from './TabNavigation';
import SearchFlightsFilter from '../screen/searchFlights/SearchFlightsFilter';
import DatePickerScreen from '../screen/dashBoard/DatePickerScreen';
import PlacePickerScreen from '../screen/dashBoard/PlacePickerScreen';
const Stack = createNativeStackNavigator();
const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="TabNavigation" component={TabNavigation} />
        <Stack.Screen
          name="SearchFlightsFilter"
          component={SearchFlightsFilter}
        />
        <Stack.Screen name="DatePicker" component={DatePickerScreen} />
        <Stack.Screen name="PlacePicker" component={PlacePickerScreen} />
        <Stack.Screen name="SearchFlights" component={SearchFlights} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
