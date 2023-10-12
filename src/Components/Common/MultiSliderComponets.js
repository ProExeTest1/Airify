import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {color} from '../../helper/ColorConstant';

const MultiSliderComponets = ({
  min,
  max,
  sliderLength,
  values,
  onValuesChangeFinish,
}) => {
  return (
    <MultiSlider
      min={min}
      max={max}
      selectedStyle={styles.MultiSliderStyle}
      unselectedStyle={styles.MultiSliderSelectedStyle}
      values={values}
      sliderLength={sliderLength}
      customMarker={() => <View style={styles.MultiSliderCustomMarker}></View>}
      enabledTwo={true}
      onValuesChangeFinish={a => onValuesChangeFinish(a)}
    />
  );
};

export default MultiSliderComponets;

const styles = StyleSheet.create({
  MultiSliderStyle: {
    height: 4,
    backgroundColor: color.commonBlue,
  },
  MultiSliderSelectedStyle: {
    height: 4,
    backgroundColor: '#eeeeee',
  },
  MultiSliderCustomMarker: {
    height: 20,
    width: 20,
    backgroundColor: '#fff',
    borderWidth: 4,
    borderRadius: 50,
    borderColor: color.commonBlue,
  },
});
