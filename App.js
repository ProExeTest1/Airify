
import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import StackNavigation from './src/navigators/StackNavigation';
import { MenuProvider } from 'react-native-popup-menu';

function App() {
  return (
    <MenuProvider>
    <View style={styles.Header}>
      <StatusBar
        barStyle={'light-content' }
      />
      <StackNavigation />
    </View>
    </MenuProvider>
  );
}

const styles = StyleSheet.create({
  Header: {
    flex: 1,
  },
});

export default App;