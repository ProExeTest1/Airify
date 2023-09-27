import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import StackNavigation from './src/navigators/StackNavigation';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <StackNavigation />
    </Provider>
  );
}

const styles = StyleSheet.create({});

export default App;
