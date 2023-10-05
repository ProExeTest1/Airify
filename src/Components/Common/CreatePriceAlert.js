import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {MultiSliderComponets, OnBoardingTwoButton} from '../index';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import ToggleSwitch from 'toggle-switch-react-native';
import {wp, fontSize, hp} from '../../helper/Constant';
import {Images} from '../../helper/IconConstant';
import {color} from '../../helper/ColorConstant';
import {TimeData} from '../../assets/DummyData/timeData';
const CreatePriceAlert = ({
  setPriceTargets,
  setDepartureTime,
  setToggleSwitchBut1,
  setToggleSwitchBut2,
  priceTargets,
  departureTime,
  ToggleSwitchBut1,
  ToggleSwitchBut2,
  addAlert,
  closeModal,
}) => {
  return (
    <View style={styles.createAlertBody}>
      <View style={styles.createAlertTitleBody}>
        <Text style={styles.createAlertTitle}>Create Price Alert</Text>
      </View>
      <View style={styles.createAlertNotifiBody}>
        <Image style={styles.createAlertNotifiImg} source={Images.bell}></Image>
        <Text style={styles.createAlertNotifiText}>
          Never miss a deal! Get notified when flight prices drop.
        </Text>
      </View>
      <View style={styles.createAlertCardBody}>
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
      <View style={styles.PriceTargetsBody}>
        <Image style={styles.PriceTargetsImg} source={Images.dollarIcon} />
        <Text style={styles.PriceTargetsTitle}>Price Targets</Text>
        <Text
          style={
            styles.PriceTargetsText
          }>{`$${priceTargets[0]} - $${priceTargets[1]}`}</Text>
      </View>
      <MultiSliderComponets
        min={700}
        max={2000}
        values={priceTargets}
        sliderLength={wp(88)}
        onValuesChangeFinish={a => setPriceTargets(a)}
      />
      <View style={styles.PriceTargetsBody}>
        <Image style={styles.PriceTargetsImg} source={Images.timeIcon} />
        <Text style={styles.PriceTargetsTitle}>Departure Time</Text>
        <ToggleSwitch
          isOn={ToggleSwitchBut1}
          size="medium"
          onColor={color.commonBlue}
          onToggle={isOn => setToggleSwitchBut1(isOn)}
        />
      </View>
      {ToggleSwitchBut1 && (
        <FlatList
          data={TimeData}
          numColumns={2}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => {
                item.time === departureTime?.time
                  ? setDepartureTime({})
                  : setDepartureTime(item);
              }}
              style={[
                styles.departureTimeBody,
                {
                  marginEnd: index % 2 === 0 ? wp(3) : 0,
                  borderColor:
                    item.time === departureTime?.time
                      ? color.commonBlue
                      : '#e4e4e4',
                },
              ]}>
              <Text style={{color: '#7e7e7f', marginBottom: hp(1)}}>
                {item.title}
              </Text>
              <Text
                style={{
                  color: '#000',
                  fontSize: fontSize(16),
                  fontWeight: '500',
                }}>
                {item.time}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
      <View style={styles.PriceTargetsBody}>
        <Image style={styles.PriceTargetsImg} source={Images.flightIcon} />
        <Text style={styles.PriceTargetsTitle}>Only Direct Flights</Text>
        <ToggleSwitch
          isOn={ToggleSwitchBut2}
          size="medium"
          onColor={color.commonBlue}
          onToggle={isOn => setToggleSwitchBut2(isOn)}
        />
      </View>
      <View
        style={{
          paddingVertical: hp(4),
          borderTopWidth: 1,
          borderColor: '#e2e2e2',
        }}>
        <OnBoardingTwoButton
          buttonTextOne={'Cancel'}
          buttonTextTwo={'Create'}
          onPress1={closeModal}
          onPress2={addAlert}
        />
      </View>
    </View>
  );
};

export default CreatePriceAlert;

const styles = StyleSheet.create({
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
  createAlertNotifiBody: {
    flexDirection: 'row',
    paddingVertical: hp(3),
    alignItems: 'center',
  },
  createAlertNotifiImg: {
    height: wp(6),
    width: wp(6),
    marginEnd: wp(4),
  },
  createAlertNotifiText: {
    fontSize: fontSize(17),
    width: wp(78),
    fontWeight: '500',
  },
  createAlertCardBody: {
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: '#e4e4e4',
    borderRadius: 10,
    paddingHorizontal: wp(4),
    marginBottom: hp(1),
  },
  PriceTargetsBody: {
    paddingVertical: hp(1.5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  PriceTargetsImg: {
    height: wp(7.5),
    width: wp(7.5),
    marginEnd: wp(4),
  },
  PriceTargetsTitle: {
    fontSize: fontSize(18),
    fontWeight: '500',
    flex: 1,
  },
  PriceTargetsText: {
    fontSize: fontSize(20),
  },
  departureTimeBody: {
    flex: 1,
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    marginBottom: hp(1.5),
    alignItems: 'center',
  },
});
