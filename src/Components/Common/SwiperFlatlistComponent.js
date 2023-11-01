import React from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';

import {hp, wp} from '../../helper/Constant';
import {dummyData} from '../../assets/DummyData/Data';

const SwiperFlatlistComponent = ({showPagination}) => {
  return (
    <View>
      <SwiperFlatList
        autoplay
        autoplayLoop
        data={dummyData}
        autoplayDelay={3}
        disableGesture={true}
        paginationStyleItem={styles.paginationStyleItem}
        showPagination={showPagination}
        renderItem={({item}) => {
          return (
            <View style={styles.child}>
              <Image
                source={item.image}
                resizeMode="stretch"
                style={styles.offerimageStyle}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

export default SwiperFlatlistComponent;
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  child: {
    width,
    justifyContent: 'center',
  },
  offerimageStyle: {
    width: wp(88),
    height: hp(25),
    borderRadius: 14,
  },
  paginationStyleItem: {
    width: hp(0.9),
    height: hp(0.9),
    borderRadius: 5,
  },
});
