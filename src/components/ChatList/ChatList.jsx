import { useChat } from 'context';
import { Icon } from 'semantic-ui-react';
import { notMe, joinUserNames } from 'helpers';
import { ChatListItemContent } from 'components';
import './ChatList.css';

export const ChatList = () => {
  const {
    myChats,
    chatConfig,
    selectedChat,
    selectChatClick,
    deleteChatClick,
  } = useChat();

  return (
    <div className="chat-list">
      {myChats.map((chat, index) => {
        return (
          <div
            key={index}
            className={`chat-list-item ${
              selectedChat?.id === chat.id ? 'selected-chat-item' : ''
            }`}
          >
            <div
              className="chat-list-item-content"
              onClick={() => selectChatClick(chat)}
            >
              {chat.people.length === 1 ? (
                <ChatListItemContent />
              ) : chat.people.length === 2 ? (
                <ChatListItemContent
                  username={notMe(chatConfig, chat)}
                  chat={chat}
                />
              ) : (
                <ChatListItemContent
                  username={joinUserNames(chatConfig, chat)}
                  chat={chat}
                />
              )}
            </div>
            <div
              onClick={() => deleteChatClick(chat)}
              className="chat-item-delete"
            >
              <Icon name="delete" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
