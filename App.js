import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import StackNavigation from './src/navigators/StackNavigation';
import {color} from './src/helpers/ColorConstant';

function App() {
  return (
    <View style={styles.Header}>
      <StatusBar
        backgroundColor={color.commonBlue}
        barStyle={'light-content'}
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
