import React, {useEffect, useState} from 'react';
import {View, Image, TouchableOpacity, StatusBar, Platform} from 'react-native';
import {connect} from 'react-redux';
import moment from 'moment';
import {Container, Content, Icon} from 'native-base';
import {Rating} from 'react-native-ratings';
import {useNavigation, useRoute} from '@react-navigation/native';

// const PaymentRequest = require('react-native-payments').PaymentRequest;

// components
import {
  Text,
  Input,
  Button,
  Line,
  LuckyHeader,
  DataAvailability,
} from 'src/components';

// //actions
// import {getEmployeeData} from './redux/actions';
import {getCardData} from '../PaymentMethodScreen/redux/actions';

// theme
import {Layout, Images, Gutters, Colors, Fonts} from 'src/theme';

// styles
import styles from './styles';

const PaymentDetailScreen = (props) => {
  let route = useRoute();
  let service = route.params.service;
  const {
    cardData,
    cardDetail,
    defaultCard,
    paymentDetails,
    navigation: {navigate},
    // route: {
    //   params: { service },
    // },
  } = props;

  useEffect(() => {
    props.getCardData();
    getDefaulCard();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setRequesting(false);
    }, 1000);
  }, []);

  const getDefaulCard = async () => {
    const card =
      (await cardDetail) &&
      cardDetail?.list_card.filter((item) => item.id === defaultCard.card_id);
    setDCard(card);
    // return card
  };

  const [requesting, setRequesting] = useState(true);
  const [dCard, setDCard] = useState('');

  const {titleRegular, titleSmall, textSmall, textLarge, textMedium} = Fonts;
  const {
    row,
    fill,
    center,
    justifyContentBetween,
    alignItemsCenter,
    justifyContentCenter,
  } = Layout;
  const {
    smallRMargin,
    smallLMargin,
    regularLMargin,
    mediumTMargin,
    mediumHPadding,
    regularVMargin,
    mediumVPadding,
  } = Gutters;
  const {
    icon,
    line,
    check,
    button,
    rating,
    mainBg,
    wrapper,
    reviewer,
    primaryBg,
    marginT1x,
    buttonText,
    mastercard,
    PicWrapper,
    mainWrapper,
    textWrapper,
    chevronIcon,
    locationIcon,
    bottomRadious,
    locationWrapper,
    visacardWrapper,
    masterCardWrapper,
    paymentMethodWrapper,
  } = styles;
  console.log('defaultCard>>>', defaultCard.card_id);
  console.log('paymentDetails>>', paymentDetails);
  console.log('cardDetail>>', cardDetail);
  return (
    <DataAvailability requesting={requesting} hasData={Boolean(cardDetail)}>
      <Container
        style={[
          paymentDetails?.transaction_status != 'completed' && primaryBg,
        ]}>
        {cardDetail && cardDetail?.list_card.length != 0 ? (
          <>
            <LuckyHeader
              title={
                <Text
                  text="Payment Details"
                  color="quaternary"
                  bold
                  style={titleSmall}
                />
              }
              left={
                <TouchableOpacity
                  style={{
                    left: 0,
                    width: 38,
                    height: 30,
                    alignItems: 'center',
                    position: 'absolute',
                    justifyContent: 'center',
                  }}
                  onPress={() => props.navigation.goBack()}>
                  <Icon type="FontAwesome5" name="times" style={icon} />
                </TouchableOpacity>
              }
            />

            <Content
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[mediumHPadding, wrapper, mainBg]}>
              <View style={[center, regularVMargin]}>
                <Text
                  text="Your transaction has been completed!"
                  style={textMedium}
                />
              </View>
              <View style={[row, fill, primaryBg, mainWrapper]}>
                <View>
                  <Text
                    // text={moment(service.booking_date).format('MMM DD')}
                    text={moment(paymentDetails?.created).format('DD-MMM')}
                    bold
                    style={titleRegular}
                  />
                  <Text
                    // text={moment(service.booking_time, 'HH-mm').format('hh:mm A')}
                    text={moment(paymentDetails?.created).format('hh:mm A')}
                    style={textLarge}
                  />
                </View>
                <View style={[fill, center, regularLMargin]}>
                  <View style={[fill, row, alignItemsCenter, smallRMargin]}>
                    <View style={[fill, row]}>
                      <View style={[PicWrapper]}>
                        <Image
                          source={
                            paymentDetails?.emp_image
                              ? {uri: paymentDetails?.emp_image}
                              : Images.anneonbeach
                          }
                          style={reviewer}
                        />
                      </View>
                      <View style={[smallLMargin]}>
                        <View style={[row, center, justifyContentBetween]}>
                          <Text
                            text={paymentDetails?.name}
                            bold
                            style={textMedium}
                          />
                        </View>
                        <Rating
                          readonly
                          imageSize={15}
                          style={rating}
                          ratingCount={5}
                          tintColor={Colors.Alabaster}
                          startingValue={paymentDetails?.review}
                        />
                      </View>
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
                <Text
                  text={`$ ${paymentDetails?.emp_cate_price}`}
                  style={textMedium}
                />
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
                {paymentDetails?.tip == null ? (
                  <Text
                    text={`$ ${parseInt(paymentDetails?.emp_cate_price)}`}
                    style={textMedium}
                  />
                ) : (
                  <Text
                    text={`$ ${
                      parseInt(paymentDetails?.emp_cate_price) +
                      parseInt(paymentDetails?.tip)
                    }`}
                    style={textMedium}
                  />
                )}
              </View>
              {paymentDetails?.transaction_status != 'completed' ? (
                <>
                  <View
                    style={[row, justifyContentBetween, paymentMethodWrapper]}>
                    <Text text="Payment Method" style={textMedium} />
                    <TouchableOpacity
                      style={[row, center]}
                      onPress={() => navigate('PaymentMethodScreen')}>
                      <Text
                        text="Select "
                        bold
                        color="quaternary"
                        style={textMedium}
                      />
                      <Icon
                        type="FontAwesome5"
                        name="chevron-right"
                        style={chevronIcon}
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={[
                      row,
                      textWrapper,
                      primaryBg,
                      masterCardWrapper,
                      {marginBottom: 40},
                    ]}>
                    <Image source={Images.mastercard} style={mastercard} />
                    <View style={[center, smallLMargin]}>
                      <Text
                        text={
                          dCard[0]?.card?.last4
                            ? dCard[0]?.card?.last4
                            : cardDetail?.list_card[0].card.last4
                        }
                        style={textMedium}
                      />
                      <Text
                        text="PRIMARY"
                        bold
                        color="quinary"
                        style={[textSmall]}
                      />
                    </View>
                  </View>
                  <View style={[fill, button]}>
                    <Button
                      text="Pay Now"
                      color="primary"
                      block
                      onPress={() =>
                        navigate('BookingCompleteMarkScreen', {paymentDetails})
                      }
                    />
                  </View>
                </>
              ) : null}
            </Content>
          </>
        ) : (
          <Container style={mainBg}>
            <LuckyHeader
              title={
                <Text
                  text="Payment Methods"
                  color="quaternary"
                  bold
                  style={titleSmall}
                />
              }
              left={
                <TouchableOpacity
                  style={{
                    left: 0,
                    width: 38,
                    height: 30,
                    alignItems: 'center',
                    position: 'absolute',
                    justifyContent: 'center',
                  }}
                  onPress={() => props.navigation.goBack()}>
                  <Icon type="FontAwesome5" name="times" style={icon} />
                </TouchableOpacity>
              }
            />

            <View style={line} />
            <Content
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[fill, mediumHPadding, mainBg, wrapper]}>
              {cardDetail &&
                cardDetail?.list_card.map((card, i) => (
                  <View
                    style={[row, textWrapper, primaryBg, masterCardWrapper]}>
                    <Image source={Images.mastercard} style={mastercard} />
                    <View style={[center, smallLMargin]}>
                      <Text text={card?.card.last4} style={textMedium} />
                      <Text
                        text="PRIMARY"
                        color="quinary"
                        style={[textSmall]}
                      />
                    </View>
                    <Image source={Images.check} style={check} />
                  </View>
                ))}
              <View style={mediumTMargin}>
                <Button
                  text="Add New"
                  style={smallRMargin}
                  textStyle={buttonText}
                  redBorder
                  block
                  color="secondary"
                  onPress={() => navigate('AddCreditCardScreen')}
                />
              </View>
              {/* {Platform.OS == 'ios' ? (
              <>
                <View style={[center, mediumTMargin]}>
                  <Text text="OR" bold style={{fontSize: 16}} />
                </View>
                <View style={mediumTMargin}>
                  <Button
                    text={'PAY WITH APPLE PAY'}
                    style={smallRMargin}
                    textStyle={buttonText}
                    redBorder
                    block
                    onPress={() => onApplePay()}
                  />
                </View>
              </>
            ) : null}
            <View style={mediumTMargin}>
              <Button
                text={'PAY'}
                style={smallRMargin}
                textStyle={buttonText}
                redBorder
                block
                onPress={() => onPay()}
              />
            </View>*/}
              <View style={[center, visacardWrapper]}>
                <Image source={Images.visacard} />
              </View>
              <View style={[fill, button]}>
                <Button
                  text="Proceed"
                  color="primary"
                  block
                  disabled={!cardDetail}
                  onPress={() => navigate('BookingCompleteMarkScreen')}
                />
              </View>
            </Content>
          </Container>
        )}
      </Container>
    </DataAvailability>
  );
};

const mapStateToProps = (state) => ({
  cardDetail: state.cardDetail.cardDetail,
  defaultCard: state.card.defaultCard,
  paymentDetails: state.notificationsData.paymentDetails,
});

const mapDispatchToProps = (dispatch) => ({
  getCardData: () => dispatch(getCardData()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PaymentDetailScreen);
