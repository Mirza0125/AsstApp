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
import {showMessageFailure} from '../../../utils/alerts';
import {Rating} from 'react-native-ratings';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';

//actions
import {getEmployeeReview, getEmployeePhotos} from './redux/actions';

// components
import {
  Text,
  Button,
  IconCard,
  LuckyHeader,
  CustomerReview,
  DataAvailability,
} from '../../../components';

// theme
import {Layout, Images, Gutters, Colors, Fonts} from 'src/theme';

// styles
import styles from './styles';

//Database
import Database from './database';
import firestore from '@react-native-firebase/firestore';
const ServiceProfile = (props) => {
  const {
    user,
    profile,
    requesting,
    userPhotos,
    employeeReview,
    navigation: {navigate},
  } = props;

  const {textRegular, titleRegular, textMedium, textCenter} = Fonts;
  const {
    row,
    fill,
    center,
    alignItemsCenter,
    justifyContentAround,
    justifyContentBetween,
  } = Layout;
  const {
    smallLMargin,
    smallRMargin,
    smallBMargin,
    smallVMargin,
    smallTMargin,
    mediumHPadding,
  } = Gutters;

  const {
    image,
    button,
    goBack,
    photos,
    message,
    flexWrap,
    heartIcon,
    ratingStyle,
    selectedStyle,
    profileWrapper,
    indicatorStyle,
    reviewTabWrapper,
    servicesTabWrapper,
  } = styles;

  const [selectedItem, setSelectedItem] = useState([]);
  const [dataItem, setDataItem] = useState([]);

  const openChatScreen = async (data) => {
    await Database.shared().init(
      user.id,
      user.name ? user.name : user.first_name,
      user.image,
    );
    console.log('openchatData', data);
    const chat = await Database.shared().addChat(data);

    navigate('Messages', {
      chat: chat,
    });
  };

  useEffect(() => {
    profile && props.getEmployeeReview(profile.id);
    profile && props.getEmployeePhotos(profile);
  }, []);

  useEffect(() => {
    setDataItem(profile.employee_category_detail);
  }, [profile]);

  const onSelect = (item) => {
    let array = [...dataItem];
    if (selectedItem[0]?.id === item.id) {
      setSelectedItem([]);
    } else {
      setSelectedItem(array.filter((index) => index === item));
    }
  };

  const onPressBook = () => {
    if (selectedItem.length > 0) {
      navigate('BookingForm', {
        category: selectedItem,
      });
    } else {
      showMessageFailure('Please select one service first');
    }
  };

  const dimensions = useWindowDimensions();

  const FirstRoute = () => (
    <View style={[fill, smallTMargin, servicesTabWrapper]}>
      <View style={[center, smallVMargin]}>
        <Text text="Select" bold style={titleRegular} />
      </View>
      <Content showsVerticalScrollIndicator={false}>
        <View style={[row, smallVMargin, flexWrap]}>
          {profile.employee_category_detail.map((item, i) => (
            <IconCard
              key={i}
              style={selectedItem.includes(item) && selectedStyle}
              source={{uri: item.service.image}}
              text={item.service.name}
              onPress={() => onSelect(item, i)}
            />
          ))}
        </View>
      </Content>
      <Button
        text="Book"
        style={button}
        color="primary"
        block
        onPress={() => onPressBook()}
      />
    </View>
  );

  // console.log('userPhoto', userPhotos);
  // console.log('profile', profile);
  // console.log('user', user);

  const SecondRoute = () => (
    <View style={[fill, smallTMargin, servicesTabWrapper]}>
      <Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor: Colors.Alabaster,
          paddingTop: 15,
        }}>
        <View style={[row, smallBMargin, smallLMargin, flexWrap]}>
          {userPhotos &&
            userPhotos.map((item, i) => (
              <Image
                key={i}
                source={{uri: item.profile_image}}
                style={photos}
              />
            ))}
        </View>
      </Content>
    </View>
  );

  const ThirdRoute = () => (
    <Content
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flex: 1,
        paddingTop: 15,
        backgroundColor: Colors.Alabaster,
      }}>
      <View style={[fill, reviewTabWrapper]}>
        {employeeReview &&
          employeeReview.map((item, i) => (
            <CustomerReview
              key={i}
              rating={item.rating}
              readonly
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

  return (
    <SafeAreaView style={fill}>
      <DataAvailability requesting={requesting} hasData={Boolean(profile)}>
        <Container>
          <View>
            <LuckyHeader
              left={
                <Icon type="FontAwesome5" name="arrow-left" style={goBack} />
              }
              onPress={() => props.navigation.goBack()}
              title={
                <Text
                  text="Service Profile"
                  bold
                  style={[titleRegular, textCenter]}
                />
              }
            />
            <View style={[row, smallVMargin, mediumHPadding, profileWrapper]}>
              <Image source={{uri: profile && profile.photo}} style={image} />
              <View style={[fill, smallBMargin]}>
                <View
                  style={[
                    row,
                    smallLMargin,
                    alignItemsCenter,
                    justifyContentBetween,
                  ]}>
                  <Text
                    text={profile && profile.name}
                    bold
                    style={textMedium}
                  />
                  <Icon type="FontAwesome5" name="heart" style={heartIcon} />
                </View>
                <View style={[row, smallLMargin, alignItemsCenter]}>
                  <Rating
                    readonly
                    fractions
                    startingValue={profile && profile.review}
                    ratingCount={5}
                    imageSize={14}
                    style={ratingStyle}
                  />
                  <View style={[row, smallLMargin]}>
                    <Text text="Clients" color="quinary" style={textRegular} />
                    <Text
                      text={profile && profile.client}
                      bold
                      style={smallLMargin}
                    />
                  </View>
                </View>
                <View style={smallLMargin}>
                  <Text
                    text={profile && profile.description}
                    style={[smallVMargin, textRegular]}
                  />
                  <TouchableOpacity onPress={() => openChatScreen(profile)}>
                    {/* <Image source={Images.message} style={message} /> */}
                    <Text
                      text="Message"
                      color="quaternary"
                      bold
                      style={{fontSize: 14}}
                    />
                  </TouchableOpacity>
                </View>
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
      </DataAvailability>
    </SafeAreaView>
  );
};
const mapStateToProps = (state) => ({
  user: state.login.user,
  requesting: state.employeeService.requesting,
  profile: state.profile.profile,
  employeeReview: state.employeeService.employeeReview,
  userPhotos: state.employeeService.employeePhotos,
});

const mapDispatchToProps = (dispatch) => ({
  getEmployeeReview: (id) => dispatch(getEmployeeReview(id)),
  getEmployeePhotos: (profile) => dispatch(getEmployeePhotos(profile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ServiceProfile);
