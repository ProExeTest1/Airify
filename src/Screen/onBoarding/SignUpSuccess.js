import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

import {hp, wp} from '../../helper/Constant';
import {Images} from '../../helper/IconConstant';
import {OnBoardingText, OnBoardingSingleButton} from '../../components';
import {useSelector} from 'react-redux';

const SignUpSuccess = ({navigation}) => {
  const strings = useSelector(state => state?.languageReducer?.languageObject);
  const color = useSelector(state => state?.themereducer?.colorTheme);
  const styles = ThemeStyle(color);
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
            navigation.navigate('TabNavigation');
          }}
        />
      </View>
    </View>
  );
};

const ThemeStyle = color =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    iconStyle: {
      width: hp(14),
      height: hp(14),
      resizeMode: 'contain',
    },
    subTextStyle: {
      width: wp(70),
      marginTop: hp(2),
    },
    FirstViewStyle: {
      flex: 1,
      marginTop: hp(15),
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
  });

export default SignUpSuccess;
