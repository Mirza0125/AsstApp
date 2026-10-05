import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Container, Content, Icon} from 'native-base';
import {checkForPermissions} from '../../../utils/Permission';
import {
  View,
  Image,
  Platform,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// components
import {
  Text,
  PopOver,
  IconCard,
  LuckyHeader,
  DataAvailability,
} from 'src/components';
//actions
import {
  popUp,
  getHomeData,
  selectService,
  searchServices,
  resetSearchServices,
} from './redux/actions';
import {registerMobileDevice} from 'src/screens/Common/Register/redux/actions';
// theme
import {Layout, Images, Gutters, Colors, Fonts} from 'src/theme';
// styles
import styles from './styles';

const Services = (props) => {
  const {
    user,
    services,
    popOver,
    requesting,
    searchedResult,
    navigation: {navigate, goBack},
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
    // props.getHomeData();
    addFCMToken();
    checkForPermissions();
  }, []);

  console.log('services ', props.services);

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
    // props.selectService(item);
    navigate('CreateBooking', {service: item});
  };

  const viewMoreServices = () => {
    if (services.length > more) {
      setMore(more + 2);
    }
  };

  const tempService = [
    {id: 1, image: require('../../../assets/images/services/1.png')},
    {id: 2, image: require('../../../assets/images/services/2.png')},
    {id: 3, image: require('../../../assets/images/services/3.png')},
    {id: 4, image: require('../../../assets/images/services/4.png')},
    {id: 5, image: require('../../../assets/images/services/5.png')},
    {id: 6, image: require('../../../assets/images/services/6.png')},
  ];

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

  const {titleSmall, textMedium} = Fonts;
  const {row, fill, center, justifyContentBetween, justifyContentEvenly} =
    Layout;
  const {
    mediumVMargin,
    smallBMargin,
    mediumTMargin,
    smallVPadding,
    smallLMargin,
  } = Gutters;
  const {icon, viewMore, loader, searchIcon, flexWrap, PoppinsM, line} = styles;
  console.log('user', user);
  return (
    <>
      <SafeAreaView style={[fill, {backgroundColor: '#fff'}]}>
        <Container
          style={[
            fill,
            {backgroundColor: Colors.white, justifyContent: 'center'},
          ]}>
          <LuckyHeader
            left={
              <Image
                style={{width: 14, height: 12, resizeMode: 'contain'}}
                source={require('../../../assets/images/new/arrow-left.png')}
              />
            }
            onPress={() => goBack()}
            title={
              <Text text="Services" color="#000" bold style={titleSmall} />
            }
            titleStyle={{alignItems: 'flex-start'}}
          />
          <View style={line} />
          <Content
            showsVerticalScrollIndicator={false}
            contentContainerStyle={smallVPadding}>
            <View style={{paddingHorizontal: 17}} />

            {!props?.services.message && (
              <View
                style={[
                  row,
                  justifyContentBetween,
                  mediumVMargin,
                  {paddingHorizontal: 17},
                ]}>
                <Text text="Available Services" style={textMedium} PoppinsM />
              </View>
            )}
            <View style={[fill, center]}>
              <View
                style={[
                  row,
                  center,
                  flexWrap,
                  smallBMargin,

                  {
                    paddingHorizontal: 10,
                    zIndex: -22222,
                    justifyContent: 'space-around',
                    marginHorizontal: '5%',
                  },
                ]}>
                {props?.services &&
                  props?.services.length &&
                  props?.services?.map((item, i) => (
                    <IconCard
                      style={{marginRight: '3%'}}
                      key={i}
                      source={{uri: item.image}}
                      // source={item.image}
                      text={item.name}
                      textStyle={[
                        PoppinsM,
                        {
                          fontWeight: 'bold',
                          marginVertical: 5,
                        },
                      ]}
                      onPress={() => onSelectService(item)}
                    />
                  ))}

                {/* {isMore && (
                  <IconCard
                    text="More"
                    style={viewMore}
                    textStyle={PoppinsM}
                    source={Images.Moreservice}
                    onPress={() => viewMoreServices()}
                  />
                )} */}
              </View>
            </View>
          </Content>
        </Container>

        {props?.services && props?.services.message && (
          <Text
            style={[
              textMedium,
              {
                flex: 1,
                justifyContent: 'center',
                textAlign: 'center',
              },
            ]}>
            {props?.services.message}
          </Text>
        )}
        {/* </DataAvailability> */}
      </SafeAreaView>
    </>
  );
};
const mapStateToProps = (state) => ({
  user: state.login.user,
  services: state.home.services,
  popOver: state.home.popOver,
  requesting: state.home.requesting,
  searchedResult: state.home.searchedResult,
  requestingSearch: state.home.requestingSearch,
});
const mapDispatchToProps = (dispatch) => ({
  getHomeData: () => dispatch(getHomeData()),
  popUp: () => dispatch(popUp()),
  searchServices: (query) => dispatch(searchServices(query)),
  selectService: (item) => dispatch(selectService(item)),
  resetSearchServices: () => dispatch(resetSearchServices()),
  registerMobileDevice: (data) => dispatch(registerMobileDevice(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Services);
