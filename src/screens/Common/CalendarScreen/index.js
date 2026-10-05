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

import {getOnBoardData} from '../OnBoard/redux/actions';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

import AppIntroSlider from 'react-native-app-intro-slider';
import Carousel, {Pagination} from 'react-native-snap-carousel';

import {getCalendarEvents} from './redux/actions';

// theme
import {Layout, Images, Gutters, Colors, Fonts} from 'src/theme';
// styles
import styles from './styles';
import {Button, LuckyHeader} from '../../../components';

const {width: screenWidth} = Dimensions.get('window');

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CalendarScreen = (props) => {
  const {user, services, popOver, requesting, searchedResult} = props;
  const [events, setEvents] = useState([]);

  useEffect(() => {
    props.getCalendarEvents('2023-02-28');
  }, []);

  useEffect(() => {
    setEvents([]);
    let bookings = props.calendarEvents?.bookings;
    let events = props.calendarEvents?.events;

    bookings = bookings?.map((booking) => ({
      ...booking,
      type: 'booking',
    }));

    events = events?.map((event) => ({
      ...event,
      type: 'event',
    }));

    if (events?.length) {
      setEvents([...events]);
    }
    if (bookings?.length) {
      setEvents([...bookings]);
    }
  }, [props.calendarEvents]);

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

  const onDayPress = (day, i) => {
    props.getCalendarEvents(day.dateString);
  };

  const bookings = [
    {
      id: 1,
      name: 'Saad A',
      service: 'Multiple',
      date: 'FEB 24, 23',
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
      date: 'FEB 24, 23',
      time: '3:00 PM',
      service_duration: '2 Hours',
      address: 'US _ JESSICA',
      note: 'Health precautionary measures',
      status: 'completed',
    },
    {
      id: 3,
      name: 'John',
      service: 'Multiple',
      date: 'FEB 24, 23',
      time: '3:00 PM',
      service_duration: '2 Hours',
      address: 'US _ JESSICA',
      note: 'Health precautionary measures',
      status: 'completed',
    },
  ];

  return (
    <SafeAreaView style={[fill, {backgroundColor: '#fff'}]}>
      <Container style={[fill, {backgroundColor: '#fff'}]}>
        <LuckyHeader
          left={
            <Image
              style={{width: 14, height: 12, resizeMode: 'contain'}}
              source={require('../../../assets/images/new/arrow-left.png')}
            />
          }
          onPress={() => props.navigation.goBack()}
          title={<Text text="Calendar" color="#000" bold style={titleSmall} />}
          right={
            <Icon
              type="Ionicons"
              name="ios-notifications-outline"
              style={{fontSize: 22, color: '#000'}}
            />
          }
          titleStyle={{alignItems: 'flex-start'}}
        />

        <Calendar
          style={{
            width: windowWidth - 40,
            alignSelf: 'center',
          }}
          markedDates={{}}
          markingType={'custom'}
          disabledByDefault
          // minDate={Date()}
          // maxDate={profile.employee_available_time}
          // current={new Date().toDateString()
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#000',
            textSectionTitleDisabledColor: '#d9e1e8',
            selectedDayBackgroundColor: '#FFCB3B',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#30D5C8',
            dayTextColor: '#000',
            textDisabledColor: '#000',
            arrowColor: '#FD1B1B',
            disabledArrowColor: '#d9e1e8',
            textDayFontWeight: '400',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: 'bold',
            textDayFontSize: 14,
            textMonthFontSize: 15,
            textDayHeaderFontSize: 12,
          }}
          onDayPress={onDayPress}
          onDayLongPress={onDayPress}
          monthFormat={'MMMM yyyy'}
          onMonthChange={(month) => {}}
          hideArrows={true}
          hideExtraDays={false}
          disableMonthChange={false}
          firstDay={1}
          hideDayNames={false}
          showWeekNumbers={false}
          // onPressArrowLeft={(subtractMonth) => {}}
          // onPressArrowRight={(addMonth) => {}}
          disableArrowLeft={false}
          disableArrowRight={false}
          disableAllTouchEventsForDisabledDays={false}
          enableSwipeMonths={true}
        />

        <Text style={{margin: '5%', fontSize: 15}}>
          {`You have ${events.length} calendar events`}
        </Text>
        <ScrollView>
          {events?.length > 0 &&
            events.map((item) => {
              return item.type === 'booking' ? (
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('BookingDetails', {
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
                        Add Time
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
              ) : item.type === 'event' ? (
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('EventDetails', {
                      event: item,
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
                      marginHorizontal: '4%',
                      flexDirection: 'row',
                      marginTop: '10%',
                      marginLeft: '5%',
                    }}>
                    <Text
                      style={[
                        textMedium,
                        {
                          color: '#000',
                          borderBottomColor: 'black',
                          borderBottomWidth: 1,
                          fontSize: 15,
                          flex: 1,
                        },
                      ]}>
                      {item.calendar_event.event_name}
                    </Text>
                    <Text
                      style={[
                        titleSmall,
                        {
                          color: '#30D5C8',
                          borderBottomColor: 'black',
                          borderBottomWidth: 1,
                          fontSize: 13,
                        },
                      ]}>
                      {item.calendar_event.event_date}
                    </Text>
                  </View>
                  <Text
                    style={[
                      textMedium,
                      {
                        color: '#000',
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                        fontSize: 13,
                        marginLeft: '5%',
                      },
                    ]}>
                    {`$ ${item.calendar_event.entry_fee}`}
                  </Text>

                  <Text
                    numberOfLines={2}
                    style={[
                      textMedium,
                      {
                        color: '#000',
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                        fontSize: 13,
                        marginLeft: '5%',
                      },
                    ]}>
                    {item.calendar_event.description}
                  </Text>

                  <View
                    style={{
                      backgroundColor: '#30D5C8',
                      borderRadius: 20,
                      width: '20%',
                      alignItems: 'center',
                      margin: '5%',
                    }}>
                    <Text
                      style={[
                        textMedium,
                        {
                          color: '#fff',
                          borderBottomColor: 'black',
                          borderBottomWidth: 1,
                          fontSize: 13,
                          margin: '2%',
                        },
                      ]}>
                      {item.calendar_event.event_type}
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : null;
            })}
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
};
const mapStateToProps = (state) => ({
  user: state.login.user,
  calendarEvents: state.calendarEvents.calendarEvents,
});
const mapDispatchToProps = (dispatch) => ({
  getCalendarEvents: (data) => dispatch(getCalendarEvents(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CalendarScreen);
