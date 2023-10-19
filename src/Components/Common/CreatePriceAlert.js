import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';

import {strings} from '../../helper/Strings';
import {Images} from '../../helper/IconConstant';
import {color} from '../../helper/ColorConstant';
import {wp, fontSize, hp} from '../../helper/Constant';
import {TimeData} from '../../assets/DummyData/timeData';
import {MultiSliderComponets, OnBoardingTwoButton} from '../index';

const CreatePriceAlert = ({
  addAlert,
  closeModal,
  priceTargets,
  departureTime,
  setPriceTargets,
  ToggleSwitchBut1,
  ToggleSwitchBut2,
  setDepartureTime,
  setToggleSwitchBut1,
  setToggleSwitchBut2,
}) => {
  return (
    <View style={styles.createAlertBody}>
      <View style={styles.createAlertTitleBody}>
        <Text style={styles.createAlertTitle}>{strings.PriceAlertHeader}</Text>
      </View>
      <View style={styles.createAlertNotifiBody}>
        <Image style={styles.createAlertNotifiImg} source={Images.bell}></Image>
        <Text style={styles.createAlertNotifiText}>
          {strings.PriceAlertDis}
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
        <Text style={styles.PriceTargetsTitle}>{strings.PriceTarget}</Text>
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
        <Text style={styles.PriceTargetsTitle}>{strings.DepartureTime}</Text>
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
              <Text style={styles.departureTitleStyle}>{item.title}</Text>
              <Text style={styles.departureTimeTextStyle}>{item.time}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      <View style={styles.PriceTargetsBody}>
        <Image style={styles.PriceTargetsImg} source={Images.flightIcon} />
        <Text style={styles.PriceTargetsTitle}>{strings.DirectFlight}</Text>
        <ToggleSwitch
          size="medium"
          isOn={ToggleSwitchBut2}
          onColor={color.commonBlue}
          onToggle={isOn => setToggleSwitchBut2(isOn)}
        />
      </View>
      <View style={styles.buttonStyle}>
        <OnBoardingTwoButton
          onPress2={addAlert}
          onPress1={closeModal}
          buttonTextOne={'Cancel'}
          buttonTextTwo={'Create'}
        />
      </View>
    </View>
  );
};

export default CreatePriceAlert;

const styles = StyleSheet.create({
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
    width: hp(19),
    height: hp(5.5),
  },
  FlightsPlaseImgText: {
    color: '#7e7e7f',
    marginTop: hp(1),
    fontSize: fontSize(11),
  },
  FlightsPlaseNicName: {
    color: '#000',
    fontWeight: 'bold',
    marginTop: hp(1.5),
    fontSize: fontSize(21),
  },
  FlightsPlaseName: {
    color: '#7e7e7f',
    fontWeight: '500',
  },
  cardBottemBody: {
    paddingTop: hp(1),
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: hp(2.5),
    justifyContent: 'space-between',
  },
  createAlertBody: {
    paddingVertical: wp(6),
    backgroundColor: '#fff',
    borderTopEndRadius: 20,
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
  createAlertNotifiBody: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(3),
  },
  createAlertNotifiImg: {
    width: wp(6),
    height: wp(6),
    marginEnd: wp(4),
  },
  createAlertNotifiText: {
    width: wp(78),
    fontWeight: '500',
    fontSize: fontSize(17),
  },
  createAlertCardBody: {
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: hp(1),
    borderColor: '#e4e4e4',
    paddingHorizontal: wp(4),
    backgroundColor: '#fafafa',
  },
  PriceTargetsBody: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: hp(1.5),
  },
  PriceTargetsImg: {
    width: wp(7.5),
    height: wp(7.5),
    marginEnd: wp(4),
  },
  PriceTargetsTitle: {
    flex: 1,
    fontWeight: '500',
    fontSize: fontSize(18),
  },
  PriceTargetsText: {
    fontSize: fontSize(20),
  },
  departureTimeBody: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: hp(1.5),
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
    backgroundColor: '#fafafa',
  },
  sliderViewStyle: {
    width: wp(6.6),
    borderWidth: 4,
    height: hp(3.07),
    borderRadius: 100,
    backgroundColor: '#fff',
    borderColor: color.commonBlue,
  },
  unselectedStyle: {
    height: 4,
    backgroundColor: '#eeeeee',
  },
  departureTitleStyle: {
    color: '#7e7e7f',
    marginBottom: hp(1),
  },
  selectedStyle: {
    height: 4,
    backgroundColor: color.commonBlue,
  },
  departureTimeTextStyle: {
    color: '#000',
    fontWeight: '500',
    fontSize: fontSize(16),
  },
  buttonStyle: {
    borderTopWidth: 1,
    paddingVertical: hp(4),
    borderColor: '#e2e2e2',
  },
});
