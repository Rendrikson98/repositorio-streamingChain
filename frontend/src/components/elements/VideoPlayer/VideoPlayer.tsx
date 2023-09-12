import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';

import VideoInfo from '../VideoInfo/VideoInfo';
import { pause, start, total } from '../../../stopwatch/stopwatch';
import axios from '../../../axios.config';

import './VideoPlayer.css';

type Props = {
  name: string;
  views: number;
  idVideo: number;
};

const VideoPlayer = (props: Props) => {
  const totalWatched = localStorage.getItem('totalWatched');
  const videoID = localStorage.getItem('videoID');

  useEffect(() => {
    const sendData = async () => {
      console.log(totalWatched);
      if (totalWatched !== '0' && totalWatched !== null && videoID !== null) {
        try {
          const response = await axios.patch(
            `/updateInfoVideo/${parseInt(videoID)}`,
            { assistedTime: parseInt(totalWatched) }
          );
          console.log(response);
          localStorage.setItem(`totalWatched`, '0');
          document.location.reload();
        } catch (error) {
          localStorage.setItem(`totalWatched`, '0');
          alert('ocorreu um erro com o servidor, tente novamente mais tarde');
        }
      }
    };

    sendData();
  }, []);

  const handlerOnProgress = async (state: any) => {
    localStorage.setItem(`totalWatched`, total.toString());
  };

  const handlerPlay = () => {
    start();
    localStorage.setItem(`videoID`, props.idVideo.toString());
  };

  const handlerPause = () => {
    pause();
  };

  const handlerOnEnd = () => {
    console.log(
      `Finalizou com um tempo de vídeo assistido de ${total} segundos`
    );
    localStorage.setItem(`totalWatched`, total.toString());
    pause();
  };

  return (
    <div className="video-player">
      <ReactPlayer
        url={[
          {
            src: require(`../../../assets/${props.idVideo}.mp4`),
            type: 'video/mp4',
          },
        ]}
        controls
        onPlay={handlerPlay}
        onPause={handlerPause}
        onProgress={handlerOnProgress}
        onEnded={handlerOnEnd}
        className="player"
      />

      <VideoInfo name={props.name} views={props.views} />
    </div>
  );
};

export default VideoPlayer;
