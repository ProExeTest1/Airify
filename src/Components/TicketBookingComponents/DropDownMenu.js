import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import Modal from 'react-native-modal';
import {hp, wp} from '../../helper/Constant';
const DropDownMenu = ({data, renderItem, dropdownTop, style}) => {
  return (
    <View style={style}>
      <View style={[styles.dropdown, {top: dropdownTop}]}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default DropDownMenu;

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: '#fff',
    shadowColor: '#000000',
    borderRadius: 8,
    shadowRadius: 1,
    elevation: 0.2,
    shadowOffset: {height: 0.7, width: 0},
    shadowOpacity: 0.2,
    paddingHorizontal: wp(1),
    paddingVertical: wp(2),
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
});
