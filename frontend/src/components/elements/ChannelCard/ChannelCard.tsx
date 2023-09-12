import React from "react";
import { Link } from "react-router-dom";

import './ChannelCard.css';

import {
    ChannelContainer,
    ChannelName,
    ChannelThumbnail,
    Profile
} from "./channelCard.style";

type Props = {
    channelName: string
    id: number
}

const ChannelCard = (props: Props) => {
    const salveID = () => {
        localStorage.setItem("Id_Content_Creator", props.id.toString())
    }
    return (
        <ChannelContainer>
            <Link to="/channel" style={{flexDirection: "column", width: "100%", height: "100%", display: "flex", alignItems: "center",}} onClick={salveID}>
                <ChannelThumbnail>
                    <Profile src={require(`../../../assets/img/perfil/${props.id}.jpg`)} alt="" />
                </ChannelThumbnail>
                <div>
                    <ChannelName>
                        {props.channelName}
                    </ChannelName>
                </div>
            </Link>
        </ChannelContainer>
    )
}

export default ChannelCard;