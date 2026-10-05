import React from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {Container, Content, Icon} from 'native-base';
import {View, SafeAreaView, StatusBar, TouchableOpacity} from 'react-native';
import Database from './database';

// components
import {Text, IdentityCard, LuckyHeader} from 'src/components';

// theme
import {Layout, Images, Gutters, Colors, Fonts} from 'src/theme';

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

  const openChatScreen = async (data) => {
    Database.shared().init(
      user.id,
      user.name ? user.name : user.first_name,
      user.image ? user.image : user.photo,
    );
    console.log('openChatScreenData', data);
    let chat = await Database.shared().addChat(data);

    navigate('Messages', {
      chat: chat,
    });
  };

  const {titleRegular, textMedium} = Fonts;
  const {fill, row, center, justifyContentBetween} = Layout;
  const {
    mediumHPadding,
    regularVMargin,
    smallHPadding,
    smallLMargin,
    mediumBPadding,
  } = Gutters;
  const {icon, line, mainBg, input, tag, card, note, button, chatIcon} = styles;
  console.log('item', item);
  return (
    <SafeAreaView style={fill}>
      <Container style={mainBg}>
        {/* <StatusBar backgroundColor={Colors.white} barStyle="dark-content" /> */}
        <LuckyHeader
          left={<Icon type="FontAwesome5" name="arrow-left" style={icon} />}
          title={
            <Text
              text={item.employee_name}
              bold
              color="quaternary"
              style={titleRegular}
            />
          }
          onPress={() => props.navigation.goBack()}
          titleStyle={[alignItemsCenter]}
        />
        <View style={line} />
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[mediumHPadding, mediumBPadding]}>
          <View style={[regularVMargin, card]}>
            <IdentityCard
              imageUrl={item.employee_photo}
              name={item.employee_name}
              rating={item.avg_review}
            />
          </View>
          <View style={input}>
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
          <View style={center}>
            <TouchableOpacity
              style={[row, center, button]}
              onPress={() => openChatScreen(item)}>
              <Icon type="FontAwesome5" name="comment-dots" style={chatIcon} />
              <Text
                text="Message"
                color="tertiary"
                bold
                style={[textMedium, smallLMargin]}
              />
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  user: state.login.user,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TrackOrderDetailScreen);
