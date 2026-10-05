import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import {Container} from 'native-base';
import {View, Alert} from 'react-native';
import {errorAlert} from 'src/utils/alerts';

// components
import {Text, Input, Button} from 'src/components';

// hooks
import useForm from 'src/hooks/useForm';

// utils
import validator from 'src/utils/validation';

// actions
import {requestPasswordReset as requestPasswordResetAction} from './redux/actions';

// theme
import {Layout, Gutters, Colors, Fonts} from 'src/theme';

// styles
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';

const ForgotPassword = (props) => {
  const {requesting, backendErrors} = props;

  const stateSchema = {
    email: {value: '', error: ''},
  };

  const validationStateSchema = {
    email: {
      required: true,
      validator: validator.email,
    },
  };

  const {state, handleOnChange, disable} = useForm(
    stateSchema,
    validationStateSchema,
  );

  const {titleRegular, textMedium, textCenter} = Fonts;
  const {fill, center} = Layout;
  const {mediumHPadding, smallBMargin, mediumTMargin, largeXHPadding} = Gutters;
  const {button} = styles;

  const onSubmit = () => {
    const {email} = state;
    props.requestPasswordReset({
      email: email.value,
    });
  };

  useEffect(() => {
    if (backendErrors?.data?.email[0]) {
      errorAlert(backendErrors.data.email[0]);
    }
  }, [backendErrors]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Container
        style={[fill, mediumHPadding, {backgroundColor: Colors.Alabaster}]}>
        <View style={[center]}>
          <Text
            text="Forgot Password"
            bold
            style={[{}, titleRegular, mediumTMargin, smallBMargin]}
          />
          <Text
            text="We will send a verification code to your email."
            style={[
              textCenter,
              textCenter,
              textMedium,
              mediumTMargin,
              smallBMargin,
              largeXHPadding,
            ]}
          />
        </View>
        <View style={mediumTMargin}>
          <Input
            value={state.email.value}
            placeholder="Email"
            sun
            onChangeText={(value) => handleOnChange('email', value)}
            error={state.email.error}
          />
        </View>
        <Button
          text="Send verification"
          color="primary"
          block
          disabled={disable}
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
  backendErrors: state.forgotPassword.backendErrors,
});

const mapDispatchToProps = (dispatch) => ({
  requestPasswordReset: (email) => dispatch(requestPasswordResetAction(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
