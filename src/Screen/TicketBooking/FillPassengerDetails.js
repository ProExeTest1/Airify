import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  CardHeader,
  CommonHeader,
  DropDownMenu,
  DropDownPaperTextInput,
  FlightDetailsCard,
  FlightServices,
  PriceDetails,
  TicktBookingProgressBar,
} from '../../components';
import {strings} from '../../helper/Strings';
import {color} from '../../helper/ColorConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import {Images} from '../../helper/IconConstant';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {SelectSeatActionData} from '../../redux/action/SelectSeatAction';
import {AlertConstant} from '../../helper/AlertConstant';

const FillPassengerDetails = ({navigation}) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [passengerLength, setPassengerLength] = useState();
  const [dropdown, setDropdownTop] = useState();
  const [passengerList, setPassengerList] = useState([]);
  const [flatlistIndex, setFlatlistIndex] = useState();
  const DropdownButton = useRef();
  const item = useSelector(state => state.searchFlight.searchFlightCardData);
  const userData = useSelector(state => state.userData.userdata);
  const searchFlightData = useSelector(e => e?.place?.searchFlightData);
  const SelectSeat = useSelector(e => e.SelectSeatData.SelectSeatData);
  const totalSeat = Number(searchFlightData.passenger.split(' ')[0]);
  const ticketPrice = parseInt(item?.price.slice(1, 8).split(',').join(''), 10);
  const insurancePrice = Math.round((totalSeat * ticketPrice * 2.8) / 100);
  const travelTax = Math.round((totalSeat * ticketPrice * 1.5) / 100);
  let newArr = Array.from({length: totalSeat}, (_, index) => ({
    id: index + 1,
    name: '',
    seatNo: false,
  }));
  const [flatlistData, setFlatlistData] = useState(newArr);
  const setFlatlistDataa = i => {
    console.log('hiiii');
    dispatch(SelectSeatActionData(i));
  };
  useEffect(() => {
    passengers();
  }, []);

  const onContinue = () => {
    if (passengerLength < newArr.length && SelectSeat.every(i => i.seatNo)) {
      AlertConstant('Please first add passengers to click on plus icon');
    } else {
      // dispatch(SelectSeatActionData(flatlistData));
      navigation?.navigate('PaymentConfirmation');
    }
  };
  // console.log(passengerList);
  const toggleDropDown = index => {
    visible ? setVisible(false) : openDropdown();
    setFlatlistIndex(index);
  };
  const openDropdown = () => {
    DropdownButton?.current?.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py + h);
    });
    setVisible(true);
  };
  const onItemPress = item => {
    const newData = flatlistData.map(x => {
      if (x.id === flatlistIndex) {
        return {...x, name: item};
      }
      return x;
    });
    setFlatlistData(newData);
    setFlatlistDataa(
      newData.map(i => {
        return {name: i.name, seatNo: i.seatNo};
      }),
    );
    setVisible(false);
  };
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.dropDownRenderItemTouchStyle}
        onPress={() => {
          onItemPress(item?.FirstName + item?.LastName);
          toggleDropDown();
        }}>
        <Text style={styles.renderItemTextStyle}>
          {item.FirstName} {item.LastName}
        </Text>
      </TouchableOpacity>
    );
  };
  const passengers = async () => {
    await firestore()
      .collection('PassengerList')
      .doc(auth().currentUser.uid)
      .get()
      .then(res => {
        setPassengerList(res.data().PassengerList);
        setPassengerLength(res.data().PassengerList.length);
      });
  };

  console.log(flatlistData);
  return (
    <View style={styles.headerViewStyle}>
      <CommonHeader
        headerName={strings.fillInDetails}
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
      <TicktBookingProgressBar progress={1}></TicktBookingProgressBar>

      <ScrollView bounces={false} style={styles.scrollViewStyle}>
        <View style={{paddingHorizontal: wp(4), marginTop: hp(2)}}>
          <FlightDetailsCard item={item} />
        </View>
        <View style={styles.cardBody}>
          <View style={styles.flatlistViewStyle}>
            <Image
              source={Images.flyPlaneIcon}
              style={styles.flyIconStyle}
              resizeMode="contain"
            />
            <Text style={styles.cardHeaderText}>{strings.FlightAmenities}</Text>
          </View>
          <FlightServices
            DetailsNavigation={() =>
              navigation?.navigate('FlightPackageDetails', {header: 'Details'})
            }
          />
        </View>
        <View style={styles.cardBody}>
          <CardHeader
            FirstImage={Images.account}
            header={strings.contact_details}
            imageStyle={styles.cardheaderIconStyle}
          />
          <View style={styles.contactDetailsViewStyle}>
            <Text style={styles.nameTextStyle}>{userData.Name}</Text>
            <View style={styles.emailViewStyle}>
              <Text numberOfLines={1} style={styles.emailStyle}>
                {userData.Email}
              </Text>
              <Text numberOfLines={1} style={styles.PhoneNumberStyle}>
                {userData.PhoneNumber}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.cardBody}>
          <CardHeader
            FirstImage={Images.multi_passenger}
            SecondImage={Images.plusIcon}
            header={strings.passenger_details}
            imageStyle={styles.plusIconStyle}
            onPress={() => {
              navigation.navigate('NewPassenger');
            }}
          />
          <View style={styles.passengerInputViewStyle}>
            <FlatList
              data={flatlistData}
              renderItem={({item}) => {
                return (
                  <>
                    <DropDownPaperTextInput
                      placeholder={'Passenger'}
                      label={'Passenger'}
                      icon={Images.downArrow}
                      value={item.name}
                      toggleDropdown={() => toggleDropDown(item.id)}
                      onPress={() => toggleDropDown(item.id)}
                      style={styles.dropDownInputStyle}
                      iconStyle={styles.dropDownIconStyle}
                      ref={DropdownButton}
                    />

                    {visible && item.id === flatlistIndex && (
                      <DropDownMenu
                        data={passengerList?.filter(i =>
                          flatlistData?.every(e => {
                            console.log(
                              e.name != `${i.FirstName}${i.LastName}`,
                            );
                            return e.name != `${i.FirstName}${i.LastName}`;
                          }),
                        )}
                        dropdownTop={dropdown}
                        renderItem={renderItem}
                        style={styles.dropDownMenuStyle}
                      />
                    )}
                  </>
                );
              }}
            />
          </View>
        </View>
        <View style={styles.cardBody}>
          <TouchableOpacity
            onPress={() => {
              flatlistData?.every(i => i.name.length > 0)
                ? navigation.navigate('SelectSeat')
                : Alert.alert(
                    'please fill passenger details if no any passenger list so press + sine and add passenger details',
                  );
            }}>
            <CardHeader
              FirstImage={Images.seat}
              SecondImage={Images.forward}
              header={strings.seat_numberString}
              imageStyle={styles.plusIconStyle}
            />
          </TouchableOpacity>
          <View
            style={{
              marginVertical: hp(2),
              backgroundColor: color.lightGray,
              borderRadius: 5,
            }}>
            {flatlistData.length > 1 &&
              SelectSeat?.every(i => (i.seatNo === false ? false : true)) && (
                <View
                  style={{
                    paddingVertical: hp(1.5),
                    flexDirection: 'row',
                  }}>
                  <View style={{width: wp(13), alignItems: 'center'}}>
                    <Text style={styles.searNumberListTitleText}>No.</Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={styles.searNumberListTitleText}>
                      Passenger(s)
                    </Text>
                  </View>
                  <View style={{width: wp(18), alignItems: 'center'}}>
                    <Text style={styles.searNumberListTitleText}>Seat</Text>
                  </View>
                </View>
              )}
            {SelectSeat?.every(i => (i.seatNo === false ? false : true)) && (
              <FlatList
                data={SelectSeat}
                renderItem={({item, index}) => (
                  <View
                    style={{
                      paddingVertical: hp(1.5),
                      flexDirection: 'row',
                    }}>
                    {flatlistData.length > 1 && (
                      <View style={{width: wp(13), alignItems: 'center'}}>
                        <Text style={styles.searNumberListTitleText}>
                          {index + 1}
                        </Text>
                      </View>
                    )}
                    <View style={{flex: 1}}>
                      <Text style={styles.searNumberListTitleText}>
                        {item.name}
                      </Text>
                    </View>
                    <View style={{width: wp(18), alignItems: 'center'}}>
                      <Text style={styles.searNumberListTitleText}>
                        {item.seatNo}
                      </Text>
                    </View>
                  </View>
                )}
              />
            )}
          </View>
        </View>
        <View style={{marginHorizontal: wp(4)}}>
          <PriceDetails />
        </View>
      </ScrollView>
      <View style={styles.bottomButtonBody}>
        <TouchableOpacity
          onPress={() => {
            onContinue();
          }}
          style={styles.okButton}>
          <Text style={styles.okButtonText}>{strings.continue}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default FillPassengerDetails;
// 2.8% travel inssurance
//1.5% tax
const styles = StyleSheet.create({
  scrollViewStyle: {flex: 1},
  headerViewStyle: {
    flex: 1,
  },
  progressViewStyle: {
    backgroundColor: '#0041C0',
    height: hp(4),
    width: hp(4),
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressCountStyle: {
    fontSize: fontSize(17),
    fontWeight: '600',
    color: color.white,
  },
  progressInnerViewStyle: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  lineViewStyle: {
    borderWidth: 1,
    borderColor: 'black',
    width: wp(14),
  },
  progressTextStyle: {
    color: '#DBDDE1',
    marginTop: hp(0.5),
  },
  bottomButtonBody: {
    backgroundColor: '#fff',
    paddingHorizontal: wp(6),
    paddingTop: hp(2),
    paddingBottom: hp(4),
    flexDirection: 'row',
  },
  okButton: {
    backgroundColor: color.commonBlue,
    paddingVertical: hp(2),
    alignItems: 'center',
    borderRadius: 10,
    flex: 1,
  },
  okButtonText: {
    fontSize: fontSize(18),
    fontWeight: '500',
    color: '#fff',
  },
  cardBody: {
    backgroundColor: color.white,
    paddingHorizontal: wp(4),
    marginBottom: hp(2),
    borderRadius: 10,
    borderColor: '#000',
    marginHorizontal: wp(4),
  },
  cardHeaderText: {
    fontSize: fontSize(18),
    fontWeight: 'bold',
    flex: 1,
    color: color.black,
    marginHorizontal: wp(4),
  },
  nameTextStyle: {
    fontSize: fontSize(18),
    fontWeight: 'bold',
    flex: 1,
    color: color.black,
  },
  flatlistViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#e2e2e2',
    borderBottomWidth: 1,
    paddingVertical: hp(1.6),
  },
  emailStyle: {
    flex: 1,
    fontSize: fontSize(16),
    color: '#383838',
  },
  PhoneNumberStyle: {
    color: '#383838',
    fontSize: fontSize(16),
    marginHorizontal: wp(2),
  },
  cardHeaderStyle: {
    height: hp(3),
    width: hp(3),
  },
  flyIconStyle: {
    height: hp(3),
    width: hp(3),
  },
  progressBarStyle: {
    height: hp(10),
    backgroundColor: color.commonBlue,
    paddingHorizontal: wp(12),
  },
  cardheaderIconStyle: {
    height: hp(3),
    width: hp(3),
    tintColor: color.commonBlue,
  },
  contactDetailsViewStyle: {
    marginVertical: hp(2),
  },
  emailViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    marginTop: hp(1),
  },
  plusIconStyle: {
    height: hp(2),
    width: hp(2),
    tintColor: color.commonBlue,
  },
  passengerInputViewStyle: {
    marginBottom: hp(2),
  },
  dropDownInputStyle: {
    marginHorizontal: wp(2),
    height: hp(7),
    marginVertical: hp(1),
  },
  dropDownIconStyle: {
    marginTop: hp(2.4),
  },
  dropDownMenuStyle: {
    marginHorizontal: wp(1),
    marginBottom: hp(1),
  },
  dropDownRenderItemTouchStyle: {
    marginHorizontal: wp(4),
    marginVertical: hp(1.2),
    borderBottomWidth: 0.5,
    borderColor: '#e6e6e6',
    paddingBottom: hp(1.5),
  },
  renderItemTextStyle: {
    fontSize: fontSize(18),
    fontWeight: '500',
    color: '#383838',
  },
  searNumberListTitleText: {
    fontSize: fontSize(17),
    fontWeight: '500',
  },
});
