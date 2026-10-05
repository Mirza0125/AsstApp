import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Container, Content, Icon, Picker} from 'native-base';
import {useIsFocused} from '@react-navigation/native';
// import {Picker} from '@react-native-picker/picker';
import {
  View,
  Alert,
  Image,
  Input as RNInput,
  Platform,
  StatusBar,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import {appConfig} from '../../../config/app';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {checkForPermissions} from '../../../utils/Permission';
import {
  check,
  RESULTS,
  PERMISSIONS,
  openSettings,
  requestMultiple,
} from 'react-native-permissions';
// components
import {
  Text,
  Input,
  Button,
  RNModal,
  IconCard,
  EarningCard,
  DataAvailability,
} from '../../../components';
//actions
import {
  addService,
  sendLocation,
  getAllServices,
  getEmployeeHomeData,
} from './redux/actions';
import {
  getPendingBookingTaskDetail,
  getApprovedBookingTaskDetail,
} from '../Task/redux/actions';
import {registerMobileDevice} from 'src/screens/Common/Register/redux/actions';
// theme
import {Layout, Images, Global, Gutters, Colors, Fonts} from 'src/theme';
// styles
import styles from './styles';
import {TextInput} from 'react-native-gesture-handler';

const Home = (props) => {
  const isFocused = useIsFocused();
  const {
    user,
    requesting,
    serviceList,
    pendingTask,
    approvedTask,
    employeeLocation,
    employeeServices,
    navigation: {navigate},
  } = props;

  const [more, setMore] = useState(5);
  const [all, setAll] = useState(false);
  const [viewAll, setViewAll] = useState(false);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [error, setError] = useState(null);
  const [address, setAddress] = useState(null);
  const [inputValue, setInputValue] = useState('');

  //Modal
  const [checked, setChecked] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [dropdownModal, setDropdownModal] = useState(false);
  const [value, setValue] = useState(null);
  const [serviceAdded, setServiceAdded] = useState(null);
  const [week, setWeek] = useState('');
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'This week', value: 'This week'},
    {label: 'Last week', value: 'Last week'},
  ]);

  const onPress = (val) => {
    val === checked ? setChecked(0) : setChecked(val);
    setDropdownModal(true);
    console.log('Val>>', val);
  };

  useEffect(() => {
    checkForPermissions();
    // if (!hasPermission) {
    //   console.log('Check Permission Called');
    //   checkLocationPermissions();
    // }
    Geolocation.setRNConfiguration({
      skipPermissionRequests: true,
      authorizationLevel: 'always',
    });
    // Geolocation.requestAuthorization();
  }, []);

  useEffect(() => {
    // props.getPendingBookingTaskDetail();
    // props.getApprovedBookingTaskDetail();
    setTimeout(() => {
      props.getEmployeeHomeData();
    }, 500);
  }, [isFocused, serviceAdded]);

  useEffect(() => {
    props.getAllServices();
    addFCMToken();
  }, []);

  const viewMoreServices = () => {
    if (employeeServices.length > more) {
      setMore(more + 5);
    }
  };

  const viewAllServices = () => {
    setMore(false);
    setViewAll(true);
    setTimeout(() => {
      setAll(employeeServices.length + 100);
    }, 600);
  };

  const onSelectCategoryType = (category) => {
    setSelectedCategory(category);
    setChecked('');
    setDropdownModal(false);
  };

  const onAddService = async () => {
    const data = {
      price: price,
      employee: user.em_id,
      category: selectedCategory.id,
    };
    await props.addService(data);
    setModalVisible(false);
    // await props.getEmployeeHomeData();
    setServiceAdded(Math.floor(Math.random() * 100));
    setAll(employeeServices.length + 100);
    setSelectedCategory('');
  };

  // const PLATFORM_PERMS = Platform.select({
  //   ios: [
  //     PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  //     PERMISSIONS.IOS.LOCATION_ALWAYS,
  //   ],
  //   android: [
  //     PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  //     PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
  //   ],
  // });

  // const getLocation = () => {
  //   Geolocation.getCurrentPosition(
  //     (position) => {
  //       const initialPosition = JSON.stringify(position);
  //       setLocation(initialPosition);
  //     },
  //     (error) => Alert.alert('getLocation Error', JSON.stringify(error)),
  //     {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
  //   );
  // };

  // const getLocationCoords = () => {
  //   if (location) {
  //     return JSON.parse(location).coords;
  //   }
  //   return {latitude: '0.00', altitude: '0.00', timestamp: '0.00'};
  // };

  // const getAddress = async (lat, lng) => {
  //   Geocoder.init('AIzaSyCY9b9iNvxyJ35mWAR2_2Tn6xOpRIz3gyc', {language: 'en'});
  //   Geocoder.from(lat, lng)
  //     .then((json) => {
  //       console.log(json);
  //       var addressComponent = json.results[0].address_components;
  //       setAddress(addressComponent);
  //       console.log('addressComponent', addressComponent);
  //     })
  //     .catch((error) => console.warn(error));
  // };

  // const checkLocationPermissions = async () => {
  //   try {
  //     const result = await requestMultiple(PLATFORM_PERMS);
  //     if (
  //       result[PLATFORM_PERMS[0]] === RESULTS.UNAVAILABLE ||
  //       result[PLATFORM_PERMS[1]] === RESULTS.UNAVAILABLE
  //     ) {
  //       Alert.alert(
  //         'Info',
  //         'You may want to check your permission settings to enable full feature use of this application.',
  //         [
  //           {
  //             text: 'Settings',
  //             onPress: () => {
  //               openSettings();
  //             },
  //           },
  //           {
  //             text: 'Dismiss',
  //             onPress: () => { },
  //             style: 'cancel',
  //           },
  //         ],
  //         { cancelable: false },
  //       );
  //     }
  //     if (
  //       result[PLATFORM_PERMS[0]] === RESULTS.DENIED ||
  //       result[PLATFORM_PERMS[1]] === RESULTS.DENIED
  //     ) {
  //       Alert.alert(
  //         'Warning',
  //         'The permission(s) has not been requested / is denied but requestable',
  //         [
  //           {
  //             text: 'Try Again',
  //             onPress: () => {
  //               checkLocationPermissions();
  //             },
  //           },
  //           {
  //             text: 'Dismiss',
  //             onPress: () => { },
  //             style: 'cancel',
  //           },
  //         ],
  //         { cancelable: false },
  //       );
  //     }
  //     if (
  //       result[PLATFORM_PERMS[0]] === RESULTS.BLOCKED ||
  //       result[PLATFORM_PERMS[1]] === RESULTS.BLOCKED
  //     ) {
  //       const whenInUseStatus = await check(
  //         PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  //       );
  //       if (whenInUseStatus === RESULTS.GRANTED) {
  //         // await getLocation(latitude, longitude);
  //         setHasPermission(true);
  //       } else {
  //         Alert.alert(
  //           'Warning',
  //           'The permission(s) is denied and not requestable anymore. Please enable location from device settings to continue.',
  //           [
  //             {
  //               text: 'Settings',
  //               onPress: () => {
  //                 openSettings();
  //               },
  //             },
  //             {
  //               text: 'Dismiss',
  //               onPress: () => { },
  //               style: 'cancel',
  //             },
  //           ],
  //           { cancelable: false },
  //         );
  //       }
  //     }
  //     if (
  //       result[PLATFORM_PERMS[0]] === RESULTS.GRANTED ||
  //       result[PLATFORM_PERMS[1]] === RESULTS.GRANTED
  //     ) {
  //       // await getLocation(latitude, longitude);
  //       await setHasPermission(true);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     alert('Failed to request permissions. Unable to continue.');
  //   }
  // };

  const addFCMToken = async () => {
    const Token = await AsyncStorage.getItem('FCMToken');
    //console.log('Token', Token);
    props.registerMobileDevice({
      registration_id: Token,
      type: Platform.OS,
    });
  };

  const onSearch = (val) => {
    val.length === 0 && props.resetSearchServices();
    setInputValue(val);
  };

  // const getTitle = () => {
  //   if (
  //     serviceList &&
  //     serviceList.length &&
  //     serviceList[selectedCategory] &&
  //     serviceList[selectedCategory.id]
  //   ) {
  //     return serviceList[selectedCategory].name;
  //   }
  //   return '';
  // };

  const onSelectLocation = (details) => {
    const {width, height} = Dimensions.get('window');
    const location = details.geometry.location;
    const coordinates = {
      latitude: location.lat,
      longitude: location.lng,
    };
    // this.props.getCurrentLocation(coordinates);
    // this.props.setCurrentLocation(coordinates);
    // this.setState({search: false});

    // this.setState({isSearch: false});
    // this.mapRef.current.animateToRegion({
    //   latitude: location.lat,
    //   longitude: location.lng,
    //   latitudeDelta: 0.0922,
    //   longitudeDelta: (0.0922 * width) / height,
    // });
  };

  const {secondaryBg} = Global;
  const {titleSmall, textMedium} = Fonts;
  const {
    row,
    fill,
    center,
    alignItemsCenter,
    justifyContentBetween,
    justifyContentEvenly,
  } = Layout;
  const {
    smallBMargin,
    smallLMargin,
    mediumTMargin,
    smallVPadding,
    small2xVMargin,
    mediumTPadding,
    mediumBPadding,
    small2xTMargin,
    mediumHPadding,
    regularHPadding,
  } = Gutters;
  const {
    icon,
    loader,
    addMore,
    flexWrap,
    modalStyle,
    searchIcon,
    fieldWrapper,
  } = styles;
  console.log('user', user);
  console.log('serviceList', serviceList);
  console.log('employeeServices', employeeServices);
  return (
    <SafeAreaView style={fill}>
      {/* <StatusBar backgroundColor="#f5f5f5" barStyle="dark-content" /> */}
      <View style={[fill, {backgroundColor: Colors.Alabaster}]}>
        <View style={{paddingHorizontal: 17}}>
          {user?.first_name && (
            <Text
              text={`Hello, ${user.first_name}!`}
              bold
              style={[titleSmall, mediumTMargin, smallBMargin]}
            />
          )}
          <GooglePlacesAutocomplete
            placeholder="Set location"
            fetchDetails={true}
            enablePoweredByContainer={false}
            query={{
              key: 'AIzaSyCPPaiC5YHoesLsMeSC-E8kdSYzW7TxR9s',
              language: 'en',
            }}
            styles={{
              container: {flex: 0},
              textInput: {
                fontSize: 18,
              },
            }}
            onPress={(data, details = null) => onSelectLocation(details)}
            onFail={(error) => console.error('Places Error', error)}
          />

          {/* <Input
            value={inputValue}
            placeholder="Set location"
            icon="map-marker"
            iconColor="secondary"
            bordered
            onChangeText={(val) => onSearch(val)}
            onPress={() => getAddress(latitude, longitude)}
            style={{backgroundColor: 'white'}}
            iconStyle={searchIcon}
          /> */}
          {/* <Viewe
            style={{
              paddingVertical: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Button
              block
              text="Get Location"
              color="primary"
              style={{width: 100, height: 50}}
              onPress={checkLocationPermissions}
            />
            <View>
              <Text>{`Longitude:${String(getLocationCoords().longitude)
                .slice(0, 7)
                .toString()}`}</Text>
              <Text>{`Latitude:${String(getLocationCoords().latitude)
                .slice(0, 7)
                .toString()}`}</Text>
            </View>
          </Viewe> */}
        </View>
        <DataAvailability
          requesting={requesting}
          hasData={Boolean(employeeServices)}
          style={{marginTop: -60}}>
          <Content
            showsVerticalScrollIndicator={false}
            contentContainerStyle={smallVPadding}>
            <>
              <View style={{paddingHorizontal: 17}}>
                <EarningCard
                  heading="My Earning"
                  amount="$1550.10"
                  text="Last 1 Month"
                />
              </View>

              <View
                style={[
                  {
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginHorizontal: 20,
                    marginVertical: 20,
                  },
                ]}>
                <View
                  style={{
                    borderWidth: 1,
                    borderRadius: 8,
                    borderColor: '#fff',
                    backgroundColor: '#fff',
                    flex: 1,
                    marginRight: 20,
                    overflow: 'hidden',
                    justifyContent: 'center',
                    alignContent: 'center',
                  }}>
                  <Picker
                    placeholder="Select Value"
                    selectedValue={week}
                    mode="dropdown"
                    onValueChange={(itemValue, itemIndex) =>
                      setWeek(itemValue)
                    }>
                    <Picker.Item label="This Week" value="This Week" />
                    <Picker.Item label="Last Week" value="Last Week" />
                  </Picker>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Button
                    block
                    text="Payout"
                    color="primary"
                    style={{width: 137}}
                    //loading={requesting}
                    // onPress={() => getAddress(latitude, longitude)}
                  />
                </View>
              </View>
            </>
            <View
              style={[
                row,
                justifyContentBetween,
                small2xVMargin,
                {paddingHorizontal: 20},
              ]}>
              <Text text="Services" style={textMedium} PoppinsM />
              {employeeServices.length > 5 && !viewAll ? (
                <TouchableOpacity
                  style={[row, {justifyContent: 'center'}]}
                  onPress={() => viewAllServices()}>
                  <Text text="View All" color="quaternary" style={textMedium} />
                  <Icon type="FontAwesome" name="angle-right" style={icon} />
                </TouchableOpacity>
              ) : null}
            </View>

            <View style={[fill]}>
              <View
                style={[
                  row,
                  center,
                  smallBMargin,
                  flexWrap,
                  justifyContentEvenly,
                ]}>
                {employeeServices &&
                  employeeServices
                    .map((item, i) => (
                      <IconCard
                        // style={{ marginRight: '3%' }}
                        key={i}
                        source={{uri: item.service.image}}
                        text={item.service.name}
                        //onPress={() => onSelectService(item)}
                      />
                    ))
                    .slice(0, more ? more : all)}
                <IconCard
                  text="Add New"
                  style={addMore}
                  source={Images.addmore}
                  onPress={() => setModalVisible(true)}
                />
              </View>
            </View>
          </Content>
        </DataAvailability>
      </View>
      <RNModal
        modalVisible={modalVisible}
        animationIn="slideInUp"
        animationInTiming={500}
        animationOut="slideOutDown"
        animationOutTiming={800}
        style={modalStyle}
        onBackButtonPress={() => setModalVisible(false)}>
        <View style={fill} />
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
              <Text text="Add Service" category="h6" bold />
            </View>
          </TouchableWithoutFeedback>
          <View
            style={[
              justifyContentBetween,
              regularHPadding,
              smallVPadding,
              row,
              {
                borderBottomWidth: 0.4,
                borderBottomColor: Colors.silverChalice,
                height: 47,
              },
            ]}>
            <View style={[row, alignItemsCenter, fill]}>
              <Image source={Images.Categoryicon} />
              <Text
                text="Category"
                category="h6"
                onPress={() => setModalVisible(false)}
              />
            </View>
            <View style={[justifyContentBetween]}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  onPress={() => onPress(1)}
                  style={[
                    row,
                    fieldWrapper,
                    regularHPadding,
                    alignItemsCenter,
                    justifyContentBetween,
                  ]}>
                  <Text
                    text={selectedCategory?.name}
                    category="p1"
                    color="quaternary"
                  />
                  <Icon
                    type="MaterialIcons"
                    name="arrow-drop-down"
                    style={{color: '#FD1B1B'}}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              alignItems: 'center',
              backgroundColor: 'white',
              marginBottom: 0.4,
              borderBottomWidth: 0.4,
              borderBottomColor: Colors.silverChalice,
              height: 48,
            }}>
            <Text text="Price" category="h6" />
            <TextInput
              value={price}
              placeholder="Enter price"
              style={{backgroundColor: 'white', fontSize: 16}}
              onChangeText={(value) => setPrice(value)}
            />
          </View>
          <View
            style={[
              fill,
              mediumHPadding,
              mediumTPadding,
              mediumBPadding,
              {alignItems: 'flex-end', flexDirection: 'column-reverse'},
            ]}>
            <Button
              text="Add Service"
              color="primary"
              block
              loading={requesting}
              onPress={() => onAddService()}
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
        style={modalStyle}
        onBackButtonPress={() => setDropdownModal(false)}>
        <View style={fill} />
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
          }}>
          {checked === 1 &&
            serviceList.map((category) => (
              <View style={[regularHPadding]}>
                <TouchableOpacity
                  onPress={() => onSelectCategoryType(category)}>
                  <Text
                    text={category.name}
                    color="quaternary"
                    category="p1"
                    style={[smallVPadding]}
                  />
                </TouchableOpacity>
              </View>
            ))}
        </View>
      </RNModal>
    </SafeAreaView>
  );
};
const mapStateToProps = (state) => ({
  user: state.login.user,
  requesting: state.employeeHome.requesting,
  serviceList: state.employeeHome.allServices,
  unreadCount: state.unreadCount.unreadCount,
  pendingTask: state.Tasks.pendingTask,
  employeeLocation: state.employeeHome.location,
  approvedTask: state.Tasks.approvedTask,
  employeeServices: state.employeeHome.employeeServices,
});
const mapDispatchToProps = (dispatch) => ({
  getEmployeeHomeData: () => dispatch(getEmployeeHomeData()),
  addService: (data) => dispatch(addService(data)),
  getAllServices: () => dispatch(getAllServices()),
  sendLocation: (data) => dispatch(sendLocation(data)),
  registerMobileDevice: (data) => dispatch(registerMobileDevice(data)),
  getPendingBookingTaskDetail: () => dispatch(getPendingBookingTaskDetail()),
  getApprovedBookingTaskDetail: () => dispatch(getApprovedBookingTaskDetail()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
