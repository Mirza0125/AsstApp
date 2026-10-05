import React, {useState} from 'react';
import {View, StatusBar, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {Container, Content, Icon} from 'native-base';
import {Calendar} from 'react-native-calendars';
// components
import {Text, Input, Button, IdentityCard} from 'src/components';

// theme
import {Layout, Images, Gutters, Colors, Fonts} from 'src/theme';

// styles
import styles from './styles';

const SuccessfullyBookedScreen = (props) => {
  const {
    navigation: {navigate},
  } = props;

  const {titleRegular, textMedium, textCenter} = Fonts;
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
    smallHPadding,
    largeTMargin,
    smallLMargin,
    smallBMargin,
    smallVMargin,
    mediumVPadding,
  } = Gutters;
  const {icon, line, mainBg, tagInput, tag, note} = styles;

  const windowWidth = Dimensions.get('window').width;
  const [value, setValue] = useState('');

  const onChange = (index, text) => {
    setChooseTimeslot(index);
    setChosenTimeslotText(text);
  };

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
        <Icon type="FontAwesome" name="times" style={icon} />
        <Text
          text="Successfully Booked"
          bold
          color="quaternary"
          style={titleRegular}
        />
      </View>
      <View style={line} />
      <Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[mediumHPadding]}>
        <View style={regularVMargin}>
          <Text
            text="We found you a service"
            style={[textMedium, textCenter, smallVMargin]}
          />
          <IdentityCard source={Images.anneonbeach} name="Anne" text="View" />
        </View>
        <View style={smallBMargin}>
          <Input
            value={value}
            placeholder="Address"
            onChangeText={(value) => setValue(value)}
            icon="map-marker"
            iconColor="secondary"
            color="secondary"
          />
        </View>
        <View style={smallBMargin}>
          <Input
            value={value}
            placeholder="Date"
            onChangeText={(value) => setValue(value)}
            icon="calendar"
            iconColor="secondary"
            color="secondary"
            onPress={() => setModalVisible(true)}
          />
        </View>
        <View style={smallBMargin}>
          <Input
            value={value}
            placeholder="Time"
            onChangeText={(value) => setValue(value)}
            icon="clock"
            iconColor="secondary"
            type="FontAwesome5"
            color="secondary"
          />
        </View>
        <View style={tagInput}>
          <Text text="service" color="quinary" style={smallLMargin} />
          <View style={[row, center, justifyContentBetween, smallHPadding]}>
            <Text text="House Cleaning" style={[textMedium]} />
            <Icon type="FontAwesome" name="tag" style={tag} />
          </View>
        </View>
        <View style={note}>
          <Text text="Note" color="quinary" style={[textMedium]} />
        </View>
        <View style={largeTMargin}>
          <Button text="Thanks" style={fill} color="primary" block />
        </View>
      </Content>
    </Container>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SuccessfullyBookedScreen);
