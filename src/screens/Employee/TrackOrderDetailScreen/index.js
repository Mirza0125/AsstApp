import React, {useState} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {Container, Content, Icon} from 'native-base';
import Toast from 'react-native-toast-message';
import Database from './database';
import {
  View,
  Image,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

// components
import {
  Map,
  Text,
  Button,
  Markers,
  RNModal,
  IdentityCard,
  LuckyHeader,
} from 'src/components';

//action
import {postTaskDetail} from './redux/actions';
import {postNotification} from '../../../redux/actions';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

// theme
import {Layout, Images, Gutters, Colors, Global, Fonts} from 'src/theme';

// styles
import styles from './styles';

const TrackOrderDetailScreen = (props) => {
  const {
    user,
    navigation: {navigate},
    route: {
      params: {item},
    },
  } = props;

  const [modalVisible, setModalVisible] = useState(false);

  const onConfirm = async () => {
    const data = {
      status: 'completed',
    };
    const notificationMessage = {
      sender: user.id,
      receiver: item.u_id,
      employee_category: item.employee_category,
      title: 'completed',
      message: `${
        user.name ? user.name : user.first_name
      } mark transaction as completed`,
    };
    await props.postNotification(notificationMessage);
    await props.postTaskDetail(data, item.id);
    Toast.show({
      text1: 'Mark as completed successfully!',
      type: 'success',
      position: 'bottom',
      bottomOffset: 40,
    });
    setModalVisible(false);
  };

  const openChatScreen = async (data) => {
    Database.shared().init(
      user.id,
      user.name ? user.name : user.first_name,
      item.user_photo,
    );
    console.log('openchatData', data);
    let chat = await Database.shared().addChat(data);

    navigate('Messages', {
      chat: chat,
    });
  };

  const {secondaryBg} = Global;
  const {titleRegular, textRegular, textMedium} = Fonts;

  const {
    fill,
    row,
    center,
    justifyContentBetween,
    justifyContentCenter,
    alignItemsCenter,
  } = Layout;
  const {
    smallRMargin,
    smallBMargin,
    smallLMargin,
    smallVMargin,
    smallVPadding,
    smallHPadding,
    regularLMargin,
    mediumHPadding,
    mediumTPadding,
    regularBPadding,
    regularHPadding,
    mediumBPadding,
  } = Gutters;
  const {
    map,
    note,
    tag,
    icon,
    line,
    image,
    input,
    mainBg,
    message,
    reviewer,
    modalStyle,
    modalHeader,
    topWrapper,
    PicWrapper,
    mainWrapper,
    locationIcon,
    locationWrapper,
  } = styles;
  return (
    <SafeAreaView style={fill}>
      <Container style={mainBg}>
        {/* <StatusBar backgroundColor={Colors.white} barStyle="dark-content" /> */}
        <LuckyHeader
          left={<Icon type="FontAwesome5" name="arrow-left" style={icon} />}
          title={
            <Text
              text="Service Details"
              bold
              color="quaternary"
              style={titleRegular}
            />
          }
          titleStyle={[alignItemsCenter]}
          onPress={() => props.navigation.goBack()}
        />
        <View style={line} />
        <View style={[row, mediumHPadding, topWrapper]}>
          <Image
            source={item.user_photo ? {uri: item.user_photo} : Images.nopic}
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
              <Text text={item.user} bold style={textMedium} />
            </View>
            <View style={[smallLMargin, justifyContentCenter]}>
              <Text
                text={item.employee_category_tittle.toUpperCase()}
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
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[mediumHPadding, mediumBPadding]}>
          {/* <View style={[regularVMargin, card]}>
            <IdentityCard
              imageUrl={item.user_photo}
              name={item.user}
              rating={item.avg_review}
            />
          </View> */}

          <View style={[row, smallBMargin]}>
            <Text text="Status: " style={textMedium} />
            <Text
              text="Waiting for schedule"
              color="quaternary"
              bold
              style={textMedium}
            />
          </View>
          <View style={map}>
            <MapView
              style={fill}
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

          <View style={fill}>
            <Button
              text="GPS"
              color="primary"
              style={{width: 140, alignSelf: 'flex-end', marginVertical: 10}}
              block
              //onPress={() => setModalVisible(false)}
            />
            <Text
              text="GPS is available during the schedule"
              color="quinary"
              style={[textMedium, {marginVertical: 5, textAlign: 'center'}]}
            />
          </View>
          <View style={[input]}>
            <Text text="Address" color="quinary" style={smallLMargin} />
            <View style={[row, center, justifyContentBetween, smallHPadding]}>
              <Text text={item.address} style={[textMedium]} />
              <Icon type="FontAwesome" name="map-marker" style={tag} />
            </View>
          </View>
          <View style={input}>
            <Text text="Date" color="quinary" style={smallLMargin} />
            <View style={[row, center, justifyContentBetween, smallHPadding]}>
              <Text
                text={moment(item.booking_date).format('MMMM DD, YYYY')}
                style={[textMedium]}
              />
              <Icon type="FontAwesome" name="calendar" style={tag} />
            </View>
          </View>
          <View style={input}>
            <Text text="Time" color="quinary" style={smallLMargin} />
            <View style={[row, center, justifyContentBetween, smallHPadding]}>
              <Text
                text={moment(item.booking_time, 'HH-mm').format('hh:mm A')}
                style={[textMedium]}
              />
              <Icon type="FontAwesome5" name="clock" style={tag} />
            </View>
          </View>
          <View style={input}>
            <Text text="service" color="quinary" style={smallLMargin} />
            <View style={[row, center, justifyContentBetween, smallHPadding]}>
              <Text text={item.employee_category_tittle} style={[textMedium]} />
              <Icon type="FontAwesome" name="tag" style={tag} />
            </View>
          </View>
          <View style={note}>
            <Text text="Note" color="quinary" style={[textMedium]} />
            <Text text={item.comments} style={[textMedium]} />
          </View>
          <Button
            text="Complete"
            color="primary"
            style={{width: 200, alignSelf: 'center', marginVertical: 20}}
            block
            onPress={() => setModalVisible(true)}
          />
        </Content>
        <RNModal
          modalVisible={modalVisible}
          animationIn="slideInUp"
          animationInTiming={500}
          animationOut="slideOutDown"
          animationOutTiming={800}
          style={[modalStyle]}
          onBackButtonPress={() => setModalVisible(false)}>
          <TouchableOpacity
            style={{flex: 0.5}}
            onPress={() => setModalVisible(false)}
          />
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={[center, smallVPadding, modalHeader]}>
              <Text text="Mark service as completed" category="h6" bold />
            </View>
          </TouchableWithoutFeedback>
          <View
            style={[
              fill,
              secondaryBg,
              regularHPadding,
              justifyContentBetween,
              regularBPadding,
            ]}>
            <View
              style={[
                row,
                mainWrapper,
                justifyContentBetween,
                {backgroundColor: '#F0F0F0'},
              ]}>
              <View style={[regularLMargin, {right: 10}]}>
                <View style={[row, alignItemsCenter, smallRMargin]}>
                  <View style={[PicWrapper]}>
                    <Image source={{uri: item.user_photo}} style={reviewer} />
                  </View>
                  <View style={smallLMargin}>
                    <View style={[row, center, justifyContentBetween]}>
                      <Text text={item.user} bold style={textMedium} />
                    </View>
                    <Text
                      text={item.employee_category_tittle.toUpperCase()}
                      color="quaternary"
                    />
                  </View>
                </View>
                <View style={[row, center, locationWrapper]}>
                  <Icon name="location" style={locationIcon} />
                  <Text text={item.address} />
                </View>
              </View>
              <View>
                <Text
                  text={moment(item.booking_date).format('MMM DD')}
                  bold
                  style={{fontSize: 22}}
                />
                <Text
                  text={moment(item.booking_time, 'HH-mm').format('hh:mm A')}
                  style={{fontSize: 16}}
                />
              </View>
            </View>
            {/* <View style={[row, mediumHPadding, modalTopWrapper]}>
              <Image source={{uri: item.user_photo}} style={image} />
              <View style={[fill, smallBMargin]}>
                <View
                  style={[
                    row,
                    alignItemsCenter,
                    justifyContentBetween,
                    smallLMargin,
                  ]}>
                  <Text text={item.user} bold style={textMedium} />
                </View>
                <View style={[smallLMargin, justifyContentCenter]}>
                  <Text
                    text={item.employee_category_tittle.toUpperCase()}
                    bold
                    color="quaternary"
                    style={[smallVMargin, textRegular]}
                  />
                  <Image source={Images.message} style={message} />
                </View>
              </View>
            </View> */}
            <View style={fill}>
              <View
                style={[
                  justifyContentBetween,
                  regularHPadding,
                  alignItemsCenter,
                  smallVPadding,
                  row,
                ]}>
                <View style={[row, alignItemsCenter, fill]}>
                  <Text
                    text="Service Fee"
                    category="h6"
                    style={[smallLMargin, justifyContentBetween]}
                    onPress={() => setModalVisible(false)}
                  />
                </View>
                <Text
                  text={`$ ${item.category_price}`}
                  style={{fontSize: 16}}
                />
              </View>

              <View
                style={[
                  justifyContentBetween,
                  regularHPadding,
                  alignItemsCenter,
                  smallVPadding,
                  row,
                ]}>
                <View style={[row, alignItemsCenter, fill]}>
                  <Text
                    text="Tax %"
                    category="h6"
                    style={[smallLMargin, justifyContentBetween]}
                    onPress={() => setModalVisible(false)}
                  />
                </View>
                <Text text="$ 0" style={{fontSize: 16}} />
              </View>

              <View
                style={[
                  justifyContentBetween,
                  regularHPadding,
                  alignItemsCenter,
                  smallVPadding,
                  row,
                ]}>
                <View style={[row, alignItemsCenter, fill]}>
                  <Text
                    text="Total"
                    category="h6"
                    style={[smallLMargin, justifyContentBetween]}
                    onPress={() => setModalVisible(false)}
                  />
                </View>
                <Text
                  text={`$ ${item.category_price + 0}`}
                  style={{fontSize: 16}}
                />
              </View>
            </View>
            <Button
              text="Complete, request payment"
              color="primary"
              style={{
                width: '100%',
                alignSelf: 'center',
              }}
              block
              onPress={() => onConfirm()}
            />
          </View>
        </RNModal>
      </Container>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  user: state.login.user,
});

const mapDispatchToProps = (dispatch) => ({
  postNotification: (data) => dispatch(postNotification(data)),
  postTaskDetail: (data, id) => dispatch(postTaskDetail(data, id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TrackOrderDetailScreen);
