import Swiper from 'react-native-swiper';
import {View, StyleSheet} from 'react-native';
import React, {useRef, useState} from 'react';

import {hp, wp} from '../../helper/Constant';
import {strings} from '../../helper/Strings';
import {Images} from '../../helper/IconConstant';
import OnBoardingText from '../../components/OnBoardingText';
import OnBoardingImage from '../../components/OnBoardingImage';
import OnBoardingTwoButton from '../../components/OnBoardingTwoButton';
import OnBoardingSingleButton from '../../components/OnBoardingSingleButton';

const OnBoardingFirst = ({navigation}) => {
  const swiperRef = useRef();
  const [index, setIndex] = useState(0);

  return (
    <View style={styles.container}>
      <Swiper
        loop={false}
        index={index}
        ref={swiperRef}
        showsButtons={false}
        onIndexChanged={index => {
          setIndex(index);
        }}
        activeDotStyle={{borderStyle: 'solid', width: wp(8)}}
        paginationStyle={{
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={styles.slide}>
          <OnBoardingImage onBoardingImage={Images.onBoardingImageOne} />
          <OnBoardingText
            OnBoardingSubTextStyle={{marginTop: hp(1)}}
            OnBoardingSubText={strings.OnBoardingOneSubText}
            OnBoardingMainText={strings.OnBoardingOneMainText}
          />
        </View>
        <View style={styles.slide}>
          <OnBoardingImage onBoardingImage={Images.onBoardingImageSecond} />
          <OnBoardingText
            OnBoardingSubTextStyle={{marginTop: hp(1)}}
            OnBoardingSubText={strings.OnBoardingSecondSubText}
            OnBoardingMainText={strings.OnBoardingSecondMainText}
          />
        </View>
        <View style={styles.slide}>
          <OnBoardingImage
            OnBoardingImage
            onBoardingImage={Images.onBoardingImageThird}
          />
          <OnBoardingText
            OnBoardingSubTextStyle={{marginTop: hp(1)}}
            OnBoardingSubText={strings.OnBoardingThirdSubText}
            OnBoardingMainText={strings.OnBoardingThirdMainText}
          />
        </View>
      </Swiper>
      <View
        style={{
          height: 1,
          marginTop: 5,
          marginHorizontal: wp(5),
          backgroundColor: '#ECEFEF',
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
