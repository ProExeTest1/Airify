import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  CommonHeader,
  FlightDetailsCard,
  PriceDetails,
  TicktBookingProgressBar,
} from '../../components';
import {Images} from '../../helper/IconConstant';
import {strings} from '../../helper/Strings';
import {fontSize, hp, wp} from '../../helper/Constant';
import {color} from '../../helper/ColorConstant';
import ToggleSwitch from 'toggle-switch-react-native';
import {useSelector} from 'react-redux';

const PatmentConfirmation = ({navigation}) => {
  const [ToggleSwitchBut1, setToggleSwitchBut1] = useState(false);
  const [ToggleSwitchBut2, setToggleSwitchBut2] = useState(false);
  const item = useSelector(state => state.searchFlight.searchFlightCardData);
  return (
    <View style={styles.headerViewStyle}>
      <CommonHeader
        headerName={'Payment Confirmaion'}
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
      <TicktBookingProgressBar progress={2}></TicktBookingProgressBar>
      <View style={styles.ScrollBody}>
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <FlightDetailsCard item={item} />
          <View style={styles.boxBody}>
            <View style={[styles.boxTitleBody, {alignItems: 'center'}]}>
              <Image style={styles.boxIcon} source={Images.payment}></Image>
              <Text style={styles.boxTitle}>Payment Method</Text>
              <Image style={styles.skipIcon} source={Images.forward}></Image>
            </View>
            <View style={styles.StopsButBody}></View>
          </View>
          <View style={styles.boxBody}>
            <View style={styles.boxTitleBody}>
              <Image style={styles.boxIcon} source={Images.coinsIcon}></Image>
              <View style={[styles.boxTitle, {paddingEnd: wp(5)}]}>
                <Text style={styles.boxTitle}>{`You Have ${6450} Points`}</Text>
                <Text style={{marginTop: hp(1)}}>
                  100 points equals $1. You will get 4,000 points after this
                  booking
                </Text>
              </View>
              <View>
                <ToggleSwitch
                  isOn={ToggleSwitchBut1}
                  size="medium"
                  onColor={color.commonBlue}
                  onToggle={isOn => setToggleSwitchBut1(isOn)}
                />
              </View>
            </View>
            <View style={styles.StopsButBody}></View>
          </View>
          <View style={styles.boxBody}>
            <View style={[styles.boxTitleBody, {alignItems: 'center'}]}>
              <Image style={styles.boxIcon} source={Images.discount}></Image>
              <Text style={styles.boxTitle}>Dicouts / Voucher</Text>
              <Image style={styles.skipIcon} source={Images.forward}></Image>
            </View>
            <View style={styles.StopsButBody}></View>
          </View>
          <PriceDetails />
        </ScrollView>
      </View>
      <View style={styles.bottomButtonBody}>
        <TouchableOpacity onPress={() => {}} style={styles.okButton}>
          <Text style={styles.okButtonText}>{strings.payNow}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PatmentConfirmation;

const styles = StyleSheet.create({
  headerViewStyle: {
    flex: 1,
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
  ScrollBody: {
    flex: 1,
    paddingHorizontal: wp(6),
    paddingTop: hp(3),
  },
  boxBody: {
    backgroundColor: '#fff',
    paddingHorizontal: wp(4),
    borderRadius: 10,
    marginBottom: hp(2),
  },
  boxTitleBody: {
    paddingVertical: hp(2),
    flexDirection: 'row',
  },
  boxTitle: {
    fontSize: fontSize(17),
    fontWeight: 'bold',
    flex: 1,
  },
  boxVelue: {
    fontSize: fontSize(18),
  },
  StopsButBody: {
    // paddingVertical: hp(1.5),
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
  boxIcon: {
    height: wp(6),
    width: wp(6),
    marginEnd: wp(4),
  },
  skipIcon: {
    height: wp(4),
    width: wp(4),
  },
});
