import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Calendar} from 'react-native-calendars';
import {Container, Content, Icon, Picker} from 'native-base';
import {
  View,
  SafeAreaView,
  Modal,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

// components
import {Text, Input, Button, IdentityCard, LuckyHeader} from 'src/components';
import useForm from '../../../hooks/useForm';
import validator from '../../../utils/validation';

//actions
import {postBookingForm, getQuestion, addToBag} from './redux/actions';
import {postNotification} from '../../../redux/actions';

// theme
import {Layout, Images, Gutters, Colors, Fonts} from 'src/theme';

// styles
import styles from './styles';
import moment from 'moment';
import {IconCard} from '../../../components';

const BookingForm = (props) => {
  const {
    user,
    profile,
    questions,
    navigation: {navigate},
    route: {
      params: {category},
    },
  } = props;

  const {titleSmall, textMedium} = Fonts;
  const {
    row,
    fill,
    center,
    justifyContentBetween,
    alignItemsCenter,
    justifyContentCenter,
  } = Layout;
  const {
    mediumHPadding,
    regularVMargin,
    smallHPadding,
    regularTMargin,
    smallLPadding,
    smallLMargin,
    smallBMargin,
    mediumBMargin,
    smallVMargin,
  } = Gutters;
  const {
    tag,
    line,
    input,
    notes,
    button,
    mainBg,
    imageIcon,
    tagInput,
    hasInput,
    buttonSize,
    inputField,
  } = styles;

  const stateSchema = {
    address: {
      value: '',
      error: '',
    },
    daily_hour_required: {
      value: '',
      error: '',
    },

    note: {
      value: '',
      error: '',
    },
  };
  const validationStateSchema = {
    note: {
      required: true,
    },
    address: {
      required: true,
    },
    daily_hour_required: {
      required: true,
    },
  };

  const {state, handleOnChange, disable} = useForm(
    stateSchema,
    validationStateSchema,
  );

  const addValue = (type, value) => {
    type === 1 && handleOnChange('note', value);
    type === 2 && handleOnChange('address', value);
    type === 3 && handleOnChange('daily_hour_required', value);
  };

  useEffect(() => {
    props.getQuestion(category[0].category);
  }, []);

  const submitForm = () => {
    const data = {
      user: user.id,
      employee: profile.id,
      comments: state.note.value,
      address: state.address.value,
      booking_date: date?.dateString,
      booking_time: chosenTimeslotText,
      add_to_bag: 0,
      employee_category: category[0].id,
      daily_hour_required: state.daily_hour_required.value,
      time_period: time_period,
    };
    console.log('====>data222', data);

    const notificationMessage = {
      sender: user.id,
      receiver: profile.user,
      employee_category: category[0].id,
      title: 'Booking Request',
      message: 'New Booking Request',
    };
    console.log('notificationMessage', notificationMessage);
    props.postBookingForm([data]);
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
  const [pressedItem, setPressedItem] = useState(0);
  // const [note, setNote] = useState('');
  const [address, setAddress] = useState('');
  const [chosenTimeslot, setChooseTimeslot] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [timeModalVisible, setTimeModalVisible] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [chosenTimeslotText, setChosenTimeslotText] = useState('');
  const [chosenTimeslotTextEnd, setChosenTimeslotTextEnd] = useState('');
  const [filteredDates, setFilteredDates] = useState(calculateBookedDates());
  const [answers, setAnswers] = useState({});
  const [daily_hour_required, setDaily_hour_required] = useState(false);
  const [time_period, setTime_period] = useState('');

  const questionSubmission = (index, value) => {
    let clonedAnswers = {...answers};
    clonedAnswers[index] = value;
    setAnswers(clonedAnswers);
  };

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
      setChosenTimeslotTextEnd(text.end_time);
    }
  };

  // console.log('question>>>', questions);
  // console.log('answers>>', answers);
  console.log('category>>', category);
  console.log('availableSlots>>', availableSlots);
  console.log('chosenTimeslotText', chosenTimeslotText);

  const onAddToBag = () => {
    const data = {
      user: user.id,
      employee: profile.id,
      comments: state.note.value,
      address: state.address.value,
      booking_date: date?.dateString,
      booking_time: chosenTimeslotText,
      employee_category: category[0].id,
      daily_hour_required: state.daily_hour_required.value,
      time_period: time_period,
    };
    console.log('====>', data);
    props.addToBag(data);
  };

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
              text="Booking Form"
              color="quaternary"
              bold
              style={titleSmall}
            />
          }
        />
        <View style={line} />

        <ScrollView
          // scrollEnabled={}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[mediumHPadding]}>
          <View style={[row, regularVMargin, alignItemsCenter]}>
            <IconCard source={{uri: category[0].service.image}} />
            <View style={{marginLeft: 15}}>
              <Text
                text={category[0].service.name}
                style={{fontSize: 24}}
                bold
              />
            </View>
          </View>
          <View
            style={[
              row,
              tagInput,
              smallBMargin,
              alignItemsCenter,
              justifyContentBetween,
            ]}>
            <View style={[smallHPadding]}>
              <Text text="Service" color="quinary" />
              <Text text={category[0].service.name} style={[textMedium]} />
            </View>
            <Icon type="FontAwesome" name="tag" style={tag} />
          </View>
          <View style={[smallBMargin]}>
            <Input
              value={state.address.value}
              placeholder="Address"
              onChangeText={(value) => addValue(2, value)}
              icon="map-marker"
              style={{paddingLeft: 20}}
              // iconColor={address ? 'secondary' : 'primary'}
              // color={address ? 'primary' : 'secondary'}
            />
            {state.address.error ? (
              <Text style={{color: 'red'}} text={state.address.error} />
            ) : null}
          </View>

          <View style={smallBMargin}>
            <View style={[inputField, smallLPadding]}>
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
                  text={
                    chosenTimeslotText
                      ? `${chosenTimeslotText} - ${chosenTimeslotTextEnd}`
                      : 'Time'
                  }
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
          {questions &&
            questions?.map((item, i) => {
              if (item.type === 'dropdown') {
                return (
                  <>
                    <TouchableOpacity
                      style={[
                        tagInput,
                        row,
                        alignItemsCenter,
                        smallBMargin,
                        justifyContentBetween,
                      ]}
                      onPress={() => {
                        setPressedItem(pressedItem === i + 1 ? 0 : i + 1),
                          console.log('Pressed>>', pressedItem);
                      }}>
                      <View style={[smallHPadding]}>
                        <Text text={item.question} color="quinary" />
                        <Text
                          text={answers[i] ? answers[i] : item.question}
                          style={[textMedium]}
                        />
                      </View>
                      <Icon type="FontAwesome" name="tag" style={tag} />
                    </TouchableOpacity>
                    {i + 1 === pressedItem && (
                      <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{
                          borderRadius: 5,
                          height: 75,
                          padding: 5,
                          marginLeft: 5,
                        }}>
                        {item.options.map((option, key) => (
                          <TouchableOpacity
                            key={key}
                            style={{padding: 5}}
                            onPress={() => {
                              questionSubmission(i, option.option),
                                setPressedItem(0);
                              console.log('option', option);
                            }}>
                            <Text text={option.option} />
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    )}
                  </>
                );
              } else if (item.type === 'text') {
                return (
                  <View>
                    <Input
                      style={tagInput}
                      placeholder={item.question}
                      onChangeText={(val) => questionSubmission(i, val)}
                    />
                  </View>
                );
              }
            })}
          <View style={[smallBMargin]}>
            <Input
              value={state.daily_hour_required.value}
              placeholder="How Many Hours requried daily"
              onChangeText={(value) => addValue(3, value)}
              keyboardType="numeric"
              // icon="time-slot"
              style={{paddingLeft: 20}}
              // iconColor={address ? 'secondary' : 'primary'}
              // color={address ? 'primary' : 'secondary'}
            />
            {state.daily_hour_required.error ? (
              <Text
                style={{color: 'red'}}
                text={state.daily_hour_required.error}
              />
            ) : null}
          </View>
          <Picker
            placeholder="Select Time"
            style={[
              {
                backgroundColor: '#f7f7f7',
                width: '100%',
                borderRadius: 4,
              },
              smallBMargin,
            ]}
            selectedValue={time_period}
            mode="dropdown"
            onValueChange={(itemValue, itemIndex) => setTime_period(itemValue)}>
            <Picker.Item label="One Time" value="one-time" />
            <Picker.Item label="Week" value="week" />
            <Picker.Item label="Month" value="month" />
            <Picker.Item label="Year" value="year" />
          </Picker>
          <View style={{marginTop: -10}}>
            <Input
              multiline
              value={state.note.value}
              placeholder="Note"
              onChangeText={(value) => addValue(1, value)}
              customStyle={notes}
            />
            {state.note.error ? (
              <Text style={{color: 'red'}} text={state.note.error} />
            ) : null}
          </View>
          <View style={[regularTMargin, mediumBMargin]}>
            <Button
              text="Add to bag"
              style={[fill, smallVMargin]}
              color="secondary"
              redBorder
              block
              onPress={() => onAddToBag()}
              disabled={disable}
            />
            <Button
              block
              text="Book Now"
              style={fill}
              color="primary"
              onPress={submitForm}
              disabled={disable}
            />
          </View>
          {/* <TouchableOpacity
            style={[
              tagInput,
              row,
              alignItemsCenter,
              smallBMargin,
              justifyContentBetween,
            ]}
            onPress={() => setService(true)}>
            <View style={[smallHPadding]}>
              <Text text="Service" color="quinary" />
              <Text text={serviceText} style={[textMedium]} />
            </View>
            <Icon type="FontAwesome" name="tag" style={tag} />
          </TouchableOpacity>
          {service && (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{
                borderRadius: 5,
                height: 75,
              }}>
              {Services.map((item, i) => (
                <TouchableOpacity
                  key={i}
                  style={{padding: 5}}
                  onPress={() => {
                    setServiceText(item.name), setService(false);
                  }}>
                  <Text text={item.name} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
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
          <TouchableOpacity
            style={[
              tagInput,
              row,
              alignItemsCenter,
              smallBMargin,
              justifyContentBetween,
            ]}
            onPress={() => setHouseType(true)}>
            <View style={[smallHPadding, {marginLeft: -6}]}>
              <Text text="House Type" color="quinary" />
              <Text text={houseTypeText} style={[textMedium]} />
            </View>
            <Image source={Images.housedark} style={imageIcon} />
          </TouchableOpacity>
          {houseType && (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{
                borderRadius: 5,
                height: 75,
              }}>
              {Houses.map((item, i) => (
                <TouchableOpacity
                  key={i}
                  style={{padding: 5}}
                  onPress={() => {
                    setHouseTypeText(item.name), setHouseType(false);
                  }}>
                  <Text text={item.name} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

          <TouchableOpacity
            style={[
              tagInput,
              row,
              alignItemsCenter,
              smallBMargin,
              justifyContentBetween,
            ]}
            onPress={() => setNoOfRoom(true)}>
            <View style={[smallHPadding, {marginLeft: -6}]}>
              <Text text="Number of rooms" color="quinary" />
              <Text text={noOfRoomText} style={[textMedium]} />
            </View>
            <Image source={Images.beddark} style={imageIcon} />
          </TouchableOpacity>
          {noOfRoom && (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{
                borderRadius: 5,
                height: 75,
              }}>
              {questions?.map((item, i) => {
                if (item.type === 'dropdown') {
                  return (
                    <TouchableOpacity
                      key={i}
                      style={{padding: 5}}
                      onPress={() => {
                        setNoOfRoomText(item.question), setNoOfRoom(false);
                      }}>
                      <Text text={item.question} />
                    </TouchableOpacity>
                  );
                }
              })}
            </ScrollView>
          )}
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
          </View>*/}
        </ScrollView>
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
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}>
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
                            )}{' '}
                            -{' '}
                            {moment(time.end_time, ['hh:mm:ss']).format(
                              'hh:mm',
                            )}
                          </Text>
                        </TouchableOpacity>
                      ))}
                      {!availableSlots.length ? (
                        <Text
                          text="Currently no slot available."
                          style={[textMedium, smallLMargin]}
                        />
                      ) : null}
                    </ScrollView>
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
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}>
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
                              'hh:mm:',
                            )}{' '}
                            -{' '}
                            {moment(time.end_time, ['hh:mm:ss']).format(
                              'hh:mm:',
                            )}
                          </Text>
                        </TouchableOpacity>
                      ))}
                      {!availableSlots.length ? (
                        <Text
                          text="Currently no slot available."
                          style={[textMedium, smallLMargin]}
                        />
                      ) : null}
                    </ScrollView>
                  </View>
                  {availableSlots.length ? (
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
                        text="Confirm Time"
                        color="primary"
                        style={[button, buttonSize]}
                        block
                        onPress={() => setTimeModalVisible(false)}
                      />
                    </View>
                  ) : null}
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
  questions: state.booking.questions,
  cardDetail: state.cardDetail.cardDetail,
});

const mapDispatchToProps = (dispatch) => ({
  postBookingForm: (data) => dispatch(postBookingForm(data)),
  postNotification: (data) => dispatch(postNotification(data)),
  getQuestion: (id) => dispatch(getQuestion(id)),
  addToBag: (data) => dispatch(addToBag(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookingForm);
