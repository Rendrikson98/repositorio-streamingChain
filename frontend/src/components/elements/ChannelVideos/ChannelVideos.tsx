import React, { useEffect, useState } from "react";
import VideoCard from "../VideoCard/VideoCard";
import axios from "../../../axios.config";

import './ChannelVideos.css';

import {VideoChannelCreator} from "../../../model/videosChannelCreator";

const ChannelVideos = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [videosData, setVideosData] = useState<VideoChannelCreator[]>([]);

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const id = localStorage.getItem("Id_Content_Creator");
                console.log(id)
                const response = await axios.get(`/searchVideosContentCreator/${id}`);

                setVideosData(response.data.response);
                console.log(response);
            } catch (error) {
                alert("algo de errado aconteceu, tente novamente mais tarde");
            }
        }

        fetchData();
    },[]);

    const videos = videosData.map(video => (
        <VideoCard name={video.name} key={video.id_video} videoID={video.id_video}/>
    ));
    return (
        <section className="channel-videos">
            {videos}
        </section>
    )
}

export default ChannelVideos;