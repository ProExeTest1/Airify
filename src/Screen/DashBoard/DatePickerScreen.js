import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {CalendarList, LocaleConfig} from 'react-native-calendars';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {PickerHeaderBar} from '../../components';
import {color} from '../../helper/ColorConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import {useDispatch, useSelector} from 'react-redux';
import {
  dateAction,
  depatureDateAction,
  returnDateAction,
  returnNormalDateAction,
} from '../../redux/action/DateAction';
import {AlertConstant} from '../../helper/AlertConstant';

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
  const dispatch = useDispatch();
  const reduxDepatureDate = useSelector(state => state?.date?.normalDate);
  const [day, setDay] = useState();
  const [year, setYear] = useState();
  const returndata = route?.params?.return;
  const [press, setPress] = useState(false);
  const [returnday, seReturnDay] = useState();
  const [selected, setSelected] = useState('');
  const [returnyear, setReturnYear] = useState();
  const [returnDate, setReturnDate] = useState(false);
  const [returnPress, setReturnPress] = useState(false);
  useEffect(() => {
    if (returndata == 'returnDate') {
      setReturnPress(true);
    }
  }, []);

  const date = new Date(selected).toLocaleDateString('en-IN', {
    weekday: 'short',
  });
  const dayname = date.split(',');
  const month = new Date(selected).toLocaleDateString('en-IN', {
    month: 'short',
  });

  // Return date

  const returndate = new Date(returnDate).toLocaleDateString('en-IN', {
    weekday: 'short',
  });
  const returndayname = returndate?.split(',');
  const returnmonth = new Date(returnDate).toLocaleDateString('en-IN', {
    month: 'short',
  });

  const currentDate = new Date()
    .toLocaleDateString('en-IN', {weekday: 'short'})
    .split(',');

  let newDate1 = new Date();
  const newDate = moment(newDate1).format('YYYY-MM-DD').split('-');

  const currentMonth = new Date().toLocaleDateString('en-IN', {month: 'short'});

  // When user press on Ok button it will navigate to home screen and store date data in redux

  const onOkPress = () => {
    let tomorrow = new Date();
    tomorrow = moment(tomorrow).add(1, 'day').format('YYYY-MM-DD');
    let selectedDate = moment(selected).format('MM/DD/YYYY');
    let selectedreturnDate = moment(returnDate).format('MM/DD/YYYY');
    let flag = 0;
    let flag2 = 0;
    //Condition for date vallidation

    if (press) {
      for (let i = 0; i <= 8; i++) {
        let roundDate = moment(tomorrow).add(i, 'day').format('MM/DD/YYYY');
        if (selectedDate == roundDate) {
          flag = 1;
        }
      }
      // For return choose return date
      if (returndata == 'returnDate') {
        for (let i = 1; i <= 10; i++) {
          var da = moment(reduxDepatureDate?.date, 'DD/MM/YYYY');
          let roundDate = moment(da).add(i, 'day').format('MM/DD/YYYY');
          if (selectedreturnDate == roundDate) {
            flag2 = 1;
          }
        }
        if (flag2 === 1) {
          const date = new Date(returnDate).toLocaleDateString('en-IN', {
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
        } else {
          AlertConstant('Invalid Return Date');
        }
      } else if (flag === 1) {
        const date = new Date(selected).toLocaleDateString('en-IN', {
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
        AlertConstant('Choose maximum 10 days from the today');
      }
    } else {
      AlertConstant('Please choose date');
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
          <Text style={styles.returnDateTextStyle}>------</Text>
          <View
            style={[
              styles.ReturndateViewStyle,
              {paddingHorizontal: returnPress && press ? wp(6) : wp(7)},
            ]}>
            <Text style={styles.returnDateTextStyle}>
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
                disableTouchEvent: true,
                selectedDotColor: 'orange',
                selectedColor: color.commonBlue,
              },
              [returnDate]: {
                selected: true,
                disableTouchEvent: true,
                selectedDotColor: 'orange',
                selectedColor: color.commonBlue,
              },
            }}
          />
        </View>
      </View>
      <View style={styles.bottomViewStyle}>
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
    width: wp(40),
    borderRadius: 30,
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: color.commonBlue,
    justifyContent: 'center',
    paddingHorizontal: wp(6),
    paddingVertical: hp(1.8),
    marginVertical: hp(2.2),
  },
  ReturndateViewStyle: {
    width: wp(40),
    borderWidth: 1,
    borderRadius: 30,
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 1,
    marginVertical: hp(2.2),
    justifyContent: 'center',
    paddingVertical: hp(1.8),
  },
  dateTextStyle: {
    fontWeight: '500',
    color: color.white,
    fontSize: fontSize(16, 812),
  },
  currentDateStyle: {
    marginHorizontal: wp(2.5),
    alignSelf: 'center',
  },
  searchButtonStyle: {
    alignItems: 'center',
    marginHorizontal: wp(5),
    paddingVertical: hp(2),
    height: hp(7),
    width: wp(84),
    borderRadius: 16,
    alignSelf: 'center',
    backgroundColor: 'blue',
    marginVertical: hp(2.5),
    justifyContent: 'center',
  },
  searchFontStyle: {
    fontWeight: 'bold',
    color: color.white,
    fontSize: fontSize(20, 812),
  },
  dateMainViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  returnDateTextStyle: {
    color: 'black',
    fontSize: fontSize(16, 812),
    fontWeight: '500',
  },
  bottomViewStyle: {
    height: hp(12.31),
  },
});
