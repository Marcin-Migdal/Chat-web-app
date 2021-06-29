import { LeftRail, ChatToolbar, ChatInput, MessageList } from 'components';
import { getChats, ChatEngine } from 'react-chat-engine';
import { sortChats } from 'helpers';
import { useChat } from 'context';
import { useEffect } from 'react';
import './Chat.css';

export const Chat = () => {
  const {
    myChats,
    setMyChats,
    chatConfig,
    setChatConfig,
    selectedChat,
    setSelectedChat,
    selectChatClick,
    setIsTyping,
  } = useChat();

  useEffect(() => {
    return () => {
      setMyChats();
      setChatConfig();
      setSelectedChat();
    };
  }, [setMyChats, setChatConfig, setSelectedChat]);

  const handleNewChat = chat => {
    if (chat.admin.username === chatConfig.userName) {
      selectChatClick(chat);
    }
    setMyChats([...myChats, chat].sort(sortChats));
  };

  const handleDeleteChat = deletedChat => {
    if (selectedChat?.id === deletedChat.id) {
      setSelectedChat(null);
    }
    setMyChats(
      myChats.filter(chat => chat.id !== deletedChat.id).sort(sortChats),
    );
  };

  const handleNewMessage = (chatId, message) => {
    const chatThatMessageBelongsTo = myChats.find(c => c.id === chatId);
    if (!chatThatMessageBelongsTo) {
      return;
    }

    if (selectedChat && selectedChat.id === chatId) {
      setSelectedChat({
        ...selectedChat,
        messages: [...selectedChat.messages, message],
      });
    }
    const filteredChats = myChats.filter(chat => chat.id !== chatId);
    const updatedChat = {
      ...chatThatMessageBelongsTo,
      last_message: message,
    };
    setMyChats([...filteredChats, updatedChat].sort(sortChats));
  };

  return (
    <>
      <LeftRail />
      {!!chatConfig && (
        <div style={{ display: 'none' }}>
          <ChatEngine
            userName={chatConfig.userName}
            projectID={chatConfig.projectID}
            userSecret={chatConfig.userSecret}
            onConnect={() => getChats(chatConfig, setMyChats)}
            onNewChat={chat => handleNewChat(chat)}
            onDeleteChat={deletedChat => handleDeleteChat(deletedChat)}
            onNewMessage={(chatId, msg) => handleNewMessage(chatId, msg)}
            onTyping={(chatID, username) => setIsTyping({ chatID, username })}
          />
        </div>
      )}

      <div className="chat-container">
        <div className="current-chat">
          {selectedChat ? (
            <div className="chat">
              <ChatToolbar />
              <MessageList />
              <ChatInput />
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
