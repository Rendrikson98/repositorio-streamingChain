import React from "react";

import './ChannelHeader.css';

import {
    ChannelAvatar,
    ChannelBanner,
    ChannelContainer,
    Banner,
    Profile
} from "./channelHeader.style";

type Props = {
    idCreator: string | number
}

const ChannelHeader = (props: Props) => {
    return (
        <ChannelContainer>
            <ChannelBanner>
                <Banner src={require(`../../../assets/img/capa/${props.idCreator}.jpg`)} alt="" />
                <ChannelAvatar>
                    <Profile src={require(`../../../assets/img/perfil/${props.idCreator}.jpg`)} alt="" />
                </ChannelAvatar>
            </ChannelBanner>
        </ChannelContainer>
    )
}

export default ChannelHeader;