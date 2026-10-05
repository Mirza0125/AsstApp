import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  useWindowDimensions,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import moment from 'moment';
import {Container, Content, Icon} from 'native-base';
import {Rating} from 'react-native-ratings';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';

//actions
import {getEmployeeReview, getEmployeePhotos} from './redux/actions';

// components
import {
  Text,
  Button,
  ServiceCard,
  ServiceDetail,
  CustomerReview,
} from '../../../components';

// theme
import {Layout, Images, Gutters, Colors, Fonts} from 'src/theme';

// styles
import styles from './styles';

const ServiceProfileCheckout = (props) => {
  const {profile, userPhotos, employeeReview} = props;

  useEffect(() => {
    props.getEmployeeReview(profile && profile.id);
    props.getEmployeePhotos(profile && profile);
  }, []);

  const {textRegular, titleRegular, textMedium, textCenter} = Fonts;
  const {
    row,
    fill,
    justifyContentBetween,
    justifyContentCenter,
    alignItemsCenter,
  } = Layout;
  const {
    mediumHPadding,
    largeRMargin,
    smallLMargin,
    smallBMargin,
    mediumTMargin,
    smallVMargin,
    smallTMargin,
    smallBPadding,
  } = Gutters;

  const {
    icon,
    title,
    image,
    heartIcon,
    message,
    ratingStyle,
    profileWrapper,
    indicatorStyle,
    reviewTabWrapper,
    servicesTabWrapper,
    flexWrap,
    button,
    goBack,
  } = styles;

  const dimensions = useWindowDimensions();

  const FirstRoute = () => (
    <View style={[fill, smallTMargin, servicesTabWrapper]}>
      <View style={title}>
        <Text text="House Cleaning" bold />
      </View>
      <Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={smallBPadding}>
        <View style={[row, fill]}>
          <ServiceCard source={Images.mark} />

          <View style={[fill, {marginLeft: 17}]}>
            <View style={{marginBottom: 15}}>
              <ServiceDetail
                source={Images.checkedyellow}
                date="17 November 2020"
                time="9 AM - 11 AM"
                amount="$34.0"
              />
            </View>
            <View style={{marginBottom: 15}}>
              <ServiceDetail
                source={Images.unchecked}
                date="17 November 2020"
                time="9 AM - 11 AM"
                amount="$20.0"
              />
            </View>
            <ServiceDetail
              source={Images.unchecked}
              date="17 November 2020"
              time="9 AM - 11 AM"
              amount="$12.0"
            />
          </View>
        </View>
      </Content>
      <Button text="Checkout" style={button} color="primary" block />
    </View>
  );

  const SecondRoute = () => (
    <View style={[fill, smallTMargin, servicesTabWrapper]}>
      <Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor: Colors.Alabaster,
          paddingTop: 15,
        }}>
        <View style={[row, justifyContentBetween, smallVMargin, flexWrap]}>
          {userPhotos &&
            userPhotos.map((item, i) => (
              <IconCard key={i} source={{uri: item.profile_image}} />
            ))}
        </View>
      </Content>
    </View>
  );

  const ThirdRoute = () => (
    <Content
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        backgroundColor: Colors.Alabaster,
        paddingTop: 15,
      }}>
      <View style={[fill, reviewTabWrapper]}>
        {employeeReview &&
          employeeReview.map((item, i) => (
            <CustomerReview
              key={i}
              rating={item.rating}
              time={moment(employeeReview.created_at).format('HH-MM A')}
              date={moment(employeeReview.created_at).format('DD-MMMM-YYYY')}
              source={{uri: item.image}}
              name={item.name}
              text={item.comments}
            />
          ))}
      </View>
    </Content>
  );

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Services'},
    {key: 'second', title: 'Photos'},
    {key: 'third', title: 'Reviews'},
  ]);

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
    third: ThirdRoute,
  });

  const ratingCompleted = (rating) => {
    console.log('Rating is: ' + rating);
  };
  console.log('userPhotos', userPhotos);
  return (
    <SafeAreaView style={fill}>
      <Container>
        <View
          style={[row, alignItemsCenter, justifyContentCenter, mediumHPadding]}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={[largeRMargin, icon]}>
            <Icon type="FontAwesome5" name="arrow-left" style={goBack} />
          </TouchableOpacity>
          <Text
            text="Service Profile"
            bold
            style={[titleRegular, textCenter]}
          />
        </View>
        <View
          style={[
            row,
            smallVMargin,
            mediumTMargin,
            mediumHPadding,
            profileWrapper,
          ]}>
          <Image
            source={profile ? {uri: profile.photo} : Images.mark}
            style={image}
          />
          <View style={[fill, smallBMargin]}>
            <View
              style={[
                row,
                alignItemsCenter,
                justifyContentBetween,
                smallLMargin,
              ]}>
              <Text
                text={profile ? profile.name : 'Test'}
                bold
                style={textMedium}
              />
              <Icon type="FontAwesome5" name="heart" style={heartIcon} />
            </View>
            <View style={[row, smallLMargin, alignItemsCenter]}>
              <Rating
                fractions
                startingValue={profile && profile.review}
                ratingCount={5}
                imageSize={14}
                onFinishRating={ratingCompleted}
                style={ratingStyle}
              />
              <View style={[row, smallLMargin]}>
                <Text text="Clients" color="quinary" style={textRegular} />
                <Text
                  text={profile ? profile.client : '00'}
                  bold
                  style={smallLMargin}
                />
              </View>
            </View>
            <View style={smallLMargin}>
              <Text
                text={
                  profile ? profile.description : 'This is test description'
                }
                style={[smallVMargin, textRegular]}
              />
              <Image source={Images.message} style={message} />
            </View>
          </View>
        </View>

        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: dimensions.width}}
          renderTabBar={renderTabBar}
        />
      </Container>
    </SafeAreaView>
  );
};
const mapStateToProps = (state) => ({
  requesting: state.employeeService.requesting,
  profile: state.profile.profile,
  employeeReview: state.employeeService.employeeReview,
  userPhotos: state.employeeService.employeePhotos,
});

const mapDispatchToProps = (dispatch) => ({
  getEmployeeReview: (id) => dispatch(getEmployeeReview(id)),
  getEmployeePhotos: (profile) => dispatch(getEmployeePhotos(profile)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ServiceProfileCheckout);
