import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  FlatList,
} from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {
  dateAction,
  returnNormalDateAction,
} from '../../redux/action/DateAction';
import {useSelector} from 'react-redux';
import {Images} from '../../helper/IconConstant';

import {fontSize, hp, wp} from '../../helper/Constant';
import {getDate} from '../../assets/DummyData/GetDate';
import moment from 'moment';

const SearchFlightsHeader = ({
  onShare,
  dispatch,
  SelectDate,
  navigation,
  setSelectDate,
  setModalVisible1,
  headerName,
  tripType,
}) => {
  const strings = useSelector(state => state?.languageReducer?.languageObject);

  const searchFlightData = useSelector(e =>
    tripType === 'Round-trip'
      ? e?.searchFlight?.searchFlightReturnData
      : e?.place?.searchFlightData,
  );
  const color = useSelector(state => state?.themereducer?.colorTheme);
  const styles = ThemeStyle(color);
  return (
    <View style={styles.header}>
      <View style={styles.headerNevBody}>
        <View style={styles.headerTitleBody}>
          <Text style={styles.headerTitle}>{headerName}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.BackImg} source={Images.backIcon} />
        </TouchableOpacity>
        <Menu>
          <MenuTrigger>
            <Image
              style={styles.BackImg}
              source={Images.menuIcon}
              resizeMode="contain"
            />
          </MenuTrigger>
          <MenuOptions style={styles.dropdownBody}>
            <MenuOption onSelect={() => onShare()}>
              <View
                style={[
                  styles.dropdownList,
                  {borderBottomWidth: 2, borderColor: color.grey},
                ]}>
                <Image style={styles.dropdownIcon} source={Images.shareIcon} />
                <Text style={styles.dropdownText}>{strings.shareResult}</Text>
              </View>
            </MenuOption>
            <MenuOption onSelect={() => setModalVisible1(true)}>
              <View style={styles.dropdownList}>
                <Image style={styles.dropdownIcon} source={Images.bell} />
                <Text style={styles.dropdownText}>{strings.priceAlerts}</Text>
              </View>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
      <View style={styles.headerNevBody}>
        <View style={styles.FlightsPlaseBody}>
          <Text style={styles.FlightsPlaseNicName}>
            {searchFlightData?.fromShortform}
          </Text>
          <Text style={styles.FlightsPlaseName} numberOfLines={1}>
            {searchFlightData?.from}
          </Text>
        </View>
        <View style={styles.FlightsPlaseImgBody}>
          <Image
            style={styles.FlightsPlaseImg}
            source={Images.airplaneBlueIcon}
          />
          <Text style={styles.FlightsPlaseImgText}>
            {searchFlightData?.passenger} .{' '}
            {searchFlightData?.class?.replace(' Class', '')}
          </Text>
        </View>
        <View style={[styles.FlightsPlaseBody, {alignItems: 'flex-end'}]}>
          <Text style={styles.FlightsPlaseNicName}>
            {searchFlightData?.toShortform}
          </Text>
          <Text style={styles.FlightsPlaseName} numberOfLines={1}>
            {searchFlightData?.to}
          </Text>
        </View>
      </View>
      <View style={styles.dateListBody}>
        <View style={styles.dateIconBody}>
          <Image style={styles.dateIcon} source={Images.calendar}></Image>
        </View>
        <View style={styles.dateline}></View>
        <FlatList
          bounces={false}
          data={getDate()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectDate(item);
                  if (tripType === 'Round-trip') {
                    dispatch(returnNormalDateAction(item));
                  } else {
                    dispatch(dateAction(item));
                  }
                }}
                style={[
                  styles.dateIconBody,
                  {
                    backgroundColor:
                      item?.date === SelectDate?.date ? '#fff' : '#295dff',
                  },
                ]}>
                <Text
                  style={[
                    styles.date,
                    {
                      color:
                        item?.date === SelectDate?.date ? '#295dff' : '#fff',
                    },
                  ]}>
                  {moment(item.date, 'D/M/YYYY').date()}
                </Text>
                <Text
                  style={{
                    color: item?.date === SelectDate?.date ? '#295dff' : '#fff',
                  }}>
                  {item.day.slice(0, 3)}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

const ThemeStyle = color =>
  StyleSheet.create({
    header: {
      backgroundColor: '#295dff',
      paddingTop: Platform.OS === 'ios' ? hp(6) : hp(2),
    },
    headerNevBody: {
      marginBottom: hp(3),
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: wp(4),
      justifyContent: 'space-between',
    },
    BackImg: {
      width: hp(3),
      height: hp(3),
      tintColor: '#fff',
    },
    headerTitleBody: {
      width: wp(100),
      position: 'absolute',
      alignItems: 'center',
    },
    headerTitle: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: fontSize(22),
    },
    FlightsPlaseNicName: {
      color: '#fff',
      fontWeight: 'bold',
      marginBottom: hp(1.5),
      fontSize: fontSize(22),
    },
    FlightsPlaseName: {
      color: '#fff',
    },
    FlightsPlaseBody: {
      width: wp(24),
      paddingHorizontal: wp(4),
    },
    FlightsPlaseImgBody: {
      flex: 1,
      alignItems: 'center',
    },
    FlightsPlaseImg: {
      width: hp(20),
      height: hp(5.5),
    },
    FlightsPlaseImgText: {
      color: '#fff',
      fontSize: fontSize(14),
    },
    dateListBody: {
      paddingStart: wp(8),
      flexDirection: 'row',
      paddingBottom: hp(3),
    },
    dateIconBody: {
      width: hp(7),
      height: hp(7),
      borderWidth: 1,
      borderRadius: 10,
      marginEnd: wp(2.5),
      borderColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    dateIcon: {
      width: hp(3.2),
      height: hp(3.2),
      tintColor: '#fff',
    },
    dateline: {
      borderWidth: 0.5,
      marginEnd: wp(2.5),
      borderColor: '#fff',
    },
    date: {
      fontWeight: 'bold',
      marginBottom: hp(0.3),
      fontSize: fontSize(18),
    },
    dropdownBody: {
      top: wp(10),
      width: wp(50),
      borderRadius: 10,
      position: 'absolute',
      backgroundColor: color.white,
    },
    dropdownList: {
      paddingStart: wp(3),
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: hp(1.5),
    },
    dropdownIcon: {
      width: wp(6.5),
      height: wp(6.5),
      marginEnd: wp(4),
      tintColor: color.black,
    },
    dropdownText: {
      fontWeight: '500',
      fontSize: fontSize(18),
      color: color.black,
    },
  });

export default SearchFlightsHeader;
