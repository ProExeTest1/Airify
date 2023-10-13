import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {CommonHeader} from '../../components';
import {strings} from '../../helper/Strings';
import {Images} from '../../helper/IconConstant';
import {color} from '../../helper/ColorConstant';
import {hp} from '../../helper/Constant';

const AddAddress = ({navigation: {goBack}, navigation}) => {
  return (
    <View style={styles.container}>
      <CommonHeader
        headerName={strings.addressDetail}
        navigation1={() => {
          navigation.navigate('SavedAddress');
        }}
        onPress1={true}
        onPress2={false}
        Images1={Images.cancel}
        Images2={null}
        cancelButtonStyle1={styles.plusIconStyle}
        Images1Color={color.white}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  plusIconStyle: {
    height: hp(2.5),
    width: hp(2.5),
    resizeMode: 'contain',
    marginTop: hp(0.5),
  },
});

export default AddAddress;
