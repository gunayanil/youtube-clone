import React from 'react';
import Wrapper from '../styles/Trending';
import { useQuery } from 'react-query';
import { client } from 'utils/api-client';
import Skeleton from '../skeletons/SuggestionSkeleton';
import ErrorMessage from './ErrorMessage';
import ChannelInfo from './ChannelInfo';

function ChannelSuggestions() {
  const {
    data: channels,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useQuery('Channels', () =>
    client.get('/users').then(response => response.data.channels)
  );

  if (isLoading) {
    return <Skeleton />;
  }

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  return (
    <Wrapper>
      <h2>Suggestions For You</h2>
      {isSuccess
        ? channels.map(channel => (
            <ChannelInfo key={channel.id} channel={channel} />
          ))
        : null}
    </Wrapper>
  );
}

export default ChannelSuggestions;
