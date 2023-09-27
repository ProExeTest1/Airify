import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {color} from '../../helpers/ColorConstant';
import {fontSize, hp, statusBarHeight, wp} from '../../helpers/helper';
import {images} from '../../helpers/IconConstant';
import {CalendarList, LocaleConfig} from 'react-native-calendars';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {dateAction, depatureDateAction} from '../../redux/action/DateAction';

LocaleConfig.locales['fr'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan.',
    'Feb.',
    'Mar.',
    'Apr..',
    'May',
    'June',
    'July.',
    'Aug.',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.',
  ],
  dayNames: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  dayNamesShort: ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'],
  today: 'Today',
};

LocaleConfig.defaultLocale = 'fr';

const DatePickerScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState('');
  const [day, setDay] = useState();
  const [returnday, seReturnDay] = useState();

  const [year, setYear] = useState();
  const [returnyear, setReturnYear] = useState();
  const [press, setPress] = useState(false);
  const [returnPress, setReturnPress] = useState(false);
  const [returnDate, setReturnDate] = useState(false);
  const date = new Date(selected).toLocaleDateString('en-us', {
    weekday: 'short',
  });
  const dayname = date.split(',');
  const month = new Date(selected).toLocaleDateString('en-us', {
    month: 'short',
  });
  // Return date
  const returndate = new Date(returnDate).toLocaleDateString('en-us', {
    weekday: 'short',
  });
  const returndayname = returndate.split(',');
  const returnmonth = new Date(returnDate).toLocaleDateString('en-us', {
    month: 'short',
  });
  console.log(dayname, 'hello');
  const currentDate = new Date()
    .toLocaleDateString('en-us', {weekday: 'short'})
    .split(',');
  const newDate = currentDate[1].split('/');
  const currentMonth = new Date().toLocaleDateString('en-us', {month: 'short'});

  const onOkPress = () => {
    let tomorrow = new Date();
    tomorrow = moment(tomorrow).add(1, 'day').format('YYYY-MM-DD');
    let selectedDate = moment(selected).format('YYYY-MM-DD');
    let flag = 0;
    if (press) {
      for (let i = 1; i <= 10; i++) {
        let roungDate = moment(tomorrow).add(i, 'day').format('YYYY-MM-DD');
        if (selectedDate == roungDate) {
          flag = 1;
        }
      }
      if (flag === 1) {
        const date = new Date(selected).toLocaleDateString('en-us', {
          weekday: 'long',
        });
        const dayname = date.split(',');
        const finalDate = dayname[0] + ',' + month + ' ' + day + ' ' + year;
        dispatch(depatureDateAction(finalDate));
        dispatch(dateAction(selected));
        navigation.navigate('TabNavigation');
      } else {
        Alert.alert('Choose minimum 10 days');
      }
    } else {
      Alert.alert('Please choose date');
    }
  };
  return (
    <View>
      <View style={styles.headerViewStyle}>
        <SafeAreaView style={styles.safeHeaderViewStyle}>
          <TouchableOpacity
            style={styles.cancelButtonTouchStyle}
            onPress={() => navigation.goBack('')}>
            <Image
              source={images.cancel}
              style={styles.cancelButtonStyle}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTextStyle}>Select Date</Text>
          </View>
        </SafeAreaView>
      </View>
      <View style={styles.currentDateStyle}>
        <View style={styles.dateMainViewStyle}>
          <TouchableOpacity
            onPress={() => setReturnPress(false)}
            style={styles.dateViewStyle}>
            <Text style={styles.dateTextStyle}>
              {press
                ? `${dayname[0]}, ${month} ${day} ${year}`
                : `${currentDate[0]},${currentMonth} ${newDate[1]} ${newDate[2]}`}
            </Text>
          </TouchableOpacity>
          <Text>------</Text>
          <TouchableOpacity
            onPress={() => setReturnPress(true)}
            style={styles.ReturndateViewStyle}>
            <Text>
              {press && returnPress && returnday !== undefined
                ? `${returndayname[0]}, ${returnmonth} ${returnday} ${returnyear}`
                : '+ Return Date'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{height: hp(65)}}>
          <CalendarList
            animateScroll={true}
            style={styles.calenderStyle}
            onDayPress={day => {
              setPress(true);
              if (returnPress) {
                setReturnYear(day.year);
                seReturnDay(day.day);
                setReturnDate(day.dateString);
              } else {
                setSelected(day.dateString);
                setDay(day.day);
                setYear(day.year);
              }
            }}
            markedDates={{
              [selected]: {
                selected: true,
                selectedColor: color.commonBlue,
                disableTouchEvent: true,
                selectedDotColor: 'orange',
              },
            }}
          />
        </View>
      </View>
      <View
        style={{
          height: hp(12.31),
        }}>
        <TouchableOpacity style={styles.searchButtonStyle} onPress={onOkPress}>
          <Text style={styles.searchFontStyle}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DatePickerScreen;

const styles = StyleSheet.create({
  headerViewStyle: {
    backgroundColor: color.commonBlue,
    height: hp(13),
  },
  cancelButtonStyle: {
    height: hp(2),
    width: hp(2),
    tintColor: 'white',
  },
  headerTextStyle: {
    alignSelf: 'center',
    position: 'absolute',
    left: wp(22),
    fontSize: fontSize(25, 812),
    fontWeight: 'bold',
    color: 'white',
  },
  dateViewStyle: {
    borderRadius: 30,
    backgroundColor: color.commonBlue,
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(40),
    paddingVertical: hp(1.8),
    marginVertical: hp(2.2),
  },
  ReturndateViewStyle: {
    borderRadius: 30,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(40),
    paddingVertical: hp(1.8),
    marginVertical: hp(2.2),
  },
  dateTextStyle: {
    fontSize: fontSize(16, 812),
    fontWeight: '500',
    color: 'white',
  },
  safeHeaderViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
  },
  cancelButtonTouchStyle: {
    marginLeft: wp(7),
    marginTop: hp(3),
  },
  currentDateStyle: {
    width: wp(95),
    alignSelf: 'center',
  },
  searchButtonStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: wp(84),
    height: hp(7),
    borderRadius: 16,
    backgroundColor: 'blue',
    marginVertical: hp(1.2),
  },
  searchFontStyle: {
    fontSize: fontSize(20, 812),
    color: 'white',
    fontWeight: 'bold',
  },
  dateMainViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
