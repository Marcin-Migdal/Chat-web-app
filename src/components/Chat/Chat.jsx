import { useChat } from 'context';
import { LeftRail, ChatToolbar } from 'components';
import { getChats, ChatEngine } from 'react-chat-engine';
import './Chat.css';

export const Chat = () => {
  const { setMyChats, chatConfig, selectedChat } = useChat();

  return (
    <>
      <LeftRail />
      {!!chatConfig && (
        <div style={{ display: 'none' }}>
          <ChatEngine
            userName={chatConfig.userName}
            projectID={chatConfig.projectID}
            userSecret={chatConfig.userSecret}
            onConnect={() => {
              getChats(chatConfig, setMyChats);
            }}
          />
        </div>
      )}

      <div className="chat-container">
        <div className="current-chat">
          {selectedChat ? (
            <div className="chat">
              <ChatToolbar />
            </div>
          ) : (
            <div className="no-chat-selected">
              <img
                src="/img/pointLeft.png"
                className="point-left"
                alt="point-left"
              />
              Select A Chat
            </div>
          )}
        </div>
      </div>
    </>
  );
};
