import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

// components
import {Text, Input, Button, IdentityCard, LuckyHeader} from 'src/components';

import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Pressable,
} from 'react-native';
import {Icon, Container, Content} from 'native-base';

//actions
import {createProduct} from '../../Employee/Task/redux/actions';

import {Layout, Fonts, Colors, Gutters} from 'src/theme';

const PriceScreen = (props) => {
  const {
    user,
    // requesting,
    navigation: {navigate},
    route: {
      params: {item},
    },
  } = props;
  console.log(item, 'user.name');
  const {titleRegular, textMedium, textCenter, titleSmall} = Fonts;
  const {
    row,
    fill,
    center,
    justifyContentBetween,
    alignItemsCenter,
    justifyContentCenter,
  } = Layout;
  const {
    mediumVMargin,
    mediumHPadding,
    regularVMargin,
    smallHPadding,
    largeTMargin,
    smallLMargin,
    smallBMargin,
    smallVMargin,
    mediumVPadding,
  } = Gutters;
  const [selectedItem, setSelectedItem] = useState(false);

  useEffect(() => {
    const getDate = new Date(item.booking_date);
    const monthDay = moment(getDate).daysInMonth();
    console.log(monthDay, 'monthDaymonthDay');

    // props.addToBag();
    const total = item.category_price * item.daily_hour_required;
    if (item.time_period === 'week') {
      setSelectedItem(total * 7);
    } else if (item.time_period === 'month') {
      setSelectedItem(total * 7);
    } else if (item.time_period === 'year') {
      setSelectedItem(total * monthDay);
    } else if (item.time_period === 'one-time') {
      setSelectedItem(item.category_price * item.daily_hour_required);
    }
  }, []);

  const createProductPayment = () => {
    // console.log('method');
    if (item.id) {
      props.createProduct({id: item.id});
    }
  };

  return (
    <Container>
      <Content showsVerticalScrollIndicator={false}>
        <LuckyHeader
          title={
            <Text
              text="Your Created Plan"
              color="quaternary"
              bold
              style={titleSmall}
            />
          }
          titleStyle={{alignSelf: 'center'}}
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
              <Icon
                type="FontAwesome5"
                name="arrow-left"
                style={{fontSize: 20, position: 'absolute', left: 0}}
              />
            </TouchableOpacity>
          }
        />
        <View style={styles.line} />
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[mediumHPadding]}>
          <View style={regularVMargin}>
            {item.checkout_confirm == true ? (
              <Text
                text="You alreday confirm and checkout this plan"
                style={[textMedium, textCenter, smallVMargin]}
              />
            ) : (
              <Text
                text="We found you a service"
                style={[textMedium, textCenter, smallVMargin]}
              />
            )}
          </View>
          <View style={[smallBMargin]}>
            <View
              style={{
                backgroundColor: '#F5F5F5',
                borderRadius: 20,
                height: 300,
                paddingVertical: 10,
                paddingHorizontal: 20,
                justifyContent: 'space-between',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              }}>
              <View
                style={[
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  },
                ]}>
                <Text
                  text="category Name"
                  bolder
                  color="quaternary"
                  style={[textMedium, textCenter, smallVMargin]}
                />
                <Text
                  text={item.employee_category_tittle}
                  bolder
                  style={[textMedium, textCenter, smallVMargin]}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  text=" Price/hour"
                  bolder
                  color="quaternary"
                  style={[textMedium, textCenter, smallVMargin]}
                />
                <Text
                  text={` ${item.category_price} $`}
                  bold
                  style={[textMedium, textCenter, smallVMargin]}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  text="Hour/day"
                  bolder
                  color="quaternary"
                  style={[textMedium, textCenter, smallVMargin]}
                />
                <Text
                  text={` ${item.daily_hour_required} h`}
                  bold
                  style={[textMedium, textCenter, smallVMargin]}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  text="Time Priod"
                  bolder
                  color="quaternary"
                  style={[textMedium, textCenter, smallVMargin]}
                />
                <Text
                  text={item.time_period}
                  bolder
                  style={[textMedium, textCenter, smallVMargin]}
                />
              </View>
              <View style={{borderBottomColor: 'gray', borderWidth: 1}} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  text="Total price "
                  bolder
                  color="quaternary"
                  style={[textMedium, textCenter, smallVMargin]}
                />
                {item.time_period === 'year' ? (
                  <Text
                    text={` ${selectedItem} $/month`}
                    bolder
                    style={[textMedium, textCenter, smallVMargin]}
                  />
                ) : item.time_period === 'one-time' ? (
                  <Text
                    text={` ${selectedItem} $/daily`}
                    bolder
                    style={[textMedium, textCenter, smallVMargin]}
                  />
                ) : (
                  <Text
                    text={` ${selectedItem} $/weekly`}
                    bolder
                    style={[textMedium, textCenter, smallVMargin]}
                  />
                )}
              </View>
            </View>
          </View>
          <View style={largeTMargin}>
            {item.checkout_confirm == true ? null : (
              <Button
                text="Conform"
                // loading={requesting}
                onPress={() => {
                  createProductPayment();
                  navigate('Home');
                }}
                style={fill}
                color="primary"
                block
              />
            )}
          </View>
        </Content>
      </Content>
    </Container>
  );
};
const styles = StyleSheet.create({
  icon: {
    fontSize: 20,
    position: 'absolute',
    left: 25,
  },
  image: {
    width: 107,
    height: 102,
  },
  heartIcon: {
    color: Colors.torchRed,
    fontSize: 16,
  },
  message: {
    width: 121,
    height: 28,
    resizeMode: 'contain',
  },
  mainBg: {
    backgroundColor: Colors.white,
  },
  tagInput: {
    height: 53,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#E9E9E9',
    paddingVertical: 3,
    paddingHorizontal: 7,
  },
  tag: {fontSize: 22, color: 'red'},
  note: {
    height: 100,
    backgroundColor: '#F5F5F5',
    borderWidth: 0.5,
    borderColor: '#E9E9E9',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginTop: 10,
  },
  line: {height: 3, backgroundColor: '#DCE0E5', opacity: 0.5},
});

const mapStateToProps = (state) => ({
  // requesting: state.approvedTask.requesting,
  // bagServices: state.booking.bagServices,
});

const mapDispatchToProps = (dispatch) => ({
  // addToBag: (data) => dispatch(addToBag(data)),
  createProduct: (data) => dispatch(createProduct(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PriceScreen);
