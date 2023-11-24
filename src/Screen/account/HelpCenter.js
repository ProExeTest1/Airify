import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {strings} from '../../helper/Strings';
import {CommonHeader, ContactUs, Faq} from '../../components';
import {Images} from '../../helper/IconConstant';

import {fontSize, hp, wp} from '../../helper/Constant';
import {useSelector} from 'react-redux';

const HelpCenter = ({navigation: {goBack}}) => {
  const [selectedOption, setSelectedOption] = useState(true);
  const color = useSelector(state => state?.themereducer?.colorTheme);
  const styles = ThemeStyle(color);
  return (
    <View style={styles.container}>
      <CommonHeader
        Images2={null}
        onPress1={true}
        onPress2={false}
        navigation2={() => {}}
        Images1={Images.backIcon}
        Images1Color={'#fff'}
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
                : color.TowButtonBgColor2,
              borderRadius: wp(2),
            },
          ]}
          onPress={() => {
            setSelectedOption(!selectedOption);
          }}>
          <Text
            style={[
              styles.buttonTextStyle,
              {color: selectedOption ? '#fff' : color.black},
            ]}>
            {strings.FAQ}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonStyle,
            {
              backgroundColor: selectedOption
                ? color.TowButtonBgColor2
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
              {color: !selectedOption ? '#fff' : color.black},
            ]}>
            {strings?.contactUs}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{backgroundColor: 'red', flex: 1}}>
        {selectedOption ? <Faq /> : <ContactUs />}
      </View>
    </View>
  );
};

const ThemeStyle = color =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.onBoardingBgColor,
    },
    buttonViewStyle: {
      borderRadius: wp(2),
      flexDirection: 'row',
      marginVertical: hp(2),
      marginHorizontal: wp(2),
      justifyContent: 'space-around',
      backgroundColor: color.TowButtonBgColor2,
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
