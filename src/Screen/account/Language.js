import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';

import {CommonHeader} from '../../components';
import {color} from '../../helper/ColorConstant';
import {Images} from '../../helper/IconConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import {languageDummyJson} from '../../assets/DummyData/languageDummyJson';
import {languageChangeAction} from '../../redux/action/LanguageChangeAction';

const Language = ({navigation: {goBack}}) => {
  const [languageData, setLanguageData] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const dispatch = useDispatch();
  const strings = useSelector(state => state?.languageReducer?.languageObject);

  // const data = () => {
  //   console.log(languageDummyJson);
  //   const det = languageDummyJson?.data?.countries?.map(i =>
  //     i?.languages.map(e => {
  //       return {
  //         emoji: i?.emoji,
  //         language: `${e?.name} (${i?.name.slice(0, 3)})`,
  //       };
  //     }),
  //   );
  //   setLanguageData(det?.flat());
  // };

  // const getData = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage?.getItem('selected_Language');
  //     setSelectedLanguage(JSON?.parse(jsonValue));
  //   } catch (e) {
  //     console.log('e :>> ', e);
  //   }
  // };
  const getLanguage = async () => {
    try {
      const dd = await AsyncStorage?.getItem('selected_Language');
      setSelectedLanguage(dd == 'French' ? 'French' : 'English');
      // console.log(dd, 'log of lan async');
      // console.log(dd === 'French' ? 'French' : 'English');
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  const languageSelectionAsync = async item => {
    try {
      await AsyncStorage?.setItem('selected_Language', item);
      dispatch(languageChangeAction(item));
    } catch (error) {
      console.log('error :>> ', error);
    }
  };
  useEffect(() => {
    // data();
    // getData();
    getLanguage();
  }, [selectedLanguage]);
  return (
    <View style={styles.container}>
      <CommonHeader
        Images2={null}
        onPress1={true}
        onPress2={false}
        navigation2={() => {}}
        Images1={Images.backIcon}
        Images1Color={color.white}
        headerName={strings?.language}
        navigation1={() => {
          goBack();
        }}
      />
      <View>
        {/* <FlatList
          bounces={false}
          data={languageData}
          extraData={selectedLanguage}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={[
                  styles.flatListStyle,
                  {
                    borderColor:
                      selectedLanguage?.language == item?.language
                        ? color.commonBlue
                        : color.white,
                  },
                ]}
                onPress={() => {
                  setSelectedLanguage(item);
                  languageSelectionAsync(item);
                }}
                >
                <View style={styles.textViewStyle}>
                  <Text style={styles.textStyle}>{item?.emoji}</Text>
                  <Text
                    style={[
                      styles.textStyle,
                      {textAlign: 'center', color: color.black},
                    ]}
                    >
                    {item?.language}
                  </Text>
                </View>
                {selectedLanguage?.language == item?.language && (
                  <Image
                    source={Images.checkIcon}
                    style={{
                      width: hp(3),
                      height: hp(3),
                      tintColor: 'blue',
                      paddingStart: 'auto',
                    }}
                  />
                )}
              </TouchableOpacity>
            );
          }}
        /> */}
        <TouchableOpacity
          onPress={() => {
            setSelectedLanguage('English');
            languageSelectionAsync('English');
          }}
          style={[
            styles.flatListStyle,
            {
              borderColor:
                selectedLanguage == 'English' ? color.commonBlue : color.white,
            },
          ]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.textStyle}>🇬🇧</Text>
            <Text
              style={[
                styles.textStyle,
                {textAlign: 'center', color: color.black},
              ]}>
              English
            </Text>
          </View>
          {selectedLanguage == 'English' && (
            <Image
              source={Images.checkIcon}
              style={{
                width: hp(3),
                height: hp(3),
                tintColor: 'blue',
                paddingStart: 'auto',
              }}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedLanguage('French');
            languageSelectionAsync('French');
          }}
          style={[
            styles.flatListStyle,
            {
              borderColor:
                selectedLanguage == 'French' ? color.commonBlue : color.white,
            },
          ]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.textStyle}>🇫🇷</Text>
            <Text
              style={[
                styles.textStyle,
                {textAlign: 'center', color: color.black},
              ]}>
              Anglaise{`(French)`}
            </Text>
          </View>
          {selectedLanguage == 'French' && (
            <Image
              source={Images.checkIcon}
              style={{
                width: hp(3),
                height: hp(3),
                tintColor: 'blue',
                paddingStart: 'auto',
              }}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.grayLight,
  },
  flagIconStyle: {
    width: hp(6),
    height: hp(6),
  },
  flatListStyle: {
    borderWidth: 2,
    borderRadius: wp(2),
    flexDirection: 'row',
    marginVertical: hp(1),
    paddingVertical: hp(3),
    marginHorizontal: wp(6),
    paddingHorizontal: wp(4),
    backgroundColor: color.white,
    justifyContent: 'space-between',
  },
  textStyle: {
    paddingRight: wp(2),
    fontSize: fontSize(20),
  },
  textViewStyle: {
    flexDirection: 'row',
  },
});

export default Language;
