import { ChatAvatar, IsTypingComponent } from 'components';
import { Icon } from 'semantic-ui-react';
import './ChatListItemContent.css';

export const ChatListItemContent = ({ username, chat, isTyping }) => {
  return (
    <>
      {chat?.people.length === 2 ? (
        <ChatAvatar username={username} />
      ) : (
        <Icon
          circular
          inverted
          color={username ? 'brown' : 'violet'}
          name={username ? 'users' : 'user cancel'}
          size="big"
        />
      )}

      <div className="chat-list-preview">
        <div className="preview-username">
          {username ? username : 'No One Added Yet'}
        </div>
        {chat &&
          (isTyping && isTyping.chatID === chat.id ? (
            <IsTypingComponent />
          ) : (
            <p className="preview-message">
              {chat.last_message.attachments.length
                ? chat.last_message.sender.username + ' sent an attachment'
                : chat.last_message.text.length
                ? chat.last_message.text
                : '...'}
            </p>
          ))}
      </div>
    </>
  );
};
