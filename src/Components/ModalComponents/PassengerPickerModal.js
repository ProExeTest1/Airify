import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import {Images} from '../../helper/IconConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import {color} from '../../helper/ColorConstant';
import Modal from 'react-native-modal';
import {strings} from '../../helper/Strings';
import OnBoardingTwoButton from '../Common/OnBoardingTwoButton';

const PassengerPickerModal = ({
  toggleModal,
  isModalVisible,
  setAdult,
  setChild,
  setTwoYearBelowChild,
  onCancel,
}) => {
  const [item1, setItem1] = useState(0);
  const [item2, setItem2] = useState(0);
  const [item3, setItem3] = useState(0);

  return (
    <View>
      <Modal isVisible={isModalVisible} style={styles.modalStyle}>
        <View style={styles.modalViewStyle}>
          <TouchableOpacity
            style={styles.toggleLineStyle}
            onPress={toggleModal}></TouchableOpacity>
          <View style={styles.headerStyle}>
            <Text style={styles.headerTextStyle}>
              {strings.passengerModalHeader}
            </Text>
          </View>
          <View style={styles.pickerMainViewStyle}>
            <View style={styles.pickerViewStyle}>
              <Image
                source={Images.adult}
                style={styles.pickerImageStyle}
                resizeMode="contain"
              />
              <Text style={styles.categoryTextStyle}>{strings.Adult}</Text>
              <Text style={styles.ageTextStyle}>{strings.adultAge}</Text>
              <View style={styles.scrollPickerHeightStyle}>
                <ScrollPicker
                  dataSource={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                  renderItem={(data, index) => {
                    return (
                      <View>
                        <Text
                          style={[
                            styles.numberTextStyle,
                            {
                              color:
                                item1 == index ? color.commonBlue : '#83A6FB',
                            },
                          ]}>
                          {data}
                        </Text>
                      </View>
                    );
                  }}
                  onValueChange={(data, selectedIndex) => {
                    setItem1(selectedIndex);
                    setAdult(data);
                  }}
                  wrapperBackground={color.white}
                  itemHeight={60}
                  wrapperHeight={180}
                  highlightColor={color.white}
                  highlightBorderWidth={2}
                />
              </View>
            </View>
            <View style={styles.pickerViewStyle}>
              <Image
                source={Images.children}
                style={styles.pickerImageStyle}
                resizeMode="contain"
              />
              <Text style={styles.categoryTextStyle}>{strings.Child}</Text>
              <Text style={styles.ageTextStyle}>{strings.ChildAge}</Text>
              <View style={styles.scrollPickerHeightStyle}>
                <ScrollPicker
                  dataSource={[0, 1, 2, 3, 4, 5]}
                  renderItem={(data, index) => {
                    return (
                      <View>
                        <Text
                          style={[
                            styles.numberTextStyle,
                            {
                              color:
                                item2 == index ? color.commonBlue : '#83A6FB',
                            },
                          ]}>
                          {data}
                        </Text>
                      </View>
                    );
                  }}
                  onValueChange={(data, selectedIndex) => {
                    setItem2(selectedIndex);
                    setChild(data);
                  }}
                  wrapperBackground={color.white}
                  itemHeight={60}
                  wrapperHeight={180}
                  highlightColor={color.white}
                  highlightBorderWidth={2}
                />
              </View>
            </View>
            <View style={[styles.pickerViewStyle, {borderRightWidth: 0}]}>
              <Image
                source={Images.twoYearBelowChild}
                style={styles.pickerImageStyle}
                resizeMode="contain"
              />
              <Text style={styles.categoryTextStyle}>{strings.Infrant}</Text>
              <Text style={styles.ageTextStyle}>{strings.InfrantAge}</Text>
              <View style={styles.scrollPickerHeightStyle}>
                <ScrollPicker
                  dataSource={[0, 1, 2, 3]}
                  renderItem={(data, index) => {
                    return (
                      <View>
                        <Text
                          style={[
                            styles.numberTextStyle,
                            {
                              color:
                                item3 == index ? color.commonBlue : '#83A6FB',
                            },
                          ]}>
                          {data}
                        </Text>
                      </View>
                    );
                  }}
                  onValueChange={(data, selectedIndex) => {
                    setItem3(selectedIndex);
                    setTwoYearBelowChild(data);
                  }}
                  wrapperBackground={color.white}
                  itemHeight={60}
                  wrapperHeight={180}
                  highlightColor={color.white}
                  highlightBorderWidth={2}
                />
              </View>
            </View>
          </View>
          <View style={styles.buttonViewStyle}>
            <OnBoardingTwoButton
              buttonTextOne={'Cancel'}
              buttonTextTwo={'OK'}
              onPress1={onCancel}
              onPress2={toggleModal}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PassengerPickerModal;

const styles = StyleSheet.create({
  pickerViewStyle: {
    height: hp(33.5),
    width: wp(26.6),
    borderRightWidth: 0.5,
  },
  pickerImageStyle: {
    height: hp(4.9),
    width: hp(4.9),
    alignSelf: 'center',
  },
  categoryTextStyle: {
    fontSize: fontSize(18),
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
    marginVertical: 5,
  },
  ageTextStyle: {
    color: 'grey',
    textAlign: 'center',
  },
  numberTextStyle: {
    fontSize: fontSize(25),
    fontWeight: 'bold',
    marginVertical: hp(0),
  },
  modalStyle: {
    justifyContent: 'flex-end',
    width: '100%',
    alignSelf: 'center',
    marginBottom: 0,
  },
  modalViewStyle: {
    backgroundColor: 'white',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    height: hp(60),
  },
  toggleLineStyle: {
    borderWidth: 1.5,
    width: wp(15),
    alignSelf: 'center',
    marginVertical: hp(1.2),
    borderColor: 'grey',
  },
  headerStyle: {
    borderBottomWidth: 0.5,
    marginVertical: hp(1.2),
    width: '80%',
    alignSelf: 'center',
  },
  headerTextStyle: {
    textAlign: 'center',
    fontSize: fontSize(22),
    fontWeight: 'bold',
    color: 'black',
    marginVertical: hp(2.4),
  },
  buttonViewStyle: {
    paddingVertical: hp(2),
    borderTopWidth: 1,
    width: '90%',
    alignSelf: 'center',
    borderColor: '#e2e2e2',
  },
  pickerMainViewStyle: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignSelf: 'center',
    height: hp(35),
  },
  scrollPickerHeightStyle: {height: hp(20.31)},
});
