import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Content, Input, Icon, Picker} from 'native-base';
// import {Picker, PickerIOS} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TabView, TabBar} from 'react-native-tab-view';
import {useIsFocused} from '@react-navigation/native';

// import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view'
import {
  View,
  Image,
  Platform,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  useWindowDimensions,
  // ScrollView,
} from 'react-native';

// components
import {Text, LuckyHeader, ProfilePicture} from 'src/components';

// theme
import {Layout, Images, Gutters, Global, Colors, Fonts} from 'src/theme';

//action
import {logout as logoutAction} from '../../Common/Login/redux/actions';
import {
  getProfile,
  uploadPhoto,
  updateProfile,
  uploadProfilePic,
  getEmployeePhotos,
} from './redux/actions';

import styles from './styles';
import {Button} from '../../../components';
import * as ImagePicker from 'react-native-image-picker';

const Profile = (props) => {
  const isFocused = useIsFocused();
  const {
    requesting,
    profileData,
    employeePhotos,
    navigation: {navigate},
  } = props;

  const {titleSmall, textMedium} = Fonts;
  const {row, fill, wrap, center, alignItemsCenter, justifyContentBetween} =
    Layout;
  const {smallHPadding, smallLMargin} = Gutters;

  const {
    note,
    input,
    lastName,
    firstName,
    container,
    pastService,
    serviceField,
    picContainer,
    changePassword,
    indicatorStyle,
  } = styles;

  const [gender, setGender] = useState('');
  const [firstNam, setFirstNam] = useState('');
  const [lastNam, setLastNam] = useState('');
  const [email, setEmail] = useState('');
  const [not, setNot] = useState('');
  const [experience, setExperience] = useState('');
  const [certification, setCertification] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const [profileImage, setProfileImage] = useState(false);
  const [myPhoto, setMyPhoto] = useState([]);
  // const [genderValue, setGenderValue] = useState(null);
  // const [openGender, setOpenGender] = useState(false);
  // const [experienceValue, setExperienceValue] = useState(null);
  // const [openExperience, setOpenExperience] = useState(false);

  // const [certValue, setCertValue] = useState(null);
  // const [openCert, setOpenCert] = useState(false);
  // const [genderItems, setGenderItems] = useState([
  //   { label: 'Male', value: 'Male' },
  //   { label: 'Female', value: 'Female' },
  // ]);
  // const [experienceItems, setExperienceItems] = useState([
  //   { label: '1', value: '1' },
  //   { label: '2', value: '2' },
  //   { label: '3', value: '3' },
  //   { label: '4', value: '4' },
  // ]);
  // const [certItems, setCertItems] = useState([
  //   { label: 'Laundry', value: 'Laundry' },
  //   { label: 'Dog Walking', value: 'Dog Walking' },
  //   { label: 'House Cleaning', value: 'House Cleaning' },
  // ]);

  useEffect(() => {
    props.getProfile();
    props.getEmployeePhotos();
  }, []);

  useEffect(() => {
    if (profileData) {
      setGender(profileData[0]?.gender ? profileData[0]?.gender : 'Other');
      setNot(
        profileData[0]?.description
          ? profileData[0]?.description
          : 'Write Some Lines..',
      );
      setEmail(profileData[0].user_email);
      setLastNam(profileData[0].user_last_name);
      setFirstNam(profileData[0].user_first_name);
      setExperience(
        profileData[0]?.years_of_experience
          ? profileData[0].years_of_experience
          : 0,
      );
    }
  }, [profileData, isFocused]);

  const onPress = () => {
    AsyncStorage.clear();
    props.logout();
  };

  const submitForm = () => {
    let data = {
      years_of_experience: experience,
      description: not,
      gender: gender,
      user_detail: {
        email: email,
        first_name: firstNam,
        last_name: lastNam,
      },
    };

    // if (myPhoto.assets) {
    //   data.photo = `data:${myPhoto.assets[0].type};base64,${
    //     myPhoto.assets[0].base64
    //   }`;
    // }

    props.updateProfile(data, profileData[0]);
    console.log('form profileData', profileData[0]);
    if (isEditingPhoto) {
      setIsEditingPhoto(false);
    }
    if (isEditing) {
      setIsEditing(false);
    }
    console.log('POSTED DATA', data);
  };

  const onUploadPhoto = async () => {
    if (myPhoto.length > 0) {
      if (myPhoto.length === 1) {
        let data = {
          profile_image: `data:${myPhoto[0].type};base64,${myPhoto[0].base64}`,
          profile: profileData[0].id,
        };
        console.log('Posted photos', data);
        props.uploadPhoto(data);
      } else {
        let images = [];
        myPhoto.forEach((element) => {
          images.push(`data:${element.type};base64,${element.base64}`);
        });
        let data = {
          profile_image: images,
          profile: profileData[0].id,
        };
        console.log('Posted photos', data);
        await props.uploadPhoto(data);
      }
    }
  };

  const selectProfileImage = async () => {
    await ImagePicker.launchImageLibrary({includeBase64: true}, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setProfileImage(response);
        let data = {
          photo: `data:${response.assets[0].type};base64,${response.assets[0].base64}`,
        };
        props.uploadProfilePic(data, profileData[0]);
      }
    });
  };

  const selectPhotos = async () => {
    await ImagePicker.launchImageLibrary(
      {includeBase64: true, selectionLimit: 0},
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          if (myPhoto.length > 0) {
            setMyPhoto([...myPhoto, ...response?.assets]);
          } else {
            setMyPhoto(response?.assets);
          }
        }
      },
    );
  };

  const onChangeIndex = (i) => {
    //console.log('INDEX', i);
    setIndex(i);
  };

  const dimensions = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Profile'},
    {key: 'second', title: 'Photos'},
    {key: 'third', title: 'Setting'},
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={indicatorStyle}
      style={{backgroundColor: 'white'}}
      activeColor={Colors.torchRed}
      inactiveColor={Colors.black}
      labelStyle={{fontWeight: 'bold'}}
    />
  );

  const filterItems = (ImageItem) => {
    console.log('ImageItem', ImageItem);
    setMyPhoto(myPhoto.filter((item) => item.uri !== ImageItem.uri));
  };

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
        return (
          <Content showsVerticalScrollIndicator={false}>
            <View
              style={{
                flex: 1,
                padding: 25,
                backgroundColor: 'white',
              }}>
              <View style={[row, justifyContentBetween]}>
                <View style={[firstName]}>
                  {isEditing ? (
                    <Input
                      defaultValue={profileData[0].user_first_name}
                      value={firstNam}
                      onChangeText={(text) => setFirstNam(text)}
                      placeholder="First Name"
                    />
                  ) : (
                    <>
                      <Text
                        text="First Name"
                        color="quinary"
                        style={smallLMargin}
                      />
                      <View
                        style={[
                          row,
                          center,
                          justifyContentBetween,
                          smallHPadding,
                        ]}>
                        <Text
                          text={
                            firstNam
                              ? firstNam
                              : profileData[0]?.user_first_name
                          }
                          style={[textMedium]}
                        />
                      </View>
                    </>
                  )}
                </View>
                <View style={lastName}>
                  {isEditing ? (
                    <Input
                      defaultValue={profileData[0].user_last_name}
                      value={lastNam}
                      onChangeText={(text) => setLastNam(text)}
                      placeholder="Last Name"
                    />
                  ) : (
                    <>
                      <Text
                        text="Last Name"
                        color="quinary"
                        style={smallLMargin}
                      />
                      <View
                        style={[
                          row,
                          center,
                          justifyContentBetween,
                          smallHPadding,
                        ]}>
                        <Text
                          text={
                            lastNam ? lastNam : profileData[0]?.user_last_name
                          }
                          style={[textMedium]}
                        />
                      </View>
                    </>
                  )}
                </View>
              </View>

              {isEditing ? null : (
                <View style={input}>
                  <Text text="Email" color="quinary" style={smallLMargin} />
                  <View
                    style={[row, center, justifyContentBetween, smallHPadding]}>
                    <Text
                      text={profileData ? profileData[0].user_email : email}
                      style={[textMedium]}
                    />
                  </View>
                </View>
              )}

              <View style={[{flex: 1}, row, justifyContentBetween]}>
                {isEditing ? (
                  <View style={{flex: 1, borderRadius: 4, overflow: 'hidden'}}>
                    {Platform.OS === 'ios' && (
                      <Text
                        text="Gender"
                        style={{fontSize: 14}}
                        bold
                        PoppinsM
                      />
                    )}
                    <Picker
                      placeholder="Select gender"
                      style={{
                        backgroundColor: '#f7f7f7',
                        width: '100%',
                      }}
                      selectedValue={gender}
                      mode="dropdown"
                      onValueChange={(itemValue, itemIndex) =>
                        setGender(itemValue)
                      }>
                      <Picker.Item label="Male" value="Male" />
                      <Picker.Item label="Female" value="Female" />
                      <Picker.Item label="Other" value="Other" />
                    </Picker>
                  </View>
                ) : (
                  <View style={[firstName, {marginRight: 5}]}>
                    <Text
                      text="Gender"
                      color="quinary"
                      style={[smallLMargin]}
                    />
                    <View style={[row]}>
                      <View style={[smallHPadding]}>
                        <Text
                          text={gender ? gender : profileData[0]?.gender}
                          style={textMedium}
                        />
                      </View>
                    </View>
                  </View>
                )}
                {isEditing ? (
                  <View
                    style={[{flex: 1, borderRadius: 4, overflow: 'hidden'}]}>
                    {Platform.OS === 'ios' && (
                      <Text
                        text="Year of experience"
                        style={[smallLMargin, {fontSize: 14}]}
                        PoppinsM
                        bold
                      />
                    )}

                    <Picker
                      placeholder="Select experience"
                      style={[
                        {
                          marginLeft: 6,
                          width: '100%',
                          backgroundColor: '#f5f5f5',
                        },
                      ]}
                      selectedValue={experience}
                      mode="dropdown"
                      onValueChange={(itemValue, itemIndex) =>
                        setExperience(itemValue)
                      }>
                      <Picker.Item label="1" value="1" />
                      <Picker.Item label="2" value="2" />
                      <Picker.Item label="3" value="3" />
                    </Picker>
                  </View>
                ) : (
                  <View style={firstName}>
                    <Text
                      text="Year of Experience"
                      color="quinary"
                      style={smallLMargin}
                    />

                    <View style={[smallHPadding]}>
                      <Text
                        text={
                          experience
                            ? experience
                            : profileData[0]?.years_of_experience
                        }
                        style={textMedium}
                      />
                    </View>
                  </View>
                )}
              </View>
              {isEditing ? (
                <View
                  style={[
                    {flex: 1, marginTop: 8},
                    Platform.OS === 'android' && {
                      borderRadius: 4,
                      overflow: 'hidden',
                    },
                  ]}>
                  {Platform.OS === 'ios' && (
                    <Text
                      text="Certification"
                      style={[smallLMargin, {fontSize: 14}]}
                      PoppinsM
                      bold
                    />
                  )}
                  <Picker
                    placeholder="Select certification"
                    style={{width: '100%', backgroundColor: '#f5f5f5'}}
                    selectedValue={certification}
                    mode="dropdown"
                    onValueChange={(itemValue, itemIndex) =>
                      setCertification(itemValue)
                    }>
                    <Picker.Item label="Loundry" value="Loundry" />
                    <Picker.Item label="Dog Walking" value="Dog Walking" />
                    <Picker.Item
                      label="House Cleaning"
                      value="House Cleaning"
                    />
                  </Picker>
                </View>
              ) : (
                <View style={[input]}>
                  <Text
                    text="Certification"
                    color="quinary"
                    style={smallLMargin}
                  />

                  <View style={[smallHPadding]}>
                    <Text text={certification} style={textMedium} />
                  </View>
                </View>
              )}
              <View style={[note, {paddingVertical: 5}]}>
                {isEditing ? (
                  <Input
                    defaultValue={profileData[0].description}
                    value={not}
                    onChangeText={(text) => setNot(text)}
                    placeholder="Note"
                    style={{fontSize: 16}}
                    placeholderTextColor="#000"
                    multiline
                  />
                ) : (
                  <Text text="Note" color="quinary" style={{fontSize: 12}} />
                )}
                {!isEditing && (
                  <View style={fill}>
                    <Text
                      text={profileData && profileData[0].description}
                      style={textMedium}
                    />
                  </View>
                )}
              </View>
              <View style={[center, changePassword]}>
                <TouchableOpacity onPress={() => navigate('ChangePassword')}>
                  <Text
                    text="Change Password"
                    bold
                    color="quaternary"
                    style={[textMedium]}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </Content>
        );
      case 'second':
        return (
          <View style={{flex: 1, padding: 20}}>
            <Content showsVerticalScrollIndicator={false}>
              <View style={[fill, row, wrap]}>
                {employeePhotos
                  ? employeePhotos?.map((item, i) => (
                      <View
                        style={{width: 105, height: 105, padding: 5}}
                        key={i}>
                        <Image
                          source={{uri: item.profile_image}}
                          style={{width: 100, height: 100}}
                        />
                        {/* <TouchableOpacity
                      //onPress={() => filterItems(item)}
                      style={{
                        top: 10,
                        right: 5,
                        width: 20,
                        height: 20,
                        opacity: 0.4,
                        borderRadius: 8,
                        position: 'absolute',
                        backgroundColor: 'white',
                      }}>
                      <Icon
                        type="FontAwesome5"
                        name="times"
                        style={{fontSize: 20, textAlign: 'center'}}
                      />
                    </TouchableOpacity> */}
                      </View>
                    ))
                  : null}
                {myPhoto?.map((item, i) => (
                  <View style={{width: 105, height: 105, padding: 5}} key={i}>
                    <Image
                      source={{uri: item.uri}}
                      style={{width: 100, height: 100}}
                    />
                    <TouchableOpacity
                      onPress={() => filterItems(item)}
                      style={{
                        top: 10,
                        right: 5,
                        width: 20,
                        height: 20,
                        opacity: 0.4,
                        borderRadius: 8,
                        position: 'absolute',
                        backgroundColor: 'white',
                      }}>
                      <Icon
                        type="FontAwesome5"
                        name="times"
                        style={{fontSize: 20, textAlign: 'center'}}
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </Content>
            <Button
              text={myPhoto.length > 0 ? 'Add more' : 'Upload'}
              color="primary"
              block
              style={{marginTop: 40}}
              loading={requesting}
              onPress={() => selectPhotos()}
            />
          </View>
        );

      case 'third':
        return (
          <Content showsVerticalScrollIndicator={false}>
            <View style={{flex: 1}}>
              <View style={pastService}>
                <View style={serviceField}>
                  <View style={[row, alignItemsCenter]}>
                    <Image source={Images.questionmark} />
                    <Text text="Help" style={[smallLMargin, textMedium]} />
                  </View>
                </View>
                <View style={serviceField}>
                  <View style={[row, alignItemsCenter]}>
                    <Image source={Images.logout} />
                    <TouchableOpacity onPress={onPress}>
                      <Text text="Logout" style={[smallLMargin, textMedium]} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Content>
        );

      default:
        return;
    }
  };
  console.log('profileData', profileData);
  console.log('employeePhotos', employeePhotos);
  console.log('myPhoto', myPhoto);
  return (
    <SafeAreaView style={fill}>
      <LuckyHeader
        title={
          <Text text="Account" color="quaternary" bold style={titleSmall} />
        }
        titleStyle={{alignSelf: 'center'}}
        right={
          <>
            {index === 0 ? (
              isEditing ? (
                <TouchableOpacity
                  onPress={() => submitForm()}
                  style={{
                    width: 40,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text text="SAVE" style={{color: 'red'}} bold />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => setIsEditing(true)}
                  style={{
                    width: 40,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text text="EDIT" bold />
                </TouchableOpacity>
              )
            ) : myPhoto.length && !isEditingPhoto ? (
              <TouchableOpacity
                onPress={() => onUploadPhoto()}
                style={{
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text text="Apply" style={{color: 'red', fontSize: 16}} bold />
              </TouchableOpacity>
            ) : null}
          </>
        }
      />

      <View style={container}>
        <TouchableOpacity
          style={[center, picContainer]}
          onPress={() => selectProfileImage()}>
          <ProfilePicture
            source={
              profileData && profileData[0].photo && !profileImage
                ? {uri: profileData[0].photo}
                : profileImage
                ? {uri: profileImage.assets[0].uri}
                : Images.profile
            }
          />
          {/* {uri: profileData.image} */}
        </TouchableOpacity>
      </View>
      <TabView
        keyboardDismissMode={true}
        swipeEnabled={true}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={(i) => onChangeIndex(i)}
        initialLayout={{width: dimensions.width}}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  user: state.login.user,
  profileData: state.profileData.profileData,
  employeePhotos: state.profileData.employeePhotos,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logoutAction()),
  getProfile: () => dispatch(getProfile()),
  getEmployeePhotos: () => dispatch(getEmployeePhotos()),
  uploadPhoto: (data) => dispatch(uploadPhoto(data)),
  updateProfile: (data, profileData) =>
    dispatch(updateProfile(data, profileData)),
  uploadProfilePic: (data, profileData) =>
    dispatch(uploadProfilePic(data, profileData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
