import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import HeaderData from '../components/HeaderData';
import {fontSize, hp, wp} from '../helper/Constant';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import ButtonData from '../components/ButtonData';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
import TextData from '../components/TextData';
import ImagePickerData from '../components/ImagePickerData';
import TextInputData from '../components/TextInputData';
import storage from '@react-native-firebase/storage';
import {useDispatch} from 'react-redux';
import {followersData} from '../redux/action/HomeAction';

const ProfileScreen = () => {
  const [userData, setUserData] = useState();
  const [postCount, setPostCount] = useState([]);
  const [modal, setModal] = useState(false);
  const isFocus = useIsFocused();
  const navigation = useNavigation();

  const [uploadStorage, setUploadStorage] = useState(false);
  const [transfer, setTransfer] = useState(0);
  const [Username, setUsername] = useState('');
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [pickerResponse, setPickerResponse] = useState('');
  const dispatch = useDispatch();

  const docIdData = postCount.map(item => {
    if (auth().currentUser.uid === item.uid) {
      return item.docID;
    }
  });
  const handleSignUp = async () => {
    const email = await auth().currentUser;
    const password = await auth().currentUser;
    if (userData.profileImageURL !== pickerResponse) {
      try {
        email.updateEmail(Email).then(() => {
          console.log('Email Change:>> ', Email);
        });
        password.updatePassword(Password).then(() => {
          console.log('Email Change:>> ', Password);
        });
        setUploadStorage(true);
        setTransfer(0);
        const uploadStorage = pickerResponse;
        const filename = Date.now();
        await storage()
          .ref(`/Profile/${auth().currentUser.uid}/${userData?.id}`)
          .delete();
        const task = storage()
          .ref(`/Profile/${auth().currentUser.uid}/${userData.id}`)
          .putFile(uploadStorage);
        console.log('task: ', task);
        task.on('state_changed', taskSnapshot => {
          setTransfer(
            Math.round(
              taskSnapshot.bytesTransferred / taskSnapshot.totalBytes,
            ) * 100,
          );
        });
        try {
          await task;
          setUploadStorage(false);
          Alert.alert('Image uploaded', 'Image uploaded successfully');
        } catch (error) {
          console.log('HIIIIIIIIIII', error);
        }
        const url = await storage()
          .ref(`/Profile/${auth().currentUser.uid}/${filename}`)
          .getDownloadURL()
          .catch(err => {
            console.log('error in download', err);
          });

        try {
          await firestore()
            .collection('Users')
            .doc(auth().currentUser.uid)
            .update({
              Username: Username,
              Name: Name,
              Email: Email,
              Password: Password,
              profileImageURL: url,
            });
          await firestore().collection('Posts').doc(docIdData).update({
            Username: Username,
            profileImageURL: url,
          });
          closeModal();
        } catch (error) {
          console.log(error);
        }

        await auth().signOut();
        navigation.navigate('LoginScreen');
        setModal(false);
      } catch (error) {
        console.log(error);
      }
      setPickerResponse(null);
      closeModal();
    } else {
      try {
        await firestore()
          .collection('Users')
          .doc(auth().currentUser.uid)
          .update({
            Username: Username,
            Name: Name,
            Email: Email,
            Password: Password,
          });
        await firestore().collection('Posts').doc(docIdData).update({
          Username: Username,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  useEffect(() => {
    if (isFocus) {
      getFireStoreData();
      getPostCount();
    }
  }, [isFocus, postCount]);

  const getFireStoreData = async () => {
    try {
      const user = await firestore()
        .collection('Users')
        .doc(auth()?.currentUser?.uid)
        .get();
      setUserData(user?.data());
    } catch (error) {
      console.log(error);
    }
  };

  const getPostCount = async () => {
    const userId = auth().currentUser.uid;
    const postUserId = await firestore().collection('Posts').get();
    const postdata = postUserId.docs.map(Item => {
      return Item.data();
    });
    const matchId = postdata.filter(item => item.uid === userId);
    setPostCount(matchId);
    setRefreshing(false);
  };

  const setData = async () => {
    setEmail(userData.Email);
    setName(userData.Name);
    setPassword(userData.Password);
    setPickerResponse(userData.profileImageURL);
    setUsername(userData.Username);
  };

  const handlerLongClick = async item =>
    Alert.alert('Delete Post', 'Are you sure you want to delete post', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: async () => {
          await firestore()
            .collection('Posts')
            .doc(item?.docID)
            .delete()
            .then(() => {
              console.log('Post Deleted');
            });
          await storage()
            .ref(`/Posts/${auth().currentUser.uid}/${item?.id}`)
            .delete();
        },
      },
    ]);

  return (
    <View style={styles.container}>
      <HeaderData
        headerTitle={userData?.Username}
        onPress={() => {
          navigation.openDrawer();
        }}
        onPress3={() => {
          navigation.navigate('Settings');
        }}
        chatImage={require('../assets/icons/settings.png')}
      />
      <View style={styles.profileViewStyle}>
        <View>
          <Image
            source={{uri: userData?.profileImageURL}}
            style={{
              height: hp(10),
              width: hp(10),
              borderRadius: hp(10 / 2),
              borderWidth: 1,
            }}
          />
          <Text style={{fontWeight: '600', marginTop: hp(0.5)}}>
            {userData?.Name}
          </Text>
        </View>
        <View style={styles.dataStyle}>
          <Text>{postCount?.length}</Text>
          <Text>Post</Text>
        </View>
        <TouchableOpacity
          style={styles.dataStyle}
          onPress={() => {
            navigation.navigate('MainFollows');
            dispatch(followersData(userData));
          }}>
          <Text>{userData?.Followers?.length}</Text>
          <Text>Followers</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dataStyle}
          onPress={() => {
            navigation.navigate('MainFollows');
          }}>
          <Text>{userData?.Following?.length}</Text>
          <Text>Following</Text>
        </TouchableOpacity>
      </View>
      <ButtonData
        button="Edit Profile"
        buttonStyle={[styles.buttonStyle, {width: '90%'}]}
        onPress={() => {
          openModal();
          setData();
        }}
      />
      <View
        style={{
          borderTopWidth: 1,
          opacity: 0.4,
          marginTop: hp(2),
          marginHorizontal: wp(4),
        }}></View>
      <View style={styles.postViewStyle}>
        <FlatList
          data={postCount}
          bounces={false}
          showsVerticalScrollIndicator={false}
          numColumns={3}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={styles.postStyle}
                onPress={() => {
                  console.log('item.docID :>> ', item.docID);
                }}
                onLongPress={() => {
                  handlerLongClick(item);
                }}>
                <Image
                  source={{uri: item.profileImageURL}}
                  style={styles.imageStyle}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <Modal
        isVisible={modal}
        onBackdropPress={closeModal}
        style={{
          justifyContent: 'flex-end',
          margin: wp(0),
        }}>
        <View
          style={{
            backgroundColor: '#3C93D7',
            height: hp(80),
            borderRadius: 16,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View>
            <View style={styles.headerStyle}>
              <TextData text="Edit Profile" textStyle={styles.textStyle} />
            </View>
            <View style={styles.bodyStyle}>
              <ImagePickerData
                pickerResponse={pickerResponse}
                setPickerResponse={setPickerResponse}
                boxStyle={{
                  width: hp(10.27),
                  height: hp(10.27),
                  borderRadius: hp(10.27 / 2),
                }}
              />
              <TextInputData
                placeholder="Enter Username"
                textInputStyle={styles.textInputStyle}
                value={Username}
                onChangeText={text => {
                  setUsername(text);
                }}
              />
              <TextInputData
                placeholder="Enter Name"
                textInputStyle={styles.textInputStyle}
                value={Name}
                onChangeText={text => {
                  setName(text);
                }}
              />
              <TextInputData
                placeholder="Enter Email Address"
                textInputStyle={styles.textInputStyle}
                value={Email}
                onChangeText={text => {
                  setEmail(text);
                }}
              />
              <TextInputData
                placeholder="Enter Password"
                textInputStyle={styles.textInputStyle}
                value={Password}
                onChangeText={text => {
                  setPassword(text);
                }}
              />
              {uploadStorage ? (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text>{transfer} % Completed !</Text>
                  <ActivityIndicator size="large" color="white" />
                </View>
              ) : (
                <ButtonData
                  button="Edit"
                  onPress={() => {
                    handleSignUp();
                    setEmail('');
                    setUsername('');
                    setName('');
                    setPassword('');
                  }}
                  buttonStyle={styles.buttonStyle}
                />
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profileViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(5),
    alignItems: 'center',
    marginTop: hp(3),
  },
  buttonStyle: {
    marginTop: hp(4),
    width: wp(90),
    marginHorizontal: wp(5),
    height: hp(4.5),
  },
  dataStyle: {
    alignItems: 'center',
  },
  postViewStyle: {
    marginTop: wp(5),
    paddingHorizontal: wp(3),
    flex: 1,
  },
  postStyle: {
    width: '33.33%',
    height: hp(15),
    alignItems: 'center',
  },
  imageStyle: {
    width: '90%',
    height: '90%',
    borderWidth: 1,
  },
  popUpImageStyle: {
    width: wp(80),
    height: hp(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerStyle: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyStyle: {
    justifyContent: 'center',
    flex: 0.7,
  },
  socialIconStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: wp(30),
    marginTop: hp(1),
  },
  textStyle: {
    color: 'white',
    fontSize: fontSize(25),
    fontWeight: 'bold',
  },
  textInputStyle: {
    alignSelf: 'center',
  },
  textStyleNavigation: {
    marginTop: hp(4),
    alignSelf: 'center',
    color: 'white',
    fontWeight: '800',
  },
  buttonStyle: {
    marginTop: hp(2),
    alignSelf: 'center',
  },
  boxStyle: {
    width: wp(24.07),
    height: hp(10.27),
    borderRadius: 50,
    borderColor: '#DFDFDF',
    borderWidth: 2,
    borderStyle: 'solid',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default ProfileScreen;
