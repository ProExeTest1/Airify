import React from 'react';
import {StyleSheet, View} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

import {color} from '../../helper/ColorConstant';

const MultiSliderComponets = ({
  min,
  max,
  values,
  sliderLength,
  onValuesChangeFinish,
}) => {
  return (
    <MultiSlider
      min={min}
      max={max}
      values={values}
      enabledTwo={true}
      sliderLength={sliderLength}
      selectedStyle={styles.MultiSliderStyle}
      unselectedStyle={styles.MultiSliderSelectedStyle}
      onValuesChangeFinish={a => onValuesChangeFinish(a)}
      customMarker={() => <View style={styles.MultiSliderCustomMarker}></View>}
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
    width: 20,
    height: 20,
    borderWidth: 4,
    borderRadius: 50,
    backgroundColor: '#fff',
    borderColor: color.commonBlue,
  },
});
