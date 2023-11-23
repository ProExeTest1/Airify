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
  FrenchRefundableTermsAndConditions,
  FrenchRescheduleTermsAndConditons,
  RefundableTermsAndConditions,
  RescheduleTermsAndConditons,
} from '../../assets/DummyData/FlightDetailsData';
import {useSelector} from 'react-redux';

const FlightPackageDetailsScreen = ({navigation, route}) => {
  const headerData = route?.params?.header;
  const [press, setPress] = useState('Flight');
  const strings = useSelector(state => state?.languageReducer?.languageObject);
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
            {strings.Flight}
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
            {strings.Refund_Info}
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
            {strings.Reschedule_info}
          </Text>
        </TouchableOpacity>
      </View>
      {press === 'Flight' ? (
        <FlightDetails />
      ) : press === 'Refund' ? (
        <RefundandRescheduleInfo
          sectionData={
            strings?.translate
              ? FrenchRefundableTermsAndConditions
              : RefundableTermsAndConditions
          }
          header={strings?.Refundable}
        />
      ) : (
        <RefundandRescheduleInfo
          sectionData={
            strings?.translate
              ? FrenchRescheduleTermsAndConditons
              : RescheduleTermsAndConditons
          }
          header={strings?.refunnd_available}
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
