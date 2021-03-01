import React from 'react';
import Wrapper from '../styles/ChannelTabChannels';
import { Link } from 'react-router-dom';

function ChannelTabChannels({ channels }) {
  if (!channels.length) {
    return <p>Not subscribed to any channels yet.</p>;
  }
  return (
    <Wrapper>
      {channels.map(channel => (
        <Link key={channel.id} to={`/channel/${channel.id}`}>
          <div className='channel'>
            <img src={channel.avatar} alt={`${channel.username} avatar`} />
            <h3>{channel.username}</h3>
            <p className='secondary'>{channel.subscribersCount} subscribers</p>
          </div>
        </Link>
      ))}
    </Wrapper>
  );
}

export default ChannelTabChannels;
