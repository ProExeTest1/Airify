import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {color} from '../../helper/ColorConstant';
import {strings} from '../../helper/Strings';
import {CommonHeader} from '../../components';
import {Images} from '../../helper/IconConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import ContactUS from '../../components/ContactUs';
import Faq from '../../components/Faq';

const HelpCenter = ({navigation: {goBack}, navigation}) => {
  const [selectedOption, setSelectedOption] = useState(true);
  return (
    <View style={styles.container}>
      <CommonHeader
        headerName={strings.helpCenter}
        navigation1={() => {
          goBack();
        }}
        navigation2={() => {}}
        onPress1={true}
        onPress2={false}
        Images1={Images.backIcon}
        Images2={null}
      />
      <View style={styles.buttonViewStyle}>
        <TouchableOpacity
          style={[
            styles.buttonStyle,
            {
              backgroundColor: selectedOption
                ? color.commonBlue
                : color.lightGray2,
              borderRadius: wp(2),
            },
          ]}
          onPress={() => {
            setSelectedOption(!selectedOption);
          }}>
          <Text
            style={[
              styles.buttonTextStyle,
              {color: selectedOption ? color.white : color.black},
            ]}>
            {strings.FAQ}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonStyle,
            {
              backgroundColor: selectedOption
                ? color.lightGray2
                : color.commonBlue,
              borderRadius: wp(2),
            },
          ]}
          onPress={() => {
            setSelectedOption(!selectedOption);
          }}>
          <Text
            style={[
              styles.buttonTextStyle,
              {color: !selectedOption ? color.white : color.black},
            ]}>
            {strings.contactUs}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{backgroundColor: 'red', flex: 1}}>
        {selectedOption ? <Faq /> : <ContactUS />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.Grey,
  },
  buttonViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: wp(2),
    backgroundColor: color.lightGray2,
    borderRadius: wp(2),
    marginVertical: hp(2),
  },
  buttonStyle: {
    flex: 1,
    height: hp(5),
    width: wp(48),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextStyle: {
    fontSize: fontSize(15),
    fontWeight: 'bold',
  },
});

export default HelpCenter;
