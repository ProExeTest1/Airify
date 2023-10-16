import React, {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {color} from '../../helper/ColorConstant';
import {CommonHeader} from '../../components';
import {strings} from '../../helper/Strings';
import {Images} from '../../helper/IconConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import TextInputPassenger from '../../components/AccountComponent/TextInputPassenger';
import OnBoardingSingleButton from '../../components/OnBoardingSingleButton';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {CountryPicker} from 'react-native-country-codes-picker';
import CommonDropDown from '../../components/AccountComponent/CommonDropDown';
import firestore, {firebase} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useRoute} from '@react-navigation/native';
import uuid from 'react-native-uuid';

const NewPassenger = ({navigation: {goBack}, navigation}) => {
  const route = useRoute();
  const [mode, setMode] = useState(route?.params?.mode);
  const [datePicker, setDatePicker] = useState(false);
  const [birthDate, setBirthDate] = useState('');
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('');
  const title = ['Mr.', 'Mrs.'];
  const [selectedTitle, setSelectedTitle] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
  const [identityCardNo, setIdentityCardNo] = useState('');
  const [identityCardIssueCountry, setIdentityCardIssueCountry] = useState('');
  const [identityCardIssueDate, setIdentityCardIssueDate] = useState('');
  const [identityCardExpiryDate, setIdentityCardExpiryDate] = useState('');
  const [passportNo, setPassportNo] = useState('');
  const [passportIssueCountry, setPassportIssueCountry] = useState('');
  const [passportExpiryDate, setPassportExpiryDate] = useState('');
  const [nationality, setNationality] = useState('');
  const [drivingLicenseNo, setDrivingLicenseNo] = useState('');
  const [drivingLicenseIssueCountry, setDrivingLicenseIssueCountry] =
    useState('');
  const [drivingLicenseIssueDate, setDrivingLicenseIssueDate] = useState('');
  const [drivingLicenseExpiryDate, setDrivingLicenseExpiryDate] = useState('');
  const [countryType, setCountryType] = useState('');
  const [dateType, setDateType] = useState('');

  useEffect(() => {
    if (mode == 'Edit') {
      EditData();
    }
  }, []);
  const addNewPassengerList = async () => {
    if (!firstName.trim().match('[a-zA-Z ]{3,30}')) {
      alert('Please Enter First Name');
      return;
    } else if (!lastName.trim().match('[a-zA-Z ]{3,30}')) {
      alert('Please Enter last name');
      return;
    } else if (!selectedTitle.trim()) {
      alert('Please select title');
      return;
    } else if (!birthDate.trim()) {
      alert('Please Enter Date of Birth');
      return;
    } else if (!countryCode.trim()) {
      alert('Please select country code');
      return;
    } else if (!phoneNo.trim().match('[0-9]{10}')) {
      alert('Please Enter Phone Number');
      return;
    } else if (!email.trim().match('[a-z0-9]+@[a-z]+.[a-z]{2,3}')) {
      alert('Please Enter Email Address');
      return;
    } else if (!identityCardNo.trim().match('[0-9]')) {
      alert('Please Enter Identity Card Number');
      return;
    } else if (!identityCardIssueCountry.trim()) {
      alert('Please Select Identity Card Issue Country');
      return;
    } else if (!identityCardIssueDate.trim()) {
      alert('Please Select Identity Card Issue Date');
      return;
    } else if (!identityCardExpiryDate.trim()) {
      alert('Please Select Identity Card Expiry Date');
      return;
    } else if (!passportNo.trim().match('[A-PR-WY-Z][1-9]\\d\\s?\\d{4}[1-9]')) {
      alert('Please Enter Passport Number');
      return;
    } else if (!passportIssueCountry.trim()) {
      alert('Please Select Passport Issue Country');
      return;
    } else if (!passportExpiryDate.trim()) {
      alert('Please Select Passport Expiry Date');
      return;
    } else if (!nationality.trim()) {
      alert('Please Select Nationality');
      return;
    } else if (!drivingLicenseNo.trim().match('[A-Za-z][0-9/W/]{2,20}')) {
      alert('Please Enter Driving License Number');
      return;
    } else if (!drivingLicenseIssueCountry.trim()) {
      alert('Please Select driving license issue country');
      return;
    } else if (!drivingLicenseIssueDate.trim()) {
      alert('Please Select driving license issue Date');
      return;
    } else if (!drivingLicenseExpiryDate.trim()) {
      alert('Please Select driving license Expiry Date');
      return;
    } else {
      mode == 'Edit' ? UpdatePassengerData() : addPassengerData();
    }
  };

  const addPassengerData = async () => {
    const pd = await firestore()
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
                  FirstName: firstName,
                  LastName: lastName,
                  Title: selectedTitle,
                  BirthDate: birthDate,
                  CountryCode: countryCode,
                  PhoneNumber: phoneNo,
                  Email: email,
                  IdentityCardNumber: identityCardNo,
                  IdentityCardIssueCountry: identityCardIssueCountry,
                  IdentityCardIssueDate: identityCardIssueDate,
                  IdentityCardExpiryDate: identityCardExpiryDate,
                  PassportNumber: passportNo,
                  PassportIssueCountry: passportIssueCountry,
                  PassportExpiryDate: passportExpiryDate,
                  Nationality: nationality,
                  DrivingLicenseNumber: drivingLicenseNo,
                  DrivingLicenseIssueCountry: drivingLicenseIssueCountry,
                  DrivingLicenseIssueDate: drivingLicenseIssueDate,
                  DrivingLicenseExpiryDate: drivingLicenseExpiryDate,
                  uniqID: uuid.v4(),
                },
              ],
            });
          navigation.navigate('PassengerList');
        } else {
          alert('Passenger is already exits');
        }
      });
  };
  const EditData = () => {
    setFirstName(route.params.passengerData.FirstName);
    setLastName(route.params.passengerData.LastName);
    setSelectedTitle(route.params.passengerData.Title);
    setBirthDate(route.params.passengerData.BirthDate);
    setCountryCode(route.params.passengerData.CountryCode);
    setPhoneNo(route.params.passengerData.PhoneNumber);
    setEmail(route.params.passengerData.Email);
    setIdentityCardNo(route.params.passengerData.IdentityCardNumber);
    setIdentityCardIssueCountry(
      route.params.passengerData.IdentityCardIssueCountry,
    );
    setIdentityCardIssueDate(route.params.passengerData.IdentityCardIssueDate);
    setIdentityCardExpiryDate(
      route.params.passengerData.IdentityCardExpiryDate,
    );
    setPassportNo(route.params.passengerData.PassportNumber);
    setPassportIssueCountry(route.params.passengerData.PassportIssueCountry);
    setPassportExpiryDate(route.params.passengerData.PassportExpiryDate);
    setNationality(route.params.passengerData.Nationality);
    setDrivingLicenseNo(route.params.passengerData.DrivingLicenseNumber);
    setDrivingLicenseIssueCountry(
      route.params.passengerData.DrivingLicenseIssueCountry,
    );
    setDrivingLicenseIssueDate(
      route.params.passengerData.DrivingLicenseIssueDate,
    );
    setDrivingLicenseExpiryDate(
      route.params.passengerData.DrivingLicenseExpiryDate,
    );
  };

  const UpdatePassengerData = async () => {
    const tmp = await firestore()
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
                  FirstName: firstName,
                  LastName: lastName,
                  Title: selectedTitle,
                  BirthDate: birthDate,
                  CountryCode: countryCode,
                  PhoneNumber: phoneNo,
                  Email: email,
                  IdentityCardNumber: identityCardNo,
                  IdentityCardIssueCountry: identityCardIssueCountry,
                  IdentityCardIssueDate: identityCardIssueDate,
                  IdentityCardExpiryDate: identityCardExpiryDate,
                  PassportNumber: passportNo,
                  PassportIssueCountry: passportIssueCountry,
                  PassportExpiryDate: passportExpiryDate,
                  Nationality: nationality,
                  DrivingLicenseNumber: drivingLicenseNo,
                  DrivingLicenseIssueCountry: drivingLicenseIssueCountry,
                  DrivingLicenseIssueDate: drivingLicenseIssueDate,
                  DrivingLicenseExpiryDate: drivingLicenseExpiryDate,
                  uniqID: i.uniqID,
                };
              }
              return i;
            }),
          });
      });
    navigation.navigate('PassengerList');
  };
  return (
    <View style={styles.container}>
      <CommonHeader
        headerName={
          mode == 'Edit' ? strings.editPassenger : strings.newPassenger
        }
        navigation1={() => {
          goBack();
        }}
        navigation2={() => {}}
        onPress1={true}
        onPress2={false}
        Images1={Images.cancel}
        Images2={null}
        Images1Color={color.white}
        cancelButtonStyle1={styles.cancelStyle}
      />
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: wp(4), marginBottom: hp(4)}}>
          <View style={styles.subContainerView}>
            <TextInputPassenger
              placeholder={strings.firstName}
              TextInputLabel={strings.firstName}
              value={firstName}
              onChangeText={firstName => setFirstName(firstName)}
            />
            <TextInputPassenger
              placeholder={strings.lastName}
              TextInputLabel={strings.lastName}
              value={lastName}
              onChangeText={lastName => setLastName(lastName)}
            />
          </View>
          <View style={styles.subContainerView}>
            <CommonDropDown
              TextInputLabel={strings.title}
              data={title}
              onSelect={title => {
                setSelectedTitle(title);
              }}
              buttonText={{color: selectedTitle ? color.black : color.darkGray}}
              defaultValue={selectedTitle}
            />
            <TextInputPassenger
              placeholder={strings.DateBirth}
              TextInputLabel={strings.DateBirth}
              value={birthDate}
              onPress={() => {
                setDateType('birthDate');
                setDatePicker(true);
              }}
              onPressCalender={() => {
                setDateType('birthDate');
                setDatePicker(true);
              }}
              editable={false}
              onChangeText={birthDate => setBirthDate(birthDate)}
              calenderIcon={Images.calender}
              disabled={true}
            />
          </View>

          <View style={styles.subContainerView}>
            <Text style={styles.lineText}>{strings.contactDetail}</Text>
            <View style={styles.line} />
          </View>
          <View style={{flexDirection: 'row', flex: 1}}>
            <TextInputPassenger
              placeholder={strings.countryCode}
              TextInputLabel={strings.countryCode}
              value={countryCode}
              onPressCountryPicker={() => {
                setCountryType('countryCode');
                setShow(true);
              }}
              onPress={() => {
                setCountryType('countryCode');
                setShow(true);
              }}
              editable={false}
              textInputIcon={Images.downArrow}
              disabled={true}
            />
            <TextInputPassenger
              placeholder={strings.Phone}
              TextInputLabel={strings.Phone}
              passengerTextInputStyle={1.4}
              textInputLabelStyle={styles.passengerTextInputStylePhoneNo}
              value={phoneNo}
              onChangeText={phoneNo => setPhoneNo(phoneNo)}
            />
          </View>
          <TextInputPassenger
            placeholder={strings.EmailText}
            TextInputLabel={strings.EmailText}
            textInputIcon={Images.Email}
            value={email}
            onChangeText={email => setEmail(email)}
          />
          <View style={styles.subContainerView}>
            <Text style={styles.lineText}>{strings.identityCard}</Text>
            <View style={styles.line} />
          </View>
          <TextInputPassenger
            placeholder={strings.identityCardNo}
            TextInputLabel={strings.identityCardNo}
            value={identityCardNo}
            onChangeText={identityCardNo => setIdentityCardNo(identityCardNo)}
          />
          <TextInputPassenger
            placeholder={strings.issueCountry}
            TextInputLabel={strings.issueCountry}
            onPressCountryPicker={() => {
              setCountryType('identityCardIssueCountry');
              setShow(true);
            }}
            editable={false}
            textInputIcon={Images.downArrow}
            disabled={true}
            onPress={() => {
              setCountryType('identityCardIssueCountry');
              setShow(true);
            }}
            value={identityCardIssueCountry}
            onChangeText={identityCardIssueCountry =>
              setIdentityCardIssueCountry(identityCardIssueCountry)
            }
          />
          <View style={styles.subContainerView}>
            <TextInputPassenger
              placeholder={strings.issueDate}
              TextInputLabel={strings.issueDate}
              onPress={() => {
                setDateType('identityCardIssueDate');
                setDatePicker(true);
              }}
              onPressCalender={() => {
                setDateType('identityCardIssueDate');
                setDatePicker(true);
              }}
              editable={false}
              value={identityCardIssueDate}
              onChangeText={identityCardIssueDate =>
                setIdentityCardIssueDate(identityCardIssueDate)
              }
              calenderIcon={Images.calender}
            />
            <TextInputPassenger
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
              editable={false}
              value={identityCardExpiryDate}
              onChangeText={identityCardExpiryDate =>
                setIdentityCardExpiryDate(identityCardExpiryDate)
              }
              calenderIcon={Images.calender}
              disabled={true}
            />
          </View>
          <View style={styles.subContainerView}>
            <Text style={styles.lineText}>{strings.passPort}</Text>
            <View style={styles.line} />
          </View>
          <TextInputPassenger
            placeholder={strings.passport}
            TextInputLabel={strings.passport}
            value={passportNo}
            onChangeText={passportNo => setPassportNo(passportNo)}
          />
          <TextInputPassenger
            placeholder={strings.issueCountry}
            TextInputLabel={strings.issueCountry}
            onPressCountryPicker={() => {
              setCountryType('passportIssueCountry');
              setShow(true);
            }}
            editable={false}
            textInputIcon={Images.downArrow}
            disabled={true}
            onPress={() => {
              setCountryType('passportIssueCountry');
              setShow(true);
            }}
            value={passportIssueCountry}
            onChangeText={passportIssueCountry =>
              setPassportIssueCountry(passportIssueCountry)
            }
          />
          <View style={styles.subContainerView}>
            <TextInputPassenger
              placeholder={strings.expiryDate}
              TextInputLabel={strings.expiryDate}
              onPress={() => {
                setDateType('passportExpiryDate');
                setDatePicker(true);
              }}
              onPressCalender={() => {
                setDateType('passportExpiryDate');
                setDatePicker(true);
              }}
              editable={false}
              value={passportExpiryDate}
              onChangeText={passportExpiryDate =>
                setPassportExpiryDate(passportExpiryDate)
              }
              calenderIcon={Images.calender}
              disabled={true}
            />
            <TextInputPassenger
              placeholder={strings.nationality}
              TextInputLabel={strings.nationality}
              onPressCountryPicker={() => {
                setCountryType('nationality');
                setShow(true);
              }}
              editable={false}
              textInputIcon={Images.downArrow}
              disabled={true}
              onPress={() => {
                setCountryType('nationality');
                setShow(true);
              }}
              value={nationality}
              onChangeText={nationality => setNationality(nationality)}
              calenderIcon={Images.downArrow}
            />
          </View>
          <View style={styles.subContainerView}>
            <Text style={styles.lineText}>{strings.driLicense}</Text>
            <View style={styles.line} />
          </View>
          <TextInputPassenger
            placeholder={strings.driLicenseNo}
            TextInputLabel={strings.driLicenseNo}
            value={drivingLicenseNo}
            onChangeText={drivingLicenseNo =>
              setDrivingLicenseNo(drivingLicenseNo)
            }
          />
          <TextInputPassenger
            placeholder={strings.issueCountry}
            TextInputLabel={strings.issueCountry}
            onPressCountryPicker={() => {
              setCountryType('drivingLicenseIssueCountry');
              setShow(true);
            }}
            editable={false}
            textInputIcon={Images.downArrow}
            disabled={true}
            onPress={() => {
              setCountryType('drivingLicenseIssueCountry');
              setShow(true);
            }}
            value={drivingLicenseIssueCountry}
            onChangeText={drivingLicenseIssueCountry =>
              setDrivingLicenseIssueCountry(drivingLicenseIssueCountry)
            }
          />
          <View style={styles.subContainerView}>
            <TextInputPassenger
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
              editable={false}
              value={drivingLicenseIssueDate}
              onChangeText={drivingLicenseIssueDate =>
                setDrivingLicenseIssueDate(drivingLicenseIssueDate)
              }
              calenderIcon={Images.calender}
              disabled={true}
            />
            <TextInputPassenger
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
              editable={false}
              value={drivingLicenseExpiryDate}
              onChangeText={drivingLicenseExpiryDate =>
                setDrivingLicenseExpiryDate(drivingLicenseExpiryDate)
              }
              calenderIcon={Images.calender}
              disabled={true}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonViewStyle}>
        <OnBoardingSingleButton
          buttonText={mode == 'Edit' ? strings.edit : strings.save}
          buttonStyle={styles.buttonStyle}
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
            ? setCountryCode(item.flag + item.dial_code)
            : countryType == 'identityCardIssueCountry'
            ? setIdentityCardIssueCountry(item?.name?.en)
            : countryType == 'passportIssueCountry'
            ? setPassportIssueCountry(item?.name?.en)
            : countryType == 'nationality'
            ? setNationality(item?.name?.en)
            : setDrivingLicenseIssueCountry(item?.name?.en);
          setShow(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  cancelStyle: {
    height: hp(2),
    width: hp(2),
    resizeMode: 'contain',
    tintColor: color.white,
    marginTop: hp(0.5),
  },
  line: {
    flex: 1,
    borderWidth: 1,
    borderColor: color.Grey,
    marginHorizontal: wp(2),
    marginTop: hp(2),
    alignSelf: 'center',
  },

  buttonStyle: {
    marginTop: hp(2),
  },
  buttonViewStyle: {
    borderTopWidth: 1,
    borderColor: color.Grey,
    paddingBottom: hp(3),
  },
  lineText: {
    marginTop: hp(2),
    color: color.darkGray,
    fontSize: fontSize(16),
    fontWeight: '500',
  },
  subContainerView: {flexDirection: 'row'},
});

export default NewPassenger;
