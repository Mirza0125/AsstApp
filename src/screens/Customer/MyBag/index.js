import React, {useEffect} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {Content, Icon} from 'native-base';
import {StatusBar, SafeAreaView, View, Dimensions} from 'react-native';

// components
import {Text, LuckyHeader, Service} from 'src/components';

// theme
import {Images, Gutters, Colors, Fonts} from 'src/theme';

// styles
import styles from './styles';

//action
import {getBagServices} from './redux/actions';
import {postBookingForm} from '../BookingForm/redux/actions';
import {postNotification} from '../../../redux/actions';

const MyBag = (props) => {
  const {
    card,
    user,
    cardDetail,
    bagServices,
    navigation: {navigate},
  } = props;
  const {width, height} = Dimensions.get('window');
  const {titleSmall} = Fonts;
  const {smallHPadding, smallTMargin} = Gutters;
  const {container} = styles;

  useEffect(() => {
    props.getBagServices();
  }, []);

  const onCheckOut = async (service) => {
    const data = {
      user: service.user,
      employee: service.employee,
      comments: service.comments,
      address: service.address,
      booking_date: service.booking_date,
      booking_time: service.booking_time,
      employee_category: service.employee_category,
      add_to_bag: service.id,
      daily_hour_required: service.daily_hour_required,
      time_period: service.time_period,
    };
    console.log(data, 'dataaaaaaaaaa');
    const notificationMessage = {
      sender: service.user,
      receiver: service.em_u_id,
      employee_category: service.employee_category,
      title: 'Booking Request',
      message: 'New Booking Request',
    };
    console.log('notificationMessage', notificationMessage);
    await props.postBookingForm([data]);
    console.log(data, '=======================>data');
    await props.postNotification(notificationMessage);
    await props.getBagServices();
  };
  console.log('bagServices====>', bagServices);
  console.log('card====>', card);
  console.log('cardDetail====>', cardDetail);

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <StatusBar backgroundColor={Colors.white} barStyle="dark-content" /> */}
      <LuckyHeader
        title={
          <Text text="Services" color="quaternary" bold style={titleSmall} />
        }
        titleStyle={{alignItems: 'center'}}
      />
      <Content contentContainerStyle={[smallHPadding, smallTMargin]}>
        {bagServices?.length ? (
          bagServices?.map((service, i) => (
            <Service
              key={i}
              onPress={() => onCheckOut(service)}
              imageUrl={service.employee_photo}
              name={service.employee_name}
              address={service.address}
              categoryName={service.employee_category_tittle}
              time={service.booking_time}
              date={service.booking_date}
              withViewSection
              text="Checkout"
            />
          ))
        ) : (
          <>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                height: (250 / 375) * height,
              }}>
              <Text style={{fontSize: 16}}>Your Bag is Empty!</Text>
            </View>
          </>
        )}
      </Content>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  user: state.login.user,
  card: state.card.cardData,
  cardDetail: state.cardDetail.cardDetail,
  bagServices: state.bagServices.bagServices,
});

const mapDispatchToProps = (dispatch) => ({
  getBagServices: (data) => dispatch(getBagServices(data)),
  postBookingForm: (data) => dispatch(postBookingForm(data)),
  postNotification: (data) => dispatch(postNotification(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyBag);
