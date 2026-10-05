import React, {useState} from 'react';
import {View, Image, TextInput, StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {Container, Content, Icon} from 'native-base';
import {Rating} from 'react-native-ratings';
import moment from 'moment';

// components
import {Text, Button, Line} from 'src/components';

// //actions
import {postReview} from './redux/actions';

// theme
import {Layout, Gutters, Colors, Fonts} from 'src/theme';

// styles
import styles from './styles';

const BookingCompleteReviewScreen = (props) => {
  const {
    user,
    customerReview,
    route: {
      params: {notification},
    },
    navigation: {navigate},
  } = props;

  //   useEffect(() => {
  //     props.getEmployeeData();
  //   }, []);

  const [rating, setRating] = useState(0);
  const [coment, setComent] = useState('');

  const ratingCompleted = (rating) => {
    setRating(rating);
  };

  const onSubmit = () => {
    const reviewData = {
      comments: coment,
      rating: rating,
      employee: notification.emp_id,
      user: user.id,
    };

    props.postReview(reviewData);
  };

  const {titleRegular, textLarge, textMedium} = Fonts;
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
    mediumHPadding,
    regularLMargin,
    mediumBPadding,
    mediumVPadding,
  } = Gutters;
  const {
    icon,
    input,
    review,
    mainBg,
    button,
    wrapper,
    reviewer,
    primaryBg,
    PicWrapper,
    mainWrapper,
    ratingStyle,
    locationIcon,
    ratingReview,
    locationWrapper,
  } = styles;

  return (
    <Container style={mainBg}>
      <View
        style={[
          row,
          mainBg,
          mediumHPadding,
          mediumVPadding,
          alignItemsCenter,
          justifyContentCenter,
        ]}>
        {/* <StatusBar backgroundColor={Colors.white} barStyle="dark-content" /> */}
        <Icon
          type="FontAwesome5"
          name="arrow-left"
          style={icon}
          onPress={() => props.navigation.goBack()}
        />
        <Text text="Review" bold color="quaternary" style={titleRegular} />
      </View>
      <Line />
      <Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          mainBg,
          wrapper,
          mediumHPadding,
          mediumBPadding,
        ]}>
        <View style={[row, fill, primaryBg, mainWrapper, mediumTMargin]}>
          <View>
            <Text
              text={moment(notification.created).format('DD-MMM')}
              bold
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
                  startingValue={notification.review}
                  ratingCount={5}
                  imageSize={15}
                  style={ratingStyle}
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
        <Rating
          type="custom"
          ratingBackgroundColor="#c8c7c8"
          fractions
          ratingCount={5}
          imageSize={32}
          onFinishRating={ratingCompleted}
          style={ratingReview}
          tintColor={Colors.white}
        />
        <View style={review}>
          <TextInput
            value={coment}
            onChangeText={(val) => setComent(val)}
            placeholderTextColor={'#9E9E9E'}
            numberOfLines={10}
            placeholder="Write a review"
            multiline={true}
            style={input}
          />
        </View>
        <View style={[fill, button]}>
          <Button text="Submit" color="primary" block onPress={onSubmit} />
        </View>
      </Content>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  user: state.login.user,
  customerReview: state.review.review,
});

const mapDispatchToProps = (dispatch) => ({
  postReview: (data) => dispatch(postReview(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookingCompleteReviewScreen);
