import {Image, StyleSheet} from 'react-native';
import React from 'react';
import {wp} from '../../Helpers/helper';

const TabBarComponents = props => {
  return (
    <Image
      source={props.Icon}
      style={[styles.icons, {tintColor: props.props.focused ? 'rgb(0, 122, 255)' : null}]}
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
