import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {CommonHeader} from '../../components';
import {strings} from '../../helper/Strings';
import {Images} from '../../helper/IconConstant';
import {color} from '../../helper/ColorConstant';

const Notification = ({navigation: {goBack}, navigation}) => {
  return (
    <View style={styles.container}>
      <CommonHeader
        headerName={strings.notification}
        navigation1={() => {
          goBack();
        }}
        navigation2={() => {}}
        onPress1={true}
        onPress2={false}
        Images1={Images.backIcon}
        Images2={null}
      />
      <Text>Notification</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
});

export default Notification;
