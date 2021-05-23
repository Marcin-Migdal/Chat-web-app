import { createContext, useContext, useEffect, useState } from 'react';
import { deleteChat, getMessages, leaveChat, newChat } from 'react-chat-engine';
import { fb } from 'service';

export const ChatContext = createContext();

export const ChatProvider = ({ children, authUser }) => {
  const [myChats, setMyChats] = useState();
  const [chatConfing, setChatConfing] = useState();
  const [selectedChat, setSelectedChat] = useState();

  useEffect(() => {
    if (authUser) {
      fb.firestore
        .collection('chatUsers')
        .doc(authUser.uid)
        .onSnapshot(snap => {
          setChatConfing({
            userSecret: authUser.uid,
            avatar: snap.data().avatar,
            userName: snap.data().userName,
            projectID: '12a69a14-5770-4cfe-88d1-9d4857c322e6',
          });
        });
    }
  }, [authUser]);

  const createChatClick = () => {
    newChat(chatConfing, { title: '' });
  };

  const deleteChatClick = chat => {
    const isAdmin = chat.admin === chatConfing.userName;
    if (
      isAdmin &&
      window.confirm('Are you sure you want to delete this chat?')
    ) {
      deleteChat(chatConfing, chat.id);
    } else if (window.confirm('Are you sure you want to leave this chat?')) {
      leaveChat(chatConfing, chat.id, chatConfing.userName);
    }
  };

  const selectChatClick = chat => {
    getMessages(chatConfing, chat.id, messages => {
      setSelectedChat({
        ...chat,
        messages,
      });
    });
  };

  return (
    <ChatContext.Provider
      value={{
        myChats,
        setMyChats,
        chatConfing,
        setChatConfing,
        selectedChat,
        setSelectedChat,
        selectChatClick,
        deleteChatClick,
        createChatClick,
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
    chatConfing,
    setChatConfing,
    selectedChat,
    setSelectedChat,
    selectChatClick,
    deleteChatClick,
    createChatClick,
  } = useContext(ChatContext);

  return {
    myChats,
    setMyChats,
    chatConfing,
    setChatConfing,
    selectedChat,
    setSelectedChat,
    selectChatClick,
    deleteChatClick,
    createChatClick,
  };
};
