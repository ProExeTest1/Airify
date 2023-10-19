import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  GetTime,
  MultiSliderComponets,
  OnBoardingTwoButton,
  PickerHeaderBar,
} from '../../components/index';
import {fontSize, hp, wp} from '../../helper/Constant';
import {color} from '../../helper/ColorConstant';
import {
  AmenitiesData,
  CabinClassData,
  FlightPreferencesData,
  RefundAndRescheduleData,
  numberOfStops,
} from '../../assets/DummyData/Data';
import {SearchFlightData} from '../../assets/DummyData/SearchFlightData';
import CheckBox from '../../components/Common/CheckBox';
import {useDispatch, useSelector} from 'react-redux';
import {SearchFlightFilterData} from '../../redux/action/SearchFlightAction';
import {useRoute} from '@react-navigation/native';
import {
  activeFlightFilter,
  expiredFlightFilter,
} from '../../redux/action/SavedFlights';

const SavedFlightFilter = ({navigation}) => {
  const route = useRoute();
  const expireFlight = useSelector(e => e?.SaveFlight?.expireFlight);
  const savedFlight = useSelector(e => e?.SaveFlight?.activeFlight);
  const func = () => {
    temp = [];
    SearchFlightData?.map((item, index) => {
      if (index === 0) {
        temp.push({airlineName: item.airlineName, logo: item.logo});
      } else if (temp.every(i => i.airlineName !== item.airlineName)) {
        temp.push({airlineName: item.airlineName, logo: item.logo});
      }
    });
    return temp;
  };
  const searchFlightFilterData = route.params?.header
    ? savedFlight
    : expireFlight;
  let dispatch = useDispatch();
  const [priceTargets1, setPriceTargets1] = useState(
    searchFlightFilterData?.priceRange
      ? searchFlightFilterData?.priceRange
      : [1000, 1500],
  );
  const [numberOfStopsData, setNumberOfStopsData] = useState(
    searchFlightFilterData?.numberOfStopsData
      ? searchFlightFilterData?.numberOfStopsData
      : 'Direct',
  );
  const [priceTargets2, setPriceTargets2] = useState(
    searchFlightFilterData?.stopsDuration
      ? searchFlightFilterData?.stopsDuration
      : [1, 3],
  );
  const [AirlinesCondition, setAirlinesCondition] = useState(
    searchFlightFilterData?.airlinesList?.length === func()?.length
      ? true
      : false,
  );
  const [AirlinesList, setAirlinesList] = useState(
    searchFlightFilterData?.airlinesList
      ? searchFlightFilterData?.airlinesList
      : [],
  );
  const [priceTargets3, setPriceTargets3] = useState(
    searchFlightFilterData?.flightDuration
      ? searchFlightFilterData?.flightDuration
      : [6, 8],
  );
  const [amenitiesList, setAmenitiesList] = useState(
    searchFlightFilterData?.amenitiesList
      ? searchFlightFilterData?.amenitiesList
      : [],
  );

  const [amenitiesCondition, setAmenitiesCondition] = useState(
    searchFlightFilterData?.amenitiesList?.length === AmenitiesData?.length
      ? true
      : false,
  );

  const [departureTime1, setDepartureTime1] = useState(
    searchFlightFilterData?.arrivalTime
      ? searchFlightFilterData?.arrivalTime
      : {},
  );
  const [departureTime2, setDepartureTime2] = useState(
    searchFlightFilterData?.departureTime
      ? searchFlightFilterData?.departureTime
      : {},
  );
  const [RefundAndRescheduleList, setRefundAndRescheduleList] = useState(
    searchFlightFilterData?.refundAndRescheduleList
      ? searchFlightFilterData?.refundAndRescheduleList
      : [],
  );
  const [RefundAndRescheduleCondition, setRefundAndRescheduleCondition] =
    useState(
      searchFlightFilterData?.refundAndRescheduleList?.length ===
        RefundAndRescheduleData?.length
        ? true
        : false,
    );
  const [FlightPreferencesList, setFlightPreferencesList] = useState(
    searchFlightFilterData?.flightPreferencesList
      ? searchFlightFilterData?.flightPreferencesList
      : [],
  );
  const [FlightPreferencesCondition, setFlightPreferencesCondition] = useState(
    searchFlightFilterData?.flightPreferencesList?.length ===
      FlightPreferencesData?.length
      ? true
      : false,
  );
  const [CabinClassList, setCabinClassList] = useState(
    searchFlightFilterData?.cabinClassList
      ? searchFlightFilterData?.cabinClassList
      : [],
  );
  const [CabinClassCondition, setCabinClassCondition] = useState(
    searchFlightFilterData?.cabinClassList?.length === CabinClassData?.length
      ? true
      : false,
  );

  const CancelAll = () => {
    setAirlinesList([]);
  };
  const SelectAll = () => {
    setAirlinesList(func().map(i => i.airlineName));
  };
  const close = () => {
    dispatch(SearchFlightFilterData({}));
    navigation.navigate('SavedScreen');
  };
  const applySortdata = () => {
    dispatch(
      route.params?.header
        ? activeFlightFilter({
            airlinesList: AirlinesList?.length > 0 ? AirlinesList : null,
            amenitiesList: amenitiesList?.length > 0 ? amenitiesList : null,
            arrivalTime: departureTime1?.title ? departureTime1 : null,
            cabinClassList: CabinClassList?.length > 0 ? CabinClassList : null,
            departureTime: departureTime2?.title ? departureTime2 : null,
            flightDuration: priceTargets3?.length > 0 ? priceTargets3 : null,
            flightPreferencesList:
              FlightPreferencesList?.length > 0 ? FlightPreferencesList : null,
            numberOfStopsData:
              numberOfStopsData.length > 0 ? numberOfStopsData : null,
            priceRange: priceTargets1.length > 0 ? priceTargets1 : null,
            stopsDuration: priceTargets2?.length > 0 ? priceTargets2 : null,
            refundAndRescheduleList:
              RefundAndRescheduleList.length > 0
                ? RefundAndRescheduleList
                : null,
          })
        : expiredFlightFilter({
            airlinesList: AirlinesList?.length > 0 ? AirlinesList : null,
            amenitiesList: amenitiesList?.length > 0 ? amenitiesList : null,
            arrivalTime: departureTime1?.title ? departureTime1 : null,
            cabinClassList: CabinClassList?.length > 0 ? CabinClassList : null,
            departureTime: departureTime2?.title ? departureTime2 : null,
            flightDuration: priceTargets3?.length > 0 ? priceTargets3 : null,
            flightPreferencesList:
              FlightPreferencesList?.length > 0 ? FlightPreferencesList : null,
            numberOfStopsData:
              numberOfStopsData.length > 0 ? numberOfStopsData : null,
            priceRange: priceTargets1.length > 0 ? priceTargets1 : null,
            stopsDuration: priceTargets2?.length > 0 ? priceTargets2 : null,
            refundAndRescheduleList:
              RefundAndRescheduleList.length > 0
                ? RefundAndRescheduleList
                : null,
          }),
    );
    navigation.navigate('SavedScreen');
  };
  return (
    <View style={styles.body}>
      <PickerHeaderBar
        headerName={'Filter'}
        navigation={() => navigation.navigate('SavedScreen')}></PickerHeaderBar>
      <View style={styles.ScrollBody}>
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <View style={{paddingTop: hp(4)}}></View>
          <View style={styles.boxBody}>
            <View style={styles.boxTitleBody}>
              <Text style={styles.boxTitle}>Price Range</Text>
              <Text style={styles.boxVelue}>
                {`$${priceTargets1[0]} - $${priceTargets1[1]}`}
              </Text>
            </View>
            <MultiSliderComponets
              min={700}
              max={2000}
              values={priceTargets1}
              sliderLength={wp(75)}
              onValuesChangeFinish={a => setPriceTargets1(a)}
            />
          </View>
          <View style={styles.boxBody}>
            <View style={styles.boxTitleBody}>
              <Text style={styles.boxTitle}>Number of Stops</Text>
            </View>
            <View style={styles.StopsButBody}>
              <FlatList
                data={numberOfStops}
                horizontal={true}
                scrollEnabled={false}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    onPress={() => setNumberOfStopsData(item)}
                    style={[
                      styles.StopsBut,
                      {
                        borderColor:
                          numberOfStopsData === item
                            ? color.commonBlue
                            : '#e2e2e2',
                      },
                    ]}>
                    <Text style={styles.StopsText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
            {numberOfStopsData !== 'Direct' && (
              <>
                <View style={styles.boxTitleBody}>
                  <Text style={styles.boxTitle}>Stop Duration</Text>
                  <Text style={styles.boxVelue}>
                    {`${priceTargets2[0]} - ${priceTargets2[1]} hours`}
                  </Text>
                </View>
                <MultiSliderComponets
                  min={1}
                  max={6}
                  values={priceTargets2}
                  sliderLength={wp(75)}
                  onValuesChangeFinish={a => setPriceTargets2(a)}
                />
              </>
            )}
          </View>
          <View style={styles.boxBody}>
            <View style={styles.boxTitleBody}>
              <Text style={styles.boxTitle}>Airlines</Text>
              <TouchableOpacity
                onPress={() => {
                  setAirlinesCondition(!AirlinesCondition);
                  AirlinesCondition ? CancelAll() : SelectAll();
                }}>
                <Text style={styles.AirlinesText}>
                  {AirlinesCondition ? 'Cancel All' : 'Select All'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.AirlinesFlatlistBody}>
              <FlatList
                data={func()}
                scrollEnabled={false}
                renderItem={({item, index}) => (
                  <View
                    style={[
                      styles.AirlinesFlatlistView,
                      {marginBottom: index === func().length - 1 ? hp(2) : 0},
                    ]}>
                    <View
                      style={[
                        styles.cardHeaderLogo,
                        {backgroundColor: item?.logo},
                      ]}
                    />
                    <Text style={styles.AirlinesFlatlistText}>
                      {item.airlineName}
                    </Text>
                    <CheckBox
                      onClick={() => {
                        AirlinesList.some(i => i === item.airlineName)
                          ? setAirlinesList(
                              AirlinesList.filter(i => i !== item.airlineName),
                            )
                          : setAirlinesList([
                              ...AirlinesList,
                              item.airlineName,
                            ]);
                      }}
                      isChecked={AirlinesList.some(
                        i => i === item.airlineName,
                      )}></CheckBox>
                  </View>
                )}
              />
            </View>
          </View>
          <View style={styles.boxBody}>
            <View style={styles.boxTitleBody}>
              <Text style={styles.boxTitle}>Flight Duration</Text>
              <Text style={styles.boxVelue}>
                {`${priceTargets3[0]}h - ${priceTargets3[1]}h`}
              </Text>
            </View>
            <MultiSliderComponets
              min={4}
              max={12}
              values={priceTargets3}
              sliderLength={wp(75)}
              onValuesChangeFinish={a => setPriceTargets3(a)}
            />
          </View>
          <View style={styles.boxBody}>
            <View style={styles.boxTitleBody}>
              <Text style={styles.boxTitle}>Amenities</Text>
              <TouchableOpacity
                onPress={() => {
                  setAmenitiesCondition(!amenitiesCondition);
                  amenitiesCondition
                    ? setAmenitiesList([])
                    : setAmenitiesList(AmenitiesData);
                }}>
                <Text style={styles.AirlinesText}>
                  {amenitiesCondition ? 'Cancel All' : 'Select All'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.AirlinesFlatlistBody}>
              <FlatList
                data={AmenitiesData}
                scrollEnabled={false}
                renderItem={({item, index}) => (
                  <View
                    style={[
                      styles.AirlinesFlatlistView,
                      {
                        marginBottom:
                          index === AmenitiesData.length - 1 ? hp(2) : 0,
                      },
                    ]}>
                    <Text style={styles.AirlinesFlatlistText}>{item}</Text>
                    <CheckBox
                      onClick={() => {
                        amenitiesList.some(i => i === item)
                          ? setAmenitiesList(
                              amenitiesList.filter(i => i !== item),
                            )
                          : setAmenitiesList([...amenitiesList, item]);
                      }}
                      isChecked={amenitiesList.some(
                        i => i === item,
                      )}></CheckBox>
                  </View>
                )}
              />
            </View>
          </View>
          <View style={styles.boxBody}>
            <View style={styles.boxTitleBody}>
              <Text style={styles.boxTitle}>Arrival Time</Text>
            </View>
            <View style={{paddingTop: hp(2)}}>
              <GetTime
                departureTime={departureTime1}
                setDepartureTime={setDepartureTime1}
              />
            </View>
          </View>
          <View style={styles.boxBody}>
            <View style={styles.boxTitleBody}>
              <Text style={styles.boxTitle}>Departure Time</Text>
            </View>
            <View style={{paddingTop: hp(2)}}>
              <GetTime
                departureTime={departureTime2}
                setDepartureTime={setDepartureTime2}
              />
            </View>
          </View>
          <View style={styles.boxBody}>
            <View style={styles.boxTitleBody}>
              <Text style={styles.boxTitle}>Refund & Reschedule</Text>
              <TouchableOpacity
                onPress={() => {
                  setRefundAndRescheduleCondition(
                    !RefundAndRescheduleCondition,
                  );
                  RefundAndRescheduleCondition
                    ? setRefundAndRescheduleList([])
                    : setRefundAndRescheduleList(RefundAndRescheduleData);
                }}>
                <Text style={styles.AirlinesText}>
                  {RefundAndRescheduleCondition ? 'Cancel All' : 'Select All'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.AirlinesFlatlistBody}>
              <FlatList
                data={RefundAndRescheduleData}
                scrollEnabled={false}
                renderItem={({item, index}) => (
                  <View
                    style={[
                      styles.AirlinesFlatlistView,
                      {
                        marginBottom:
                          index === RefundAndRescheduleData.length - 1
                            ? hp(2)
                            : 0,
                      },
                    ]}>
                    <Text style={styles.AirlinesFlatlistText}>{item}</Text>
                    <CheckBox
                      onClick={() => {
                        RefundAndRescheduleList.some(i => i === item)
                          ? setRefundAndRescheduleList(
                              RefundAndRescheduleList.filter(i => i !== item),
                            )
                          : setRefundAndRescheduleList([
                              ...RefundAndRescheduleList,
                              item,
                            ]);
                      }}
                      isChecked={RefundAndRescheduleList.some(
                        i => i === item,
                      )}></CheckBox>
                  </View>
                )}
              />
            </View>
          </View>

          <View style={styles.boxBody}>
            <View style={styles.boxTitleBody}>
              <Text style={styles.boxTitle}>Flight Preferences</Text>
              <TouchableOpacity
                onPress={() => {
                  setFlightPreferencesCondition(!FlightPreferencesCondition);
                  FlightPreferencesCondition
                    ? setFlightPreferencesList([])
                    : setFlightPreferencesList(FlightPreferencesData);
                }}>
                <Text style={styles.AirlinesText}>
                  {FlightPreferencesCondition ? 'Cancel All' : 'Select All'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.AirlinesFlatlistBody}>
              <FlatList
                data={FlightPreferencesData}
                scrollEnabled={false}
                renderItem={({item, index}) => (
                  <View
                    style={[
                      styles.AirlinesFlatlistView,
                      {
                        marginBottom:
                          index === FlightPreferencesData.length - 1
                            ? hp(2)
                            : 0,
                      },
                    ]}>
                    <Text style={styles.AirlinesFlatlistText}>{item}</Text>
                    <CheckBox
                      onClick={() => {
                        FlightPreferencesList.some(i => i === item)
                          ? setFlightPreferencesList(
                              FlightPreferencesList.filter(i => i !== item),
                            )
                          : setFlightPreferencesList([
                              ...FlightPreferencesList,
                              item,
                            ]);
                      }}
                      isChecked={FlightPreferencesList.some(
                        i => i === item,
                      )}></CheckBox>
                  </View>
                )}
              />
            </View>
          </View>
          <View style={styles.boxBody}>
            <View style={styles.boxTitleBody}>
              <Text style={styles.boxTitle}>Cabin Class</Text>
              <TouchableOpacity
                onPress={() => {
                  setCabinClassCondition(!CabinClassCondition);
                  CabinClassCondition
                    ? setCabinClassList([])
                    : setCabinClassList(CabinClassData);
                }}>
                <Text style={styles.AirlinesText}>
                  {CabinClassCondition ? 'Cancel All' : 'Select All'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.AirlinesFlatlistBody}>
              <FlatList
                data={CabinClassData}
                scrollEnabled={false}
                renderItem={({item, index}) => (
                  <View
                    style={[
                      styles.AirlinesFlatlistView,
                      {
                        marginBottom:
                          index === CabinClassData.length - 1 ? hp(2) : 0,
                      },
                    ]}>
                    <Text style={styles.AirlinesFlatlistText}>{item}</Text>
                    <CheckBox
                      onClick={() => {
                        CabinClassList.some(i => i === item)
                          ? setCabinClassList(
                              CabinClassList.filter(i => i !== item),
                            )
                          : setCabinClassList([...CabinClassList, item]);
                      }}
                      isChecked={CabinClassList.some(
                        i => i === item,
                      )}></CheckBox>
                  </View>
                )}
              />
            </View>
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          paddingTop: hp(2),
          borderTopWidth: 1,
          backgroundColor: '#fff',
          borderColor: '#e2e2e2',
          paddingBottom: hp(4),
        }}>
        <OnBoardingTwoButton
          buttonTextOne={'Cancel'}
          buttonTextTwo={'Apply'}
          onPress1={close}
          onPress2={applySortdata}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  ScrollBody: {
    flex: 1,
    paddingHorizontal: wp(8),
  },
  boxBody: {
    backgroundColor: '#fff',
    paddingTop: hp(2),
    paddingHorizontal: wp(4),
    borderRadius: 10,
    marginBottom: hp(2),
  },
  boxTitleBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boxTitle: {
    fontSize: fontSize(17),
    fontWeight: 'bold',
  },
  boxVelue: {
    fontSize: fontSize(18),
  },
  StopsButBody: {
    paddingVertical: hp(1.5),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  StopsBut: {
    backgroundColor: '#f2f2f2',
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: hp(1.3),
    width: wp(23.5),
    alignItems: 'center',
    marginEnd: wp(2.7),
  },
  StopsText: {
    fontSize: fontSize(16),
    fontWeight: '500',
  },
  AirlinesText: {
    fontSize: fontSize(17),
    fontWeight: '500',
    color: color.commonBlue,
  },
  AirlinesFlatlistBody: {
    marginTop: hp(2),
    borderTopWidth: 1,
    borderColor: '#e2e2e2',
  },
  AirlinesFlatlistView: {
    marginTop: hp(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardHeaderLogo: {
    height: wp(6.5),
    width: wp(6.5),
    borderRadius: 500,
    marginEnd: wp(3),
  },
  AirlinesFlatlistText: {
    fontSize: fontSize(18),
    fontWeight: '500',
    flex: 1,
  },
});

export default SavedFlightFilter;
