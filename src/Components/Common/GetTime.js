import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';

import {color} from '../../helper/ColorConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import {TimeData} from '../../assets/DummyData/timeData';

const GetTime = ({departureTime, setDepartureTime}) => {
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
                  : '#e4e4e4',
            },
          ]}>
          <Text style={{color: '#7e7e7f', marginBottom: hp(1)}}>
            {item.title}
          </Text>
          <Text
            style={{
              color: '#000',
              fontWeight: '500',
              fontSize: fontSize(16),
            }}>
            {item.time}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default GetTime;

const styles = StyleSheet.create({
  departureTimeBody: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: hp(1.5),
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
    backgroundColor: '#fafafa',
  },
});
