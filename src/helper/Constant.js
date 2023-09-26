import {Platform} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {getStatusBarHeight} from 'react-native-status-bar-height';
export const isIOS = Platform.OS === 'ios';
export const fontSize = val => RFValue(val, 812);
export const wp = val => widthPercentageToDP(val);
export const hp = val => heightPercentageToDP(val);
export const statusBarHeight = getStatusBarHeight();
