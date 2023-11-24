import {StyleSheet, View, Animated, Easing} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {hp} from '../../helper/Constant';
import {useSelector} from 'react-redux';

const Loader = ({color, durationMs = 1700}) => {
  const rotationDegree = useRef(new Animated.Value(0)).current;
  const startRotationAnimation = (durationMs, rotationDegree) => {
    Animated.loop(
      Animated.timing(rotationDegree, {
        toValue: 720,
        duration: durationMs,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  };

  useEffect(() => {
    startRotationAnimation(durationMs, rotationDegree);
  }, [durationMs, rotationDegree]);

  return (
    <View style={styles.container} accessibilityRole="progressbar">
      <View style={[styles.background, {borderColor: color}]} />

      <Animated.View
        style={[
          styles.progress,
          {borderTopColor: color},
          {
            transform: [
              {
                rotateZ: rotationDegree.interpolate({
                  inputRange: [0, 360],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: hp(6),
    height: hp(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    width: '100%',
    height: '100%',
    borderRadius: hp(6) / 2,
    borderWidth: 7,
    opacity: 0.25,
  },
  progress: {
    width: '100%',
    height: '100%',
    borderRadius: hp(6) / 2,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderWidth: 7,
    position: 'absolute',
  },
});

export default Loader;
