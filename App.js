import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import StackNavigation from './src/navigators/StackNavigation';

function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content' />
      <StackNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1
  }
});

export default App;
