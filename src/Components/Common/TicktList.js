import {View, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import CardList from './CardList';
import {wp} from '../../helper/Constant';
import {useDispatch, useSelector} from 'react-redux';
import {
  SearchFlightCardData,
  SearchFlightReturnCardAction,
} from '../../redux/action/SearchFlightAction';
import {useNavigation} from '@react-navigation/native';

const TicktList = ({SelectDate, SearchFlightCard, tripType1, tripType}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const setCartFlightData = item => {
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
          // console.log(
          //   new Date().toLocaleString('en-IN').split(',')[0],
          //   SelectDate?.date,
          // );
          return (
            <CardList
              setCartFlightData={setCartFlightData}
              item={item}
              index={index}
              tripType={tripType}
            />
          );
        }}
        key={({item, index}) => index}
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
