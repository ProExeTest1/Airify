import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Alert,
} from 'react-native';

import moment from 'moment';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {RadioButton} from 'react-native-radio-buttons-group';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {CountryPicker} from 'react-native-country-codes-picker';
import firestore, {firebase} from '@react-native-firebase/firestore';

import {strings} from '../../helper/Strings';
import {CommonHeader} from '../../components';
import {Images} from '../../helper/IconConstant';
import {color} from '../../helper/ColorConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import ImagePickerData from '../../components/ImagePickerData';
import {genderRatioButton} from '../../assets/DummyData/radioButtons';
import OnBoardingTextInput from '../../components/OnBoardingTextInput';
import CountryPickTextInput from '../../components/CountryPickTextInput';
import OnBoardingSingleButton from '../../components/OnBoardingSingleButton';

const PersonalInfo = ({navigation: {goBack}, navigation}) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [Email, setEmail] = useState('');
  const [show, setShow] = useState(false);
  const [address, setAddress] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [passport, setPassport] = useState('');
  const [countryName, setCountryName] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [datePicker, setDatePicker] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [pickerResponse, setPickerResponse] = useState('');
  const [showCountryName, setShowCountryName] = useState(false);

  useEffect(() => {
    // update();
  });

  const update = async () => {
    console.log('Email :>> ', Email);
    try {
      await firebase.auth().currentUser.updateEmail(Email);
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  const handleSignUp = async () => {
    try {
      const uploadStorage = pickerResponse;
      const filename = Date.now();
      const task = storage()
        .ref(`/PersonalInfo/${auth().currentUser.uid}/${filename}`)
        .putFile(uploadStorage);
      try {
        await task;
        Alert.alert('Image uploaded', 'Image uploaded successfully');
      } catch (error) {
        console.log(error);
      }
      const url = await storage()
        .ref(`/PersonalInfo/${auth().currentUser.uid}/${filename}`)
        .getDownloadURL()
        .catch(err => {
          console.log('error in download', err);
        });

      await firestore().collection('Users').doc(auth().currentUser.uid).update({
        Name: name,
        Email: Email,
        profileImageURL: url,
        id: filename,
        PhoneNumber: phoneNo,
        BirthDate: date,
      });

      await firestore()
        .collection('PersonalInfo')
        .doc(auth().currentUser.uid)
        .set({
          Name: name,
          Email: Email,
          profileImageURL: url,
          id: filename,
          uid: auth().currentUser.uid,
          PhoneNumber: phoneNo,
          BirthDate: date,
          Gender: selectedData,
          passport: passport,
          country: countryName,
          address: address,
        });
    } catch (error) {
      console.log(error);
    }
    setPickerResponse(null);
  };

  return (
    <View style={styles.container}>
      <CommonHeader
        headerName={strings.personalInfo}
        navigation1={() => {
          goBack();
        }}
        navigation2={() => {}}
        onPress1={true}
        onPress2={false}
        Images1={Images.backIcon}
        Images2={null}
        Images1Color={color.white}
      />

      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
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
          <Text style={styles.textInputTitleStyle}>{strings.EmailText}</Text>
          <OnBoardingTextInput
            textInputIcon={Images.Email}
            textInputPlaceholder={strings.EmailText}
            container={styles.textInputContainer}
            value={Email}
            onChangeText={email => setEmail(email)}
            keyboardType={'email-address'}
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
          <Text style={styles.textInputTitleStyle}>{strings.gender}</Text>
          <View style={styles.genderRadioButtonViewStyle}>
            <FlatList
              horizontal
              data={genderRatioButton}
              renderItem={({item, index}) => (
                <View style={{paddingVertical: hp(1)}}>
                  <RadioButton
                    size={20}
                    key={item.id}
                    label={item.label}
                    color={color.black}
                    onPress={() => setSelectedData(item)}
                    selected={item.id === selectedData?.id}
                    labelStyle={{fontSize: fontSize(14), fontWeight: '400'}}
                  />
                </View>
              )}
            />
          </View>

          <Text style={styles.textInputTitleStyle}>{strings.country}</Text>
          <CountryPickTextInput
            value={countryName}
            onChangeText={country => setCountryName(country)}
            placeholder={strings.country}
            onPress1={() => {
              setShowCountryName(true);
            }}
            countryCode={countryCode}
          />
          <Text style={styles.textInputTitleStyle}>{strings.address}</Text>
          <OnBoardingTextInput
            keyboardType={'default'}
            value={address}
            container={styles.textInputContainer}
            textInputPlaceholder={strings.address}
            onChangeText={address => setAddress(address)}
          />
          <Text style={styles.textInputTitleStyle}>{strings.passport}</Text>
          <OnBoardingTextInput
            value={passport}
            keyboardType={'default'}
            container={styles.textInputContainer}
            textInputPlaceholder={strings.passport}
            onChangeText={passport => setPassport(passport)}
          />
        </View>
        <DateTimePicker
          mode="date"
          isVisible={datePicker}
          onConfirm={date => {
            setDatePicker(false);
            setDate(moment(date).format('DD MMM YYYY'));
          }}
          onCancel={() => {
            setDatePicker(false);
          }}
        />
        <CountryPicker
          show={show ? show : showCountryName}
          pickerButtonOnPress={item => {
            setShow(false);
            setCountryCode(item.flag);
            setShowCountryName(false);
            setCountryName(item?.name?.en);
          }}
        />
        <OnBoardingSingleButton
          buttonText={strings.save}
          buttonStyle={styles.buttonStyle}
          onPress={() => {
            handleSignUp();
            // update();
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
  textInputTitleStyle: {
    marginLeft: wp(6),
    color: color.black,
  },
  textInputContainer: {
    marginTop: hp(1),
  },
  buttonStyle: {
    height: hp(6),
    marginVertical: hp(6),
  },
  genderRadioButtonViewStyle: {
    paddingHorizontal: wp(4),
  },
});
// jenislukhi2131@gmail.com

export default PersonalInfo;
