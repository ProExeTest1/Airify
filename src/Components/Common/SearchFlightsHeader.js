import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {fontSize, hp, wp} from '../../helper/Constant';
import {Images} from '../../helper/IconConstant';
import {getDate} from '../../assets/DummyData/GetDate';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {dateAction} from '../../redux/action/DateAction';
import {useDispatch, useSelector} from 'react-redux';

const SearchFlightsHeader = ({
  SelectDate,
  setSelectDate,
  onShare,
  dispatch,
  setModalVisible1,
  navigation,
}) => {
  const searchFlightData = useSelector(e => e?.place?.searchFlightData);
  return (
    <View style={styles.header}>
      <View style={styles.headerNevBody}>
        <View style={styles.headerTitleBody}>
          <Text style={styles.headerTitle}>Search Flights</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.BackImg} source={Images.backIcon} />
        </TouchableOpacity>
        <Menu>
          <MenuTrigger>
            <Image style={styles.BackImg} source={Images.menuIcon} />
          </MenuTrigger>
          <MenuOptions style={styles.dropdownBody}>
            <MenuOption onSelect={() => onShare()}>
              <View
                style={[
                  styles.dropdownList,
                  {borderBottomWidth: 2, borderColor: '#e2e2e2'},
                ]}>
                <Image style={styles.dropdownIcon} source={Images.shareIcon} />
                <Text style={styles.dropdownText}>Share Results</Text>
              </View>
            </MenuOption>
            <MenuOption onSelect={() => setModalVisible1(true)}>
              <View style={styles.dropdownList}>
                <Image style={styles.dropdownIcon} source={Images.bell} />
                <Text style={styles.dropdownText}>Price Alerts</Text>
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
          <Text style={styles.FlightsPlaseName}>{searchFlightData?.from}</Text>
        </View>
        <View style={styles.FlightsPlaseImgBody}>
          <Image
            style={styles.FlightsPlaseImg}
            source={Images.airplaneBlueIcon}
          />
          <Text style={styles.FlightsPlaseImgText}>
            {searchFlightData?.passenger} .{' '}
            {searchFlightData?.class.replace(' Class', '')}
          </Text>
        </View>
        <View style={[styles.FlightsPlaseBody, {alignItems: 'flex-end'}]}>
          <Text style={styles.FlightsPlaseNicName}>
            {searchFlightData?.toShortform}
          </Text>
          <Text style={styles.FlightsPlaseName}>{searchFlightData?.to}</Text>
        </View>
      </View>
      <View style={styles.dateListBody}>
        <View style={styles.dateIconBody}>
          <Image style={styles.dateIcon} source={Images.calendar}></Image>
        </View>
        <View style={styles.dateline}></View>
        <FlatList
          data={getDate()}
          bounces={false}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => {
                setSelectDate(item);
                dispatch(dateAction(item));
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
                  {color: item?.date === SelectDate?.date ? '#295dff' : '#fff'},
                ]}>
                {item.date.split('/')[0]}
              </Text>
              <Text
                style={{
                  color: item?.date === SelectDate?.date ? '#295dff' : '#fff',
                }}>
                {item.day.slice(0, 3)}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#295dff',
    paddingTop: Platform.OS === 'ios' ? hp(6) : hp(2),
  },
  headerNevBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    alignItems: 'center',
    marginBottom: hp(3),
  },
  BackImg: {
    height: wp(8),
    width: wp(8),
  },
  headerTitleBody: {
    position: 'absolute',
    width: wp(100),
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: fontSize(22),
    fontWeight: 'bold',
  },
  FlightsPlaseNicName: {
    fontSize: fontSize(22),
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: hp(1.5),
  },
  FlightsPlaseName: {
    color: '#fff',
  },
  FlightsPlaseBody: {
    width: wp(24),
    paddingHorizontal: wp(4),
  },
  FlightsPlaseImgBody: {
    alignItems: 'center',
    flex: 1,
  },
  FlightsPlaseImg: {
    height: hp(5.5),
    width: hp(20),
  },
  FlightsPlaseImgText: {
    color: '#fff',
    fontSize: fontSize(14),
  },
  dateListBody: {
    flexDirection: 'row',
    paddingStart: wp(8),
    paddingBottom: hp(3),
  },
  dateIconBody: {
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    height: hp(7),
    width: hp(7),
    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: wp(2.5),
  },
  dateIcon: {
    tintColor: '#fff',
    height: hp(3.2),
    width: hp(3.2),
  },
  dateline: {
    borderColor: '#fff',
    borderWidth: 0.5,
    marginEnd: wp(2.5),
  },
  date: {
    fontSize: fontSize(18),
    fontWeight: 'bold',
    marginBottom: hp(0.3),
  },
  dropdownBody: {
    position: 'absolute',
    backgroundColor: '#fff',
    top: wp(10),
    borderRadius: 10,
    width: wp(50),
  },
  dropdownList: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.5),
    paddingStart: wp(3),
  },
  dropdownIcon: {
    height: wp(6.5),
    width: wp(6.5),
    marginEnd: wp(4),
  },
  dropdownText: {
    fontSize: fontSize(18),
    fontWeight: '500',
  },
});

export default SearchFlightsHeader;
