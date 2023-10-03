import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnBoardingFirst from '../screens/onBoarding/OnBoardingFirst';
import WelcomeScreen from '../screens/onBoarding/WelcomeScreen';
import SignInScreen from '../screens/onBoarding/SignInScreen';
import ResetPassword from '../screens/onBoarding/ResetPassword';
import SignUpScreen from '../screens/onBoarding/SignUpScreen';
import SignUpSuccess from '../screens/onBoarding/SignUpSuccess';

const Stack = createNativeStackNavigator();

function StackNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="OnBoardingFirst"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="OnBoardingFirst" component={OnBoardingFirst} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="SignUpSuccess" component={SignUpSuccess} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigation;
