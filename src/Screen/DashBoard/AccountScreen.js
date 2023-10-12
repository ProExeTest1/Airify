import {
  Image,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {CommonHeader, OnBoardingTwoButton} from '../../components';
import {Images} from '../../helper/IconConstant';
import {color} from '../../helper/ColorConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import firestore from '@react-native-firebase/firestore';
import {SettingData} from '../../assets/DummyData/SettingData';
import ToggleSwitch from 'toggle-switch-react-native';
import Modal from 'react-native-modal';
import TextData from '../../components/TextData';
import {strings} from '../../helper/Strings';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountScreen = ({navigation}) => {
  const [modal, setModal] = useState(false);
  const [userData, setUserData] = useState({});
  const [toggleSwitchBut, setToggleSwitchBut] = useState();
  const [selectedLanguage, setSelectedLanguage] = useState();
  
  useEffect(() => {
    getData();
    UserData();
  }, [toggleSwitchBut, selectedLanguage]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('DarkMode');
      setToggleSwitchBut(JSON.parse(jsonValue));
      const languageData = await AsyncStorage.getItem('selected_Language');
      setSelectedLanguage(JSON.parse(languageData));
    } catch (e) {
      console.log('getData error :>> ', e);
    }
  };

  const DarkModeAsyncStorage = async isOn => {
    try {
      await AsyncStorage.setItem('DarkMode', JSON.stringify(isOn));
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  const UserData = async () => {
    const journeyData = await firestore()
      .collection('Users')
      .doc(auth().currentUser.uid)
      .get();
    setUserData(journeyData.data());
  };

  const openModal = () => {
    setModal(true);
  };
  const closeModal = async () => {
    setModal(false);
  };

  return (
    <View style={styles.container}>
      <CommonHeader
        headerName={strings.account}
        navigation1={() => {}}
        navigation2={() => {}}
        onPress1={false}
        onPress2={false}
        Images1={Images.planIcon}
        Images2={null}
      />
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={styles.headerStyle}>
          <View style={styles.profilePicViewStyle}>
            <Image
              source={{uri: userData?.profileImageURL}}
              style={styles.profilePicStyle}
              resizeMode="stretch"
            />
            <View style={styles.headertextStyle}>
              <Text style={styles.NameStyle}>{userData?.Name}</Text>
              <Text style={styles.userNameStyle}>{userData?.Email}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.bellTouchStyle}>
            <Image
              source={Images.quCode}
              style={styles.bellStyle}
              resizeMode="stretch"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.sectionListStyle}>
          <SectionList
            showsVerticalScrollIndicator={true}
            sections={SettingData}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={styles.listTouchStyle}
                  disabled={item.title == 'Dark Mode' ? true : false}
                  onPress={() => {
                    item.title !== 'Logout'
                      ? navigation.navigate(item.screen)
                      : openModal();
                  }}>
                  <View>
                    <Image
                      source={item.icon}
                      style={[
                        styles.listImageDiffStyle,
                        {
                          tintColor:
                            item.title == 'Logout' ? color.red : color.black,
                        },
                      ]}
                      resizeMode="stretch"
                    />
                  </View>
                  <View style={styles.listTextViewStyle}>
                    {item.title == 'Language' ? (
                      <View style={styles.listConditionStyle}>
                        <Text style={styles.listTitleTextStyle}>
                          {item.title}
                        </Text>
                        <Text
                          style={[
                            styles.listTitleTextStyle,
                            {color: color.commonBlue},
                          ]}>
                          {selectedLanguage?.language}
                        </Text>
                      </View>
                    ) : item.title == 'Dark Mode' ? (
                      <Text style={styles.listTitleTextStyle}>
                        {item.title}
                      </Text>
                    ) : (
                      <Text
                        style={[
                          styles.listTitleTextStyle,
                          {
                            color:
                              item.title == 'Logout' ? color.red : color.black,
                          },
                        ]}>
                        {item.title}
                      </Text>
                    )}
                  </View>
                  <View>
                    {item.title !== 'Logout' && item.title !== 'Dark Mode' ? (
                      <Image
                        source={Images.forward}
                        style={styles.forwardIconStyle}
                        resizeMode="contain"
                      />
                    ) : item.title == 'Dark Mode' ? (
                      <View style={{right: 20}}>
                        <ToggleSwitch
                          isOn={toggleSwitchBut}
                          size="medium"
                          onColor={color.commonBlue}
                          onToggle={isOn => {
                            setToggleSwitchBut(isOn);
                            DarkModeAsyncStorage(isOn);
                          }}
                        />
                      </View>
                    ) : null}
                  </View>
                </TouchableOpacity>
              );
            }}
            renderSectionHeader={({section: {header}}) => (
              <View style={styles.listHeaderViewStyle}>
                <Text style={styles.header}>{header}</Text>
                <View
                  style={[
                    styles.listHeaderLineStyle,
                    {
                      width:
                        header === 'General'
                          ? '80%'
                          : header === 'About'
                          ? '80%'
                          : '95%',
                    },
                  ]}></View>
              </View>
            )}
          />
        </View>
      </ScrollView>
      <Modal
        onBackdropPress={closeModal}
        onDismiss={closeModal}
        backdropOpacity={0.8}
        isVisible={modal}
        style={styles.modalStyle}>
        <View style={styles.modalViewStyle}>
          <View style={styles.modalsubViewStyle}>
            <TextData
              text={strings.logout}
              textStyle={styles.modalLogoutTextStyle}
            />
            <View style={styles.lineStyle} />
            <TextData
              text={strings.logoutText}
              textStyle={[
                styles.modalLogoutTextStyle,
                {color: color.black, marginTop: hp(2)},
              ]}
            />
            <OnBoardingTwoButton
              buttonTextOne={strings.cancel}
              buttonTextTwo={strings.logoutYes}
              onPress1={() => {
                closeModal();
              }}
              onPress2={() => {
                auth().signOut();
                navigation.navigate('SignInScreen');
                closeModal();
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(6.66),
    justifyContent: 'space-between',
    paddingVertical: hp(2),
  },
  profilePicViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePicStyle: {
    height: hp(7.38),
    width: hp(7.38),
    borderRadius: 100,
  },
  headertextStyle: {marginHorizontal: 10},
  userNameStyle: {
    color: color.black,
    fontSize: fontSize(12),
    marginVertical: 5,
  },
  bellTouchStyle: {
    borderRadius: 100,
    borderColor: color.black,
    padding: hp(1.2),
  },
  bellStyle: {height: hp(3.07), width: hp(3.07), tintColor: color.black},
  NameStyle: {
    fontWeight: '500',
    color: color.black,
  },
  listTouchStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(2.4),
    marginHorizontal: wp(6),
  },
  listImageDiffStyle: {
    height: hp(2.5),
    width: hp(2.5),
    resizeMode: 'contain',
  },
  listImageViewStyle: {
    borderWidth: 1,
    borderRadius: 100,
    borderColor: color.grey,
    padding: hp(1.7),
  },
  listImageStyle: {
    height: hp(4),
    width: hp(4),
  },
  listTextViewStyle: {
    width: '75%',
    marginHorizontal: 15,
  },
  listTitleTextStyle: {
    fontSize: fontSize(16),
    fontWeight: '600',
  },
  listDiscriptionTextStyle: {
    color: color.black,
  },
  forwardIconStyle: {
    height: wp(3),
    width: hp(3),
    resizeMode: 'contain',
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
  },
  header: {
    fontSize: fontSize(14),
  },
  listConditionStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalStyle: {
    justifyContent: 'flex-end',
    margin: wp(0),
  },
  modalViewStyle: {
    backgroundColor: 'white',
    height: hp(30),
    borderRadius: 16,
    alignItems: 'center',
  },
  modalsubViewStyle: {
    marginTop: hp(5),
    alignItems: 'center',
  },
  modalLogoutTextStyle: {
    color: color.red,
    fontSize: fontSize(18),
    fontWeight: '700',
  },
  lineStyle: {
    height: 2,
    backgroundColor: color.lightGray,
    marginHorizontal: wp(5),
    marginTop: hp(2),
    paddingHorizontal: wp(42),
  },
});
