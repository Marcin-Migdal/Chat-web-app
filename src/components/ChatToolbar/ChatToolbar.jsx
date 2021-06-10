import { useState } from 'react';
import { useChat } from 'context';
import { joinUserNames } from 'helpers';
import { Icon } from 'semantic-ui-react';
import './ChatToolbar.css';
import { SearchUsers } from 'components';

export const ChatToolbar = () => {
  const { selectedChat, chatConfig } = useChat();
  const [searching, setSearching] = useState(false);

  return (
    <>
      <div className="chat-toolbar">
        <div className="chat-header-text">
          {joinUserNames(chatConfig, selectedChat, 100)}
        </div>

        <div className="add-user-icon" onClick={() => setSearching(!searching)}>
          <Icon color="grey" name="user plus" size="large" />
        </div>
      </div>

      <SearchUsers
        visible={searching}
        closeFunction={() => setSearching(false)}
      />
    </>
  );
};
