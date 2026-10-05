import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

// components
import {Text, Button, Input} from 'src/components';
import {StatusBar} from 'react-native';
import {Icon, Container, Content} from 'native-base';
import {View, TouchableOpacity, Image} from 'react-native';
import auth from '@react-native-firebase/auth';
// hooks
import useForm from 'src/hooks/useForm';

// utils
import validator from 'src/utils/validation';

// actions
import {login} from './redux/actions';

// styles
import styles from './styles';
import {Layout, Fonts, Images, Colors, Gutters} from 'src/theme';

const Login = (props) => {
  const {
    navigation: {navigate},
    requesting,
  } = props;

  console.log(props?.route?.params?.userType);

  const [passwordShown, setPasswordShown] = useState(false);

  const stateSchema = {
    email: {
      value: '',
      error: '',
    },
    password: {
      value: '',
      error: '',
    },
  };
  const validationStateSchema = {
    email: {
      required: true,
      validator: validator.email,
    },
    password: {
      required: true,
    },
  };

  const submitForm = () => {
    const data = {
      password: state.password.value,
      email: state.email.value,
      role: 'resident'
    };
    props.login(data);
    // let fb = 'fb.';
    // let fbEmail = fb.concat(data.email);
    // console.log('fbEmail', fbEmail);
    // auth()
    //   .signInWithEmailAndPassword(fbEmail, data.password)
    //   .then((userCredential) => {
    //     // Signed in
    //     const user = userCredential.user;
    //     console.log('User signed in');
    //     // ...
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //   });
  };

  const {state, handleOnChange, disable} = useForm(
    stateSchema,
    validationStateSchema,
  );

  const {row, fill, center} = Layout;
  const {
    mediumHPadding,
    largeVMargin,
    smallBMargin,
    mediumVMargin,
    largeBMargin,
    regularRMargin,
    smallHPadding,
    mediumTMargin,
  } = Gutters;
  const {titleRegular, textMedium, textRegular} = Fonts;
  const {icon, login, title} = styles;

  return (
    <Container style={mediumHPadding}>
      {/* <StatusBar backgroundColor={Colors.white} barStyle="dark-content" /> */}
      <Content showsVerticalScrollIndicator={false}>
        <Image
          style={{
            alignSelf: 'center',
            width: '80%',
            height: '28%',
            marginTop: '30%',
          }}
          resizeMode={'contain'}
          source={require('../../../assets/images/LoginIcon.png')}
        />

        <View style={[fill, mediumTMargin]}>
          <View style={smallBMargin}>
            <Input
              value={state.email.value}
              placeholder="Email"
              onChangeText={(value) => handleOnChange('email', value)}
              error={state.email.error}
            />
          </View>
          <View style={smallBMargin}>
            <Input
              value={state.password.value}
              placeholder="Password"
              onPress={() => setPasswordShown(!passwordShown)}
              onChangeText={(value) => handleOnChange('password', value)}
              icon={passwordShown ? 'eye-slash' : 'eye'}
              password={!passwordShown}
              error={state.password.error}
            />
          </View>
<TouchableOpacity onPress={() => navigate('ForgotPassword')}>
            <Text
              text="Forgot password?"
              style={[
                textRegular,
                regularRMargin,
                {alignSelf: 'flex-end', color: Colors.Turquoise},
              ]}
            />
          </TouchableOpacity>
          <Button
            text="Login"
            color="primary"
            block
            loading={requesting}
            disabled={disable}
            style={login}
            onPress={() => submitForm()}
          />
          {/* <TouchableOpacity
            onPress={() => navigate('Register')}
            style={[row, center, mediumVMargin]}>
            <Text
              text="Sign up"
              color="secondary"
              style={[textMedium, regularRMargin]}
              bold
            />
            <Icon type="AntDesign" name="arrowright" style={icon} />
          </TouchableOpacity> */}
        </View>
      </Content>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  requesting: state.login.requesting,
});

const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch(login(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
