import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import {Card, Container, Content, Icon} from 'native-base';
import {Rating} from 'react-native-ratings';
import moment from 'moment';
import {ApplePayButton, PaymentRequest} from 'react-native-payments';
// const PaymentRequest = require('react-native-payments').PaymentRequest;
// components
import {Text, Input, Button, Line, DataAvailability} from 'src/components';

// //actions
import {addCharge} from './redux/actions';
import {getCardData} from '../PaymentMethodScreen/redux/actions';

// theme
import {Layout, Images, Gutters, Colors, Fonts} from 'src/theme';

// styles
import styles from './styles';

const BookingCompleteMarkScreen = (props) => {
  const {
    // isCardAdded,
    paymentDetails,
    cardDetail,
    // route: {
    //   params: { notification },
    // },
    navigation: {navigate},
  } = props;

  useEffect(() => {
    props.getCardData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setRequesting(false);
    }, 1000);
  }, []);

  const [tip, setTip] = useState('');
  const [requesting, setRequesting] = useState(true);

  const onSubmit = () => {
    const data = {
      tip: tip ? tip : 0,
      currency: 'usd',
      booking_id: paymentDetails?.booking_id,
      employee_category: paymentDetails?.employee_category,
      amount: paymentDetails?.emp_cate_price
        ? paymentDetails?.emp_cate_price
        : 5,
    };
    props.addCharge(data, paymentDetails);
    console.log('Data>>>>', data);
  };

  const DETAILS = {
    id: 'basic-example',
    displayItems: [
      {
        label: 'Movie Ticket',
        amount: {currency: 'USD', value: '15.00'},
      },
      {
        label: 'Grocery',
        amount: {currency: 'USD', value: '5.00'},
      },
    ],
    total: {
      label: 'Enappd Store',
      amount: {currency: 'USD', value: '20.00'},
    },
  };

  const APPLE_METHOD_DATA = [
    {
      supportedMethods: ['apple-pay'],
      data: {
        merchantIdentifier: 'merchant.com.your-app.namespace',
        supportedNetworks: ['visa', 'mastercard', 'amex'],
        countryCode: 'US',
        currencyCode: 'USD',
      },
    },
  ];

  // const ANDROID_METHOD_DATA = [{
  //   supportedMethods: ['android-pay'],
  //   data: {
  //     supportedNetworks: ['visa', 'mastercard', 'amex'],
  //     currencyCode: 'USD',
  //     environment: 'TEST', // defaults to production
  //     paymentMethodTokenizationParameters: {
  //       tokenizationType: 'GATEWAY_TOKEN',
  //       parameters: {
  //         gateway: 'stripe',
  //         'stripe:publishableKey': 'your-pubic-key',
  //         'stripe:version': '5.0.0'
  //       }
  //     }
  //   }
  // }];

  const OPTIONS = {
    requestPayerName: false,
    requestPayerPhone: false,
    requestPayerEmail: false,
    requestShipping: false,
  };

  const onApplePay = (succeed = true) => {
    const paymentRequest = new PaymentRequest(APPLE_METHOD_DATA, DETAILS);
    paymentRequest
      .show()
      .then((paymentResponse) => {
        const card_token = paymentResponse.details.paymentToken;
        console.log('paymentResponse', paymentResponse);
        if (succeed) {
          paymentResponse.complete('success');
          console.log(
            `Payment request completed with card token ${card_token}`,
          );
        } else {
          paymentResponse.complete('failure');
          console.log('Payment request failed');
        }
      })
      .catch((error) => {
        if (error.message === 'AbortError') {
          console.log('Payment request was dismissed');
        }
      });
  };

  // const onAndroidPay = (succeed = true) => {
  //   const paymentRequest = new PaymentRequest(ANDROID_METHOD_DATA, DETAILS);
  //   paymentRequest
  //     .show()
  //     .then((paymentResponse) => {
  //       const card_token = paymentResponse.details.paymentToken;
  //       console.log('paymentResponse', paymentResponse);
  //       if (succeed) {
  //         paymentResponse.complete('success');
  //         console.log(
  //           `Payment request completed with card token ${card_token}`,
  //         );
  //       } else {
  //         paymentResponse.complete('failure');
  //         console.log('Payment request failed');
  //       }
  //     })
  //     .catch((error) => {
  //       if (error.message === 'AbortError') {
  //         console.log('Payment request was dismissed');
  //       }
  //     });
  //   console.log('Google>>');
  // }

  const {titleRegular, textCenter, textSmall, textLarge, textMedium} = Fonts;
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
    mediumTMargin,
    regularVMargin,
    smallRMargin,
    smallBMargin,
    regularHPadding,
    regularVPadding,
    regularLMargin,
    smallVPadding,
    regularBMargin,
    smallLMargin,
    mediumBPadding,
    mediumVPadding,
  } = Gutters;
  const {
    icon,
    primaryBg,
    reviewer,
    rating,
    button,
    check,
    mainBg,
    wrapper,
    PicWrapper,
    mainWrapper,
    marginT1x,
    textWrapper,
    mastercard,
    chevronIcon,
    bottomRadious,
    locationIcon,
    locationWrapper,
    masterCardWrapper,
    paymentMethodWrapper,
  } = styles;
  console.log('cardDetail>>>', cardDetail);
  return (
    <DataAvailability requesting={requesting} hasData={Boolean(paymentDetails)}>
      <Container style={mainBg}>
        <SafeAreaView
          style={[
            row,
            alignItemsCenter,
            justifyContentCenter,
            mediumHPadding,
            mediumVPadding,
            mainBg,
          ]}>
          {/* <StatusBar backgroundColor={Colors.white} barStyle="dark-content" /> */}
          <Icon
            type="FontAwesome5"
            name="arrow-left"
            style={icon}
            onPress={() => props.navigation.goBack()}
          />
          <Text
            text="Transaction Complete"
            bold
            color="quaternary"
            style={titleRegular}
          />
        </SafeAreaView>
        <Line />
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            mediumHPadding,
            mainBg,
            wrapper,
            mediumBPadding,
          ]}>
          <View style={[center, regularVMargin]}>
            <Text
              text={'Your transaction is scheduled today,'}
              style={[textMedium, textCenter]}
            />
            <Text
              text="Do you want to mark it as complete?"
              style={[textMedium, textCenter]}
            />
          </View>
          <View style={[row, fill, primaryBg, mainWrapper]}>
            <View>
              <Text
                text={moment(paymentDetails?.created).format('DD-MMM')}
                bold
                style={titleRegular}
              />
              <Text
                text={moment(paymentDetails?.created).format('hh:mm A')}
                style={textLarge}
              />
            </View>
            <View style={[center, regularLMargin]}>
              <View style={[row, alignItemsCenter, smallRMargin]}>
                <View style={[PicWrapper]}>
                  <Image
                    source={{uri: paymentDetails?.emp_image}}
                    style={reviewer}
                  />
                </View>
                <View style={smallLMargin}>
                  <View style={[row, center, justifyContentBetween]}>
                    <Text text={paymentDetails?.name} bold style={textMedium} />
                  </View>
                  <Rating
                    readonly
                    ratingCount={5}
                    imageSize={15}
                    style={rating}
                    tintColor={Colors.Alabaster}
                    startingValue={paymentDetails?.review}
                  />
                </View>
              </View>
              <View style={[row, center, locationWrapper]}>
                <Icon name="location" style={locationIcon} />
                <Text text={paymentDetails?.emp_address} />
              </View>
            </View>
          </View>
          <View
            style={[
              row,
              marginT1x,
              justifyContentBetween,
              textWrapper,
              primaryBg,
            ]}>
            <Text text={paymentDetails?.emp_category} style={textMedium} />
            <Text text={paymentDetails?.emp_cate_price} style={textMedium} />
          </View>
          <View
            style={[
              row,
              marginT1x,
              justifyContentBetween,
              bottomRadious,
              primaryBg,
            ]}>
            <Text text="Total" style={textMedium} />
            <Text text={paymentDetails?.emp_cate_price} style={textMedium} />
          </View>
          <View style={[mediumTMargin, regularBMargin]}>
            <Input
              placeholder="Service Tip"
              value={tip}
              onChangeText={(val) => setTip(val)}
            />
          </View>
          {/* <View style={[row, justifyContentBetween, smallBMargin]}>
            <Text
              text="Payment Method"
              style={{ fontSize: 16, color: '#300C1C' }}
            />
            <TouchableOpacity
              style={[row, alignItemsCenter]}
              onPress={() => navigate('PaymentMethodScreen')}>
              <Text text="Select" style={{ fontSize: 16, color: '#FD1B1B' }} bold />
              <Icon
                type="FontAwesome5"
                name="chevron-right"
                style={{ fontSize: 14, color: '#FD1B1B', marginLeft: 4 }}
              />
            </TouchableOpacity>
          </View> */}
          {/* {cardDetail && (
            <View style={[row, textWrapper, primaryBg, masterCardWrapper]}>
              <Image source={Images.mastercard} style={mastercard} />
              <View style={[center, smallLMargin]}>
                <Text text={cardDetail && cardDetail.last4} style={textMedium} />
                <Text text="PRIMARY" bold color="quinary" style={[textSmall]} />
              </View>
              <Image source={Images.check} style={check} />
            </View>
          )} */}
          <View style={[fill, button]}>
            <Button
              text="Complete"
              color="primary"
              block
              disabled={!cardDetail}
              onPress={() => onSubmit()}
            />
          </View>
          {
            Platform.OS === 'ios' ? (
              <View style={[fill, button]}>
                <Button
                  text="Complete With Apple Pay"
                  color="primary"
                  block
                  disabled={!cardDetail}
                  onPress={() => onApplePay()}
                />
              </View>
            ) : null
            // <View style={[fill, button]}>
            //   <Button
            //     text="Complete With Android Pay"
            //     color="primary"
            //     block
            //     disabled={!cardDetail}
            //     onPress={() => onAndroidPay()}
            //   />
            // </View>
          }
        </Content>
      </Container>
    </DataAvailability>
  );
};

const mapStateToProps = (state) => ({
  cardDetail: state.cardDetail.cardDetail,
  paymentDetails: state.notificationsData.paymentDetails,
});

const mapDispatchToProps = (dispatch) => ({
  addCharge: (data, paymentDetails) =>
    dispatch(addCharge(data, paymentDetails)),
  getCardData: () => dispatch(getCardData()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookingCompleteMarkScreen);
