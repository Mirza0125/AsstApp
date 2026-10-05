import React, { useEffect, useState } from 'react';

// Components
import UInput from '../../../components/UInput';
import Button from '../../../components/Button';
import asstLogo from '../../../assets/images/asstLogo.svg'

// Validation
import useForm from '../../../utils/useForm';

// Routing
import { connect } from 'react-redux';

// Actions
import {
    postChangePassword,
    postChangePasswordFailure,
    postChangePasswordSuccess
} from './redux/action';

const ChangePassword = (props) => {
    const [passError, setPassError] = useState("")
    const [confPassError, setConfPassError] = useState("")

    const {
        BEError,
        requesting,
        postChangePassword,
        postChangePasswordSuccess,
        postChangePasswordFailure
    } = props;

    useEffect(() => {
            setPassError("")
            setConfPassError("")
    }, [])

    useEffect(() => {
        postChangePasswordFailure(false)
    }, [])


    const stateSchema = {
        password: {
            value: '',
            error: '',
        },
        token: {
            value: '',
            error: '',
        },
        confirmPassword: {
            value: '',
            error: '',
        }
    };

    const validationStateSchema = {
        password: {
            required: true,
        },
        token: {
            required: true,
        },
        confirmPassword: {
            required: true,
        }
    };

    const { state, handleOnChange, setState } = useForm(
        stateSchema,
        validationStateSchema,
    );

    const onSubmit = () => {
        const data = {
            password: state.password.value.trim(),
            password2: state.confirmPassword.value.trim(),
            token: state.token.value.trim(),
        };
        postChangePassword(data);
    };

    return (
        <section className="auth-page-section">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6 auth-left-side">
                        <div className="auth-form-wrapper column-flex change-password-form">
                            <div className="top-wrapper">
                                <div className="auth-leftfields-wrapper">
                                    <div className="login-to-asst auth-title" >
                                        Change Password
                                    </div>
                                    <div className='login-text'>
                                        <p>Create a new password</p>
                                    </div>
                                    <UInput
                                        type='text'
                                        placeholder='Enter OTP'
                                        value={state.token.value}
                                        onChange={(val) =>
                                            handleOnChange('token', val.target.value)
                                        }
                                        onFocus={() => postChangePasswordFailure(false)}
                                        inputError={BEError?.status || BEError?.token}
                                        errorText={BEError?.status || BEError?.token || state.token.error}
                                        errorClass={
                                            BEError?.status || BEError?.token || state.token.error ? 'opacity-1' : ''
                                        }
                                    />
                                    <UInput
                                        type='password'
                                        placeholder='Password'
                                        value={state.password.value}
                                        onChange={(val) =>
                                            {
                                            const inputValue = val.target.value
                                            if (inputValue?.length < 8) {
                                                setPassError("Password should be 8 characters long")
                                            } else {
                                                setPassError("")
                                            }
                                            handleOnChange('password', val.target.value)}
                                        }
                                        onFocus={() => postChangePasswordFailure(false)}
                                        inputError={passError?.length > 0 ? passError : BEError?.password || BEError?.non_field_errors}
                                        errorText={passError?.length > 0 ? passError : BEError?.password || BEError?.non_field_errors || state.password.error}
                                        errorClass={
                                            passError?.length > 0 || BEError?.password || BEError?.non_field_errors || state.password.error ? 'opacity-1' : ''
                                        }
                                    />
                                    <UInput
                                        type="password"
                                        placeholder="Confirm Password"
                                        value={state.confirmPassword.value}
                                        onChange={val => {
                                            {
                                            const inputValue = val.target.value
                                            if (inputValue?.length < 8) {
                                                setConfPassError("Password should be 8 characters long")
                                            } else {
                                                setConfPassError("")
                                            }
                                            handleOnChange("confirmPassword", val.target.value)}
                                        }}
                                        inputError={confPassError?.length > 0 ? confPassError : BEError?.password2}
                                        errorText={confPassError?.length > 0 ? confPassError : BEError?.password2 || state.confirmPassword.error}
                                        errorClass={
                                            BEError?.password2 || state.confirmPassword.error || confPassError?.length > 0 ? 'opacity-1' : ''
                                        }
                                    />
                                    <Button
                                        title="Send"
                                        onClick={() => onSubmit()}
                                        className="full-width"
                                        showSpinner={requesting}
                                        disabled={passError?.length > 0 || confPassError?.length > 0 ? true : false}
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
    changePasswordInfo: state.changePassword.changePasswordInfo,
    BEError: state.changePassword.error,
    requesting: state.changePassword.requesting,
});

const mapDispatchToProps = (dispatch) => ({
    postChangePassword: (data) => dispatch(postChangePassword(data)),
    postChangePasswordFailure: (data) => dispatch(postChangePasswordFailure(data)),
    postChangePasswordSuccess: (data) => dispatch(postChangePasswordSuccess(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
