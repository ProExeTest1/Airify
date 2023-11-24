import React, {useEffect} from 'react';
import {
  Alert,
  LogBox,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Provider, useSelector} from 'react-redux';
import {MenuProvider} from 'react-native-popup-menu';
import SplashScreen from 'react-native-splash-screen';
import firestore from '@react-native-firebase/firestore';
import {store} from './src/redux/store';
import {getDate} from './src/assets/DummyData/GetDate';
import StackNavigation from './src/navigation/StackNavigation';
import {SearchFlightData} from './src/assets/DummyData/SearchFlightData';

function App() {
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = false;
  TextInput.defaultProps = TextInput.defaultProps || {};
  TextInput.defaultProps.allowFontScaling = false;
  LogBox.ignoreAllLogs(['Warning: ...']);
  LogBox.ignoreAllLogs();
  useEffect(() => {
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
  };
  const seatingArrange = async () => {
    await firestore()
      .collection('AirlineSeatBookData')
      .doc('JaTwXgqSHSESiR6CDzdy')
      .get()
      .then(async item => {
        if (
          !getDate().every(
            (i, index) =>
              i.date == item.data().AirlineSeatBookData[index - 1].date,
          )
        ) {
          functi();
        } else if (
          item
            .data()
            .AirlineSeatBookData.every(
              i => i.date == getDate()[getDate().length - 1].date,
            )
        ) {
          const date = getDate();
          const addAllFlight = date.map((item, index) => {
            return {
              date: item.date,
              day: item.day,
              flightData: SearchFlightData.map((i, ind) => {
                return {
                  flightData: i,
                  selectSeat: [],
                };
              }),
            };
          });
          await firestore()
            .collection('AirlineSeatBookData')
            .doc('JaTwXgqSHSESiR6CDzdy')
            .update({
              AirlineSeatBookData: addAllFlight,
            });
        }
      });
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
