import React, {useEffect, useState} from 'react';
import {View, Image, SafeAreaView, StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {Card, Container, Content, Icon} from 'native-base';
import {Rating} from 'react-native-ratings';
import moment from 'moment';
// components
import {Text, Input, Button, Line} from 'src/components';

// //actions
// import {getEmployeeData} from './redux/actions';

// theme
import {Layout, Images, Gutters, Colors, Fonts} from 'src/theme';

// styles
import styles from './styles';

const BookingCompleteScreen = (props) => {
  const {
    route: {
      params: {notification, tip},
    },
    navigation: {navigate},
  } = props;

  //   useEffect(() => {
  //     props.getEmployeeData();
  //   }, []);

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
    regularVMargin,
    smallRMargin,
    regularLMargin,
    smallLMargin,
    mediumVPadding,
  } = Gutters;
  const {
    icon,
    primaryBg,
    reviewer,
    rating,
    button,
    mainBg,
    wrapper,
    PicWrapper,
    mainWrapper,
    marginT1x,
    textWrapper,
    bottomRadious,
    locationIcon,
    locationWrapper,
  } = styles;
  console.log('notification >>>>>', notification);
  console.log('tip >>>>>', tip);
  return (
    <SafeAreaView style={{flex: 1}}>
      <Container style={mainBg}>
        <View
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
        </View>
        <Line />
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[mediumHPadding, mainBg, wrapper]}>
          <View style={[center, regularVMargin]}>
            <Text
              text="Your transaction has been mark as
            completed by the service."
              style={[textMedium, textCenter]}
            />
          </View>
          <View style={[row, fill, primaryBg, mainWrapper]}>
            <View>
              <Text
                text={moment(notification.created).format('DD-MMM')}
                bold
                b
                style={titleRegular}
              />
              <Text
                text={moment(notification.created).format('hh:mm A')}
                style={textLarge}
              />
            </View>
            <View style={[center, regularLMargin]}>
              <View style={[row, alignItemsCenter, smallRMargin]}>
                <View style={[PicWrapper]}>
                  <Image
                    source={{uri: notification.emp_image}}
                    style={reviewer}
                  />
                </View>
                <View style={smallLMargin}>
                  <View style={[row, center, justifyContentBetween]}>
                    <Text text={notification.name} bold style={textMedium} />
                  </View>
                  <Rating
                    readonly
                    ratingCount={5}
                    imageSize={15}
                    style={rating}
                    startingValue={notification.review}
                    tintColor={Colors.Alabaster}
                  />
                </View>
              </View>
              <View style={[row, center, locationWrapper]}>
                <Icon name="location" style={locationIcon} />
                <Text text={notification.emp_address} />
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
            <Text text={notification.emp_category} style={textMedium} />
            <Text text={notification.emp_cate_price} style={textMedium} />
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
            <Text
              text={parseInt(notification.emp_cate_price) + parseInt(tip)}
              style={textMedium}
            />
          </View>
          <View style={{marginTop: 117}}>
            <Text
              text="Would like to give a review?"
              style={[textMedium, textCenter]}
            />
          </View>
          <View style={[fill, button]}>
            <Button
              block
              text="Ok"
              color="primary"
              onPress={() =>
                navigate('BookingCompleteReviewScreen', {notification})
              }
            />
          </View>
        </Content>
      </Container>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookingCompleteScreen);
