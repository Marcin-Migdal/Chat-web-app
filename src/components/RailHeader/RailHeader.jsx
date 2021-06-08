import { Icon, IconGroup, Image } from 'semantic-ui-react';
import { ImageUpload } from 'components';
import { useRef, useState } from 'react';
import { useResolved } from 'hooks';
import { useChat } from 'context';
import { fb } from 'service';
import './RailHeader.css';

export const RailHeader = () => {
  const { chatConfig } = useChat();
  const configResolved = useResolved(chatConfig);
  const inputRef = useRef(null);
  const [image, setImage] = useState(null);

  const handleImageInput = e => {
    const file = e.target?.files?.[0];

    file && setImage(file);
  };

  const handleAvatarUpload = croppedImage => {
    const storageRef = fb.storage.ref();
    const uploadRef = storageRef.child(`${chatConfig.userSecret}_avatar.jpg`);

    uploadRef.put(croppedImage).then(() => {
      uploadRef.getDownloadURL().then(url => {
        fb.firestore
          .collection('chatUsers')
          .doc(chatConfig.userSecret)
          .update({ avatar: url })
          .then(() => setImage(null));
      });
    });
  };

  const openImageInput = () => {
    const input = inputRef.current;
    if (input) {
      input.value = '';
      input.click();
    }
  };

  return (
    <>
      <input
        type="file"
        ref={inputRef}
        className="file-input"
        accept="image/jpeg,image/png"
        onChange={handleImageInput}
      />

      {!!image && (
        <ImageUpload
          crop
          file={image}
          header="Set Your Avatar"
          close={() => setImage(null)}
          onSubmit={handleAvatarUpload}
        />
      )}

      <div className="left-rail-header">
        <Icon
          onClick={() => fb.auth.signOut()}
          className="sign-out"
          name="sign out"
        />
        {configResolved && chatConfig && (
          <div className="current-user-info">
            <IconGroup
              onClick={openImageInput}
              className="user-avatar"
              size="big"
            >
              {chatConfig.avatar ? (
                <Image src={chatConfig.avatar} avatar />
              ) : (
                <div className="empty-avatar">
                  {chatConfig.userName[0].toUpperCase()}
                </div>
              )}
              <Icon corner name="camera" circular inverted />
            </IconGroup>
            <p className="current-username">@{chatConfig.userName}</p>
          </div>
        )}
      </div>
    </>
  );
};
