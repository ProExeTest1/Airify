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

import {strings} from '../../helper/Strings';
import {CommonHeader} from '../../components';
import {color} from '../../helper/ColorConstant';
import {Images} from '../../helper/IconConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import {languageDummyJson} from '../../assets/DummyData/languageDummyJson';

const Language = ({navigation: {goBack}}) => {
  const [languageData, setLanguageData] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState({});

  useEffect(() => {
    data();
    getData();
  }, []);

  const data = () => {
    console.log(languageDummyJson);
    const det = languageDummyJson?.data?.countries?.map(i =>
      i?.languages.map(e => {
        return {
          emoji: i?.emoji,
          language: `${e?.name} (${i?.name.slice(0, 3)})`,
        };
      }),
    );
    setLanguageData(det?.flat());
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage?.getItem('selected_Language');
      setSelectedLanguage(JSON?.parse(jsonValue));
    } catch (e) {
      console.log('e :>> ', e);
    }
  };

  const languageSelectionAsync = async item => {
    try {
      await AsyncStorage?.setItem('selected_Language', JSON.stringify(item));
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
        headerName={strings.language}
        navigation1={() => {
          goBack();
        }}
      />
      <View>
        <FlatList
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
                }}>
                <View style={styles.textViewStyle}>
                  <Text style={styles.textStyle}>{item?.emoji}</Text>
                  <Text
                    style={[
                      styles.textStyle,
                      {textAlign: 'center', color: color.black},
                    ]}>
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
