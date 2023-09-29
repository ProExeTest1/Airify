import React from 'react';
import {
  LogBox,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import StackNavigation from './src/navigation/StackNavigation';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

function App() {
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = false;

  TextInput.defaultProps = TextInput.defaultProps || {};
  TextInput.defaultProps.allowFontScaling = false;

  LogBox.ignoreAllLogs(['Warning: ...']);
  LogBox.ignoreAllLogs();

  React.useEffect(() => {
    SplashScreen.hide();
  });
  return (
    <Provider store={store}>
      <View style={styles.Header}>
        <StatusBar barStyle={'light-content'} />
        <StackNavigation />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  Header: {
    flex: 1,
  },
});

export default App;
