import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {color} from '../helper/ColorConstant';
import {FaqData} from '../assets/DummyData/Data';
import {fontSize, hp, wp} from '../helper/Constant';
import SearchBar from './Common/SearchBar';
import {strings} from '../helper/Strings';
import {FaqDummy} from '../assets/DummyData/FaqDummy';
import {Images} from '../helper/IconConstant';

const Faq = () => {
  const [categorySelect, setCategory] = useState({
    id: 1,
    title: 'General',
  });
  const [faqDummyData, setFaqDummyData] = useState(FaqDummy);
  const [searchData, setSearchData] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    searchFaqQuestion(searchText);
  }, [searchText]);
  const searchFaqQuestion = text => {
    if (text) {
      const abc = faqDummyData.filter(item => {
        if (item.question.toLocaleLowerCase().match(text)) {
          return item;
        }
      });
      setSearchData(abc);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{marginHorizontal: wp(2), paddingVertical: hp(1)}}>
        <FlatList
          bounces={false}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={FaqData}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={[
                  styles.FlatListViewStyle,
                  {
                    backgroundColor:
                      item.title == categorySelect.title
                        ? color.commonBlue
                        : color.Grey,
                  },
                ]}
                onPress={() => {
                  setCategory(item);
                }}>
                <Text
                  style={[
                    styles.textStyle,
                    {
                      color:
                        item.title !== categorySelect.title
                          ? color.black
                          : color.white,
                    },
                  ]}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <SearchBar
        placeholder={strings.search}
        TextInputBody={styles.TextInputBody}
        onChangeText={text => setSearchText(text)}
        value={searchText}
      />
      <View style={styles.flatListView}>
        <FlatList
          data={searchText.length ? searchData : faqDummyData}
          bounces={false}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <View
                style={{
                  backgroundColor: color.white,
                  marginVertical: hp(1),
                  paddingHorizontal: wp(4),
                  marginHorizontal: wp(4),
                  paddingVertical: hp(2),
                }}>
                <View style={styles.viewStyle}>
                  <Text style={styles.questionStyle}>{item.question}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      const d = faqDummyData.map(i => {
                        if (i.id == item.id) {
                          i.isOpen = !i.isOpen;
                          return i;
                        }
                        return i;
                      });
                      setFaqDummyData(d);
                    }}>
                    <Image
                      source={Images.downArrow}
                      style={[
                        styles.iconStyle,
                        {
                          transform: item.isOpen
                            ? [{rotate: '180deg'}]
                            : [{rotate: '0deg'}],
                        },
                      ]}
                    />
                  </TouchableOpacity>
                </View>
                {item.isOpen && (
                  <View style={styles.answerStyle}>
                    <Text>{item.answer}</Text>
                  </View>
                )}
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
  textStyle: {
    fontSize: fontSize(16),
    fontWeight: '500',
  },
  FlatListViewStyle: {
    paddingHorizontal: wp(6),
    paddingVertical: wp(3),
    borderRadius: wp(5),
    marginLeft: wp(2),
    marginTop: hp(1),
    borderWidth: 1,
    borderColor: '#E6E7E8',
  },
  TextInputBody: {
    backgroundColor: color.lightWhite,
  },
  iconStyle: {
    height: hp(3),
    width: hp(3),
    resizeMode: 'contain',
  },
  viewStyle: {
    flexDirection: 'row',
  },
  questionStyle: {
    fontSize: fontSize(16),
    fontWeight: 'bold',
    flex: 1,
  },
  answerStyle: {
    borderTopWidth: 1,
    paddingTop: hp(2),
    marginTop: hp(2),
    borderColor: color.grayLight,
  },
  flatListView: {
    marginBottom: hp(8),
    marginTop: hp(2),
  },
});

export default Faq;
