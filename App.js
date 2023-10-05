import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import StackNavigation from './src/navigators/StackNavigation';
import {MenuProvider} from 'react-native-popup-menu';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <MenuProvider>
        <View style={styles.Header}>
          <StatusBar barStyle={'light-content'} />
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
