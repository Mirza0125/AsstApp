import React from 'react';
// import galleryIcon from "../../../assets/images/gallery.svg"
// import micIcon from "../../../assets/images/mic.svg"
import attachmentIcon from "../../../../assets/images/file-icon.svg"
// import sendIcon from "../../../assets/images/send.svg"
import EmojiPicker from 'emoji-picker-react';
import { Spinner } from 'reactstrap';
// import playIcon from "../../../assets/images/play-icon-blue.svg"
// import stopIcon from "../../../assets/images/stop-icon-blue.svg"
import './style.scss';
import { Images } from '../../../../theme/Images';

const ChatInputWrapper = (props) => {
  const {
    setFileUpload,
    onSend,
    onEmojiClick,
    setInputMessage,
    inputMessage,
    setShowEmojiPicker,
    showEmojiPicker,
    onMicClick,
    isRecording,
    status,
    startRecording,
    stopRecording,
    sendingLoading,
    handleEnterKey,
    disabledField,
    onClick,
    onFocus,
    onWrapperClick,
    selectedFiles,
    handleRemoveFile,
    checkMultiFile,
    setImagesUpload,
    setMultiFile,
  } = props;

  return (
    <div
      className="chat-input-section"
      onClick={onWrapperClick}>
      <div className="chat-input-wrapper">
        <div className="left-details flex-align-center">
          {/* <div
              className={`emoji ${disabledField ? 'disabled' : ''}`}
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
              <img src={emoji} alt="emoji" />
            </div>
            {showEmojiPicker && (
              <div className="emoji-picker-wrapper">
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            )} */}
          <div className="file-wrapper">
            <label htmlFor="file">
              <img
                src={attachmentIcon}
                className={`send-action ${disabledField ? "disabled" : ""}`}
                alt="gallery"
              />
            </label>
            <input
              type="file"
              style={{ display: 'none' }}
              id="file"
              onChange={setFileUpload}
              disabled={disabledField}
              onKeyDown={handleEnterKey}
            />
          </div>
          <div className="input-wrapper">
            {checkMultiFile.length > 0 ? (
              <div className="chat-selected-file">
                {checkMultiFile &&
                  checkMultiFile.map((item, i) => (
                    <div className="file">
                      <div
                        className="remove-file"
                        onClick={() => handleRemoveFile(i)}>
                        <span>x</span>
                      </div>
                      <p>{item.name}</p>
                    </div>
                  ))}
              </div>
            ) : (
              <textarea
                value={inputMessage}
                onChange={(val) => {
                  setInputMessage(val.target.value);
                }}
                // value={
                //   checkMultiFile.length > 0 ? checkMultiFile : inputMessage
                // }
                // onChange={val => {
                //   setInputMessage(val.target.value)
                //   setMultiFile([])
                // }}
                onKeyDown={handleEnterKey}
                style={{ width: 'inherit' }}
                placeholder="Type a message..."
                disabled={disabledField}
                className={`message-input-field flex-align-center ${disabledField ? 'disabled' : ''
                  }`}
                onClick={onClick}
                onFocus={onFocus}
              />
            )}
          </div>
        </div>
        <div className="action-wrapper">
          {/* <label for="image">
              <img
                  src={galleryIcon}
                  className={`send-action ${disabledField ? "disabled" : ""}`}
                  alt="gallery"
                />
            </label>
            <input
              type="file"
              style={{ display: 'none' }}
              id="image"
              onChange={setImagesUpload}
              disabled={disabledField}
              className={`send-action ${disabledField ? 'disabled' : ''}`}
            /> */}
          {/* <div className="mic-icon-wrapper">
                {isRecording && (
                  <div className="mic-options">
                    <p>{status}</p>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                      {status === 'recording' ? (
                        <button
                          onClick={() => {
                            stopRecording();
                            onMicClick(!isRecording);
                          }}>
                          <img src={stopIcon} alt="" />
                        </button>
                      ) : (
                        <>
                          <button onClick={startRecording}>
                            <img src={playIcon} alt="" />
                          </button>
                          <button
                            onClick={() => {
                              stopRecording();
                              onMicClick(!isRecording);
                            }}>
                            <img src={stopIcon} alt="" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}
                <img
                  src={micIcon}
                  alt="gallery"
                  onClick={() => onMicClick(!isRecording)}
                  className={`send-action ${disabledField ? "disabled" : ""}`}
                />
              </div> */}
          <div className={`send-button flex-justify-center ${disabledField ? 'disabled' : ''}`}
            onClick={onSend}
          >
            {sendingLoading ?
              <div className="send-spinner">
                <Spinner size="sm" color='white' />
              </div>
              :
              <img src={Images.sendIcon} alt="" />
            }
          </div>

        </div>
      </div>
    </div>
  );
};

export default ChatInputWrapper;
