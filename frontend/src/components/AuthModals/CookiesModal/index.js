import React, {useState} from 'react';

// Components
import Modal from 'react-bootstrap/Modal';
import Button from '../../Button';
import PrivacyTermsModal from '../../PrivacyTermsModal';

// Style
import '../style.scss';

const CookiesModal = ({showCookiesModal, setShowCookiesModal, ...props}) => {
  const [requesting, setRequesting] = useState(false);
  const [show, setShow] = useState(false);
  const [currentData, setCurrentData] = useState('');

  return (
    <>
      <Modal
        show={showCookiesModal}
        setShow={setShowCookiesModal}
        centered
        className="auth-modal cookies-modal">
        <Modal.Body>
          <div className="auth-modal-body-wrapper cookies-modal-body-wrapper">
            <div className="main-title">Can we store cookies?</div>
            <div className="text">
              We use cookies to provide you with the best possible experience.
              They also allow us to analyze user behavior in order to constantly
              improve our app for you.
            </div>
            <div
              className="purple-text"
              onClick={() => {
                setShow(true);
                setCurrentData('privacy');
              }}>
              Privacy Policy
            </div>
            <div className="button-wrapper flex-justify-center">
              <Button
                title="Decline"
                className="transparent-btn"
                onClick={() => setShowCookiesModal(false)}
              />
              <Button title="Accept" className="lukymoon-btn" />
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <PrivacyTermsModal
        show={show}
        setShow={setShow}
        currentData={currentData}
        setCurrentData={setCurrentData}
      />
    </>
  );
};

export default CookiesModal;
