import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import ToggleSwitch from 'toggle-switch-react-native';
import firestore from '@react-native-firebase/firestore';

import {strings} from '../../helper/Strings';
import {CommonHeader} from '../../components';
import {color} from '../../helper/ColorConstant';
import {Images} from '../../helper/IconConstant';
import {fontSize, hp, wp} from '../../helper/Constant';

const Security = ({navigation: {goBack}}) => {
  const [securityData, setSecurityData] = useState([]);

  useEffect(() => {
    SecurityData();
  }, [securityData]);

  const SecurityData = async () => {
    try {
      const securityList = await firestore()
        .collection('Users')
        .doc(auth().currentUser.uid)
        .get();
      setSecurityData(securityList?.data()?.SecurityData);
    } catch (error) {
      console.log('error :>> ', error);
    }
  };
  return (
    <View style={styles.container}>
      <CommonHeader
        Images2={null}
        onPress1={true}
        onPress2={false}
        navigation2={() => {}}
        Images1={Images.backIcon}
        Images1Color={color.white}
        headerName={strings.security}
        navigation1={() => {
          goBack();
        }}
      />
      <View style={styles.flatListBodyViewStyle}>
        <FlatList
          bounces={false}
          data={securityData}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <View style={styles.FlatListView}>
                <Text style={styles.titleStyle}>{item.title}</Text>
                {item.title == 'Device Management' ? (
                  <TouchableOpacity>
                    <Image
                      resizeMode="contain"
                      source={Images.forward}
                      style={styles.forwardIconStyle}
                    />
                  </TouchableOpacity>
                ) : (
                  <ToggleSwitch
                    size="medium"
                    isOn={item?.isOn}
                    onColor={color.commonBlue}
                    onToggle={async () => {
                      await firestore()
                        .collection('Users')
                        .doc(auth().currentUser.uid)
                        .update({
                          SecurityData: securityData.map(i => {
                            if (i.id === item.id) {
                              i.isOn = !i.isOn;
                              return i;
                            }
                            return i;
                          }),
                        });
                    }}
                  />
                )}
              </View>
            );
          }}
        />

        <TouchableOpacity style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>{strings.changePassword}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  FlatListView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(2),
  },
  titleStyle: {
    flex: 1,
    fontWeight: '500',
    fontSize: fontSize(18),
    color: color.black,
  },
  flatListBodyViewStyle: {
    paddingHorizontal: wp(4),
  },
  forwardIconStyle: {
    width: hp(3),
    height: wp(3),
    resizeMode: 'contain',
  },
  buttonStyle: {
    backgroundColor: color.white,
    borderWidth: 2,
    borderRadius: wp(2),
    paddingVertical: hp(2),
    marginHorizontal: wp(2),
    borderColor: color.commonBlue,
  },
  buttonTextStyle: {
    fontWeight: '500',
    textAlign: 'center',
    fontSize: fontSize(16),
    color: color.commonBlue,
  },
});

export default Security;
