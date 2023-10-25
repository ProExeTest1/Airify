import React from 'react';
import {Image, StyleSheet} from 'react-native';

import {wp} from '../../helper/Constant';
import {color} from '../../helper/ColorConstant';

const TabBarComponents = props => {
  return (
    <Image
      source={props.Icon}
      style={[
        styles.icons,
        {tintColor: props.props.focused ? color.commonBlue : null},
      ]}
    />
  );
};
const styles = StyleSheet.create({
  icons: {
    width: wp(5),
    height: wp(5),
  },
});
export default TabBarComponents;
