import { useEffect, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { Image, Modal } from 'semantic-ui-react';
import './ImageUpload.css';

export const ImageUpload = ({
  file,
  close,
  onSubmit,
  crop = false,
  header = 'Send This Image?',
}) => {
  const [imageSrc, setImageSrc] = useState('');
  const cropRef = useRef();
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const fr = new FileReader();
    fr.onload = () => setImageSrc(fr.result);
    fr.readAsDataURL(file);
  }, [file]);

  const handleSubmit = () => {
    setIsSending(true);
    if (crop && cropRef) {
      const canvas = cropRef.current.getImageScaledToCanvas().toDataURL();

      fetch(canvas)
        .then(res => res.blob())
        .then(blob => onSubmit(blob));
    } else {
      onSubmit();
    }
  };
  return (
    <Modal dimmer="blurring" open={true}>
      <Modal.Header>{header}</Modal.Header>
      <Modal.Content image>
        {crop ? (
          <AvatarEditor
            width={200}
            height={200}
            border={50}
            ref={cropRef}
            image={imageSrc}
          />
        ) : (
          <Image size="medium" src={imageSrc} alt="preview" />
        )}
      </Modal.Content>
      <Modal.Actions>
        <div className="image-upload-actions">
          <button className="cancel" onClick={close}>
            Cancel
          </button>
          <button
            disabled={isSending}
            className="submit"
            onClick={handleSubmit}
          >
            Upload
          </button>
        </div>
      </Modal.Actions>
    </Modal>
  );
};
