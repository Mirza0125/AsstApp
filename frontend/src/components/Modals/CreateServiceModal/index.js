import React, { useState } from 'react';

// Components
import Modal from 'react-bootstrap/Modal';
import { history } from '../../../reduxStore/store';
import { Images } from '../../../theme/Images';
import Button from '../../Button';
import UInput from '../../UInput';
import Image from '../../Image';

// Style
import './style.scss'

const CreateServiceModal = ({ showModal, setShowModal }) => {


    return (
        <>
            <Modal
                show={showModal}
                setShow={setShowModal}
                centered
                className='auth-modal reset-modal'
            >
                <Modal.Header>
                    <Modal.Title>
                        <div className="wrapper flex-justify-end w-100">
                            <div className="close-icon"
                                onClick={() => setShowModal(false)}
                            >
                                <Image
                                    src={Images.closeIcon}
                                />
                            </div>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="auth-modal-body-wrapper reset-modal-body-wrapper">
                        <div className='designer-input-fields'>
                            <UInput
                                placeholder="Service Name"
                                type='text'
                                className='create-service-name'
                            />
                            <UInput
                                type='text'
                                placeholder='Price'
                                className='create-service-price'
                            />
                        </div>
                        <Button
                            title="Add"
                            className="create-service-button"
                            onClick={() => history.push('/admin/manage-services')}
                        />
                        {/* <div className="main-title">
                            Password Reset Done
                        </div>
                        <div className="button-wrapper flex-justify-center">
                            <Button
                                title='Login'
                                className='transparent-btn'
                                onClick={() => history.push('login')}
                            />
                        </div> */}
                    </div>
                </Modal.Body>
            </Modal>
        </>

    );
}


export default CreateServiceModal;
