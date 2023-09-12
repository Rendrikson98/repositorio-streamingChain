import React from 'react';
import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import VideoPlayer from '../../components/elements/VideoPlayer/VideoPlayer';
import axios from '../../axios.config';
import { VideoInfo } from '../../model/videoInfo';
import { VideoContainer, VideoPagetitle } from './videoPage.style';
import { useState } from 'react';

const VideoPage = () => {
  const [videoData, setVideoData] = useState<VideoInfo>();
  const [loading, setLoading] = useState<boolean>(true);

  const params = useLocation();
  const id = params.search.split('=');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/searchInfoVideo/${id[1]}`);
        setVideoData(response.data.data);
        console.log(response);
        setLoading(false);
      } catch (error) {
        alert('Ocorreu um erro, tente novamente mais tarde');
      }
    };

    fetchData();
  }, []);

  console.log(videoData);
  return (
    <VideoContainer>
      {!loading ? (
        <div>
          <VideoPagetitle>{videoData.name}</VideoPagetitle>
          <VideoPlayer
            name={videoData.name}
            views={videoData.total_views}
            idVideo={videoData.id_video}
          />
        </div>
      ) : null}
    </VideoContainer>
  );
};

export default VideoPage;
