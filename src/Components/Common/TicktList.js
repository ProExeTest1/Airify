import {View, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import CardList from './CardList';
import {wp} from '../../helper/Constants';

const TicktList = ({SelectDate, SearchFlightCardData}) => {
  return (
    <View style={styles.ScrollViewBody}>
      <FlatList
        data={SearchFlightCardData.filter(i => {
          if (
            `${new Date().toLocaleString().split(',')[0]}` == SelectDate?.date
          ) {
            return (
              i.pickTime >
              `${new Date(Date.now() + 1800000).getHours()}:${new Date(
                Date.now() + 1800000,
              ).getMinutes()}`
            );
          }
          return i;
        })}
        bounces={false}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => <CardList item={item} index={index} />}
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
