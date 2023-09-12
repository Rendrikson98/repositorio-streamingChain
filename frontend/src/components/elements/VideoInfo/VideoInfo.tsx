import React from "react";

import "./VideoInfo.css";

type Props = {
  name: string,
  views: number
}

const VideoInfo = (props: Props) => {
  return (
    <section className="video-info">
      <h5 className="video-info-name">{props.name}</h5>
      <div className="data">
        <div className="views-info">
          <i className="fa-solid fa-eye"></i>
          <span className="views">{props.views}</span>
        </div>
      </div>
    </section>
  );
};

export default VideoInfo;
