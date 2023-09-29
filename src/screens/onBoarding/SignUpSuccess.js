import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Images} from '../../helper/IconConstant';
import {hp, wp} from '../../helper/Constant';
import OnBoardingText from '../../components/OnBoardingText';
import {strings} from '../../helper/Strings';
import OnBoardingSingleButton from '../../components/OnBoardingSingleButton';

const SignUpSuccess = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.FirstViewStyle}>
        <Image source={Images.SignUpLastScreen} style={styles.iconStyle} />
        <OnBoardingText
          OnBoardingMainText={strings.FinalText}
          OnBoardingSubText={strings.FinalSubText}
          OnBoardingSubTextStyle={styles.subTextStyle}
        />
      </View>

      <View style={{justifyContent: 'flex-end', flex: 1, marginBottom: hp(6)}}>
        <OnBoardingSingleButton
          buttonText={strings.Explore}
          onPress={() => {
            // navigation.navigate('DatePickerData');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  iconStyle: {
    height: hp(14),
    width: hp(14),
    resizeMode: 'contain',
  },
  subTextStyle: {
    width: wp(70),
    marginTop: hp(2),
  },
  FirstViewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: hp(15),
  },
});

export default SignUpSuccess;
