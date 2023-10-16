import {Dimensions, Image, StyleSheet, View} from 'react-native';
import React from 'react';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {dummyData} from '../../assets/DummyData/Data';
import {hp, wp} from '../../helper/Constant';

const SwiperFlatlistComponent = ({showPagination}) => {
  return (
    <View>
      <SwiperFlatList
        autoplay
        disableGesture={true}
        autoplayDelay={3}
        autoplayLoop
        data={dummyData}
        paginationStyleItem={{
          width: hp(0.9),
          height: hp(0.9),
          borderRadius: 5,
        }}
        showPagination={showPagination}
        renderItem={({item}) => {
          return (
            <View style={styles.child}>
              <Image
                source={item.image}
                style={styles.offerimageStyle}
                resizeMode="stretch"
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
    height: hp(25),
    width: wp(88),
    borderRadius: 14,
  },
});
