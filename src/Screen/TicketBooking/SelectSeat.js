import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CommonHeader} from '../../components';
import {strings} from '../../helper/Strings';
import {Images} from '../../helper/IconConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import {color} from '../../helper/ColorConstant';
import {useDispatch, useSelector} from 'react-redux';
import {airlineCity} from '../../assets/DummyData/AirlineCity';
import firestore from '@react-native-firebase/firestore';
import {SelectSeatActionData} from '../../redux/action/SelectSeatAction';
import {AlertConstant} from '../../helper/AlertConstant';
import moment from 'moment';

const SelectSeat = ({navigation, route}) => {
  const tripType = route?.params?.TripType;
  console.log(tripType, 'trip type');
  const temp = useSelector(e => e.SelectSeatData.SelectSeatData);
  const searchFlightCardData = useSelector(
    state => state.searchFlight.searchFlightCardData,
  );
  const dispatch = useDispatch();
  const searchFlightData = useSelector(e => e?.place?.searchFlightData);
  const SelectDate = useSelector(e => e.date.depatureDate);

  const [FirebaseData, setFirebaseData] = useState({});
  const [seatData, setseatData] = useState(temp);
  const [OccuiedData, setOccuiedData] = useState([]);

  const date = useSelector(e => e.date.normalDate);
  const [seatNameData, setseatNameData] = useState(temp[0]);
  const setSelectSeat = seat => {
    setseatData(
      seatData.map(i => {
        if (i.name === seatNameData.name) {
          return {
            name: i.name,
            seatNo: seat,
          };
        }
        return i;
      }),
    );
  };
  const getFirebaseData = async () => {
    await firestore()
      .collection('AirlineSeatBookData')
      .onSnapshot(querySnapshot => {
        const users = [];

        querySnapshot?.forEach(documentSnapshot => {
          users.push({
            ...documentSnapshot.data(),
          });
        });
        console.log(users, 'users');
        const setAllData = users[0]?.AirlineSeatBookData?.find(
          i => i?.date == date?.date,
        );
        console.log(setAllData, 'setAllData1');
        setFirebaseData(setAllData);
        setOccuiedData(
          setAllData?.flightData?.find(i => {
            return (
              i.flightData.airlineName == searchFlightCardData.airlineName &&
              i.flightData.lendTime == searchFlightCardData.lendTime &&
              i.flightData.pickTime == searchFlightCardData.pickTime &&
              i.flightData.price == searchFlightCardData.price &&
              i.flightData.stop == searchFlightCardData.stop &&
              i.flightData.totalHours == searchFlightCardData.totalHours
            );
          }).selectSeat,
        );

        setseatData(
          seatData?.map(item => {
            if (OccuiedData?.some(i => item.seatNo === i)) {
              AlertConstant(
                `your selected seat ${item?.seatNo} is already book`,
              );
            } else if (OccuiedData?.some(i => item.seatNo === i)) {
              return {
                name: item?.name,
                seatNo: false,
              };
            }
            return item;
          }),
        );
      });
  };
  const setSeat = async () => {
    const selectedSeat = seatData?.filter(i => i.seatNo).map(e => e.seatNo);
    if (selectedSeat?.length === seatData?.length) {
      dispatch(SelectSeatActionData(seatData));
      setseatData([]);
      navigation?.navigate('FillPassengerDetails', {TripType: tripType});
    } else {
      AlertConstant('please select seat');
    }
  };

  useEffect(() => {
    getFirebaseData();
  }, []);
  return (
    <View style={{flex: 1}}>
      <CommonHeader
        headerName={
          tripType === 'Round-Trip'
            ? `${strings.selectSeat} (Departure)`
            : strings.selectSeat
        }
        navigation1={() => {
          navigation.goBack();
        }}
        navigation2={() => {}}
        Images1Color={'#fff'}
        Images2Color={null}
        onPress1={true}
        onPress2={false}
        Images1={Images.backIcon}
        Images2={null}
      />
      <View style={styles.selectSeatHeaderBody}>
        <FlatList
          data={seatData}
          bounces={false}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => setseatNameData(item)}
              style={[
                styles.FlatListBody,
                {
                  marginStart: index === 0 ? wp(6) : wp(0),
                  borderWidth: seatNameData?.name === item?.name ? 2 : 0,
                  borderColor:
                    seatNameData?.name === item?.name ? '#f4562a' : null,
                },
              ]}>
              <View style={styles.FlatListNumberBody}>
                <Text style={styles.FlatListNumber}>{index + 1}</Text>
              </View>
              <View style={{flex: 1}}>
                <Text numberOfLines={1} style={styles.FlatListTitle}>
                  {item?.name}
                </Text>
                <Text style={styles.FlatListSubTitle}>
                  {item?.seatNo ? item?.seatNo : 'No Selection'}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={{flex: 1, paddingHorizontal: wp(6)}}>
          <View style={styles.searchFlightBody}>
            <View
              style={[
                styles.flightLogo,
                {backgroundColor: searchFlightCardData?.logo},
              ]}></View>
            <View style={{flex: 1}}>
              <Text style={styles.flightName} numberOfLines={1}>
                {searchFlightCardData?.airlineName}
              </Text>
              <Text style={styles.flightLendText} numberOfLines={1}>
                {searchFlightData?.to} to {searchFlightData?.from}
              </Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Text style={styles.flightName} numberOfLines={1}>
                {searchFlightCardData?.pickTime} -{' '}
                {searchFlightCardData?.lendTime}
              </Text>
              <Text style={styles.flightLendText} numberOfLines={1}>
                {SelectDate?.split(',')[0]?.slice(0, 3)},
                {SelectDate?.split(',')[1]}
              </Text>
            </View>
          </View>
          <View style={styles.showTypeOpsBody}>
            <View style={styles.selectedBody}>
              <View
                style={[
                  styles.selectedIcon,
                  {backgroundColor: color.commonBlue},
                ]}></View>
              <Text>Selected</Text>
            </View>
            <View style={styles.selectedBody}>
              <View
                style={[
                  styles.selectedIcon,
                  {backgroundColor: '#8596b3'},
                ]}></View>
              <Text>Occupied</Text>
            </View>
            <View style={styles.selectedBody}>
              <View
                style={[
                  styles.selectedIcon,
                  {backgroundColor: '#cdd0d6'},
                ]}></View>
              <Text>Available</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              paddingVertical: hp(1),
            }}>
            {airlineCity?.map(i => {
              return (
                <View style={styles.seatRowNumber}>
                  <View style={styles.seatButHeader}>
                    <Text style={styles.seatRowNumberText}>{i.title}</Text>
                  </View>
                  <FlatList
                    data={i?.city}
                    scrollEnabled={false}
                    renderItem={({item, index}) => (
                      <View style={styles.seatButBody}>
                        {i?.number ? (
                          <View style={styles.seatBut}>
                            <Text>{item}</Text>
                          </View>
                        ) : (
                          <TouchableOpacity
                            disabled={
                              OccuiedData?.some(i => i === item) ? true : false
                            }
                            onPress={() => {
                              seatData?.some(i => i.seatNo === item)
                                ? null
                                : setSelectSeat(item);
                            }}
                            style={[
                              styles.seatBut,
                              {
                                backgroundColor: seatData?.some(
                                  i => i.seatNo === item,
                                )
                                  ? color.commonBlue
                                  : OccuiedData?.some(i => i === item)
                                  ? '#8596b3'
                                  : '#cdd0d6',
                              },
                            ]}>
                            {seatData?.some(i => i?.seatNo === item) ? (
                              <Image
                                style={{height: wp(7), width: wp(7)}}
                                source={Images.doneIcon}
                              />
                            ) : (
                              <Text
                                style={[
                                  styles.seatRowNumberText,
                                  {
                                    color: OccuiedData?.some(i => i === item)
                                      ? '#fff'
                                      : color.commonBlue,
                                  },
                                ]}>
                                {item}
                              </Text>
                            )}
                          </TouchableOpacity>
                        )}
                      </View>
                    )}
                  />
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomButtonBody}>
        <View style={{flex: 1}}>
          <Text style={styles.SeatText}>Seat</Text>
          <Text style={styles.seatNumberText} numberOfLines={1}>
            {seatData
              ?.filter(i => i.seatNo)
              ?.map(e => e.seatNo)
              ?.toString()}
          </Text>
        </View>
        <View style={{flex: 2.5}}>
          <TouchableOpacity style={styles.okButton} onPress={() => setSeat()}>
            <Text style={styles.okButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SelectSeat;

const styles = StyleSheet.create({
  selectSeatHeaderBody: {
    height: hp(10),
    backgroundColor: color.commonBlue,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: hp(1),
    paddingBottom: hp(2),
  },
  FlatListBody: {
    flexDirection: 'row',
    width: wp(38),
    marginEnd: wp(4),
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: wp(3),
    alignItems: 'center',
  },
  FlatListNumberBody: {
    backgroundColor: color.commonBlue,
    height: wp(7),
    width: wp(7),
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: wp(3),
  },
  FlatListNumber: {
    color: '#fff',
    fontSize: fontSize(16),
    fontWeight: 'bold',
  },
  FlatListTitle: {
    color: color.commonBlue,
    fontSize: fontSize(18),
    fontWeight: 'bold',
    marginBottom: hp(0.5),
  },
  FlatListSubTitle: {
    color: color.commonBlue,
    fontSize: fontSize(13),
  },
  bottomButtonBody: {
    backgroundColor: '#fff',
    paddingHorizontal: wp(6),
    paddingTop: hp(2),
    paddingBottom: hp(4),
    flexDirection: 'row',
  },
  SeatText: {
    marginBottom: hp(0.5),
    fontSize: fontSize(13),
  },
  seatNumberText: {
    fontSize: fontSize(19),
    fontWeight: 'bold',
  },
  okButton: {
    backgroundColor: color.commonBlue,
    paddingVertical: hp(2),
    alignItems: 'center',
    borderRadius: 10,
  },
  okButtonText: {
    fontSize: fontSize(18),
    fontWeight: '500',
    color: '#fff',
  },
  searchFlightBody: {
    paddingVertical: hp(2.5),
    borderBlockColor: color.grayLight,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  flightLogo: {
    height: wp(7.5),
    width: wp(7.5),

    borderRadius: 50,
    marginEnd: wp(4),
  },
  flightName: {
    color: color.black,
    fontSize: fontSize(18),
    fontWeight: '500',
    marginBottom: hp(0.8),
  },
  flightLendText: {
    color: color.darkLight,
  },
  showTypeOpsBody: {
    paddingVertical: hp(2),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(5),
  },
  selectedBody: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    // marginHorizontal: wp(3),
  },
  selectedIcon: {
    marginEnd: wp(3),
    height: wp(4),
    width: wp(4),
    borderRadius: 2,
  },
  seatRowNumber: {
    flex: 1,
    alignItems: 'center',
  },
  seatRowNumberText: {
    fontSize: fontSize(17),
    fontWeight: 'bold',
  },
  seatButBody: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: hp(1),
  },
  seatBut: {
    height: wp(14),
    width: wp(14),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  seatButHeader: {
    height: hp(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
