import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  FlightDetails,
  PickerHeaderBar,
  RefundandRescheduleInfo,
} from '../../components';
import {fontSize, hp, wp} from '../../helper/Constant';
import {color} from '../../helper/ColorConstant';
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
            ]}
            ellipsizeMode="tail"
            numberOfLines={1}>
            Reschedule info
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
    flexDirection: 'row',
    backgroundColor: '#EBEBEC',
    justifyContent: 'space-around',
    width: '92%',
    alignSelf: 'center',
    borderRadius: 7,
    marginVertical: hp(2),
    height: hp(5.5),
  },
  optionTextStyle: {
    fontSize: fontSize(16),
    fontWeight: '600',
    marginHorizontal: wp(1),
  },
  optionTouchStyle: {
    borderRadius: 7,
    height: hp(5.5),
    width: '33%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
