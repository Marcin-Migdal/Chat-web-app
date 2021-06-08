import { useChat } from 'context';
import { useEffect, useState } from 'react';
import { Image } from 'semantic-ui-react';
import { fb } from 'service';
import './ChatAvatar.css';

const avatarCache = [];
export const ChatAvatar = ({ username, className }) => {
  const { chatConfig } = useChat();
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    if (!!avatarCache[username]) {
      setAvatar(avatarCache[username]);
    } else {
      fb.firestore
        .collection('chatUsers')
        .where('userName', '==', username)
        .get()
        .then(snap => {
          const data = snap.docs[0]?.data();
          if (data?.avatar) {
            setAvatar(data.avatar);
            avatarCache[data.userName] = data.avatar;
          }
        });
    }
  }, [chatConfig, username]);

  return avatar ? (
    <Image className={className || 'chat-list-avatar'} src={avatar} />
  ) : (
    <div className={className || 'empty-avatar'}>
      {username[0].toUpperCase()}
    </div>
  );
};
