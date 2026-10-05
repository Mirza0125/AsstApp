import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Container, Content, Icon} from 'native-base';
// import {Picker} from '@react-native-picker/picker';
import {Platform, View, SafeAreaView, StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// components
import {
  Text,
  Input,
  Button,
  IconCard,
  EarningCard,
  DataAvailability,
  BookingRequest,
} from '../../../components';
//actions
import {
  getHomeData,
  searchServices,
  resetSearchServices,
  selectService,
} from './redux/actions';
import {registerMobileDevice} from 'src/screens/Common/Register/redux/actions';
// theme
import {Layout, Images, Gutters, Colors, Fonts} from 'src/theme';
// styles
import styles from './styles';
const HomeV2 = (props) => {
  const {
    user,
    services,
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
    addFCMToken();
  }, []);

  const onSearch = (val) => {
    val.length === 0 && props.resetSearchServices();
    setValue(val);
  };

  const onSelectService = (item) => {
    props.selectService(item);
  };

  const [value, setValue] = useState('');
  const [week, setWeek] = useState('');

  const {titleSmall, textMedium} = Fonts;
  const {row, fill, center, justifyContentBetween} = Layout;
  const {
    smallBMargin,
    mediumHPadding,
    small2xVMargin,
    small2xTMargin,
    mediumTMargin,
    smallVPadding,
    smallLMargin,
  } = Gutters;
  const {icon, loader, searchIcon, flexWrap} = styles;

  return (
    <SafeAreaView style={fill}>
      {/* <StatusBar backgroundColor="#f5f5f5" barStyle="dark-content" /> */}
      <Container style={[fill, {backgroundColor: '#f7f7f7'}]}>
        <View style={[mediumHPadding]}>
          {user.first_name ? (
            <Text
              text={`Hello, ${user.first_name}!`}
              bold
              style={[titleSmall, mediumTMargin, smallBMargin]}
            />
          ) : null}
          <Input
            value={value}
            placeholder="Set location"
            icon="map-marker"
            iconColor="secondary"
            bordered
            onChangeText={(val) => onSearch(val)}
            onPress={() => props.searchServices(value)}
            style={{backgroundColor: 'white'}}
            iconStyle={searchIcon}
          />
        </View>
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={smallVPadding}>
          <View
            style={[
              row,
              justifyContentBetween,
              small2xVMargin,
              mediumHPadding,
            ]}>
            <Text text="Services" style={textMedium} />
            <View style={[row, center]}>
              <Text text="View All" color="quaternary" style={textMedium} />
              <Icon type="FontAwesome" name="angle-right" style={icon} />
            </View>
          </View>
          <View style={[fill, center]}>
            <DataAvailability
              requesting={requesting}
              hasData={Boolean(services, searchedResult)}
              style={loader}>
              <View style={[row, smallBMargin, smallLMargin, flexWrap]}>
                {searchedResult
                  ? searchedResult.map((item, i) => (
                      <IconCard
                        key={i}
                        source={{uri: item.image}}
                        text={item.name}
                        onPress={() => onSelectService(item)}
                      />
                    ))
                  : services &&
                    services.map((item, i) => (
                      <IconCard
                        style={{marginRight: '3%'}}
                        key={i}
                        source={{uri: item.image}}
                        text={item.name}
                        onPress={() => onSelectService(item)}
                      />
                    ))}
              </View>
            </DataAvailability>
          </View>
          <View
            style={[
              row,
              justifyContentBetween,
              small2xVMargin,
              mediumHPadding,
            ]}>
            <Text text="Booking Requests" style={textMedium} />
            <View style={[row, center]}>
              <Text text="View All" color="quaternary" style={textMedium} />
              <Icon type="FontAwesome" name="angle-right" style={icon} />
            </View>
          </View>
          <View style={{padding: 20}}>
            <BookingRequest />
            <BookingRequest />
            <BookingRequest />
          </View>
        </Content>
      </Container>
    </SafeAreaView>
  );
};
const mapStateToProps = (state) => ({
  user: state.login.user,
  services: state.home.services,
  searchedResult: state.home.searchedResult,
  requesting: state.home.requesting,
  requestingSearch: state.home.requestingSearch,
});
const mapDispatchToProps = (dispatch) => ({
  getHomeData: () => dispatch(getHomeData()),
  searchServices: (query) => dispatch(searchServices(query)),
  selectService: (item) => dispatch(selectService(item)),
  resetSearchServices: () => dispatch(resetSearchServices()),
  registerMobileDevice: (data) => dispatch(registerMobileDevice(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(HomeV2);
