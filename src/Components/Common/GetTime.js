import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';

import {fontSize, hp, wp} from '../../helper/Constant';
import {TimeData} from '../../assets/DummyData/timeData';
import {useSelector} from 'react-redux';

const GetTime = ({departureTime, setDepartureTime}) => {
  const color = useSelector(state => state?.themereducer?.colorTheme);
  const styles = ThemeStyle(color);
  return (
    <FlatList
      data={TimeData}
      numColumns={2}
      renderItem={({item, index}) => (
        <TouchableOpacity
          onPress={() => {
            item.time === departureTime?.time
              ? setDepartureTime({})
              : setDepartureTime(item);
          }}
          style={[
            styles.departureTimeBody,
            {
              marginEnd: index % 2 === 0 ? wp(3) : 0,
              borderColor:
                item.time === departureTime?.time
                  ? color.commonBlue
                  : color.grey,
            },
          ]}>
          <Text style={{color: color.darkLight, marginBottom: hp(1)}}>
            {item.title}
          </Text>
          <Text style={styles.textStyle}>{item.time}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default GetTime;

const ThemeStyle = color =>
  StyleSheet.create({
    departureTimeBody: {
      flex: 1,
      borderWidth: 1,
      borderRadius: 10,
      alignItems: 'center',
      marginBottom: hp(1.5),
      paddingVertical: hp(2),
      paddingHorizontal: wp(4),
      backgroundColor: color.grey3,
    },
    textStyle: {
      color: color.black,
      fontWeight: '500',
      fontSize: fontSize(16),
    },
  });
