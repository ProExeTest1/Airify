import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {TimeData} from '../../assets/DummyData/timeData';
import {fontSize, hp, wp} from '../../helper/Constant';
import {color} from '../../helper/ColorConstant';

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
              fontSize: fontSize(16),
              fontWeight: '500',
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
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    marginBottom: hp(1.5),
    alignItems: 'center',
  },
});
