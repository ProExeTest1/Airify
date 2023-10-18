import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  Share,
} from 'react-native';
import {color} from '../../helper/ColorConstant';
import {CommonHeader} from '../../components';
import {strings} from '../../helper/Strings';
import {Images} from '../../helper/IconConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import auth from '@react-native-firebase/auth';

const SavedAddress = ({navigation: {goBack}, navigation}) => {
  const [addressData, setAddressData] = useState([]);
  useEffect(() => {
    SavedAddress();
  }, []);

  const userSelectedAddress = useSelector(
    address => address?.AddressData?.addressData,
  );
  const SavedAddress = async () => {
    await firestore()
      .collection('SavedUserAddress')
      .onSnapshot(querySnapshot => {
        const savedAddressData = [];
        querySnapshot.forEach(documentSnapshot => {
          savedAddressData.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        savedAddressData.map(item => {
          const tmp = item?.SavedUserAddress?.filter(i => {
            return i.Primary == true && i;
          });
          const tmp1 = item?.SavedUserAddress?.filter(i => {
            return i.Primary != true && i;
          });
          setAddressData(tmp?.concat(tmp1));
        });
      });
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: userSelectedAddress?.display_name,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const deleteAddress = async item => {
    const deleteData = await firestore()
      .collection('SavedUserAddress')
      .doc(auth().currentUser.uid)
      .get()
      .then(async i => {
        await firestore()
          .collection('SavedUserAddress')
          .doc(auth().currentUser.uid)
          .update({
            SavedUserAddress: i?.data()?.SavedUserAddress?.filter(d => {
              if (d?.ContactName != item?.ContactName) {
                return d;
              }
            }),
          });
      });
    Alert.alert('Address Deleted Successfully');
  };

  const setAsPrimary = async item => {
    const Primary = firestore()
      .collection('SavedUserAddress')
      .doc(auth().currentUser.uid)
      .get()
      .then(async i => {
        await firestore()
          .collection('SavedUserAddress')
          .doc(auth().currentUser.uid)
          .update({
            SavedUserAddress: i?.data()?.SavedUserAddress?.map(d => {
              if (d?.ContactName == item?.ContactName) {
                return {...d, Primary: !d?.Primary};
              }
              return d;
            }),
          });
      });
  };

  return (
    <View style={styles.container}>
      <CommonHeader
        headerName={strings.savedAddress}
        navigation1={() => {
          goBack();
        }}
        navigation2={() => {
          navigation.navigate('LocationSearch');
        }}
        onPress1={true}
        onPress2={true}
        Images1={Images.backIcon}
        Images2={Images.plus}
        cancelButtonStyle={styles.plusIconStyle}
        Images1Color={color.white}
      />
      <View style={styles.FlatListViewStyle}>
        <FlatList
          bounces={false}
          showsVerticalScrollIndicator={false}
          data={addressData}
          renderItem={({item, index}) => {
            return (
              <View style={styles.flatListInnerViewStyleL}>
                <View style={styles.cardViewHeaderStyle}>
                  <Text
                    style={[
                      styles.dataStyle,
                      {fontWeight: 'bold', paddingVertical: hp(0)},
                    ]}>
                    {item.Label}
                  </Text>
                  {item.Primary == true && (
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'flex-start',
                      }}>
                      <View style={styles.primaryTextStyle}>
                        <Text style={{color: color.commonBlue}}>
                          {strings.mainAddress}
                        </Text>
                      </View>
                    </View>
                  )}
                  <TouchableOpacity
                    onPress={() => {
                      onShare();
                    }}>
                    <Image
                      source={Images.shareIcon}
                      style={styles.shareIconStyle}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.cardViewStyle}>
                  <View style={styles.textStyle}>
                    <Text style={[styles.dataStyle, {fontWeight: 'bold'}]}>
                      {item.ContactName}
                    </Text>
                    <Text style={styles.dataStyle}> ({item.CountryCode})</Text>
                  </View>
                  <Text style={styles.dataStyle}>{item.Address}</Text>
                  <Text style={[styles.dataStyle, {fontSize: fontSize(14)}]}>
                    {strings.pinpoint}
                  </Text>
                </View>
                <View style={styles.buttonViewStyle}>
                  <TouchableOpacity
                    style={[styles.ChangeAddressButtonStyle, {flex: 1}]}
                    onPress={() => {
                      navigation.navigate('LocationSearch', {
                        mode: 'Edit',
                        data: item,
                      });
                    }}>
                    <Text style={styles.ChangeAddressButtonTextStyle}>
                      {strings.changeAddress}
                    </Text>
                  </TouchableOpacity>
                  {item.Primary != true && (
                    <Menu>
                      <MenuTrigger>
                        <View
                          style={[
                            styles.ChangeAddressButtonStyle,
                            {
                              marginLeft: wp(2),
                              paddingVertical: hp(0.6),
                              paddingHorizontal: wp(2),
                            },
                          ]}>
                          <Image
                            style={styles.BackImg}
                            source={Images.menuIcon}
                          />
                        </View>
                      </MenuTrigger>
                      <MenuOptions style={styles.dropdownBody}>
                        <MenuOption onSelect={() => setAsPrimary(item)}>
                          <View
                            style={[
                              styles.dropdownList,
                              {borderBottomWidth: 2, borderColor: '#e2e2e2'},
                            ]}>
                            <Image
                              style={[
                                styles.dropdownIcon,
                                {tintColor: color.black},
                              ]}
                              source={Images.location}
                            />
                            <Text style={styles.dropdownText}>
                              {strings.setPrimary}
                            </Text>
                          </View>
                        </MenuOption>
                        <MenuOption onSelect={() => deleteAddress(item)}>
                          <View style={styles.dropdownList}>
                            <Image
                              style={styles.dropdownIcon}
                              source={Images.delete}
                            />
                            <Text
                              style={[styles.dropdownText, {color: color.red}]}>
                              {strings.deleteAddress}
                            </Text>
                          </View>
                        </MenuOption>
                      </MenuOptions>
                    </Menu>
                  )}
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.Grey,
  },
  plusIconStyle: {
    height: hp(2.5),
    width: hp(2.5),
    resizeMode: 'contain',
  },
  buttonStyle: {
    backgroundColor: color.white,
    borderWidth: 1,
    borderColor: color.commonBlue,
    marginBottom: hp(2),
    flex: 1,
  },
  buttonTextStyle: {
    color: color.commonBlue,
  },
  FlatListViewStyle: {flex: 1, paddingVertical: hp(1)},
  flatListInnerViewStyleL: {
    backgroundColor: color.white,
    marginVertical: hp(1),
    marginHorizontal: wp(6),
    borderRadius: wp(2),
    paddingHorizontal: wp(4),
  },
  cardViewHeaderStyle: {
    paddingVertical: hp(1),
    borderBottomWidth: 1,
    borderColor: color.lightGray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardViewStyle: {
    paddingTop: hp(1),
    paddingBottom: hp(1),
    borderColor: color.lightGray,
  },
  shareIconStyle: {height: hp(3), width: hp(3), resizeMode: 'contain'},
  primaryTextStyle: {
    borderColor: color.commonBlue,
    borderRadius: wp(1),
    borderWidth: 1,
    alignItems: 'center',
    paddingHorizontal: wp(2),
    marginHorizontal: wp(4),
    paddingVertical: hp(0.5),
  },
  dataStyle: {
    paddingVertical: hp(1),
    fontSize: fontSize(16),
  },
  textStyle: {
    flexDirection: 'row',
  },
  buttonViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: hp(2),
    paddingTop: hp(1),
    marginHorizontal: wp(2),
    justifyContent: 'space-between',
  },
  ChangeAddressButtonStyle: {
    paddingVertical: hp(1.5),
    borderWidth: 1,
    borderColor: color.commonBlue,
    borderRadius: wp(2),
    paddingHorizontal: wp(4),
  },
  ChangeAddressButtonTextStyle: {
    color: color.commonBlue,
    textAlign: 'center',
  },
  optionViewStyle: {
    backgroundColor: color.black,
    paddingVertical: hp(1),
    position: 'absolute',
    flexDirection: 'row',
    flex: 1,
    alignSelf: 'flex-end',
    bottom: -25,
    right: wp(4),
    zIndex: 1,
  },
  dropdownBody: {
    position: 'absolute',
    backgroundColor: color.white,
    top: wp(12),
    borderRadius: 10,
    width: wp(65),
    right: 0,
  },
  dropdownList: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.5),
    paddingStart: wp(3),
  },
  dropdownIcon: {
    height: wp(6.5),
    width: wp(6.5),
    marginEnd: wp(4),
  },
  dropdownText: {
    fontSize: fontSize(18),
    fontWeight: '500',
  },
  BackImg: {
    height: wp(8),
    width: wp(8),
    tintColor: color.commonBlue,
  },
});

export default SavedAddress;
