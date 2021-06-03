import { useChat } from 'context';
import { LeftRail, ChatToolbar, ChatInput, MessageList } from 'components';
import { getChats, ChatEngine } from 'react-chat-engine';
import './Chat.css';

export const Chat = () => {
  const {
    myChats,
    setMyChats,
    chatConfig,
    selectedChat,
    selectChatClick,
    setSelectedChat,
  } = useChat();

  const handleConnect = () => {
    getChats(chatConfig, setMyChats);
  };

  const handleNewChat = chat => {
    if (chat.admin.username === chatConfig.userName) {
      selectChatClick(chat);
      setMyChats([...myChats, chat].sort((a, b) => b.id - a.id));
    }
  };

  const handleDeleteChat = deletedChat => {
    if (selectedChat?.id === deletedChat.id) {
      setSelectedChat(null);
    }
    setMyChats(
      myChats
        .filter(chat => chat.id !== deletedChat.id)
        .sort((a, b) => b.id - a.id),
    );
  };

  const handleNewMessage = (chatId, message) => {
    if (selectedChat && chatId === selectedChat.id) {
      setSelectedChat({
        ...selectedChat,
        messages: [...selectedChat.messages, message],
      });
    }
    const chatThatMessageBelongsTo = myChats.find(c => c.id === chatId);
    const filteredChats = myChats.filter(chat => chat.id !== chatId);
    const updatedChat = {
      ...chatThatMessageBelongsTo,
      last_message: message,
    };
    setMyChats([...filteredChats, updatedChat].sort((a, b) => b.id - a.id));
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
            onConnect={handleConnect}
            onNewChat={chat => handleNewChat(chat)}
            onDeleteChat={deletedChat => handleDeleteChat(deletedChat)}
            onNewMessage={(chatId, message) =>
              handleNewMessage(chatId, message)
            }
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
