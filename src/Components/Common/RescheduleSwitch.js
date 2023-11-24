import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {fontSize, hp, wp} from '../../helper/Constant';

import {useSelector} from 'react-redux';

const RescheduleSwitch = ({onPress1, onPress2, ticketType}) => {
  const color = useSelector(state => state?.themereducer?.colorTheme);
  const styles = ThemeStyle(color);
  return (
    <View style={styles.optionViewStyle}>
      <TouchableOpacity
        onPress={onPress1}
        style={[
          styles.optionTouchStyle,
          {
            backgroundColor: ticketType == 'Old Trip' ? color.commonBlue : null,
          },
        ]}>
        <Text
          style={[
            styles.optionStyle,
            {color: ticketType === 'Old Trip' ? '#fff' : color.black},
          ]}>
          Old Trip
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPress2}
        style={[
          styles.optionTouchStyle,
          {
            backgroundColor: ticketType == 'New Trip' ? color.commonBlue : null,
          },
        ]}>
        <Text
          style={[
            styles.optionStyle,
            {color: ticketType === 'New Trip' ? '#fff' : color.black},
          ]}>
          New Trip
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RescheduleSwitch;

const ThemeStyle = color =>
  StyleSheet.create({
    optionStyle: {
      textAlign: 'center',
      fontSize: fontSize(18),
      fontWeight: '500',
    },
    optionViewStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: wp(4),
      backgroundColor: color.TowButtonBgColor2,
      marginTop: hp(3),
      borderRadius: 7,
    },
    optionTouchStyle: {
      flex: 1,
      paddingVertical: hp(1.5),
      borderRadius: 7,
    },
  });
