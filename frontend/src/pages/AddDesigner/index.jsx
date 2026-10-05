import React, { useEffect } from 'react'

// Components
import HomeLayout from '../../layout/HomeLayout'
import UInput from '../../components/UInput';
import Button from '../../components/Button';

// Style
import './style.scss'

// Redux
import {
    postDesignerRequest,
    postDesignerFailure
} from './redux/action';

import useForm from '../../utils/useForm';

// Routing
import { connect } from 'react-redux';


const AddDesigner = (props) => {
    const {
        postDesignerRequest,
        BEError,
        requesting,
        postDesignerFailure,
    } = props;

    useEffect(() => {
        postDesignerFailure(false)
    }, [])


    const stateSchema = {
        name: {
            value: '',
            error: '',
        },
        email: {
            value: '',
            error: '',
        },
    };

    const validationStateSchema = {
        name: {
            required: true,
        },
        email: {
            required: true,
        },
    };

    const { state, handleOnChange, setState } = useForm(
        stateSchema,
        validationStateSchema,
    );

    const onSubmit = () => {
        const data = {
            name: state.name.value,
            email: state.email.value.trim(),
        };
        postDesignerRequest(data);
    };

    return (
        <HomeLayout>
            <div className='add-designer-wrapper'>
                <span className='designer-title'>Add Community Designer</span>
                <div className='designer-input-fields'>
                    <UInput
                        placeholder="Full Name"
                        type='text'
                        className='designer-full-name'
                        value={state.name.value}
                        onChange={(val) =>
                            handleOnChange('name', val.target.value)
                        }
                        onFocus={() => {
                            postDesignerFailure(false);
                        }}
                        inputError={BEError?.name}
                        errorText={BEError?.name || state.name.error}
                        errorClass={
                            BEError?.name || state.name.error ? 'opacity-1' : ''
                        }
                    />
                    <UInput
                        type='email'
                        placeholder='Email'
                        className='designer-email'
                        value={state.email.value}
                        onChange={(val) =>
                            handleOnChange('email', val.target.value)
                        }
                        onFocus={() => {
                            postDesignerFailure(false);
                        }}
                        inputError={BEError?.email}
                        errorText={BEError?.email || state.email.error}
                        errorClass={
                            BEError?.email || state.email.error ? 'opacity-1' : ''
                        }
                    />
                </div>
                <Button
                    title="Add"
                    className="add-designer-button"
                    onClick={() => onSubmit()}
                    showSpinner={requesting}
                />
            </div>
        </HomeLayout>
    )
}

const mapStateToProps = (state) => ({
    designerInfo: state.postDesigner.designerInfo,
    BEError: state.postDesigner.error,
    requesting: state.postDesigner.requesting,
});

const mapDispatchToProps = (dispatch) => ({
    postDesignerRequest: (data) => dispatch(postDesignerRequest(data)),
    postDesignerFailure: (data) => dispatch(postDesignerFailure(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddDesigner);
