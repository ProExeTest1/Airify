import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnBoardingFirst from '../screens/onBoarding/OnBoardingFirst';

const Stack = createNativeStackNavigator();

function StackNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="OnBoardingFirst"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="OnBoardingFirst" component={OnBoardingFirst} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigation;
