import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {color} from '../../helper/ColorConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import {images} from '../../helper/IconConstant';
import {CalendarList, LocaleConfig} from 'react-native-calendars';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {
  dateAction,
  depatureDateAction,
  returnDateAction,
  returnNormalDateAction,
} from '../../redux/action/DateAction';
import {PickerHeaderBar} from '../../components';

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

const DatePickerScreen = ({navigation, route}) => {
  const returndata = route?.params?.return;
  const dispatch = useDispatch();
  const [selected, setSelected] = useState('');
  const [day, setDay] = useState();
  const [returnday, seReturnDay] = useState();
  const [year, setYear] = useState();
  const [returnyear, setReturnYear] = useState();
  const [press, setPress] = useState(false);
  const [returnPress, setReturnPress] = useState(false);
  const [returnDate, setReturnDate] = useState(false);
  useEffect(() => {
    if (returndata == 'returnDate') {
      setReturnPress(true);
    }
  }, []);
  console.log(returnPress);
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

  const currentDate = new Date()
    .toLocaleDateString('en-us', {weekday: 'short'})
    .split(',');

  let newDate1 = new Date();
  const newDate = moment(newDate1).format('YYYY-MM-DD').split('-');

  const currentMonth = new Date().toLocaleDateString('en-us', {month: 'short'});

  const onOkPress = () => {
    let tomorrow = new Date();
    tomorrow = moment(tomorrow).add(1, 'day').format('YYYY-MM-DD');
    let selectedDate = moment(selected).format('MM/DD/YYYY');
    let selectedreturnDate = moment(returnDate).format('MM/DD/YYYY');
    let flag = 0;
    if (press) {
      for (let i = 0; i <= 10; i++) {
        let roundDate = moment(tomorrow).add(i, 'day').format('MM/DD/YYYY');
        if (selectedDate == roundDate || selectedreturnDate == roundDate) {
          flag = 1;
        }
      }
      if (flag === 1 && returndata == 'returnDate') {
        const date = new Date(returnDate).toLocaleDateString('en-us', {
          weekday: 'long',
        });
        const dayname = date.split(',');
        const finalDate =
          dayname[0] + ',' + returnmonth + ' ' + returnday + ' ' + returnyear;
        dispatch(returnDateAction(finalDate));
        let selectedDate = moment(returnDate).format('D/M/YYYY');
        let choosenDate = {
          date: selectedDate,
          day: dayname[0],
        };
        dispatch(returnNormalDateAction(choosenDate));
        navigation.navigate('TabNavigation');
      } else if (flag === 1) {
        const date = new Date(selected).toLocaleDateString('en-us', {
          weekday: 'long',
        });
        const dayname = date.split(',');
        const finalDate = dayname[0] + ',' + month + ' ' + day + ' ' + year;
        dispatch(depatureDateAction(finalDate));
        let selectedDate = moment(selected).format('D/M/YYYY');
        let choosenDate = {
          date: selectedDate,
          day: dayname[0],
        };
        dispatch(dateAction(choosenDate));
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
      <PickerHeaderBar
        headerName={'Select Date'}
        navigation={() => navigation.goBack('')}
      />
      <View style={styles.currentDateStyle}>
        <View style={styles.dateMainViewStyle}>
          <View style={styles.dateViewStyle}>
            <Text style={styles.dateTextStyle}>
              {press && !returnPress
                ? `${dayname[0]}, ${month} ${day} ${year}`
                : `${currentDate[0]},${currentMonth} ${newDate[2]} ${newDate[0]}`}
            </Text>
          </View>
          <Text>------</Text>
          <View style={styles.ReturndateViewStyle}>
            <Text>
              {press && returnPress && returnday !== undefined
                ? `${returndayname[0]}, ${returnmonth} ${returnday} ${returnyear}`
                : '+ Return Date'}
            </Text>
          </View>
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
              [returnDate]: {
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
