import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {strings} from '../../helper/Strings';
import {CardList, CommonHeader, TicketList} from '../../components';
import {color} from '../../helper/ColorConstant';
import {Images} from '../../helper/IconConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {bookingTransactionData} from '../../redux/action/BookingAction';

const BookingsScreen = ({navigation}) => {
  const [selectedData, setSelectedData] = useState('Active');
  const [activeData, setActiveData] = useState([]);
  const [completedData, setCompletedData] = useState([]);
  const [canceledData, setCanceledData] = useState([]);
  const dispatch = useDispatch();
  const getBookingsData = async () => {
    await firestore()
      .collection('SaveTicket')
      .onSnapshot(querySnapshot => {
        querySnapshot?.forEach(documentSnapshot => {
          if (documentSnapshot.id == auth().currentUser.uid) {
            let DepartureData = documentSnapshot.data()?.SaveTicket.map(i => {
              if (i.Departure) {
                return {...i.Departure, type: 'Departure', id: i.id};
              }
            });
            let ReturnData = documentSnapshot.data()?.SaveTicket.map(i => {
              if (i.Return) {
                return {...i.Return, type: 'Return', id: i.id};
              }
              return undefined;
            });
            const allData = [DepartureData, ReturnData.filter(i => i)].flat();

            setActiveData(
              allData.filter(i => {
                return (
                  Date.now() <=
                  new Date(
                    moment(
                      `${i.searchFlightDateData[1]} ${Number(
                        i.searchFlightCardData?.pickTime.split(':')[0],
                      )}:${Number(
                        i.searchFlightCardData?.pickTime.split(':')[1],
                      )}:00`,
                      'MMM DD YYYY HH:mm:ss',
                    ).format('YYYY-MM-DD HH:mm:ss'),
                  ).valueOf()
                );
              }),
            );
            setCompletedData(
              allData.filter(i => {
                return (
                  Date.now() >=
                  new Date(
                    moment(
                      `${i.searchFlightDateData[1]} ${Number(
                        i.searchFlightCardData?.pickTime.split(':')[0],
                      )}:${Number(
                        i.searchFlightCardData?.pickTime.split(':')[1],
                      )}:00`,
                      'MMM DD YYYY HH:mm:ss',
                    ).format('YYYY-MM-DD HH:mm:ss'),
                  ).valueOf()
                );
              }),
            );
          }
        });
      });
  };
  const setCartFlightData = i => {
    dispatch(bookingTransactionData(i));
    selectedData == 'Canceled'
      ? null
      : navigation.navigate('BookingTransactionDetails', {
          header: selectedData,
        });
  };
  const getBookingCancelData = async () => {
    await firestore()
      .collection('BookingCancel')
      .onSnapshot(querySnapshot => {
        querySnapshot?.forEach(documentSnapshot => {
          if (documentSnapshot.id == auth().currentUser.uid) {
            setCanceledData(documentSnapshot.data().BookingCancel);
          }
        });
      });
  };
  useEffect(() => {
    getBookingsData();
    getBookingCancelData();
  }, []);
  return (
    <View style={styles.container}>
      <CommonHeader
        onPress1={false}
        onPress2={false}
        Images2={Images.search}
        Images1={Images.planIcon}
        Images2Color={color.white}
        headerName={strings.bookings}
      />
      <View style={{flex: 1, paddingHorizontal: wp(6)}}>
        <View style={styles.buttonViewStyle}>
          <TouchableOpacity
            style={[
              styles.buttonStyle,
              {
                backgroundColor:
                  selectedData == 'Active'
                    ? color.commonBlue
                    : color.lightGray2,
                borderRadius: wp(2),
              },
            ]}
            onPress={() => {
              setSelectedData('Active');
            }}>
            <Text
              style={[
                styles.buttonTextStyle,
                {color: selectedData == 'Active' ? color.white : color.black},
              ]}>
              Active
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buttonStyle,
              {
                backgroundColor:
                  selectedData == 'Completed'
                    ? color.commonBlue
                    : color.lightGray2,
                borderRadius: wp(2),
              },
            ]}
            onPress={() => {
              setSelectedData('Completed');
            }}>
            <Text
              style={[
                styles.buttonTextStyle,
                {
                  color:
                    selectedData == 'Completed' ? color.white : color.black,
                },
              ]}>
              Completed
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buttonStyle,
              {
                backgroundColor:
                  selectedData == 'Canceled'
                    ? color.commonBlue
                    : color.lightGray2,
                borderRadius: wp(2),
              },
            ]}
            onPress={() => {
              setSelectedData('Canceled');
            }}>
            <Text
              style={[
                styles.buttonTextStyle,
                {color: selectedData == 'Canceled' ? color.white : color.black},
              ]}>
              Canceled
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <View style={styles.ScrollViewBody}>
            <FlatList
              data={(selectedData == 'Active'
                ? activeData
                : selectedData == 'Completed'
                ? completedData
                : canceledData
              ).sort((a, b) => {
                return (
                  new Date(
                    `${a.searchFlightDateData[1]} ${Number(
                      a.searchFlightCardData?.pickTime.split(':')[0],
                    )}:${Number(
                      a.searchFlightCardData?.pickTime.split(':')[1],
                    )}:00`,
                  ) -
                  new Date(
                    `${b.searchFlightDateData[1]} ${Number(
                      b.searchFlightCardData?.pickTime.split(':')[0],
                    )}:${Number(
                      b.searchFlightCardData?.pickTime.split(':')[1],
                    )}:00`,
                  )
                );
              })}
              bounces={false}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    disabled={selectedData == 'Canceled' ? true : false}
                    onPress={() => {
                      setCartFlightData(item);
                    }}
                    style={[
                      styles.cardBody,
                      {marginTop: index === 0 ? hp(3) : 0},
                    ]}>
                    <View style={styles.cardHeader}>
                      <View
                        style={[
                          styles.cardHeaderLogo,
                          {backgroundColor: item?.searchFlightCardData?.logo},
                        ]}
                      />
                      <Text style={styles.cardHeaderText}>
                        {item?.searchFlightCardData?.airlineName}
                      </Text>
                      <Text style={styles.cardPriceTitle}>
                        {item?.searchFlightDateData
                          ? `${item?.searchFlightDateData[0].slice(0, 3)} ,${
                              item?.searchFlightDateData[1]
                            }`
                          : null}
                      </Text>
                    </View>
                    <View style={styles.cardDataBody}>
                      <View style={styles.FlightsPlaseBody}>
                        <Text style={styles.FlightsPlaseName}>
                          {item?.searchFlightData?.from}
                        </Text>
                        <Text style={styles.FlightsPlaseNicName}>
                          {item?.searchFlightCardData?.pickTime}
                        </Text>
                      </View>
                      <View style={styles.FlightsPlaseImgBody}>
                        <Image
                          style={styles.FlightsPlaseImg}
                          source={Images.airplaneWhiteIcon}
                        />
                        <Text style={styles.FlightsPlaseImgText}>
                          {item?.searchFlightCardData?.totalHours}
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.FlightsPlaseBody,
                          {alignItems: 'flex-end'},
                        ]}>
                        <Text style={styles.FlightsPlaseName}>
                          {item?.searchFlightData?.to}
                        </Text>
                        <Text style={styles.FlightsPlaseNicName}>
                          {item?.searchFlightCardData?.lendTime}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.cardBottemBody}>
                      <Text style={styles.FlightsPlaseName}>
                        {item?.searchFlightData?.fromShortform}
                      </Text>
                      <Text style={styles.FlightsPlaseImgText}>
                        {item?.searchFlightCardData?.stop}
                      </Text>
                      <Text style={styles.FlightsPlaseName}>
                        {item?.searchFlightData?.toShortform}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
              key={({index}) => index}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default BookingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonViewStyle: {
    borderRadius: wp(2),
    flexDirection: 'row',
    marginVertical: hp(2.5),
    justifyContent: 'space-around',
    backgroundColor: color.lightGray2,
  },
  buttonStyle: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: hp(1.2),
    justifyContent: 'center',
  },
  buttonTextStyle: {
    fontWeight: '600',
    fontSize: fontSize(14),
  },
  cardBody: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: hp(2),
    paddingHorizontal: wp(4),
    borderColor: color.grayLight,
    backgroundColor: color.white,
  },
  cardHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingVertical: hp(2.5),
    borderColor: color.grayLight,
  },
  cardHeaderText: {
    flex: 1,
    color: 'black',
    fontWeight: 'bold',
    fontSize: fontSize(16),
  },
  cardHeaderLogo: {
    width: wp(5.8),
    height: wp(5.8),
    marginEnd: wp(3),
    borderRadius: 500,
  },
  cardPriceTitle: {
    color: color.darkLight,
    fontSize: fontSize(14),
  },
  cardDataBody: {
    paddingTop: hp(2.5),
    alignItems: 'center',
    flexDirection: 'row',
  },
  FlightsPlaseBody: {
    width: wp(20),
  },
  FlightsPlaseImgBody: {
    flex: 1,
    alignItems: 'center',
  },
  FlightsPlaseImg: {
    height: hp(5),
    width: hp(17),
  },
  FlightsPlaseImgText: {
    color: color.darkLight,
    fontSize: fontSize(13),
  },
  FlightsPlaseNicName: {
    color: '#000',
    fontWeight: 'bold',
    marginTop: hp(1.5),
    fontSize: fontSize(21),
  },
  FlightsPlaseName: {
    fontWeight: '500',
    color: color.darkLight,
  },
  cardBottemBody: {
    paddingTop: hp(1),
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: hp(2.5),
    justifyContent: 'space-between',
  },
});
