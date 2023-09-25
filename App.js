import * as React from 'react';
import {View, Text} from 'react-native';
import StackNavigation from './src/navigation/StackNavigation';
import SplashScreen from 'react-native-splash-screen';

function App() {
  React.useEffect(() => {
    SplashScreen.hide();
  });
  return <StackNavigation />;
}

export default App;
