import React from "react";
import VideoCard from "../../components/elements/VideoCard/VideoCard";

import './VideoSection.css';

const VideoSection = () => {
    return (
        <section className="video-section">
            <VideoCard name="teste" videoID={1}/>
            <VideoCard name="teste" videoID={1}/>
            <VideoCard name="teste" videoID={1}/>
            <VideoCard name="teste" videoID={1}/>
        </section>
    )
}

export default VideoSection;