import React from 'react';
// import avatar from "../../../assets/images/avatar.svg"

import './style.scss';

const ChatSideBar = (props) => {
  return (
    <section className={`chat-sidebar-section ${props.className}`}>
      <div className="chat-sidebar-wrapper h-100">
        <div className="chat-sidebar-message-wrapper h-100">
          {props.children}
        </div>
      </div>
    </section>
  );
};

export default ChatSideBar;
