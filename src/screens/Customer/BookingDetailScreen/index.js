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
} from 'react-native';

// components
import {Text, Input, Button, IdentityCard, LuckyHeader} from 'src/components';

//actions
import {postBookingDetail} from './redux/actions';
import {postNotification} from '../../../redux/actions';

// theme
import {Layout, Images, Gutters, Colors, Fonts} from 'src/theme';

// styles
import styles from './styles';
import moment from 'moment';

const BookingDetailScreen = (props) => {
  const {
    user,
    profile,
    navigation: {navigate},
    route: {
      params: {category},
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

  const submitForm = () => {
    const data = {
      user: user.id,
      employee: profile.id,
      comments: note,
      address: address,
      booking_date: date.dateString,
      booking_time: chosenTimeslotText,
      employee_category: category[0].id,
    };

    const notificationMessage = {
      sender: user.id,
      receiver: profile.user,
      title: 'Booking Request',
      message: 'New Booking Request',
    };
    console.log('Posted notificationMessage', notificationMessage);
    props.postBookingDetail(data);
    props.postNotification(notificationMessage);
  };

  const calculateBookedDates = () => {
    const filteredDates = profile.employee_availability
      ?.map((item, i) => {
        if (item.status === 'available') {
          return {[item.date]: {disabled: false, selected: false}};
        }
      })
      .filter((item) => item !== undefined);
    return filteredDates.reduce((r, c) => Object.assign(r, c), {});
  };

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const [date, setDate] = useState('');
  const [note, setNote] = useState('');
  const [address, setAddress] = useState('');
  const [chosenTimeslot, setChooseTimeslot] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [timeModalVisible, setTimeModalVisible] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [chosenTimeslotText, setChosenTimeslotText] = useState('');
  const [filteredDates, setFilteredDates] = useState(calculateBookedDates());

  const onDayPress = (day, i) => {
    setDate(day);
    console.log('date', day);
    const dates = {...filteredDates};

    for (let date in dates) {
      dates[date] = {selected: false, disabled: false};
    }

    dates[day.dateString] = {
      selected: !dates[day.dateString].selected,
      disabled: false,
    };
    const timeSlots = profile.employee_availability.filter(
      (slotAvailable) =>
        slotAvailable.date === day.dateString &&
        slotAvailable.status === 'available',
    );
    setAvailableSlots(timeSlots);
    console.log('timeSlots', timeSlots);
    setFilteredDates(dates);
  };

  const onChange = (index, text) => {
    if (text.status === 'booked') {
      alert('Already booked');
    } else {
      setChooseTimeslot(index);
      setChosenTimeslotText(text.start_time);
    }
  };

  console.log('Booking Detail category>>>', category);
  console.log('Booking Detail profile>>>', profile);
  return (
    <SafeAreaView style={fill}>
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
          title={
            <Text
              text="Booking Details"
              color="quaternary"
              bold
              style={titleSmall}
            />
          }
        />
        <View style={line} />
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[mediumHPadding]}>
          <View style={regularVMargin}>
            <IdentityCard
              withViewSection
              imageUrl={profile && profile.photo}
              name={profile && profile.name}
              text="View"
              rating={profile && profile.review}
              onPress={() => props.navigation.goBack()}
            />
          </View>
          <View style={[smallBMargin]}>
            <Input
              value={address}
              placeholder="Address"
              onChangeText={(value) => setAddress(value)}
              icon="map-marker"
              iconColor={address ? 'secondary' : 'primary'}
              color={address ? 'primary' : 'secondary'}
            />
          </View>

          <View style={smallBMargin}>
            <View style={inputField}>
              <View style={[row, center, justifyContentBetween, smallHPadding]}>
                <Text
                  text={date ? date.dateString : 'Date'}
                  color={date ? 'primary' : 'quinary'}
                  style={[textMedium]}
                />
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <Icon
                    type="FontAwesome"
                    name="calendar"
                    style={date.dateString ? hasInput : input}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={smallBMargin}>
            <View style={inputField}>
              <View style={[row, center, justifyContentBetween, smallHPadding]}>
                <Text
                  text={chosenTimeslotText ? chosenTimeslotText : 'Time'}
                  color={chosenTimeslotText ? 'primary' : 'quinary'}
                  style={[textMedium]}
                />
                <TouchableOpacity onPress={() => setTimeModalVisible(true)}>
                  <Icon
                    type="FontAwesome5"
                    name="clock"
                    style={chosenTimeslotText ? hasInput : input}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={tagInput}>
            <Text text="service" color="quinary" style={smallLMargin} />
            <View style={[row, center, justifyContentBetween, smallHPadding]}>
              <Text
                text={String(category && category[0].service.name)}
                style={[textMedium]}
              />
              <Icon type="FontAwesome" name="tag" style={tag} />
            </View>
          </View>
          <View>
            <Input
              multiline
              value={note}
              placeholder="Note"
              onChangeText={(value) => setNote(value)}
              customStyle={notes}
            />
          </View>
          <View style={regularTMargin}>
            <Button
              text="Add to bag"
              style={[fill, smallVMargin]}
              textStyle={button}
              redBorder
              block
            />
            <Button
              block
              text="Checkout"
              style={fill}
              color="primary"
              onPress={() => submitForm()}
            />
          </View>
        </Content>
      </Container>
      <Modal animationType="fade" visible={modalVisible}>
        <SafeAreaView
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-end',
            backgroundColor: '#F5F5F5',
          }}>
          <View
            style={{
              width: '100%',
              borderRadius: 15,
              backgroundColor: '#F5F5F5',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                marginBottom: 3,
                paddingVertical: 20,
                borderBottomColor: '#E2E8F2',
                borderBottomWidth: 1,
                backgroundColor: 'white',
              }}>
              <Icon
                type="FontAwesome5"
                name="times"
                onPress={() => setModalVisible(false)}
                style={{marginHorizontal: 20, fontSize: 20}}
              />

              <Text
                style={{
                  flex: 1,
                  color: '#FD1B1B',
                  textAlign: 'center',
                  fontSize: 26,
                  fontWeight: '400',
                  marginRight: 40,
                }}>
                Booking Details
              </Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{flex: 1}}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'white',
                    alignItems: 'center',
                  }}>
                  <Calendar
                    style={{
                      width: windowWidth - 10,
                    }}
                    markedDates={filteredDates}
                    markingType={'custom'}
                    disabledByDefault
                    // minDate={Date()}
                    // maxDate={profile.employee_available_time}
                    // current={new Date().toDateString()
                    theme={{
                      backgroundColor: '#ffffff',
                      calendarBackground: '#ffffff',
                      textSectionTitleColor: '#FD1B1B',
                      textSectionTitleDisabledColor: '#d9e1e8',
                      selectedDayBackgroundColor: '#FFCB3B',
                      selectedDayTextColor: '#ffffff',
                      todayTextColor: 'black',
                      dayTextColor: '#23232B',
                      textDisabledColor: '#d9e1e8',
                      arrowColor: '#FD1B1B',
                      disabledArrowColor: '#d9e1e8',
                      textDayFontWeight: '400',
                      textMonthFontWeight: 'bold',
                      textDayHeaderFontWeight: 'bold',
                      textDayFontSize: 16,
                      textMonthFontSize: 16,
                      textDayHeaderFontSize: 14,
                    }}
                    onDayPress={onDayPress}
                    onDayLongPress={onDayPress}
                    monthFormat={'MMMM yyyy'}
                    onMonthChange={(month) => {
                      setDate(month);
                    }}
                    hideArrows={false}
                    hideExtraDays={false}
                    disableMonthChange={false}
                    firstDay={1}
                    hideDayNames={false}
                    showWeekNumbers={false}
                    onPressArrowLeft={(subtractMonth) => subtractMonth()}
                    onPressArrowRight={(addMonth) => addMonth()}
                    disableArrowLeft={false}
                    disableArrowRight={false}
                    disableAllTouchEventsForDisabledDays={true}
                    enableSwipeMonths={true}
                  />
                </View>
                <View style={{flex: 1}}>
                  <View
                    style={{
                      flex: 1,
                      paddingHorizontal: 40,
                      paddingVertical: 15,
                      backgroundColor: '#F9FAFA',
                    }}>
                    <Text
                      style={{
                        color: '#FD1B1B',
                        fontSize: 20,
                        fontWeight: '600',
                      }}>
                      Slots Available
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      marginBottom: 0,
                      backgroundColor: 'white',
                      paddingVertical: 20,
                    }}>
                    {availableSlots?.map((time, i) => (
                      <TouchableOpacity
                        key={i}
                        onPress={() => onChange(i, time)}
                        style={{
                          minWidth: 80,
                          marginHorizontal: 5,
                          padding: 10,
                          borderRadius: 20,
                          borderWidth: 0.5,
                          borderColor:
                            i === chosenTimeslot ? '#FFCB3B' : '#FFF',
                          backgroundColor:
                            i === chosenTimeslot ? '#FFCB3B' : 'white',
                        }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            fontSize: 16,
                            fontWeight: '600',
                            color:
                              i === chosenTimeslot
                                ? 'white'
                                : time.status === 'booked'
                                ? '#DCE0E5'
                                : '#000',
                          }}>
                          {moment(time.start_time, ['hh:mm:ss']).format(
                            'hh:mm',
                          )}
                        </Text>
                      </TouchableOpacity>
                    ))}
                    {!availableSlots.length && (
                      <Text
                        text="Currently no slot available."
                        style={[textMedium, smallLMargin]}
                      />
                    )}
                  </View>
                  <View
                    style={{
                      backgroundColor: '#F5F5F5',
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                      marginTop: 10,
                    }}>
                    <Button
                      text="Confirm Date"
                      color="primary"
                      style={[button, buttonSize]}
                      block
                      onPress={() => setModalVisible(false)}
                    />
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </Modal>

      <Modal animationType="fade" visible={timeModalVisible}>
        <SafeAreaView
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-end',
            backgroundColor: '#F5F5F5',
          }}>
          <View
            style={{
              width: '100%',
              borderRadius: 15,
              backgroundColor: '#F5F5F5',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                marginBottom: 3,
                paddingVertical: 20,
                borderBottomColor: '#E2E8F2',
                borderBottomWidth: 1,
                backgroundColor: 'white',
              }}>
              <Icon
                type="FontAwesome5"
                name="times"
                onPress={() => setTimeModalVisible(false)}
                style={{marginHorizontal: 20, fontSize: 20}}
              />

              <Text
                style={{
                  flex: 1,
                  color: '#FD1B1B',
                  textAlign: 'center',
                  fontSize: 26,
                  fontWeight: '400',
                  marginRight: 40,
                }}>
                Booking Details
              </Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{flex: 1}}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'white',
                    alignItems: 'center',
                  }}>
                  {/* <Calendar
                    style={{
                      width: windowWidth - 10,
                    }}
                    markedDates={filteredDates}
                    markingType={'custom'}
                    disabledByDefault
                    // minDate={Date()}
                    // maxDate={profile.employee_available_time}
                    // current={new Date().toDateString()
                    theme={{
                      backgroundColor: '#ffffff',
                      calendarBackground: '#ffffff',
                      textSectionTitleColor: '#FD1B1B',
                      textSectionTitleDisabledColor: '#d9e1e8',
                      selectedDayBackgroundColor: '#FFCB3B',
                      selectedDayTextColor: '#ffffff',
                      todayTextColor: 'black',
                      dayTextColor: '#23232B',
                      textDisabledColor: '#d9e1e8',
                      arrowColor: '#FD1B1B',
                      disabledArrowColor: '#d9e1e8',
                      textDayFontWeight: '400',
                      textMonthFontWeight: 'bold',
                      textDayHeaderFontWeight: 'bold',
                      textDayFontSize: 16,
                      textMonthFontSize: 16,
                      textDayHeaderFontSize: 14,
                    }}
                    onDayPress={onDayPress}
                    onDayLongPress={onDayPress}
                    monthFormat={'MMMM yyyy'}
                    onMonthChange={(month) => {
                      setDate(month);
                    }}
                    hideArrows={false}
                    hideExtraDays={false}
                    disableMonthChange={false}
                    firstDay={1}
                    hideDayNames={false}
                    showWeekNumbers={false}
                    onPressArrowLeft={(subtractMonth) => subtractMonth()}
                    onPressArrowRight={(addMonth) => addMonth()}
                    disableArrowLeft={false}
                    disableArrowRight={false}
                    disableAllTouchEventsForDisabledDays={true}
                    enableSwipeMonths={true}
                  /> */}
                </View>
                <View style={{flex: 1}}>
                  <View
                    style={{
                      flex: 1,
                      paddingHorizontal: 40,
                      paddingVertical: 15,
                      backgroundColor: '#F9FAFA',
                    }}>
                    <Text
                      style={{
                        color: '#FD1B1B',
                        fontSize: 20,
                        fontWeight: '600',
                      }}>
                      Slots Available
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      marginBottom: 0,
                      backgroundColor: 'white',
                      paddingVertical: 20,
                    }}>
                    {availableSlots?.map((time, i) => (
                      <TouchableOpacity
                        key={i}
                        onPress={() => onChange(i, time)}
                        style={{
                          minWidth: 80,
                          marginHorizontal: 5,
                          padding: 10,
                          borderRadius: 20,
                          borderWidth: 0.5,
                          borderColor:
                            i === chosenTimeslot ? '#FFCB3B' : '#FFF',
                          backgroundColor:
                            i === chosenTimeslot ? '#FFCB3B' : 'white',
                        }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            fontSize: 16,
                            fontWeight: '600',
                            color:
                              i === chosenTimeslot
                                ? 'white'
                                : time.status === 'booked'
                                ? '#DCE0E5'
                                : '#000',
                          }}>
                          {moment(time.start_time, ['hh:mm:ss']).format(
                            'hh:mm',
                          )}
                        </Text>
                      </TouchableOpacity>
                    ))}
                    {!availableSlots.length && (
                      <Text
                        text="Currently no slot available."
                        style={[textMedium, smallLMargin]}
                      />
                    )}
                  </View>
                  <View
                    style={{
                      backgroundColor: '#F5F5F5',
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                      marginTop: 10,
                    }}>
                    <Button
                      text="Confirm Date"
                      color="primary"
                      style={[button, buttonSize]}
                      block
                      onPress={() => setTimeModalVisible(false)}
                    />
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </Modal>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookingDetailScreen);
