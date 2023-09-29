import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import React, { useEffect } from 'react';
import {fontSize, hp, wp} from '../../helpers/helper';
import {Images} from '../../helpers/IconConstant';
import {SearchFlightsHeader} from '../../components';
import {SearchFlightData} from '../../assets/DummyData/SearchFlightData';
import {CardList} from '../../components';

const SearchFlights = props => {
  return (
    <View style={styles.body}>
      <SearchFlightsHeader />
      <View style={styles.ScrollViewBody}>
        <FlatList
          data={SearchFlightData}
          bounces={false}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => <CardList item={item} index={index} />}
          key={({item, index}) => index}
        />
      </View>
      <View style={styles.sortBody}>
        <View style={styles.sortImgBody}>
          <Image style={styles.sortImg} source={Images.sortIcon}/>
          <Text style={styles.sortText}>Sort</Text>
        </View>
        <View style={styles.sortLine}></View>
        <View style={styles.sortImgBody}>
          <Image style={styles.sortImg} source={Images.filterIcon}/>
          <Text style={styles.sortText}>Filter</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  ScrollViewBody: {
    flex: 1,
    paddingHorizontal: wp(7),
  },
  sortBody:{
    position: 'absolute',
    paddingVertical: hp(1.8),
    paddingHorizontal: wp(4),
    width:wp(55),
    bottom: hp(5),
    alignSelf: 'center',
    borderRadius: 500,
    backgroundColor: '#fff',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.2,
    shadowRadius: 10, 
    elevation: 8,
    flexDirection:"row"
  },
  sortImgBody:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center'
  },
  sortLine:{
    borderColor:'#e2e2e2',
    borderEndWidth:2,
    height:'100%'
  },
  sortText:{
    fontSize:fontSize(20),
    fontWeight:'500'
  },
  sortImg:{
    height:wp(6),
    width:wp(6),
  }
});
export default SearchFlights;
