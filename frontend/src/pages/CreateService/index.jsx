import React, { useEffect, useState } from 'react'

// Components
import HomeLayout from '../../layout/HomeLayout'
import UInput from '../../components/UInput';
import Button from '../../components/Button';

// Style
import './style.scss'

// Icons
import servicesArrow from '../../assets/images/servicesArrow.svg'

// Routing
import { history } from '../../reduxStore/store';

// Redux
import {
    postServiceRequest,
    postServiceFailure,
    updateServiceRequest,
    updateServiceFailure,
    prevDataAction,
    setSuccessAction,
} from './redux/action'

import useForm from '../../utils/useForm';
import { connect } from 'react-redux';


const CreateService = (props) => {
    const [error, setError] = useState('');

    const {
        postServiceRequest,
        BEError,
        requesting,
        postServiceFailure,
        prevData,
        prevDataAction,
        updateServiceRequest,
        updateRequesting,
        setSuccessAction,
        success,
    } = props;

    const convertPrice = (price) => {
        if (price) {
            const priceString = price;
            const priceValue = parseFloat(priceString.replace("$", "").replace("/h", ""));
            return priceValue
        }
    }

    const [prevName, setPrevName] = useState(prevData?.data?.name)
    const [prevPrice, setPrevPrice] = useState(convertPrice(prevData?.data?.price))
    const price = Number(prevPrice)

    useEffect(() => {
        postServiceFailure(false)
        updateServiceFailure(false)
    }, [])

    const stateSchema = {
        name: {
            value: '',
            error: '',
        },
        price: {
            value: '',
            error: '',
        },
    };

    const validationStateSchema = {
        name: {
            required: true,
        },
        price: {
            required: true,
        },
    };

    const { state, handleOnChange, setState } = useForm(
        stateSchema,
        validationStateSchema,
    );

    const postOnSubmit = () => {
        if (error?.length > 1) { } else {
            const data = {
                name: state.name.value,
                price: state.price.value,
            };
            postServiceRequest(data);
            setSuccessAction({ success: true })
        }
    };

    const updateOnSubmit = () => {
        if (error?.length > 1) { } else {
            const data = {
                id: prevData.data.id,
                name: prevName,
                price: price.toFixed(2),
            }
            updateServiceRequest(data)
            setSuccessAction({ success: true })
        }
    }

    const handleGoBack = () => {
        prevDataAction({ data: {}, isEdit: false })
        setSuccessAction({ success: false })
        history.goBack()
    }

    return (
        <HomeLayout>
            <div className='create-service-wrapper'>
                <div className='create-service-heading-wrapper'>
                    <img onClick={() => handleGoBack()} className='create-service-arrow' src={servicesArrow} alt='arrow' />
                    <span className='create-service-heading'>{prevData.isEdit ? "Edit Service" : "Create Service"}</span>
                </div>
                <div className='create-service-input-fields'>
                    <UInput
                        placeholder="Service Name"
                        type='text'
                        className='create-service-name'
                        value={prevData.isEdit ? prevName : state.name.value}
                        onChange={(val) => { prevData.isEdit ? setPrevName(val.target.value) : handleOnChange('name', val.target.value) }
                        }
                        onFocus={() => {
                            postServiceFailure(false);
                        }}
                        inputError={BEError?.name}
                        errorText={BEError?.name || state.name.error}
                        errorClass={
                            BEError?.name || state.name.error ? 'opacity-1' : ''
                        }

                    />
                    <UInput
                        type='text'
                        placeholder='Price'
                        className='create-service-price'
                        value={prevData.isEdit ? prevPrice : state.price.value}
                        // onChange={(val) => { prevData.isEdit ? setPrevPrice(val.target.value) : handleOnChange('price', val.target.value) }
                        // }
                        onChange={(val) => {
                            const inputValue = val.target.value;
                            const pattern = /^(\d{0,3})(\.\d{0,2})?$/;

                            if (!pattern.test(inputValue)) {
                                if (inputValue.includes('.') && inputValue.split('.')[1].length > 2) {
                                    setError('Maximum 2 digits after the decimal point allowed');
                                } else if (inputValue.length > 3) {
                                    setError('Maximum 3 digits before the decimal point allowed');
                                } else {
                                    setError('Invalid input');
                                }
                            } else {
                                setError('');
                            }

                            prevData.isEdit ? setPrevPrice(inputValue) : handleOnChange('price', inputValue);
                        }}
                        onFocus={() => {
                            postServiceFailure(false);
                        }}
                        inputError={error?.length > 0 ? error : BEError?.price}
                        errorText={error?.length > 0 ? error : BEError?.price || state.price.error}
                        errorClass={
                            BEError?.price || state.price.error || error?.length > 0 ? 'opacity-1' : ''
                        }
                    />
                </div>
                <Button
                    title={prevData.isEdit ? "Edit" : "Add"}
                    className="create-service-button"
                    onClick={() => { prevData.isEdit ? updateOnSubmit() : postOnSubmit() }}
                    showSpinner={prevData.isEdit ? updateRequesting : requesting}
                    disabled={success ? success : false}
                />
            </div>
        </HomeLayout>
    )
}

const mapStateToProps = (state) => ({
    console: console.log(state),
    prevData: state.postServices.prevData,
    servicesInfo: state.services.services,
    BEError: state.postServices.error,
    requesting: state.services.requesting,
    updateRequesting: state.postServices.updateRequesting,
    success: state.postServices.setSuccess.success
});

const mapDispatchToProps = (dispatch) => ({
    postServiceRequest: (data) => dispatch(postServiceRequest(data)),
    postServiceFailure: (data) => dispatch(postServiceFailure(data)),
    updateServiceRequest: (data) => dispatch(updateServiceRequest(data)),
    updateServiceFailure: (data) => dispatch(updateServiceFailure(data)),
    prevDataAction: (data) => dispatch(prevDataAction(data)),
    setSuccessAction: (data) => dispatch(setSuccessAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateService);
