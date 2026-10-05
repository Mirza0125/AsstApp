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
import {} from './redux/actions';

const {width: screenWidth} = Dimensions.get('window');

import styles from './styles';

const Help = (props) => {
  const {
    user,
    customerProfile,
    profileQuestions,
    navigation: {navigate},
  } = props;

  const [checked, setChecked] = useState('');

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

  useEffect(() => {}, []);

  const itemsList = [
    {
      id: 1,
      icon: Images.Help,
      name: 'Terms and conditions',
      onPress: () => navigate('TermsAndCondition'),
    },
    {
      id: 2,
      icon: Images.Help,
      name: 'Privacy policy',
      onPress: () => navigate('PrivacyPolicy'),
    },
  ];

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
        title={<Text text="Help" color="#000" bold style={titleSmall} />}
      />

      <View
        style={[
          pastService,
          {marginTop: '2%', backgroundColor: '#fff', flex: 1},
        ]}>
        {itemsList.map((item) => {
          return (
            <View style={serviceField}>
              <View style={[row, alignItemsCenter]}>
                <Image
                  style={{resizeMode: 'contain', width: 28, height: 18}}
                  source={item.icon}
                />
                <TouchableOpacity onPress={item.onPress}>
                  <Text text={item.name} style={[smallLMargin, textMedium]} />
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>
      <View style={line} />

      <View
        style={{
          alignItems: 'center',
          marginBottom: 40,
          backgroundColor: '#fff',
        }}>
        <Text
          text={'EMAIL: luckymoon@gmail.com'}
          style={[smallLMargin, textMedium]}
        />
        <Text
          text={'PHONE: +111233322'}
          style={[smallLMargin, textMedium, {marginTop: 10}]}
        />
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Help);
