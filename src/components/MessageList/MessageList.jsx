import { ChatAvatar } from 'components/ChatAvatar/ChatAvatar';
import { useChat } from 'context/ChatContext';
import { groupMessages } from 'helpers';
import { useScrollToBottom } from 'hooks';
import './MessageList.css';

export const MessageList = () => {
  const { selectedChat, chatConfig, isTyping } = useChat();
  useScrollToBottom(selectedChat, 'chat-messages');

  return (
    <div className="chat-messages">
      {!!selectedChat?.messages.length ? (
        <>
          {groupMessages(selectedChat.messages).map((message, index) => {
            const isTheirMessage =
              message[0].sender.username !== chatConfig.userName;
            return (
              <div
                key={index}
                className={`chat-message ${isTheirMessage ? 'left' : 'right'}`}
              >
                {isTheirMessage && (
                  <ChatAvatar
                    className="message-avatar"
                    username={message[0].sender.username}
                    chat={selectedChat}
                  />
                )}
                <div>
                  {message.map((individualMessage, index) => {
                    return (
                      <div
                        className={
                          isTheirMessage
                            ? 'their-message-content'
                            : 'my-message-content'
                        }
                        key={index}
                      >
                        {individualMessage.text && (
                          <div
                            className={`message-text ${
                              isTheirMessage ? 'theirMessage' : 'myMessage'
                            }`}
                          >
                            {individualMessage.text}
                          </div>
                        )}
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
          })}
          {isTyping && (
            <div className="chat-message left">
              <ChatAvatar
                className="message-avatar"
                username={isTyping.username}
                chat={selectedChat}
              />
            </div>
          )}
        </>
      ) : (
        <div className="no-messages-yet">No messages yet</div>
      )}
    </div>
  );
};
