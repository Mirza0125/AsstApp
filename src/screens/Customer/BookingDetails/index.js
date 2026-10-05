import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Calendar} from 'react-native-calendars';
import {Container, Content, Icon} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import {
  View,
  SafeAreaView,
  Modal,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';

// components
import {Text, Input, Button, IdentityCard, LuckyHeader} from 'src/components';

// theme
import {Layout, Images, Gutters, Colors, Fonts} from 'src/theme';

// styles
import styles from './styles';
import moment from 'moment';

const BookingDetails = (props) => {
  const {
    user,
    profile,
    navigation: {navigate},
    route: {
      params: {bookingData},
    },
  } = props;

  const {titleSmall, textMedium} = Fonts;
  const {row, fill, center, justifyContentBetween} = Layout;
  const {
    mediumHPadding,
    regularVMargin,
    smallHPadding,
    regularTMargin,
    smallLMargin,
    smallBMargin,
    smallVMargin,
  } = Gutters;
  const {
    tag,
    line,
    input,
    notes,
    button,
    mainBg,
    tagInput,
    hasInput,
    buttonSize,
    inputField,
  } = styles;

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  console.log('bookingData ', bookingData);
  return (
    <SafeAreaView
      style={[fill, {backgroundColor: '#fff', justifyContent: 'flex-start'}]}>
      <Container style={mainBg}>
        <LuckyHeader
          left={
            <Icon
              type="FontAwesome5"
              name="arrow-left"
              style={{fontSize: 20}}
              onPress={() => props.navigation.goBack()}
            />
          }
          title={
            <Text text="Booking details" color="#000" bold style={titleSmall} />
          }
        />
        <View style={line} />

        <ScrollView
          contentContainerStyle={{alignItems: 'center', marginTop: '5%'}}>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: '5%',
              marginLeft: '5%',
              alignSelf: 'flex-start',
            }}>
            <Image
              source={{}}
              style={{
                width: 90,
                height: 90,
                backgroundColor: '#CED3D8',
                borderRadius: 5,
              }}
            />
            <View style={{marginLeft: '10%'}}>
              <Text
                style={[
                  titleSmall,
                  {
                    color: '#000',
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    fontSize: 18,
                  },
                ]}>
                {bookingData.name}
              </Text>
              <Text
                style={[
                  titleSmall,
                  {
                    color: '#000',
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    fontSize: 13,
                  },
                ]}>
                {bookingData.service}
              </Text>

              <TouchableOpacity style={{marginTop: 20}}>
                <Text
                  style={[
                    titleSmall,
                    {
                      color: '#30D5C8',
                      borderBottomColor: 'black',
                      borderBottomWidth: 1,
                      fontSize: 15,
                    },
                  ]}>
                  Message
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={[smallBMargin, {width: '90%', justifyContent: 'center'}]}>
            <Input value={bookingData.service} placeholder="Service" showHint />
          </View>

          <View
            style={[smallBMargin, {width: '90%', justifyContent: 'center'}]}>
            <Input
              value={bookingData.service_duration}
              placeholder="Service duration"
              showHint
            />
          </View>

          <View
            style={[smallBMargin, {width: '90%', justifyContent: 'center'}]}>
            <Input value={bookingData.address} placeholder="Address" showHint />
          </View>

          <View
            style={[smallBMargin, {width: '90%', justifyContent: 'center'}]}>
            <Input value={bookingData.date} placeholder="Date" showHint />
          </View>

          <View
            style={[smallBMargin, {width: '90%', justifyContent: 'center'}]}>
            <Input value={bookingData.time} placeholder="Time" showHint />
          </View>

          <View
            style={[smallBMargin, {width: '90%', justifyContent: 'center'}]}>
            <Input value={bookingData.note} placeholder="Note" showHint />
          </View>

          {bookingData.status === 'ongoing' ||
            (bookingData.status === 'upcoming' && (
              <Button
                text="Add time to this service"
                color="primary"
                block
                // loading={requesting}
                onPress={() => {}}
                style={[button, {width: '90%', alignSelf: 'center'}]}
              />
            ))}

          {bookingData.status === 'ongoing' || bookingData.status === 'upcoming' && (
              <Button
                text="Cancel this service"
                textStyle={{color: 'red'}}
                color="#fff"
                block
                // loading={requesting}
                onPress={() => {}}
                style={[
                  button,
                  {
                    width: '90%',
                    alignSelf: 'center',
                    marginTop: '3%',
                    backgroundColor: '#fff',
                    borderWidth: 1,
borderColor: 'red',
                  },
                ]}
              />
              )}

          {bookingData.status === 'completed' && (
            <Button
              text="Give feedback"
              color="primary"
              block
              // loading={requesting}
              onPress={() => {}}
              style={[
                button,
                {width: '90%', alignSelf: 'center', marginTop: '3%'},
              ]}
            />
          )}

          {bookingData.status === 'completed' && (
            <Button
              text="Send a tip"
              color="primary"
              block
              // loading={requesting}
              onPress={() => {}}
              style={[
                button,
                {width: '90%', alignSelf: 'center', marginTop: '3%'},
              ]}
            />
          )}

          {bookingData.status === 'completed' && (
            <Button
              text="Rebook this service"
              color="primary"
              block
              // loading={requesting}
              onPress={() => {}}
              style={[
                button,
                {width: '90%', alignSelf: 'center', marginTop: '3%'},
              ]}
            />
          )}
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  user: state.login.user,
  profile: state.profile.profile,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(BookingDetails);
