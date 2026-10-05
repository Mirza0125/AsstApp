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

import {getEmployessByServiceId} from './redux/actions';

// theme
import {Layout, Images, Gutters, Colors, Fonts} from 'src/theme';

// styles
import styles from './styles';
import moment from 'moment';

const CreateBooking = (props) => {
  const {
    user,
    profile,
    navigation: {navigate},
    route: {
      params: {service},
    },
  } = props;

  const {titleSmall, textMedium} = Fonts;
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

  const [jsonData, setJsonData] = useState({service: service.name});

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());

  const handleInputChange = (text, field) => {
    setJsonData({
      ...jsonData,
      [field]: text,
    });
  };

  const onDateChange = (date) => {
    handleInputChange(date.toDateString(), 'booking_date');
    setSelectedDate(date);
  };

  const onTimeChange = (time) => {
    setSelectedTime(new Date(time));
  };

  const onCreateBooking = () => {
    console.log('booking object ', jsonData);

    props.getEmployessByServiceId(1);
    navigate('AvailableBookingSlots');
  };

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
            <Text text="Create Booking" color="#000" bold style={titleSmall} />
          }
        />
        <View style={line} />

        <ScrollView
          contentContainerStyle={{alignItems: 'center', marginTop: '5%'}}>
          <View style={{flex: 1, width: '100%', alignItems: 'center'}}>
            <View
              style={[smallBMargin, {width: '90%', justifyContent: 'center'}]}>
              <Input
                placeholder="Service"
                value={jsonData.service}
                showHint
                // onChangeText={(text) => handleInputChange(text, 'service')}
              />
            </View>

            {/* <View
              style={[smallBMargin, {width: '90%', justifyContent: 'center'}]}>
              <Input
                placeholder="Service duration"
                showHint
                value={jsonData.duration}
                onChangeText={(text) => handleInputChange(text, 'duration')}
              />
            </View> */}

            {/* <View
              style={[smallBMargin, {width: '90%', justifyContent: 'center'}]}>
              <Input
                placeholder="Address"
                showHint
                value={jsonData.address}
                onChangeText={(text) => handleInputChange(text, 'address')}
              />
            </View> */}

            <View
              style={[smallBMargin, {width: '90%', justifyContent: 'center'}]}>
              <DateTimePickerComponent
                mode="date"
                value={selectedDate}
                showHint={true}
                placeholder={'Date'}
                onChange={onDateChange}
              />
            </View>

            {/* <View
              style={[smallBMargin, {width: '90%', justifyContent: 'center'}]}>
              <DateTimePickerComponent
                mode="time"
                value={selectedTime}
                showHint={true}
                placeholder={'Time'}
                onChange={onTimeChange}
              />
            </View> */}
            {/*
            <View
              style={[smallBMargin, {width: '90%', justifyContent: 'center'}]}>
              <Input
                placeholder="Date"
                value={jsonData.date}
                showHint
                onChangeText={(text) => handleInputChange(text, 'date')}
              />
            </View>

            <View
              style={[smallBMargin, {width: '90%', justifyContent: 'center'}]}>
              <Input
                placeholder="Time"
                showHint
                value={jsonData.time}
                onChangeText={(text) => handleInputChange(text, 'time')}
              />
            </View> */}

            <View
              style={[smallBMargin, {width: '90%', justifyContent: 'center'}]}>
              <Input
                placeholder="Note"
                showHint
                value={jsonData.note}
                onChangeText={(text) => handleInputChange(text, 'note')}
              />
            </View>
          </View>
        </ScrollView>

        <Button
          text="Create Booking"
          color="primary"
          block
          loading={props.requesting}
          onPress={() => onCreateBooking()}
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
});

const mapDispatchToProps = (dispatch) => ({
  getEmployessByServiceId: (serviceId) =>
    dispatch(getEmployessByServiceId(serviceId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateBooking);
