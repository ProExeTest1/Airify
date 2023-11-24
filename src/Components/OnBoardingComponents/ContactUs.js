import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

import {fontSize, hp, wp} from '../../helper/Constant';
import {ContactUSData} from '../../assets/DummyData/Data';
import {useSelector} from 'react-redux';

const ContactUS = () => {
  const color = useSelector(state => state?.themereducer?.colorTheme);

  const styles = ThemeStyle(color);
  return (
    <View style={styles.container}>
      <FlatList
        bounces={false}
        data={ContactUSData}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <TouchableOpacity style={styles.viewStyle}>
              <Image
                source={item?.image}
                style={[
                  styles.iconStyle,
                  {
                    tintColor:
                      item?.title !== 'Facebook' ? color.commonBlue : null,
                  },
                ]}
              />
              <Text style={styles.textStyle}>{item?.title}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const ThemeStyle = color =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.onBoardingBgColor,
    },
    viewStyle: {
      borderRadius: wp(2),
      alignItems: 'center',
      flexDirection: 'row',
      marginVertical: hp(1),
      paddingVertical: hp(2),
      marginHorizontal: wp(4),
      paddingHorizontal: wp(4),
      backgroundColor: color.white,
    },
    iconStyle: {
      width: hp(2.5),
      height: hp(2.5),
      resizeMode: 'contain',
    },
    textStyle: {
      fontWeight: '500',
      paddingStart: wp(4),
      fontSize: fontSize(16),
      color: color.black,
    },
  });

export default ContactUS;
