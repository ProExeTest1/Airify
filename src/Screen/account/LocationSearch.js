import React, {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Platform, Image} from 'react-native';
import {color} from '../../helper/ColorConstant';
import CommonHeader from '../../components/Common/CommonHeader';
import {strings} from '../../helper/Strings';
import {Images} from '../../helper/IconConstant';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {fontSize, hp, wp} from '../../helper/Constant';
import {useDispatch, useSelector} from 'react-redux';
import {addressData} from '../../redux/action/AddressAction';
import OnBoardingSingleButton from '../../components/OnBoardingSingleButton';

const LocationSearch = ({navigation: {goBack}, navigation}) => {
  const [lat, setLat] = useState(lat ? lat : 21.204999014301976);
  const [lng, setLng] = useState(lng ? lng : 72.84880445413961);
  useEffect(() => {
    fetchDataDetail(lat, lng);
  }, [lat, lng]);
  const dispatch = useDispatch();
  const userSelectedAddress = useSelector(
    address => address?.AddressData?.addressData,
  );
  const fetchDataDetail = (lat, lng) => {
    if (lat != '' && lng != '') {
      fetch(
        `https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}`,
        // `https://geocode.maps.co/reverse?lat=3.1073767500000002&lon=101.69093242846053`, // API for get address
        {
          method: 'GET',
        },
      )
        .then(responseData => responseData.json())
        .then(responseJson => {
          dispatch(addressData(responseJson));
        })
        .catch(err => {
          console.error('Error for fetch data', err);
        });
    }
  };

  return (
    <View style={styles.container}>
      <CommonHeader
        headerName={strings.addNewAddress}
        navigation1={() => {
          goBack();
        }}
        navigation2={() => {
          navigation.navigate('AddAddress');
        }}
        onPress1={true}
        onPress2={true}
        Images1={Images.backIcon}
        Images2={Images.loupe}
        cancelButtonStyle={styles.plusIconStyle}
      />

      <MapView
        style={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          flex: 1,
        }}
        region={{
          latitude: 21.204999014301976,
          longitude: 72.84880445413961,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}>
        <Marker
          coordinate={{
            latitude: lat || 21.204999014301976,
            longitude: lng || 72.84880445413961,
          }}
          title="Test"
          description="This is for test"
          onDrag={d => {
            setLat(d?.nativeEvent?.coordinate?.latitude);
            setLng(d?.nativeEvent?.coordinate?.longitude);
          }}
          draggable={true}
        />
      </MapView>
      <View style={styles.addressDisplayView}>
        <Text style={styles.CityStyle}>
          {userSelectedAddress?.address?.city}
        </Text>
        <Text
          style={[
            styles.CityStyle,
            {fontSize: fontSize(14), fontWeight: '500'},
          ]}>
          {userSelectedAddress?.display_name}
        </Text>
        <OnBoardingSingleButton buttonText={strings.addButton} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  plusIconStyle: {
    tintColor: color.white,
  },
  addressDisplayView: {
    backgroundColor: color.white,
    borderTopRightRadius: wp(4),
    borderTopLeftRadius: wp(4),
    position: 'absolute',
    width: wp(100),
    paddingBottom: hp(4),
    bottom: 0,
    paddingHorizontal: wp(8),
    paddingVertical: hp(4),
  },
  CityStyle: {
    fontWeight: 'bold',
    fontSize: fontSize(18),
    marginBottom: hp(2),
  },
});

export default LocationSearch;
