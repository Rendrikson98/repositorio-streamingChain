import React from "react";
import ChannelSection from "../../containers/ChannelSection/ChannelSection";
import VideoSection from "../../containers/VideoSection/VideoSection";

import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <h1 className="page-title">Home</h1>
      <div>
        <ChannelSection />
        <VideoSection />
      </div>
    </div>
  );
};

export default Home;
