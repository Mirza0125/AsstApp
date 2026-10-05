import React, { useState } from 'react';

// Components
import Modal from 'react-bootstrap/Modal';
import { postForgotRequestSuccess } from '../../../pages/AuthScreens/ForgotPassword/redux/action';
import { Images } from '../../../theme/Images';
import Button from '../../Button';
import Image from '../../Image';

// Redux
import { connect } from 'react-redux';

// Style
import '../style.scss'

const EmailSentModal = ({ showSentModal, setShowSentModal, ...props }) => {

    const { postForgotRequestSuccess } = props

    return (
        <>
            <Modal
                show={showSentModal}
                setShow={setShowSentModal}
                centered
                className='auth-modal sent-modal'
            >
                <Modal.Header>
                    <Modal.Title>
                        <div className="wrapper flex-justify-end w-100">
                            <div className="close-icon"
                                onClick={() => {
                                    setShowSentModal(false)
                                    postForgotRequestSuccess(false)
                                }}
                            >
                                <Image
                                    src={Images.closeIcon}
                                />
                            </div>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="auth-modal-body-wrapper sent-modal-body-wrapper">
                        <div className="main-title">
                            Email Sent
                        </div>
                        <div className="text">
                            Check you email and follow the instructions to reset your password.
                        </div>
                        <div className="button-wrapper flex-justify-center">
                            <Button
                                title='Done'
                                className='transparent-btn'
                                onClick={() => {
                                    setShowSentModal(false)
                                    postForgotRequestSuccess(false)
                                }}
                            />
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>

    );
}



const mapDispatchToProps = dispatch => ({
    postForgotRequestSuccess: (data, history) => dispatch(postForgotRequestSuccess(data, history))
})

export default connect(null, mapDispatchToProps)(EmailSentModal)