import { fb } from 'service';
import { createContext, useContext, useEffect, useState } from 'react';
import { newChat, leaveChat, deleteChat, getMessages } from 'react-chat-engine';

export const ChatContext = createContext();

export const ChatProvider = ({ children, authUser }) => {
  const [myChats, setMyChats] = useState();
  const [chatConfig, setChatConfig] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chatInputText, setChatInputText] = useState('');
  const [isTyping, setIsTyping] = useState();

  const createChatClick = () => {
    newChat(chatConfig, { title: '' });
  };

  const deleteChatClick = chat => {
    const isAdmin = chat.admin.username === chatConfig.userName;
    if (
      isAdmin &&
      window.confirm('Are you sure you want to delete this chat?')
    ) {
      deleteChat(chatConfig, chat.id);
    } else if (
      !isAdmin &&
      window.confirm('Are you sure you want to leave this chat?')
    ) {
      leaveChat(chatConfig, chat.id, chatConfig.userName);
    }
  };

  const selectChatClick = chat => {
    getMessages(chatConfig, chat.id, (chatId, messages) => {
      setChatInputText('');
      setSelectedChat({
        ...chat,
        messages,
      });
    });
  };

  useEffect(() => {
    if (authUser) {
      fb.firestore
        .collection('chatUsers')
        .doc(authUser.uid)
        .onSnapshot(snap => {
          if (snap.data()) {
            setChatConfig({
              userSecret: authUser.uid,
              avatar: snap.data().avatar,
              userName: snap.data().userName,
              projectID: '12a69a14-5770-4cfe-88d1-9d4857c322e6',
            });
          }
        });
    }
  }, [authUser, setChatConfig]);

  return (
    <ChatContext.Provider
      value={{
        myChats,
        setMyChats,
        chatConfig,
        setChatConfig,
        selectedChat,
        setSelectedChat,
        selectChatClick,
        deleteChatClick,
        createChatClick,
        chatInputText,
        setChatInputText,
        isTyping,
        setIsTyping,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const {
    myChats,
    setMyChats,
    chatConfig,
    setChatConfig,
    selectedChat,
    setSelectedChat,
    selectChatClick,
    deleteChatClick,
    createChatClick,
    chatInputText,
    setChatInputText,
    isTyping,
    setIsTyping,
  } = useContext(ChatContext);

  return {
    myChats,
    setMyChats,
    chatConfig,
    setChatConfig,
    selectedChat,
    setSelectedChat,
    selectChatClick,
    deleteChatClick,
    createChatClick,
    chatInputText,
    setChatInputText,
    isTyping,
    setIsTyping,
  };
};
