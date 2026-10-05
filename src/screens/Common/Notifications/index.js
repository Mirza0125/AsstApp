import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Content, Icon} from 'native-base';
import {StatusBar, SafeAreaView, Image} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';

// components
import {
  Text,
  Notification,
  LuckyHeader,
  DataAvailability,
} from 'src/components';

// theme
import {Images, Gutters, Colors, Fonts} from 'src/theme';

// styles
import styles from './styles';

//action
import {isSeen, getNotification, setDetails} from './redux/actions';

const Notifications = (props) => {
  const {
    user,
    requesting,
    notificationsData,
    navigation: {navigate, goBack},
  } = props;

  const {titleSmall} = Fonts;
  const {mediumHPadding, smallHPadding} = Gutters;
  const {container} = styles;
  const isFocused = useIsFocused();

  useEffect(() => {
    props.getNotification();
  }, [isFocused]);

  const onNotificationPress = async (notification) => {
    const data = {
      user: user.id,
      notification: notification.id,
    };
    console.log('Seen Data', data);
    console.log('notification', notification);
    await props.isSeen(data);
    if (notification.title == 'completed') {
      // navigate('BookingCompleteMarkScreen', {notification});
      navigate('PaymentDetailScreen', {service: notification});
      props.setDetails(notification);
    } else if (
      notification.title == 'Booking Request Accepted' ||
      'Booking Request'
    ) {
      navigate('Task');
    }
    // if (notification.title === 'Booking Request') {
    //   navigate('Task');
    // }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <LuckyHeader
        left={
          <Image
            style={{width: 14, height: 12, resizeMode: 'contain'}}
            source={require('../../../assets/images/new/arrow-left.png')}
          />
        }
        onPress={() => goBack()}
        title={
          <Text text="Notifications" color="#000" bold style={titleSmall} />
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
      <DataAvailability
        requesting={requesting}
        hasData={notificationsData.length != 0}
        style={{marginTop: -120}}>
        <Content contentContainerStyle={container}>
          {notificationsData?.length
            ? notificationsData?.map((notification, i) => (
                <Notification
                  key={i}
                  onPress={() => onNotificationPress(notification)}
                  imageUrl={
                    notification.image
                      ? notification.image
                      : notification.emp_image
                  }
                  newMessage={!notification.is_seen}
                  name={String(notification.name)}
                  source={Images.anneonbeach}
                  message={String(notification.message)}
                  time={moment(notification.created).fromNow()}
                />
              ))
            : null}
        </Content>
      </DataAvailability>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  user: state.login.user,
  profile: state.profile.profile,
  requesting: state.notificationsData.requesting,
  // notifications: state.notifications.notifications,
  notificationsData: state.notificationsData.notificationsData,
});

const mapDispatchToProps = (dispatch) => ({
  isSeen: (data) => dispatch(isSeen(data)),
  setDetails: (data) => dispatch(setDetails(data)),
  getNotification: (data) => dispatch(getNotification(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
