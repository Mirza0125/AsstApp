import React, {useState} from 'react';
import {connect} from 'react-redux';

import {Container, Content, Icon} from 'native-base';
import {View, SafeAreaView} from 'react-native';
import {showMessage} from 'react-native-flash-message';

// components
import {Text, Input, Button, LuckyHeader} from 'src/components';

// hooks
import useForm from 'src/hooks/useForm';

// utils
import validator from 'src/utils/validation';

//actions
import {requestChangePassword} from './redux/actions';

// theme
import {Layout, Gutters, Colors, Fonts} from 'src/theme';

// styles
import styles from './styles';

const ChangePassword = (props) => {
  const {
    requesting,
    navigation: {navigate},
  } = props;

  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [currentPasswordShown, setCurrentPasswordShown] = useState(false);

  const {titleRegular, textMedium, textCenter, titleSmall} = Fonts;
  const {row, fill, center} = Layout;
  const {mediumHPadding, smallBMargin, mediumTMargin, mediumTPadding} = Gutters;
  const {button, text, line} = styles;

  const stateSchema = {
    old_password: {
      value: '',
      error: '',
    },
    new_password1: {
      value: '',
      error: '',
    },
    new_password2: {
      value: '',
      error: '',
    },
  };
  const validationStateSchema = {
    old_password: {
      required: true,
      validator: validator.old_password,
    },
    new_password1: {
      required: true,
      validator: validator.new_password1,
    },
    new_password2: {
      required: true,
      validator: validator.new_password2,
    },
  };

  const submitForm = () => {
    const data = {
      old_password: state.old_password.value,
      new_password1: state.new_password1.value,
      new_password2: state.new_password2.value,
    };
    if (data.new_password1 == data.new_password2) {
      props.requestChangePassword(data);
    } else {
      showMessage({
        message: 'Password do not match.',
        type: 'danger',
      });
    }
  };

  const {state, handleOnChange, disable} = useForm(
    stateSchema,
    validationStateSchema,
  );

  return (
    <SafeAreaView
      style={[fill, mediumHPadding, {backgroundColor: Colors.white}]}>
      <LuckyHeader
        left={
          <Icon
            type="Entypo"
            name="cross"
            style={{fontSize: 20}}
            onPress={() => props.navigation.goBack()}
          />
        }
        title={
          <Text text="Change password" color="#000" bold style={titleSmall} />
        }
      />
      <View style={line} />
      <Content showsVerticalScrollIndicator={false}>
        <View style={{marginLeft: '5%'}}>
          <Text
            text="Current password"
            style={[textMedium, mediumTMargin, text]}
          />
        </View>

        <View style={{}}>
          <View
            style={[
              smallBMargin,
              {width: '90%', alignSelf: 'center', marginTop: 10},
            ]}>
            <Input
              value={state.old_password.value}
              placeholder="Current Password"
              onPress={() => setCurrentPasswordShown(!currentPasswordShown)}
              onChangeText={(value) => handleOnChange('old_password', value)}
              icon={currentPasswordShown ? 'eye-slash' : 'eye'}
              password
              error={state.old_password.error}
            />
          </View>

          <View style={{marginLeft: '5%'}}>
            <Text
              text="Set new password"
              style={[textMedium, mediumTMargin, text]}
            />
          </View>

          <View
            style={[
              smallBMargin,
              {width: '90%', alignSelf: 'center', marginTop: 10},
            ]}>
            <Input
              value={state.new_password1.value}
              placeholder="New Password"
              onPress={() => setPasswordShown(!passwordShown)}
              onChangeText={(value) => handleOnChange('new_password1', value)}
              icon={passwordShown ? 'eye-slash' : 'eye'}
              password
              error={state.new_password1.error}
            />
          </View>

          <View
            style={[
              smallBMargin,
              {width: '90%', alignSelf: 'center', marginTop: 10},
            ]}>
            <Input
              value={state.new_password2.value}
              placeholder="Confirm Password"
              onPress={() => setConfirmPasswordShown(!confirmPasswordShown)}
              icon={confirmPasswordShown ? 'eye-slash' : 'eye'}
              onChangeText={(value) => handleOnChange('new_password2', value)}
              password
              error={state.new_password2.error}
            />
          </View>
        </View>

        <View style={[mediumHPadding, mediumTPadding]}>
          <Button
            text="Save changes"
            color="primary"
            block
            disabled={disable}
            loading={requesting}
            onPress={() => submitForm()}
            style={button}
          />
        </View>
      </Content>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  requesting: state.changePassword.requesting,
});
const mapDispatchToProps = (dispatch) => ({
  requestChangePassword: (data) => dispatch(requestChangePassword(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
