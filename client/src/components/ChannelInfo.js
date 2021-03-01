import React from 'react';
import Button from '../styles/Button';
import Wrapper from '../styles/ChannelInfo';
import { Link } from 'react-router-dom';
import { useAuth } from 'context/auth-context';
import useAuthAction from 'hooks/use-auth-action';
import { toggleSubscribeUser } from 'utils/api-client';

function ChannelInfo({ channel }) {
  const handleAuthAction = useAuthAction();

  function handleToggleSubscribe() {
    handleAuthAction(toggleSubscribeUser, channel.id);
  }

  return (
    <Wrapper>
      <Link to={`/channel/${channel.id}`} className='avatar-channel'>
        <img src={channel.avatar} alt='avatar' />

        <div className='channel-info-meta'>
          <h3>{channel.username}</h3>

          <p className='secondary'>
            <span>{channel.subscribersCount} subscribers</span>{' '}
            <span className='to-hide'>•</span>{' '}
            <span className='to-hide'>{channel.videosCount} videos</span>
          </p>

          <p className='description secondary'>
            {channel.about.length > 65
              ? channel.about.substr(0, 65)
              : channel.about}
          </p>
        </div>
      </Link>

      {!channel.isMe && !channel.isSubscribed && (
        <Button onClick={() => handleToggleSubscribe}>Subscribe</Button>
      )}
      {!channel.isVideoMine && channel.isSubscribed && (
        <Button grey onClick={() => handleToggleSubscribe}>
          Subscribed
        </Button>
      )}
    </Wrapper>
  );
}

export default ChannelInfo;
