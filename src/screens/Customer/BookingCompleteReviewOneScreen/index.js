import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  TextInput,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {Container, Content, Icon} from 'native-base';
import {Rating} from 'react-native-ratings';
// components
import {Text, Button, Input, Line} from 'src/components';

// //actions
// import {getEmployeeData} from './redux/actions';

// theme
import {Layout, Images, Gutters, Colors, Fonts} from 'src/theme';

// styles
import styles from './styles';

const BookingCompleteReviewOneScreen = (props) => {
  const {
    cardDetail,
    navigation: {navigate},
  } = props;

  // useEffect(() => {
  //   props.getEmployeeData();
  // }, []);

  const [tip, setTip] = useState('');
  const [reviews, setReviews] = useState('');

  const {titleRegular, textSmall, textLarge, textMedium} = Fonts;
  const {
    row,
    fill,
    center,
    alignItemsCenter,
    justifyContentCenter,
    justifyContentBetween,
  } = Layout;
  const {
    smallRMargin,
    smallLMargin,
    mediumTMargin,
    regularLMargin,
    mediumHPadding,
    mediumBPadding,
    regularBMargin,
    mediumVPadding,
  } = Gutters;
  const {
    icon,
    check,
    input,
    button,
    review,
    mainBg,
    wrapper,
    reviewer,
    primaryBg,
    mastercard,
    PicWrapper,
    textWrapper,
    mainWrapper,
    ratingReview,
    masterCardWrapper,
  } = styles;

  return (
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
        <Icon type="FontAwesome5" name="arrow-left" style={icon} />
        <Text text="Review" bold color="quaternary" style={titleRegular} />
      </View>
      <Line />
      <Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          mediumHPadding,
          mainBg,
          wrapper,
          mediumBPadding,
        ]}>
        <View style={[row, fill, primaryBg, mainWrapper, mediumTMargin]}>
          <View>
            <Text text="Mar 12" bold style={titleRegular} />
            <Text text="6:30 PM" style={textLarge} />
          </View>
          <View style={[center, regularLMargin]}>
            <View style={[row, alignItemsCenter, smallRMargin]}>
              <View style={[PicWrapper]}>
                <Image source={Images.mark} style={reviewer} />
              </View>
              <View style={smallLMargin}>
                <View style={[row, center, justifyContentBetween]}>
                  <Text text="Anne Glim" bold style={textMedium} />
                </View>
                <Text text="Catagory" />
              </View>
            </View>
          </View>
        </View>
        <Rating
          type="custom"
          ratingBackgroundColor="#c8c7c8"
          fractions
          ratingCount={5}
          imageSize={32}
          style={ratingReview}
          tintColor={Colors.white}
        />
        <View style={review}>
          <TextInput
            value={reviews}
            onChangeText={(val) => setReviews(val)}
            placeholderTextColor={'#9E9E9E'}
            numberOfLines={10}
            placeholder="Write a review"
            multiline={true}
            style={input}
          />
        </View>
        <View style={[mediumTMargin, regularBMargin]}>
          <Input
            placeholder="Service Tip"
            value={tip}
            onChangeText={(val) => setTip(val)}
          />
        </View>
        <View style={[row, justifyContentBetween]}>
          <Text
            text="Payment Method"
            style={{fontSize: 16, color: '#300C1C'}}
          />
          <TouchableOpacity style={[row, alignItemsCenter]}>
            <Text text="Select" style={{fontSize: 16, color: '#FD1B1B'}} bold />
            <Icon
              type="FontAwesome5"
              name="chevron-right"
              style={{fontSize: 14, color: '#FD1B1B', marginLeft: 4}}
            />
          </TouchableOpacity>
        </View>
        <View style={[row, textWrapper, primaryBg, masterCardWrapper]}>
          <Image source={Images.mastercard} style={mastercard} />
          <View style={[center, smallLMargin]}>
            <Text text={cardDetail && cardDetail.last4} style={textMedium} />
            <Text text="PRIMARY" bold color="quinary" style={[textSmall]} />
          </View>
          <Image source={Images.check} style={check} />
        </View>
        <View style={[button]}>
          <Button text="Submit" color="primary" block />
        </View>
      </Content>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  cardDetail: state.cardDetail.cardDetail,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, null)(BookingCompleteReviewOneScreen);
