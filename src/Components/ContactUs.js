import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {color} from '../helper/ColorConstant';
import {ContactUSData} from '../assets/DummyData/Data';
import {fontSize, hp, wp} from '../helper/Constant';

const ContactUS = () => {
  return (
    <View style={styles.container}>
      <FlatList
        bounces={false}
        showsVerticalScrollIndicator={false}
        data={ContactUSData}
        renderItem={({item}) => {
          return (
            <TouchableOpacity style={styles.viewStyle}>
              <Image
                source={item.image}
                style={[
                  styles.iconStyle,
                  {
                    tintColor:
                      item.title !== 'Facebook' ? color.commonBlue : null,
                  },
                ]}
              />
              <Text style={styles.textStyle}>{item.title}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.Grey,
  },
  viewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(2),
    marginVertical: hp(1),
    backgroundColor: color.white,
    marginHorizontal: wp(4),
    paddingHorizontal: wp(4),
    borderRadius: wp(2),
  },
  iconStyle: {
    height: hp(2.5),
    width: hp(2.5),
    resizeMode: 'contain',
  },
  textStyle: {
    fontWeight: '500',
    fontSize: fontSize(16),
    paddingStart: wp(4),
  },
});

export default ContactUS;
