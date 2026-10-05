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
} from 'react-native';

// components
import {
  Text,
  Input,
  Button,
  IdentityCard,
  LuckyHeader,
  DateTimePickerComponent,
} from 'src/components';

// theme
import {Layout, Images, Gutters, Colors, Fonts} from 'src/theme';

// styles
import styles from './styles';
import moment from 'moment';

const AvailableBookingSlots = (props) => {
  const {
    user,
    profile,
    navigation: {navigate},
    availableSlots,
  } = props;

  const {titleSmall, textMedium, textRegularX, textRegular} = Fonts;

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

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [slotsData, setSlotsData] = useState([]);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(1);

  useEffect(() => {
    if (availableSlots && availableSlots.length > 0) {
      setSlotsData(availableSlots);
    }
  }, [availableSlots]);

  console.log('availableSlots ', availableSlots);
  return (
    <SafeAreaView
      style={[fill, {backgroundColor: '#fff', justifyContent: 'flex-start'}]}>
      <Container style={mainBg}>
        <LuckyHeader
          left={
            <Icon
              type="FontAwesome5"
              name="arrow-left"
              style={{fontSize: 20}}
              onPress={() => props.navigation.goBack()}
            />
          }
          right={
            <Icon
              type="Ionicons"
              name="ios-notifications-outline"
              style={{fontSize: 22, color: '#000'}}
            />
          }
          title={
            <Text text="Booking Slots" color="#000" bold style={titleSmall} />
          }
        />
        <View style={line} />

        <ScrollView
          contentContainerStyle={{alignItems: 'center', marginTop: '5%'}}>
          {slotsData?.map((slot, index) => {
            return (
              <TouchableOpacity
                onPress={() => setSelectedSlotIndex(index)}
                style={
                  index === selectedSlotIndex
                    ? styles.selectedSlotStyle
                    : styles.unselectedSlotStyle
                }>
                <View
                  style={{
                    width: 35,
                    height: 35,
                    backgroundColor:
                      index === selectedSlotIndex ? '#30D5C8' : '#CED3D8',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 100,
                    marginHorizontal: '5%',
                  }}>
                  <Image
                    source={
                      index === selectedSlotIndex
                        ? require('../../../assets/icons/Tick.png')
                        : null
                    }
                  />
                </View>

                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text
                    style={[
                      textRegularX,
                      {marginVertical: 5},
                    ]}>{`${slot.start_time} - ${slot.end_time}`}</Text>
                  <Text
                    style={[
                      textRegular,
                      {color: '#A9A9A9', marginVertical: 5},
                    ]}>
                    {slot.date}
                  </Text>
                </View>

                <Text
                  style={[
                    textRegularX,
                    {marginHorizontal: '5%'},
                  ]}>{`$ ${slot.service_price}`}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <Button
          text="Create Booking"
          color="primary"
          block
          loading={props.requesting}
          onPress={() => {
            let bookingPayload = {
              booking_date: '2023-02-06',
              address: 'Jessica Aloin',
              note: 'Health precautionary measures',
              services: [
                {
                  booking_time_slot: 1,
                  service: 1,
                  employee: 37,
                  time_period: 'one-time',
                  additional_info: 'no',
                  is_recurring: false,
                  recurring: [],
                },
              ],
            };
          }}
          style={[
            button,
            {width: '90%', alignSelf: 'center', marginBottom: '5%'},
          ]}
        />
      </Container>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  user: state.login.user,
  profile: state.profile.profile,
  requesting: state.createBooking.requesting,
  availableSlots: state.createBooking.availableSlots,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AvailableBookingSlots);
