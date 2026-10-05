import React, { useState, useEffect } from 'react'
import Button from '../../components/Button'
import UInput from '../../components/UInput'
import HomeLayout from '../../layout/HomeLayout'
import { Images } from '../../theme/Images'

import { history } from '../../reduxStore/store'
import './style.scss'

import dummyProfile from '../../assets/images/dummyProfile.png'

import {
    updateProfileRequest,
    updateProfileFailure,
} from './redux/action'

// Routing
import useForm from '../../utils/useForm';
import { connect } from 'react-redux'


const MyProfile = (props) => {
    const {
        loginInfo,
        updateProfileRequest,
        updateProfileFailure,
        error,
        requesting,
    } = props;

    useEffect(() => {
        updateProfileFailure(false)
    }, [])

    const [prevName, setPrevName] = useState(loginInfo.name)
    const [prevEmail, setPrevEmail] = useState(loginInfo.email)
    const [prevPhone, setPrevPhone] = useState(loginInfo.phone_number)

    const stateSchema = {
        name: {
            value: '',
            error: '',
        },
        email: {
            value: '',
            error: '',
        },
        phone_number: {
            value: '',
            error: '',
        }
    };

    const validationStateSchema = {
        name: {
            required: false,
        },
        email: {
            required: false,
        },
        phone_number: {
            required: false,
        }
    };

    const { state, handleOnChange, setState } = useForm(
        stateSchema,
        validationStateSchema,
    );

    const handleOnClick = () => {
        const data = {
            id: loginInfo.id,
            name: prevName,
            email: prevEmail,
            phone_number: prevPhone,
        };
        updateProfileRequest(data)
    }

    return (
        <HomeLayout contentClassName='overflow-hidden'>
            <div className="my-profile-section-wrapper">
                <div className="navigate-head flex-align-center">
                    <img src={Images.backArrow} onClick={() => history.goBack()} alt="" />
                    <p>{loginInfo?.name}</p>
                </div>
                <div className="my-profile-wrapper">
                    <div className="my-profile-details-wrapper">
                        <div className="my-profile-details">
                            <div className="my-profile-info">
                                <div className="avatar">
                                    {loginInfo.image ? <img src={loginInfo?.image} alt="" /> :
                                    <img src={dummyProfile} alt="" className='concierge-dummy-profile' />}
                                </div>
                                <p>{loginInfo?.name}</p>
                            </div>
                            <div className="my-profile-fields-wrapper">
                                <UInput
                                    placeholder='Name'
                                    value={prevName}
                                    onChange={(val) => {setPrevName(val.target.value); 
                                        handleOnChange("name", val.target.value)}}
                                    onFocus={() => {
                                        updateProfileFailure(false);
                                    }}
                                    inputError={error?.name}
                                    errorText={error?.name || state.name.error}
                                    errorClass={
                                        error?.name || state.name.error ? 'opacity-1' : ''
                                    }
                                />
                                <UInput
                                    placeholder='Email'
                                    value={prevEmail}
                                    onChange={(val) => {setPrevEmail(val.target.value); 
                                        handleOnChange("email", val.target.value)}}
                                    onFocus={() => {
                                        updateProfileFailure(false);
                                    }}
                                    inputError={error?.email}
                                    errorText={error?.email || state?.email?.error}
                                    errorClass={
                                        error?.email || state?.email?.error ? 'opacity-1' : ''
                                    }
                                />
                                <UInput
                                    placeholder='Phone Number'
                                    value={prevPhone}
                                    onChange={(val) => {setPrevPhone(val.target.value); 
                                        handleOnChange("phone_number", val.target.value)}}
                                    onFocus={() => {
                                        updateProfileFailure(false);
                                    }}
                                    inputError={error?.phone_number}
                                    errorText={error?.phone_number || state?.phone_number?.error}
                                    errorClass={
                                        error?.phone_number || state?.phone_number?.error ? 'opacity-1' : ''
                                    }
                                />
                            </div>
                            <Button
                                title="Edit Profile"
                                className="update-concierge-btn"
                                onClick={() => handleOnClick()}
                                showSpinner={requesting && requesting} />
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}

const mapStateToProps = (state) => ({
    loginInfo: state.login.loginInfo,
    conciergeProfile: state.conciergeData.conciergeProfile,
    error: state.conciergeData.error,
    requesting: state.conciergeData.requesting,
});

const mapDispatchToProps = (dispatch) => ({
    updateProfileRequest: (data) => dispatch(updateProfileRequest(data)),
    updateProfileFailure: (data) => dispatch(updateProfileFailure(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
