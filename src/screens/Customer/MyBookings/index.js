import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Calendar} from 'react-native-calendars';
import {Container, Content, Icon} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import {
  View,
  SafeAreaView,
  Modal,
  Dimensions,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

// components
import {Text, Input, Button, IdentityCard, LuckyHeader} from 'src/components';

//actions
import {postBookingDetail} from './redux/actions';
import {postNotification} from '../../../redux/actions';
import {useNavigation, useRoute} from '@react-navigation/native';

// theme
import {Layout, Images, Gutters, Colors, Fonts} from 'src/theme';
const {titleSmall, textMedium} = Fonts;

// styles
import styles from './styles';
import moment from 'moment';

const firstBookings = [
  {
    id: 1,
    name: 'John Glenn',
    service: 'Dog Walking',
    date: 'Mar 16',
    time: '3:00 PM',
    service_duration: '2 Hours',
    address: 'US _ JESSICA',
    note: 'Health precautionary measures',
    status: 'ongoing',
  },
  {
    id: 2,
    name: 'Seun',
    service: 'Multiple',
    date: 'Apri 16',
    time: '3:00 PM',
    service_duration: '3 Hours',
    address: 'Califor A23',
    note: 'n/a',
    status: 'ongoing',
  },
];

const secondBookings = [
  {
    id: 1,
    name: 'Tamoor A',
    service: 'Multiple',
    date: 'DEC 16, 21',
    time: '3:00 PM',
    service_duration: '2 Hours',
    address: 'US _ JESSICA',
    note: 'Health precautionary measures',
    status: 'upcoming',
  },
];

const thirdBookings = [
  {
    id: 1,
    name: 'Saad A',
    service: 'Multiple',
    date: 'DEC 16, 21',
    time: '3:00 PM',
    service_duration: '2 Hours',
    address: 'US _ JESSICA',
    note: 'Health precautionary measures',
    status: 'completed',
  },
  {
    id: 2,
    name: 'Seun',
    service: 'Multiple',
    date: 'NOV 16, 21',
    time: '3:00 PM',
    service_duration: '2 Hours',
    address: 'US _ JESSICA',
    note: 'Health precautionary measures',
    status: 'completed',
  },
];

const FirstRoute = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {firstBookings.map((item) => {
        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('BookingDetails', {
                bookingData: item,
              })
            }
            style={{
              backgroundColor: '#FFFFFF',
              shadowColor: '#000000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.05,
              shadowRadius: 10,
              borderRadius: 5,
              width: '90%',
              alignSelf: 'center',
              justifyContent: 'center',
              marginVertical: '3%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: '10%',
                marginLeft: '5%',
              }}>
              <View style={{marginHorizontal: '4%'}}>
                <Text
                  style={[
                    textMedium,
                    {
                      color: '#A9A9A9',
                      fontWeight: 'bold',
                      borderBottomColor: 'black',
                      borderBottomWidth: 1,
                      fontSize: 20,
                    },
                  ]}>
                  {item.date}
                </Text>
                <Text
                  style={[
                    titleSmall,
                    {
                      color: '#A9A9A9',
                      borderBottomColor: 'black',
                      borderBottomWidth: 1,
                      fontSize: 13,
                    },
                  ]}>
                  {item.time}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: '#CED3D8',
                  borderRadius: 5,
                  marginHorizontal: '5%',
                }}>
                <Image style={{width: 50, height: 50}} />
              </View>
              <View>
                <Text
                  style={[
                    textMedium,
                    {
                      color: '#000',
                    },
                  ]}>
                  {item.name}
                </Text>
                <Text
                  style={[
                    textMedium,
                    {
                      color: '#000',
                      fontSize: 13,
                    },
                  ]}>
                  {item.service}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: '5%',
                borderTopColor: '#F1F1F1',
                borderTopWidth: 1,
              }}>
              <TouchableOpacity>
                <Text
                  style={[
                    textMedium,
                    {
                      color: '#30D5C8',
                      marginVertical: 10,
                      fontWeight: 'bold',
                      borderBottomColor: 'black',
                      borderBottomWidth: 1,
                    },
                  ]}>
                  Edit Booking
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={[
                    textMedium,
                    {
                      color: '#30D5C8',
                      marginVertical: 10,
                      fontWeight: 'bold',
                      borderBottomColor: 'black',
                      borderBottomWidth: 1,
                    },
                  ]}>
                  Message
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const SecondRoute = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {secondBookings.map((item) => {
        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('BookingDetails', {
                bookingData: item,
              })
            }
            style={{
              backgroundColor: '#FFFFFF',
              shadowColor: '#000000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.05,
              shadowRadius: 10,
              borderRadius: 5,
              width: '90%',
              alignSelf: 'center',
              justifyContent: 'center',
              marginVertical: '3%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: '10%',
                marginLeft: '5%',
              }}>
              <View style={{marginHorizontal: '4%'}}>
                <Text
                  style={[
                    textMedium,
                    {
                      color: '#A9A9A9',
                      fontWeight: 'bold',
                      borderBottomColor: 'black',
                      borderBottomWidth: 1,
                      fontSize: 20,
                    },
                  ]}>
                  {item.date}
                </Text>
                <Text
                  style={[
                    titleSmall,
                    {
                      color: '#A9A9A9',
                      borderBottomColor: 'black',
                      borderBottomWidth: 1,
                      fontSize: 13,
                    },
                  ]}>
                  {item.time}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: '#CED3D8',
                  borderRadius: 5,
                  marginHorizontal: '5%',
                }}>
                <Image style={{width: 50, height: 50}} />
              </View>
              <View>
                <Text
                  style={[
                    textMedium,
                    {
                      color: '#000',
                    },
                  ]}>
                  {item.name}
                </Text>
                <Text
                  style={[
                    textMedium,
                    {
                      color: '#000',
                      fontSize: 13,
                    },
                  ]}>
                  {item.service}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: '5%',
                borderTopColor: '#F1F1F1',
                borderTopWidth: 1,
              }}>
              <TouchableOpacity>
                <Text
                  style={[
                    textMedium,
                    {
                      color: '#30D5C8',
                      marginVertical: 10,
                      fontWeight: 'bold',
                      borderBottomColor: 'black',
                      borderBottomWidth: 1,
                    },
                  ]}>
                  Edit Booking
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={[
                    textMedium,
                    {
                      color: '#30D5C8',
                      marginVertical: 10,
                      fontWeight: 'bold',
                      borderBottomColor: 'black',
                      borderBottomWidth: 1,
                    },
                  ]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const ThirdRoute = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {thirdBookings.map((item) => {
        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('BookingDetails', {
                bookingData: item,
              })
            }
            style={{
              backgroundColor: '#FFFFFF',
              shadowColor: '#000000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.05,
              shadowRadius: 10,
              borderRadius: 5,
              width: '90%',
              alignSelf: 'center',
              justifyContent: 'center',
              marginVertical: '3%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: '10%',
                marginLeft: '5%',
              }}>
              <View style={{marginHorizontal: '4%'}}>
                <Text
                  style={[
                    textMedium,
                    {
                      color: '#A9A9A9',
                      fontWeight: 'bold',
                      borderBottomColor: 'black',
                      borderBottomWidth: 1,
                      fontSize: 20,
                    },
                  ]}>
                  {item.date}
                </Text>
                <Text
                  style={[
                    titleSmall,
                    {
                      color: '#A9A9A9',
                      borderBottomColor: 'black',
                      borderBottomWidth: 1,
                      fontSize: 13,
                    },
                  ]}>
                  {item.time}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: '#CED3D8',
                  borderRadius: 5,
                  marginHorizontal: '5%',
                }}>
                <Image style={{width: 50, height: 50}} />
              </View>
              <View>
                <Text
                  style={[
                    textMedium,
                    {
                      color: '#000',
                    },
                  ]}>
                  {item.name}
                </Text>
                <Text
                  style={[
                    textMedium,
                    {
                      color: '#000',
                      fontSize: 13,
                    },
                  ]}>
                  {item.service}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: '5%',
                borderTopColor: '#F1F1F1',
                borderTopWidth: 1,
              }}>
              <TouchableOpacity>
                <Text
                  style={[
                    textMedium,
                    {
                      color: '#30D5C8',
                      marginVertical: 10,
                      fontWeight: 'bold',
                      borderBottomColor: 'black',
                      borderBottomWidth: 1,
                    },
                  ]}>
                  Feedback
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={[
                    textMedium,
                    {
                      color: '#30D5C8',
                      marginVertical: 10,
                      fontWeight: 'bold',
                      borderBottomColor: 'black',
                      borderBottomWidth: 1,
                    },
                  ]}>
                  Rebook service
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
});

const MyBookings = (props) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Ongoing'},
    {key: 'second', title: 'Upcoming'},
    {key: 'third', title: 'Completed'},
  ]);

  const {
    user,
    profile,
    navigation: {navigate, goBack},
  } = props;

  const {row, fill, center, justifyContentBetween} = Layout;
  const {
    mediumHPadding,
    regularVMargin,
    smallHPadding,
    regularTMargin,
    smallLMargin,
    smallBMargin,
    smallVMargin,
  } = Gutters;
  const {
    tag,
    line,
    input,
    notes,
    button,
    mainBg,
    tagInput,
    hasInput,
    buttonSize,
    inputField,
  } = styles;

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: '#30D5C8'}}
      style={{backgroundColor: '#fff', marginTop: 10}}
      renderLabel={({route, focused}) => (
        <Text
          style={[
            {color: focused ? 'black' : '#A9A9A9', fontWeight: 'bold'},
            textMedium,
          ]}>
          {route.title}
        </Text>
      )}
    />
  );

  return (
    <SafeAreaView style={[fill, {backgroundColor: '#fff'}]}>
      <Container style={mainBg}>
        <LuckyHeader
          left={
            <Image
              style={{width: 14, height: 12, resizeMode: 'contain'}}
              source={require('../../../assets/images/new/arrow-left.png')}
            />
          }
          onPress={() => goBack()}
          title={<Text text="Bookings" color="#000" bold style={titleSmall} />}
          right={
            <Icon
              type="Ionicons"
              name="ios-notifications-outline"
              style={{fontSize: 22, color: '#000'}}
            />
          }
          // right={<Image style={{ width: 14, height: 12, resizeMode: "contain" }} />}

          titleStyle={{alignItems: 'flex-start'}}
        />
        <View style={line} />

        <TabView
          renderTabBar={renderTabBar}
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
        />
      </Container>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  user: state.login.user,
  profile: state.profile.profile,
});

const mapDispatchToProps = (dispatch) => ({
  postBookingDetail: (data) => dispatch(postBookingDetail(data)),
  postNotification: (data) => dispatch(postNotification(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyBookings);
