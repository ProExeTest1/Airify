import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {CustomPaperTextInput} from '../../components';
import {images} from '../../helpers/IconConstant';
import {fontSize, hp, wp} from '../../helpers/helper';
import {color} from '../../helpers/ColorConstant';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {dummyData} from '../../assets/DummyData/Data';
import {useSelector} from 'react-redux';

const HomeScreen = ({navigation}) => {
  const reduxDepatureDate = useSelector(state => state.date.depatureDate);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [depatureDate, setDepatureDate] = useState();
  const [passenger, setPassenger] = useState();
  const [seat, setSeat] = useState();
  const [returnDate, setReturnDate] = useState();
  const [press, setPress] = useState(false);
  const [change, setChnage] = useState(false);

  const dynamicStyle = {
    marginTop: press ? hp(53) : hp(43),
  };
  const toggleChange = () => {
    setChnage(!change);
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      bounces={false}
      style={styles.ScrollViewStyle}>
      <View style={styles.headerViewStyle}>
        <SafeAreaView>
          <View style={styles.headerStyle}>
            <View style={styles.profilepicViewStyle}>
              <Image
                source={images.demoPic}
                style={styles.profilePicStyle}
                resizeMode="stretch"
              />
              <View style={styles.headertextStyle}>
                <Text style={styles.GMStyle}>Good Morning 🌅</Text>
                <Text style={styles.userNameStyle}>Andrew Ainsley</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.bellTouchStyle}>
              <Image
                source={images.bell}
                style={styles.bellStyle}
                resizeMode="stretch"
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
      <View style={styles.seatBookingMainViewStyle}>
        <View style={styles.optionStyle}>
          <TouchableOpacity
            style={[
              styles.optionTouchStyle,
              {backgroundColor: !press ? color.commonBlue : 'white'},
            ]}
            onPress={() => setPress(false)}>
            <Text
              style={[
                styles.optionTextStyle,
                {color: !press ? 'white' : 'black'},
              ]}>
              One-Way
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.optionTouchStyle,
              {backgroundColor: press ? color.commonBlue : 'white'},
            ]}
            onPress={() => setPress(true)}>
            <Text
              style={[
                styles.optionTextStyle,
                {color: press ? 'white' : 'black'},
              ]}>
              Round Trip
            </Text>
          </TouchableOpacity>
        </View>

        <CustomPaperTextInput
          width={'90%'}
          marginVertical={10}
          placeholder={'From'}
          label={'From'}
          icon={images.takeOff}
          value={change ? destination : origin}
          onChangeText={txt => change ? setDestination(txt) : setOrigin(txt)}
        />
        <CustomPaperTextInput
          width={'90%'}
          placeholder={'Destination'}
          label={'To'}
          marginVertical={10}
          icon={images.landing}
          value={change ? origin : destination}
          onChangeText={txt => (change ? setOrigin(txt) : setDestination(txt))}
        />
        <TouchableOpacity
          onPress={() => toggleChange()}
          style={styles.updownTouchStyle}>
          <Image
            source={images.up_down}
            style={styles.updownStyle}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <CustomPaperTextInput
          width={'90%'}
          placeholder={'Depature Date'}
          marginVertical={10}
          label={'Depature Date'}
          disabled={true}
          icon={images.calendar}
          value={reduxDepatureDate ? reduxDepatureDate : depatureDate}
          onPress={() => navigation.navigate('DatePicker')}
          onChangeText={txt => setDepatureDate(txt)}
        />
        {press ? (
          <CustomPaperTextInput
            width={'90%'}
            placeholder={'Return Date'}
            marginVertical={10}
            label={'Return Date'}
            icon={images.calendar}
            value={returnDate}
            onChangeText={txt => setReturnDate(txt)}
          />
        ) : null}
        <View style={styles.customInputStyle}>
          <CustomPaperTextInput
            width="50%"
            placeholder={'Seat'}
            label={'Passenger'}
            icon={images.passenger}
            value={passenger}
            onChangeText={txt => setPassenger(txt)}
          />
          <CustomPaperTextInput
            width={'44%'}
            placeholder={'Class'}
            label={'Class'}
            icon={images.seat}
            value={seat}
            onChangeText={txt => setSeat(txt)}
          />
        </View>
        <TouchableOpacity style={styles.searchButtonStyle}>
          <Text style={styles.searchFontStyle}>Search Flights</Text>
        </TouchableOpacity>
      </View>
      <View style={StyleSheet.flatten([styles.offerStyle, dynamicStyle])}>
        <View style={styles.specialOfferViewStyle}>
          <Text style={styles.specialOfferTextStyle}>Special Offer</Text>
          <TouchableOpacity style={styles.profilepicViewStyle}>
            <Text style={{color: color.commonBlue, marginHorizontal: 10}}>
              View All
            </Text>
            <Image
              source={images.forward}
              style={styles.forwardStyle}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View>
          <SwiperFlatList
            autoplay
            autoplayDelay={3}
            autoplayLoop
            data={dummyData}
            renderItem={({item}) => {
              return (
                <View style={styles.child}>
                  <Image
                    source={item.image}
                    style={styles.offerimageStyle}
                    resizeMode="stretch"
                  />
                </View>
              );
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  child: {
    width,
    justifyContent: 'center',
  },
  text: {
    fontSize: width * 0.5,
    textAlign: 'center',
  },
  ScrollViewStyle: {
    flex: 1,
  },
  headerViewStyle: {
    backgroundColor: color.commonBlue,
    height: hp(35),
  },
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(6.66),
    justifyContent: 'space-between',
  },
  profilepicViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePicStyle: {
    height: hp(7.38),
    width: hp(7.38),
    borderRadius: 100,
  },
  headertextStyle: {marginHorizontal: 10},
  GMStyle: {color: 'white', marginVertical: 5},
  userNameStyle: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: fontSize(20, 812),
    marginVertical: 5,
  },
  bellTouchStyle: {
    borderWidth: 1,
    borderRadius: 100,
    borderColor: 'white',
    padding: hp(1.2),
  },
  bellStyle: {height: hp(3.07), width: hp(3.07), tintColor: 'white'},
  seatBookingMainViewStyle: {
    width: wp(93),
    paddingVertical: hp(2.4),
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 16,
    position: 'absolute',
    top: hp(15),
    zIndex: 1,
  },
  optionStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp(83),
  },
  optionTouchStyle: {
    borderRadius: 30,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp(1.6),
    width: wp(40),
  },
  optionTextStyle: {
    fontWeight: '700',
  },
  customInputStyle: {
    flexDirection: 'row',
    marginVertical: hp(1.2),
    justifyContent: 'space-between',
    width: '90%',
  },
  searchButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(84),
    height: hp(7),
    borderRadius: 16,
    backgroundColor: 'blue',
    marginVertical: hp(1.2),
    
  },
  searchFontStyle: {
    fontSize: fontSize(20, 812),
    color: 'white',
    fontWeight: 'bold',
    
  },
  offerStyle: {
    marginTop: hp(50),
    width: wp(90),
    alignSelf: 'center',
    position: 'relative',
  },
  specialOfferViewStyle: {
    width: wp(90),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp(1.2),
  },
  specialOfferTextStyle: {
    fontSize: fontSize(20, 812),
    fontWeight: 'bold',
  },
  forwardStyle: {height: hp(1.8), width: hp(1.8), tintColor: color.commonBlue},
  offerimageStyle: {height: hp(25), width: wp(90), borderRadius: 16},
  updownStyle: {
    height: hp(3.6),
    width: hp(3.6),
    tintColor: 'white',
  },
  updownTouchStyle: {
    backgroundColor: color.commonBlue,
    borderRadius: 100,
    padding: hp(1.6),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: hp(15),
    right: wp(10),
    
  },
});
