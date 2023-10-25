import React, {useState} from 'react';
import Modal from 'react-native-modal';
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {strings} from '../../helper/Strings';
import {color} from '../../helper/ColorConstant';
import {Images} from '../../helper/IconConstant';
import {fontSize, hp, wp} from '../../helper/Constant';
import OnBoardingTwoButton from '../Common/OnBoardingTwoButton';

const PassengerPickerModal = ({
  onCancel,
  setChild,
  setAdult,
  toggleModal,
  isModalVisible,
  setTwoYearBelowChild,
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
                resizeMode="contain"
                source={Images.adult}
                style={styles.pickerImageStyle}
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
                  itemHeight={60}
                  wrapperHeight={180}
                  highlightBorderWidth={2}
                  highlightColor={color.white}
                  wrapperBackground={color.white}
                />
              </View>
            </View>
            <View style={styles.pickerViewStyle}>
              <Image
                resizeMode="contain"
                source={Images.children}
                style={styles.pickerImageStyle}
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
                  itemHeight={60}
                  wrapperHeight={180}
                  highlightBorderWidth={2}
                  highlightColor={color.white}
                  wrapperBackground={color.white}
                />
              </View>
            </View>
            <View style={[styles.pickerViewStyle, {borderRightWidth: 0}]}>
              <Image
                resizeMode="contain"
                style={styles.pickerImageStyle}
                source={Images.twoYearBelowChild}
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
                  itemHeight={60}
                  wrapperHeight={180}
                  highlightBorderWidth={2}
                  highlightColor={color.white}
                  wrapperBackground={color.white}
                />
              </View>
            </View>
          </View>
          <View style={styles.buttonViewStyle}>
            <OnBoardingTwoButton
              onPress1={onCancel}
              buttonTextTwo={'OK'}
              onPress2={toggleModal}
              buttonTextOne={'Cancel'}
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
    width: wp(26.6),
    height: hp(33.5),
    borderRightWidth: 0.5,
  },
  pickerImageStyle: {
    width: hp(4.9),
    height: hp(4.9),
    alignSelf: 'center',
  },
  categoryTextStyle: {
    color: 'black',
    fontWeight: '500',
    marginVertical: 5,
    textAlign: 'center',
    fontSize: fontSize(18),
  },
  ageTextStyle: {
    color: 'grey',
    textAlign: 'center',
  },
  numberTextStyle: {
    fontWeight: 'bold',
    marginVertical: hp(0),
    fontSize: fontSize(25),
  },
  modalStyle: {
    width: '100%',
    marginBottom: 0,
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  modalViewStyle: {
    height: hp(60),
    borderTopEndRadius: 20,
    backgroundColor: 'white',
    borderTopStartRadius: 20,
  },
  toggleLineStyle: {
    width: wp(15),
    borderWidth: 1.5,
    borderColor: 'grey',
    alignSelf: 'center',
    marginVertical: hp(1.2),
  },
  headerStyle: {
    width: '80%',
    alignSelf: 'center',
    borderBottomWidth: 0.5,
    marginVertical: hp(1.2),
  },
  headerTextStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: fontSize(22),
    marginVertical: hp(2.4),
  },
  buttonViewStyle: {
    width: '90%',
    borderTopWidth: 1,
    alignSelf: 'center',
    paddingVertical: hp(2),
    borderColor: '#e2e2e2',
  },
  pickerMainViewStyle: {
    height: hp(35),
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  scrollPickerHeightStyle: {height: hp(20.31)},
});
