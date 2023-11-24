import React from 'react';
import {Image, StyleSheet} from 'react-native';

import {wp} from '../../helper/Constant';

import {useSelector} from 'react-redux';

const TabBarComponents = props => {
  const color = useSelector(state => state?.themereducer?.colorTheme);
  const styles = ThemeStyle(color);
  return (
    <Image
      source={props.Icon}
      style={[
        styles.icons,
        {
          tintColor: props.props.focused
            ? color.commonBlue
            : color.paperTextInputColor,
        },
      ]}
    />
  );
};
const ThemeStyle = color =>
  StyleSheet.create({
    icons: {
      width: wp(5),
      height: wp(5),
    },
  });
export default TabBarComponents;
