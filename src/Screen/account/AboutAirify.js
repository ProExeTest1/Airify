import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {color} from '../../helper/ColorConstant';
import {CommonHeader} from '../../components';
import {strings} from '../../helper/Strings';
import {Images} from '../../helper/IconConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import {aboutAirifyData} from '../../assets/DummyData/Data';

const AboutAirify = ({navigation: {goBack}, navigation}) => {
  return (
    <View style={styles.container}>
      <CommonHeader
        headerName={strings.aboutAirify}
        navigation1={() => {
          goBack();
        }}
        navigation2={() => {}}
        onPress1={true}
        onPress2={false}
        Images1={Images.backIcon}
        Images2={null}
      />
      <View style={styles.iconViewStyle}>
        <Image source={Images.welcomeScreenIcon} style={styles.iconStyle} />
        <Text style={styles.versionStyle}>{strings.Version}</Text>
      </View>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <FlatList
          data={aboutAirifyData}
          renderItem={({item}) => {
            return (
              <TouchableOpacity style={styles.flatListView}>
                <Text style={styles.flatListText}>{item.title}</Text>
                <Image
                  source={Images.forward}
                  style={styles.forwardIconStyle}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  iconViewStyle: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ECEFEF',
    marginHorizontal: wp(5),
    justifyContent: 'center',
    paddingTop: hp(5),
    paddingVertical: hp(4),
  },
  iconStyle: {
    height: hp(14),
    width: hp(14),
    borderRadius: hp(14 / 2),
  },
  versionStyle: {
    fontSize: fontSize(18),
    fontWeight: '600',
    color: color.black,
  },
  flatListView: {
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  flatListText: {
    fontSize: fontSize(16),
    fontWeight: '500',
    flex: 1,
    color: color.black,
  },
  forwardIconStyle: {
    height: wp(3),
    width: hp(3),
    resizeMode: 'contain',
  },
});

export default AboutAirify;
