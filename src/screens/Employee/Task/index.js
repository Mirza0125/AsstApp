import React, {useEffect, useState} from 'react';
import {
  View,
  Modal,
  StatusBar,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import moment from 'moment';
import Database from './database';
import {connect} from 'react-redux';
import {Content, Icon, Picker} from 'native-base';
import {Calendar} from 'react-native-calendars';
// import {Picker} from '@react-native-picker/picker';
import {ScrollView} from 'react-native-gesture-handler';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import {formattedtDate} from '../../../utils/functions';
import {useIsFocused} from '@react-navigation/native';
// components
import {
  Text,
  Task as ApprovedTasks,
  Line,
  Button,
  MyOrders,
  LuckyHeader,
  BookingRequest,
  DataAvailability,
} from 'src/components';

//actions
import {
  postTaskDetail,
  setTimeAvailability,
  getPendingBookingTaskDetail,
  getApprovedBookingTaskDetail,
} from './redux/actions';
import {postNotification} from '../../../redux/actions';

// theme
import {Layout, Colors, Fonts, Gutters} from 'src/theme';

// styles
import styles from './styles';
const {titleRegular} = Fonts;
const {icon, button, inputField, indicatorStyle} = styles;
const {row, fill, fill2x, center} = Layout;
const {mediumHMargin, smallVMargin, small2xHMargin, justifyContentBetween} =
  Gutters;

const Task = (props) => {
  const isFocused = useIsFocused();
  const {
    user,
    profileData,
    pendingTask,
    approvedTask,
    employeeServices,
    // pendingRequesting,
    // approvedRequesting,
    navigation: {navigate},
  } = props;

  const dimensions = useWindowDimensions();
  const windowWidth = Dimensions.get('window').width;

  const [date, setDate] = useState('');
  const [status, setStatus] = useState();
  const [timeOption, setTimeOption] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    props.getPendingBookingTaskDetail();
    props.getApprovedBookingTaskDetail();
  }, [isFocused]);

  let startTimeData = timeOption ? timeOption.slice(0, 7) : '';
  let startTime = moment(startTimeData, ['h:mm A']).format('hh:mm:ss');
  let endTimeData = timeOption ? timeOption.slice(11, 17) : '';
  let endTime = moment(endTimeData, ['h:mm A']).format('hh:mm:ss');

  const onsubmit = () => {
    let data = {
      employee: employeeServices[0].employee,
      date: date?.dateString,
      start_time: startTime,
      end_time: `${endTime}`,
    };
    console.log('posted data', data);
    props.setTimeAvailability(data);
    setModalVisible(false);
  };

  const onAccept = async (item) => {
    console.log('items', item);
    let data = {
      status: 'accepted',
    };
    let notificationMessage = {
      sender: user.id,
      receiver: item.u_id,
      title: 'Booking Request Accepted',
      message: 'Booking Request Accepted',
    };
    console.log('notificationMessage', notificationMessage);
    await props.postTaskDetail(data, item.id);
    await props.postNotification(notificationMessage);
  };

  const onDecline = (item) => {
    let data = {
      status: 'rejected',
    };
    props.postTaskDetail(data, item.id);
  };

  const onSelect = (item) => {
    navigate('TrackOrderDetailScreen', {item});
  };
  const openChatScreen = async (data) => {
    console.log('openchatData', data);
    Database.shared().init(
      user.id,
      user.first_name ? user.first_name : user.name,
      profileData[0].photo ? profileData[0].photo : '',
    );
    let chat = await Database.shared().addChat(data);

    navigate('Messages', {
      chat: chat,
    });
  };

  const FirstRoute = () => (
    <>
      {/* <DataAvailability
        requesting={Boolean(pendingRequesting)}
        style={{ marginTop: -160 }}
        hasData={Boolean(pendingTask)}> */}
      <Content>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 25,
          }}>
          {pendingTask &&
            pendingTask.map((data, i) => (
              <BookingRequest
                key={i}
                name={data.user}
                imageUrl={data.user_photo}
                date={data.booking_date}
                time={formattedtDate(data.booking_time)}
                category={data.employee_category_tittle.toUpperCase()}
                address={data.address}
                onAccept={() => onAccept(data)}
                onDecline={() => onDecline(data)}
              />
            ))}
        </View>
      </Content>
      {/* </DataAvailability> */}
    </>
  );

  const SecondRoute = () => (
    <>
      {/* <DataAvailability
        requesting={Boolean(approvedRequesting)}
        style={{ marginTop: -150 }}
        hasData={Boolean(approvedTask)}> */}
      <Content showsVerticalScrollIndicator={false}>
        <View style={{flex: 1, paddingHorizontal: 25}}>
          {approvedTask &&
            approvedTask.map((item, i) => (
              <MyOrders
                key={i}
                date={moment(item.booking_date).format('MMM-D')}
                time={formattedtDate(item.booking_time)}
                name={item.user}
                address={item.address}
                imageUrl={item.user_photo}
                category={item.employee_category_tittle.toUpperCase()}
                onMessage={() => openChatScreen(item)}
                onViewDetail={() => onSelect(item)}
              />
            ))}
        </View>
      </Content>
      {/* </DataAvailability> */}
    </>
  );

  const [index, setIndex] = React.useState(0);
  // const [routes] = React.useState([
  //   {
  //     key: 'first',
  //     title: `Pending (${pendingTask.length})`,
  //   },
  //   {
  //     key: 'second',
  //     title: `Approved (${approvedTask.length})`,
  //   },
  // ]);

  const routes = [
    {
      key: 'first',
      title: `Pending (${pendingTask.length})`,
    },
    {
      key: 'second',
      title: `Approved (${approvedTask.length})`,
    },
  ];

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={indicatorStyle}
      style={{backgroundColor: 'white'}}
      activeColor={Colors.torchRed}
      inactiveColor={Colors.black}
      labelStyle={{fontWeight: 'bold'}}
    />
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const onChangeIndex = (index) => {
    setIndex(index);
    index
      ? props.getApprovedBookingTaskDetail()
      : props.getPendingBookingTaskDetail();
  };
  // const [statusValue, setStatusValue] = useState(null);
  // const [openStatus, setOpenStatus] = useState(false);
  // const [statusItems, setStatusItems] = useState([
  //   { label: 'Available', value: 'Available' },
  //   { label: 'Not Available', value: 'Not Available' },
  // ]);

  return (
    <SafeAreaView style={[fill, {justifyContent: 'space-between'}]}>
      <LuckyHeader
        left={<Icon type="FontAwesome5" name="arrow-left" style={icon} />}
        onPress={() => props.navigation.goBack()}
        title={
          <Text text="Task List" bold color="quaternary" style={titleRegular} />
        }
        titleStyle={{alignItems: 'center'}}
      />

      <Line />
      <View style={[mediumHMargin]}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={[row, center, smallVMargin, inputField]}>
          <Text text="Set your calander availability" style={{fontSize: 16}} />

          <Icon
            type="FontAwesome5"
            name="chevron-right"
            style={{fontSize: 16}}
          />
        </TouchableOpacity>
      </View>

      <View style={fill}>
        <Line />
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={(index) => onChangeIndex(index)}
          initialLayout={{width: dimensions.width}}
          renderTabBar={renderTabBar}
        />
      </View>

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
              flex: 1,
              width: '100%',
              borderRadius: 15,
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
                  fontSize: 24,
                  fontWeight: '400',
                  marginRight: 40,
                }}>
                Booking Details
              </Text>
            </View>
            <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
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
                  markedDates={{
                    [date.dateString]: {
                      selected: true,
                      selectedColor: '#FFCB3B',
                    },
                  }}
                  theme={{
                    backgroundColor: '#ffffff',
                    calendarBackground: '#ffffff',
                    textSectionTitleColor: '#FD1B1B',
                    textSectionTitleDisabledColor: '#d9e1e8',
                    selectedDayBackgroundColor: '#FD1B1B',
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
                  // minDate={Date()}
                  // maxDate={'2022-01-01'}
                  onDayPress={(day) => {
                    setDate(day);
                  }}
                  onDayLongPress={(day) => {
                    setDate(day);
                  }}
                  monthFormat={'MMMM yyyy'}
                  onMonthChange={(month) => {
                    setDate(month);
                  }}
                  firstDay={1}
                  hideArrows={false}
                  horizontal={false}
                  hideDayNames={false}
                  pagingEnabled={false}
                  hideExtraDays={false}
                  showWeekNumbers={false}
                  disableArrowLeft={false}
                  enableSwipeMonths={true}
                  disableArrowRight={false}
                  disableMonthChange={false}
                  onPressArrowRight={(addMonth) => addMonth()}
                  onPressArrowLeft={(subtractMonth) => subtractMonth()}
                  disableAllTouchEventsForDisabledDays={true}
                  // markingType="multi-period"
                  // markedDates={{
                  //   '2021-08-09': {
                  //     periods: [
                  //       {
                  //         startingDay: true,
                  //         endingDay: true,
                  //         color: 'green',
                  //       },
                  //     ],
                  //   },
                  //   '2021-08-05': {
                  //     periods: [
                  //       {
                  //         startingDay: true,
                  //         endingDay: true,
                  //         color: 'red',
                  //       },
                  //     ],
                  //   },
                  // }}
                />
              </View>
              <View style={{flex: 1}}>
                <View
                  style={{
                    flex: 1,
                    paddingHorizontal: 40,
                    paddingVertical: 15,
                    backgroundColor: '#F9FAFA',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '600',
                    }}>
                    Update Availability
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
                    paddingLeft: 15,
                  }}>
                  <View style={[fill, {marginRight: 10}]}>
                    <View
                      style={[
                        row,
                        fill,
                        center,
                        justifyContentBetween,
                        {marginBottom: 10, zIndex: 1},
                      ]}>
                      <View
                        style={[
                          row,
                          justifyContentBetween,
                          fill,
                          {alignItems: 'center'},
                        ]}>
                        <Icon
                          type="FontAwesome5"
                          name="user-check"
                          style={{fontSize: 15, marginRight: 15}}
                        />
                        <Text text="Status" style={{fontSize: 15}} />
                      </View>
                      <View style={[fill, {alignItems: 'flex-end'}]}>
                        <Picker
                          itemStyle={Platform.OS === 'ios' && {height: 90}}
                          style={{width: '100%'}}
                          dropdownIconColor={Colors.torchRed}
                          selectedValue={status}
                          mode="dropdown"
                          onValueChange={(itemValue, itemIndex) =>
                            setStatus(itemValue)
                          }>
                          <Picker.Item
                            label="_____________"
                            value=""
                            style={{color: Colors.torchRed}}
                          />

                          <Picker.Item
                            label="Available"
                            value="Available"
                            style={{color: Colors.torchRed}}
                          />
                          <Picker.Item
                            label="Not Available"
                            value="Not Available"
                            style={{color: Colors.torchRed}}
                          />
                        </Picker>
                      </View>
                    </View>
                    <View
                      style={[
                        fill2x,
                        row,
                        {
                          marginTop: 1,
                        },
                      ]}>
                      <View
                        style={[
                          row,
                          justifyContentBetween,
                          fill,
                          {alignItems: 'center'},
                        ]}>
                        <Icon
                          type="Ionicons"
                          name="ios-time"
                          style={{
                            color: 'black',
                            fontSize: 15,
                            marginRight: 17,
                          }}
                        />
                        <Text text="Time Option" style={{fontSize: 14}} />
                      </View>
                      <View style={[fill2x, {alignItems: 'flex-end'}]}>
                        <Picker
                          itemStyle={Platform.OS === 'ios' && {height: 90}}
                          style={{width: '97%'}}
                          dropdownIconColor={Colors.torchRed}
                          selectedValue={timeOption}
                          mode="dropdown"
                          onValueChange={(itemValue, itemIndex) =>
                            setTimeOption(itemValue)
                          }>
                          <Picker.Item
                            label="_____________________"
                            value=""
                            style={{color: Colors.torchRed}}
                          />
                          <Picker.Item
                            label="9:00 AM to 11:00 AM"
                            value="9:00 AM to 11:00 AM"
                            style={{color: Colors.torchRed}}
                          />
                          <Picker.Item
                            label="10:00 AM to 12:00 PM"
                            value="10:00 AM to 12:00 PM"
                            style={{color: Colors.torchRed}}
                          />
                          <Picker.Item
                            label="11:00 AM to 1:00 PM"
                            value="11:00 AM to 1:00 PM"
                            style={{color: Colors.torchRed}}
                          />
                          <Picker.Item
                            label="12:00 PM to 3:00 PM"
                            value="12:00 PM to 3:00 PM"
                            style={{color: Colors.torchRed}}
                          />
                          <Picker.Item
                            label="1:00 PM to 4:00 PM"
                            value="1:00 PM to 4:00 PM"
                            style={{color: Colors.torchRed}}
                          />
                          <Picker.Item
                            label="2:00 PM to 5:00 PM"
                            value="2:00 PM to 5:00 PM"
                            style={{color: Colors.torchRed}}
                          />
                          <Picker.Item
                            label="3:00 PM to 6:00 PM"
                            value="3:00 PM to 6:00 PM"
                            style={{color: Colors.torchRed}}
                          />
                          <Picker.Item
                            label="4:00 PM to 7:00 PM"
                            value="4:00 PM to 7:00 PM"
                            style={{color: Colors.torchRed}}
                          />
                        </Picker>
                      </View>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: '#F5F5F5',
                    flex: 0.5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 10,
                    flexDirection: 'row',
                    marginTop: 10,
                    alignSelf: 'flex-end',
                    zIndex: -1,
                  }}>
                  <Button
                    text="Delete"
                    color="secondary"
                    style={[fill, small2xHMargin]}
                    textStyle={button}
                    redBorder
                    block
                    //onPress={() => onPressReset()}
                  />
                  <Button
                    text="Save"
                    color="primary"
                    style={[fill, button, small2xHMargin]}
                    block
                    disabled={!timeOption && !status}
                    onPress={() => onsubmit()}
                  />
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
  approvedRequesting: state.Tasks.requesting,
  pendingRequesting: state.Tasks.requesting,
  employeeServices: state.employeeHome.employeeServices,
  pendingTask: state.Tasks.pendingTask,
  approvedTask: state.Tasks.approvedTask,
  profileData: state.profileData.profileData,
});

const mapDispatchToProps = (dispatch) => ({
  getPendingBookingTaskDetail: () => dispatch(getPendingBookingTaskDetail()),
  getApprovedBookingTaskDetail: () => dispatch(getApprovedBookingTaskDetail()),
  postTaskDetail: (data, id) => dispatch(postTaskDetail(data, id)),
  setTimeAvailability: (data) => dispatch(setTimeAvailability(data)),
  postNotification: (data) => dispatch(postNotification(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Task);
