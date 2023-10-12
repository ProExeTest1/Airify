import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {CommonHeader} from '../../components';
import {color} from '../../helper/ColorConstant';
import {strings} from '../../helper/Strings';
import {Images} from '../../helper/IconConstant';
import ToggleSwitch from 'toggle-switch-react-native';
import {fontSize, hp, wp} from '../../helper/Constant';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Security = ({navigation: {goBack}, navigation}) => {
  const [securityData, setSecurityData] = useState([]);
  useEffect(() => {
    SecurityData();
  }, []);

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
        headerName={strings.security}
        navigation1={() => {
          goBack();
        }}
        navigation2={() => {}}
        onPress1={true}
        onPress2={false}
        Images1={Images.backIcon}
        Images2={null}
      />
      <View style={styles.flatListBodyViewStyle}>
        <FlatList
          showsVerticalScrollIndicator={false}
          bounces={false}
          data={securityData}
          renderItem={({item}) => {
            return (
              <View style={styles.FlatListView}>
                <Text style={styles.titleStyle}>{item.title}</Text>
                {item.title == 'Device MAnagement' ? (
                  <TouchableOpacity>
                    <Image
                      source={Images.forward}
                      style={styles.forwardIconStyle}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                ) : (
                  <ToggleSwitch
                    isOn={item?.isOn}
                    size="medium"
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
    paddingVertical: hp(2),
    alignItems: 'center',
  },
  titleStyle: {
    flex: 1,
    fontSize: fontSize(18),
    fontWeight: '500',
  },
  flatListBodyViewStyle: {
    paddingHorizontal: wp(4),
  },
  forwardIconStyle: {
    height: wp(3),
    width: hp(3),
    resizeMode: 'contain',
  },
  buttonStyle: {
    backgroundColor: color.white,
    borderWidth: 2,
    borderColor: color.commonBlue,
    paddingVertical: hp(2),
    marginHorizontal: wp(2),
    borderRadius: wp(2),
  },
  buttonTextStyle: {
    textAlign: 'center',
    color: color.commonBlue,
    fontSize: fontSize(16),
    fontWeight: '500',
  },
});

export default Security;
