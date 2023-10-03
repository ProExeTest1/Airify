import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {images} from '../../helpers/IconConstant';
import {fontSize, hp, wp} from '../../helpers/helper';
import {color} from '../../helpers/ColorConstant';
import Modal from 'react-native-modal';
import {ClassData} from '../../assets/DummyData/Data';
import { string } from '../../helpers/String';

const ClassPickerModal = ({isModalVisible, toggleModal, setClass,onCancel}) => {
  const [index, setIndex] = useState();
  return (
    <View>
      <Modal isVisible={isModalVisible} style={styles.modalStyle}>
        <View style={styles.modalViewStyle}>
          <TouchableOpacity
            style={styles.toggleLineStyle}
            onPress={toggleModal}></TouchableOpacity>
          <View style={styles.headerStyle}>
            <Text style={styles.headerTextStyle}>{string.classheader}</Text>
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
                      setIndex(item.id);
                      setClass(item.header)
                    }}>
                    <View style={styles.textViewStyle}>
                      <Text style={styles.titleTextStyle}>{item.header}</Text>
                      <Text style={styles.discriptionTextStyle}>
                        {item.discription}
                      </Text>
                    </View>
                    {item.id == index ? (
                      <Image
                        source={images.tickMark}
                        style={styles.imageStyle}
                        resizeMode="contain"
                      />
                    ) : null}
                  </TouchableOpacity>
                );
              }}
              keyExtractor={item => item.id}
            />
          </View>
          <View style={styles.buttonViewStyle} >
            <TouchableOpacity style={styles.cancelButtonStyle} onPress={onCancel}>
              <Text style={styles.cancelButtonTextStyle}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.okButtonStyle} onPress={toggleModal}>
              <Text style={styles.okButtonTextStyle}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ClassPickerModal;

const styles = StyleSheet.create({
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
  },
  toggleLineStyle: {
    borderWidth: 1.5,
    width: wp(15),
    alignSelf: 'center',
    marginVertical: hp(1.2),
    borderColor: color.grey,
  },
  headerStyle: {
    borderBottomWidth: 0.3,
    borderColor: color.grey,
    marginVertical: hp(1.2),
    width: '90%',
    alignSelf: 'center',
  },
  headerTextStyle: {
    textAlign: 'center',
    fontSize: fontSize(22),
    fontWeight: 'bold',
    color: 'black',
    marginVertical: hp(2.4),
  },
  cardViewStyle: {
    width: '90%',
    height: hp(12),
    padding: hp(1.8),
    borderWidth: 0.5,
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: hp(0.9),
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleTextStyle: {
    fontSize: fontSize(20),
    color: 'black',
    fontWeight: '600',
  },
  discriptionTextStyle: {
    fontSize: fontSize(15),
    color: color.grey,
    marginVertical: hp(0.9),
  },
  textViewStyle: {
    width: '90%',
  },
  cancelButtonTextStyle: {
    fontSize: fontSize(20),
    fontWeight: 'bold',
    color: color.commonBlue,
  },
  okButtonTextStyle: {
    fontSize: fontSize(20),
    fontWeight: 'bold',
    color: 'white',
  },
  okButtonStyle: {
    backgroundColor: color.commonBlue,
    height: hp(6),
    width: wp(38),
    marginHorizontal: wp(3.4),
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical:hp(1.2),
  },
  cancelButtonStyle: {
    backgroundColor: '#EBF0FE',
    height: hp(6),
    width: wp(38),
    marginHorizontal: wp(3.4),
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp(1.2),
  },
  buttonViewStyle: {
    flexDirection: 'row',
    alignSelf: 'center',
    borderTopWidth: 0.3,
    borderColor: color.grey,
    marginVertical: hp(1.2),
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle:{
    height: hp(2.4),
    width: hp(2.4),
    marginHorizontal: wp(2.6),
    tintColor: color.commonBlue,
  }
});
