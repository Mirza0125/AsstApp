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
import {getEvents} from './redux/actions';

// theme
import {Layout, Images, Gutters, Colors, Fonts} from 'src/theme';
const {titleSmall, textMedium} = Fonts;

// styles
import styles from './styles';
import moment from 'moment';

const thirdBookings = [
  {
    id: 1,
    name: 'Dogs Health',
    date: 'DEC 16, 21',
    pass_type: 'free entry',
    disc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consectetur eget purus eu hendrerit. Pellentesque eget rhoncus nulla, id ornare lorem. Aenean sit amet purus erat. Nulla facilisi. Donec ut nunc consequat, lacinia massa eu, fermentum elit. Nulla rutrum orci risus, vitae pulvinar sapien sollicitudin non.',
    event_type: 'dogs',
    images: [
      require('../../../assets/event.png'),
      require('../../../assets/event.png'),
    ],
  },
  {
    id: 2,
    name: 'Service center',
    date: 'NOV 16, 21',
    pass_type: 'free entry',
    disc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consectetur eget purus eu hendrerit. Pellentesque eget rhoncus nulla, id ornare lorem. Aenean sit amet purus erat. Nulla facilisi. Donec ut nunc consequat, lacinia massa eu, fermentum elit. Nulla rutrum orci risus, vitae pulvinar sapien sollicitudin non.',
    event_type: 'service',
    images: [
      require('../../../assets/event.png'),
      require('../../../assets/event.png'),
    ],
  },
];

const EventsList = (props) => {
  const layout = useWindowDimensions();

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

  useEffect(() => {
    props.getEvents();
  }, []);

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
            <Text text="Events near you" color="#000" bold style={titleSmall} />
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

        <View style={{flex: 1, backgroundColor: '#fff'}}>
          {props.events?.length > 0 &&
            props.events.map((item) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigate('EventDetails', {
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
                      {item.event_name || item.name}
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
                      {item.event_date || item.date}
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
                    {item.entry_fee || item.pass_type}
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
                    {item.description || item.disc}
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
                      {item.event_type}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
        </View>
      </Container>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  user: state.login.user,
  profile: state.profile.profile,
  events: state.events.events,
});

const mapDispatchToProps = (dispatch) => ({
  getEvents: (data) => dispatch(getEvents(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);
