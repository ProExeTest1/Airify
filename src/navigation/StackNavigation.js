import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import OnBoardingFirst from '../screen/onBoarding/OnBoardingFirst';
import WelcomeScreen from '../screen/onBoarding/WelcomeScreen';
import SignInScreen from '../screen/onBoarding/SignInScreen';
import ResetPassword from '../screen/onBoarding/ResetPassword';
import SignUpScreen from '../screen/onBoarding/SignUpScreen';
import SignUpSuccess from '../screen/onBoarding/SignUpSuccess';
import TabNavigation from './TabNavigation';
import SearchFlightsFilter from '../screen/searchFlights/SearchFlightsFilter';
import DatePickerScreen from '../screen/dashBoard/DatePickerScreen';
import PlacePickerScreen from '../screen/dashBoard/PlacePickerScreen';
import NotificationScreen from '../screen/dashBoard/NotificationScreen';
import SpecialOfferScreen from '../screen/dashBoard/SpecialOfferScreen';
import FlightDetailsScreen from '../screen/searchFlights/FlightDetailsScreen';
import FlightPackageDetailsScreen from '../screen/searchFlights/FlightPackageDetailsScreen';
import SearchFlights from '../screen/searchFlights/SearchFlights';
import auth from '@react-native-firebase/auth';
import PersonalInfo from '../screen/account/PersonalInfo';
import Notification from '../screen/account/Notification';
import Security from '../screen/account/Security';
import Language from '../screen/account/Language';
import AboutAirify from '../screen/account/AboutAirify';
import HelpCenter from '../screen/account/HelpCenter';
import PassengerList from '../screen/account/PassengerList';
import NewPassenger from '../screen/account/NewPassenger';
import TopUp from '../screen/wallet/TopUp';
import TransactionHistory from '../screen/wallet/TransactionHistory';
import SelectSeat from '../screen/TicketBooking/SelectSeat';
import PaymentConfirmation from '../screen/TicketBooking/PaymentConfirmation';
import SavedAddress from '../screen/account/SavedAddress';
import AddAddress from '../screen/account/AddAddress';
import LocationSearch from '../screen/account/LocationSearch';
import DiscountVoucher from '../screen/account/DiscountVoucher';
import AirifyReward from '../screen/account/AirifyReward';
import AirifyPoint from '../screen/account/AirifyPoint';
import FillPassengerDetails from '../screen/TicketBooking/FillPassengerDetails';
import ReturnSearchFlights from '../screen/searchFlights/ReturnFlights/ReturnSearchFlights';
import UseDiscountVoucher from '../screen/TicketBooking/UseDiscountVoucher';
import PaymentMethod from '../screen/TicketBooking/PaymentMethod';
import ConfirmPin from '../screen/TicketBooking/ConfirmPin';

const Stack = createNativeStackNavigator();
const StackNavigation = () => {
  const user = auth()?.currentUser?.uid;
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={user ? 'TabNavigation' : 'WelcomeScreen'}>
        <Stack.Screen name="SelectSeat" component={SelectSeat} />
        <Stack.Screen name="OnBoardingFirst" component={OnBoardingFirst} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="SignUpSuccess" component={SignUpSuccess} />
        <Stack.Screen name="TabNavigation" component={TabNavigation} />
        <Stack.Screen
          name="SearchFlightsFilter"
          component={SearchFlightsFilter}
        />
        <Stack.Screen name="DatePicker" component={DatePickerScreen} />
        <Stack.Screen name="PlacePicker" component={PlacePickerScreen} />
        <Stack.Screen name="SearchFlights" component={SearchFlights} />
        <Stack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
        />
        <Stack.Screen name="SpecialOffer" component={SpecialOfferScreen} />
        <Stack.Screen name="FlightDetails" component={FlightDetailsScreen} />
        <Stack.Screen
          name="FlightPackageDetails"
          component={FlightPackageDetailsScreen}
        />
        <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="Security" component={Security} />
        <Stack.Screen name="Language" component={Language} />
        <Stack.Screen name="HelpCenter" component={HelpCenter} />
        <Stack.Screen name="AboutAirify" component={AboutAirify} />
        <Stack.Screen name="PassengerList" component={PassengerList} />
        <Stack.Screen name="NewPassenger" component={NewPassenger} />

        <Stack.Screen name="TopUp" component={TopUp} />
        <Stack.Screen
          name="FillPassengerDetails"
          component={FillPassengerDetails}
        />
        <Stack.Screen
          name="ReturnSearchFlight"
          component={ReturnSearchFlights}
        />
        <Stack.Screen
          name="TransactionHistory"
          component={TransactionHistory}
        />
        <Stack.Screen
          name="PaymentConfirmation"
          component={PaymentConfirmation}
        />
        <Stack.Screen name="SavedAddress" component={SavedAddress} />
        <Stack.Screen name="LocationSearch" component={LocationSearch} />
        <Stack.Screen name="AddAddress" component={AddAddress} />
        <Stack.Screen name="DiscountVoucher" component={DiscountVoucher} />
        <Stack.Screen name="AirifyReward" component={AirifyReward} />
        <Stack.Screen name="AirifyPoint" component={AirifyPoint} />
        <Stack.Screen
          name="UseDiscountVoucher"
          component={UseDiscountVoucher}
        />
        <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
        <Stack.Screen name="ConfirmPin" component={ConfirmPin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
