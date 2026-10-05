import React, {useState} from 'react';
import {connect} from 'react-redux';

import {Container, Content, Icon} from 'native-base';
import {View, TouchableOpacity} from 'react-native';

// components
import {Text, Input, Button} from 'src/components';

// hooks
import useForm from 'src/hooks/useForm';

// utils
import validator from 'src/utils/validation';

//Action
import {requestNewPassword} from './redux/actions';

// theme
import {Layout, Gutters, Colors, Fonts} from 'src/theme';

// styles
import styles from './styles';

const NewPassword = (props) => {
  const {
    requesting,
    navigation: {navigate},
    route: {
      params: {
        data: {token},
      },
    },
  } = props;

  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const {titleRegular, textMedium, textCenter} = Fonts;
  const {row, fill, center} = Layout;

  const {
    mediumHPadding,
    smallBMargin,
    mediumTMargin,
    mediumVMargin,
    regularLMargin,
  } = Gutters;

  const {button, text, icon} = styles;

  const stateSchema = {
    password: {
      value: '',
      error: '',
    },
    confirm_password: {
      value: '',
      error: '',
    },
  };
  const validationStateSchema = {
    password: {
      required: true,
      validator: validator.password,
    },
    confirm_password: {
      required: true,
      validator: {
        compare: (value) => value !== state.password.value,
        error: "Your passwords didn't match.",
      },
    },
  };

  const submitForm = () => {
    const data = {
      password: state.password.value,
      token: token,
    };
    props.requestNewPassword(data);
  };

  const {state, handleOnChange, disable} = useForm(
    stateSchema,
    validationStateSchema,
  );

  return (
    <Container style={[fill, mediumHPadding, {backgroundColor: Colors.white}]}>
      <Content showsHorizontalScrollIndicator={false}>
        <View style={center}>
          <Text
            text="Set a new password"
            bold
            style={[{}, titleRegular, mediumTMargin, smallBMargin]}
          />
          <Text
            text="Create a new password for you account"
            style={[textCenter, textMedium, mediumTMargin, smallBMargin, text]}
          />
        </View>
        <View style={mediumTMargin}>
          <View style={smallBMargin}>
            <Input
              value={state.password.value}
              placeholder="Password"
              onPress={() => setPasswordShown(!passwordShown)}
              onChangeText={(value) => handleOnChange('password', value)}
              icon={passwordShown ? 'eye-slash' : 'eye'}
              password
              error={state.password.error}
            />
          </View>
          <Input
            value={state.confirm_password.value}
            placeholder="Confirm Password"
            onPress={() => setConfirmPasswordShown(!confirmPasswordShown)}
            icon={confirmPasswordShown ? 'eye-slash' : 'eye'}
            onChangeText={(value) => handleOnChange('confirm_password', value)}
            password
            error={state.confirm_password.error}
          />
        </View>
        <Button
          text="Done"
          color="primary"
          block
          loading={requesting}
          onPress={() => submitForm()}
          style={button}
        />
        <TouchableOpacity
          style={[row, center, mediumVMargin]}
          onPress={() => navigate('Login')}>
          <Icon type="AntDesign" name="arrowleft" style={icon} />
          <Text
            text="Login"
            color="secondary"
            style={[textMedium, regularLMargin]}
            bold
          />
        </TouchableOpacity>
      </Content>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  requesting: state.newPassword.requesting,
});

const mapDispatchToProps = (dispatch) => ({
  requestNewPassword: (data) => dispatch(requestNewPassword(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPassword);
