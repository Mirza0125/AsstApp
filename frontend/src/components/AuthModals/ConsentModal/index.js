import React, {useState} from 'react';

// Components
import Modal from 'react-bootstrap/Modal';
import Button from '../../Button';
import UCheckbox from '../../UCheckbox';

// Redux
import {connect} from 'react-redux';

// Style
import '../style.scss';

// Routing
import {history} from '../../../reduxStore/store';
import {signupRequestSuccess} from '../../../pages/AuthScreens/SignUp/redux/action';

const ConsentModal = ({
  showConsentModal,
  setShowConsentModal,
  showSpinner,
  onClick,
  checkValue1,
  checkValue2,
  setCheckValue1,
  setCheckValue2,
  ...props
}) => {
  const {singupRequestSuccess} = props;

  return (
    <>
      <Modal
        show={showConsentModal}
        setShow={setShowConsentModal}
        centered
        className="auth-modal consent-modal">
        <Modal.Body>
          <div className="auth-modal-body-wrapper consent-modal-body-wrapper">
            <div className="main-title">Candidate Consent</div>
            <UCheckbox
              label="We would like to send you electronic communications regarding employment related opportunities, services and information that we consider suitable for you."
              value={checkValue1}
              onChange={(e) => {
                setCheckValue1(e.target.checked);
              }}
              checked={checkValue1}
            />
            <UCheckbox
              label="I would like to sare my personal data with other Companies within the Manpower Group."
              onChange={(e) => {
                setCheckValue2(e.target.checked);
              }}
              checked={checkValue2}
            />
            <div className="button-wrapper flex-justify-between">
              <Button
                title="Cancel"
                className="transparent-btn"
                onClick={() => setShowConsentModal(false)}
              />
              <Button
                title="Continue"
                className="lukymoon-btn"
                onClick={onClick}
                showSpinner={showSpinner}
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  singupRequestSuccess: (data) => dispatch(signupRequestSuccess(data)),
});

export default connect(null, mapDispatchToProps)(ConsentModal);
