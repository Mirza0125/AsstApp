import React, {useEffect, useState, useRef} from 'react';
import {connect} from 'react-redux';
import {Container, Content, Icon} from 'native-base';
import {checkForPermissions} from '../../../utils/Permission';
import {
  Platform,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// components
import {
  Text,
  Input,
  PopOver,
  DiscountCard,
  IconCard,
  DataAvailability,
} from 'src/components';
//actions
import {
  popUp,
  getHomeData,
  searchServices,
  resetSearchServices,
  selectService,
} from './redux/actions';

import {getOnBoardData} from './../OnBoard/redux/actions';

import AppIntroSlider from 'react-native-app-intro-slider';
import Carousel, {Pagination} from 'react-native-snap-carousel';

import {registerMobileDevice} from 'src/screens/Common/Register/redux/actions';
// theme
import {Layout, Images, Gutters, Colors, Fonts} from 'src/theme';
// styles
import styles from './styles';
import {Button} from '../../../components';
import {onApplePay} from '../PaymentDetailScreen';

const {width: screenWidth} = Dimensions.get('window');

const Home = (props) => {
  const {
    user,
    services,
    popOver,
    requesting,
    searchedResult,
    navigation: {navigate},
  } = props;

  const addFCMToken = async () => {
    const Token = await AsyncStorage.getItem('FCMToken');
    console.log('Token', Token);
    props.registerMobileDevice({
      registration_id: Token,
      type: Platform.OS,
    });
  };
  useEffect(() => {
    props.getHomeData();

    props.getOnBoardData();
    addFCMToken();
    checkForPermissions();
  }, []);

  const [more, setMore] = useState(5);
  const [all, setAll] = useState(false);
  const [viewAll, setViewAll] = useState(true);
  const [value, setValue] = useState('');
  const [popUp, setPopUp] = useState(1);
  const [showPopover, setShowPopover] = useState(false);
  const [isMore, setIsMore] = useState(true);

  const onSearch = (val) => {
    val.length === 0 && props.resetSearchServices();
    setValue(val);
  };

  const onSelectService = (item) => {
    console.log('=======>dog walking', item);
    props.selectService(item);
  };

  const viewMoreServices = () => {
    if (services.length > more) {
      setMore(more + 2);
    }
  };

  const viewAllServices = () => {
    setMore(false);
    setIsMore(false);
    setViewAll(false);
    setAll(services.length);
  };

  const onPressDone = () => {
    props.popUp();
    setPopUp(0);
  };

  const {titleSmall, textMedium, titleRegular} = Fonts;
  const {row, fill, center, justifyContentBetween, justifyContentEvenly} =
    Layout;
  const {
    mediumVMargin,
    smallBMargin,
    mediumTMargin,
    smallVPadding,
    smallLMargin,
  } = Gutters;
  const {icon, viewMore, loader, searchIcon, flexWrap, PoppinsM} = styles;
  console.log('user', user);

  const [activeIndex, setActiveIndex] = useState(0);

  const data = [
    {
      title: 'Choose Services',
      description: 'Available\nServices',
      image: require('src/assets/images/onboard/1.png'),
      pressAction: () => props.navigation.navigate('Services'),
    },
    {
      title: 'Upcoming Bookings',
      description: 'View\nBookings',
      image: require('src/assets/images/onboard/2.png'),
      pressAction: () => props.navigation.navigate('MyBookings'),
    },
    {
      title: 'Update subscription',
      description: 'Manage\nSubscriptions',
      image: require('src/assets/images/onboard/3.png'),
      pressAction: () => props.navigation.navigate('Subscription'),
    },
    {
      title: 'No upcoming events',
      description: 'View all\nEvents',
      image: require('src/assets/images/onboard/4.png'),
      pressAction: () => props.navigation.navigate('EventsList'),
    },
    {
      title: 'Calendar Items',
      description: 'View my\nCalendar',
      image: require('src/assets/images/onboard/5.png'),
      pressAction: () => props.navigation.navigate('CalendarScreen'),
    },
  ];

  const pagination = () => {
    return (
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeIndex}
        containerStyle={{backgroundColor: '#fff'}}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 100,
          backgroundColor: '#fff',
          borderColor: '#30D5C8',
          borderWidth: 3,
        }}
        activeDotStyle={{}}
        inactiveDotStyle={{
          borderWidth: 0,
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: '#CED3D8',
          // Define styles for inactive dots here
        }}
        inactiveDotOpacity={1}
        inactiveDotScale={1}
      />
    );
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.slide}>
        <View
          style={{
            // marginVertical: '30%',
            backgroundColor: '#fff',
            width: '100%',
            alignItems: 'center',
            borderWidth: 5,
            borderColor: '#FFFFFF',
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowOffset: {width: 0, height: 0},
            shadowOpacity: 1,
            shadowRadius: 20,
            borderRadius: 20,
          }}>
          <Text style={[titleSmall, {fontWeight: 'bold', marginVertical: 10}]}>
            {item.title}
          </Text>

          <Image
            style={{
              // marginBottom: 10,
              height: '90%',
              width: '100%',
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}
            resizeMode="cover"
            source={item.image}
          />
          {/* <Text style={styles.text}>{item.discription}</Text> */}
          <TouchableOpacity
            onPress={item.pressAction}
            style={{
              width: '70%',
              backgroundColor: Colors.Turquoise,
              position: 'absolute',
              bottom: '5%',
              flexDirection: 'row',
            }}>
            <Text
              style={[
                textMedium,
                {
                  color: '#fff',
                  marginVertical: 10,
                  marginLeft: 10,
                  flex: 1,
                },
              ]}>
              {item.description}
            </Text>
            <Image
              style={{
                alignSelf: 'center',
                marginLeft: 10,
                marginRight: 10,
              }}
              source={require('src/assets/images/onboard/arrow.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const keyExtractor = (item) => item.title;

  return (
    <SafeAreaView style={[fill, {backgroundColor: '#fff'}]}>
      {/* <StatusBar backgroundColor="#fff" barStyle="dark-content" /> */}
      <StatusBar backgroundColor={'red'} barStyle={'dark-content'} />

      <Container style={[fill, {backgroundColor: '#fff'}]}>
        {/* <StatusBar barStyle="dark-content" StatusBar/> */}
        <View style={{paddingHorizontal: '10%'}}>
          <View
            style={[row, center, justifyContentBetween, {paddingVertical: 10}]}>
            <View>
              {
                <Text
                  text={`Hello, ${user.username}!`}
                  bold
                  style={[titleRegular, {fontWeight: 'bold'}]}
                />
              }
            </View>
            <TouchableOpacity onPress={() => navigate('Notifications')}>
              <Icon
                type="Ionicons"
                name="ios-notifications-outline"
                style={{fontSize: 22, color: '#000'}}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Carousel
          data={data}
          sliderHeight={screenWidth}
          renderItem={renderItem}
          layout={'default'}
          itemWidth={screenWidth - 100}
          sliderWidth={screenWidth}
          onSnapToItem={(index) => setActiveIndex(index)}
          // loop={true}
          // autoplay={true}
          // autoplayDelay={1000}
          activeSlideAlignment={'center'}
          keyExtractor={(item) => item.id}
          hasParallaxImages={true}
        />
        {pagination()}
      </Container>
    </SafeAreaView>
  );
};
const mapStateToProps = (state) => ({
  user: state.login.user,
  services: state.home.services,
  popOver: state.home.popOver,
  requesting: state.home.requesting,
  searchedResult: state.home.searchedResult,
  requestingSearch: state.home.requestingSearch,
  onBoardData: state.onBoardData.onBoardData,
});
const mapDispatchToProps = (dispatch) => ({
  getHomeData: () => dispatch(getHomeData()),
  getOnBoardData: () => dispatch(getOnBoardData()),
  popUp: () => dispatch(popUp()),
  searchServices: (query) => dispatch(searchServices(query)),
  selectService: (item) => dispatch(selectService(item)),
  resetSearchServices: () => dispatch(resetSearchServices()),
  registerMobileDevice: (data) => dispatch(registerMobileDevice(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
