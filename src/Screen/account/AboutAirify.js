import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {CommonHeader} from '../../components';

import {Images} from '../../helper/IconConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import {
  FrenchaboutAirifyData,
  aboutAirifyData,
} from '../../assets/DummyData/Data';

const AboutAirify = ({navigation: {goBack}}) => {
  const strings = useSelector(state => state?.languageReducer?.languageObject);
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
        headerName={strings.aboutAirify}
        navigation1={() => {
          goBack();
        }}
      />
      <View style={styles.iconViewStyle}>
        <Image
          source={
            color.white == '#fff'
              ? Images.welcomeScreenIcon
              : Images.welcomeScreenDarkIcon
          }
          style={styles.iconStyle}
        />
        <Text style={styles.versionStyle}>{strings?.Version}</Text>
      </View>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <FlatList
          bounces={false}
          data={strings?.translate ? FrenchaboutAirifyData : aboutAirifyData}
          renderItem={({item}) => {
            return (
              <TouchableOpacity style={styles.flatListView}>
                <Text style={styles.flatListText}>{item?.title}</Text>
                <Image
                  resizeMode="contain"
                  source={Images?.forward}
                  style={styles.forwardIconStyle}
                />
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

const ThemeStyle = color =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.white,
    },
    iconViewStyle: {
      paddingTop: hp(5),
      alignItems: 'center',
      borderBottomWidth: 1,
      paddingVertical: hp(4),
      borderColor: '#ECEFEF',
      marginHorizontal: wp(5),
      justifyContent: 'center',
    },
    iconStyle: {
      width: hp(14),
      height: hp(14),
      borderRadius: hp(14 / 2),
    },
    versionStyle: {
      fontWeight: '600',
      color: color.black,
      fontSize: fontSize(18),
    },
    flatListView: {
      alignItems: 'center',
      flexDirection: 'row',
      paddingVertical: hp(2),
      paddingHorizontal: wp(5),
      justifyContent: 'space-around',
    },
    flatListText: {
      flex: 1,
      fontWeight: '500',
      color: color.black,
      fontSize: fontSize(16),
    },
    forwardIconStyle: {
      width: hp(3),
      height: wp(3),
      resizeMode: 'contain',
    },
  });

export default AboutAirify;
