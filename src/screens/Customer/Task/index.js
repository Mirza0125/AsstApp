import React, {useEffect} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {Container, Content, Icon} from 'native-base';

import {
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
// components
import {
  Text,
  Line,
  IdentityCard,
  DataAvailability,
  LuckyHeader,
} from 'src/components';
import {useIsFocused} from '@react-navigation/native';

//actions
import {getBookingDetail} from './redux/actions';

// theme
import {Layout, Images, Gutters, Colors, Fonts} from 'src/theme';

// styles
import styles from './styles';

const Task = (props) => {
  const isFocused = useIsFocused();
  const {
    requesting,
    bookingDetail,
    navigation: {navigate},
  } = props;
  const isFocus = useIsFocused();

  // useEffect(() => {
  //   props.getBookingDetail();
  // }, []);

  useEffect(() => {
    props.getBookingDetail();
  }, [isFocused]);

  const onSelect = (item) => {
    // navigate('TrackOrderDetailScreen', {item});
    navigate('TaskDetail', {item});
  };
  const onPrice = (item) => {
    // navigate('TrackOrderDetailScreen', {item});
    navigate('PriceScreen', {item});
  };

  const {height} = Dimensions.get('window');
  const {titleRegular, textRight, textCenter, textMedium, titleSmall} = Fonts;
  const {
    row,
    fill,
    alignItemsCenter,
    justifyContentCenter,
    justifyContentBetween,
  } = Layout;
  const {mediumHPadding, regularBMargin, mediumVPadding} = Gutters;
  const {primaryBg, mainBg, wrapper, marginT1x, textWrapper, bottomRadious} =
    styles;
  console.log('bookingDetail>>>>>>>>', bookingDetail);
  return (
    <SafeAreaView style={fill}>
      <StatusBar backgroundColor={Colors.gold} barStyle="dark-content" />
      <LuckyHeader
        title={
          <Text
            text="Current Order"
            color="quaternary"
            bold
            style={[titleSmall]}
          />
        }
        titleStyle={[alignItemsCenter]}
        right={
          <TouchableOpacity onPress={() => navigate('PastOrdersScreen')}>
            <Text text="PAST ORDERS" bold style={textRight} />
          </TouchableOpacity>
        }
      />
      {
        <DataAvailability
          requesting={requesting}
          hasData={Boolean(bookingDetail)}
          style={{marginTop: -80}}>
          <Container style={mainBg}>
            <Line style={{backgroundColor: Colors.Alabaster}} />
            <Content
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[mediumHPadding, mainBg, wrapper]}>
              <>
                {bookingDetail.length > 0 ? (
                  bookingDetail.map((item, i) => (
<View style={[regularBMargin, {}]} key={i}>
                      <View
                        style={{
                          backgroundColor: 'white',
                          borderRadius: 10,
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
                          style={{
                            flexDirection: 'row',
                          }}>
                          <IdentityCard
                            imageUrl={item?.employee_photo}
                            name={item.employee_name}
                            text="View"
                            date={moment(item.booking_date).format('MMMM-DD')}
                            time={moment(item.booking_time, 'HH-mm').format(
                              'hh:mm A',
                            )}
                            topRounded
                            withViewSection
                            rating={item.avg_review}
                            onPress={() => onSelect(item)}
                          />

                          <Line style={{backgroundColor: Colors.Alabaster}} />
                          <TouchableOpacity
                            onPress={() => onPrice(item)}
                            style={[
                              {
                                alignSelf: 'center',
                                height: 78,
                                width: 80,
                                backgroundColor: '#F7F7F7',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderTopEndRadius: 10,
                              },
                            ]}>
                            {item.checkout_confirm == true ? (
                              <Text
                                style={textMedium}
                                text="confirm"
                                bolder
                                color="quaternary"
                              />
                            ) : (
                              <Text
                                style={textMedium}
                                text="Plan"
                                bolder
                                color="quaternary"
                              />
                            )}
                            {/* <Text
                          style={textMedium}
                          text="Plan"
                          bolder
                          color="quaternary"
                        /> */}
                          </TouchableOpacity>
                        </View>
                        <View
                          style={[
                            row,
                            marginT1x,
                            justifyContentBetween,
                            textWrapper,
                            primaryBg,
                          ]}>
                          <Text
                            text={item.employee_category_tittle}
                            style={textMedium}
                          />
                          <Text
                            text={`$${item.category_price}`}
                            style={textMedium}
                          />
                        </View>
                        <View
                          style={[
                            row,
                            marginT1x,
                            justifyContentBetween,
                            bottomRadious,
                            primaryBg,
                          ]}>
                          <Text text="Total" style={textMedium} />
                          <Text
                            text={`$${item.category_price}`}
                            style={textMedium}
                          />
                        </View>
                      </View>
                    </View>
                  ))
                ) : (
                  <View
                    style={{
                      height: (250 / 375) * height,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      text="No Data Found "
                      style={{
                        fontSize: 15,
                      }}
                    />
                  </View>
                )}
              </>
            </Content>
          </Container>
        </DataAvailability>
      }
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  requesting: state.bookingDetail.requesting,
  bookingDetail: state.bookingDetail.bookingDetail,
});

const mapDispatchToProps = (dispatch) => ({
  getBookingDetail: () => dispatch(getBookingDetail()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Task);
