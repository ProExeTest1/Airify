import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {strings} from '../../helper/Strings';
import {Images} from '../../helper/IconConstant';
import {CommonHeader} from '../../components';
import {color} from '../../helper/ColorConstant';
import {languageDummyJson} from '../../assets/DummyData/languageDummyJson';
import {fontSize, hp, wp} from '../../helper/Constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Language = ({navigation: {goBack}, navigation}) => {
  const [selectedLanguage, setSelectedLanguage] = useState({});
  const [languageData, setLanguageData] = useState([]);

  useEffect(() => {
    data();
    getData();
  }, []);
  const data = () => {
    const det = languageDummyJson.data.countries.map(i =>
      i.languages.map(e => {
        return {
          emoji: i.emoji,
          language: e.name,
        };
      }),
    );
    setLanguageData(det.flat());
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('selected_Language');
      setSelectedLanguage(JSON.parse(jsonValue));
    } catch (e) {
      console.log('e :>> ', e);
    }
  };

  const languageSelectionAsync = async item => {
    try {
      await AsyncStorage.setItem('selected_Language', JSON.stringify(item));
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  return (
    <View style={styles.container}>
      <CommonHeader
        headerName={strings.language}
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
      <View>
        <FlatList
          extraData={selectedLanguage}
          bounces={false}
          showsVerticalScrollIndicator={false}
          data={languageData}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={[
                  styles.flatListStyle,
                  {
                    borderColor:
                      selectedLanguage?.emoji == item?.emoji
                        ? color.commonBlue
                        : color.white,
                  },
                ]}
                onPress={() => {
                  setSelectedLanguage(item);
                  languageSelectionAsync(item);
                }}>
                <View style={styles.textViewStyle}>
                  <Text style={styles.textStyle}>{item?.emoji}</Text>
                  <Text style={[styles.textStyle, {textAlign: 'center'}]}>
                    {item?.language}
                  </Text>
                </View>
                {selectedLanguage?.emoji == item?.emoji && (
                  <Image
                    source={Images.checkIcon}
                    style={{
                      height: hp(3),
                      width: hp(3),
                      tintColor: 'blue',
                      paddingStart: 'auto',
                    }}
                  />
                )}
              </TouchableOpacity>
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
    backgroundColor: color.grayLight,
  },
  flagIconStyle: {
    height: hp(6),
    width: hp(6),
  },
  flatListStyle: {
    borderRadius: wp(2),
    flexDirection: 'row',
    paddingVertical: hp(3),
    marginVertical: hp(1),
    marginHorizontal: wp(6),
    paddingHorizontal: wp(4),
    backgroundColor: color.white,
    borderWidth: 2,
    justifyContent: 'space-between',
  },
  textStyle: {
    fontSize: fontSize(20),
    paddingRight: wp(2),
  },
  textViewStyle: {
    flexDirection: 'row',
  },
});

export default Language;
