import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Content, Icon} from 'native-base';
// import {Picker} from '@react-native-picker/picker';
import auth from '@react-native-firebase/auth';
import * as ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Carousel from 'react-native-snap-carousel';

import {
  View,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  TouchableWithoutFeedback,
  SafeAreaView,
  Dimensions,
} from 'react-native';
// components
import {
  Text,
  Line,
  Button,
  LuckyHeader,
  RNModal,
  ProfilePicture,
  Input,
} from 'src/components';

// theme
import {Layout, Images, Gutters, Global, Colors, Fonts} from 'src/theme';

//action
import {logout as logoutAction} from '../../Common/Login/redux/actions';
import {
  getCustomerProfile,
  updateProfile,
  getQuestion,
  uploadProfilePic,
} from './redux/actions';

const {width: screenWidth} = Dimensions.get('window');

import styles from './styles';

const Profile = (props) => {
  const {
    user,
    customerProfile,
    profileQuestions,
    navigation: {navigate},
  } = props;

  const [checked, setChecked] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [firstNam, setFirstNam] = useState('');
  const [lastNam, setLastNam] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [profileImage, setProfileImage] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [dropdownModal, setDropdownModal] = useState(false);
  const [answers, setAnswers] = useState({});
  const [answerData, setAnswerData] = useState([]);

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSubModal, setShowSubModal] = useState(false);

  const [userData, setUserData] = useState(user);

  const handleInputChange = (text, field) => {
    setUserData({
      ...userData,
      [field]: text,
    });
  };

  const {titleSmall, textMedium} = Fonts;
  const {row, fill, center, justifyContentBetween, alignItemsCenter} = Layout;
  const {
    smallLMargin,
    smallVPadding,
    regularHPadding,
    mediumHPadding,
    mediumTPadding,
    smallTPadding,
    smallBMargin,
  } = Gutters;
  const {secondaryBg} = Global;

  const {
    info,
    text,
    email,
    giftCard,
    container,
    firstName,
    modalStyle,
    inputField,
    pastService,
    serviceField,
    fieldWrapper,
    picContainer,
    inputFieldTwo,
    changePassword,
    line,
  } = styles;

  useEffect(() => {
    props.getCustomerProfile();
    props.getQuestion();
  }, []);

  useEffect(() => {
    if (customerProfile) {
      setUserEmail(customerProfile[0].email);
      setLastNam(customerProfile[0].last_name);
      setFirstNam(customerProfile[0].first_name);
    }
  }, [customerProfile]);

  const onPress = (val) => {
    setDropdownModal(true);
    setModalVisible(false);
    val === checked ? setChecked('') : setChecked(val);
  };

  const onSelectType = (index, value) => {
    let clonedAnswers = {...answers};
    clonedAnswers[index] = value.option;
    setAnswers(clonedAnswers);
    let obj = [{question: value.question, answer: value.id}];

    setAnswerData([...answerData, ...obj]);
    setChecked('');
    setDropdownModal(false);
    setModalVisible(true);
  };

  const logOut = () => {
    AsyncStorage.clear();
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    props.logout();
  };

  const selectProfileImage = async () => {
    let options = {
      includeBase64: true,
      storageOptions: {
        skipBackup: true,
        // path: 'images',
      },
    };
    await ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setProfileImage(response);
        console.log('ProfileImage Picker', response);
        const data = {
          image: `data:${response.assets[0].type};base64,${response.assets[0].base64}`,
        };
        props.uploadProfilePic(data, customerProfile[0]);
      }
    });
  };

  const submitForm = () => {
    let data = {
      email: userEmail,
      first_name: firstNam,
      last_name: lastNam,
    };

    data.info = answerData;
    props.updateProfile(data, customerProfile[0]);
    props.getCustomerProfile();
    setIsEditing(false);
    setProfileImage(false);
    console.log('form customerProfile', customerProfile[0]);
    console.log('POSTED DATA', data);
  };

  console.log('answers', answers);
  console.log('answerData', answerData);
  const Questions = [
    {
      type: 'dogwalking',
      question: 'Dog Type',
      answer: ['Puppy', 'Bull Dog', 'German Shephard'],
    },
    {
      type: 'dogwalking',
      question: 'Dog Walking Duration',
      answer: ['10 minutes', '20 minutes', '30 minutes'],
    },
    {
      type: 'housecleaning',
      question: 'House Type',
      answer: ['Flat', 'Office', 'Apartment'],
    },

    {
      type: 'housecleaning',
      question: 'Number of Rooms',
      answer: ['2 Rooms', '3 Rooms', '5 Rooms'],
    },
  ];

  const itemsList = [
    {
      id: 1,
      icon: Images.MyProfile,
      name: 'My Profile',
      onPress: () => setShowProfileModal(true),
    },
    {
      id: 2,
      icon: Images.PaymentMethod,
      name: 'Payment methods',
      onPress: () => navigate('PaymentMethodScreen', {manageCard: true}),
    },
    {
      id: 3,
      icon: Images.MySubscription,
      name: 'My subscriptions',
      onPress: () => setShowSubModal(true),
    },
    {
      id: 4,
      icon: Images.Services,
      name: 'Past Services',
      onPress: () => navigate('PastOrdersScreen'),
    },
    {
      id: 5,
      icon: Images.Services,
      name: 'Recurring Services',
      onPress: () => {},
    },
    {id: 6, icon: Images.Help, name: 'Help', onPress: () => navigate('Help')},
    {id: 7, icon: Images.Logout, name: 'Logout', onPress: () => logOut()},
  ];

  const activeSubscription = [
    {
      id: '1',
      name: 'Intro',
      features: ['Chat Feature', 'Standard $80 hourly rate'],
      price: 'Free',
    },
  ];

  const renderSubItem = ({item}) => (
    <View
      style={{
        width: '100%',
        backgroundColor: 'white',
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 9.33333},
        shadowOpacity: 0.05,
        shadowRadius: 23.3333,
        borderRadius: 5,
      }}>
      <View
        style={{
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,

          height: 70,
          width: '100%',
          backgroundColor: '#30D5C8',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={[
            {fontWeight: 'bold', color: 'white', fontSize: 24},
            textMedium,
          ]}>
          {item.name}
        </Text>
      </View>
      <View
        style={{
          marginTop: 10,
          marginBottom: 10,
          // flex: 1,
          height: '45%',
          marginHorizontal: '15%',
        }}>
        {item.features.map((feature, index) => (
          <Text key={index} style={{marginVertical: 10, fontSize: 15}}>
            {feature}
          </Text>
        ))}
      </View>
      <View
        style={{
          width: '100%',
          height: 1,
          backgroundColor: '#30D5C8',
          marginVertical: 10,
        }}
      />
      <Text
        style={[
          {textAlign: 'center', color: 'black', alignSelf: 'center'},
          textMedium,
          {fontWeight: 'bold'},
        ]}>
        {item.price}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={[fill, {backgroundColor: '#fff'}]}>
      <LuckyHeader
        left={
          <Icon
            type="FontAwesome5"
            name="arrow-left"
            style={{fontSize: 20}}
            onPress={() => props.navigation.goBack()}
          />
        }
        title={<Text text="Account" color="#000" bold style={titleSmall} />}
      />
      <View style={line} />
      <Content style={{backgroundColor: '#F7F7F7'}}>
        <Line />

        <View style={[container]}>
          <TouchableOpacity
            style={[center, picContainer]}
            onPress={() => selectProfileImage()}>
            <ProfilePicture
              source={
                userData && userData.image && !profileImage
                  ? {uri: userData.image}
                  : profileImage
                  ? {uri: user.image}
                  : Images.nopic
              }
            />
          </TouchableOpacity>

          <View style={pastService}>
            {itemsList.map((item) => {
              return (
                <View style={serviceField}>
                  <View style={[row, alignItemsCenter]}>
                    <Image
                      style={{resizeMode: 'contain', width: 28, height: 18}}
                      source={item.icon}
                    />
                    <TouchableOpacity onPress={item.onPress}>
                      <Text
                        text={item.name}
                        style={[smallLMargin, textMedium]}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </Content>

      <RNModal
        modalVisible={showProfileModal}
        animationIn="slideInUp"
        animationInTiming={500}
        animationOut="slideOutDown"
        animationOutTiming={800}
        style={modalStyle}
        onBackButtonPress={() => setShowProfileModal(false)}>
        <TouchableOpacity
          onPress={() => setShowProfileModal(false)}
          style={{
            height: '30%',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            width: '100%',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignSelf: 'center',
          }}
        />
        <View style={[fill, secondaryBg]}>
          <TouchableWithoutFeedback onPress={() => setShowProfileModal(false)}>
            <View
              style={[
                center,
                smallVPadding,
                {
                  backgroundColor: '#F0F0F0',
                  height: 47,
                },
              ]}>
              <Text text="My Profile" category="h6" bold />
            </View>
          </TouchableWithoutFeedback>

          <View
            style={[
              smallBMargin,
              {width: '90%', alignSelf: 'center', marginTop: 10},
            ]}>
            <Input
              placeholder="Name"
              value={userData.username}
              showHint
              onChangeText={(text) => handleInputChange(text, 'username')}
            />
          </View>

          <View style={[smallBMargin, {width: '90%', alignSelf: 'center'}]}>
            <Input
              placeholder="Email"
              value={userData.email}
              showHint
              onChangeText={(text) => handleInputChange(text, 'email')}
            />
          </View>

          <View style={[smallBMargin, {width: '90%', alignSelf: 'center'}]}>
            <Input
              placeholder="Phone number"
              value={userData.phone}
              showHint
              onChangeText={(text) => handleInputChange(text, 'phone')}
            />
          </View>

          <View style={[smallBMargin, {width: '90%', alignSelf: 'center'}]}>
            <Input
              placeholder="Property Name"
              value={userData.property_name}
              showHint
              onChangeText={(text) => handleInputChange(text, 'property_name')}
            />
          </View>

          <View style={[smallBMargin, {width: '90%', alignSelf: 'center'}]}>
            <Input
              placeholder="Floor Plan"
              value={userData.floor_plan}
              showHint
              onChangeText={(text) => handleInputChange(text, 'floor_plan')}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <View style={[smallBMargin, {width: '40%', alignSelf: 'center'}]}>
              <Input
                placeholder="Building Number"
                value={userData.building_number}
                showHint
                onChangeText={(text) =>
                  handleInputChange(text, 'building_number')
                }
              />
            </View>

            <View style={[smallBMargin, {width: '40%', alignSelf: 'center'}]}>
              <Input
                placeholder="Unit Number"
                value={userData.unit_number}
                showHint
                onChangeText={(text) => handleInputChange(text, 'unit_number')}
              />
            </View>
          </View>

          <View style={[mediumHPadding, mediumTPadding]}>
            <Button
              text="Change password"
              textStyle={{color: '#30D5C8'}}
              color="#fff"
              block
              // loading={requesting}
              onPress={() => {}}
              style={[
                {
                  width: '100%',
                  alignSelf: 'center',
                  marginTop: '3%',
                  backgroundColor: '#fff',
                  borderWidth: 2,
                  borderColor: '#30D5C8',
                },
              ]}
            />
          </View>

          <View style={[mediumHPadding, smallTPadding]}>
            <Button
              text="Save Changes"
              color="primary"
              block
              onPress={() => setShowProfileModal(false)}
            />
          </View>
        </View>
      </RNModal>

      <RNModal
        modalVisible={showSubModal}
        animationIn="slideInUp"
        animationInTiming={500}
        animationOut="slideOutDown"
        animationOutTiming={800}
        style={modalStyle}
        onBackButtonPress={() => setShowSubModal(false)}>
        <TouchableOpacity
          onPress={() => setShowSubModal(false)}
          style={{
            height: '40%',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            width: '100%',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignSelf: 'center',
          }}
        />
        <View style={[fill, secondaryBg]}>
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View
              style={[
                center,
                smallVPadding,
                {
                  backgroundColor: '#F0F0F0',
                  height: 47,
                },
              ]}>
              <Text text="My Subscription" category="h6" bold />
            </View>
          </TouchableWithoutFeedback>

          <Carousel
            data={activeSubscription}
            sliderHeight={40}
            renderItem={renderSubItem}
            layout={'default'}
            itemWidth={screenWidth - 70}
            sliderWidth={screenWidth}
            activeSlideAlignment={'center'}
            keyExtractor={(item) => item.id}
            hasParallaxImages={true}
          />

          <View style={[mediumHPadding, {marginBottom: '10%'}]}>
            <Button
              text="Change Subscription"
              color="primary"
              block
              onPress={() => {
                setShowSubModal(false);
                navigate('Subscription');
              }}
            />
          </View>
        </View>
      </RNModal>

      <RNModal
        modalVisible={dropdownModal}
        animationIn="slideInUp"
        animationInTiming={500}
        animationOut="slideOutDown"
        animationOutTiming={800}
        style={[modalStyle, {paddingLeft: 10, paddingTop: 25}]}
        onBackButtonPress={() => setDropdownModal(false)}>
        <View style={fill} />
        <View
          style={{
            flex: 0.8,
            backgroundColor: '#fff',
          }}>
          {profileQuestions &&
            profileQuestions?.map(
              (item, i) =>
                checked === i &&
                item?.options.map((answer, index) => (
                  <View style={[regularHPadding]} key={index}>
                    <TouchableOpacity
                      onPress={() => onSelectType(i, answer)}
                      key={index}>
                      <Text
                        text={answer.option}
                        color="quaternary"
                        category="p1"
                        style={[smallVPadding]}
                      />
                    </TouchableOpacity>
                  </View>
                )),
            )}
        </View>
      </RNModal>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  user: state.login.user,
  customerProfile: state.customerProfile.customerProfile,
  profileQuestions: state.customerProfile.profileQuestions,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logoutAction()),
  getCustomerProfile: () => dispatch(getCustomerProfile()),
  getQuestion: () => dispatch(getQuestion()),
  updateProfile: (data, customerProfile) =>
    dispatch(updateProfile(data, customerProfile)),
  uploadProfilePic: (data, customerProfile) =>
    dispatch(uploadProfilePic(data, customerProfile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
