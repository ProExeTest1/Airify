import {useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {View, Text, StyleSheet, Image} from 'react-native';
import {CountryPicker} from 'react-native-country-codes-picker';

import {strings} from '../../helper/Strings';
import {hp, wp} from '../../helper/Constant';
import {CommonHeader} from '../../components';
import {Images} from '../../helper/IconConstant';
import {color} from '../../helper/ColorConstant';
import CheckButton from '../../components/CheckButton';
import OnBoardingTextInput from '../../components/OnBoardingTextInput';
import OnBoardingSingleButton from '../../components/OnBoardingSingleButton';
import DatePickerTextInput from '../../components/AccountComponent/DatePickerTextInput';

const AddAddress = ({navigation}) => {
  const route = useRoute();
  const [note, setNote] = useState('');
  const [show, setShow] = useState(false);
  const [checked, setChecked] = useState(false);
  const [countryCode, setCountryCode] = useState('');
  const [contactName, setContactName] = useState('');
  const [addressLabel, setAddressLabel] = useState('');

  const userSelectedAddress = useSelector(
    address => address?.AddressData?.addressData,
  );

  useEffect(() => {
    if (route?.params?.mode == 'Edit') {
      setAddressData();
    }
  }, []);

  const setAddressData = async () => {
    setNote(route?.params?.data?.Note);
    setChecked(route?.params?.data?.Primary);
    setAddressLabel(route?.params?.data?.Label);
    setContactName(route?.params?.data?.ContactName);
    setCountryCode(route?.params?.data?.CountryCode);
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
                  Note: note,
                  Primary: checked,
                  Label: addressLabel,
                  ContactName: contactName,
                  CountryCode: countryCode,
                  Address: userSelectedAddress?.display_name,
                },
              ],
            });
          navigation.navigate('SavedAddress');
        } else {
          alert('Address is already exits');
        }
      });
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
                  Note: note,
                  Primary: checked,
                  Label: addressLabel,
                  ContactName: contactName,
                  CountryCode: countryCode,
                  Address: userSelectedAddress?.display_name,
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
        Images2={null}
        onPress1={true}
        onPress2={false}
        Images1={Images.cancel}
        Images1Color={color.white}
        cancelButtonStyle1={styles.plusIconStyle}
      />
      <View style={styles.mainViewStyle}>
        <View style={styles.locationViewStyle}>
          <Image source={Images.location} style={styles.locationIconStyle} />
          <Text>{userSelectedAddress?.display_name}</Text>
        </View>
        <Text style={styles.textInputTitleStyle}>{strings.addressLabel}</Text>
        <OnBoardingTextInput
          value={addressLabel}
          container={styles.textInputContainer}
          textInputPlaceholder={strings.addressLabel}
          onChangeText={addressLabel => setAddressLabel(addressLabel)}
        />
        <Text style={styles.textInputTitleStyle}>{strings.note}</Text>
        <OnBoardingTextInput
          value={note}
          textInputPlaceholder={strings.note}
          onChangeText={note => setNote(note)}
          container={styles.textInputContainer}
        />
        <Text style={styles.textInputTitleStyle}>{strings.contactName}</Text>
        <OnBoardingTextInput
          value={contactName}
          container={styles.textInputContainer}
          textInputPlaceholder={strings.contactName}
          onChangeText={contactName => setContactName(contactName)}
        />
        <Text style={styles.textInputTitleStyle}>{strings.ContactPhoneNo}</Text>
        <DatePickerTextInput
          value={countryCode}
          keyboardType={'phone-pad'}
          textInputIcon={Images.downArrow}
          textInputStyle={styles.textInputStyle}
          textInputPlaceholder={strings.ContactPhoneNo}
          onPress={() => {
            setShow(true);
          }}
          onChangeText={countryCode => setCountryCode(countryCode)}
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
    width: hp(2.5),
    height: hp(2.5),
    marginTop: hp(0.5),
    resizeMode: 'contain',
  },
  mainViewStyle: {
    flex: 1,
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
    backgroundColor: color.white,
  },
  locationViewStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: wp(1),
  },
  locationIconStyle: {
    width: wp(5),
    height: hp(5),
    marginRight: wp(1),
    resizeMode: 'contain',
    tintColor: color.commonBlue,
  },
  textInputContainer: {marginTop: hp(1)},
  textInputTitleStyle: {
    marginTop: hp(2),
    fontWeight: '600',
    color: color.black,
    marginHorizontal: wp(2),
  },
  textInputCountryPicker: {
    height: hp(10),
    color: color.black,
  },
  buttonStyle: {
    marginVertical: hp(4),
  },
  buttonViewStyle: {
    flex: 1,
    borderTopWidth: 2,
    marginTop: hp(14),
    justifyContent: 'flex-end',
    borderColor: color.grayLight,
  },
  checkBoxStyle: {marginLeft: wp(2), color: color.black, fontWeight: '500'},
});

export default AddAddress;
