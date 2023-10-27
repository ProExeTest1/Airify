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

const TicktList = ({SelectDate, SearchFlightCard, tripType1, tripType}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const reduxDepatureDate = useSelector(state => state?.date?.depatureDate);

  const reduxReturnDate = useSelector(state => state.date.returnDate);
  console.log(reduxReturnDate, 'reduxReturnDate');
  console.log(reduxDepatureDate, 'reduxDepatureDate');
  const setCartFlightData = item => {
    if (
      reduxDepatureDate === reduxReturnDate &&
      reduxDepatureDate > reduxReturnDate
    ) {
      console.log('yes');
      AlertConstant('Return and Departure date cannot be same');
    } else {
      console.log('no');
      if (tripType1 === 'Round-Trip') {
        dispatch(SearchFlightCardData(item));
        navigation.navigate('ReturnSearchFlight', {TripType: 'Round-trip'});
      } else {
        if (tripType == 'Round-Trip') {
          dispatch(SearchFlightReturnCardAction(item));
          navigation.navigate('FlightDetails', {TripType: 'Round-Trip'});
        } else {
          dispatch(SearchFlightCardData(item));
          navigation.navigate('FlightDetails', {TripType: 'One-Way'});
        }
      }
    }
  };

  return (
    <View style={styles.ScrollViewBody}>
      <FlatList
        data={SearchFlightCard.filter(i => {
          if (
            `${new Date().toLocaleString('en-IN').split(',')[0]}` ==
            SelectDate?.date
          ) {
            return (
              i.pickTime >
              `${new Date(Date.now() + 3600000 * 3).getHours()}:${new Date(
                Date.now() + 3600000 * 3,
              ).getMinutes()}`
            );
          }
          return i;
        })}
        bounces={false}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <CardList
              item={item}
              index={index}
              setCartFlightData={setCartFlightData}
              tripType={tripType}
            />
          );
        }}
        key={({index}) => index}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  ScrollViewBody: {
    flex: 1,
    paddingHorizontal: wp(7),
  },
});
export default TicktList;
