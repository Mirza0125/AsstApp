import React, { useEffect, useState } from 'react';

// Components
import UInput from '../../../components/UInput';
import Button from '../../../components/Button';
import asstLogo from '../../../assets/images/asstLogo.svg'
import loginToAsst from '../../../assets/images/loginToAsst.svg'

// Validation
import useForm from '../../../utils/useForm';

// Routing
import { connect } from 'react-redux';
import { history } from '../../../reduxStore/store'

// Style
import './style.scss';

// Actions
import {
  loginRequest,
  loginRequestFailure,
} from './redux/action';

const Login = (props) => {
  const [PassError, setPassError] = useState("")
  const [emailError, setEmailError] = useState("")

  const {
    loginRequest,
    BEError,
    requesting,
    loginRequestFailure,
  } = props;

  useEffect(() => {
    loginRequestFailure(false)
  }, [])


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
    },
    password: {
      required: true,
    },
  };

  const { state, handleOnChange, setState } = useForm(
    stateSchema,
    validationStateSchema,
  );

  const onSubmit = () => {
    const data = {
      email: state.email.value.trim(),
      password: state.password.value,
    };
    loginRequest(data);
  };


  return (
    <section className="auth-page-section">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6 auth-left-side">
            <div className="auth-form-wrapper column-flex">
              <div className="top-wrapper">
                <div className="auth-leftfields-wrapper">
                  <div className="login-to-asst" >
                    <img src={loginToAsst} alt='login-to-asst' />
                  </div>
                  <div className='login-text'>
                    <p>Bringing value, meaning & community into everyday experiences.</p>
                  </div>
                  <UInput
                    placeholder="Email"
                    type='text'
                    className='email-field'
                    value={state.email.value}
                    onChange={(val) => {
                      const emailInputValue = val.target.value.trim()
                      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                      if (!pattern.test(emailInputValue)) {
                        setEmailError('The email you entered is not valid');
                      } else {
                        setEmailError('');
                      }
                      handleOnChange('email', emailInputValue)
                    }
                    }
                    onFocus={() => {
                      loginRequestFailure(false);
                    }}
                    inputError={emailError?.length > 0 ? emailError : BEError?.email}
                    errorText={emailError?.length > 0 ? emailError : BEError?.email || state.email.error}
                    errorClass={
                      BEError?.email || state.email.error || emailError?.length > 0 ? 'opacity-1' : ''
                    }
                  />

                  <UInput
                    type='password'
                    placeholder='Password'
                    value={state.password.value}
                    onChange={(val) => {
                      const inputValue = val.target.value
                      if (inputValue?.length < 8) {
                        setPassError("Password should be 8 characters long")
                      } else {
                        setPassError("")
                      }
                      handleOnChange('password', inputValue)
                    }
                    }
                    onFocus={() => loginRequestFailure(false)}
                    inputError={PassError?.length > 0 ? PassError : BEError?.password}
                    errorText={PassError?.length > 0 ? PassError : BEError?.password || state.password.error}
                    errorClass={
                      BEError?.password || state.password.error || PassError?.length > 0 ? 'opacity-1' : ''
                    }
                  />
                  <div className="forgot-password" onClick={() => history.push('/auth/forgot-password')}>
                    Forgot Password
                  </div>
                  <Button
                    title="Login"
                    onClick={() => onSubmit()}
                    className="full-width"
                    showSpinner={requesting}
                    disabled={PassError?.length > 0 || emailError?.length > 0 ? true : false}
                  />

                </div>
              </div>

            </div>
          </div>
          <div className="col-md-6 auth-right-side">
            <img src={asstLogo} alt='logo' />
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  loginInfo: state.login.loginInfo,
  BEError: state.login.error,
  requesting: state.login.requesting,
  firebaseToken: state.login.firebaseToken
});

const mapDispatchToProps = (dispatch) => ({
  loginRequest: (data) => dispatch(loginRequest(data)),
  loginRequestFailure: (data) => dispatch(loginRequestFailure(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
