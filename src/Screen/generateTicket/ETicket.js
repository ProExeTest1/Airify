import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Alert, Image, ScrollView} from 'react-native';
import {CommonHeader} from '../../components';

import {Images} from '../../helper/IconConstant';
import {strings} from '../../helper/Strings';
import {fontSize, hp, wp} from '../../helper/Constant';
import {useRoute} from '@react-navigation/native';
import Barcode from '@kichiyaki/react-native-barcode-generator';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import storage from '@react-native-firebase/storage';
import {AlertConstant} from '../../helper/AlertConstant';
import {useSelector} from 'react-redux';

const ETicket = ({navigation: {goBack}, navigation}) => {
  const [getImage, setGetImage] = useState({});
  const FlightData = useRoute()?.params?.header;
  useEffect(() => {
    handleSignUp();
  }, []);
  const TicketData = ({label, text}) => {
    return (
      <View style={styles.tikcetDetailViewStyle}>
        <Text style={styles.labelTextStyle}>{label}</Text>
        <Text style={styles.detailsTextStyle}>{text}</Text>
      </View>
    );
  };

  const handleSignUp = async () => {
    try {
      const url = await storage()
        .ref(`/commenImage/airplaneWhite.png`)
        .getDownloadURL()
        .catch(err => {
          console.log('error in download', err);
        });
      const url2 = await storage()
        .ref(`/commenImage/ticketWave.png`)
        .getDownloadURL()
        .catch(err => {
          console.log('error in download', err);
        });
      const url3 = await storage()
        .ref(`/commenImage/qr.png`)
        .getDownloadURL()
        .catch(err => {
          console.log('error in download', err);
        });
      setGetImage({airplaneWhite: url, ticketWave: url2, qrCode: url3});
    } catch (error) {
      console.log(error);
    }
  };
  const createPDF = async () => {
    let options = {
      html: `
      <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ticket</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #007bff;
            display: flex;
            position: relative;
            justify-content: center;
        }

        .ticket-container {
            flex-direction: column;
            align-items: center;
            background-color: #fff;
            border-top: 4px solid #007bff;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            margin: 20px;
            position: absolute;
            margin: auto;
        }

        .barcode {
            margin: 30px 0;
            align-items: center;
            justify-content: center;
        }

        .flight-info {
            text-align: center;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #ccc;
            padding: 10px 0;
        }

        .contact-info {
            padding: 0px 20px;
        }

        .footer {
            margin-top: 20px;
            font-style: italic;
        }

        .wave {
            width: 100%;
            height: 20px;
            object-fit: cover;
        }
    </style>
</head>

<body>
    <div class="ticket-container">
        <div class="barcode">
            <div style="display: flex;"><img style="width: 50%;height: auto;margin: auto;" src="${
              getImage.qrCode
            }"></img></div>
            <p style="text-align: center;">Show your ID and this barcode at the check-in gate</p>
        </div>
        <div style="display: flex;height: 50px;align-items: center;justify-content: center;">
            <div
                style="height: 50px;width: 50px;border-radius: 50%;background: #007bff;position: absolute;left: -20px;">
            </div>
            <div style="width: 100%;border-top: dashed 2px #b8b8b8;"></div>
            <div
                style="height: 50px;width: 50px;border-radius: 50%;background: #007bff;position: absolute;right: -20px;">
            </div>
        </div>
        <div style="padding: 10px 20px;">
            <div class="flight-info">
                <div style="display: flex;align-items: center;">
                    <div style="height: 20px;width: 20px;background-color:${
                      FlightData?.searchFlightCardData?.logo
                    };border-radius: 100%;margin-right: 10px;">
                    </div>
                    <label>${
                      FlightData?.searchFlightCardData?.airlineName
                    }</label>
                </div>
                <div><label>${`${FlightData?.searchFlightCardData?.searchFlightDateData[0].slice(
                  0,
                  3,
                )}`}</label></div>
            </div>
            <div style="display: flex;align-items: center;justify-content: center;">
                <div style="width: 30%;padding: 10px 0;">
                    <div style="color: #929292;font-size: small;">${
                      FlightData?.searchFlightData?.from
                    }</div>
                    <div style="margin: 18px 0;font-size: large;font-weight: 500;">${
                      FlightData?.searchFlightCardData?.pickTime
                    }</div>
                </div>
                <div style="width: 40%;padding: 10px 0;text-align: center;">
                    <img style="width: 100%;height: auto;" src='${
                      getImage?.airplaneWhite
                    }'></img>
                    <div style="color: #929292;font-size: smaller;">${
                      FlightData?.searchFlightCardData?.totalHours
                    }</div>

                </div>
                <div style="width: 30%;padding: 10px 0;text-align: right;">
                    <div style="color: #929292;font-size: small;">${
                      FlightData?.searchFlightData?.to
                    }</div>
                    <div style="margin: 18px 0;font-size: large;font-weight: 500;">${
                      FlightData?.searchFlightCardData?.lendTime
                    }</div>
                </div>
            </div>
            <div style="display: flex;align-items: center;border-bottom: 1px solid #ccc;padding-bottom: 10px;">
                <div style="width: 33.33%;">
                    <div style="color: #000000;font-size: small;">${
                      FlightData?.searchFlightData?.fromShortform
                    }</div>
                </div>
                <div style="width: 33.33%;text-align: center;">
                    <div style="color: #929292;font-size: small;">${
                      FlightData?.searchFlightCardData?.stop
                    }</div>

                </div>
                <div style="width: 33.33%;text-align: right;">
                    <div style="color: #000000;font-size: small;">${
                      FlightData?.searchFlightData?.toShortform
                    }</div>
                </div>
            </div>
        </div>
        <div class="contact-info">
            <div style="display: flex;width: auto;padding: 5px 0;">
                <div style="color: #929292;">Passenger Name</div>
                <div style="margin-left: auto;font-weight: bold;">${
                  FlightData?.SelectSeatData[0]?.name
                }</div>
            </div>
            <div style="display: flex;width: auto;padding: 5px 0;">
                <div style="color: #929292;">Email</div>
                <div style="margin-left: auto;font-weight: bold;">${
                  FlightData?.contactDetails?.Email
                }</div>
            </div>
            <div style="display: flex;width: auto;padding: 5px 0;">
                <div style="color: #929292;">Phone Number</div>
                <div style="margin-left: auto;font-weight: bold;">${
                  FlightData?.contactDetails?.PhoneNumber
                }</div>
            </div>
            <div style="display: flex;width: auto;padding: 5px 0;">
                <div style="color: #929292;">Class</div>
                <div style="margin-left: auto;font-weight: bold;">${
                  FlightData?.searchFlightData?.class
                }</div>
            </div>
            <div style="display: flex;width: auto;padding: 5px 0;">
                <div style="color: #929292;">Booking ID</div>
                <div style="margin-left: auto;font-weight: bold;">${
                  FlightData?.bookingID
                }</div>
            </div>
            <div style="display: flex;width: auto;padding: 5px 0;">
                <div style="color: #929292;">Flight Number</div>
                <div style="margin-left: auto;font-weight: bold;">EK202</div>
            </div>
            <div style="display: flex;width: auto;padding: 5px 0;">
                <div style="color: #929292;">Gate</div>
                <div style="margin-left: auto;font-weight: bold;">25</div>
            </div>
            <div style="display: flex;width: auto;padding: 5px 0;border-bottom: 1px solid #ccc;padding-bottom: 10px;">
                <div style="color: #929292;">Seat Number</div>
                <div style="margin-left: auto;font-weight: bold;">${
                  FlightData?.SelectSeatData[0]?.seatNo
                }</div>
            </div>
        </div>
        <div style="text-align: center;padding: 10px;">
            <div style="color: #929292;">Enjoy traveling around the world with us</div>
            <div style="color: #007bff;margin-top: 10px;">www.airify.yourdomain</div>
        </div>
        <img style="width: 100%;height: auto;position: absolute;bottom: 0;"
        src='${getImage?.ticketWave}'></img>
    </div>
</body>

</html>
      `,
      fileName: 'Airify_Ticket',
      directory: 'Documents',
    };

    let file = await RNHTMLtoPDF.convert(options);
    AlertConstant(file.filePath);
  };
  const color = useSelector(state => state?.themereducer?.colorTheme);
  const styles = ThemeStyle(color);
  return (
    <View style={styles.container}>
      <CommonHeader
        onPress1={true}
        onPress2={true}
        Images2={Images.download}
        Images1={Images.backIcon}
        Images2Color={'#fff'}
        headerName={strings.eTicket}
        Images1Color={'#fff'}
        navigation2={() => {
          createPDF();
        }}
        navigation1={() => {
          goBack();
        }}
      />
      <ScrollView style={styles.bodyView} bounces={false}>
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
            <Text style={styles.textStyle}>{strings.show_your_id_barcode}</Text>
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
                    source={
                      color.white == '#fff'
                        ? Images.airplaneWhiteIcon
                        : Images.airplaneDarkWhiteIcon
                    }
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
              borderColor: color.grey,
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
              label={'Phone Number'}
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
          <View style={{alignItems: 'center', marginTop: hp(0.5)}}>
            <Text style={styles.textStyle}>
              {strings.enjoy_travelling_world}
            </Text>
            <Text style={{color: color.commonBlue}}>
              {strings.arify_weblink}
            </Text>
          </View>
        </View>
        <Image
          source={
            color.white == '#fff' ? Images.ticketWave : Images.ticketWaveDark
          }
          style={{width: wp(88), height: hp(2)}}
        />
      </ScrollView>
    </View>
  );
};

const ThemeStyle = color =>
  StyleSheet.create({
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
      borderColor: color.grey,
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
      color: color.black,
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
      color: color.black,
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
      color: color.offerColor,
    },
    textStyle: {
      color: color.black,
    },
  });

export default ETicket;
