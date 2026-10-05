import React, {useState, useEffect} from 'react';

// Components
import Modal from 'react-bootstrap/Modal';
import {Images} from '../../../theme/Images';
import Button from '../../Button';
import Image from '../../Image';

import { Spinner } from 'reactstrap';

// Style
import './style.scss';

import {
  getTimeSlotRequest,
  getTimeSlotSuccess,
  getTimeSlotFailure,
  serviceIDAction,
  updateTimeSlotRequest,
  updateTimeSlotFailure,
  setSlotsSuccessAction,
} from '../../../pages/Bookings/redux/action';

import {connect} from 'react-redux';

const AddTimeModal = (props) => {
  const [checkedSlots, setCheckedSlots] = useState([]);

  const handleCheckboxChange = (slotId) => {
    if (checkedSlots.includes(slotId)) {
      setCheckedSlots(checkedSlots.filter((id) => id !== slotId));
    } else {
      setCheckedSlots([...checkedSlots, slotId]);
    }
  };

  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date().toLocaleDateString('en-US', options);
    setCurrentDate(formattedDate);
  }, [currentDate]);

  const {
    // getTimeSlotRequest,
    // getTimeSlotFailure,
    getTimeSlotSuccess,
    timeSlotsData,
    timeSlotRequesting,
    // error,
    service_id,
    serviceIDAction,
    setShowModal,
    showModal,
    updateTimeSlotRequest,
    updateTimeSlotRequesting,
    success,
    setSlotsSuccessAction,
    updateTimeSlotFailure,
  } = props;

  useEffect(() => {
    if (success) {
      setShowModal(false)
    }
  }, [success])

  const handleOnClick = () => {
    const data = {
      booking_service_id: service_id,
      booking_time_slot: checkedSlots,
    };
    if (checkedSlots?.length > 0) {
    updateTimeSlotRequest(data);
    setSlotsSuccessAction(true);
    setCheckedSlots([])
  }
  };

  const handleCloseOnClick = () => {
    serviceIDAction(false);
    setSlotsSuccessAction(false)
    setShowModal(false);
    getTimeSlotSuccess(false)
  };

  const transformedTimeSlotsData =
    timeSlotsData?.length > 0
      ? timeSlotsData?.map((slot) => {
          const startTime = new Date(`2000-01-01T${slot.start_time}`);
          const endTime = new Date(`2000-01-01T${slot.end_time}`);

          return {
            id: slot.id,
            start_time: startTime.toLocaleString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            }),
            end_time: endTime.toLocaleString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            }),
            service_price: `$${slot.service_price}`,
            is_exists: slot.is_exists,
          };
        })
      : [];
  
  const filteredData = transformedTimeSlotsData.filter(item => !item.is_exists)

  return (
    <>
      <Modal
        show={showModal}
        setShow={setShowModal}
        centered
        className="auth-modal reset-modal">
        <Modal.Header>
          <Modal.Title>
            <div className="wrapper flex-justify-end w-100">
              <div className="close-icon" onClick={() => handleCloseOnClick()}>
                <Image src={Images.closeIcon} />
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <h3 className='add-time-heading'>Available time slots</h3>
        <Modal.Body>
        {timeSlotRequesting ? <div className='spinner-style'><Spinner /></div> :
          <>
          {filteredData?.length > 0 ?
            filteredData?.map((data, index) => (
                <div className="time-slot-section">
                  <div className="time-slot-left-section">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      onChange={() => handleCheckboxChange(data.id)}
                      checked={checkedSlots.includes(data.id)}
                    />
                    <div className="time-slot-datetime-section">
                      <span className="time-slot-start-time">
                        {data.start_time} - {data.end_time}
                      </span>
                      <span className="time-slot-date">{currentDate}</span>
                    </div>
                  </div>
                  <div className="time-slot-right-section">
                    <span className="time-slot-price">
                      {data.service_price}
                    </span>
                  </div>
                </div>
            )): <div style={{textAlign: "center", paddingTop: "90px"}}><span>No available slots</span></div>}
          {filteredData?.length > 0 ? 
          <Button
            title="Confirm"
            className="confirm-time-slot-btn"
            onClick={() => handleOnClick()}
            showSpinner={updateTimeSlotRequesting}
            disabled={success ? success : false}
          /> : null}
          </>}
        </Modal.Body>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  timeSlotsData: state.calendar.timeSlotsData,
  timeSlotRequesting: state.calendar.timeSlotRequesting,
  error: state.calendar.error,
  service_id: state.calendar.serviceID,
  updateTimeSlotRequesting: state.calendar.updateTimeSlotRequesting,
  success: state.calendar.setSuccess,
  updateTimeError: state.calendar.updateTimeError,
});

const mapDispatchToProps = (dispatch) => ({
  getTimeSlotRequest: (data) => dispatch(getTimeSlotRequest(data)),
  getTimeSlotSuccess: (data) => dispatch(getTimeSlotSuccess(data)),
  getTimeSlotFailure: (data) => dispatch(getTimeSlotFailure(data)),
  serviceIDAction: (data) => dispatch(serviceIDAction(data)),
  updateTimeSlotRequest: (data) => dispatch(updateTimeSlotRequest(data)),
  updateTimeSlotFailure: (data) => dispatch(updateTimeSlotFailure(data)),
  setSlotsSuccessAction: data => dispatch(setSlotsSuccessAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTimeModal);
