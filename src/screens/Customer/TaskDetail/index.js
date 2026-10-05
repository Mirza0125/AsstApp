import React, {useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';
import Database from './database';
import {Container, Icon} from 'native-base';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
// components
import {Text, Map, Markers, LuckyHeader} from '../../../components';

// theme
import {Layout, Images, Gutters, Fonts} from 'src/theme';

//action
import {getEmployeeLocation, getCategoryDetail} from './redux/actions';
// styles
import styles from './styles';

const TaskDetail = (props) => {
  const {
    user,
    category,
    location,
    navigation: {navigate},
    route: {
      params: {item},
    },
  } = props;

  useEffect(() => {
    props.getEmployeeLocation(item.employee);
    props.getCategoryDetail(item.id);
  }, []);

  const openChatScreen = async (data) => {
    Database.shared().init(
      user.id,
      user.first_name ? user.first_name : user.name,
      user.image,
    );
    console.log('openchatData', data);
    let chat = await Database.shared().addChat(data);

    navigate('Messages', {
      chat: chat,
    });
  };
  // setInterval(() => {
  //   props.getEmployeeLocation(item.employee);
  // }, 2000);

  // const position = location[0]?.location.split('(');
  // const latLong = position[1]?.split(' ');
  // const long = String(latLong[1]?.slice(0, -1));
  // const lat = latLong[0]?.slice(0);

  const {titleRegular, textMedium, textRegular, textRight, titleSmall} = Fonts;
  const {
    row,
    fill,
    center,
    alignItemsCenter,
    justifyContentCenter,
    justifyContentBetween,
  } = Layout;
  const {
    smallVMargin,
    smallLMargin,
    smallBMargin,
    smallTMargin,
    smallHPadding,
    mediumBPadding,
    mediumHPadding,
    mediumVPadding,
  } = Gutters;
  const {
    map,
    tag,
    line,
    icon,
    note,
    image,
    mainBg,
    message,
    tagInput,
    topWrapper,
  } = styles;

  console.log('location Res>>', location);
  console.log('ITEM>>', item);
  console.log('user', user);
  // console.log('answers', category);

  // console.log('position', position);
  // console.log('latLong', latLong);
  // console.log('long', long);
  // console.log('lat', lat);

  return (
    <SafeAreaView style={fill}>
      <LuckyHeader
        title={
          <Text
            text="Service Details"
            color="quaternary"
            bold
            style={titleSmall}
          />
        }
        titleStyle={[alignItemsCenter]}
        left={
          <TouchableOpacity
            style={{
              left: 20,
              width: 38,
              height: 30,
              alignItems: 'center',
              position: 'absolute',
              justifyContent: 'center',
            }}
            onPress={() => props.navigation.goBack()}>
            <Icon type="FontAwesome" name="times" style={{fontSize: 20}} />
          </TouchableOpacity>
        }
      />
      <Container style={[fill, mainBg]}>
        <View style={line} />

        <View style={[row, mediumHPadding, topWrapper]}>
          <Image
            source={
              item?.employee_photo ? {uri: item.employee_photo} : Images.nopic
            }
            style={image}
          />
          <View style={[fill, smallBMargin]}>
            <View
              style={[
                row,
                smallLMargin,
                alignItemsCenter,
                justifyContentBetween,
              ]}>
              <Text
                text={item?.employee_name ? item?.employee_name : 'Mark'}
                bold
                style={textMedium}
              />
            </View>
            <View style={[smallLMargin, justifyContentCenter]}>
              <Text
                text={
                  item?.employee_category_tittle
                    ? item?.employee_category_tittle
                    : 'CATEGORY'
                }
                bold
                color="quaternary"
                style={[smallVMargin, textRegular]}
              />
              <TouchableOpacity onPress={() => openChatScreen(item)}>
                <Image source={Images.message} style={message} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <ScrollView
          horizontal={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[mediumHPadding, mediumBPadding]}>
          <View style={[row, smallBMargin]}>
            <Text text="Status: " style={textMedium} />
            <Text
              text="On it's way"
              color="quaternary"
              bold
              style={textMedium}
            />
          </View>
          <View style={map}>
            <MapView
              style={[fill]}
              provider={PROVIDER_GOOGLE}
              mapType="standard"
              initialRegion={{
                latitude: 30.360781,
                longitude: 76.575813,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
              <Markers
                // title="title"
                // description="desc"
                coordinates={{
                  // latitude: Number(lat),
                  // longitude: Number(long),
                  latitude: 30.360781,
                  longitude: 76.575813,
                }}
              />
            </MapView>
          </View>
          <View style={smallTMargin}>
            <View style={tagInput}>
              <Text text="service" color="quinary" style={smallLMargin} />
              <View style={[row, center, justifyContentBetween, smallHPadding]}>
                <Text
                  text={
                    item?.employee_category_tittle
                      ? item?.employee_category_tittle
                      : 'Service'
                  }
                  style={[textMedium]}
                />
                <Icon type="FontAwesome" name="tag" style={tag} />
              </View>
            </View>
            <View style={tagInput}>
              <Text text="Service Price" color="quinary" style={smallLMargin} />
              <View style={[row, center, justifyContentBetween, smallHPadding]}>
                <Text
                  text={
                    item?.category_price
                      ? `$ ${item?.category_price}`
                      : '$ Price'
                  }
                  style={[textMedium]}
                />
                <Icon type="FontAwesome" name="dollar" style={tag} />
              </View>
            </View>
            <View style={tagInput}>
              <Text text="Address" color="quinary" style={smallLMargin} />
              <View style={[row, center, justifyContentBetween, smallHPadding]}>
                <Text
                  text={item?.address ? item?.address : 'Brown Bear Drive'}
                  style={[textMedium]}
                />
                <Icon type="FontAwesome" name="map-marker" style={tag} />
              </View>
            </View>
            <View style={tagInput}>
              <Text text="Date" color="quinary" style={smallLMargin} />
              <View style={[row, center, justifyContentBetween, smallHPadding]}>
                <Text
                  text={item?.booking_date ? item?.booking_date : 'Date ?'}
                  style={[textMedium]}
                />
                <Icon type="FontAwesome" name="calendar" style={tag} />
              </View>
            </View>
            <View style={tagInput}>
              <Text text="Time" color="quinary" style={smallLMargin} />
              <View style={[row, center, justifyContentBetween, smallHPadding]}>
                <Text
                  text={item?.booking_time ? item?.booking_time : 'Time ?'}
                  style={[textMedium]}
                />
                <Icon type="FontAwesome5" name="clock" style={tag} />
              </View>
            </View>
            {category &&
              category?.map((cat, i) => (
                <View style={tagInput} key={i}>
                  <Text
                    text={cat?.q_type ? cat?.q_type : 'House Type'}
                    color="quinary"
                    style={smallLMargin}
                  />
                  <View
                    style={[row, center, justifyContentBetween, smallHPadding]}>
                    <Text
                      text={cat?.answer ? cat.answer : 'Townhome'}
                      style={[textMedium]}
                    />
                    {/* <Icon
                    type="FontAwesome"
                    name={(i === 0 && 'home') || (i == 1 && 'bed')}
                    style={tag}
                  /> */}
                    <Image
                      source={{uri: cat.q_icon}}
                      style={{width: 20, height: 20}}
                    />
                  </View>
                </View>
              ))}
            {/* <View style={tagInput}>
              <Text text="House Type" color="quinary" style={smallLMargin} />
              <View style={[row, center, justifyContentBetween, smallHPadding]}>
                <Text text="Townhome" style={[textMedium]} />
                <Icon type="FontAwesome" name="home" style={tag} />
              </View>
            </View>
            <View style={tagInput}>
              <Text
                text="Number of rooms"
                color="quinary"
                style={smallLMargin}
              />
              <View style={[row, center, justifyContentBetween, smallHPadding]}>
                <Text text="4 Rooms" style={[textMedium]} />
                <Icon type="FontAwesome5" name="bed" style={tag} />
              </View>
            </View> */}

            <View style={note}>
              <Text text="Note" color="quinary" style={[textMedium]} />
              <Text
                text={
                  item?.comments
                    ? item?.comments
                    : 'Health precautionary measures'
                }
                style={[textMedium]}
              />
            </View>
          </View>
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  user: state.login.user,
  profile: state.profile.profile,
  location: state.location.location,
  category: state.location.categoryDetail,
});

const mapDispatchToProps = (dispatch) => ({
  getEmployeeLocation: (id) => dispatch(getEmployeeLocation(id)),
  getCategoryDetail: (id) => dispatch(getCategoryDetail(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetail);
