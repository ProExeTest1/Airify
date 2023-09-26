import React, {Component, useRef, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {hp, wp} from '../../helper/Constant';
import Swiper from 'react-native-swiper';
import OnBoardingImage from '../../components/OnBoardingImage';
import OnBoardingText from '../../components/OnBoardingText';
import {strings} from '../../helper/Strings';
import OnBoardingTwoButton from '../../components/OnBoardingTwoButton';
import OnBoardingSingleButton from '../../components/OnBoardingSingleButton';
import {Images} from '../../helper/IconConstant';

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
          <OnBoardingText OnBoardingMainText={strings.OnBoardingOneMainText} />
          <OnBoardingText OnBoardingSubText={strings.OnBoardingOneSubText} />
        </View>
        <View style={styles.slide}>
          <OnBoardingImage onBoardingImage={Images.onBoardingImageSecond} />
          <OnBoardingText
            OnBoardingMainText={strings.OnBoardingSecondMainText}
          />
          <OnBoardingText OnBoardingSubText={strings.OnBoardingSecondSubText} />
        </View>
        <View style={styles.slide}>
          <OnBoardingImage
            OnBoardingImage
            onBoardingImage={Images.onBoardingImageThird}
          />
          <OnBoardingText
            OnBoardingMainTextStyle={styles.OnBoardingMainTextStyle}
            OnBoardingMainText={strings.OnBoardingThirdMainText}
          />
          <OnBoardingText OnBoardingSubText={strings.OnBoardingThirdSubText} />
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
  OnBoardingMainTextStyle: {
    width: wp(80),
  },
});

export default OnBoardingFirst;
