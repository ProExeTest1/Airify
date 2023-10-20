import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {color} from '../../helper/ColorConstant';
import {fontSize, hp} from '../../helper/Constant';
import {
  FlightDetails,
  PickerHeaderBar,
  RefundandRescheduleInfo,
} from '../../components';
import {
  RefundableTermsAndConditions,
  RescheduleTermsAndConditons,
} from '../../assets/DummyData/FlightDetailsData';

const FlightPackageDetailsScreen = ({navigation, route}) => {
  const headerData = route?.params?.header;
  const [press, setPress] = useState('Flight');

  return (
    <View style={{flex: 1}}>
      <PickerHeaderBar
        headerName={headerData}
        navigation={() => navigation.goBack('')}
      />
      <View style={styles.optionViewStyle}>
        <TouchableOpacity
          onPress={() => setPress('Flight')}
          style={[
            styles.optionTouchStyle,
            {
              backgroundColor: press === 'Flight' ? color.commonBlue : null,
            },
          ]}>
          <Text
            style={[
              styles.optionTextStyle,
              {color: press === 'Flight' ? color.white : color.black},
            ]}>
            Flight
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setPress('Refund')}
          style={[
            styles.optionTouchStyle,
            {backgroundColor: press === 'Refund' ? color.commonBlue : null},
          ]}>
          <Text
            style={[
              styles.optionTextStyle,
              {color: press === 'Refund' ? color.white : color.black},
            ]}>
            Refund Info
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setPress('Reschedule')}
          style={[
            styles.optionTouchStyle,
            {backgroundColor: press === 'Reschedule' ? color.commonBlue : null},
          ]}>
          <Text
            style={[
              styles.optionTextStyle,
              {color: press === 'Reschedule' ? color.white : color.black},
            ]}>
            Reschedule I...
          </Text>
        </TouchableOpacity>
      </View>
      {press === 'Flight' ? (
        <FlightDetails />
      ) : press === 'Refund' ? (
        <RefundandRescheduleInfo
          sectionData={RefundableTermsAndConditions}
          header={'Refundable'}
        />
      ) : (
        <RefundandRescheduleInfo
          sectionData={RescheduleTermsAndConditons}
          header={'Reschedule Available'}
        />
      )}
    </View>
  );
};

export default FlightPackageDetailsScreen;

const styles = StyleSheet.create({
  optionViewStyle: {
    width: '92%',
    height: hp(5.5),
    borderRadius: 7,
    alignSelf: 'center',
    flexDirection: 'row',
    marginVertical: hp(2),
    backgroundColor: '#EBEBEC',
    justifyContent: 'space-around',
  },
  optionTextStyle: {
    fontWeight: '600',
    fontSize: fontSize(16),
  },
  optionTouchStyle: {
    width: '33%',
    height: hp(5.5),
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
