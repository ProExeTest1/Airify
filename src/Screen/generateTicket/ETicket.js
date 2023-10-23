import React from 'react';
import {View, Text, StyleSheet, Alert, Image} from 'react-native';
import {CommonHeader} from '../../components';
import {color} from '../../helper/ColorConstant';
import {Images} from '../../helper/IconConstant';
import {strings} from '../../helper/Strings';
import {fontSize, hp, wp} from '../../helper/Constant';
import {useRoute} from '@react-navigation/native';
import Barcode from '@kichiyaki/react-native-barcode-generator';

const ETicket = ({navigation: {goBack}, navigation}) => {
  const FlightData = useRoute()?.params?.header;
  console.log(FlightData);
  const TicketData = ({label, text}) => {
    return (
      <View style={styles.tikcetDetailViewStyle}>
        <Text style={styles.labelTextStyle}>{label}</Text>
        <Text style={styles.detailsTextStyle}>{text}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <CommonHeader
        onPress1={true}
        onPress2={true}
        Images2={Images.download}
        Images1={Images.backIcon}
        Images2Color={color.white}
        headerName={strings.eTicket}
        Images1Color={color.white}
        navigation2={() => {
          Alert.alert('Downloading your E-Ticket');
        }}
        navigation1={() => {
          goBack();
        }}
      />
      <View style={styles.bodyView}>
        <View style={styles.ticketMainView}>
          <View style={{alignItems: 'center'}}>
            <Barcode
              value={FlightData?.bookingID}
              format="CODE128"
              style={{
                paddingVertical: hp(1),
                marginHorizontal: wp(4),
                marginVertical: hp(1),
              }}
            />
            <Text>Show your ID and this barcode at the check-in gate</Text>
          </View>
          <View style={styles.curveViewStyle}>
            <View style={[styles.curveStyle, {right: wp(8)}]}></View>
            <View style={styles.dashedStyle} />
            <View style={[styles.curveStyle, {left: wp(8)}]}></View>
          </View>
          <View style={styles.cartView}>
            <View onPress={() => {}} style={[styles.cardBody]}>
              <View style={styles.cardHeader}>
                <View
                  style={[
                    styles.cardHeaderLogo,
                    {backgroundColor: FlightData?.searchFlightCardData?.logo},
                  ]}
                />
                <Text style={styles.cardHeaderText}>
                  {FlightData?.searchFlightCardData?.airlineName}
                </Text>
                <Text
                  style={
                    styles.cardPrice
                  }>{`${FlightData?.searchFlightCardData?.searchFlightDateData[0].slice(
                  0,
                  3,
                )}, ${
                  FlightData?.searchFlightCardData?.searchFlightDateData[1]
                }`}</Text>
              </View>
              <View style={styles.cardDataBody}>
                <View style={styles.FlightsPlaseBody}>
                  <Text style={styles.FlightsPlaseName}>
                    {FlightData?.searchFlightData?.from}
                  </Text>
                  <Text style={styles.FlightsPlaseNicName}>
                    {FlightData?.searchFlightCardData?.pickTime}
                  </Text>
                </View>
                <View style={styles.FlightsPlaseImgBody}>
                  <Image
                    style={styles.FlightsPlaseImg}
                    source={Images.airplaneWhiteIcon}
                  />
                  <Text style={styles.FlightsPlaseImgText}>
                    {FlightData?.searchFlightCardData?.totalHours}
                  </Text>
                </View>
                <View
                  style={[styles.FlightsPlaseBody, {alignItems: 'flex-end'}]}>
                  <Text style={styles.FlightsPlaseName}>
                    {FlightData?.searchFlightData?.to}
                  </Text>
                  <Text style={styles.FlightsPlaseNicName}>
                    {FlightData?.searchFlightCardData?.lendTime}
                  </Text>
                </View>
              </View>
              <View style={styles.cardBottemBody}>
                <Text style={styles.FlightsPlaseName}>
                  {' '}
                  {FlightData?.searchFlightData?.fromShortform}
                </Text>
                <Text style={styles.FlightsPlaseImgText}>
                  {FlightData?.searchFlightCardData?.stop}
                </Text>
                <Text style={styles.FlightsPlaseName}>
                  {' '}
                  {FlightData?.searchFlightData?.toShortform}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: color.lightGray,
              marginHorizontal: wp(6),
            }}>
            <TicketData
              label={'Passenger Name'}
              text={FlightData?.SelectSeatData[0]?.name}
            />
            <TicketData
              label={'Email'}
              text={FlightData?.contactDetails?.Email}
            />
            <TicketData
              label={'Phone Numbe'}
              text={FlightData?.contactDetails?.PhoneNumber}
            />
            <TicketData
              label={'Class'}
              text={FlightData?.searchFlightData?.class}
            />
            <TicketData label={'Booking ID'} text={FlightData?.bookingID} />
            <TicketData label={'Flight Number'} text={'EK202'} />
            <TicketData label={'Gate'} text={'25'} />
            <TicketData
              label={'Seat Number'}
              text={FlightData?.SelectSeatData[0]?.seatNo}
            />
          </View>
          <View style={{alignItems: 'center', marginTop: hp(1)}}>
            <Text>Enjoy traveling around the world with us</Text>
            <Text style={{color: color.commonBlue}}>www.airify.yourdomain</Text>
          </View>
        </View>
        <Image
          source={Images.ticketWave}
          style={{width: wp(88), height: hp(2)}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.commonBlue,
  },
  bodyView: {
    flex: 1,
    borderTopWidth: 0.4,
    borderColor: color.white,
    paddingVertical: hp(2),
    paddingHorizontal: wp(6),
    paddingBottom: hp(4),
  },
  ticketMainView: {
    flex: 1,
    backgroundColor: color.white,
    borderTopLeftRadius: wp(3),
    borderTopRightRadius: wp(3),
  },
  curveStyle: {
    width: wp(13),
    height: wp(13),
    borderRadius: 100 / 2,
    backgroundColor: color.commonBlue,
  },
  curveViewStyle: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(1),
  },
  qrStyle: {height: hp(16), width: wp(80), resizeMode: 'contain'},
  dashedStyle: {
    borderWidth: 1,
    borderStyle: 'dashed',
    flex: 1,
    borderRadius: 1,
    borderColor: color.darkLight,
    marginHorizontal: wp(-8),
  },
  cartView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    marginHorizontal: wp(6),
    borderColor: color.lightGray,
  },
  cardBody: {
    flex: 1,
    backgroundColor: color.white,
    borderColor: color.grayLight,
  },
  cardHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingVertical: hp(1.5),
    borderColor: color.grayLight,
  },
  cardHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: fontSize(16),
  },
  cardHeaderLogo: {
    width: wp(5.8),
    height: wp(5.8),
    marginEnd: wp(3),
    borderRadius: 500,
  },
  cardPrice: {
    fontWeight: '600',
    fontSize: fontSize(13),
    color: color.black,
  },
  cardPriceTitle: {
    color: color.darkLight,
    fontSize: fontSize(16),
  },
  cardDataBody: {
    paddingTop: hp(1.5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  FlightsPlaseBody: {
    width: wp(20),
  },
  FlightsPlaseImgBody: {
    flex: 1,
    alignItems: 'center',
  },
  FlightsPlaseImg: {
    width: hp(17),
    height: hp(5),
  },
  FlightsPlaseImgText: {
    color: color.darkLight,
    fontSize: fontSize(13),
  },
  FlightsPlaseNicName: {
    color: '#000',
    fontWeight: 'bold',
    marginTop: hp(1.5),
    fontSize: fontSize(19),
  },
  FlightsPlaseName: {
    fontWeight: '500',
    color: color.darkLight,
  },
  cardBottemBody: {
    paddingTop: hp(1),
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: hp(1.5),
    justifyContent: 'space-between',
  },
  filledSavedStyle: {
    width: hp(2.5),
    height: hp(2.5),
    resizeMode: 'contain',
    tintColor: color.commonBlue,
  },
  tikcetDetailViewStyle: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: hp(1),
  },
  detailsTextStyle: {
    fontSize: fontSize(14),
    fontWeight: 'bold',
    color: color.black,
  },
  labelTextStyle: {
    fontSize: fontSize(14),
    color: '#383838',
  },
});

export default ETicket;
