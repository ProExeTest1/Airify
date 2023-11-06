import {Alert, Platform, ToastAndroid} from 'react-native';

export const AlertConstant = Alertdata => {
  if (Platform.OS === 'android') {
    ToastAndroid.showWithGravity(
      Alertdata,
      ToastAndroid.LONG,
      ToastAndroid.TOP,
    );
  } else if (Platform.OS === 'ios') {
    Alert.alert(Alertdata);
  }
};
