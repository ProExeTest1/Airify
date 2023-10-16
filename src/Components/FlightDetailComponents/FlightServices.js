import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Images} from '../../helper/IconConstant';
import {
  FlightDetailsData,
  FlightDetailsData1,
} from '../../assets/DummyData/FlightDetailsData';
import {fontSize, hp, wp} from '../../helper/Constant';
import {color} from '../../helper/ColorConstant';

const FlightServices = ({DetailsNavigation}) => {
  return (
    <View>
      <View style={styles.flatlistViewStyle}>
        <FlatList
          data={FlightDetailsData}
          showsVerticalScrollIndicator={false}
          bounces={false}
          renderItem={({item}) => {
            return (
              <View style={styles.flatlist1InnerViewStyle}>
                <Image
                  source={item.image}
                  style={styles.flatlistIconStyle}
                  resizeMode="contain"
                />
                <Text style={styles.flatlistTextStyle}>{item.text}</Text>
              </View>
            );
          }}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={styles.flatlistViewStyle}>
        <FlatList
          data={FlightDetailsData1}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          renderItem={({item}) => {
            return (
              <View style={styles.flatlist2InnerViewStyle}>
                <Image
                  source={item.image}
                  style={styles.flatlistIconStyle}
                  resizeMode="contain"
                />
              </View>
            );
          }}
          keyExtractor={item => item.id}
        />
        <TouchableOpacity
          onPress={DetailsNavigation}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.detailsTextStyle}>Details</Text>
          <Image
            source={Images.forward}
            style={styles.forwardStyle}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FlightServices;

const styles = StyleSheet.create({
  flatlistTextStyle: {
    fontSize: fontSize(18),
    color: '#383838',
    marginHorizontal: wp(3),
  },
  flatlist1InnerViewStyle: {
    flexDirection: 'row',
    marginVertical: hp(1),
  },
  flatlist2InnerViewStyle: {
    marginHorizontal: wp(2),
  },
  flatlistIconStyle: {
    height: hp(2.5),
    width: hp(2.5),
    tintColor: '#383838',
  },
  flatlistViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#e2e2e2',
    borderBottomWidth: 1,
    paddingVertical: hp(1.6),
  },
  detailsTextStyle: {
    fontSize: fontSize(18),
    color: color.commonBlue,
    marginHorizontal: wp(3),
  },
  forwardStyle: {
    height: hp(1.8),
    width: hp(1.8),
    tintColor: color.commonBlue,
  },
});
