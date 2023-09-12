import React from "react";
import { Link } from "react-router-dom";

import "./VideoCard.css";

type Props = {
  name:string,
  videoID: number
}

const VideoCard = (props: Props) => {
  return (
    <div className="video-card">
      <Link to={`/video?idvideo=${props.videoID}`}>
        <div className="video-thumbnail">
          <video src=""></video>
        </div>
        <div className="video-info">
          <h5 className="video-title">{props.name}</h5>
          <div>
            <span className="views">
              <i className="fa-solid fa-eye"></i>
              12,345
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;
