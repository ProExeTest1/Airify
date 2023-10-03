import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
  Share,
  Alert,
  Animated,
  useAnimatedValue,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {fontSize, hp, wp} from '../../helpers/helper';
import {Images} from '../../helpers/IconConstant';
import {OnBoardingTwoButton, SearchFlightsHeader} from '../../components';
import {TicketList} from '../../components/index';
import {SearchFlightData} from '../../assets/DummyData/SearchFlightData';
import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import {CreatePriceAlert} from '../../components/index';
import RadioGroup, {
  RadioButton,
  RadioButtonProps,
} from 'react-native-radio-buttons-group';
import {color} from '../../helpers/ColorConstant';
import {radioButtons} from '../../assets/DummyData/radioButtons';

const SearchFlights = props => {
  const dispatch = useDispatch();
  const [SelectDate, setSelectDate] = useState(
    useSelector(e => e.date.normalDate),
  );
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [priceTargets, setPriceTargets] = useState([1000, 1500]);
  const [departureTime, setDepartureTime] = useState({});
  const [CreatePriceData, setCreatePriceData] = useState({});
  const [ToggleSwitchBut1, setToggleSwitchBut1] = useState(false);
  const [ToggleSwitchBut2, setToggleSwitchBut2] = useState(false);
  const [SearchFlightCardData, setSearchFlightCardData] =
    useState(SearchFlightData);

  const [selectedData, setSelectedData] = useState({});
  const onShare = async () => {
    try {
      await Share.share({
        message: 'hiiii',
        url: SearchFlightData.filter(i => {
          if (
            `${new Date().toLocaleString().split(',')[0]}` == SelectDate?.date
          ) {
            return (
              i.pickTime >
              `${new Date(Date.now() + 1800000).getHours()}:${new Date(
                Date.now() + 1800000,
              ).getMinutes()}`
            );
          }
          return i;
        }),
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  const addAlert = () => {
    setCreatePriceData({
      priceTargets: priceTargets,
      departureTime:
        ToggleSwitchBut1 !== true
          ? false
          : departureTime.time === undefined
          ? false
          : departureTime,
      onlyDirectFlights: ToggleSwitchBut2,
    });
    setModalVisible1(false);
  };
  const closeModal1 = () => {
    setModalVisible1(false);
  };
  const closeModal2 = () => {
    setSearchFlightCardData(SearchFlightData);
    setSelectedData({});
    setModalVisible2(false);
  };

  const applySortdaata = () => {
    const sortData = SearchFlightData.sort((a, b) => {
      let aData =
        a.day === 1
          ? Number(a.lendTime.replaceAll(':', '.'))
          : Number(a.lendTime.replaceAll(':', '.')) + 24;
      let bData =
        b.day === 1
          ? Number(b.lendTime.replaceAll(':', '.'))
          : Number(b.lendTime.replaceAll(':', '.')) + 24;
      if (selectedData?.label === 'Lowest Price') {
        return (
          Number(a.price.slice(1).replaceAll(',', '')) -
          Number(b.price.slice(1).replaceAll(',', ''))
        );
      } else if (selectedData?.label === 'Direct Flights First') {
        return (
          Number(a.stop === 'Direct' ? 0 : a.stop.slice(0, 1)) -
          Number(b.stop === 'Direct' ? 0 : b.stop.slice(0, 1))
        );
      } else if (selectedData?.label === 'Earliest Departure') {
        return aData - bData;
      } else if (selectedData?.label === 'Latest Departure') {
        return bData - aData;
      } else if (selectedData?.label === 'Earliest Arrival') {
        return (
          Number(a.pickTime.replaceAll(':', '.')) -
          Number(b.pickTime.replaceAll(':', '.'))
        );
      } else if (selectedData?.label === 'Latest Arrival') {
        return (
          Number(b.pickTime.replaceAll(':', '.')) -
          Number(a.pickTime.replaceAll(':', '.'))
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
  return (
    <View style={styles.body}>
      <SearchFlightsHeader
        SelectDate={SelectDate}
        setSelectDate={setSelectDate}
        onShare={onShare}
        dispatch={dispatch}
        setModalVisible1={setModalVisible1}
      />
      <TicketList
        SelectDate={SelectDate}
        SearchFlightCardData={SearchFlightCardData}
      />
      <View style={styles.sortBody}>
        <TouchableOpacity
          onPress={() => setModalVisible2(true)}
          style={styles.sortImgBody}>
          <Image style={styles.sortImg} source={Images.sortIcon} />
          <Text style={styles.sortText}>Sort</Text>
        </TouchableOpacity>
        <View style={styles.sortLine}></View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('SearchFlightsFilter')}
          style={styles.sortImgBody}>
          <Image style={styles.sortImg} source={Images.filterIcon} />
          <Text style={styles.sortText}>Filter</Text>
        </TouchableOpacity>
      </View>
      <Modal
        style={{margin: 0, justifyContent: 'flex-end'}}
        isVisible={modalVisible1}
        backdropColor="#000000"
        onBackdropPress={() => setModalVisible1(false)}>
        <CreatePriceAlert
          setPriceTargets={setPriceTargets}
          setDepartureTime={setDepartureTime}
          setToggleSwitchBut1={setToggleSwitchBut1}
          setToggleSwitchBut2={setToggleSwitchBut2}
          priceTargets={priceTargets}
          departureTime={departureTime}
          ToggleSwitchBut1={ToggleSwitchBut1}
          ToggleSwitchBut2={ToggleSwitchBut2}
          addAlert={addAlert}
          closeModal={closeModal1}></CreatePriceAlert>
      </Modal>
      <Modal
        style={{margin: 0, justifyContent: 'flex-end'}}
        isVisible={modalVisible2}
        backdropColor="#000000"
        onBackdropPress={() => setModalVisible2(false)}>
        <View style={styles.createAlertBody}>
          <View style={styles.createAlertTitleBody}>
            <Text style={styles.createAlertTitle}>Sort</Text>
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
              paddingVertical: hp(4.5),
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
const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  ScrollViewBody: {
    flex: 1,
    paddingHorizontal: wp(7),
  },
  sortBody: {
    position: 'absolute',
    paddingVertical: hp(1.8),
    paddingHorizontal: wp(4),
    width: wp(55),
    bottom: hp(5),
    alignSelf: 'center',
    borderRadius: 500,
    backgroundColor: '#fff',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 7},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
    flexDirection: 'row',
  },
  sortImgBody: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  sortLine: {
    borderColor: '#e2e2e2',
    borderEndWidth: 2,
    height: '100%',
  },
  sortText: {
    fontSize: fontSize(20),
    fontWeight: '500',
  },
  sortImg: {
    height: wp(6),
    width: wp(6),
  },
  createAlertBody: {
    backgroundColor: '#fff',
    paddingVertical: wp(6),
    paddingHorizontal: wp(6),
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  createAlertTitleBody: {
    alignItems: 'center',
    paddingBottom: hp(2),
    borderBottomWidth: 1,
    borderColor: '#e2e2e2',
  },
  createAlertTitle: {
    fontSize: fontSize(20),
    fontWeight: '600',
  },
  sortModalBody: {
    paddingVertical: hp(1),
    borderBottomWidth: 1,
    borderColor: '#e2e2e2',
  },
});
export default SearchFlights;
