import { useChat } from 'context';
import { useResolved } from 'hooks';
import { ChatList } from 'components';
import { Loader } from 'semantic-ui-react';
import './LeftRail.css';

export const LeftRail = () => {
  const { myChats, createChatClick } = useChat();
  const chatsResolved = useResolved(myChats);

  return (
    <div className="left-rail">
      {chatsResolved ? (
        <>
          {!!myChats.length ? (
            <div className="chat-list-container">
              <ChatList />
            </div>
          ) : (
            <div className="chat-list-container no-chats-yet">
              <h3>No chats yet</h3>
            </div>
          )}
          <button
            className="create-chat-button"
            onClick={() => createChatClick()}
          >
            Create chat
          </button>
        </>
      ) : (
        <div className="loader-position">
          <Loader active size="huge" />
        </div>
      )}
    </div>
  );
};
