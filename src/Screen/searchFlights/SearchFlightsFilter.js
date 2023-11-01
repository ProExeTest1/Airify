import React, {useState} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {color} from '../../helper/ColorConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import CheckBox from '../../components/Common/CheckBox';
import {SearchFlightData} from '../../assets/DummyData/SearchFlightData';
import {SearchFlightFilterData} from '../../redux/action/SearchFlightAction';
import {
  GetTime,
  MultiSliderComponets,
  OnBoardingTwoButton,
  PickerHeaderBar,
} from '../../components/index';
import {
  AmenitiesData,
  CabinClassData,
  FlightPreferencesData,
  RefundAndRescheduleData,
  numberOfStops,
} from '../../assets/DummyData/Data';
import {strings} from '../../helper/Strings';

const SearchFlightsFilter = ({navigation}) => {
  const func = () => {
    temp = [];
    SearchFlightData?.map((item, index) => {
      if (index === 0) {
        temp?.push({airlineName: item?.airlineName, logo: item?.logo});
      } else if (temp.every(i => i.airlineName !== item?.airlineName)) {
        temp?.push({airlineName: item?.airlineName, logo: item?.logo});
      }
    });
    return temp;
  };
  const searchFlightFilterData = useSelector(
    e => e?.searchFlight?.searchFlightFilterData,
  );
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
    setAirlinesList(func().map(i => i?.airlineName));
  };
  const close = () => {
    dispatch(SearchFlightFilterData({}));
    navigation?.navigate('SearchFlights');
  };
  const applySortdata = () => {
    dispatch(
      SearchFlightFilterData({
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
        priceRange: priceTargets1?.length > 0 ? priceTargets1 : null,
        stopsDuration: priceTargets2?.length > 0 ? priceTargets2 : null,
        refundAndRescheduleList:
          RefundAndRescheduleList?.length > 0 ? RefundAndRescheduleList : null,
      }),
    );
    navigation?.navigate('SearchFlights');
  };
  return (
    <View style={styles.body}>
      <PickerHeaderBar
        headerName={'Filter'}
        navigation={() =>
          navigation?.navigate('SearchFlights')
        }></PickerHeaderBar>
      <View style={styles.ScrollBody}>
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <View style={{paddingTop: hp(4)}}></View>
          <View style={styles.boxBody}>
            <View style={styles.boxTitleBody}>
              <Text style={styles.boxTitle}>{strings.price_range}</Text>
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
              <Text style={styles.boxTitle}>{strings.no_of_stops}</Text>
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
                  <Text style={styles.boxTitle}>{strings.stop_duration}</Text>
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
              <Text style={styles.boxTitle}>{strings.Airlines}</Text>
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
              <Text style={styles.boxTitle}>{strings.Flight_Duration}</Text>
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
              <Text style={styles.boxTitle}>{strings.Amenities}</Text>
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
              <Text style={styles.boxTitle}>{strings.Arrival_Time}</Text>
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
              <Text style={styles.boxTitle}>{strings.Departure_Time}</Text>
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
              <Text style={styles.boxTitle}>{strings.refund_reschedule}</Text>
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
              <Text style={styles.boxTitle}>{strings.Flight_Preferences}</Text>
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
              <Text style={styles.boxTitle}>{strings.Cabin_Class}</Text>
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

export default SearchFlightsFilter;

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  ScrollBody: {
    flex: 1,
    paddingHorizontal: wp(8),
  },
  boxBody: {
    borderRadius: 10,
    paddingTop: hp(2),
    marginBottom: hp(2),
    backgroundColor: '#fff',
    paddingHorizontal: wp(4),
  },
  boxTitleBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boxTitle: {
    fontWeight: 'bold',
    fontSize: fontSize(17),
    color: color.black,
  },
  boxVelue: {
    fontSize: fontSize(18),
    color: color.black,
  },
  StopsButBody: {
    flexDirection: 'row',
    paddingVertical: hp(1.5),
    justifyContent: 'space-between',
  },
  StopsBut: {
    borderWidth: 2,
    width: wp(23.5),
    borderRadius: 10,
    marginEnd: wp(2.7),
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingVertical: hp(1.3),
  },
  StopsText: {
    fontWeight: '500',
    fontSize: fontSize(16),
    color: color.black,
  },
  AirlinesText: {
    fontWeight: '500',
    fontSize: fontSize(17),
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
    width: wp(6.5),
    height: wp(6.5),
    marginEnd: wp(3),
    borderRadius: 500,
  },
  AirlinesFlatlistText: {
    flex: 1,
    fontWeight: '500',
    fontSize: fontSize(18),
    color: color.black,
  },
});
