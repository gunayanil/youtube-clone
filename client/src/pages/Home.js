import React from 'react';
import { useQuery } from 'react-query';
import Wrapper from '../styles/Home';
import VideoGrid from '../styles/VideoGrid';
import { client } from 'utils/api-client';
import HomeSkeleton from 'skeletons/HomeSkeleton';
import ErrorMessage from 'components/ErrorMessage';
import VideoCard from 'components/VideoCard';

function Home() {
  const {
    data: videos,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useQuery('Home', () =>
    client.get('/videos').then(response => response.data.videos)
  );

  if (isLoading) {
    return <HomeSkeleton />;
  }

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  return (
    <Wrapper>
      <VideoGrid>
        {isSuccess
          ? videos.amp(video => <VideoCard key={video.id} video={video} />)
          : null}
      </VideoGrid>
    </Wrapper>
  );
}

export default Home;
