import React, {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {CommonHeader} from '../../components';
import {strings} from '../../helper/Strings';
import {Images} from '../../helper/IconConstant';
import {color} from '../../helper/ColorConstant';
import {hp, wp} from '../../helper/Constant';
import {useSelector} from 'react-redux';
import OnBoardingTextInput from '../../components/OnBoardingTextInput';
import CountryPickTextInput from '../../components/CountryPickTextInput';
import DatePickerTextInput from '../../components/AccountComponent/DatePickerTextInput';
import CheckButton from '../../components/CheckButton';
import OnBoardingSingleButton from '../../components/OnBoardingSingleButton';
import {CountryPicker} from 'react-native-country-codes-picker';
import firestore, {firebase} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useRoute} from '@react-navigation/native';

const AddAddress = ({navigation: {goBack}, navigation}) => {
  const [checked, setChecked] = useState(false);
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('');
  const [addressLabel, setAddressLabel] = useState('');
  const [note, setNote] = useState('');
  const [contactName, setContactName] = useState('');

  const userSelectedAddress = useSelector(
    address => address?.AddressData?.addressData,
  );

  useEffect(() => {
    if (route?.params?.mode == 'Edit') {
      setAddressData();
    }
  }, []);
  const route = useRoute();

  const setAddressData = async () => {
    setAddressLabel(route?.params?.data?.Label);
    setNote(route?.params?.data?.Note);
    setContactName(route?.params?.data?.ContactName);
    setCountryCode(route?.params?.data?.CountryCode);
    setChecked(route?.params?.data?.Primary);
  };
  const addressDetails = async () => {
    const pd = await firestore()
      .collection('SavedUserAddress')
      .doc(auth().currentUser.uid)
      .get()
      .then(async d => {
        if (
          d?.data()?.SavedUserAddress?.length === 0 ||
          d
            ?.data()
            ?.SavedUserAddress?.some(item => item?.ContactName !== contactName)
        ) {
          await firestore()
            .collection('SavedUserAddress')
            .doc(auth().currentUser.uid)
            .set({
              SavedUserAddress: [
                ...d.data().SavedUserAddress,
                {
                  Address: userSelectedAddress?.display_name,
                  ContactName: contactName,
                  Label: addressLabel,
                  CountryCode: countryCode,
                  Primary: checked,
                  Note: note,
                },
              ],
            });
          navigation.navigate('SavedAddress');
        } else {
          alert('Address is already exits');
        }
      });

    // await firestore()
    //   .collection('SavedUserAddress')
    //   .doc(auth().currentUser.uid)
    //   .set({
    //     SavedUserAddress: [],
    //   });
  };
  const changeAddress = async () => {
    const tmp = await firestore()
      .collection('SavedUserAddress')
      .doc(auth().currentUser.uid)
      .get()
      .then(async item => {
        await firestore()
          .collection('SavedUserAddress')
          .doc(auth().currentUser.uid)
          .update({
            SavedUserAddress: item?.data()?.SavedUserAddress?.map(i => {
              if (i.ContactName == route?.params?.data?.ContactName) {
                return {
                  Address: userSelectedAddress?.display_name,
                  ContactName: contactName,
                  Label: addressLabel,
                  CountryCode: countryCode,
                  Primary: checked,
                  Note: note,
                };
              }
              return i;
            }),
          });
      });
    navigation.navigate('SavedAddress');
  };
  return (
    <View style={styles.container}>
      <CommonHeader
        headerName={
          route.params.mode == 'Edit'
            ? strings.changeAddress
            : strings.addressDetail
        }
        navigation1={() => {
          navigation.navigate('LocationSearch');
        }}
        onPress1={true}
        onPress2={false}
        Images1={Images.cancel}
        Images2={null}
        cancelButtonStyle1={styles.plusIconStyle}
        Images1Color={color.white}
      />
      <View style={styles.mainViewStyle}>
        <View style={styles.locationViewStyle}>
          <Image source={Images.location} style={styles.locationIconStyle} />
          <Text>{userSelectedAddress?.display_name}</Text>
        </View>
        <Text style={styles.textInputTitleStyle}>{strings.addressLabel}</Text>
        <OnBoardingTextInput
          textInputPlaceholder={strings.addressLabel}
          container={styles.textInputContainer}
          value={addressLabel}
          onChangeText={addressLabel => setAddressLabel(addressLabel)}
        />
        <Text style={styles.textInputTitleStyle}>{strings.note}</Text>
        <OnBoardingTextInput
          textInputPlaceholder={strings.note}
          container={styles.textInputContainer}
          value={note}
          onChangeText={note => setNote(note)}
        />
        <Text style={styles.textInputTitleStyle}>{strings.contactName}</Text>
        <OnBoardingTextInput
          textInputPlaceholder={strings.contactName}
          container={styles.textInputContainer}
          value={contactName}
          onChangeText={contactName => setContactName(contactName)}
        />
        <Text style={styles.textInputTitleStyle}>{strings.ContactPhoneNo}</Text>
        <DatePickerTextInput
          textInputIcon={Images.downArrow}
          textInputPlaceholder={strings.ContactPhoneNo}
          textInputStyle={styles.textInputStyle}
          onPress={() => {
            setShow(true);
          }}
          value={countryCode}
          onChangeText={countryCode => setCountryCode(countryCode)}
          keyboardType={'phone-pad'}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <CheckButton
            check={checked}
            onPress={() => {
              setChecked(!checked);
            }}
          />
          <Text style={styles.checkBoxStyle}>{strings.setPrimary}</Text>
        </View>
        <View style={styles.buttonViewStyle}>
          <OnBoardingSingleButton
            buttonText={
              route.params.mode == 'Edit' ? strings.changeAddress : strings.save
            }
            buttonStyle={styles.buttonStyle}
            onPress={() => {
              route.params.mode == 'Edit' ? changeAddress() : addressDetails();
            }}
          />
        </View>
      </View>
      <CountryPicker
        show={show}
        pickerButtonOnPress={item => {
          setCountryCode(item.flag + item.dial_code);
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
  plusIconStyle: {
    height: hp(2.5),
    width: hp(2.5),
    resizeMode: 'contain',
    marginTop: hp(0.5),
  },
  mainViewStyle: {
    backgroundColor: color.white,
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    flex: 1,
  },
  locationViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(1),
  },
  locationIconStyle: {
    tintColor: color.commonBlue,
    height: hp(5),
    width: wp(5),
    resizeMode: 'contain',
    marginRight: wp(1),
  },
  textInputContainer: {marginTop: hp(1)},
  textInputTitleStyle: {
    marginHorizontal: wp(2),
    color: color.black,
    marginTop: hp(2),
    fontWeight: '600',
  },
  textInputCountryPicker: {
    color: color.black,
    height: hp(10),
  },
  buttonStyle: {
    marginVertical: hp(4),
  },
  buttonViewStyle: {
    flex: 1,
    marginTop: hp(14),
    borderTopWidth: 2,
    borderColor: color.grayLight,
    justifyContent: 'flex-end',
  },
  checkBoxStyle: {marginLeft: wp(2), color: color.black, fontWeight: '500'},
});

export default AddAddress;
