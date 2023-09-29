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
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fontSize, hp, wp} from '../../helpers/helper';
import {Images} from '../../helpers/IconConstant';
import {SearchFlightsHeader} from '../../components';
import {TicketList} from '../../components/index'
import {SearchFlightData} from '../../assets/DummyData/SearchFlightData';
import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const SearchFlights = props => {
  const dispatch = useDispatch();
  const [SelectDate, setSelectDate] = useState(
    useSelector(e => e.date.normalDate),
  );
  const [modalVisible1, setModalVisible1] = useState(false);

  const onShare = async () => {
    try {
      const result = await Share.share({
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
  return (
    <View style={styles.body}>
      <SearchFlightsHeader
        SelectDate={SelectDate}
        setSelectDate={setSelectDate}
        onShare={onShare}
        dispatch={dispatch}
        setModalVisible1={setModalVisible1}
      />
      <TicketList SelectDate={SelectDate} />
      <View style={styles.sortBody}>
        <TouchableOpacity style={styles.sortImgBody}>
          <Image style={styles.sortImg} source={Images.sortIcon} />
          <Text style={styles.sortText}>Sort</Text>
        </TouchableOpacity>
        <View style={styles.sortLine}></View>
        <TouchableOpacity style={styles.sortImgBody}>
          <Image style={styles.sortImg} source={Images.filterIcon} />
          <Text style={styles.sortText}>Filter</Text>
        </TouchableOpacity>
      </View>
      <Modal
        style={{margin: 0, justifyContent: 'flex-end'}}
        isVisible={modalVisible1}
        backdropColor="#000000"
        onBackdropPress={() => setModalVisible1(false)}>
        <View
          style={{
            backgroundColor: '#fff',
            paddingVertical: wp(6),
            paddingHorizontal: wp(6),
            borderTopEndRadius: 20,
            borderTopStartRadius: 20,
          }}>
          <View
            style={{
              alignItems: 'center',
              paddingBottom: hp(2),
              borderBottomWidth: 1,
              borderColor: '#e2e2e2',
            }}>
            <Text style={{fontSize: fontSize(20), fontWeight: '600'}}>
              Create Price Alert
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: hp(3),
              alignItems: 'center',
            }}>
            <Image
              style={{height: wp(6), width: wp(6), marginEnd: wp(4)}}
              source={Images.bell}></Image>
            <Text
              style={{
                fontSize: fontSize(17),
                width: wp(78),
                fontWeight: '500',
              }}>
              Never miss a deal! Get notified when flight prices drop.
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#fafafa',
              borderWidth: 1,
              borderColor: '#e4e4e4',
              borderRadius: 10,
              paddingHorizontal: wp(4),
            }}>
            <View style={styles.cardDataBody}>
              <View style={styles.FlightsPlaseBody}>
                <Text style={styles.FlightsPlaseName}>New York</Text>
                <Text style={styles.FlightsPlaseNicName}>JFK</Text>
              </View>
              <View style={styles.FlightsPlaseImgBody}>
                <Image
                  style={styles.FlightsPlaseImg}
                  source={Images.airplaneGreIcon}
                />
                <Text style={styles.FlightsPlaseImgText}>
                  {`${`${new Date()}`.slice(
                    3,
                    10,
                  )}, ${new Date().getFullYear()} - ${`${new Date(
                    Date.now() + 86400000 * 45,
                  )}`.slice(3, 10)}, ${new Date(
                    Date.now() + 86400000 * 45,
                  ).getFullYear()}`}
                </Text>
              </View>
              <View style={[styles.FlightsPlaseBody, {alignItems: 'flex-end'}]}>
                <Text style={styles.FlightsPlaseName}>Paris</Text>
                <Text style={styles.FlightsPlaseNicName}>CDG</Text>
              </View>
            </View>
            <View style={styles.cardBottemBody}>
              <Text style={styles.FlightsPlaseName}>Usa</Text>
              <Text style={styles.FlightsPlaseImgText}>1 pax - Economy</Text>
              <Text style={styles.FlightsPlaseName}>France</Text>
            </View>
          </View>
          <MultiSlider
          step={3}
            min={700}
            max={2000}
            values={[1000,1500]}
            enabledTwo={true}
            onValuesChange={(a)=>console.log(a)}
          />
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
  cardDataBody: {
    paddingTop: hp(2.5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  FlightsPlaseBody: {
    width: wp(20),
  },
  FlightsPlaseImgBody: {
    alignItems: 'center',
    flex: 1,
  },
  FlightsPlaseImg: {
    height: hp(5.5),
    width: hp(19),
  },
  FlightsPlaseImgText: {
    color: '#7e7e7f',
    fontSize: fontSize(11),
    marginTop: hp(1),
  },
  FlightsPlaseNicName: {
    fontSize: fontSize(21),
    color: '#000',
    fontWeight: 'bold',
    marginTop: hp(1.5),
  },
  FlightsPlaseName: {
    color: '#7e7e7f',
    fontWeight: '500',
  },
  cardBottemBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: hp(2.5),
    paddingTop: hp(1),
  },
});
export default SearchFlights;
