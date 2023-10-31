import React from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {Images} from '../../helper/IconConstant';
import {color} from '../../helper/ColorConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import {NotificationData} from '../../assets/DummyData/NotificationData';
import {strings} from '../../helper/Strings';

const NotificationScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerViewStyle}>
        <SafeAreaView style={styles.safeHeaderViewStyle}></SafeAreaView>

        <View style={styles.headerinnerViewStyle}>
          <TouchableOpacity onPress={() => navigation.goBack('')}>
            <Image
              source={Images.backIcon}
              style={styles.cancelButtonStyle}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={styles.headerTextViewStyle}>
            <Text style={styles.headerTextStyle}>{strings.notification}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Notification');
            }}>
            <Image
              source={Images.setting}
              style={styles.cancelButtonStyle}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.sectionListStyle}>
        <SectionList
          bounces={false}
          sections={NotificationData}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <TouchableOpacity style={styles.listTouchStyle}>
                {item.ticket ? (
                  <View>
                    <Image
                      source={item.image}
                      resizeMode="stretch"
                      style={styles.listImageDiffStyle}
                    />
                  </View>
                ) : (
                  <View style={styles.listImageViewStyle}>
                    <Image
                      source={item.image}
                      resizeMode="contain"
                      style={styles.listImageStyle}
                    />
                  </View>
                )}
                <View style={styles.listTextViewStyle}>
                  <Text style={styles.listTitleTextStyle}>{item.title}</Text>
                  <Text style={styles.listDiscriptionTextStyle}>
                    {item.discription}
                  </Text>
                </View>
                <View>
                  <Image
                    resizeMode="contain"
                    source={Images.forward}
                    style={styles.forwardIconStyle}
                  />
                </View>
              </TouchableOpacity>
            );
          }}
          renderSectionHeader={({section: {time}}) => (
            <View style={styles.listHeaderViewStyle}>
              <Text style={styles.header}>{time}</Text>
              <View style={styles.listHeaderLineStyle}>
                {/* <Text>hello</Text> */}
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  header: {
    fontWeight: '500',
    color: color.grey,
    fontSize: fontSize(16),
  },
  headerViewStyle: {
    backgroundColor: color.commonBlue,
  },
  cancelButtonStyle: {
    width: hp(3),
    height: hp(3),
    tintColor: color.white,
  },
  headerTextStyle: {
    fontWeight: 'bold',
    color: color.white,
    fontSize: fontSize(22),
  },
  safeHeaderViewStyle: {
    paddingHorizontal: wp(7),
    paddingVertical: Platform.OS == 'android' ? hp(1) : hp(3),
  },
  headerinnerViewStyle: {
    height: hp(7),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: wp(8),
    justifyContent: 'space-between',
    backgroundColor: color.commonBlue,
  },
  headerTextViewStyle: {
    alignItems: 'center',
    paddingVertical: hp(1),
  },
  sectionListStyle: {
    marginVertical: hp(2.4),
    backgroundColor: color.white,
  },
  listTouchStyle: {
    width: '95%',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(2.4),
    paddingHorizontal: wp(5),
  },
  listImageDiffStyle: {
    width: hp(7),
    height: hp(7),
    borderRadius: 12,
  },
  listImageViewStyle: {
    borderWidth: 1,
    padding: hp(1.7),
    borderRadius: 100,
    borderColor: color.grey,
  },
  listImageStyle: {
    width: hp(3),
    height: hp(3),
  },
  listTextViewStyle: {
    marginHorizontal: wp(2.8),
    flex: 1,
  },
  listTitleTextStyle: {
    fontSize: fontSize(18),
    flex: 1,
    fontWeight: '600',
    color: color.black,
    marginVertical: hp(1),
    fontSize: fontSize(18),
  },
  listDiscriptionTextStyle: {
    color: color.black,
    flex: 1,
  },
  forwardIconStyle: {
    width: hp(4.4),
    height: wp(4.4),
  },
  listHeaderViewStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: wp(3),
  },
  listHeaderLineStyle: {
    borderWidth: 0.7,
    height: 0,
    marginHorizontal: wp(3),
    borderColor: color.grey,
    flex: 1,
  },
});
