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
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {RadioButton} from 'react-native-radio-buttons-group';
import firestore from '@react-native-firebase/firestore';

import {strings} from '../../helper/Strings';
import {
  CommonHeader,
  ActiveSavedAddress,
  ExpiredSavedAddress,
  OnBoardingTwoButton,
} from '../../components';
import {color} from '../../helper/ColorConstant';
import {Images} from '../../helper/IconConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import {radioButtons} from '../../assets/DummyData/radioButtons';
import {
  activeFlightFilter,
  expiredFlightFilter,
} from '../../redux/action/SavedFlights';

const SavedScreen = ({navigation}) => {
  const isFocus = useIsFocused();
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [savedItem, setSavedItem] = useState({});
  const [finalModal, setFinalModal] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [modalVisible2, setModalVisible2] = useState(false);
  const [selectedOption, setSelectedOption] = useState(true);
  const savedFlight = useSelector(e => e?.SaveFlight?.activeFlight);
  const expireFlight = useSelector(e => e?.SaveFlight?.expireFlight);
  const [SearchFlightCardData, setSearchFlightCardData] = useState(savedFlight);
  const savedFlightFilter = useSelector(e => e?.SaveFlight?.activeFlightFilter);
  const expireFlightFilter = useSelector(
    e => e?.SaveFlight?.expireFlightFilter,
  );

  const openModal = item => {
    setSavedItem(item);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const openFinalModal = () => {
    setFinalModal(true);
  };
  const closeFinalModal = () => {
    setFinalModal(false);
  };

  const deleteAddress = async () => {
    try {
      const deleteData = await firestore()
        .collection('SavedFlights')
        .doc(auth().currentUser.uid)
        .get()
        .then(async i => {
          await firestore()
            .collection('SavedFlights')
            .doc(auth().currentUser.uid)
            .update({
              savedFlights: i?.data()?.savedFlights?.filter(d => {
                if (
                  d?.airlineName == savedItem?.airlineName &&
                  d?.departureTime == savedItem?.departureTime &&
                  d?.landingTime == savedItem?.landingTime &&
                  d?.stops == savedItem?.stops &&
                  d?.totalHours == savedItem?.totalHours &&
                  d?.date == savedItem?.date &&
                  d?.departurePlace == savedItem?.departurePlace &&
                  d?.departureShortForm == savedItem?.departureShortForm &&
                  d?.destinationPlace == savedItem?.destinationPlace &&
                  d?.destinationShortForm == savedItem?.destinationShortForm &&
                  d?.flightPrice == savedItem?.flightPrice &&
                  d?.logo == savedItem?.logo
                ) {
                  return false;
                } else {
                  return d;
                }
              }),
            });
        });
      closeModal();
      setTimeout(() => {
        openFinalModal();
      }, 500);
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  const closeModal2 = () => {
    setSearchFlightCardData(savedFlight);
    setSelectedData({});
    setModalVisible2(false);
  };
  const applySortdaata = () => {
    const sortData = SearchFlightCardData.sort((a, b) => {
      let aData =
        a.day === 1
          ? Number(a.landingTime.replaceAll(':', '.'))
          : Number(a.landingTime.replaceAll(':', '.')) + 24;
      let bData =
        b.day === 1
          ? Number(b.landingTime.replaceAll(':', '.'))
          : Number(b.landingTime.replaceAll(':', '.')) + 24;
      if (selectedData?.label === 'Lowest Price') {
        return (
          Number(a.flightPrice.slice(1).replaceAll(',', '')) -
          Number(b.flightPrice.slice(1).replaceAll(',', ''))
        );
      } else if (selectedData?.label === 'Direct Flights First') {
        return (
          Number(a.stops === 'Direct' ? 0 : a.stops.slice(0, 1)) -
          Number(b.stops === 'Direct' ? 0 : b.stops.slice(0, 1))
        );
      } else if (selectedData?.label === 'Earliest Departure') {
        return aData - bData;
      } else if (selectedData?.label === 'Latest Departure') {
        return bData - aData;
      } else if (selectedData?.label === 'Earliest Arrival') {
        return (
          Number(a.departureTime.replaceAll(':', '.')) -
          Number(b.departureTime.replaceAll(':', '.'))
        );
      } else if (selectedData?.label === 'Latest Arrival') {
        return (
          Number(b.departureTime.replaceAll(':', '.')) -
          Number(a.departureTime.replaceAll(':', '.'))
        );
      } else if (selectedData?.label === 'Shortest Duration') {
        return (
          Number(a.totalHours.replaceAll('h ', '').slice(0, -1)) -
          Number(b.totalHours.replaceAll('h ', '').slice(0, -1))
        );
      }
    });
    setSearchFlightCardData(sortData);
    setModalVisible2(false);
  };
  const filterAllData = searchFlightFilterData => {
    const filterData = SearchFlightCardData?.filter(item => {
      let priceRange =
        searchFlightFilterData?.priceRange[0] <
          Number(item.flightPrice.slice(1).replaceAll(',', '')) &&
        searchFlightFilterData?.priceRange[1] >
          Number(item.flightPrice.slice(1).replaceAll(',', ''));

      let numberOfStops =
        searchFlightFilterData?.numberOfStopsData === '2+ Stop'
          ? Number(item.stops.slice(0, 1)) >= 2
          : searchFlightFilterData?.numberOfStopsData === item.stops;

      let airlinesList =
        searchFlightFilterData.airlinesList !== null
          ? searchFlightFilterData.airlinesList.some(
              i => i === item.airlineName,
            )
          : true;

      let flightDurationTime = item.totalHours.slice(0, -1).split('h ');
      let flightDuration =
        searchFlightFilterData?.flightDuration[0] <=
          Number(flightDurationTime[0]) &&
        searchFlightFilterData?.flightDuration[1] >
          Number(flightDurationTime[0]);

      let arrivalTimeList = item.landingTime.slice(0, 2);
      let departureTimeList = item.departureTime.slice(0, 2);

      //ara
      let searchFlightFilterArrival =
        searchFlightFilterData?.arrivalTime?.time.split(' - ');
      let arrivalTime =
        searchFlightFilterData.arrivalTime !== null
          ? Number(searchFlightFilterArrival[0].slice(0, 2)) <=
              Number(arrivalTimeList) &&
            Number(searchFlightFilterArrival[1].slice(0, 2)) == 0
            ? 24
            : Number(searchFlightFilterArrival[1].slice(0, 2)) >
              Number(arrivalTimeList)
          : true;

      //dipp
      let searchFlightFilterdeparture =
        searchFlightFilterData?.departureTime?.time.split(' - ');

      let departureTime =
        searchFlightFilterData.departureTime !== null
          ? Number(searchFlightFilterdeparture[0].slice(0, 2)) <=
              Number(departureTimeList) &&
            Number(searchFlightFilterdeparture[1].slice(0, 2)) >
              Number(departureTimeList)
          : true;

      return (
        arrivalTime &&
        priceRange &&
        numberOfStops &&
        airlinesList &&
        flightDuration &&
        departureTime
      );
    });
    return filterData?.length > 0 ? filterData : SearchFlightCardData;
  };

  useEffect(() => {
    if (savedFlightFilter?.priceRange || expireFlightFilter?.priceRange) {
      const dd = filterAllData(
        selectedOption ? savedFlightFilter : expireFlightFilter,
      );
      setSearchFlightCardData(dd);
      setTimeout(() => {
        applydata();
      }, 1000);
    } else {
      setSearchFlightCardData(selectedOption ? savedFlight : expireFlight);
    }
  }, [isFocus, savedFlight]);

  const commonSaveFlight = i => {
    setSelectedOption(i);
    i === true
      ? setSearchFlightCardData(savedFlight)
      : setSearchFlightCardData(expireFlight);
    setSelectedData({});
  };
  const applydata = () => {
    dispatch(activeFlightFilter({}));
    dispatch(expiredFlightFilter({}));
  };
  return (
    <View style={styles.container}>
      <CommonHeader
        onPress1={false}
        onPress2={false}
        Images2={Images.search}
        Images1={Images.planIcon}
        Images2Color={color.white}
        headerName={strings.savedFlight}
      />
      <View style={styles.buttonViewStyle}>
        <TouchableOpacity
          style={[
            styles.buttonStyle,
            {
              backgroundColor: selectedOption
                ? color.commonBlue
                : color.lightGray2,
              borderRadius: wp(2),
            },
          ]}
          onPress={() => {
            commonSaveFlight(true);
          }}>
          <Text
            style={[
              styles.buttonTextStyle,
              {color: selectedOption ? color.white : color.black},
            ]}>
            {strings.active}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonStyle,
            {
              backgroundColor: selectedOption
                ? color.lightGray2
                : color.commonBlue,
              borderRadius: wp(2),
            },
          ]}
          onPress={() => {
            commonSaveFlight(false);
          }}>
          <Text
            style={[
              styles.buttonTextStyle,
              {color: !selectedOption ? color.white : color.black},
            ]}>
            {strings.expiry}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}>
        {selectedOption ? (
          <ActiveSavedAddress
            data={SearchFlightCardData}
            onPress={item => {
              openModal(item);
            }}
          />
        ) : (
          <ExpiredSavedAddress
            data={SearchFlightCardData}
            onPress={item => {
              openModal(item);
            }}
          />
        )}
      </View>
      {/* ---------------------Address Modal */}
      <Modal
        onBackdropPress={closeModal}
        onDismiss={closeModal}
        backdropOpacity={0.8}
        isVisible={modal}
        style={styles.modalStyle}>
        <View style={styles.modalViewStyle}>
          <View style={styles.headerStyle}>
            <Text style={styles.headerTextStyle}>{strings.removeAddress}</Text>
          </View>
          <View
            onPress={() => {
              onPress(item);
            }}
            style={[styles.cardBody]}>
            <View style={styles.cardHeader}>
              <View
                style={[
                  styles.cardHeaderLogo,
                  {backgroundColor: savedItem?.logo},
                ]}
              />
              <Text style={styles.cardHeaderText}>
                {savedItem?.airlineName}
              </Text>
              <Text style={styles.cardPrice}>{savedItem?.price}</Text>
              <Image
                source={Images.filled_save}
                style={{
                  height: hp(2.5),
                  width: hp(2.5),
                  resizeMode: 'contain',
                  tintColor: color.commonBlue,
                }}
              />
            </View>
            <View style={styles.cardDataBody}>
              <View style={styles.FlightsPlaseBody}>
                <Text style={styles.FlightsPlaseName}>
                  {savedItem?.departurePlace}
                </Text>
                <Text style={styles.FlightsPlaseNicName}>
                  {savedItem?.departureTime}
                </Text>
              </View>
              <View style={styles.FlightsPlaseImgBody}>
                <Image
                  style={styles.FlightsPlaseImg}
                  source={Images.airplaneWhiteIcon}
                />
                <Text style={styles.FlightsPlaseImgText}>
                  {savedItem?.totalHours}
                </Text>
              </View>
              <View style={[styles.FlightsPlaseBody, {alignItems: 'flex-end'}]}>
                <Text style={styles.FlightsPlaseName}>
                  {savedItem?.destinationPlace}
                </Text>
                <Text style={styles.FlightsPlaseNicName}>
                  {savedItem?.landingTime}
                </Text>
              </View>
            </View>
            <View style={styles.cardBottemBody}>
              <Text style={styles.FlightsPlaseName}>
                {savedItem?.departureShortForm}
              </Text>
              <Text style={styles.FlightsPlaseImgText}>{savedItem?.stops}</Text>
              <Text style={styles.FlightsPlaseName}>
                {savedItem?.destinationShortForm}
              </Text>
            </View>
            <View
              style={[
                styles.cardBottemBody,
                {
                  borderTopWidth: 1,
                  borderColor: color.grayLight,
                  paddingTop: hp(2),
                  alignItems: 'center',
                },
              ]}>
              <Text style={styles.FlightsPlaseName}>{savedItem?.date}</Text>
              <Text style={[styles.cardPrice, {marginLeft: wp(30)}]}>
                {savedItem?.flightPrice}
              </Text>
              <Text style={styles.cardPriceTitle}>/pax</Text>
            </View>
          </View>
          <View
            style={{
              borderTopWidth: 1,
              borderColor: color.grayLight,
            }}>
            <OnBoardingTwoButton
              buttonTextOne={strings.cancel}
              buttonTextTwo={strings.yesRemove}
              onPress1={() => {
                closeModal();
              }}
              onPress2={() => {
                deleteAddress();
              }}
            />
          </View>
        </View>
      </Modal>
      {/* Message Delete address success Modal */}
      <Modal
        onBackdropPress={closeFinalModal}
        onDismiss={closeFinalModal}
        isVisible={finalModal}
        style={styles.modalStyle}>
        <View style={[styles.modalViewStyle, {height: hp(20)}]}>
          <View
            style={[
              styles.headerStyle,
              {alignItems: 'center', paddingVertical: hp(2)},
            ]}>
            <Image
              source={Images.removeSuccess}
              style={{height: hp(5), width: hp(5), resizeMode: 'contain'}}
            />
            <Text style={styles.headerTextStyle}>{strings.removeSuccess}</Text>
          </View>
        </View>
      </Modal>
      <View style={styles.sortBody}>
        <TouchableOpacity
          onPress={() => setModalVisible2(true)}
          style={styles.sortImgBody}>
          <Image style={styles.sortImg} source={Images.sortIcon} />
          <Text style={styles.sortText}>Sort</Text>
        </TouchableOpacity>
        <View style={styles.sortLine}></View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('SavedFlightFilter', {header: selectedOption})
          }
          style={styles.sortImgBody}>
          <Image style={styles.sortImg} source={Images.filterIcon} />
          <Text style={styles.sortText}>{strings.filter}</Text>
        </TouchableOpacity>
      </View>
      <Modal
        style={{margin: 0, justifyContent: 'flex-end'}}
        isVisible={modalVisible2}
        backdropColor="#000000"
        onBackdropPress={() => setModalVisible2(false)}>
        <View style={styles.createAlertBody}>
          <View style={styles.createAlertTitleBody}>
            <Text style={styles.createAlertTitle}>{strings.sort}</Text>
          </View>
          <View style={styles.sortModalBody}>
            <FlatList
              data={radioButtons}
              renderItem={({item, index}) => (
                <View style={{paddingVertical: hp(1)}}>
                  <RadioButton
                    key={item.id}
                    selected={item.id === selectedData?.id}
                    onPress={() => setSelectedData(item)}
                    label={item.label}
                    labelStyle={{fontSize: fontSize(18), fontWeight: '500'}}
                    color={color.commonBlue}
                  />
                </View>
              )}
            />
          </View>
          <View
            style={{
              paddingVertical: hp(2),
              borderTopWidth: 1,
              borderColor: '#e2e2e2',
            }}>
            <OnBoardingTwoButton
              buttonTextOne={'Cancel'}
              buttonTextTwo={'Apply'}
              onPress1={closeModal2}
              onPress2={applySortdaata}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SavedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonViewStyle: {
    borderRadius: wp(2),
    flexDirection: 'row',
    marginVertical: hp(2),
    marginHorizontal: wp(4),
    justifyContent: 'space-around',
    backgroundColor: color.lightGray2,
  },
  buttonStyle: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: hp(1),
    justifyContent: 'center',
  },
  buttonTextStyle: {
    fontWeight: '600',
    fontSize: fontSize(14),
  },
  modalStyle: {
    margin: wp(0),
    justifyContent: 'flex-end',
  },
  modalViewStyle: {
    height: hp(60),
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  cardBody: {
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: hp(2),
    paddingHorizontal: wp(4),
    backgroundColor: color.white,
    borderColor: color.grayLight,
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
    fontWeight: 'bold',
    fontSize: fontSize(18),
  },
  cardHeaderLogo: {
    width: wp(5.8),
    height: wp(5.8),
    marginEnd: wp(3),
    borderRadius: 500,
  },
  cardPrice: {
    fontWeight: '600',
    fontSize: fontSize(20),
    color: color.commonBlue,
  },
  cardPriceTitle: {
    color: color.darkLight,
    fontSize: fontSize(18),
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
  headerStyle: {
    borderBottomWidth: 1,
    marginVertical: hp(2),
    paddingVertical: hp(3),
    paddingHorizontal: wp(14),
    borderColor: color.grayLight,
  },
  headerTextStyle: {
    fontWeight: 'bold',
    fontSize: fontSize(20),
  },
  sortBody: {
    elevation: 8,
    width: wp(55),
    bottom: hp(4),
    shadowRadius: 10,
    borderRadius: 500,
    shadowOpacity: 0.2,
    alignSelf: 'center',
    position: 'absolute',
    flexDirection: 'row',
    shadowColor: '#000000',
    backgroundColor: '#fff',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(4),
    shadowOffset: {width: 0, height: 7},
  },
  sortImgBody: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  sortLine: {
    height: '100%',
    borderEndWidth: 2,
    borderColor: '#e2e2e2',
  },
  sortText: {
    fontWeight: '500',
    fontSize: fontSize(20),
  },
  sortImg: {
    width: wp(6),
    height: wp(6),
  },
  createAlertBody: {
    paddingVertical: wp(6),
    borderTopEndRadius: 20,
    backgroundColor: '#fff',
    paddingHorizontal: wp(6),
    borderTopStartRadius: 20,
  },
  createAlertTitleBody: {
    alignItems: 'center',
    paddingBottom: hp(2),
    borderBottomWidth: 1,
    borderColor: '#e2e2e2',
  },
  createAlertTitle: {
    fontWeight: '600',
    fontSize: fontSize(20),
  },
  sortModalBody: {
    borderBottomWidth: 1,
    borderColor: '#e2e2e2',
    paddingVertical: hp(1),
  },
});
