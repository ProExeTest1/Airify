import {useDispatch} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {color} from '../../helper/ColorConstant';
import {Images} from '../../helper/IconConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import {PickerHeaderBar, SearchBar} from '../../components';
import {
  depaturePlaceAction,
  destinationPlaceAction,
} from '../../redux/action/PlaceAction';
import {strings} from '../../helper/Strings';

const PlacePickerScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const headerData = route?.params?.data;
  const [search, setSearch] = useState([]);
  const [apiData, setApidata] = useState([]);
  const [searchEnable, setSearchEnable] = useState(false);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name,capital')
      .then(response => response.json())
      .then(data => setApidata(data));
  }, []);

  // For filter data according to the search

  const searchFilter = text => {
    if (text) {
      setSearchEnable(true);
      const newData = apiData.filter(item => {
        const itemData = item.capital[0]
          ? item.capital[0].toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setSearch(newData);
    }
  };

  // it will navigate to homescreen and store airport information in redux

  const onPlacePress = (capital, country, airport) => {
    const data = JSON.stringify(capital);
    const data1 = JSON.stringify(country);
    let newString = {};
    if (data.length > 9) {
      const placename = data.substring(1, 8) + '...';
      if (data1.length > 9) {
        const countryname = data1.substring(1, 8) + '...';
        newString = {
          city: placename,
          country: countryname,
          airport: airport,
          capitalName: capital,
          countryfullName: country,
        };
      } else {
        const length1 = data1.length;
        const countryname = data1.substring(1, length1 - 1);
        newString = {
          city: placename,
          country: countryname,
          airport: airport,
          capitalName: capital,
          countryfullName: country,
        };
      }
    } else {
      const length = data.length;
      const placename = data.substring(1, length - 1);
      if (data1.length > 9) {
        const countryname = data1.substring(1, 8) + '...';
        newString = {
          city: placename,
          country: countryname,
          airport: airport,
          capitalName: capital,
          countryfullName: country,
        };
      } else {
        const length1 = data1.length;
        const countryname = data1.substring(1, length1 - 1);
        newString = {
          city: placename,
          country: countryname,
          airport: airport,
          capitalName: capital,
          countryfullName: country,
        };
      }
    }
    if (headerData === 'Select Origin') {
      dispatch(depaturePlaceAction(newString));
      navigation.navigate('TabNavigation');
    } else {
      dispatch(destinationPlaceAction(newString));
      navigation.navigate('TabNavigation');
    }
  };
  return (
    <View style={styles.container}>
      <PickerHeaderBar
        headerName={headerData}
        navigation={() => navigation.goBack('')}
      />
      <SearchBar
        placeholder={'Search...'}
        onChangeText={txt => searchFilter(txt)}
      />
      {search.length <= 0 && searchEnable ? (
        <View style={styles.notFoundViewStyle}>
          <Text style={styles.notFoundTextStyle}>
            {strings.none_of_place_exist}
          </Text>
        </View>
      ) : (
        <View style={styles.flatlistViewStyle}>
          <FlatList
            data={search.length > 0 ? search : apiData}
            bounces={false}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              let firstLatter = JSON.stringify(item.capital).charAt(2);
              let secondlatter = JSON.stringify(item.name.common).charAt(1);
              return (
                <View style={{flex: 1}}>
                  <TouchableOpacity
                    style={styles.cityTouchStyle}
                    onPress={() =>
                      onPlacePress(
                        item.capital[0],
                        item.name.common,
                        firstLatter + secondlatter,
                      )
                    }>
                    <View style={{flex: 1}}>
                      <View style={styles.textViewStyle}>
                        <Text numberOfLines={1} style={styles.textStyle}>
                          {item.capital}
                          {' - '}
                          {item.name.common}
                        </Text>
                      </View>
                      <View style={styles.smallTextViewStyle}>
                        <Text numberOfLines={1} style={styles.smallTextStyle}>
                          {firstLatter + secondlatter} -{' '}
                          {strings.internation_airport} {item.capital}
                        </Text>
                      </View>
                    </View>
                    <Image
                      source={Images.forward}
                      style={styles.forwardIconStyle}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

export default PlacePickerScreen;
const {height, width} = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  flatlistViewStyle: {
    paddingHorizontal: wp(6),
  },
  cityTouchStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    flex: 1,
    paddingVertical: hp(2),
  },
  lineStyle: {
    flex: 1,
    height: hp(0),
    borderWidth: 0.5,
  },
  forwardIconStyle: {
    width: hp(4.4),
    height: wp(4.4),
  },
  textStyle: {
    fontWeight: '500',
    color: color.black,
    fontSize: fontSize(18),
  },
  textViewStyle: {
    flex: 1,
    flexDirection: 'row',
  },
  smallTextViewStyle: {
    paddingTop: hp(0.5),
    flexDirection: 'row',
  },
  smallTextStyle: {
    color: color.grey,
    fontSize: fontSize(16),
  },
  notFoundTextStyle: {
    fontSize: fontSize(20),
    color: 'black',
  },
  notFoundViewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.white,
  },
});
