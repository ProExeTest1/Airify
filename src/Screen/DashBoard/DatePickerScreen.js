import {
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
  const [selected, setSelected] = useState('');
  const [day, setDay] = useState();
  const [year, setYear] = useState();
  const [press, setPress] = useState(false);
  const [returnDate, setReturnDate] = useState(false);
  const date = new Date(selected).toLocaleDateString('en-us', {
    weekday: 'short',
  });
  const dayname = date.split(',');
  const month = new Date(selected).toLocaleDateString('en-us', {
    month: 'short',
  });
  const currentDate = new Date()
    .toLocaleDateString('en-us', {weekday: 'short'})
    .split(',');
  const newDate = currentDate[1].split('/');
  const currentMonth = new Date().toLocaleDateString('en-us', {month: 'short'});
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity style={styles.dateViewStyle}>
            <Text style={styles.dateTextStyle}>
              {press
                ? `${dayname[0]}, ${month} ${day} ${year}`
                : `${currentDate[0]},${currentMonth} ${newDate[1]} ${newDate[2]}`}
            </Text>
          </TouchableOpacity>
          <Text>------</Text>
          <TouchableOpacity style={styles.ReturndateViewStyle}>
            <Text>+ Return Date</Text>
          </TouchableOpacity>
        </View>

        <CalendarList
          animateScroll={true}
          style={styles.calenderStyle}
          onDayPress={day => {
            setSelected(day.dateString);
            setDay(day.day);
            setYear(day.year);
            setPress(true);
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
});
