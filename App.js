import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import StackNavigation from './src/navigation/StackNavigation';

function App() {
  React.useEffect(() => {
    SplashScreen.hide();
  });
  return (
    <View style={styles.Header}>
      <StatusBar barStyle={'light-content'} />
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
