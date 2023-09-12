import React, {useEffect} from "react";
import ChannelHeader from "../../components/elements/ChannelHeader/ChannelHeader";
import ChannelVideos from "../../components/elements/ChannelVideos/ChannelVideos";

import axios from "../../axios.config";

import './Channel.css';
import { useState } from "react";

const Channel = () => {
  const [title, setTitle] = useState<string>("");
  const id = localStorage.getItem("Id_Content_Creator");
  useEffect(()=>{
    const fetchData = async () =>{
      try {
        const response = await axios.get(`/searchAllContentCreator/${id}`);
        setTitle(response.data[0].channel_name);
      } catch (error) {
        alert("Algo deu errado, tente novamente mais tarde");
      }
    };

    fetchData();
  }, [])
  return (
    <div className="channel">
      <h1 className="page-title">{title}</h1>
      <div>
        <ChannelHeader idCreator={id} />
        <ChannelVideos />
      </div>
    </div>
  );
};

export default Channel;
