import { useEffect, useState } from 'react';
import { useChat } from 'context';
import { Icon } from 'semantic-ui-react';
import { sendMessage } from 'react-chat-engine';
import './ChatInput.css';

export const ChatInput = () => {
  const { chatConfig, selectedChat } = useChat();
  const [chatInputText, setChatInputText] = useState('');

  const sendChatMessage = () => {
    if (selectedChat && chatInputText) {
      setChatInputText('');
      sendMessage(chatConfig, selectedChat.id, {
        text: chatInputText,
        files: [],
      });
    }
  };

  useEffect(() => {
    setChatInputText('');
  }, [selectedChat]);

  return (
    <div className="chat-controls">
      <div
        onClick={() => console.log('Add Attachment Click')}
        className="attachment-icon"
      >
        <Icon name="attach" color="grey" />
      </div>

      <input
        disabled={selectedChat.people.length <= 1}
        value={chatInputText}
        className="chat-input"
        placeholder="Send a message"
        onKeyPress={e => {
          if (e.key === 'Enter') {
            sendChatMessage();
          }
        }}
        onChange={e => setChatInputText(e.target.value)}
      />
      <div onClick={sendChatMessage} className="send-message-icon">
        <Icon name="send" color="grey" />
      </div>
    </div>
  );
};
