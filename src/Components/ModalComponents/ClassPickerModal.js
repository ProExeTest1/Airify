import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';

import {strings} from '../../helper/Strings';
import {color} from '../../helper/ColorConstant';
import {Images} from '../../helper/IconConstant';
import {ClassData} from '../../assets/DummyData/Data';
import {fontSize, hp, wp} from '../../helper/Constant';
import OnBoardingTwoButton from '../Common/OnBoardingTwoButton';

const ClassPickerModal = ({
  onCancel,
  setClass,
  toggleModal,
  isModalVisible,
}) => {
  const [index, setIndex] = useState(1);
  return (
    <View>
      <Modal isVisible={isModalVisible} style={styles.modalStyle}>
        <View style={styles.modalViewStyle}>
          <TouchableOpacity
            style={styles.toggleLineStyle}
            onPress={toggleModal}></TouchableOpacity>
          <View style={styles.headerStyle}>
            <Text style={styles.headerTextStyle}>{strings.classheader}</Text>
          </View>
          <View>
            <FlatList
              data={ClassData}
              scrollEnabled={false}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    style={[
                      styles.cardViewStyle,
                      {
                        borderColor:
                          item.id == index ? color.commonBlue : color.grey,
                      },
                    ]}
                    onPress={() => {
                      setIndex(item?.id);
                      console.log('Item', item);
                      setClass(item?.header);
                    }}>
                    <View style={styles.textViewStyle}>
                      <Text style={styles.titleTextStyle}>{item.header}</Text>
                      <Text style={styles.discriptionTextStyle}>
                        {item.discription}
                      </Text>
                    </View>
                    {item.id == index ? (
                      <Image
                        resizeMode="contain"
                        source={Images.tickMark}
                        style={styles.imageStyle}
                      />
                    ) : null}
                  </TouchableOpacity>
                );
              }}
              keyExtractor={item => item.id}
            />
          </View>
          <View style={styles.buttonViewStyle}>
            <OnBoardingTwoButton
              buttonTextTwo={'OK'}
              buttonTextOne={'Cancel'}
              onPress1={() => {
                onCancel();
                setIndex(1);
              }}
              onPress2={() => {
                toggleModal();
                if (index === 1) {
                  setClass('Economy');
                }
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ClassPickerModal;

const styles = StyleSheet.create({
  modalStyle: {
    width: '100%',
    marginBottom: 0,
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  modalViewStyle: {
    borderTopEndRadius: 20,
    backgroundColor: 'white',
    borderTopStartRadius: 20,
  },
  toggleLineStyle: {
    width: wp(15),
    borderWidth: 1.5,
    alignSelf: 'center',
    marginVertical: hp(1.2),
    borderColor: color.grey,
  },
  headerStyle: {
    width: '90%',
    alignSelf: 'center',
    borderBottomWidth: 0.3,
    borderColor: color.grey,
    marginVertical: hp(1.2),
  },
  headerTextStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: fontSize(22),
    marginVertical: hp(2.4),
  },
  cardViewStyle: {
    width: '90%',
    height: hp(12),
    padding: hp(1.8),
    borderWidth: 0.5,
    borderRadius: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(0.9),
  },
  titleTextStyle: {
    color: 'black',
    fontWeight: '600',
    fontSize: fontSize(20),
  },
  discriptionTextStyle: {
    color: color.grey,
    fontSize: fontSize(15),
    marginVertical: hp(0.9),
  },
  textViewStyle: {
    width: '90%',
  },
  cancelButtonTextStyle: {
    fontWeight: 'bold',
    fontSize: fontSize(20),
    color: color.commonBlue,
  },
  okButtonTextStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: fontSize(20),
  },
  okButtonStyle: {
    width: wp(38),
    height: hp(6),
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: hp(1.2),
    justifyContent: 'center',
    marginHorizontal: wp(3.4),
    backgroundColor: color.commonBlue,
  },
  cancelButtonStyle: {
    width: wp(38),
    height: hp(6),
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: hp(1.2),
    justifyContent: 'center',
    backgroundColor: '#EBF0FE',
    marginHorizontal: wp(3.4),
  },
  buttonViewStyle: {
    width: '90%',
    borderTopWidth: 1,
    marginBottom: hp(2),
    alignSelf: 'center',
    paddingVertical: hp(4),
    borderColor: '#e2e2e2',
  },
  imageStyle: {
    width: hp(2.4),
    height: hp(2.4),
    marginHorizontal: wp(2.6),
    tintColor: color.commonBlue,
  },
});
