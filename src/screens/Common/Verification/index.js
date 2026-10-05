import React, {useState} from 'react';
import {connect} from 'react-redux';

import {Container} from 'native-base';
import {SafeAreaView, View} from 'react-native';

// components
import {Text, Button, CodeVerificationInput, LuckyHeader} from 'src/components';

//Action
import {verifyPasswordReset} from 'src/screens/Common/ForgotPassword/redux/actions';

// utils
import {emailEllipsis} from 'src/utils/functions';

// theme
import {Layout, Gutters, Colors, Fonts} from 'src/theme';

// styles
import styles from './styles';

const Verification = (props) => {
  const {
    requesting,
    navigation: {navigate},
    route: {
      params: {
        email: {email},
      },
    },
  } = props;

  const [code, setCode] = useState(false);

  const {titleRegular, textMedium, textCenter} = Fonts;
  const {fill, center} = Layout;
  const {mediumHPadding, smallBMargin, mediumTMargin} = Gutters;
  const {button, text} = styles;

  const onSubmit = () => {
    props.verifyPasswordReset({token: code});
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Container
        style={[fill, mediumHPadding, {backgroundColor: Colors.white}]}>
        <LuckyHeader
          title={
            <Text
              text="Verification Code"
              bold
              style={[titleRegular, mediumTMargin, smallBMargin]}
            />
          }
        />
        <View style={[center]}>
          <Text
            text={`Please enter the verification code sent to ${emailEllipsis(
              email,
            )}`}
            style={[textCenter, textMedium, mediumTMargin, smallBMargin, text]}
          />
        </View>
        <View style={mediumTMargin}>
          <CodeVerificationInput onFulfill={(code) => setCode(code)} />
        </View>
        <Button
          text="Done"
          color="primary"
          block
          disabled={!code}
          loading={requesting}
          onPress={() => onSubmit()}
          style={button}
        />
      </Container>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  requesting: state.forgotPassword.requesting,
});

const mapDispatchToProps = (dispatch) => ({
  verifyPasswordReset: (data) => dispatch(verifyPasswordReset(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Verification);
