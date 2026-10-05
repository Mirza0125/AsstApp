import React from 'react';
import ChatHeader from '../ChatHeader';
// import avatar from '../../../assets/images/avatar.svg';
// import emoji from '../../../assets/images/emoji.svg';
// import galleryIcon from '../../../assets/images/gallery.svg';
// import micIcon from '../../../assets/images/mic.svg';
// import attachmentIcon from '../../../assets/images/attachments.svg';
// import sendIcon from '../../../assets/images/send.svg';
import EmojiPicker from 'emoji-picker-react';

import './style.scss';
import { useState } from 'react';

const ChatWrapper = (props) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const sidebarData = [];
  for (let i = 0; i < 66; i++) {
    sidebarData.push({
      id: i,
    });
  }

  return <section className="chat-messages-section">
    <div className="chat-messages-section-wrapper">
      {props.children}
    </div>
  </section>;
};

export default ChatWrapper;
