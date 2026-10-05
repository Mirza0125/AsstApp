import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';
import {Card, Container, Content, Icon} from 'native-base';
import {useIsFocused} from '@react-navigation/native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Rating} from 'react-native-ratings';
// components
import {Text, Input, Button, LuckyHeader} from 'src/components';

//actions
import {getCardData} from './redux/actions';
import {
  setDefaultCardData,
  deleteCardData,
} from '../AddCreditCardScreen/redux/actions';

// theme
import {Layout, Images, Gutters, Colors, Global, Fonts} from 'src/theme';

// styles
import styles from './styles';

const PaymentMethodScreen = (props) => {
  let route = useRoute();
  const isFocused = useIsFocused();
  const [cardDeleted, setCardDeleted] = useState(false);
  let manageCard = route?.params?.manageCard;
  const {
    requesting,
    cardDetail,
    defaultCard,
    navigation: {navigate},
  } = props;

  useEffect(() => {
    setTimeout(() => {
      props.getCardData();
    }, 500);
  }, [isFocused, cardDeleted]);

  const useThisCard = (card) => {
    const data = {
      card_id: card.id,
    };
    props.setDefaultCardData(data);
    console.log('useThisCard data', data);
    console.log('card', card);
  };

  const onDeleteCard = async (card) => {
    const data = {
      card_id: card.id,
    };
    await props.deleteCardData(data);
    setTimeout(() => {
      setCardDeleted(Math.floor(Math.random() * 100));
    }, 600);
    console.log('onDeleteCard data', data);
    console.log('card', card);
  };

  const {titleRegular, titleSmall, textSmall, textMedium} = Fonts;
  const {row, fill, center, alignItemsCenter, justifyContentCenter} = Layout;

  const {border} = Global;
  const {
    mediumHPadding,
    smallRMargin,
    smallLMargin,
    mediumTMargin,
    mediumVPadding,
  } = Gutters;
  const {
    icon,
    line,
    check,
    texts,
    button,
    mainBg,
    wrapper,
    primaryBg,
    mastercard,
    buttonText,
    textWrapper,
    visacardWrapper,
    masterCardWrapper,
  } = styles;
  console.log('cardDetail', cardDetail);
  console.log('defaultCard', defaultCard);
  return (
    <SafeAreaView style={[fill, {backgroundColor: '#fff'}]}>
      <Container style={mainBg}>
        <LuckyHeader
          title={
            <Text text="Payment Methods" color="#000" bold style={titleSmall} />
          }
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
              <Icon type="FontAwesome5" name="times" style={icon} />
            </TouchableOpacity>
          }
        />

        <View style={line} />
        <View style={[fill, mediumHPadding, mainBg, wrapper]}>
          <Content
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}>
            {cardDetail && cardDetail.list_card.length != 0 ? (
              cardDetail.list_card?.map((card, i) => (
                <View
                  style={[row, textWrapper, primaryBg, masterCardWrapper]}
                  key={i}>
                  <Image source={Images.mastercard} style={mastercard} />
                  <View style={[center, smallLMargin]}>
                    <Text text={card?.card?.last4} style={textMedium} />
                    {/* <Text text="PRIMARY" bold color="quinary" style={[textSmall]} /> */}
                  </View>
                  {/* <Image source={Images.check} style={check} /> */}
                  <View style={check}>
                    <TouchableOpacity onPress={() => useThisCard(card)}>
                      <Text text="Set as Default" bold style={texts} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onDeleteCard(card)}>
                      <Icon type="FontAwesome5" name="trash" style={texts} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <View style={[fill, center]}>
                <Text text="Card list is empty." />
              </View>
            )}
          </Content>
          <View style={{flex: 1}}>
            <View style={mediumTMargin}>
              <Button
                text="Add New"
                color="secondary"
                style={[smallLMargin, smallRMargin]}
                textStyle={buttonText}
                redBorder
                block
                onPress={() =>
                  navigate('AddCreditCardScreen', {manageCard: manageCard})
                }
              />
            </View>
            <View style={[center, visacardWrapper]}>
              <Image source={Images.visacard} />
            </View>
            <View style={[fill, button]}>
              <Button
                text="Proceed"
                color="primary"
                block
                disabled={!cardDetail}
                //onPress={() => navigate('BookingCompleteMarkScreen')}
                onPress={() => props.navigation.goBack()}
              />
            </View>
          </View>
        </View>
      </Container>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  cardDetail: state.cardDetail.cardDetail,
  defaultCard: state.card.defaultCard,
});

const mapDispatchToProps = (dispatch) => ({
  getCardData: () => dispatch(getCardData()),
  setDefaultCardData: (card) => dispatch(setDefaultCardData(card)),
  deleteCardData: (card) => dispatch(deleteCardData(card)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PaymentMethodScreen);
