import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {PickerHeaderBar, SearchBar} from '../../components';
import {fontSize, hp, wp} from '../../helpers/helper';
import {images} from '../../helpers/IconConstant';
import { useDispatch } from 'react-redux';
import { depatureDateAction } from '../../redux/action/DateAction';
import { depaturePlaceAction, destinationPlaceAction } from '../../redux/action/PlaceAction';

const PlacePickerScreen = ({navigation, route}) => {
    const dispatch = useDispatch()
  const [apiData, setApidata] = useState([]);
  const [search, setSearch] = useState([]);
  const headerData = route?.params?.data;
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name,capital')
      .then(response => response.json())
      .then(data => setApidata(data));
  }, []);
  const searchFilter = text => {
    if (text) {
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
const onPlacePress = (capital,country)=>{
    const data = JSON.stringify(capital)
    const data1= JSON.stringify(country)
let newString ={}
if(data.length > 9){
    const placename = data.substring(1,8)+'...';
    if(data1.length > 9){
    const countryname = data1.substring(1,8)+'...';
    newString = {
        city : placename,
        country : countryname
    }
}else{
    const length1 = data1.length
    const countryname = data1.substring(1,length1-1);
    newString = {
        city : placename,
        country : countryname
    }
}
}else{
    const length = data.length
    const placename = data.substring(1,length-1);
    if(data1.length > 9){
        const countryname = data1.substring(1,8)+'...';
        newString = {
            city : placename,
            country : countryname
        }
    }else{
        const length1 = data1.length
        const countryname = data1.substring(1,length1-1);
        newString = {
            city : placename,
            country : countryname
        }
    }
}
// console.log(newString,":::::::::::>>>")
if( headerData === 'Select Origin'){
    dispatch(depaturePlaceAction(newString))
    navigation.navigate('TabNavigation');
}else{
    dispatch(destinationPlaceAction(newString))
    navigation.navigate('TabNavigation');
}
}
  return (
    <View style={styles.container}>
      <PickerHeaderBar
        headerName={headerData}
        navigation={() => navigation.goBack('')}
      />
      <SearchBar onChangeText={txt => searchFilter(txt)} />
      <View style={styles.flatlistViewStyle}>
        <FlatList
          data={search.length > 0 ? search : apiData}
          bounces={false}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            let firstLatter = JSON.stringify(item.capital).charAt(2);
            let secondlatter = JSON.stringify(item.name.common).charAt(1);
            return (
              <View>
                <TouchableOpacity style={styles.cityTouchStyle} onPress={()=>onPlacePress(item.capital[0],item.name.common)}>
                  <View style={{flex: 1}}>
                    <View style={styles.textViewStyle}>
                      <Text style={styles.textStyle}>{item.capital}</Text>
                      <Text style={styles.textStyle}>{' - '}</Text>
                      <Text style={styles.textStyle}>{item.name.common}</Text>
                    </View>
                    <View style={styles.smallTextViewStyle}>
                      <Text style={styles.smallTextStyle}>
                        {firstLatter + secondlatter}
                      </Text>

                      <Text style={styles.smallTextStyle}>-</Text>
                      <Text style={styles.smallTextStyle}>
                        Internation Airport of {item.capital}
                      </Text>
                    </View>
                  </View>
                  <Image
                    source={images.forward}
                    style={styles.forwardIconStyle}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default PlacePickerScreen;
const {height, width} = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  flatlistViewStyle: {
    paddingHorizontal: wp(6),
  },
  cityTouchStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: hp(2),
  },
  lineStyle: {
    width: wp(90),
    height: hp(0),
    alignSelf: 'center',
    borderWidth: 0.5,
  },
  forwardIconStyle: {
    height: wp(4.4),
    width: hp(4.4),
  },
  textStyle: {
    fontSize: fontSize(18),
    fontWeight: '500',
    color: 'black',
  },
  textViewStyle: {
    fontSize: fontSize(18),
    fontWeight: '500',
    color: 'black',
    flexDirection: 'row',
  },
  smallTextViewStyle: {
    flexDirection: 'row',
    paddingTop: hp(0.5),
  },
  smallTextStyle: {
    color: 'grey',
    fontSize: fontSize(16),
  },
});
