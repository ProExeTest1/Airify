import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {PickerHeaderBar} from '../../components/index';

const SearchFlightsFilter = ({navigation}) => {
  return (
    <View style={styles.body}>
      <PickerHeaderBar
        headerName={'Filter'}
        navigation={() => navigation.goBack('')}></PickerHeaderBar>
      <ScrollView style={{}}></ScrollView>
    </View>
  );
};

export default SearchFlightsFilter;

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
});
