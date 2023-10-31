import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {CommonHeader} from '../../components';
import {Images} from '../../helper/IconConstant';
import {color} from '../../helper/ColorConstant';
import {strings} from '../../helper/Strings';
import {RadioButton} from 'react-native-radio-buttons-group';
import {cancelBookingRadio} from '../../assets/DummyData/radioButtons';
import {fontSize, hp, wp} from '../../helper/Constant';
import OnBoardingSingleButton from '../../components/OnBoardingSingleButton';
import DocumentPicker, {types} from 'react-native-document-picker';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {AlertConstant} from '../../helper/AlertConstant';

const CancelBooking = ({navigation}) => {
  const [selectedData, setSelectedData] = useState({});
  const [fileResponse, setFileResponse] = useState([]);
  const [UserWalletData, setUserWalletData] = useState({});
  const [BookingCancelData, setBookingCancelData] = useState([]);
  const [SaveTicketData, setSaveTicketData] = useState([]);

  const [modal, setModal] = useState(false);
  const firebaseTicketData = useSelector(
    state => state?.bookingTransactiondata?.bookingTransactiondata,
  );
  const openModal = () => {
    setModal(true);
  };
  const closeModal = async () => {
    setModal(false);
  };

  const DocumentPick = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [types.pdf],
        allowMultiSelection: true,
      });
      setFileResponse(response);
    } catch (err) {
      console.warn(err);
    }
  }, []);

  const confirmCancel = async () => {
    if (!selectedData?.id) {
      AlertConstant(strings.select_reason);
    } else {
      try {
        openModal();
        await firestore()
          .collection('UserWallet')
          .doc(auth().currentUser.uid)
          .update({
            wallet:
              Number(UserWalletData?.wallet) +
              firebaseTicketData?.totalPaymentList?.totalPayment,
            transactionHistory: [
              {
                title: 'cancel Booking',
                price: `+$${firebaseTicketData?.totalPaymentList?.totalPayment}`,
                date: moment(new Date()).format('MMM D,YYYY'),
                time: new Date().toLocaleTimeString('en-IN'),
              },
              ...UserWalletData.transactionHistory,
            ],
          });
        await firestore()
          .collection('BookingCancel')
          .doc(auth()?.currentUser?.uid)
          .set({
            BookingCancel: [
              ...BookingCancelData,
              {
                ...firebaseTicketData,
                resume: selectedData?.label,
                documents: fileResponse?.length == 0 ? false : fileResponse,
              },
            ],
          });
        await firestore()
          .collection('SaveTicket')
          .doc(auth().currentUser.uid)
          .update({
            SaveTicket: SaveTicketData?.map(item => {
              if (item.id == firebaseTicketData?.id) {
                if (firebaseTicketData.type == 'Departure') {
                  return {
                    id: item.id,
                    Departure: false,
                    Return: item.Return,
                  };
                }
                if (firebaseTicketData.type == 'Return') {
                  return {
                    id: item.id,
                    Departure: item.Return,
                    Return: false,
                  };
                }
              }
              return item;
            }).filter(i => i.Departure || i.Return),
          });
      } catch (error) {
        console.log('error', error);
      }
    }
  };
  const getUserWalletData = async () => {
    await firestore()
      .collection('UserWallet')
      .onSnapshot(querySnapshot => {
        querySnapshot?.forEach(documentSnapshot => {
          if (documentSnapshot.id == auth().currentUser.uid) {
            setUserWalletData(documentSnapshot.data());
          }
        });
      });
  };
  const getBookingCancelData = async () => {
    await firestore()
      .collection('BookingCancel')
      .onSnapshot(querySnapshot => {
        querySnapshot?.forEach(documentSnapshot => {
          if (documentSnapshot.id == auth().currentUser.uid) {
            setBookingCancelData(documentSnapshot.data().BookingCancel);
          }
        });
      });
  };
  const getSaveTicketData = async () => {
    await firestore()
      .collection('SaveTicket')
      .onSnapshot(querySnapshot => {
        querySnapshot?.forEach(documentSnapshot => {
          if (documentSnapshot.id == auth().currentUser.uid) {
            setSaveTicketData(documentSnapshot.data().SaveTicket);
          }
        });
      });
  };
  useEffect(() => {
    getUserWalletData();
    getBookingCancelData();
    getSaveTicketData();
  }, []);
  return (
    <View style={styles.container}>
      <CommonHeader
        headerName={strings.cancelBooking}
        navigation1={() => {
          navigation.goBack();
        }}
        onPress1={true}
        onPress2={false}
        Images1={Images.backIcon}
        Images2={null}
        Images1Color={color.white}
      />
      <View style={styles.bodyView}>
        <Text style={styles.textStyle}>{strings.reasonText}</Text>
        <View style={styles.sortModalBody}>
          <FlatList
            bounces={false}
            data={cancelBookingRadio}
            showsVerticalScrollIndicator={false}
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
        <View style={styles.documentUploadview}>
          <Text style={styles.textStyle}>{strings.documentText}</Text>
          <TouchableOpacity
            style={styles.documentImageView}
            onPress={() => {
              DocumentPick();
            }}>
            <Image source={Images.uploadDoc} style={styles.uploadIcon} />
            <Text style={{color: color.darkGray}}>{strings.upload}</Text>
          </TouchableOpacity>
        </View>
        <OnBoardingSingleButton
          buttonText={strings.Confirm}
          onPress={() => {
            confirmCancel();
          }}
        />
      </View>
      <Modal isVisible={modal} backdropColor="#000000">
        <View style={styles.createAlertBody}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <LottieView
              source={require('../../helper/bookingSuccess.json')}
              autoPlay
              loop
              style={{
                height: hp(20),
                width: hp(20),
              }}
            />
            <Text style={styles.successMessage}>{strings.CancelSuccess}</Text>
            <Text style={{textAlign: 'center'}}>
              {strings.cancelBookingSuccessText}
            </Text>
            <TouchableOpacity
              onPress={() => {
                closeModal();
                navigation.navigate('BookingsScreen');
              }}
              style={styles.buutonstyle}>
              <Text
                style={{
                  fontSize: fontSize(17),
                  fontWeight: 'bold',
                  color: '#fff',
                }}>
                {strings.ok}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CancelBooking;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: color.white},
  sortModalBody: {
    paddingVertical: hp(1),
    borderBottomWidth: 1,
    borderColor: '#e2e2e2',
  },
  bodyView: {
    flex: 1,
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
  },
  textStyle: {
    marginStart: wp(2),
    fontSize: fontSize(18),
    fontWeight: '500',
  },
  documentUploadview: {
    paddingVertical: hp(2),
    borderBottomWidth: 1,
    borderColor: '#e2e2e2',
    marginBottom: hp(2),
  },
  documentImageView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(4),
    marginTop: hp(2),
    borderWidth: 1,
    borderColor: '#e2e2e2',
    borderRadius: wp(4),
  },
  uploadIcon: {
    height: hp(3),
    width: hp(3),
    resizeMode: 'contain',
    paddingVertical: hp(2.5),
    tintColor: color.darkGray,
  },
  createAlertBody: {
    backgroundColor: '#fff',
    paddingVertical: wp(6),
    paddingHorizontal: wp(6),
    borderRadius: 20,
    alignItems: 'center',
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
  successMessage: {
    fontSize: fontSize(20),
    fontWeight: 'bold',
    color: color.commonBlue,
    marginBottom: hp(3),
    textAlign: 'center',
  },
  buutonstyle: {
    backgroundColor: color.commonBlue,
    width: wp(70),
    paddingVertical: hp(1.8),
    alignItems: 'center',
    borderRadius: 10,
    marginTop: hp(4),
  },
});
