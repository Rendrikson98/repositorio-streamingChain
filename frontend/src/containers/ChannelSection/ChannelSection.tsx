import axios from "../../axios.config";
import React, { useEffect, useState } from "react";
import ChannelCard from "../../components/elements/ChannelCard/ChannelCard";
import { AllContentCreator } from "../../model/allContentCreator";

import {ChannelContainer} from "./ChannelSection.style"

const ChannelSection = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [channelData, setChannelData] = useState<AllContentCreator[]>([])


  useEffect(()=>{
      const fetchData = async () => {
          try {
              setLoading(true);

              const response = await axios.get("/searchAllContentCreators");

              if(!response.data){
                alert("Ocorreu um erro, tente novamente mais tarde");
              }
              setChannelData(response.data)

              setLoading(false);
          } catch (error) {
              console.log("algo deu errado");
          }
      };

      fetchData();
  }, []);

  const channels = channelData.map(channel => (
    <ChannelCard channelName={channel.channel_name} key={channel.id} id={channel.id}/>
  ))
  return (
    <ChannelContainer>
      {channels}
    </ChannelContainer>
  );
};

export default ChannelSection;
