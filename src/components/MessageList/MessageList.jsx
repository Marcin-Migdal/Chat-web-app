import { ChatAvatar } from 'components/ChatAvatar/ChatAvatar';
import { useChat } from 'context/ChatContext';
import { groupMessages } from 'helpers';
import { useScrollToBottom } from 'hooks';
import './MessageList.css';

export const MessageList = () => {
  const { selectedChat } = useChat();
  useScrollToBottom(selectedChat, 'chat-messages');

  return (
    <div className="chat-messages">
      {!!selectedChat?.messages.length ? (
        groupMessages(selectedChat.messages).map((message, index) => {
          return (
            <div key={index} className="chat-message">
              <div className="chat-message-header">
                <ChatAvatar
                  className="message-avatar"
                  username={message[0].sender.username}
                  chat={selectedChat}
                />
                <div className="message-author">
                  {message[0].sender.username}
                </div>
              </div>
              <div className="message-content">
                {message.map((individualMessage, index) => {
                  return (
                    <div key={index}>
                      <div className="message-text">
                        {individualMessage.text}
                      </div>
                      {!!individualMessage.attachments.length && (
                        <img
                          className="message-image"
                          src={individualMessage.attachments[0].file}
                          alt={individualMessage.id + '-attachment'}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })
      ) : (
        <div className="no-messages-yet">No messages yet</div>
      )}
    </div>
  );
};
