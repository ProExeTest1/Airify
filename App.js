
import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import StackNavigation from './src/Navigators/StackNavigation';

function App() {
  return (
    <View style={styles.Header}>
      <StatusBar
        barStyle={'light-content' }
      />
      <StackNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  Header: {
    flex: 1,
  },
});

export default App;

