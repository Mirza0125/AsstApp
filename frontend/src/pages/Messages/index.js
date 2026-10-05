import React from 'react';
import HomeLayout from '../../layout/HomeLayout';
import { Images } from '../../theme/Images';

import { history } from '../../reduxStore/store';
import './style.scss';
import ChatApp from '../PubNubChat';

const Messages = () => {
  return (
    <HomeLayout contentClassName="messages-content-section">
      <div className="messages-section-wrapper">
        <div className="navigate-head flex-align-center">
          <img src={Images.backArrow} onClick={() => history.goBack()} alt="" />
          <p>Messages</p>
        </div>
        <ChatApp />
      </div>
    </HomeLayout>
  );
};

export default Messages;
