import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {color} from '../../helper/ColorConstant';
import {CommonHeader} from '../../components';
import {strings} from '../../helper/Strings';
import {Images} from '../../helper/IconConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import {addressData} from '../../assets/DummyData/Data';
import OnBoardingSingleButton from '../../components/OnBoardingSingleButton';

const SavedAddress = ({navigation: {goBack}, navigation}) => {
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
                    {item.label}
                  </Text>
                  {index == 0 && (
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'flex-start',
                      }}>
                      <View style={styles.primaryTextStyle}>
                        <Text style={{color: color.commonBlue}}>
                          {item.label}
                        </Text>
                      </View>
                    </View>
                  )}
                  <TouchableOpacity>
                    <Image
                      source={Images.shareIcon}
                      style={styles.shareIconStyle}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.cardViewStyle}>
                  <View style={styles.textStyle}>
                    <Text style={[styles.dataStyle, {fontWeight: 'bold'}]}>
                      {item.contactName}
                    </Text>
                    <Text style={styles.dataStyle}> (+91 {item.Phone})</Text>
                  </View>
                  <Text style={styles.dataStyle}>{item.address}</Text>
                  <Text style={[styles.dataStyle, {fontSize: fontSize(14)}]}>
                    Pinpoint already
                  </Text>
                </View>
                <View style={styles.buttonViewStyle}>
                  <TouchableOpacity
                    style={[styles.ChangeAddressButtonStyle, {flex: 1}]}>
                    <Text style={styles.ChangeAddressButtonTextStyle}>
                      {strings.changeAddress}
                    </Text>
                  </TouchableOpacity>
                  {index != 0 && (
                    <TouchableOpacity
                      style={[
                        styles.ChangeAddressButtonStyle,
                        {marginLeft: wp(2)},
                      ]}>
                      <Image
                        source={Images.more}
                        style={styles.buttonIconStyle}
                      />
                    </TouchableOpacity>
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
  buttonIconStyle: {
    height: hp(2),
    width: hp(2),
    resizeMode: 'contain',
    tintColor: color.commonBlue,
  },
});

export default SavedAddress;
