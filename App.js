import React from 'react';
import {
  LogBox,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Provider} from 'react-redux';
import {MenuProvider} from 'react-native-popup-menu';
import SplashScreen from 'react-native-splash-screen';
import firestore from '@react-native-firebase/firestore';
import {store} from './src/redux/store';
import {getDate} from './src/assets/DummyData/GetDate';
import StackNavigation from './src/navigation/StackNavigation';
import {SearchFlightData} from './src/assets/DummyData/SearchFlightData';
import {useIsFocused} from '@react-navigation/native';

function App() {
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = false;
  TextInput.defaultProps = TextInput.defaultProps || {};
  TextInput.defaultProps.allowFontScaling = false;
  LogBox.ignoreAllLogs(['Warning: ...']);
  LogBox.ignoreAllLogs();
  React.useEffect(() => {
    SplashScreen.hide();
    seatingArrange();
  });
  const functi = async () => {
    await firestore()
      .collection('AirlineSeatBookData')
      .doc('JaTwXgqSHSESiR6CDzdy')
      .get()
      .then(async data => {
        await firestore()
          .collection('AirlineSeatBookData')
          .doc('JaTwXgqSHSESiR6CDzdy')
          .update({
            AirlineSeatBookData: data
              .data()
              .AirlineSeatBookData.map((item, index) => {
                if (index === getDate().length - 1) {
                  return {
                    date: getDate()[getDate().length - 1].date,
                    day: getDate()[getDate().length - 1].day,
                    flightData: SearchFlightData.map((i, ind) => {
                      return {
                        flightData: i,
                        selectSeat: [],
                      };
                    }),
                  };
                }
                return data.data().AirlineSeatBookData[index + 1];
              }),
          });
      });
    // const date = getDate();
    // const addAllFlight = date.map((item, index) => {
    //   return {
    //     date: item.date,
    //     day: item.day,
    //     flightData: SearchFlightData.map((i, ind) => {
    //       return {
    //         flightData: i,
    //         selectSeat: [],
    //       };
    //     }),
    //   };
    // });
    // await firestore()
    //   .collection('AirlineSeatBookData')
    //   .doc('JaTwXgqSHSESiR6CDzdy')
    //   .update({
    //     AirlineSeatBookData: addAllFlight,
    //   });
  };
  const seatingArrange = async () => {
    if (
      new Date().toLocaleDateString('en-IN') !==
      (await firestore()
        .collection('AirlineSeatBookData')
        .doc('JaTwXgqSHSESiR6CDzdy')
        .get()
        .then(i => i.data().AirlineSeatBookData[0].date))
    ) {
      functi();
    }
  };
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
