import React, { useState } from 'react';
import Button from '../styles/Button';
import Wrapper from '../styles/UploadVideoModal';
import { CloseIcon } from './Icons';
import VideoPlayer from './VideoPlayer';
import { useSnackbar } from 'react-simple-snackbar';
import { addVideo } from 'utils/api-client';
import { useHistory } from 'react-router-dom';
import { useAuth } from 'context/auth-context';

function UploadVideoModal({
  previewVideo,
  thumbnail,
  url,
  defaultTitle,
  closeModal,
}) {
  const [tab, setTab] = useState('PREVIEW');
  const [title, setTitle] = useState(defaultTitle);
  const [description, setDescription] = useState('');
  const [openSnackbar] = useSnackbar();
  const history = useHistory();
  const user = useAuth();

  async function handleTab() {
    if (tab === 'PREVIEW') {
      setTab('FORM');
    } else {
      if (!title.trim() || !description.trim()) {
        return openSnackbar('Please fill in all the fields');
      }

      const video = {
        title,
        description,
        url,
        thumbnail,
      };

      await addVideo(video);
      closeModal();
      openSnackbar('Video published!');
      history.push(`/channel/${user.id}`);
    }
  }

  return (
    <Wrapper>
      <div className='modal-content'>
        <div className='modal-header'>
          <div className='modal-header-left'>
            <CloseIcon onClick={closeModal} />
            <h3>{url ? 'Video Uploaded!' : 'Uploading...'}</h3>
          </div>
          <div style={{ display: url ? 'block' : 'none' }}>
            <Button onClick={handleTab}>
              {tab === 'PREVIEW' ? 'Next' : 'Upload'}
            </Button>
          </div>
        </div>

        {tab === 'PREVIEW' && (
          <div className='tab video-preview'>
            <VideoPlayer previewUrl={previewVideo} video={url} />
          </div>
        )}

        {tab === 'FORM' && (
          <div className='tab video-form'>
            <h2>Video Details</h2>
            <input
              type='text'
              placeholder='Enter your video title'
              value={title}
              onChange={event => setTitle(event.target.value)}
            />
            <textarea
              placeholder='Tell viewers about your video'
              value={description}
              onChange={event => setDescription(event.target.value)}
            />
          </div>
        )}
      </div>
    </Wrapper>
  );
}

export default UploadVideoModal;
