import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import Faq from '../../components/Faq';
import {strings} from '../../helper/Strings';
import {CommonHeader} from '../../components';
import {Images} from '../../helper/IconConstant';
import {color} from '../../helper/ColorConstant';
import ContactUS from '../../components/ContactUs';
import {fontSize, hp, wp} from '../../helper/Constant';

const HelpCenter = ({navigation: {goBack}}) => {
  const [selectedOption, setSelectedOption] = useState(true);
  return (
    <View style={styles.container}>
      <CommonHeader
        Images2={null}
        onPress1={true}
        onPress2={false}
        navigation2={() => {}}
        Images1={Images.backIcon}
        Images1Color={color.white}
        headerName={strings.helpCenter}
        navigation1={() => {
          goBack();
        }}
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
            {strings?.contactUs}
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
    borderRadius: wp(2),
    flexDirection: 'row',
    marginVertical: hp(2),
    marginHorizontal: wp(2),
    justifyContent: 'space-around',
    backgroundColor: color.lightGray2,
  },
  buttonStyle: {
    flex: 1,
    width: wp(48),
    height: hp(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextStyle: {
    fontWeight: 'bold',
    fontSize: fontSize(15),
  },
});

export default HelpCenter;
