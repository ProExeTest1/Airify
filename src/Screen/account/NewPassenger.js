import moment from 'moment';
import uuid from 'react-native-uuid';
import auth from '@react-native-firebase/auth';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {CountryPicker} from 'react-native-country-codes-picker';
import {
  CommonHeader,
  OnBoardingSingleButton,
  CommonDropDown,
  TextInputPassenger,
} from '../../components';

import {Images} from '../../helper/IconConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import {AlertConstant} from '../../helper/AlertConstant';
import {useSelector, useDispatch} from 'react-redux';

const NewPassenger = ({navigation: {goBack}, navigation}) => {
  const strings = useSelector(state => state?.languageReducer?.languageObject);
  const route = useRoute();
  const title = ['Mr.', 'Mrs.'];
  const [email, setEmail] = useState('');
  const [show, setShow] = useState(false);
  const [phoneNo, setPhoneNo] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateType, setDateType] = useState('');
  const [firstName, setFirstName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [passportNo, setPassportNo] = useState('');
  const [nationality, setNationality] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [countryType, setCountryType] = useState('');
  const [datePicker, setDatePicker] = useState(false);
  const mode = route?.params?.mode;
  const [selectedTitle, setSelectedTitle] = useState('');
  const [identityCardNo, setIdentityCardNo] = useState('');
  const [drivingLicenseNo, setDrivingLicenseNo] = useState('');
  const [passportExpiryDate, setPassportExpiryDate] = useState('');
  const [passportIssueCountry, setPassportIssueCountry] = useState('');
  const [identityCardIssueDate, setIdentityCardIssueDate] = useState('');
  const [identityCardExpiryDate, setIdentityCardExpiryDate] = useState('');
  const [drivingLicenseIssueDate, setDrivingLicenseIssueDate] = useState('');
  const [identityCardIssueCountry, setIdentityCardIssueCountry] = useState('');
  const [drivingLicenseExpiryDate, setDrivingLicenseExpiryDate] = useState('');
  const [drivingLicenseIssueCountry, setDrivingLicenseIssueCountry] =
    useState('');
  const [validation, setValidation] = useState('');
  useEffect(() => {
    if (mode == 'Edit') {
      EditData();
    }
  }, []);

  const addNewPassengerList = () => {
    if (!firstName.trim().match('[a-zA-Z ]{3,30}')) {
      AlertConstant(
        firstName.length === 0
          ? strings.enter_first_name
          : strings.enter_first_name_valid,
      );
      return;
    } else if (!lastName.trim().match('[a-zA-Z ]{3,30}')) {
      AlertConstant(
        lastName.length === 0
          ? strings.enter_last_name
          : strings.enter_last_name_valid,
      );
      return;
    } else if (!selectedTitle.trim()) {
      AlertConstant(strings.select_title);
      return;
    } else if (!birthDate.trim()) {
      AlertConstant(strings.enter_DOB);
      return;
    } else if (!countryCode.trim()) {
      AlertConstant(strings.select_country_code);
      return;
    } else if (phoneNo.length > 0 && !phoneNo.trim().match('[0-9]{10}')) {
      AlertConstant('Enter valid Phone No.');
      return;
    } else if (
      email.length > 0 &&
      !email.trim().match('[a-z0-9]+@[a-z]+.[a-z]{2,3}')
    ) {
      AlertConstant('Enter valid Email address');
      return;
    } else if (email.length === 0 && phoneNo.length === 0) {
      setValidation('Contact Details');
      AlertConstant('Please fill any of one conatct detail');
    } else if (
      identityCardNo.length > 0 &&
      !identityCardNo.trim().match('[0-9]')
    ) {
      AlertConstant('Please enter valid identity card number');
      return;
    } else if (identityCardNo.length > 0 && !identityCardIssueCountry.trim()) {
      AlertConstant(strings.enter_identity_issued_country);
      return;
    } else if (identityCardNo.length > 0 && !identityCardIssueDate.trim()) {
      AlertConstant(strings.enter_identity_issued_date);
      return;
    } else if (identityCardNo.length > 0 && !identityCardExpiryDate.trim()) {
      AlertConstant(strings.enter_identity_issued_expiry_date);
      return;
    } else if (!passportNo.trim().match('[A-PR-WY-Z][1-9]\\d\\s?\\d{4}[1-9]')) {
      setValidation('Passport');
      AlertConstant(strings.enter_passport_no);
      return;
    } else if (!passportIssueCountry.trim()) {
      setValidation('Passport');
      AlertConstant(strings.enter_passport_issued_country);
      return;
    } else if (!passportExpiryDate.trim()) {
      setValidation('Passport');
      AlertConstant(strings.enter_passport_expiry_date);
      return;
    } else if (!nationality.trim()) {
      setValidation('Passport');
      AlertConstant(strings.select_nationality);
      return;
    } else if (
      drivingLicenseNo.length > 0 &&
      !drivingLicenseNo.trim().match('[A-Za-z][0-9/W/]{2,20}')
    ) {
      AlertConstant(strings.enter_driving_license);
      return;
    } else if (
      drivingLicenseNo.length > 0 &&
      !drivingLicenseIssueCountry.trim()
    ) {
      AlertConstant(strings.enter_driving_license_issued_country);
      return;
    } else if (drivingLicenseNo.length > 0 && !drivingLicenseIssueDate.trim()) {
      AlertConstant(strings.enter_driving_license_issued_date);
      return;
    } else if (
      drivingLicenseNo.length > 0 &&
      !drivingLicenseExpiryDate.trim()
    ) {
      AlertConstant(strings.select_driving_license_expiry_date);
      return;
    } else {
      mode == 'Edit' ? UpdatePassengerData() : addPassengerData();
    }
  };

  const addPassengerData = async () => {
    await firestore()
      .collection('PassengerList')
      .doc(auth().currentUser.uid)
      .get()
      .then(async d => {
        if (
          d?.data()?.PassengerList?.length === 0 ||
          d?.data()?.PassengerList?.some(item => item.Email !== email)
        ) {
          await firestore()
            .collection('PassengerList')
            .doc(auth().currentUser.uid)
            .set({
              PassengerList: [
                ...d.data().PassengerList,
                {
                  Email: email,
                  uniqID: uuid.v4(),
                  LastName: lastName,
                  FirstName: firstName,
                  Title: selectedTitle,
                  BirthDate: birthDate,
                  PhoneNumber: phoneNo,
                  CountryCode: countryCode,
                  Nationality: nationality,
                  PassportNumber: passportNo,
                  IdentityCardNumber:
                    identityCardNo > 0 ? identityCardNo : false,
                  PassportExpiryDate: passportExpiryDate,
                  DrivingLicenseNumber:
                    drivingLicenseNo.length > 0 ? drivingLicenseNo : false,
                  PassportIssueCountry: passportIssueCountry,
                  IdentityCardIssueDate:
                    identityCardNo > 0 ? identityCardIssueDate : false,
                  IdentityCardExpiryDate:
                    identityCardNo > 0 ? identityCardExpiryDate : false,
                  DrivingLicenseIssueDate:
                    drivingLicenseNo.length > 0
                      ? drivingLicenseIssueDate
                      : false,
                  IdentityCardIssueCountry:
                    identityCardNo > 0 ? identityCardIssueCountry : false,
                  DrivingLicenseExpiryDate:
                    drivingLicenseNo.length > 0
                      ? drivingLicenseExpiryDate
                      : false,
                  DrivingLicenseIssueCountry:
                    drivingLicenseNo.length > 0
                      ? drivingLicenseIssueCountry
                      : false,
                },
              ],
            });
          navigation.goBack();
        } else {
          AlertConstant(strings.passenger_exist);
        }
      });
  };
  const EditData = () => {
    setEmail(route?.params?.passengerData?.Email);
    setLastName(route?.params?.passengerData?.LastName);
    setFirstName(route?.params?.passengerData?.FirstName);
    setSelectedTitle(route?.params?.passengerData?.Title);
    setBirthDate(route?.params?.passengerData?.BirthDate);
    setPhoneNo(route?.params?.passengerData?.PhoneNumber);
    setNationality(route?.params?.passengerData?.Nationality);
    setCountryCode(route?.params?.passengerData?.CountryCode);
    setPassportNo(route?.params?.passengerData?.PassportNumber);
    setIdentityCardNo(route?.params?.passengerData?.IdentityCardNumber);
    setDrivingLicenseNo(route?.params?.passengerData?.DrivingLicenseNumber);
    setPassportExpiryDate(route?.params?.passengerData?.PassportExpiryDate);
    setPassportIssueCountry(route?.params?.passengerData?.PassportIssueCountry);
    setIdentityCardIssueDate(
      route?.params?.passengerData?.IdentityCardIssueDate,
    );
    setIdentityCardIssueCountry(
      route?.params?.passengerData?.IdentityCardIssueCountry,
    );
    setIdentityCardExpiryDate(
      route?.params?.passengerData?.IdentityCardExpiryDate,
    );
    setDrivingLicenseIssueCountry(
      route?.params?.passengerData?.DrivingLicenseIssueCountry,
    );
    setDrivingLicenseIssueDate(
      route?.params?.passengerData?.DrivingLicenseIssueDate,
    );
    setDrivingLicenseExpiryDate(
      route?.params?.passengerData?.DrivingLicenseExpiryDate,
    );
  };

  const UpdatePassengerData = async () => {
    await firestore()
      .collection('PassengerList')
      .doc(auth().currentUser.uid)
      .get()
      .then(async item => {
        await firestore()
          .collection('PassengerList')
          .doc(auth().currentUser.uid)
          .update({
            PassengerList: item?.data()?.PassengerList?.map(i => {
              if (i.uniqID == route?.params?.passengerData?.uniqID) {
                return {
                  Email: email,
                  uniqID: uuid.v4(),
                  LastName: lastName,
                  FirstName: firstName,
                  Title: selectedTitle,
                  BirthDate: birthDate,
                  PhoneNumber: phoneNo,
                  CountryCode: countryCode,
                  Nationality: nationality,
                  PassportNumber: passportNo,
                  IdentityCardNumber:
                    identityCardNo > 0 ? identityCardNo : false,
                  PassportExpiryDate: passportExpiryDate,
                  DrivingLicenseNumber:
                    drivingLicenseNo.length > 0 ? drivingLicenseNo : false,
                  PassportIssueCountry: passportIssueCountry,
                  IdentityCardIssueDate:
                    identityCardNo > 0 ? identityCardIssueDate : false,
                  IdentityCardExpiryDate:
                    identityCardNo > 0 ? identityCardExpiryDate : false,
                  DrivingLicenseIssueDate:
                    drivingLicenseNo.length > 0
                      ? drivingLicenseIssueDate
                      : false,
                  IdentityCardIssueCountry:
                    identityCardNo > 0 ? identityCardIssueCountry : false,
                  DrivingLicenseExpiryDate:
                    drivingLicenseNo.length > 0
                      ? drivingLicenseExpiryDate
                      : false,
                  DrivingLicenseIssueCountry:
                    drivingLicenseNo.length > 0
                      ? drivingLicenseIssueCountry
                      : false,
                };
              }
              return i;
            }),
          });
      });
    navigation?.goBack();
  };
  const color = useSelector(state => state?.themereducer?.colorTheme);
  const styles = ThemeStyle(color);
  return (
    <View style={styles.container}>
      <CommonHeader
        Images2={null}
        onPress1={true}
        onPress2={false}
        navigation2={() => {}}
        Images1={Images.cancel}
        Images1Color={'#fff'}
        cancelButtonStyle1={styles.cancelStyle}
        headerName={
          mode == 'Edit' ? strings.editPassenger : strings.newPassenger
        }
        navigation1={() => {
          if (route?.params?.From === 'Fill_Details') {
            navigation?.navigate('FillPassengerDetails');
          } else {
            goBack();
          }
        }}
      />
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: wp(4), marginBottom: hp(4)}}>
          <View style={styles.subContainerView}>
            <TextInputPassenger
              value={firstName}
              placeholder={strings?.firstName}
              TextInputLabel={strings?.firstName}
              onChangeText={firstName => setFirstName(firstName)}
              onSubmitEditing={() => lastNameRef?.focus()}
            />
            <TextInputPassenger
              value={lastName}
              ref={input => (lastNameRef = input)}
              placeholder={strings?.lastName}
              TextInputLabel={strings?.lastName}
              onChangeText={lastName => setLastName(lastName)}
            />
          </View>
          <View style={styles.subContainerView}>
            <CommonDropDown
              data={title}
              defaultValueˀ={selectedTitle}
              TextInputLabel={strings?.title}
              onSelect={title => {
                setSelectedTitle(title);
              }}
              buttonText={{color: selectedTitle ? color.black : color.darkGray}}
            />
            <TextInputPassenger
              disabled={true}
              editable={false}
              value={birthDate}
              calenderIcon={Images?.calender}
              placeholder={strings?.DateBirth}
              TextInputLabel={strings?.DateBirth}
              onPress={() => {
                setDateType('birthDate');
                setDatePicker(true);
              }}
              onPressCalender={() => {
                setDateType('birthDate');
                setDatePicker(true);
              }}
              onChangeText={birthDate => setBirthDate(birthDate)}
            />
          </View>

          <View style={styles.subContainerView}>
            <Text
              style={[
                styles.lineText,
                {color: validation === 'Contact Details' ? 'red' : color.black},
              ]}>
              {strings?.contactDetail}
            </Text>
            <View
              style={[
                styles.line,
                {
                  borderColor:
                    validation === 'Contact Details' ? 'red' : color.Grey,
                },
              ]}
            />
          </View>
          <View style={{flexDirection: 'row', flex: 1}}>
            <TextInputPassenger
              disabled={true}
              editable={false}
              value={countryCode}
              textInputIcon={Images.downArrow}
              placeholder={strings?.countryCode}
              TextInputLabel={strings?.countryCode}
              onPressCountryPicker={() => {
                setCountryType('countryCode');
                setShow(true);
              }}
              onPress={() => {
                setCountryType('countryCode');
                setShow(true);
              }}
            />
            <TextInputPassenger
              value={phoneNo}
              inputMode={'numeric'}
              onSubmitEditing={() => emailRef?.focus()}
              placeholder={strings?.Phone}
              passengerTextInputStyle={1.4}
              TextInputLabel={strings?.Phone}
              onChangeText={phoneNo => setPhoneNo(phoneNo)}
              textInputLabelStyle={styles.passengerTextInputStylePhoneNo}
            />
          </View>
          <TextInputPassenger
            value={email}
            ref={input => (emailRef = input)}
            autoCapitalize={'none'}
            inputMode={'email'}
            textInputIcon={Images.Email}
            placeholder={strings?.EmailText}
            TextInputLabel={strings?.EmailText}
            onChangeText={email => setEmail(email)}
          />
          <View style={styles.subContainerView}>
            <Text
              style={
                styles.lineText
              }>{`${strings?.identityCard} (optional)`}</Text>
            <View style={styles.line} />
          </View>
          <TextInputPassenger
            value={identityCardNo}
            placeholder={strings?.identityCardNo}
            TextInputLabel={strings?.identityCardNo}
            onChangeText={identityCardNo => setIdentityCardNo(identityCardNo)}
          />
          <TextInputPassenger
            disabled={true}
            editable={false}
            value={identityCardIssueCountry}
            textInputIcon={Images.downArrow}
            placeholder={strings?.issueCountry}
            TextInputLabel={strings?.issueCountry}
            onPressCountryPicker={() => {
              setCountryType('identityCardIssueCountry');
              setShow(true);
            }}
            onPress={() => {
              setCountryType('identityCardIssueCountry');
              setShow(true);
            }}
            onChangeText={identityCardIssueCountry =>
              setIdentityCardIssueCountry(identityCardIssueCountry)
            }
          />
          <View style={styles.subContainerView}>
            <TextInputPassenger
              editable={false}
              value={identityCardIssueDate}
              calenderIcon={Images?.calender}
              placeholder={strings?.issueDate}
              TextInputLabel={strings?.issueDate}
              onPress={() => {
                setDateType('identityCardIssueDate');
                setDatePicker(true);
              }}
              onPressCalender={() => {
                setDateType('identityCardIssueDate');
                setDatePicker(true);
              }}
              onChangeText={identityCardIssueDate =>
                setIdentityCardIssueDate(identityCardIssueDate)
              }
            />
            <TextInputPassenger
              disabled={true}
              editable={false}
              calenderIcon={Images.calender}
              value={identityCardExpiryDate}
              placeholder={strings.expiryDate}
              TextInputLabel={strings.expiryDate}
              onPress={() => {
                setDateType('identityCardExpiryDate');
                setDatePicker(true);
              }}
              onPressCalender={() => {
                setDateType('identityCardExpiryDate');
                setDatePicker(true);
              }}
              onChangeText={identityCardExpiryDate =>
                setIdentityCardExpiryDate(identityCardExpiryDate)
              }
            />
          </View>
          <View style={styles.subContainerView}>
            <Text
              style={[
                styles.lineText,
                {color: validation === 'Passport' ? 'red' : color.black},
              ]}>
              {strings?.passPort}
            </Text>
            <View
              style={[
                styles.line,
                {borderColor: validation === 'Passport' ? 'red' : color.Grey},
              ]}
            />
          </View>
          <TextInputPassenger
            value={passportNo}
            placeholder={strings.passport}
            TextInputLabel={strings.passport}
            onChangeText={passportNo => setPassportNo(passportNo)}
          />
          <TextInputPassenger
            disabled={true}
            editable={false}
            value={passportIssueCountry}
            textInputIcon={Images.downArrow}
            placeholder={strings?.issueCountry}
            TextInputLabel={strings?.issueCountry}
            onPressCountryPicker={() => {
              setCountryType('passportIssueCountry');
              setShow(true);
            }}
            onPress={() => {
              setCountryType('passportIssueCountry');
              setShow(true);
            }}
            onChangeText={passportIssueCountry =>
              setPassportIssueCountry(passportIssueCountry)
            }
          />
          <View style={styles.subContainerView}>
            <TextInputPassenger
              disabled={true}
              editable={false}
              value={passportExpiryDate}
              calenderIcon={Images.calender}
              placeholder={strings?.expiryDate}
              TextInputLabel={strings?.expiryDate}
              onPress={() => {
                setDateType('passportExpiryDate');
                setDatePicker(true);
              }}
              onPressCalender={() => {
                setDateType('passportExpiryDate');
                setDatePicker(true);
              }}
              onChangeText={passportExpiryDate =>
                setPassportExpiryDate(passportExpiryDate)
              }
            />
            <TextInputPassenger
              disabled={true}
              editable={false}
              value={nationality}
              calenderIcon={Images.downArrow}
              textInputIcon={Images.downArrow}
              placeholder={strings?.nationality}
              TextInputLabel={strings?.nationality}
              onChangeText={nationality => setNationality(nationality)}
              onPressCountryPicker={() => {
                setCountryType('nationality');
                setShow(true);
              }}
              onPress={() => {
                setCountryType('nationality');
                setShow(true);
              }}
            />
          </View>
          <View style={styles.subContainerView}>
            <Text
              style={
                styles.lineText
              }>{`${strings?.driLicense} (optional)`}</Text>
            <View style={styles.line} />
          </View>
          <TextInputPassenger
            value={drivingLicenseNo}
            placeholder={strings?.driLicenseNo}
            TextInputLabel={strings?.driLicenseNo}
            onChangeText={drivingLicenseNo =>
              setDrivingLicenseNo(drivingLicenseNo)
            }
          />
          <TextInputPassenger
            disabled={true}
            editable={false}
            textInputIcon={Images?.downArrow}
            placeholder={strings?.issueCountry}
            value={drivingLicenseIssueCountry}
            TextInputLabel={strings?.issueCountry}
            onPressCountryPicker={() => {
              setCountryType('drivingLicenseIssueCountry');
              setShow(true);
            }}
            onPress={() => {
              setCountryType('drivingLicenseIssueCountry');
              setShow(true);
            }}
            onChangeText={drivingLicenseIssueCountry =>
              setDrivingLicenseIssueCountry(drivingLicenseIssueCountry)
            }
          />
          <View style={styles.subContainerView}>
            <TextInputPassenger
              disabled={true}
              editable={false}
              calenderIcon={Images.calender}
              value={drivingLicenseIssueDate}
              placeholder={strings.issueDate}
              TextInputLabel={strings.issueDate}
              onPress={() => {
                setDateType('drivingLicenseIssueDate');
                setDatePicker(true);
              }}
              onPressCalender={() => {
                setDateType('drivingLicenseIssueDate');
                setDatePicker(true);
              }}
              onChangeText={drivingLicenseIssueDate =>
                setDrivingLicenseIssueDate(drivingLicenseIssueDate)
              }
            />
            <TextInputPassenger
              disabled={true}
              editable={false}
              calenderIcon={Images.calender}
              value={drivingLicenseExpiryDate}
              placeholder={strings.expiryDate}
              TextInputLabel={strings.expiryDate}
              onPress={() => {
                setDateType('drivingLicenseExpiryDate');
                setDatePicker(true);
              }}
              onPressCalender={() => {
                setDateType('drivingLicenseExpiryDate');
                setDatePicker(true);
              }}
              onChangeText={drivingLicenseExpiryDate =>
                setDrivingLicenseExpiryDate(drivingLicenseExpiryDate)
              }
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonViewStyle}>
        <OnBoardingSingleButton
          buttonStyle={styles.buttonStyle}
          buttonText={mode == 'Edit' ? strings.edit : strings.save}
          onPress={() => {
            addNewPassengerList();
          }}
        />
      </View>
      <DateTimePicker
        mode="date"
        isVisible={datePicker}
        onConfirm={date => {
          dateType == 'birthDate'
            ? setBirthDate(moment(date).format('DD MMM YYYY'))
            : dateType == 'identityCardIssueDate'
            ? setIdentityCardIssueDate(moment(date).format('DD MMM YYYY'))
            : dateType == 'identityCardExpiryDate'
            ? setIdentityCardExpiryDate(moment(date).format('DD MMM YYYY'))
            : dateType == 'passportExpiryDate'
            ? setPassportExpiryDate(moment(date).format('DD MMM YYYY'))
            : dateType == 'drivingLicenseIssueDate'
            ? setDrivingLicenseIssueDate(moment(date).format('DD MMM YYYY'))
            : setDrivingLicenseExpiryDate(moment(date).format('DD MMM YYYY'));
          setDatePicker(false);
        }}
        onCancel={() => {
          setDatePicker(false);
        }}
      />
      <CountryPicker
        show={show}
        pickerButtonOnPress={item => {
          countryType == 'countryCode'
            ? setCountryCode(item?.flag + item?.dial_code)
            : countryType == 'identityCardIssueCountry'
            ? setIdentityCardIssueCountry(item?.name?.en)
            : countryType == 'passportIssueCountry'
            ? setPassportIssueCountry(item?.name?.en)
            : countryType == 'nationality'
            ? setNationality(item?.name?.en)
            : setDrivingLicenseIssueCountry(item?.name?.en);
          setShow(false);
        }}
        style={{
          countryName: {
            color: color.black,
          },
          dialCode: {
            color: color.black,
          },
        }}
      />
    </View>
  );
};
export default NewPassenger;
const ThemeStyle = color =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.onBoardingBgColor,
    },
    cancelStyle: {
      width: hp(2),
      height: hp(2),
      marginTop: hp(0.5),
      resizeMode: 'contain',
      tintColor: color.white,
    },
    line: {
      flex: 1,
      borderWidth: 1,
      marginTop: hp(2),
      alignSelf: 'center',
      borderColor: color.Grey,
      marginHorizontal: wp(2),
    },

    buttonStyle: {
      marginTop: hp(2),
    },
    buttonViewStyle: {
      borderTopWidth: 1,
      paddingBottom: hp(3),
      borderColor: color.Grey,
    },
    lineText: {
      marginTop: hp(2),
      fontWeight: '500',
      color: color.darkGray,
      fontSize: fontSize(16),
    },
    subContainerView: {flexDirection: 'row'},
  });
