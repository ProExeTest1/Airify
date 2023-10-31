import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';
import {View, Text, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {strings} from '../../helper/Strings';
import {Images} from '../../helper/IconConstant';
import {color} from '../../helper/ColorConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import {addressData} from '../../redux/action/AddressAction';
import {CommonHeader, OnBoardingSingleButton} from '../../components';

const LocationSearch = ({navigation: {goBack}, navigation}) => {
  const [lat, setLat] = useState(lat ? lat : 37.78825);
  const [lng, setLng] = useState(lng ? lng : -122.4324);

  useEffect(() => {
    fetchDataDetail(lat, lng);
  }, [lat, lng]);

  const dispatch = useDispatch();

  const userSelectedAddress = useSelector(
    address => address?.AddressData?.addressData,
  );

  const route = useRoute();
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
        onPress1={true}
        onPress2={true}
        Images2={Images.loupe}
        Images1={Images.backIcon}
        Images1Color={color.white}
        headerName={strings.addNewAddress}
        navigation1={() => {
          goBack();
        }}
        cancelButtonStyle={styles.plusIconStyle}
      />
      <MapView
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
        region={{
          latitude: 37.78825,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
          longitude: -122.4324,
        }}>
        <Marker
          coordinate={{
            latitude: lat || 37.78825,
            longitude: lng || -122.4324,
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
        <OnBoardingSingleButton
          buttonText={strings.addButton}
          onPress={() => {
            navigation.navigate('AddAddress', {
              data: route?.params,
            });
          }}
        />
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
    bottom: 0,
    width: wp(100),
    position: 'absolute',
    paddingBottom: hp(4),
    paddingVertical: hp(4),
    paddingHorizontal: wp(8),
    borderTopLeftRadius: wp(4),
    borderTopRightRadius: wp(4),
    backgroundColor: color.white,
  },
  CityStyle: {
    fontWeight: 'bold',
    marginBottom: hp(2),
    fontSize: fontSize(18),
  },
});

export default LocationSearch;
