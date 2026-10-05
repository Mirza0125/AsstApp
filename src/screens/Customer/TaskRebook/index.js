import React, {useState} from 'react';
import {View, StatusBar, Image} from 'react-native';
import {connect} from 'react-redux';
import {Container, Content, Icon} from 'native-base';
import {Rating} from 'react-native-ratings';
// components
import {Text, Input, Button} from 'src/components';

// theme
import {Layout, Images, Gutters, Colors, Fonts} from 'src/theme';

// styles
import styles from './styles';

const TaskRebook = (props) => {
  const {
    navigation: {navigate},
    profile,
  } = props;

  const {titleRegular, textMedium, textRegular} = Fonts;
  const {
    row,
    fill,
    center,
    justifyContentBetween,
    alignItemsCenter,
    justifyContentCenter,
  } = Layout;
  const {
    smallVMargin,
    mediumTMargin,
    mediumHPadding,
    smallHPadding,
    mediumBPadding,
    smallLMargin,
    smallBMargin,
    mediumVMargin,
    mediumVPadding,
  } = Gutters;
  const {
    icon,
    heartIcon,
    line,
    message,
    mainBg,
    image,
    tagInput,
    tag,
    note,
    button,
  } = styles;

  const [value, setValue] = useState('');
  console.log('profile', profile);
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
          text="Service Details"
          bold
          color="quaternary"
          style={titleRegular}
        />
      </View>
      <View style={line} />
      <Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[mediumHPadding, mediumBPadding]}>
        <View style={[row, mediumVMargin, mediumTMargin, mediumHPadding]}>
          <Image source={Images.mark} style={image} />
          <View style={[fill, smallBMargin]}>
            <View
              style={[
                row,
                alignItemsCenter,
                justifyContentBetween,
                smallLMargin,
              ]}>
              <Text text="Mark" bold style={textMedium} />
            </View>
            <View style={[smallLMargin, justifyContentCenter]}>
              <Text
                text="HOUSE CLEANING"
                bold
                color="quaternary"
                style={[smallVMargin, textRegular]}
              />
              <Image source={Images.message} style={message} />
            </View>
          </View>
        </View>
        <View style={tagInput}>
          <Text text="service" color="quinary" style={smallLMargin} />
          <View style={[row, center, justifyContentBetween, smallHPadding]}>
            <Text text="House Cleaning" style={[textMedium]} />
            <Icon type="FontAwesome" name="tag" style={tag} />
          </View>
        </View>
        <View style={tagInput}>
          <Text text="Service Price" color="quinary" style={smallLMargin} />
          <View style={[row, center, justifyContentBetween, smallHPadding]}>
            <Text text="$34.50" style={[textMedium]} />
            <Icon type="FontAwesome" name="dollar" style={tag} />
          </View>
        </View>
        <View style={tagInput}>
          <Text text="Address" color="quinary" style={smallLMargin} />
          <View style={[row, center, justifyContentBetween, smallHPadding]}>
            <Text text="1077  Brown Bear Drive" style={[textMedium]} />
            <Icon type="FontAwesome" name="map-marker" style={tag} />
          </View>
        </View>
        <View style={tagInput}>
          <Text text="Date" color="quinary" style={smallLMargin} />
          <View style={[row, center, justifyContentBetween, smallHPadding]}>
            <Text text="17 November 2020" style={[textMedium]} />
            <Icon type="FontAwesome" name="calendar" style={tag} />
          </View>
        </View>
        <View style={tagInput}>
          <Text text="Date" color="quinary" style={smallLMargin} />
          <View style={[row, center, justifyContentBetween, smallHPadding]}>
            <Text text="9:00 AM - 11:00 AM" style={[textMedium]} />
            <Icon type="FontAwesome5" name="clock" style={tag} />
          </View>
        </View>
        <View style={tagInput}>
          <Text text="House Type" color="quinary" style={smallLMargin} />
          <View style={[row, center, justifyContentBetween, smallHPadding]}>
            <Text text="Townhome" style={[textMedium]} />
            <Icon type="FontAwesome" name="home" style={tag} />
          </View>
        </View>
        <View style={tagInput}>
          <Text text="Number of rooms" color="quinary" style={smallLMargin} />
          <View style={[row, center, justifyContentBetween, smallHPadding]}>
            <Text text="4 Rooms" style={[textMedium]} />
            <Icon type="FontAwesome5" name="bed" style={tag} />
          </View>
        </View>

        <View style={note}>
          <Text text="Note" color="quinary" style={[textMedium]} />
          <Text text="Health precautionary measures" style={[textMedium]} />
        </View>

        <View style={{width: '100%', marginTop: 35}}>
          <Button text="Checkout rebook" color="primary" block />
          <Button
            text="Manage service details"
            style={[smallVMargin]}
            textStyle={button}
            redBorder
            block
          />
        </View>
      </Content>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, null)(TaskRebook);
