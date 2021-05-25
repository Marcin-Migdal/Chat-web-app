import { useChat } from 'context';
import { useDebounce } from 'hooks';
import { useEffect, useRef, useState } from 'react';
import { addPerson, getOtherPeople } from 'react-chat-engine';
import { Search } from 'semantic-ui-react';
import './SearchUsers.css';

export const SearchUsers = ({ visible, closeFunction }) => {
  let searchRef = useRef();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const debounceSearchTerm = useDebounce(searchTerm, 500);
  const [searchResults, setSearchResults] = useState(null);
  const { myChats, setMyChats, chatConfig, selectedChat, setSelectedChat } =
    useChat();

  useEffect(() => {
    setSearchTerm('');
    if (visible && searchRef) {
      searchRef.focus();
    }
  }, [visible, selectedChat]);

  useEffect(() => {
    console.log(loading);
  }, [loading]);

  useEffect(() => {
    setLoading(true);
    getOtherPeople(chatConfig, selectedChat.id, (chatId, data) => {
      if (debounceSearchTerm) {
        const userNames = data
          .map(user => user.username)
          .filter(username =>
            username.toLowerCase().includes(debounceSearchTerm.toLowerCase()),
          );

        setSearchResults(userNames.map(username => ({ title: username })));
      } else {
        setSearchResults(null);
      }
      setLoading(false);
    });
  }, [chatConfig, selectedChat, debounceSearchTerm]);

  const selectUser = username => {
    addPerson(chatConfig, selectedChat.id, username, () => {
      const filteredChats = myChats.filter(chat => chat.id !== selectedChat.id);
      const updatedChat = {
        ...selectedChat,
        people: [...selectedChat.people, { person: { username } }],
      };

      setSelectedChat(updatedChat);
      setMyChats([...filteredChats, updatedChat]);
      closeFunction();
    });
  };

  return (
    <div
      className="user-search"
      style={{ display: visible ? 'block' : 'none' }}
    >
      <Search
        fluid
        onBlur={closeFunction}
        loading={loading}
        value={searchTerm}
        results={searchResults}
        placeholder="Search Users"
        open={!!searchResults && !loading}
        input={{
          ref: r => {
            searchRef = r;
          },
        }}
        onSearchChange={e => setSearchTerm(e.target.value)}
        onResultSelect={(e, data) => {
          if (data.result?.title) {
            selectUser(data.result.title);
          }
        }}
      />
    </div>
  );
};
