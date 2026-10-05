import React, { useState, useEffect } from 'react';
import { Toast } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getMessaging, onMessage } from "firebase/messaging";
// import messaging from '../../firebase';

const ForegroundNotification = (props) => {
  const [show, setShow] = useState(false);
  const [messageData, setMessageData] = useState(null);

  // useEffect(() => {
  //   onMessage(messaging, (payload) => {
  //     setMessageData(payload.notification);
  //     setShow(true);
  //   });
  // }, [messaging]);

  const messaging = getMessaging();

  onMessage(messaging, (payload) => {
    setMessageData(payload.notification)
    setShow(true)
  });

  return (
    <>
      {messageData && (
        <Toast
          onClose={(e) => {
            setShow(true);
            setMessageData(null);
          }}
          show={show}
          delay={3000}
          autohide
          animation
          style={{
            position: 'absolute',
            zIndex: 999,
            top: '15%',
            right: '20px',
            minWidth: 200,
          }}>
          <Toast.Header className='justify-content-between'>
            {/* <img
              src="holder.js/20x20?text=%20"
              className="rounded"
              alt=""
            /> */}
            <div className="title-header">
              <strong>{messageData.title}</strong>
              <small className='ms-3'>Just now</small>
            </div>
          </Toast.Header>
          <Toast.Body>{messageData.body}</Toast.Body>
        </Toast>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  // userData: state.LoginScreen.user,
});

const mapDispatchToProps = (dispatch) => ({
  // getNotficationDataRequest: () => dispatch(getNotficationDataRequest())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForegroundNotification);
