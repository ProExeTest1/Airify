import React, {Component, useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {hp, wp} from '../../helper/Constant';
import Swiper from 'react-native-swiper';
import OnBoardingImage from '../../components/OnBoardingImage';
import OnBoardingText from '../../components/OnBoardingText';
import {strings} from '../../helper/Strings';
import OnBoardingTwoButton from '../../components/OnBoardingTwoButton';
import OnBoardingSingleButton from '../../components/OnBoardingSingleButton';
import {Images} from '../../helper/IconConstant';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {active} from '../../redux/action/HomeAction';

const OnBoardingFirst = ({navigation, props}) => {
  const swiperRef = useRef();
  const [index, setIndex] = useState(0);

  return (
    <View style={styles.container}>
      <Swiper
        ref={swiperRef}
        onIndexChanged={index => {
          setIndex(index);
        }}
        loop={false}
        index={index}
        showsButtons={false}
        activeDotStyle={{borderStyle: 'solid', width: wp(8)}}
        paginationStyle={{
          alignItems: 'center',
          justifyContent: 'center',
          bottom: 0,
        }}>
        <View style={styles.slide}>
          <OnBoardingImage onBoardingImage={Images.onBoardingImageOne} />
          <OnBoardingText
            OnBoardingMainText={strings.OnBoardingOneMainText}
            OnBoardingSubText={strings.OnBoardingOneSubText}
            OnBoardingSubTextStyle={{marginTop: hp(1)}}
          />
        </View>
        <View style={styles.slide}>
          <OnBoardingImage onBoardingImage={Images.onBoardingImageSecond} />
          <OnBoardingText
            OnBoardingMainText={strings.OnBoardingSecondMainText}
            OnBoardingSubText={strings.OnBoardingSecondSubText}
            OnBoardingSubTextStyle={{marginTop: hp(1)}}
          />
        </View>
        <View style={styles.slide}>
          <OnBoardingImage
            OnBoardingImage
            onBoardingImage={Images.onBoardingImageThird}
          />
          <OnBoardingText
            OnBoardingMainText={strings.OnBoardingThirdMainText}
            OnBoardingSubText={strings.OnBoardingThirdSubText}
            OnBoardingSubTextStyle={{marginTop: hp(1)}}
          />
        </View>
      </Swiper>
      <View
        style={{
          height: 1,
          backgroundColor: '#ECEFEF',
          marginHorizontal: wp(5),
          marginTop: 5,
        }}
      />
      <View style={{justifyContent: 'flex-end', marginBottom: hp(5)}}>
        {index == 2 ? (
          <OnBoardingSingleButton
            buttonStyle={styles.buttonStyle}
            onPress={() => {
              navigation.navigate('WelcomeScreen');
            }}
            buttonText={strings.buttonText}
          />
        ) : (
          <OnBoardingTwoButton
            buttonTextOne={strings.OnBoardingButtonOne}
            buttonTextTwo={strings.OnBoardingButtonSecond}
            onPress1={() => {
              index == 0
                ? swiperRef.current.scrollBy(2)
                : swiperRef.current.scrollBy(1);
            }}
            onPress2={() => {
              swiperRef.current.scrollBy(1);
            }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  slide: {
    flex: 1,
  },
  buttonStyle: {
    marginTop: hp(4),
  },
});

export default OnBoardingFirst;
