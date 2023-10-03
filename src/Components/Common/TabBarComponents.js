import {Image, StyleSheet} from 'react-native';
import React from 'react';
import {wp} from '../../helpers/helper';
import { color } from '../../helpers/ColorConstant';

const TabBarComponents = props => {
  return (
    <Image
      source={props.Icon}
      style={[styles.icons, {tintColor: props.props.focused ? color.commonBlue : null}]}
    />
  );
};
const styles = StyleSheet.create({
  icons: {
    height: wp(5),
    width: wp(5),
  },
});
export default TabBarComponents;
