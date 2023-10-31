import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {fontSize, hp, wp} from '../../helper/Constant';
import {color} from '../../helper/ColorConstant';

const RescheduleSwitch = ({onPress, ticketType}) => {
  return (
    <View style={styles.optionViewStyle}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.optionTouchStyle,
          {
            backgroundColor: ticketType == 'Old Trip' ? color.commonBlue : null,
          },
        ]}>
        <Text
          style={[
            styles.optionStyle,
            {color: ticketType === 'Old Trip' ? color.white : color.black},
          ]}>
          Old Trip
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.optionTouchStyle,
          {
            backgroundColor: ticketType == 'New Trip' ? color.commonBlue : null,
          },
        ]}>
        <Text
          style={[
            styles.optionStyle,
            {color: ticketType === 'New Trip' ? color.white : color.black},
          ]}>
          New Trip
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RescheduleSwitch;

const styles = StyleSheet.create({
  optionStyle: {
    textAlign: 'center',
    fontSize: fontSize(18),
    fontWeight: '500',
  },
  optionViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(4),
    backgroundColor: '#DCDCDC',
    marginTop: hp(3),
    borderRadius: 7,
  },
  optionTouchStyle: {
    flex: 1,
    paddingVertical: hp(1.5),
    borderRadius: 7,
  },
});
