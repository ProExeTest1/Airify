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
import React from 'react';
import {Images} from '../../helper/IconConstant';
import {color} from '../../helper/ColorConstant';
import {fontSize, hp, wp} from '../../helper/Constants';
import {NotificationData} from '../../assets/DummyData/NotificationData';

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
            <Text style={styles.headerTextStyle}>Notification</Text>
          </View>
          <TouchableOpacity>
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
          sections={NotificationData}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity style={styles.listTouchStyle}>
                {item.ticket ? (
                  <View>
                    <Image
                      source={item.image}
                      style={styles.listImageDiffStyle}
                      resizeMode="stretch"
                    />
                  </View>
                ) : (
                  <View style={styles.listImageViewStyle}>
                    <Image
                      source={item.image}
                      style={styles.listImageStyle}
                      resizeMode="contain"
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
                    source={Images.forward}
                    style={styles.forwardIconStyle}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
            );
          }}
          renderSectionHeader={({section: {time}}) => (
            <View style={styles.listHeaderViewStyle}>
              <Text style={styles.header}>{time}</Text>
              <View
                style={[
                  styles.listHeaderLineStyle,
                  {
                    width:
                      time === 'Today'
                        ? '80%'
                        : time === 'Yesterday'
                        ? '73%'
                        : '67%',
                  },
                ]}></View>
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
    backgroundColor: color.white,
    flex: 1,
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
    height: hp(3),
    width: hp(3),
    tintColor: color.white,
  },
  headerTextStyle: {
    fontSize: fontSize(22),
    fontWeight: 'bold',
    color: color.white,
  },
  safeHeaderViewStyle: {
    paddingHorizontal: wp(7),
    paddingVertical: Platform.OS == 'android' ? hp(1) : hp(3),
  },
  headerinnerViewStyle: {
    backgroundColor: color.commonBlue,
    height: hp(7),
    paddingHorizontal: wp(8),
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(2.4),
    width: '95%',
    alignSelf: 'center',
  },
  listImageDiffStyle: {
    height: hp(7),
    width: hp(7),
    borderRadius: 12,
  },
  listImageViewStyle: {
    borderWidth: 1,
    borderRadius: 100,
    borderColor: color.grey,
    padding: hp(1.7),
  },
  listImageStyle: {
    height: hp(3),
    width: hp(3),
  },
  listTextViewStyle: {
    width: '75%',
    marginHorizontal: 15,
  },
  listTitleTextStyle: {
    fontSize: fontSize(18),
    fontWeight: '600',
    marginVertical: hp(1),
    color: color.black,
  },
  listDiscriptionTextStyle: {
    color: color.black,
  },
  forwardIconStyle: {
    height: wp(4.4),
    width: hp(4.4),
    right: 20,
  },
  listHeaderViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(3),
  },
  listHeaderLineStyle: {
    borderWidth: 0.5,
    borderColor: color.grey,
    marginHorizontal: wp(3),
    height: 0,
    position: 'absolute',
    right: 0,
  },
});
