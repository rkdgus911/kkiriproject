import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import * as _date from '../../lib/_date';
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';
import { Button } from 'react-bootstrap';

const ChattingBox = styled.div`
  width: 100%;
  height: 100%;
  /* 채팅 */
  .chatting-wrapper {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 88vh;
    padding: 0px 2%;
  }
  .chattingDate {
    padding-top: 10px;
    text-align: center;
    color: #6b6b6b;
  }
  .profile {
    width: 45px;
    height: 45px;
    border: 4px solid #ffffff;
    border-radius: 50%;
    background-color: thistle;
    position: relative;
    top: -35px;
    left: 10.3%;
  }
  .profile .name {
    position: relative;
    top: 6px;
    left: -152px;
    text-align: end;
    width: 150px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .profile2 {
    width: 45px;
    height: 45px;
    border: 4px solid #ffffff;
    border-radius: 50%;
    background-color: thistle;
    position: relative;
    top: -35px;
    left: -10.3%;
  }
  .profile2 .name {
    position: relative;
    top: 6px;
    left: 40px;
    width: 150px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .Time {
    position: absolute;
    bottom: 1px;
    font-size: 12px;
    left: 85.5%;
  }
  .Time2 {
    position: absolute;
    bottom: 1px;
    font-size: 12px;
    left: 11%;
  }
  .chatting-send {
    width: 100%;
    height: 80px;
  }
  .chatting-send form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }
  .chatting-send form input {
    box-sizing: border-box;
    width: 88%;
    height: 50px;
    /* border: 2px solid #ff838d; */
    padding-left: 20px;
    font-size: 1.2rem;
    outline: none;
  }
  .chatting-send form button {
    box-sizing: border-box;
    outline: none;
  }
  .btn-plus {
    width: 40px;
    height: 40px;
    background: none;
    border: 2px solid #ff838d;
    border-radius: 50%;
    color: #ff838d;
  }
  .btn-send {
    width: 8%;
    height: 50px;
    border: none;
    border-radius: 10px;
    background: #ff838d;
    color: #ffffff;
    font-size: 1.4rem;
  }
  .btn-plus:hover {
    cursor: pointer;
  }
  .btn-open {
    position: relative;
    left: 35%;
    top: 14%;
  }
  .emoji-picker-react {
    width: 100%;
    height: 160px;
  }
  .emoji-search {
    display: none;
  }

  @media (max-width: 768px) {
    .chatting-send form input {
      box-sizing: border-box;
      width: 80%;
      height: 50px;
      padding-left: 20px;
      font-size: 1.2rem;
      outline: none;
    }
    .btn-send {
      width: 10%;
      height: 50px;
      border: none;
      border-radius: 10px;
      background: #ff838d;
      color: #ffffff;
      font-size: 1.4rem;
    }
    .PartnerMessage {
      width: 45%;
    }
    .MyMessage {
      width: 45%;
    }
    .profile {
      position: relative;
      top: -35px;
      left: 45.5%;
    }
    .profile2 {
      position: relative;
      top: -35px;
      left: -45.5%;
    }
    .Time {
      position: absolute;
      bottom: 1px;
      font-size: 12px;
      left: 40%;
    }
    .Time2 {
      position: absolute;
      bottom: 1px;
      font-size: 12px;
      left: 47%;
    }
    .btn-send {
      font-size: 1.1rem;
    }
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  border-top: 3px solid #efefef;
  border-bottom: 3px solid #efefef;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: #dfdfdf;
  }
  &::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }

  button {
    &:hover {
      background: #d4d4d480;
    }
    &:focus {
      box-shadow: none;
    }
  }
`;
const MessageLine = styled.div`
  margin-top: -30px;
  display: flex;
  justify-content: ${({ myMessage }) =>
    myMessage ? `flex-end` : `flex-start`};
`;
const MessageBlock = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 40%;
  align-items: ${({ myMessage }) => (myMessage ? `flex-end` : `flex-start`)};
`;
const Profile = styled.div`
  box-sizing: border-box;
  width: 45px;
  height: 45px;
  border: 5px solid #ffffff;
  border-radius: 50%;
  background: #ff838d;
`;
const Name = styled.div`
  position: relative;
  top: -38px;
  right: 50px;
  width: 80%;
  text-align: right;
  ${({ myMessage }) =>
    myMessage
      ? css`
          right: 50px;
          text-align: right;
        `
      : css`
          left: 50px;
          text-align: left;
        `};
`;
const Message = styled.div`
  box-sizing: border-box;
  position: relative;
  top: -35px;
  min-width: 10%;
  max-width: 80%;
  padding: 12px 15px;
  border-radius: 5px;
  background-color: lightblue;
  z-index: -1;
  line-height: 1.6rem;

  .time {
    width: 100%;
    position: absolute;
    bottom: -5px;
    color: #7f7f7f;
    font-size: 0.7rem;
  }
  ${({ myMessage }) =>
    myMessage &&
    css`
      right: 5px;
      padding-right: 10px;
      .time {
        left: -60px;
      }
    `};
`;
const MessageTimeBox = styled.div`
  position: relative;
  width: 100%;
  display: flex;

  .time {
    color: #7f7f7f;
    font-size: 0.7rem;
    margin-left: 5px;
  }
`;

const Chat = ({
  messagesRef,
  messages,
  member,
  chosenEmoji,
  onEmojiClick,
  sendMessage,
  message,
  handleChange,
  handleKeyPress,
  onMoreButtonClick,
}) => {
  const [emojiNationOpen, setemojiNationOpen] = useState(false);
  const handleEmojiNationOpenClick = () => setemojiNationOpen(!emojiNationOpen);
  // console.log(member);
  return (
    <ChattingBox>
      <div className="chatting-wrapper">
        <Container ref={messagesRef} messages={messages}>
          <Button variant="outline" onClick={onMoreButtonClick}>
            더보기
          </Button>
          <p className="chattingDate">{_date.getToday()}</p>
          <hr />
          {messages.map((message, index) =>
            message.sender === member._id ? (
              <MessageLine key={index} myMessage>
                <MessageBlock myMessage>
                  <Profile></Profile>
                  <Name myMessage>{message.name}</Name>
                  <Message myMessage>
                    {message.text}
                    <div className="time">
                      {_date.dateFormat(message.sendDate)}
                    </div>
                  </Message>
                </MessageBlock>
              </MessageLine>
            ) : (
              <MessageLine key={index}>
                <MessageBlock>
                  <Profile></Profile>
                  <Name>{message.name}</Name>
                  <MessageTimeBox>
                    <Message>{message.text}</Message>
                    <div className="time">
                      {_date.dateFormat(message.sendDate)}
                    </div>
                  </MessageTimeBox>
                </MessageBlock>
              </MessageLine>
            )
          )}
        </Container>
        {emojiNationOpen ? (
          <div className="emojiNation">
            {chosenEmoji ? (
              <span>Chosen Emoji: {chosenEmoji.emoji}</span>
            ) : (
              <span>No Emoji Chosen</span>
            )}
            <Picker
              onEmojiClick={onEmojiClick}
              preload={true}
              skinTone={SKIN_TONE_MEDIUM_DARK}
              handleEmojiNationOpenClick={handleEmojiNationOpenClick}
            />
          </div>
        ) : null}
        <div className="chatting-send">
          <form onSubmit={sendMessage}>
            <div className="btn-plus" onClick={handleEmojiNationOpenClick}>
              <div className="btn-open">+</div>
            </div>
            <input
              type="text"
              value={message}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
            />
            <button className="btn-send">send</button>
          </form>
        </div>
      </div>
    </ChattingBox>
  );
};

export default Chat;
