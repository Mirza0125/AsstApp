import React, { useEffect } from 'react';

// Components
import asstLogo from '../../../assets/images/asstLogo.svg';
import Button from '../../../components/Button';
import UInput from '../../../components/UInput';

// Validation
import useForm from '../../../utils/useForm';

// Routing
import { connect } from 'react-redux';

// Actions
import {
    forgotPasswordRequest,
    forgotPasswordRequestFailure,
    forgotPasswordRequestSuccess
} from './redux/action';

const ForgotPassword = (props) => {
    const {
        BEError,
        requesting,
        forgotPasswordRequest,
        forgotPasswordRequestSuccess,
        forgotPasswordRequestFailure
    } = props;

    // useEffect(() => {
    //     forgotPasswordRequestFailure(false)
    // }, [])

    const stateSchema = {
        email: {
            value: '',
            error: '',
        }
    };

    const validationStateSchema = {
        email: {
            required: true,
        }
    };

    const { state, handleOnChange, setState } = useForm(
        stateSchema,
        validationStateSchema,
    );

    const onSubmit = () => {
        const data = {
            email: state.email.value,
        };
        forgotPasswordRequest(data);
    };

    return (
        <section className="auth-page-section">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6 auth-left-side">
                        <div className="auth-form-wrapper column-flex forgot-password-form">
                            <div className="top-wrapper">
                                <div className="auth-leftfields-wrapper">
                                    <div className="login-to-asst auth-title" >
                                        Forgot Password?
                                    </div>
                                    <div className='login-text'>
                                        <p>Bringing value, meaning & community into everyday experiences.</p>
                                    </div>
                                    <UInput
                                        placeholder="Email"
                                        type='text'
                                        className='email-field'
                                        value={state.email.value ? state.email.value : ''}
                                        onChange={(val) =>
                                            handleOnChange('email', val.target.value.trim())
                                        }
                                        onFocus={() => {
                                            forgotPasswordRequestFailure(false)
                                        }}
                                        inputError={BEError?.email}
                                        errorText={BEError?.email || state.email.error}
                                        errorClass={
                                            BEError?.email || state.email.error ? 'opacity-1' : ''
                                        }
                                    />
                                    <Button
                                        title="Send"
                                        onClick={() => onSubmit()}
                                        className="full-width"
                                        showSpinner={requesting}
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
    BEError: state.forgotPassword.error,
    requesting: state.forgotPassword.requesting
});

const mapDispatchToProps = (dispatch) => ({
    forgotPasswordRequest: (data) => dispatch(forgotPasswordRequest(data)),
    forgotPasswordRequestSuccess: (data) => dispatch(forgotPasswordRequestSuccess(data)),
    forgotPasswordRequestFailure: (data) => dispatch(forgotPasswordRequestFailure(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
