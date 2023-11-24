import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {View, StyleSheet, FlatList} from 'react-native';

import CardList from './CardList';
import {wp} from '../../helper/Constant';
import {
  SearchFlightCardData,
  SearchFlightReturnCardAction,
} from '../../redux/action/SearchFlightAction';
import {AlertConstant} from '../../helper/AlertConstant';
import {strings} from '../../helper/Strings';
import moment from 'moment';

const TicktList = ({SelectDate, SearchFlightCard, tripType1, tripType}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const reduxDepatureDate = useSelector(state => state?.date?.depatureDate);

  const reduxReturnDate = useSelector(state => state.date.returnDate);
  let departureDate = moment(
    reduxDepatureDate.split(',')[1],
    'MMM D YYYY',
  ).format('D/M/YYYY');
  let returnDate = moment(reduxReturnDate.split(',')[1], 'MMM D YYYY').format(
    'D/M/YYYY',
  );
  const setCartFlightData = item => {
    if (tripType1 === 'Round-Trip') {
      if (reduxDepatureDate !== reduxReturnDate) {
        if (departureDate.split('/')[1] === returnDate.split('/')[1]) {
          if (departureDate.split('/')[0] < returnDate.split('/')[0]) {
            dispatch(SearchFlightCardData(item));
            navigation?.navigate('ReturnSearchFlight', {
              TripType: 'Round-trip',
            });
          } else {
            AlertConstant(strings.wrong_return_date);
          }
        } else {
          if (departureDate.split('/')[0] < returnDate.split('/')[0]) {
            dispatch(SearchFlightCardData(item));
            navigation?.navigate('ReturnSearchFlight', {
              TripType: 'Round-trip',
            });
          } else {
            AlertConstant(strings.wrong_return_date);
          }
        }
      } else {
        AlertConstant(strings.return_departure_not_same);
      }
    } else {
      if (tripType == 'Round-Trip') {
        if (reduxDepatureDate !== reduxReturnDate) {
          if (departureDate.split('/')[1] === returnDate.split('/')[1]) {
            if (departureDate.split('/')[0] < returnDate.split('/')[0]) {
              dispatch(SearchFlightReturnCardAction(item));
              navigation?.navigate('FlightDetails', {TripType: 'Round-Trip'});
            } else {
              AlertConstant(strings.wrong_return_date);
            }
          } else {
            if (departureDate.split('/')[1] < returnDate.split('/')[1]) {
              if (departureDate.split('/')[0] < returnDate.split('/')[0]) {
                dispatch(SearchFlightReturnCardAction(item));
                navigation?.navigate('FlightDetails', {TripType: 'Round-Trip'});
              } else {
                AlertConstant(strings.wrong_return_date);
              }
            } else {
              AlertConstant(strings.wrong_return_date);
            }
          }
        } else {
          AlertConstant(strings.return_departure_not_same);
        }
      } else {
        dispatch(SearchFlightCardData(item));
        navigation?.navigate('FlightDetails', {TripType: 'One-Way'});
      }
    }
  };
  const searchFilght = SearchFlightCard?.filter(i => {
    if (
      `${new Date().toLocaleString('en-IN').split(',')[0]}` == SelectDate?.date
    ) {
      return (
        i.pickTime >
        `${new Date(Date.now() + 3600000 * 3).getHours()}:${new Date(
          Date.now() + 3600000 * 3,
        ).getMinutes()}`
      );
    }
    return i;
  });
  const color = useSelector(state => state?.themereducer?.colorTheme);
  const styles = ThemeStyle(color);
  return (
    <View style={styles.ScrollViewBody}>
      <FlatList
        data={searchFilght}
        bounces={false}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <CardList
              item={item}
              index={index}
              setCartFlightData={setCartFlightData}
              tripType={tripType}
              searchFilght={searchFilght}
            />
          );
        }}
        key={({index}) => index}
      />
    </View>
  );
};
const ThemeStyle = color =>
  StyleSheet.create({
    ScrollViewBody: {
      flex: 1,
      paddingHorizontal: wp(7),
    },
  });
export default TicktList;
