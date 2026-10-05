import React, {useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import {Container, Content, Icon} from 'native-base';
import moment from 'moment';
// components
import {
  Text,
  Line,
  IdentityCard,
  LuckyHeader,
  DataAvailability,
} from 'src/components';

// //actions
import {getPastOrders} from './redux/actions';

// theme
import {Layout, Images, Gutters, Colors, Fonts} from 'src/theme';

// styles
import styles from './styles';

const PastOrdersScreen = (props) => {
  const {
    pastOrders,
    bookingDetail,
    navigation: {navigate},
  } = props;

  useEffect(() => {
    props.getPastOrders();
  }, []);

  const {height} = Dimensions.get('window');

  const {titleRegular, textMedium, titleSmall} = Fonts;
  const {row, fill, justifyContentBetween, alignItemsCenter} = Layout;
  const {mediumHPadding, regularTMargin, regularBPadding} = Gutters;
  const {
    icon,
    primaryBg,
    mainBg,
    wrapper,
    marginT1x,
    textWrapper,
    bottomRadious,
    line,
  } = styles;

  console.log('pastOrders', pastOrders);

  const onSelect = (item) => {
    let array = [...bookingDetail];
    if (bookingDetail.status === 'completed') {
      setSelectedItem([]);
    } else {
      setSelectedItem(array.filter((index) => index === item));
    }
  };

  const pastOrdersTest = [
    {
      id: 1,
      name: 'Saad A',
      service: 'Multiple',
      date: 'DEC 16, 21',
      time: '3:00 PM',
      service_duration: '2 Hours',
      address: 'US _ JESSICA',
      note: 'Health precautionary measures',
      status: 'completed',
    },
    {
      id: 2,
      name: 'Seun',
      service: 'Multiple',
      date: 'NOV 16, 21',
      time: '3:00 PM',
      service_duration: '2 Hours',
      address: 'US _ JESSICA',
      note: 'Health precautionary measures',
      status: 'completed',
    },
  ];

  return (
    <SafeAreaView style={[fill, {backgroundColor: '#fff'}]}>
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
            <Text text="Past Services" color="#000" bold style={titleSmall} />
          }
        />
        <View style={line} />
        <DataAvailability
          requesting={!pastOrdersTest}
          hasData={Boolean(pastOrdersTest)}
          style={{marginTop: -80}}>
          <Content
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              mediumHPadding,
              mainBg,
              wrapper,
              regularBPadding,
            ]}>
            {pastOrdersTest.length ? (
              <View style={{flex: 1, backgroundColor: '#fff'}}>
                {pastOrdersTest.map((item) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('BookingDetails', {
                          bookingData: item,
                        })
                      }
                      style={{
                        backgroundColor: '#FFFFFF',
                        shadowColor: '#000000',
                        shadowOffset: {width: 0, height: 2},
                        shadowOpacity: 0.05,
                        shadowRadius: 10,
                        borderRadius: 5,
                        width: '100%',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        marginVertical: '3%',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: '10%',
                          marginLeft: '5%',
                        }}>
                        <View style={{marginHorizontal: '4%'}}>
                          <Text
                            style={[
                              textMedium,
                              {
                                color: '#A9A9A9',
                                fontWeight: 'bold',
                                borderBottomColor: 'black',
                                borderBottomWidth: 1,
                                fontSize: 20,
                              },
                            ]}>
                            {item.date}
                          </Text>
                          <Text
                            style={[
                              titleSmall,
                              {
                                color: '#A9A9A9',
                                borderBottomColor: 'black',
                                borderBottomWidth: 1,
                                fontSize: 13,
                              },
                            ]}>
                            {item.time}
                          </Text>
                        </View>
                        <View
                          style={{
                            backgroundColor: '#CED3D8',
                            borderRadius: 5,
                            marginHorizontal: '5%',
                          }}>
                          <Image style={{width: 50, height: 50}} />
                        </View>
                        <View>
                          <Text
                            style={[
                              textMedium,
                              {
                                color: '#000',
                              },
                            ]}>
                            {item.name}
                          </Text>
                          <Text
                            style={[
                              textMedium,
                              {
                                color: '#000',
                                fontSize: 13,
                              },
                            ]}>
                            {item.service}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                          marginTop: '5%',
                          borderTopColor: '#F1F1F1',
                          borderTopWidth: 1,
                        }}>
                        <TouchableOpacity>
                          <Text
                            style={[
                              textMedium,
                              {
                                color: '#30D5C8',
                                marginVertical: 10,
                                fontWeight: 'bold',
                                borderBottomColor: 'black',
                                borderBottomWidth: 1,
                              },
                            ]}>
                            Edit Booking
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                          <Text
                            style={[
                              textMedium,
                              {
                                color: '#30D5C8',
                                marginVertical: 10,
                                fontWeight: 'bold',
                                borderBottomColor: 'black',
                                borderBottomWidth: 1,
                              },
                            ]}>
                            Cancel
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
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
          </Content>
        </DataAvailability>
      </Container>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  pastOrders: state.pastOrders.pastOrders,
});

const mapDispatchToProps = (dispatch) => ({
  getPastOrders: () => dispatch(getPastOrders()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PastOrdersScreen);
