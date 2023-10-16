import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {color} from '../../helper/ColorConstant';
import {strings} from '../../helper/Strings';
import {Images} from '../../helper/IconConstant';
import {CommonHeader} from '../../components';

const AirifyPoint = ({navigation: {goBack}, navigation}) => {
  return (
    <View style={styles.container}>
      <CommonHeader
        headerName={strings.airifyPoint}
        navigation1={() => {
          goBack();
        }}
        onPress1={true}
        onPress2={false}
        Images1={Images.backIcon}
        Images2={Images.info}
        cancelButtonStyle1={styles.plusIconStyle}
        Images1Color={color.white}
      />
      <Text>AirifyPoint</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
});

export default AirifyPoint;
