import {Alert, Platform, ToastAndroid} from 'react-native';

export const AlertConstant = Alertdata => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(Alertdata, ToastAndroid.SHORT);
  } else if (Platform.OS === 'ios') {
    Alert.alert(Alertdata);
  }
};
