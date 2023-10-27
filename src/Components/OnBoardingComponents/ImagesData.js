import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

import {hp, wp} from '../../helper/Constant';

const ImagesData = ({round, imageSource, ImageStyle}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.round, round]}>
        <Image source={imageSource} style={[styles.ImageStyle, ImageStyle]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  round: {
    alignSelf: 'center',
  },
  ImageStyle: {
    width: wp(69.87),
    height: hp(32.27),
    marginTop: hp(16.63),
  },
});

export default ImagesData;
