import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Container, Content, Icon} from 'native-base';
import {
  TouchableOpacity,
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Carousel from 'react-native-snap-carousel';

// components
import {
  Text,
  Button,
  RNModal,
  DiscountCard,
  LuckyHeader,
  DataAvailability,
} from 'src/components';

// theme
import {Layout, Images, Gutters, Colors, Fonts, Global} from 'src/theme';
//Action
import {getSubscription, createSubscription} from './redux/actions';

const {titleSmall, titleRegular, textMedium} = Fonts;

// styles
import styles from './styles';

const {width: screenWidth} = Dimensions.get('window');

const Subscription = (props) => {
  const {
    subscriptionDetail,
    requesting,
    user,
    navigation: {navigate},
  } = props;

  useEffect(() => {
    props.getSubscription();
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [freePlan, setFreePlan] = useState(true);
  const [premiumPlan, setPremiumPlan] = useState(false);

  const onChangePremium = (val) => {
    setPremiumPlan(val);
    setFreePlan(!val);
  };

  const onChangeFree = (val) => {
    setFreePlan(val);
    setPremiumPlan(!val);
  };
  console.log('freePlan', freePlan);
  console.log('premiumPlan', premiumPlan);

  const {row, fill, center} = Layout;
  const {
    mediumHPadding,
    mediumVMargin,
    smallLMargin,
    smallLPadding,
    smallVPadding,
    smallVMargin,
  } = Gutters;

  const onsubmit = () => {
    let data = {
      plan_id: subscriptionDetail[activeIndex].stripe_price_id + '',
    };
    props.createSubscription(data);
  };

  const styles = StyleSheet.create({
    itemContainer: {
      width: '100%',
      backgroundColor: 'white',
      alignSelf: 'center',
      backgroundColor: '#FFFFFF',
      shadowColor: '#000000',
      shadowOffset: {width: 0, height: 9.33333},
      shadowOpacity: 0.05,
      shadowRadius: 23.3333,
      borderRadius: 5,
    },
    itemHeader: {
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,

      height: 70,
      width: '100%',
      backgroundColor: '#30D5C8',
      justifyContent: 'center',
      alignItems: 'center',
    },
    itemHeaderText: {
      fontWeight: 'bold',
      color: 'white',
      fontSize: 24,
    },
    itemFeatures: {
      marginTop: 10,
      marginBottom: 10,
      // flex: 1,
      height: '45%',
      marginHorizontal: '15%',
    },
    itemFeatureText: {
      marginVertical: 10,
      fontSize: 15,
    },
    itemDivider: {
      width: '100%',
      height: 1,
      backgroundColor: '#30D5C8',
      marginVertical: 10,
    },
    itemPrice: {
      textAlign: 'center',
      color: 'black',
      alignSelf: 'center',
    },
  });

  const [items, setItems] = useState(subscriptionDetail);
  const [activeIndex, setActiveIndex] = useState(0);

  const onSnapToItem = (index) => {
    setActiveIndex(index);
  };
  console.log('subscriptionDetail', subscriptionDetail);

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <View style={[styles.itemHeader]}>
        <Text style={[styles.itemHeaderText, textMedium]}>{item.name}</Text>
      </View>
      <View style={styles.itemFeatures}>
        {item.service_included.map((feature, index) => (
          <Text key={index} style={styles.itemFeatureText}>
            {feature.service}
          </Text>
        ))}
      </View>
      <View style={styles.itemDivider} />
      <Text style={[styles.itemPrice, textMedium, {fontWeight: 'bold'}]}>
        {item.price === 0 ? 'Free' : item.price}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{backgroundColor: '#fff'}}>
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
          <Text text="Subscription" color="#000" bold style={titleSmall} />
        }
      />
      <View style={{marginTop: 20, alignSelf: 'flex-start', marginLeft: 10}}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
          }}>{`Hello! ${user.username}`}</Text>
      </View>

      <View style={{marginTop: 20, alignSelf: 'flex-start', marginLeft: 10}}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
          }}>{`To book services you need to choose
one of the Subscriptions!`}</Text>
      </View>

      <View style={{marginTop: 40}}>
        <Carousel
          data={subscriptionDetail}
          sliderHeight={screenWidth}
          renderItem={renderItem}
          layout={'default'}
          itemWidth={screenWidth - 70}
          sliderWidth={screenWidth}
          // loop={true}
          autoplay={true}
          // autoplayDelay={1000}
          activeSlideAlignment={'center'}
          keyExtractor={(item) => item.id}
          hasParallaxImages={true}
          onSnapToItem={onSnapToItem}
        />
      </View>

      <Button
        text="Confirm"
        color="primary"
        block
        loading={requesting}
        onPress={onsubmit}
        style={[{width: '90%', alignSelf: 'center'}]}
      />
    </SafeAreaView>
    //     <>
    //       <Container style={[fill, {backgroundColor: Colors.white}]}>
    //         <LuckyHeader
    //           left={
    //             <Icon
    //               type="FontAwesome5"
    //               name="arrow-left"
    //               style={titleSmall}
    //               onPress={() => setModalVisible(true)}
    //             />
    //           }
    //           title={
    //             <Text
    //               text="Subscription"
    //               color="quaternary"
    //               bold
    //               style={titleSmall}
    //             />
    //           }
    //           titleStyle={subscription}
    //         />
    //         <Content>
    //           <View style={text}>
    //             <View>
    //               <Text text="Buy monthly subscription " style={titleSmall} />
    //             </View>
    //             <View style={row}>
    //               <Text text="plan to " style={titleSmall} />
    //               <Text
    //                 text="book for free "
    //                 color="quaternary"
    //                 style={titleSmall}
    //               />
    //               <Text text="!" style={titleSmall} />
    //             </View>
    //           </View>
    //           <View style={[mediumHPadding]}>
    //             <DiscountCard
    //               heading="Year end promo!"
    //               text="50% off on all services"
    //               codeText="Code"
    //               code=" ED2020"
    //               source={Images.usercleaning}
    //             />
    //           </View>
    //           <View style={[mediumVMargin, mediumHPadding]}>
    //             <View
    //               style={[
    //                 row,
    //                 smallLPadding,
    //                 {
    //                   height: 61,
    //                   backgroundColor: Colors.Alabaster,
    //                   borderRadius: 6,
    //                   alignItems: 'center',
    //                 },
    //               ]}>
    //               <CheckBox
    //                 disabled={false}
    //                 boxType="circle"
    //                 value={freePlan}
    //                 onValueChange={(val) => onChangeFree(val)}
    //               />
    //               <View style={smallLMargin}>
    //                 <Text text="Free" />
    //                 <Text text="Lorem ipsum dolor sit amet, ne eum doctus" />
    //               </View>
    //             </View>
    //             <View
    //               style={[
    //                 row,
    //                 smallLPadding,
    //                 {
    //                   marginTop: 10,
    //                   height: 61,
    //                   backgroundColor: Colors.Alabaster,
    //                   borderRadius: 6,
    //                   alignItems: 'center',
    //                 },
    //               ]}>
    //               <CheckBox
    //                 disabled={false}
    //                 boxType="circle"
    //                 value={premiumPlan}
    //                 onValueChange={(val) => onChangePremium(val)}
    //               />
    //               <View style={smallLMargin}>
    //                 <Text
    //                   text={`${
    //                     subscriptionDetail && subscriptionDetail.data[0].amount
    //                   }/month`}
    //                 />
    //                 <Text text="Lorem ipsum dolor sit amet, ne eum doctus" />
    //               </View>
    //             </View>
    //             <View style={{marginLeft: 80, marginTop: 14, width: 284}}>
    //               <View style={row}>
    //                 <Text bold text="Next billing date:" />
    //                 <Text text="12/20/2020" />
    //               </View>
    //               <View>
    //                 <Text
    //                   text={`'If you don't want the next month's subscription,
    // change your subscription plan by the last day
    // of your subscription.'`}
    //                   color="quinary"
    //                 />
    //               </View>
    //             </View>
    //           </View>
    //           <View style={{marginTop: 62, paddingHorizontal: 36}}>
    //             <Button
    //               text="Continue"
    //               color="primary"
    //               block
    //               disabled={!premiumPlan}
    //               onPress={() => onsubmit()}
    //             />
    //           </View>
    //         </Content>
    //       </Container>
    //       <RNModal
    //         style={{padding: 0, margin: 0}}
    //         modalVisible={modalVisible}
    //         onBackButtonPress={() => setModalVisible(false)}>
    //         <View style={{flex: 1}} />
    //         <View style={[fill, {backgroundColor: '#fff', marginBottom: '10%'}]}>
    //           <View
    //             style={[
    //               center,
    //               smallVPadding,
    //               {
    //                 backgroundColor: '#F0F0F0',
    //                 height: 47,
    //               },
    //             ]}>
    //             <Text text="Cancel Subscription" category="h6" bold />
    //           </View>
    //           <View style={[center, mediumHPadding]}>
    //             <Text
    //               text="Cancel Subscription?"
    //               bold
    //               style={[titleRegular, smallVMargin]}
    //             />
    //             <Text
    //               text="Before you leave, maybe we can help"
    //               style={textMedium}
    //             />
    //             <View style={{width: '100%'}}>
    //               <Button
    //                 text="Track Task"
    //                 style={[smallVMargin]}
    //                 textStyle={button}
    //                 redBorder
    //                 block
    //               />
    //               <Button
    //                 text="Contact Customer Service"
    //                 style={[smallVMargin]}
    //                 textStyle={button}
    //                 redBorder
    //                 block
    //               />
    //             </View>
    //           </View>
    //           <View
    //             style={[
    //               mediumHPadding,
    //               {
    //                 width: '100%',
    //                 height: 72,
    //                 marginTop: 40,
    //                 justifyContent: 'center',
    //                 alignSelf: 'flex-start',
    //                 backgroundColor: '#F0F0F0',
    //               },
    //             ]}>
    //             <Button
    //               text="No thanks, cancel my subscription"
    //               color="primary"
    //               block
    //             />
    //           </View>
    //         </View>
    //       </RNModal>
    //     </>
  );
};

const mapStateToProps = (state) => ({
  user: state.login.user,
  subscription: state.subscription.subscription,
  subscriptionDetail: state.subscription.subscriptionDetail,
  requesting: state.subscription.requesting,
});

const mapDispatchToProps = (dispatch) => ({
  getSubscription: () => dispatch(getSubscription()),
  createSubscription: (data) => dispatch(createSubscription(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Subscription);
