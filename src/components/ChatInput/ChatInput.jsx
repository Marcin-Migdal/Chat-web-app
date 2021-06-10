import { useRef, useState } from 'react';
import { sendMessage } from 'react-chat-engine';
import { ImageUpload } from 'components';
import { Icon } from 'semantic-ui-react';
import { useChat } from 'context';
import './ChatInput.css';

export const ChatInput = () => {
  const { chatConfig, selectedChat, chatInputText, setChatInputText } =
    useChat();
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const inputRef = useRef(null);
  const [image, setImage] = useState();

  const sendChatMessage = () => {
    if (selectedChat && chatInputText) {
      setChatInputText('');
      sendMessage(chatConfig, selectedChat.id, {
        text: chatInputText,
        files: [],
      });
    }
  };

  const ImageInputClick = () => {
    const input = inputRef.current;
    if (input) {
      input.value = '';
      input.click();
    }
  };

  const openImageInput = e => {
    const file = e.target?.files?.[0];
    if (file) {
      setImage(file);
      setImageModalOpen(true);
    }
  };

  const imageUploadSubmit = () => {
    sendMessage(
      chatConfig,
      selectedChat.id,
      {
        text: chatInputText,
        files: [image],
      },
      () => {
        setImage(null);
        setChatInputText('');
      },
    );
  };

  const onCloseModal = () => {
    setImage(null);
    setImageModalOpen(false);
  };

  return (
    <>
      <div className="chat-controls">
        <div className="attachment-icon" onClick={ImageInputClick}>
          <Icon name="attach" color="grey" />
        </div>
        <input
          disabled={selectedChat.people.length <= 1}
          value={chatInputText}
          className="chat-input"
          placeholder="Send a message"
          onChange={e => setChatInputText(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && sendChatMessage()}
        />
        <div onClick={sendChatMessage} className="send-message-icon">
          <Icon name="send" color="grey" />
        </div>
      </div>
      <input
        type="file"
        ref={inputRef}
        className="file-input"
        accept="image/jpeg,image/png"
        onChange={openImageInput}
      />

      {imageModalOpen && !!image && (
        <ImageUpload
          file={image}
          onSubmit={imageUploadSubmit}
          close={() => onCloseModal}
        />
      )}
    </>
  );
};
