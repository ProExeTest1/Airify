import React from 'react';
import StackNavigation from './src/navigation/StackNavigation';
import {MenuProvider} from 'react-native-popup-menu';
import {store} from './src/redux/store';
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
import {Provider} from 'react-redux';

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
      <MenuProvider>
        <View style={styles.Header}>
          <StatusBar barStyle={'light-content'}/>
          <StackNavigation />
        </View>
      </MenuProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  Header: {
    flex: 1,
  },
});

export default App;
