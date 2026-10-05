import React from 'react';
import HomeLayout from '../../layout/HomeLayout';
import { Images } from '../../theme/Images';

import { history } from '../../reduxStore/store';
// import PubnubChat from '../PubnubChat'

const GroupChat = () => {
  return (
    <HomeLayout contentClassName="messages-content-section">
      <div className="messages-section-wrapper">
        <div className="navigate-head flex-align-center">
          <img src={Images.backArrow} onClick={() => history.goBack()} alt="" />
          <p>Messages</p>
        </div>
        {/* <PubnubChat /> */}
      </div>
    </HomeLayout>
  );
};

export default GroupChat;
