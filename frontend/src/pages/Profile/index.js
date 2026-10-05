import React, {useEffect} from 'react';
import HomeLayout from '../../layout/HomeLayout';
import {Images} from '../../theme/Images';
import UInput from '../../components/UInput';
import Button from '../../components/Button';
import ProfileReviewsCard from '../../components/ProfileReviewsCard';

import dummyProfile from '../../assets/images/dummyProfile.png'

import './style.scss';
import {history} from '../../reduxStore/store';

import {
  profileRequest,
  profileFailure,
  emailSentRequest,
  emailSentRequestSuccess,
  emailSentRequestFailure,
} from './redux/action';

// Routing
import {connect} from 'react-redux';
import {
  deleteDesignersFailure,
  deleteDesignersRequest,
  deleteDesignersSuccess,
} from '../ViewDesigner/redux/action';

import {Spinner} from 'reactstrap';

const Profile = (props) => {
  const {
    userProfile,
    deleteDesignersRequest,
    emailSentRequest,
    emailSentRequesting,
    requesting,
    deleteDesignersRequesting,
    designerRemoved,
    deleteDesignersSuccess,
    profileRequest,
  } = props;

  useEffect(() => {
    deleteDesignersSuccess(false);
    profileRequest(localStorage.getItem("profile_id"))
    if (designerRemoved) {
      history.goBack();
    }
  }, [designerRemoved]);

  const handleRemoveProfile = (id) => {
    deleteDesignersRequest(id);
  };

  const handleSendProfileLogin = (designer_id) => {
    const data = {
      designer_id: `${designer_id}`,
    };
    emailSentRequest(data);
  };

  return (
    <HomeLayout contentClassName="profile-content-section overflow-hidden">
      {requesting ? (
        <div className="spinner-style">
          <Spinner />
        </div>
      ) : (
        <div className="profile-section-wrapper">
          <div className="navigate-head flex-align-center">
            <img
              src={Images.backArrow}
              onClick={() => history.goBack()}
              alt=""
            />
            <p>{userProfile.name}</p>
          </div>
          <div className="profile-wrapper">
            <div className="profile-details-wrapper">
              <div className="profile-details">
                <div className="profile-info">
                  <div className="avatar">
                    {userProfile?.photo ? 
                    <img src={userProfile?.photo} alt="profile-photo" className='profile-photo' /> : 
                    <img src={dummyProfile} alt="dummy-profile-pic" className='dummy-profile-pic' />}
                  </div>
                  <p>{userProfile.name}</p>
                </div>
                <div className="profile-fields-wrapper">
                  <UInput
                    disabled={true}
                    placeholder="Name"
                    value={userProfile.name ? userProfile.name : ''}
                  />
                  <UInput
                    disabled={true}
                    placeholder="Email"
                    value={userProfile.email ? userProfile.email : ''}
                  />
                  <UInput
                    disabled={true}
                    placeholder="Phone Number"
                    value={
                      userProfile.phone_number ? userProfile.phone_number : ''
                    }
                  />
                  <UInput
                    disabled={true}
                    placeholder="Main Address"
                    value={userProfile.address ? userProfile.address : ''}
                  />
                  <div className="button-wrapper">
                    <Button
                      title="Remove"
                      className="transparent-red-btn full-width"
                      onClick={() => handleRemoveProfile(userProfile.id)}
                      showSpinner={deleteDesignersRequesting}
                    />
                    <Button
                      title="Send Email and Password"
                      className="transparent-black-btn full-width"
                      onClick={() => handleSendProfileLogin(userProfile.id)}
                      showSpinner={emailSentRequesting}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="profile-reviews">
              <h3>Reviews</h3>
              <div className="profile-reviews-card-wrapper">
                {userProfile &&
                  userProfile?.reviews.map((data, index) => (
                    <ProfileReviewsCard data={data} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </HomeLayout>
  );
};

const mapStateToProps = (state) => ({
  userProfile: state.profiles.profileData,
  error: state.profiles.error,
  requesting: state.profiles.requesting,
  deleteDesignersRequesting: state.designers.deleteDesignersRequesting,
  designerRemoved: state.designers.designerRemoved,
  emailSentRequesting: state.profiles.emailSentRequesting,
});

const mapDispatchToProps = (dispatch) => ({
  profileRequest: (data) => dispatch(profileRequest(data)),
  profileFailure: (data) => dispatch(profileFailure(data)),
  deleteDesignersRequest: (data) => dispatch(deleteDesignersRequest(data)),
  deleteDesignersFailure: (data) => dispatch(deleteDesignersFailure(data)),
  deleteDesignersSuccess: (data) => dispatch(deleteDesignersSuccess(data)),
  emailSentRequest: (data) => dispatch(emailSentRequest(data)),
  emailSentRequestFailure: (data) => dispatch(emailSentRequestFailure(data)),
  emailSentRequestSuccess: (data) => dispatch(emailSentRequestSuccess(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
