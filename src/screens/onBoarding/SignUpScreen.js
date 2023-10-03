import React, {
  Component,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  FlatList,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import OnBoardingModuleHeader from '../../components/OnBoardingModuleHeader';
import {Images} from '../../helper/IconConstant';
import {strings} from '../../helper/Strings';
import OnBoardingTextInput from '../../components/OnBoardingTextInput';
import {fontSize, hp, wp} from '../../helper/Constant';
import OnBoardingText from '../../components/OnBoardingText';
import OnBoardingSingleButton from '../../components/OnBoardingSingleButton';
import CheckButton from '../../components/CheckButton';
import Swiper from 'react-native-swiper';
import OnBoardingTwoButton from '../../components/OnBoardingTwoButton';
import ImagePickerData from '../../components/ImagePickerData';
import CountryPickTextInput from '../../components/CountryPickTextInput';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {DineWay} from '../../redux/action/HomeAction';
import OtpInputs from 'react-native-otp-inputs';
import {dummyAirlineData} from '../../helper/dummyData';
import firestore, {firebase} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

const SignUpScreen = ({navigation: {goBack}, navigation}) => {
  const [checked, setChecked] = useState(false);
  const swiperRef = useRef();
  const [index, setIndex] = useState(0);
  const [pickerResponse, setPickerResponse] = useState('');
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState('');
  const [journeyData, setJourneyData] = useState([]);
  const [selectedJourneyData, setSelectedJourneyData] = useState([]);
  const [selectedDineWay, setSelectedDineWay] = useState([]);
  const [selectedFlyWay, setSelectedFlyWay] = useState([]);
  const dispatch = useDispatch();
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [pin, setPin] = useState('');

  useEffect(() => {
    JourneyData();
    onPressAdd();
  }, []);
  const DineWayData = useSelector(
    response => response?.OnBoarding?.DineWayData,
  );

  const onPressAdd = async () => {
    dispatch(DineWay());
  };

  const JourneyData = () => {
    const journeyData = firestore()
      .collection('countryData')
      .doc('FinalData')
      .get()
      .then(res => {
        setJourneyData(res._data);
      });
  };

  const validation = index => {
    if (!Email.trim()) {
      alert('Please Enter Email');
      return;
    } else if (!Password.trim()) {
      alert('Please Enter Password');
      return;
    } else {
      swiperRef.current.scrollBy(1);
    }
  };

  const validation2 = index => {
    if (!name.trim()) {
      alert('Please Enter name');
      return;
    } else if (!phoneNo.trim()) {
      alert('Please Enter Phone Number');
      return;
    } else if (!pickerResponse.trim()) {
      alert('Please Select Profile Image');
      return;
    } else if (!date.trim()) {
      alert('Please Enter Date of Birth');
      return;
    } else {
      swiperRef.current.scrollBy(1);
    }
  };

  const handleSignUp = async () => {
    try {
      const isUserCreate = await auth().createUserWithEmailAndPassword(
        Email,
        Password,
      );
      const uploadStorage = pickerResponse;
      const filename = Date.now();
      const task = storage()
        .ref(`/Profile/${isUserCreate.user.uid}/${filename}`)
        .putFile(uploadStorage);
      try {
        await task;
        Alert.alert('Image uploaded', 'Image uploaded successfully');
      } catch (error) {
        console.log(error);
      }
      const url = await storage()
        .ref(`/Profile/${isUserCreate.user.uid}/${filename}`)
        .getDownloadURL()
        .catch(err => {
          console.log('error in download', err);
        });

      await firestore().collection('Users').doc(isUserCreate.user.uid).set({
        Name: name,
        Email: Email,
        Password: Password,
        profileImageURL: url,
        id: filename,
        uid: isUserCreate.user.uid,
        referralCode: referralCode,
        PIN: pin,
        PhoneNumber: phoneNo,
        BirthDate: date,
        JourneyData: selectedJourneyData,
        DineWay: selectedDineWay,
        FlyData: selectedFlyWay,
      });
      await auth().signOut();
      navigation.navigate('SignUpSuccess');
    } catch (error) {
      console.log(error);
    }
    setPickerResponse(null);
  };
  return (
    <View style={styles.container}>
      <View style={{flex: 0.45, backgroundColor: 'blue'}}>
        <OnBoardingModuleHeader
          backImage={Images.backIcon}
          onPress={() => {
            {
              index == 0 ? goBack() : swiperRef.current.scrollBy(-1);
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
      </View>
      <Swiper
        ref={swiperRef}
        scrollEnabled={false}
        onIndexChanged={index => {
          setIndex(index);
        }}
        loop={false}
        index={index}
        showsPagination={false}
        showsButtons={false}
        activeDotStyle={{borderStyle: 'solid', width: wp(8)}}
        paginationStyle={{
          alignItems: 'center',
          justifyContent: 'center',
          bottom: 0,
        }}>
        <View style={styles.slide}>
          <View style={{marginTop: hp(2)}}>
            <Text style={styles.textInputTitleStyle}>{strings.EmailText}</Text>
            <OnBoardingTextInput
              textInputIcon={Images.Email}
              textInputPlaceholder={strings.EmailText}
              container={styles.textInputContainer}
              value={Email}
              onChangeText={email => setEmail(email)}
            />
            <Text style={styles.textInputTitleStyle}>{strings.Password}</Text>
            <OnBoardingTextInput
              textInputIcon={Images.password}
              textInputPlaceholder={strings.Password}
              container={styles.textInputContainer}
              value={Password}
              onChangeText={password => setPassword(password)}
            />
            <Text style={styles.textInputTitleStyle}>
              {strings.ReferralCode}
            </Text>
            <OnBoardingTextInput
              textInputPlaceholder={strings.ReferralCode}
              container={styles.textInputContainer}
              value={referralCode}
              onChangeText={referralCode => setReferralCode(referralCode)}
            />
            <View style={styles.rememberLineStyle}>
              <View
                style={{
                  marginHorizontal: wp(6),
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
                  <Text style={{marginLeft: wp(6)}}>
                    {strings.TermsCondition1}
                  </Text>
                  <Text style={{color: 'blue'}}>{strings.TextTerm}</Text>
                </View>
              </View>
            </View>
            <View style={styles.lineStyle} />
            <View style={styles.signUpStyle}>
              <OnBoardingText
                OnBoardingSubText={strings.signInLine}
                OnBoardingSubTextStyle={{
                  fontSize: fontSize(14),
                  fontWeight: '400',
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SignInScreen');
                }}>
                <OnBoardingText
                  OnBoardingSubText={strings.signInText}
                  OnBoardingSubTextStyle={{
                    color: 'blue',
                    fontSize: fontSize(14),
                    fontWeight: '400',
                  }}
                />
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
            />
            <Text style={styles.textInputTitleStyle}>{strings.Phone}</Text>
            <CountryPickTextInput
              value={phoneNo}
              onChangeText={phoneNo => setPhoneNo(phoneNo)}
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
          <View
            style={{
              marginTop: hp(2),
              paddingHorizontal: wp(2),
            }}>
            <FlatList
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
                        : setSelectedJourneyData([
                            ...selectedJourneyData,
                            item?.name,
                          ]);
                    }}>
                    <Image
                      source={{uri: item.image}}
                      style={styles.flatListIconStyle}
                    />
                    <Text style={{width: wp(25)}} numberOfLines={1}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={item => item.name}
            />
          </View>
        </View>
        <View style={styles.slide}>
          <View
            style={{
              marginTop: hp(2),
              paddingHorizontal: wp(2),
            }}>
            <FlatList
              bounces={false}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              data={DineWayData?.categories}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    style={[
                      styles.flatListViewStyle,
                      {
                        borderColor: selectedDineWay.some(
                          i => i == item.strCategory,
                        )
                          ? 'blue'
                          : '#EEEEEE',
                      },
                    ]}
                    onPress={() => {
                      selectedDineWay.some(i => i == item.strCategory)
                        ? setSelectedDineWay(
                            selectedDineWay.filter(e => e !== item.strCategory),
                          )
                        : setSelectedDineWay([
                            ...selectedDineWay,
                            item?.strCategory,
                          ]);
                    }}>
                    <Image
                      source={{uri: item.strCategoryThumb}}
                      style={styles.flatListIconStyle}
                    />
                    <Text style={{width: wp(25)}} numberOfLines={1}>
                      {item.strCategory}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={item => item.idCategory}
            />
          </View>
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
                        borderColor: selectedFlyWay.some(i => i == item.name)
                          ? 'blue'
                          : '#EEEEEE',
                      },
                    ]}
                    onPress={() => {
                      selectedFlyWay.some(i => i == item.name)
                        ? setSelectedFlyWay(
                            selectedFlyWay.filter(e => e !== item.name),
                          )
                        : setSelectedFlyWay([...selectedFlyWay, item?.name]);
                    }}>
                    <Image
                      source={{uri: item.logo}}
                      style={{
                        height: hp(4),
                        width: hp(4),
                        resizeMode: 'contain',
                      }}
                    />
                    <Text style={{marginLeft: wp(4), flex: 1}}>
                      {item.name}
                    </Text>
                    {selectedFlyWay.some(i => i == item.name) && (
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
              keyExtractor={item => item.name}
            />
          </View>
        </View>
        <View style={styles.slide}>
          <View style={{marginTop: hp(0), marginLeft: wp(6)}}>
            <ScrollView style={{width: wp(85)}} indicatorStyle="black">
              <Text style={styles.HederStyle}>{strings.TermsHeader}</Text>
              <Text>{strings.TermsData}</Text>
              <Text style={styles.HederStyle}>{strings.SectionOne}</Text>
              <Text>{strings.SectionOneText}</Text>
              <Text style={styles.HederStyle}>{strings.SectionTwo}</Text>
              <Text>{strings.SectionTwoText}</Text>
              <Text style={styles.HederStyle}>{strings.SectionThree}</Text>
              <Text>{strings.SectionThreeText}</Text>
              <Text>{strings.SectionThreeText2}</Text>
              <Text style={styles.HederStyle}>{strings.SectionFour}</Text>
              <Text>{strings.SectionFourText}</Text>
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
      <View style={{marginBottom: hp(4)}}>
        <View style={styles.lineStyle} />
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
                  ? handleSignUp()
                  : index == 0
                  ? validation(index)
                  : validation2(index);
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
              index == 2
                ? swiperRef.current.scrollBy(6)
                : swiperRef.current.scrollBy(1);
            }}
            onPress2={() => {
              swiperRef.current.scrollBy(1);
            }}
          />
        )}
      </View>
      <DateTimePicker
        mode="date"
        isVisible={datePicker}
        onConfirm={date => {
          setDate(moment(date).format('DD MMM YYYY'));
          setDatePicker(false);
        }}
        onCancel={() => {
          setDatePicker(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  textInputTitleStyle: {
    marginLeft: wp(6),
  },
  rememberLineStyle: {
    flexDirection: 'row',
    marginTop: hp(1),
    alignItems: 'center',
  },
  forgotPasswordStyle: {
    color: 'blue',
  },
  signUpStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: wp(22),
    alignSelf: 'center',
  },
  buttonStyle: {
    marginTop: hp(4),
    height: hp(6),
  },
  lineStyle: {
    height: 1,
    backgroundColor: '#ECEFEF',
    marginHorizontal: wp(5),
    marginTop: hp(2),
  },
  modalImageStyle: {
    height: hp(30),
    width: wp(70),
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
    height: hp(3),
    width: hp(3),
    resizeMode: 'contain',
    marginHorizontal: wp(2),
    borderRadius: 15,
  },
  flatListViewStyle: {
    borderWidth: 1,
    borderRadius: wp(15),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: hp(2),
    marginVertical: hp(0.5),
    marginHorizontal: wp(1),
    paddingHorizontal: wp(4),
  },
  HederStyle: {
    fontSize: fontSize(18),
    fontWeight: '600',
    marginVertical: hp(2),
  },
  textInputView1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: hp(4),
    paddingHorizontal: wp(14),
  },
  otpInputStyle: {
    backgroundColor: '#DFE1E5',
    textAlign: 'center',
    height: hp(6),
    width: wp(14),
    borderRadius: 10,
    letterSpacing: 5,
  },
  flyWayStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: wp(4),
    marginVertical: hp(1),
    paddingVertical: hp(2),
    borderRadius: 15,
    paddingHorizontal: wp(4),
    borderWidth: 1,
  },
});

export default SignUpScreen;
