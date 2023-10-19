import React from 'react';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {View, StyleSheet, FlatList} from 'react-native';

import CardList from './CardList';
import {wp} from '../../helper/Constant';
import {SearchFlightCardData} from '../../redux/action/SearchFlightAction';

const TicktList = ({SelectDate, SearchFlightCard}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const setCartFlightData = item => {
    dispatch(SearchFlightCardData(item));
    navigation.navigate('FlightDetails');
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
