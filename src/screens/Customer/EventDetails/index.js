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
  Text,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Carousel from 'react-native-snap-carousel';

// components
import {Input, Button, IdentityCard, LuckyHeader} from 'src/components';

//actions
import {postBookingDetail} from './redux/actions';
import {postNotification} from '../../../redux/actions';
import {useNavigation, useRoute} from '@react-navigation/native';

import {addCalendarEvents} from '../../Common/CalendarScreen/redux/actions';

// theme
import {Layout, Images, Gutters, Colors, Fonts} from 'src/theme';
const {titleSmall, textMedium} = Fonts;

// styles
import styles from './styles';
import moment from 'moment';

const EventDetails = (props) => {
  const layout = useWindowDimensions();

  const {
    user,
    profile,
    navigation: {navigate, goBack},
    route: {
      params: {event},
    },
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

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <Image
          style={{width: '100%', height: '100%'}}
          source={item.image ? {uri: item.image} : item}
        />
      </View>
    );
  };

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
          title={
            <Text text="Event Details" color="red" bold style={titleSmall} />
          }
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

        <View style={{flex: 1}}>
          <Carousel
            data={
              event?.calendar_event?.event_images ||
              event?.event_images ||
              event.images
            }
            renderItem={renderItem}
            layout={'default'}
            itemWidth={500}
            sliderWidth={500}
            loop={false}
            autoplay={false}
            // autoplayDelay={1000}
            activeSlideAlignment={'start'}
            keyExtractor={(item) => item.id}
          />
        </View>

        <ScrollView>
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
              {event?.calendar_event?.event_name ||
                event?.event_name ||
                event.name}
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
              {event?.calendar_event?.event_date ||
                event?.event_date ||
                event.date}
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
            {event?.calendar_event?.entry_fee
              ? `$ ${event?.calendar_event?.entry_fee}`
              : event?.entry_fee
              ? `$ ${event?.entry_fee}`
              : event.pass_type}
          </Text>

          <Text
            style={[
              textMedium,
              {
                color: '#000',
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                fontSize: 13,
                marginLeft: '5%',
                lineHeight: 30,
                marginVertical: '3%',
              },
            ]}>
            {event?.calendar_event?.description ||
              event?.description ||
              event.disc}
          </Text>
        </ScrollView>
        <Button
          text={
            event?.calendar_event || event?.in_calendar
              ? 'Remove from Calendar'
              : 'Add to my calendar'
          }
          color="primary"
          block
          loading={props.addingToCalendar}
          onPress={() => props.addCalendarEvents({calendar_event: event?.id})}
          style={[
            button,
            {width: '90%', alignSelf: 'center', marginBottom: '3%'},
          ]}
        />
      </Container>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  user: state.login.user,
  profile: state.profile.profile,
  addingToCalendar: state.calendarEvents.addingToCalendar,
});

const mapDispatchToProps = (dispatch) => ({
  addCalendarEvents: (data) => dispatch(addCalendarEvents(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);
