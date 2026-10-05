import {connect} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {Container, Content, Icon} from 'native-base';
import {View, Image, Switch, TouchableOpacity, StatusBar} from 'react-native';
import {CreditCardInput} from 'react-native-input-credit-card';
import {useNavigation, useRoute} from '@react-navigation/native';
import moment from 'moment';
// components
import {Text, Input, Button} from 'src/components';

// //actions
import {postCardData} from './redux/actions';

// theme
import {Layout, Images, Gutters, Colors, Global, Fonts} from 'src/theme';

// styles
import styles from './styles';

const AddCreditCardScreen = (props) => {
  let route = useRoute();
  const [switchValue, setSwitchValue] = useState(false);
  const [cardData, setCardData] = useState({});
  const {
    card,
    navigation: {navigate},
  } = props;

  //   useEffect(() => {
  //     props.getEmployeeData();
  //   }, []);

  const onChange = (form) => setCardData(form);
  console.log('card>>', card);
  console.log('cardData>>State>>', cardData);
  // will print:
  // const cardData = {
  //   valid: true, // will be true once all fields are "valid" (time to enable the submit button)
  //   values: {
  //     // will be in the sanitized and formatted form
  //     number: '4242 4242',
  //     expiry: '06/19',
  //     cvc: '300',
  //     type: 'visa', // will be one of [null, "visa", "master-card", "american-express", "diners-club", "discover", "jcb", "unionpay", "maestro"]
  //     name: 'Sam',
  //     postalCode: '34567',
  //   },
  //   status: {
  //     // will be one of ["incomplete", "invalid", and "valid"]
  //     number: 'incomplete',
  //     expiry: 'incomplete',
  //     cvc: 'incomplete',
  //     name: 'incomplete',
  //     postalCode: 'incomplete',
  //   },
  // };

  // Notes:
  // cvc, name, & postalCode will only be available when the respective props is enabled (e.g. requiresName, requiresCVC)

  const submitData = () => {
    let month = moment(cardData.values.expiry, 'MM/YY').format('MM');
    let year = moment(cardData.values.expiry, 'MM/YY').format('YY');
    let manageCard = route?.params?.manageCard;
    if (cardData.valid) {
      console.log('cardData', cardData);
      let data = {
        card_number: cardData.values.number,
        card_exp_month: month, //cardData.values.expiry.slice(0, 2),
        card_exp_year: year, //cardData.values.expiry.slice(3, 5),
        card_cvv: cardData.values.cvc,
      };
      props.postCardData(data, manageCard);
    }
  };

  const {titleRegular, textMedium} = Fonts;
  const {row, fill, justifyContentBetween, alignItemsCenter} = Layout;

  const {
    mediumHPadding,
    smallHPadding,
    smallLPadding,
    smallVMargin,
    mediumVPadding,
  } = Gutters;
  const {mainBg, wrapper, line} = styles;

  return (
    <Container style={mainBg}>
      <View
        style={[
          row,
          alignItemsCenter,
          justifyContentBetween,
          mediumHPadding,
          mediumVPadding,
          mainBg,
        ]}>
        {/* <StatusBar backgroundColor={Colors.white} barStyle="dark-content" /> */}
        <Icon
          type="FontAwesome5"
          name="times"
          onPress={() => props.navigation.goBack()}
        />
        <Text text="Add Card" bold color="quaternary" style={titleRegular} />

        <TouchableOpacity onPress={() => submitData()}>
          <Text text="Save" bold style={textMedium} />
        </TouchableOpacity>
      </View>
      <View style={line} />
      <Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[fill, smallHPadding, mainBg, wrapper]}>
        <View style={[smallVMargin]}>
          <CreditCardInput onChange={onChange} />
        </View>
        {/* <View style={smallHPadding}>
          <View style={[row, justifyContentBetween, alignItemsCenter]}>
            <Text text="Set as primary" style={[textMedium, smallLPadding]} />
            <Switch
              value={switchValue}
              onValueChange={(val) => setSwitchValue(val)}
              trackColor={{ true: Colors.torchRed }}
              thumbColor="#f4f3f4"
            />
          </View>
        </View> */}
      </Content>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  card: state.card.cardData,
});

const mapDispatchToProps = (dispatch) => ({
  postCardData: (data, manageCard) => dispatch(postCardData(data, manageCard)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddCreditCardScreen);
