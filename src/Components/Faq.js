import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

import {strings} from '../helper/Strings';
import SearchBar from './Common/SearchBar';
import {Images} from '../helper/IconConstant';
import {color} from '../helper/ColorConstant';
import {FaqData} from '../assets/DummyData/Data';
import {fontSize, hp, wp} from '../helper/Constant';
import {FaqDummy} from '../assets/DummyData/FaqDummy';

const Faq = () => {
  const [categorySelect, setCategory] = useState({
    id: 1,
    title: 'General',
  });
  const [searchText, setSearchText] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [faqDummyData, setFaqDummyData] = useState(FaqDummy);

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
          horizontal
          data={FaqData}
          bounces={false}
          showsHorizontalScrollIndicator={false}
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
        value={searchText}
        placeholder={strings.search}
        TextInputBody={styles.TextInputBody}
        onChangeText={text => setSearchText(text)}
      />
      <View style={styles.flatListView}>
        <FlatList
          bounces={false}
          data={searchText.length ? searchData : faqDummyData}
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
                    <Text style={{color: color.black}}>{item.answer}</Text>
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
    fontWeight: '500',
    fontSize: fontSize(16),
  },
  FlatListViewStyle: {
    borderWidth: 1,
    marginTop: hp(1),
    marginLeft: wp(2),
    borderRadius: wp(5),
    borderColor: '#E6E7E8',
    paddingVertical: wp(3),
    paddingHorizontal: wp(6),
  },
  TextInputBody: {
    backgroundColor: color.lightWhite,
  },
  iconStyle: {
    width: hp(3),
    height: hp(3),
    resizeMode: 'contain',
  },
  viewStyle: {
    flexDirection: 'row',
  },
  questionStyle: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: fontSize(16),
  },
  answerStyle: {
    marginTop: hp(2),
    paddingTop: hp(2),
    borderTopWidth: 1,
    borderColor: color.grayLight,
  },
  flatListView: {
    marginTop: hp(2),
    marginBottom: hp(8),
  },
});

export default Faq;
