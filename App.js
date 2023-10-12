import React, {useEffect} from 'react';
import StackNavigation from './src/navigation/StackNavigation';
import {MenuProvider} from 'react-native-popup-menu';
import {store} from './src/redux/store';
import {
  LogBox,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {getDate} from './src/assets/DummyData/GetDate';
import {SearchFlightData} from './src/assets/DummyData/SearchFlightData';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
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
  });
  const getArrayFromFireStore = async () => {
    const dd = await firestore()
      .collection('AirlineSeatBookData')
      .doc('JaTwXgqSHSESiR6CDzdy')
      .get()
      .then(i => i.data().AirlineSeatBookData);
  };
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
                console.log(index);
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

  useEffect(async () => {
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
  });

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
