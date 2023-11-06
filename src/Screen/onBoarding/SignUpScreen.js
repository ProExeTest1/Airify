import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import moment from 'moment';
import Modal from 'react-native-modal';
import Swiper from 'react-native-swiper';
import auth from '@react-native-firebase/auth';
import OtpInputs from 'react-native-otp-inputs';
import storage from '@react-native-firebase/storage';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import notifee, {EventType} from '@notifee/react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {CountryPicker} from 'react-native-country-codes-picker';

import {strings} from '../../helper/Strings';
import {Images} from '../../helper/IconConstant';
import {color} from '../../helper/ColorConstant';
import {DineWay} from '../../redux/action/HomeAction';

import {fontSize, hp, wp} from '../../helper/Constant';
import {dummyAirlineData} from '../../helper/dummyData';
import {NotificationData, SecurityData} from '../../assets/DummyData/Data';
import {AlertConstant} from '../../helper/AlertConstant';
import {
  CheckButton,
  ImagePickerData,
  OnBoardingTwoButton,
  OnBoardingTextInput,
  CountryPickTextInput,
  OnBoardingModuleHeader,
  OnBoardingSingleButton,
} from '../../components';
import DeviceInfo from 'react-native-device-info';
import {randomPromoCodeGenerator} from '../../helper/RandomPromoCodegenerator';
import {useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native-paper';

const SignUpScreen = ({navigation: {goBack}, navigation}) => {
  const indexRoute = useRoute()?.params?.index;
  const swiperRef = useRef();
  const dispatch = useDispatch();
  const [pin, setPin] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [index, setIndex] = useState(0);
  const [Email, setEmail] = useState('');
  const [show, setShow] = useState(false);

  const [phoneNo, setPhoneNo] = useState('');
  const [Password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const promocode = randomPromoCodeGenerator(6);
  const [journeyData, setJourneyData] = useState([]);
  const [countryCode, setCountryCode] = useState('🇮🇳');
  const [datePicker, setDatePicker] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  const [pickerResponse, setPickerResponse] = useState('');
  const [selectedFlyWay, setSelectedFlyWay] = useState([]);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [selectedDineWay, setSelectedDineWay] = useState([]);
  const [selectedJourneyData, setSelectedJourneyData] = useState([]);
  const [isvalid, setIsValid] = useState('');
  const [referralData, setReferralData] = useState({});
  useEffect(() => {
    JourneyData();
    onPressAdd();
    // setModalVisible2(false);
  }, []);

  useEffect(() => {
    setIndex(indexRoute ? indexRoute : 0);
  }, [indexRoute]);
  const DineWayData = useSelector(
    response => response?.OnBoarding?.DineWayData,
  );
  const onPressAdd = async () => {
    dispatch(DineWay());
  };

  useEffect(() => {
    indexRoute
      ? AlertConstant(
          'Please fill all details after you will enter the application!',
        )
      : null;
  }, []);
  const JourneyData = async () => {
    const journeyData = await firestore()
      .collection('countryData')
      .doc('FinalData')
      .get()
      .then(res => {
        setJourneyData(res._data);
      });
  };

  const referralCodeMatch = async referral => {
    await firestore()
      .collection('Users')
      .get()
      .then(i => {
        i.docs?.map(d => {
          if (d?.data()?.ReferralCode == referral) {
            setIsValid(d?.data()?.uid);
            setReferralData(d?.data());
          } else {
            setIsValid('');
            setReferralData({});
          }
        });
      });
  };

  // const BookingUpdateNotification = async () => {
  // await firestore()
  //   .collection('Users')
  //   .doc(referralData?.uid)
  //   .get()
  //     .then(i => {
  //       let users = i.data()?.NotificationList?.map(i => {
  //         return i;
  //       });
  //       users?.map(async e => {
  //         if (e?.title == 'Referral Rewards') {
  //           if (e?.isOn == true) {
  //             // Request permissions (required for iOS)
  //             await notifee.requestPermission();

  //             // Create a channel (required for Android)
  //             const channelId = await notifee.createChannel({
  //               id: referralData?.uid,
  //               name: 'Ticket Booking',
  //             });

  //             // Display a notification
  //             await notifee.displayNotification({
  //               title: 'Your Referral code Reward',
  //               body: `Your Referral code use by ${'jenis'} and you earn ${'1000'} points.`,
  //               android: {
  //                 channelId,
  //                 smallIcon: 'ic_notification',
  //                 sound: 'default',
  //                 pressAction: {
  //                   id: 'default',
  //                 },
  //               },
  //             });

  //             notifee.onForegroundEvent(async ({type, detail}) => {
  //               await firestore()
  //                 .collection('NotificationHistory')
  //                 .doc(auth().currentUser.uid)
  //                 .get()
  //                 .then(async i => {
  //                   await firestore()
  //                     .collection('NotificationHistory')
  //                     .doc(auth().currentUser.uid)
  //                     .update({
  //                       NotificationHistory: [
  //                         ...i?.data()?.NotificationHistory,
  //                         {
  //                           id: detail?.notification?.id,
  //                           title: detail?.notification?.title,
  //                           body: detail?.notification?.body,
  //                           date: Date.now(),
  //                           NotificationType: e?.title,
  //                         },
  //                       ],
  //                     });
  //                 });
  //               switch (type) {
  //                 case EventType.DISMISSED:
  //                   console.log(
  //                     'User dismissed notification',
  //                     detail.notification,
  //                   );
  //                   break;
  //                 case EventType.PRESS:
  //                   navigation.navigate('AirifyPoint');
  //                   break;
  //               }
  //             });
  //           }
  //         }
  //       });
  //     });
  // };

  const validation = index => {
    if (!Email?.trim()) {
      AlertConstant(strings.please_enter_valid_email);
      return;
    } else if (!Email?.trim()?.match('[a-z0-9]+@[a-z]+.[a-z]{2,3}')) {
      AlertConstant('Please Enter Valid Email');
    } else if (
      !Password.trim().match(
        /^(?=.*[0-9])(?=.*[!@#$%^&*.])[a-zA-Z0-9!@#$%^&*.]{8,16}$/,
      )
    ) {
      AlertConstant(strings.please_enter_valid_password);
      return;
    } else if (referralCode?.length > 0 && isvalid?.length == 0) {
      AlertConstant('Referral Code are not valid.');
      return;
    } else if (!checked == true) {
      AlertConstant('Can You agree with terms & condition.');
      return;
    } else {
      handleSignUp();
      setModalVisible2(true);
      // if (referralCode.length > 0 && isvalid.length != 0) {
      //   BookingUpdateNotification();
      // }
    }
  };

  const validation2 = index => {
    if (!pickerResponse?.trim()) {
      AlertConstant(strings.please_select_profile_image);
      return;
    } else if (!name?.trim()?.match('[a-zA-Z ]{3,30}')) {
      AlertConstant(strings.enter_valid_name);
      return;
    } else if (!phoneNo?.trim()) {
      AlertConstant(strings.enter_phone_no);
      return;
    } else if (!date?.trim()) {
      AlertConstant(strings.enter_DOB);
      return;
    } else {
      handleSignUp2();
      setModalVisible2(true);
    }
  };
  const validation3 = index => {
    if (pin.length !== 4) {
      AlertConstant('please set your pin');
      return;
    } else {
      handleSignUp2();
    }
  };

  const handleSignUp2 = async () => {
    const jsonValue = await AsyncStorage?.getItem('User_UID');
    const RememberMeValue = JSON?.parse(jsonValue);
    try {
      if (index == 1) {
        const uploadStorage = pickerResponse;
        const filename = Date.now();
        const task = storage()
          ?.ref(`/Profile/${RememberMeValue}/${filename}`)
          ?.putFile(uploadStorage);
        try {
          await task;
        } catch (error) {
          console.log(error);
        }
        await storage()
          ?.ref(`/Profile/${RememberMeValue}/${filename}`)
          ?.getDownloadURL()
          ?.catch(err => {
            console.log('error in download', err);
          })
          .then(async url => {
            await firestore()
              ?.collection('Users')
              ?.doc(RememberMeValue)
              ?.update({
                Name: name,
                profileImageURL: url,
                PhoneNumber: phoneNo,
                BirthDate: date,
              })
              .then(() => {
                setModalVisible2(false);
                swiperRef.current.scrollBy(1);
              });
          });
      }
      {
        index == 2 &&
          (await firestore()
            ?.collection('Users')
            ?.doc(RememberMeValue)
            ?.update({
              JourneyData: selectedJourneyData,
            })
            .then(() => {
              setModalVisible2(false);
              swiperRef?.current?.scrollBy(1);
            }));
      }
      {
        index == 3 &&
          (await firestore()
            ?.collection('Users')
            ?.doc(RememberMeValue)
            ?.update({
              DineWay: selectedDineWay,
            })
            .then(() => {
              setModalVisible2(false);
              swiperRef?.current?.scrollBy(1);
            }));
      }
      {
        index == 4 &&
          (await firestore()
            .collection('Users')
            .doc(RememberMeValue)
            .update({
              FlyData: selectedFlyWay,
            })
            .then(() => {
              setModalVisible2(false);
              swiperRef?.current?.scrollBy(1);
            }));
      }
      {
        index == 5 &&
          (await firestore()
            .collection('Users')
            .doc(RememberMeValue)
            .update({
              DineWay: selectedDineWay,
              JourneyData: selectedJourneyData,
              FlyData: selectedFlyWay,
            })
            .then(() => {
              setModalVisible2(false);
              swiperRef?.current?.scrollBy(1);
            }));
      }
      {
        index == 6 &&
          (await firestore()
            .collection('Users')
            .doc(RememberMeValue)
            .update({
              PIN: pin,
            })
            .then(async () => {
              await firestore()
                .collection('Users')
                .doc(RememberMeValue)
                .get()
                .then(async LoginUserData => {
                  await auth()
                    .signInWithEmailAndPassword(
                      LoginUserData?.data()?.Email,
                      LoginUserData?.data()?.Password,
                    )
                    .then(() => {
                      setModalVisible2(false);
                      navigation?.navigate('TabNavigation');
                    });
                });
            })
            .then(() => {
              setModalVisible2(false);
            }));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSignUp = async () => {
    await auth()
      ?.createUserWithEmailAndPassword(Email, Password)
      .then(async isUserCreate => {
        const filename = Date.now();

        const DeviceUniqueId = await DeviceInfo?.getUniqueId();

        await firestore()
          ?.collection('Users')
          .doc(isUserCreate?.user?.uid)
          ?.set({
            Name: false,
            Email: Email,
            Password: Password,
            profileImageURL: false,
            id: filename,
            uid: isUserCreate?.user?.uid,
            referralCode: referralCode,
            PIN: false,
            PhoneNumber: false,
            BirthDate: false,
            JourneyData: false,
            DineWay: false,
            FlyData: false,
            NotificationList: NotificationData,
            SecurityData: SecurityData,
            DeviceId: DeviceUniqueId,
            ReferralCode: promocode,
          });

        //------------------------------------------------>  UserWallet data

        await firestore()
          .collection('UserWallet')
          .doc(isUserCreate?.user?.uid)
          .set({
            wallet: 0,
            transactionHistory: [],
          });

        //------------------------------------------------>  SaveFlight data

        await firestore()
          .collection('SavedFlights')
          .doc(isUserCreate?.user?.uid)
          .set({
            savedFlights: [],
          });

        //------------------------------------------------>  Points data

        await firestore()
          .collection('Points')
          .doc(isUserCreate?.user?.uid)
          .set({
            TotalPoints: 0,
            PointsHistory: [],
          });

        //------------------------------------------------>  Passenger List data

        await firestore()
          .collection('PassengerList')
          .doc(isUserCreate?.user?.uid)
          .set({
            PassengerList: [],
          });

        //------------------------------------------------>  SaveTicket data

        await firestore()
          .collection('SaveTicket')
          .doc(isUserCreate?.user?.uid)
          .set({
            SaveTicket: [],
          });

        //------------------------------------------------>  SavedUserAddress data

        await firestore()
          .collection('SavedUserAddress')
          .doc(isUserCreate?.user?.uid)
          .set({
            SavedUserAddress: [],
          });

        //------------------------------------------------>  BookingCancel data

        await firestore()
          .collection('BookingCancel')
          .doc(isUserCreate?.user?.uid)
          .set({
            BookingCancel: [],
          });

        //-------------------------------------------------> Notification History Data
        await firestore()
          .collection('NotificationHistory')
          .doc(isUserCreate?.user?.uid)
          .set({
            NotificationHistory: [],
          })
          .then(() => {
            setModalVisible2(false);
            swiperRef?.current?.scrollBy(1);
          });
      })
      .catch(() => {
        setModalVisible2(false);
        AlertConstant('Your email is already register');
      });
  };
  return (
    <View style={styles.container}>
      <OnBoardingModuleHeader
        backImage={index == 1 ? null : Images.backIcon}
        onPress={() => {
          {
            index == 0
              ? goBack()
              : index == 1
              ? null
              : index < indexRoute + 1
              ? null
              : swiperRef?.current?.scrollBy(-1);
          }
        }}
        MainText={
          index == 0
            ? strings.createNewAccount
            : index == 1
            ? strings.TouchProfile
            : index == 2
            ? strings.Journey
            : index == 3
            ? strings.DineWay
            : index == 4
            ? strings.Way
            : index == 5
            ? strings.TermsCondition
            : index == 6
            ? strings.PIN
            : null
        }
        SubText={
          index == 0
            ? strings.subTextSignUpScreenHeader
            : index == 1
            ? strings.subTextProfile
            : index == 2
            ? strings.JourneyText
            : index == 3
            ? strings.DineWayText
            : index == 4
            ? strings.WayText
            : index == 5
            ? strings.TermsConditionText
            : index == 6
            ? strings.PinText
            : null
        }
        width={index == 0 ? '' : 16.67 * index}
      />
      <Swiper
        ref={swiperRef}
        scrollEnabled={false}
        onIndexChanged={index => {
          setIndex(index);
        }}
        loop={false}
        index={index}
        showsButtons={false}
        showsPagination={false}
        activeDotStyle={{borderStyle: 'solid', width: wp(8)}}
        paginationStyle={{
          alignItems: 'center',
          justifyContent: 'center',
          bottom: 0,
        }}>
        <View style={styles.slide}>
          <Text style={[styles.textInputTitleStyle, {marginTop: hp(2)}]}>
            {strings.EmailText}
          </Text>
          <OnBoardingTextInput
            textInputIcon={Images.Email}
            textInputPlaceholder={strings.EmailText}
            container={styles.textInputContainer}
            value={Email}
            onChangeText={email => setEmail(email)}
            keyboardType={'email-address'}
          />
          <Text style={styles.textInputTitleStyle}>{strings.Password}</Text>
          <OnBoardingTextInput
            textInputIcon={Images.password}
            textInputPlaceholder={strings.Password}
            container={styles.textInputContainer}
            value={Password}
            onChangeText={password => setPassword(password)}
            keyboardType={'default'}
          />
          <Text style={styles.textInputTitleStyle}>{strings.ReferralCode}</Text>
          <OnBoardingTextInput
            textInputPlaceholder={strings.ReferralCode}
            container={styles.textInputContainer}
            value={referralCode}
            onChangeText={referralCode => {
              setReferralCode(referralCode);
              referralCodeMatch(referralCode);
            }}
            keyboardType={'numeric'}
            contextMenuHidden={true}
          />
          <View style={styles.rememberLineStyle}>
            <View
              style={{
                marginEnd: wp(6),
                marginStart: wp(2),
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <CheckButton
                check={checked}
                onPress={() => {
                  setChecked(!checked);
                }}
              />
              <View style={{flexDirection: 'row'}}>
                <Text style={{marginLeft: wp(4), color: color.black}}>
                  {strings.TermsCondition1}
                </Text>
                <Text style={{color: color.commonBlue}}>
                  {strings.TextTerm}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.signUpStyle}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: 'black'}}>{strings.signInLine}</Text>
              <TouchableOpacity
                style={{marginLeft: wp(1)}}
                onPress={() => {
                  navigation.navigate('SignInScreen');
                }}>
                <Text
                  style={{
                    color: color.commonBlue,
                    fontSize: fontSize(14),
                    fontWeight: '400',
                  }}>
                  {strings.signInText}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.slide}>
          <View style={{marginTop: hp(2)}}>
            <ImagePickerData
              pickerResponse={pickerResponse}
              setPickerResponse={setPickerResponse}
              boxStyle={{
                width: hp(10.27),
                height: hp(10.27),
                borderRadius: hp(10.27 / 2),
              }}
            />
            <Text style={styles.textInputTitleStyle}>{strings.Name}</Text>
            <OnBoardingTextInput
              textInputPlaceholder={strings.Name}
              container={styles.textInputContainer}
              value={name}
              onChangeText={name => setName(name)}
              keyboardType={'default'}
            />
            <Text style={styles.textInputTitleStyle}>{strings.Phone}</Text>
            <CountryPickTextInput
              value={phoneNo}
              onChangeText={phoneNo => setPhoneNo(phoneNo)}
              placeholder={strings.Phone}
              disabled={true}
              onPress2={() => {
                setShow(true);
              }}
              countryCode={countryCode}
              placeholderTextColor={color.darkGray}
              textInputStyle={styles.textInputCountryPicker}
            />
            <Text style={styles.textInputTitleStyle}>{strings.DateBirth}</Text>
            <OnBoardingTextInput
              textInputPlaceholder={strings.DateBirth}
              container={styles.textInputContainer}
              value={date}
              onPress={() => {
                setDatePicker(true);
              }}
              onPressCalender={() => {
                setDatePicker(true);
              }}
            />
          </View>
        </View>
        <View style={styles.slide}>
          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            <View
              style={{
                marginTop: hp(2),
                paddingHorizontal: wp(2),
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {journeyData?.data?.map((item, index) => {
                return (
                  <TouchableOpacity
                    style={[
                      styles.flatListViewStyle,
                      {
                        borderColor: selectedJourneyData?.some(
                          i => i == item?.name,
                        )
                          ? 'blue'
                          : '#EEEEEE',
                      },
                    ]}
                    onPress={() => {
                      selectedJourneyData?.some(i => i == item?.name)
                        ? setSelectedJourneyData(
                            selectedJourneyData?.filter(e => e !== item?.name),
                          )
                        : selectedJourneyData?.length < 10
                        ? setSelectedJourneyData([
                            ...selectedJourneyData,
                            item?.name,
                          ])
                        : null;
                    }}>
                    <Image
                      source={{uri: item?.image}}
                      style={styles.flatListIconStyle}
                    />
                    <Text style={{color: color.black}}>{item?.name}</Text>
                  </TouchableOpacity>
                );
              })}
              {/* <FlatList
              bounces={false}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              data={journeyData.data}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    style={[
                      styles.flatListViewStyle,
                      {
                        borderColor: selectedJourneyData.some(
                          i => i == item.name,
                        )
                          ? 'blue'
                          : '#EEEEEE',
                      },
                    ]}
                    onPress={() => {
                      selectedJourneyData.some(i => i == item.name)
                        ? setSelectedJourneyData(
                            selectedJourneyData.filter(e => e !== item.name),
                          )
                        : selectedJourneyData.length < 10
                        ? setSelectedJourneyData([
                            ...selectedJourneyData,
                            item?.name,
                          ])
                        : null;
                    }}>
                    <Image
                      source={{uri: item.image}}
                      style={styles.flatListIconStyle}
                    />
                    <Text style={{color: color.black}}>{item.name}</Text>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={item => item.name}
            /> */}
            </View>
          </ScrollView>
        </View>
        <View style={styles.slide}>
          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            <View
              style={{
                marginTop: hp(2),
                paddingHorizontal: wp(2),
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {DineWayData?.categories?.map(item => {
                return (
                  <TouchableOpacity
                    style={[
                      styles.flatListViewStyle,
                      {
                        borderColor: selectedDineWay?.some(
                          i => i == item?.strCategory,
                        )
                          ? 'blue'
                          : '#EEEEEE',
                      },
                    ]}
                    onPress={() => {
                      selectedDineWay?.some(i => i == item?.strCategory)
                        ? setSelectedDineWay(
                            selectedDineWay?.filter(
                              e => e !== item?.strCategory,
                            ),
                          )
                        : selectedDineWay?.length < 5
                        ? setSelectedDineWay([
                            ...selectedDineWay,
                            item?.strCategory,
                          ])
                        : null;
                    }}>
                    <Image
                      source={{uri: item?.strCategoryThumb}}
                      style={styles.flatListIconStyle}
                    />
                    <Text style={{color: color.black}}>
                      {item?.strCategory}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
        <View style={styles.slide}>
          <View style={{marginTop: hp(2), marginVertical: hp(2)}}>
            <FlatList
              bounces={false}
              data={dummyAirlineData}
              renderItem={({item}) => {
                return item?.logo ? (
                  <TouchableOpacity
                    style={[
                      styles.flyWayStyle,
                      {
                        borderColor: selectedFlyWay?.some(i => i == item?.name)
                          ? 'blue'
                          : '#EEEEEE',
                      },
                    ]}
                    onPress={() => {
                      selectedFlyWay?.some(i => i == item?.name)
                        ? setSelectedFlyWay(
                            selectedFlyWay?.filter(e => e !== item?.name),
                          )
                        : selectedFlyWay?.length < 8
                        ? setSelectedFlyWay([...selectedFlyWay, item?.name])
                        : null;
                    }}>
                    <Image
                      source={{uri: item?.logo}}
                      style={{
                        height: hp(4),
                        width: hp(4),
                        resizeMode: 'contain',
                      }}
                    />
                    <Text
                      style={{marginLeft: wp(4), flex: 1, color: color.black}}>
                      {item.name}
                    </Text>
                    {selectedFlyWay?.some(i => i == item?.name) && (
                      <View style={{paddingStart: 'auto'}}>
                        <Image
                          source={Images.checkIcon}
                          style={{
                            height: hp(3),
                            width: hp(3),
                            tintColor: 'blue',
                          }}
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                ) : (
                  ''
                );
              }}
              keyExtractor={item => item?.name}
            />
          </View>
        </View>
        <View style={styles.slide}>
          <View style={{marginTop: hp(0), marginLeft: wp(6)}}>
            <ScrollView style={{width: wp(85)}} indicatorStyle="black">
              <Text style={styles.HederStyle}>{strings.TermsHeader}</Text>
              <Text style={{color: color.black}}>{strings.TermsData}</Text>
              <Text style={styles.HederStyle}>{strings.SectionOne}</Text>
              <Text style={{color: color.black}}>{strings.SectionOneText}</Text>
              <Text style={styles.HederStyle}>{strings.SectionTwo}</Text>
              <Text style={{color: color.black}}>{strings.SectionTwoText}</Text>
              <Text style={styles.HederStyle}>{strings.SectionThree}</Text>
              <Text style={{color: color.black}}>
                {strings.SectionThreeText}
              </Text>
              <Text style={{color: color.black}}>
                {strings.SectionThreeText2}
              </Text>
              <Text style={styles.HederStyle}>{strings.SectionFour}</Text>
              <Text style={{color: color.black}}>
                {strings.SectionFourText}
              </Text>
            </ScrollView>
          </View>
        </View>
        <View style={styles.slide}>
          <View style={{marginTop: hp(2)}}>
            <View style={styles.textInputView1}>
              <OtpInputs
                keyboardType="phone-pad"
                inputStyles={styles.otpInputStyle}
                numberOfInputs={4}
                handleChange={pin => setPin(pin)}
              />
            </View>
          </View>
        </View>
      </Swiper>
      <View>
        {index == 0 || index == 1 || index == 5 || index == 6 ? (
          <OnBoardingSingleButton
            buttonText={
              index == 0
                ? strings.signInText
                : index == 1
                ? strings.OnBoardingButtonSecond
                : index == 5
                ? strings.AgreeContinue
                : strings.Confirm
            }
            buttonStyle={styles.buttonStyle}
            onPress={() => {
              {
                index == 6
                  ? validation3(index)
                  : index == 0
                  ? validation(index)
                  : index == 1
                  ? validation2(index)
                  : handleSignUp2();
              }
            }}
          />
        ) : (
          <OnBoardingTwoButton
            buttonTextOne={strings.OnBoardingButtonOne}
            buttonTextTwo={strings.OnBoardingButtonSecond}
            TwoButtonStyle={{height: hp(6), marginBottom: hp(5)}}
            twoButtonStyle={{height: hp(6), marginBottom: hp(5)}}
            onPress1={() => {
              setIndex(5);
              handleSignUp2();
            }}
            onPress2={() => {
              handleSignUp2();
            }}
          />
        )}
      </View>
      <DateTimePicker
        mode="date"
        isVisible={datePicker}
        onConfirm={date => {
          setDate(moment(date)?.format('DD MMM YYYY'));
          setDatePicker(false);
        }}
        maximumDate={new Date()}
        minimumDate={new Date('1950-01-01')}
        onCancel={() => {
          setDatePicker(false);
        }}
      />
      <CountryPicker
        show={show}
        pickerButtonOnPress={item => {
          setShow();
          setCountryCode(item?.flag);
        }}
      />
      <Modal isVisible={modalVisible2} backdropColor="#000000">
        <View style={styles.createAlertBody}>
          <ActivityIndicator size="large" color={color.white} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  textInputTitleStyle: {
    marginLeft: wp(6),
    color: color.black,
  },
  rememberLineStyle: {
    paddingBottom: hp(2),
    flexDirection: 'row',
  },
  forgotPasswordStyle: {
    color: 'blue',
  },
  signUpStyle: {
    flex: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ECEFEF',
    marginHorizontal: wp(6),
    paddingTop: hp(2),
    alignItems: 'center',
  },
  buttonStyle: {
    paddingVertical: hp(2),
    marginVertical: hp(3),
  },
  lineStyle: {
    height: 1,
    marginTop: hp(2),
    marginHorizontal: wp(5),
    backgroundColor: '#ECEFEF',
  },
  modalImageStyle: {
    width: wp(70),
    height: hp(30),
    marginTop: hp(2),
  },
  checkbox: {
    alignSelf: 'center',
  },
  textInputContainer: {marginTop: hp(1)},
  slide: {
    flex: 1,
  },
  flatListIconStyle: {
    width: hp(3),
    height: hp(3),
    borderRadius: 15,
    resizeMode: 'contain',
    marginHorizontal: wp(2),
  },
  flatListViewStyle: {
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: wp(15),
    flexDirection: 'row',
    paddingVertical: hp(2),
    marginVertical: hp(0.5),
    marginHorizontal: wp(1),
    justifyContent: 'center',
    paddingHorizontal: wp(4),
  },
  HederStyle: {
    fontWeight: '600',
    marginVertical: hp(2),
    fontSize: fontSize(18),
    color: color.black,
  },
  textInputView1: {
    marginBottom: 10,
    marginTop: hp(4),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(14),
  },
  otpInputStyle: {
    width: wp(14),
    height: hp(6),
    borderRadius: 10,
    letterSpacing: 5,
    textAlign: 'center',
    backgroundColor: '#DFE1E5',
  },
  flyWayStyle: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 15,
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: hp(1),
    paddingVertical: hp(2),
    marginHorizontal: wp(4),
    paddingHorizontal: wp(4),
  },
  textInputCountryPicker: {
    height: hp(10),
    color: color.black,
  },
});

export default SignUpScreen;
