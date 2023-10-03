import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {PickerHeaderBar} from '../../components/index';

const SearchFlightsFilter = () => {
  return (
    <View style={styles.body}>
      <PickerHeaderBar headerName={'Filter'}></PickerHeaderBar>
    </View>
  );
};

export default SearchFlightsFilter;

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
});
