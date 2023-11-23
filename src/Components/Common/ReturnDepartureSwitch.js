import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {fontSize, hp, wp} from '../../helper/Constant';
import {color} from '../../helper/ColorConstant';
import {strings} from '../../helper/Strings';
import {useSelector} from 'react-redux';

const ReturnDepartureSwitch = ({onPress1, ticketType, onPress2}) => {
  const strings = useSelector(state => state?.languageReducer?.languageObject);
  return (
    <View style={styles.optionViewStyle}>
      <TouchableOpacity
        onPress={onPress1}
        style={[
          styles.optionTouchStyle,
          {
            backgroundColor:
              ticketType == 'Departure' ? color.commonBlue : null,
          },
        ]}>
        <Text
          style={[
            styles.optionStyle,
            {color: ticketType === 'Departure' ? color.white : color.black},
          ]}>
          {strings.departure}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPress2}
        style={[
          styles.optionTouchStyle,
          {
            backgroundColor: ticketType == 'Return' ? color.commonBlue : null,
          },
        ]}>
        <Text
          style={[
            styles.optionStyle,
            {color: ticketType === 'Return' ? color.white : color.black},
          ]}>
          {strings.return}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReturnDepartureSwitch;

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
